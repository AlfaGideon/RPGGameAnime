(function installEchoAstraCombatEngine(root) {
  'use strict';

  const ENGINE_VERSION = 1;
  const MAX_LOG_ENTRIES = 12;
  const SKILLS = Object.freeze({
    guardian: Object.freeze({
      name: 'Встать на защиту', description: 'Удар щитом и блок 70% следующей атаки.',
      manaCost: 12, damageMultiplier: 0.65, guard: 0.7
    }),
    duelist: Object.freeze({
      name: 'Точный выпад', description: 'Сильный удар, пробивающий защиту врага.',
      manaCost: 16, damageMultiplier: 1.8, armorPierce: 3
    }),
    ranger: Object.freeze({
      name: 'Пометить цель', description: 'Выстрел ставит метку: следующая атака наносит больше урона.',
      manaCost: 12, damageMultiplier: 0.7, mark: true
    }),
    arcanist: Object.freeze({
      name: 'Импульс Астры', description: 'Мощный магический импульс частично обходит защиту.',
      manaCost: 22, damageMultiplier: 2, armorPierce: 2
    }),
    warden: Object.freeze({
      name: 'Защитное сияние', description: 'Восстанавливает здоровье и смягчает следующий удар.',
      manaCost: 18, damageMultiplier: 0.4, heal: 26, guard: 0.4
    })
  });

  const ACTIONS = new Set(['attack', 'skill', 'defend', 'potion', 'retreat']);
  const isObject = value => Boolean(value) && typeof value === 'object' && !Array.isArray(value);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const toNumber = (value, fallback) => Number.isFinite(Number(value)) ? Number(value) : fallback;
  const roundInt = (value, fallback, min, max) => clamp(Math.round(toNumber(value, fallback)), min, max);

  function getSkill(classId) {
    return SKILLS[classId] || SKILLS.guardian;
  }

  function getPlayerStats(stats = {}) {
    const damage = roundInt(stats.damage, 2, 1, 5);
    const durability = roundInt(stats.durability, 3, 1, 5);
    const support = roundInt(stats.support, 3, 1, 5);
    return {
      maxHp: 78 + durability * 14,
      maxMana: 34 + support * 12,
      attackPower: 8 + damage * 2,
      defense: 2 + durability
    };
  }

  function createEncounter({ classId = 'guardian', heroName = 'Астра', stats = {}, now = Date.now() } = {}) {
    const safeClassId = Object.prototype.hasOwnProperty.call(SKILLS, classId) ? classId : 'guardian';
    const safeName = String(heroName || 'Астра').trim().slice(0, 24) || 'Астра';
    const playerStats = getPlayerStats(stats);
    const enemyMaxHp = 112;
    return {
      version: ENGINE_VERSION,
      id: `${Math.max(0, Math.floor(toNumber(now, Date.now())))}-${safeClassId}`,
      status: 'active',
      round: 1,
      classId: safeClassId,
      heroName: safeName,
      createdAt: Math.max(0, Math.floor(toNumber(now, Date.now()))),
      player: {
        hp: playerStats.maxHp,
        maxHp: playerStats.maxHp,
        mana: playerStats.maxMana,
        maxMana: playerStats.maxMana,
        attackPower: playerStats.attackPower,
        defense: playerStats.defense,
        guard: 0,
        potions: 2
      },
      enemy: {
        id: 'echo-sentinel',
        name: 'Искажённый сторож',
        hp: enemyMaxHp,
        maxHp: enemyMaxHp,
        attackPower: 13,
        defense: 2,
        intent: 'strike',
        marked: false
      },
      log: ['Бой начался. Сторож удерживает сигнальный узел.'],
      result: null
    };
  }

  function restoreEncounter(value) {
    if (!isObject(value) || value.version !== ENGINE_VERSION || !Object.prototype.hasOwnProperty.call(SKILLS, value.classId)) return null;
    if (!['active', 'victory', 'defeat', 'retreated'].includes(value.status) || !isObject(value.player) || !isObject(value.enemy)) return null;
    const playerMaxHp = roundInt(value.player.maxHp, 100, 1, 9999);
    const playerMaxMana = roundInt(value.player.maxMana, 70, 0, 9999);
    const enemyMaxHp = roundInt(value.enemy.maxHp, 112, 1, 9999);
    const log = Array.isArray(value.log) ? value.log.filter(entry => typeof entry === 'string').slice(-MAX_LOG_ENTRIES) : [];
    const result = value.result && isObject(value.result)
      ? { xp: roundInt(value.result.xp, 0, 0, 999999), marks: roundInt(value.result.marks, 0, 0, 999999) }
      : null;
    return {
      version: ENGINE_VERSION,
      id: String(value.id || 'restored-combat').slice(0, 80),
      status: value.status,
      round: roundInt(value.round, 1, 1, 999999),
      classId: value.classId,
      heroName: String(value.heroName || 'Астра').slice(0, 24),
      createdAt: Math.max(0, Math.floor(toNumber(value.createdAt, Date.now()))),
      player: {
        hp: roundInt(value.player.hp, playerMaxHp, 0, playerMaxHp),
        maxHp: playerMaxHp,
        mana: roundInt(value.player.mana, playerMaxMana, 0, playerMaxMana),
        maxMana: playerMaxMana,
        attackPower: roundInt(value.player.attackPower, 12, 1, 999),
        defense: roundInt(value.player.defense, 5, 0, 999),
        guard: clamp(toNumber(value.player.guard, 0), 0, 0.9),
        potions: roundInt(value.player.potions, 2, 0, 99)
      },
      enemy: {
        id: String(value.enemy.id || 'echo-sentinel').slice(0, 80),
        name: String(value.enemy.name || 'Искажённый сторож').slice(0, 80),
        hp: roundInt(value.enemy.hp, enemyMaxHp, 0, enemyMaxHp),
        maxHp: enemyMaxHp,
        attackPower: roundInt(value.enemy.attackPower, 13, 1, 999),
        defense: roundInt(value.enemy.defense, 2, 0, 999),
        intent: value.enemy.intent === 'surge' ? 'surge' : 'strike',
        marked: Boolean(value.enemy.marked)
      },
      log,
      result
    };
  }

  function getActionError(combat, action) {
    if (!isObject(combat) || combat.status !== 'active') return 'Сражение уже завершено.';
    if (!ACTIONS.has(action)) return 'Неизвестное боевое действие.';
    if (action === 'skill') {
      const skill = getSkill(combat.classId);
      if (combat.player.mana < skill.manaCost) return `Не хватает энергии: нужно ${skill.manaCost}.`;
    }
    if (action === 'potion') {
      if (combat.player.potions < 1) return 'Лечебные настои закончились.';
      if (combat.player.hp >= combat.player.maxHp) return 'Здоровье уже полное.';
    }
    return '';
  }

  function appendLog(combat, message) {
    combat.log.push(message);
    if (combat.log.length > MAX_LOG_ENTRIES) combat.log.splice(0, combat.log.length - MAX_LOG_ENTRIES);
  }

  function randomInt(random, min, max) {
    const sample = clamp(toNumber(random(), 0.5), 0, 0.999999999);
    return min + Math.floor(sample * (max - min + 1));
  }

  function inflictDamage(combat, rawDamage, armorPierce = 0) {
    let adjustedRaw = Math.max(1, Math.round(rawDamage));
    let markedBonus = false;
    if (combat.enemy.marked) {
      adjustedRaw = Math.ceil(adjustedRaw * 1.4);
      combat.enemy.marked = false;
      markedBonus = true;
    }
    const armor = Math.max(0, combat.enemy.defense - armorPierce);
    const damage = Math.max(1, adjustedRaw - armor);
    combat.enemy.hp = Math.max(0, combat.enemy.hp - damage);
    return { damage, markedBonus };
  }

  function completeVictory(combat) {
    combat.status = 'victory';
    combat.result = { xp: 30, marks: 12 };
    appendLog(combat, `Сторож рассеялся. Награда: ${combat.result.xp} опыта и ${combat.result.marks} лунных марок.`);
  }

  function enemyTurn(combat, random) {
    const charged = combat.enemy.intent === 'surge';
    const rawAttack = combat.enemy.attackPower + randomInt(random, 0, 4) + (charged ? 7 : 0);
    const afterArmor = Math.max(1, rawAttack - combat.player.defense);
    const damage = Math.max(1, Math.ceil(afterArmor * (1 - combat.player.guard)));
    combat.player.hp = Math.max(0, combat.player.hp - damage);
    combat.player.guard = 0;
    appendLog(combat, charged
      ? `${combat.enemy.name} выпускает волну Эхо: ${damage} урона.`
      : `${combat.enemy.name} атакует: ${damage} урона.`);

    if (combat.player.hp <= 0) {
      combat.status = 'defeat';
      combat.result = { xp: 0, marks: 0 };
      appendLog(combat, `${combat.heroName} теряет сознание. Схватка проиграна.`);
      return;
    }

    combat.player.mana = Math.min(combat.player.maxMana, combat.player.mana + 5);
    combat.round += 1;
    combat.enemy.intent = combat.round % 3 === 0 ? 'surge' : 'strike';
  }

  function applyAction(combat, action, { random = Math.random } = {}) {
    const issue = getActionError(combat, action);
    if (issue) return { state: combat, error: issue };

    const next = JSON.parse(JSON.stringify(combat));
    const player = next.player;
    const enemy = next.enemy;

    if (action === 'retreat') {
      next.status = 'retreated';
      next.result = { xp: 0, marks: 0 };
      appendLog(next, `${next.heroName} отступает. Награды за схватку нет.`);
      return { state: next, error: '' };
    }

    if (action === 'attack') {
      const rawDamage = player.attackPower + randomInt(random, 0, 4);
      const hit = inflictDamage(next, rawDamage);
      appendLog(next, `${next.heroName} атакует: ${hit.damage} урона${hit.markedBonus ? ' · усилено меткой' : ''}.`);
    } else if (action === 'skill') {
      const skill = getSkill(next.classId);
      player.mana -= skill.manaCost;
      if (skill.heal) {
        const healed = Math.min(skill.heal, player.maxHp - player.hp);
        player.hp += healed;
        appendLog(next, healed > 0 ? `Защитное сияние восстанавливает ${healed} здоровья.` : 'Защитное сияние поддерживает защиту.');
      }
      if (skill.guard) {
        player.guard = Math.max(player.guard, skill.guard);
        appendLog(next, `Защитный барьер снизит следующий удар на ${Math.round(skill.guard * 100)}%.`);
      }
      const rawDamage = Math.round(player.attackPower * skill.damageMultiplier) + randomInt(random, 0, 4);
      const hit = inflictDamage(next, rawDamage, skill.armorPierce || 0);
      appendLog(next, `${skill.name}: ${hit.damage} урона${hit.markedBonus ? ' · усилено меткой' : ''}.`);
      if (skill.mark) {
        enemy.marked = true;
        appendLog(next, 'На стороже появилась метка: следующая атака нанесёт больше урона.');
      }
    } else if (action === 'defend') {
      player.guard = 0.82;
      player.mana = Math.min(player.maxMana, player.mana + 8);
      appendLog(next, 'Ты принимаешь стойку: следующий удар ослаблен на 82%, восстановлено 8 энергии.');
    } else if (action === 'potion') {
      const healed = Math.min(34, player.maxHp - player.hp);
      player.hp += healed;
      player.potions -= 1;
      appendLog(next, `Лечебный настой восстанавливает ${healed} здоровья.`);
    }

    if (enemy.hp <= 0) {
      completeVictory(next);
      return { state: next, error: '' };
    }

    enemyTurn(next, random);
    return { state: next, error: '' };
  }

  const api = Object.freeze({
    version: ENGINE_VERSION,
    getSkill,
    getPlayerStats,
    createEncounter,
    restoreEncounter,
    getActionError,
    applyAction
  });

  root.EchoAstraCombat = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
