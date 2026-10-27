'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const Movement = require('../ui-prototype/movement-engine.js');

test('default Guardian and Blacksmith movement uses the six-second base', () => {
  assert.equal(Movement.baseCellDurationMs, 6000);
  assert.equal(Movement.getCellDurationMs(), 6000);
});

test('Ranger remains faster than Guardian with the same profession', () => {
  for (const professionId of Object.keys(Movement.professionDurationModifierMs)) {
    assert.ok(
      Movement.getCellDurationMs({ classId: 'ranger', professionId })
        < Movement.getCellDurationMs({ classId: 'guardian', professionId }),
      `Ranger should be faster than Guardian as ${professionId}`
    );
  }
});

test('profession modifies travel time and no cell step becomes shorter than three seconds', () => {
  const normal = Movement.getCellDurationMs({ classId: 'guardian', professionId: 'farmer' });
  const heavy = Movement.getCellDurationMs({ classId: 'guardian', professionId: 'miner' });
  assert.ok(heavy > normal);
  for (const classId of Object.keys(Movement.classDurationModifierMs)) {
    for (const professionId of Object.keys(Movement.professionDurationModifierMs)) {
      assert.ok(Movement.getCellDurationMs({ classId, professionId }) >= Movement.minimumCellDurationMs);
    }
  }
});

test('six real seconds count as thirty game seconds at the 5x clock rate', () => {
  assert.equal(Movement.getGameDurationSeconds(6000, 5), 30);
  assert.equal(Movement.getGameDurationSeconds(4000, 5), 20);
});
