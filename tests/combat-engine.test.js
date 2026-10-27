'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Combat = require('../ui-prototype/combat-engine.js');

const classes = {
  guardian: { damage: 2, durability: 5, support: 4 },
  duelist: { damage: 5, durability: 2, support: 2 },
  ranger: { damage: 4, durability: 3, support: 4 },
  arcanist: { damage: 5, durability: 2, support: 4 },
  warden: { damage: 2, durability: 4, support: 5 }
};

function encounter(classId = 'guardian') {
  return Combat.createEncounter({ classId, heroName: 'Астра', stats: classes[classId], now: 1234 });
}

const lowRoll = () => 0;

test('builds class-specific health, energy, attack and defense', () => {
  const guardian = encounter('guardian');
  const ranger = encounter('ranger');
  assert.ok(guardian.player.maxHp > ranger.player.maxHp);
  assert.ok(ranger.player.attackPower > guardian.player.attackPower);
  assert.equal(guardian.classId, 'guardian');
  assert.equal(guardian.status, 'active');
});

test('normal attack damages the enemy and allows its counterattack', () => {
  const start = encounter();
  const result = Combat.applyAction(start, 'attack', { random: lowRoll });
  assert.equal(result.error, '');
  assert.ok(result.state.enemy.hp < start.enemy.hp);
  assert.ok(result.state.player.hp < start.player.hp);
  assert.equal(result.state.round, 2);
});

test('defending reduces the next strike and restores energy', () => {
  const start = encounter();
  const attack = Combat.applyAction(start, 'attack', { random: lowRoll }).state;
  const defend = Combat.applyAction(start, 'defend', { random: lowRoll }).state;
  assert.ok(defend.player.hp > attack.player.hp);
  assert.ok(defend.player.mana > start.player.mana || start.player.mana === start.player.maxMana);
  assert.equal(defend.player.guard, 0);
});

test('class skills consume energy and ranger marks the enemy for the next hit', () => {
  const start = encounter('ranger');
  const marked = Combat.applyAction(start, 'skill', { random: lowRoll });
  assert.equal(marked.error, '');
  assert.equal(marked.state.enemy.marked, true);
  assert.ok(marked.state.player.mana < start.player.mana);
  const followUp = Combat.applyAction(marked.state, 'attack', { random: lowRoll });
  assert.equal(followUp.state.enemy.marked, false);
  assert.ok(followUp.state.log.some(entry => entry.includes('усилено меткой')));
});

test('rejects an unaffordable skill without consuming the turn', () => {
  const start = encounter('arcanist');
  start.player.mana = 0;
  const result = Combat.applyAction(start, 'skill', { random: lowRoll });
  assert.match(result.error, /Не хватает энергии/);
  assert.strictEqual(result.state, start);
  assert.equal(result.state.round, 1);
});

test('healing potion restores health and is consumed', () => {
  const start = encounter();
  start.player.hp = 20;
  const result = Combat.applyAction(start, 'potion', { random: lowRoll });
  assert.equal(result.error, '');
  assert.equal(result.state.player.potions, 1);
  assert.ok(result.state.log.some(entry => entry.includes('восстанавливает 34 здоровья')));
  assert.ok(result.state.player.hp > 20);
});

test('a lethal hit ends the fight immediately and grants a reward', () => {
  const start = encounter('duelist');
  start.enemy.hp = 1;
  const result = Combat.applyAction(start, 'attack', { random: lowRoll });
  assert.equal(result.state.status, 'victory');
  assert.deepEqual(result.state.result, { xp: 30, marks: 12 });
  assert.equal(result.state.player.hp, start.player.hp);
});

test('the signal warden charges a wave every third round', () => {
  let fight = encounter();
  fight = Combat.applyAction(fight, 'attack', { random: lowRoll }).state;
  fight = Combat.applyAction(fight, 'attack', { random: lowRoll }).state;
  assert.equal(fight.round, 3);
  assert.equal(fight.enemy.intent, 'surge');
  fight = Combat.applyAction(fight, 'defend', { random: lowRoll }).state;
  assert.ok(fight.log.some(entry => entry.includes('волну Эхо')));
});

test('defeat and retreat end the encounter without victory rewards', () => {
  const doomed = encounter();
  doomed.player.hp = 1;
  const defeat = Combat.applyAction(doomed, 'attack', { random: lowRoll }).state;
  assert.equal(defeat.status, 'defeat');
  assert.deepEqual(defeat.result, { xp: 0, marks: 0 });

  const retreat = Combat.applyAction(encounter(), 'retreat', { random: lowRoll }).state;
  assert.equal(retreat.status, 'retreated');
  assert.deepEqual(retreat.result, { xp: 0, marks: 0 });
});

test('saved encounters are sanitized and can resume', () => {
  const start = encounter('warden');
  start.player.hp = 12;
  start.player.guard = 2;
  start.enemy.hp = -50;
  const restored = Combat.restoreEncounter(start);
  assert.equal(restored.player.hp, 12);
  assert.equal(restored.player.guard, 0.9);
  assert.equal(restored.enemy.hp, 0);
  assert.equal(Combat.restoreEncounter({ version: 999 }), null);
});
