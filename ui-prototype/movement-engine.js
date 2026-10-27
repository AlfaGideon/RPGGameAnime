(function installEchoAstraMovementEngine(root) {
  'use strict';

  const BASE_CELL_DURATION_MS = 6000;
  const MINIMUM_CELL_DURATION_MS = 3000;
  const CLASS_DURATION_MODIFIER_MS = Object.freeze({
    guardian: 0,
    duelist: -500,
    ranger: -2000,
    arcanist: -500,
    warden: -250
  });
  const PROFESSION_DURATION_MODIFIER_MS = Object.freeze({
    blacksmith: 0,
    farmer: -250,
    herbalist: -750,
    miner: 750,
    carpenter: 250,
    tanner: 250,
    builder: -250
  });

  function getCellDurationMs({ classId = 'guardian', professionId = 'blacksmith' } = {}) {
    const classModifier = CLASS_DURATION_MODIFIER_MS[classId] || 0;
    const professionModifier = PROFESSION_DURATION_MODIFIER_MS[professionId] || 0;
    return Math.max(MINIMUM_CELL_DURATION_MS, BASE_CELL_DURATION_MS + classModifier + professionModifier);
  }

  function getGameDurationSeconds(realDurationMs, rate = 5) {
    const duration = Math.max(0, Number(realDurationMs) || 0);
    const gameRate = Math.max(0, Number(rate) || 0);
    return Math.ceil(duration * gameRate / 1000);
  }

  const api = Object.freeze({
    baseCellDurationMs: BASE_CELL_DURATION_MS,
    minimumCellDurationMs: MINIMUM_CELL_DURATION_MS,
    classDurationModifierMs: CLASS_DURATION_MODIFIER_MS,
    professionDurationModifierMs: PROFESSION_DURATION_MODIFIER_MS,
    getCellDurationMs,
    getGameDurationSeconds
  });

  root.EchoAstraMovement = api;
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
