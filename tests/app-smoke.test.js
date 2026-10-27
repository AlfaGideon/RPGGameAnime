'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function bootPrototype() {
  const elements = new Map();
  const listeners = {};
  const makeElement = () => ({
    innerHTML: '', className: '', hidden: false, style: {}, dataset: {}, textContent: '',
    classList: { add() {}, remove() {}, toggle() {} }
  });
  const document = {
    getElementById(id) {
      if (!elements.has(id)) elements.set(id, makeElement());
      return elements.get(id);
    },
    querySelectorAll() { return []; },
    addEventListener(type, listener) { listeners[type] = listener; }
  };
  const storage = new Map();
  const deterministicMath = Object.create(Math);
  deterministicMath.random = () => 0.5;
  const sandbox = {
    document,
    Math: deterministicMath,
    localStorage: {
      getItem(key) { return storage.has(key) ? storage.get(key) : null; },
      setItem(key, value) { storage.set(key, String(value)); },
      removeItem(key) { storage.delete(key); }
    },
    setInterval() { return 1; },
    clearInterval() {},
    setTimeout() { return 1; },
    clearTimeout() {},
    scrollTo() {},
    open() {},
    console
  };
  sandbox.window = sandbox;
  const context = vm.createContext(sandbox);
  for (const file of ['movement-engine.js', 'combat-engine.js', 'app.js']) {
    const source = fs.readFileSync(path.join(__dirname, '../ui-prototype', file), 'utf8');
    vm.runInContext(source, context, { filename: file });
  }
  return {
    screen: elements.get('screen'),
    click(selector, dataset) {
      const element = { dataset };
      const target = { closest(query) { return query === selector ? element : null; } };
      listeners.click({ target });
    }
  };
}

test('prototype opens the combat screen and runs a telegraphed turn-based encounter', () => {
  const app = bootPrototype();
  assert.match(app.screen.innerHTML, /Создать персонажа/);

  app.click('[data-action]', { action: 'quick-demo' });
  assert.match(app.screen.innerHTML, /Пошаговый бой с Эхо/);

  app.click('[data-action]', { action: 'open-combat' });
  assert.match(app.screen.innerHTML, /Начать бой/);
  app.click('[data-combat-action]', { combatAction: 'start' });
  assert.match(app.screen.innerHTML, /Обычная атака/);
  assert.match(app.screen.innerHTML, /Раунд 1/);

  app.click('[data-combat-action]', { combatAction: 'attack' });
  app.click('[data-combat-action]', { combatAction: 'attack' });
  assert.match(app.screen.innerHTML, /Раунд 3/);
  assert.match(app.screen.innerHTML, /накапливает волну Эхо/);
  assert.match(app.screen.innerHTML, /Сторож готовит|накапливает волну/);
});

test('victory awards local marks that appear in the wallet', () => {
  const app = bootPrototype();
  app.click('[data-action]', { action: 'quick-demo' });
  app.click('[data-action]', { action: 'open-combat' });
  app.click('[data-combat-action]', { combatAction: 'start' });
  for (let turn = 0; turn < 12; turn += 1) app.click('[data-combat-action]', { combatAction: 'attack' });
  assert.match(app.screen.innerHTML, /Сигнал очищен/);
  app.click('[data-nav]', { nav: 'home' });
  assert.match(app.screen.innerHTML, /✧ 112/);
});
