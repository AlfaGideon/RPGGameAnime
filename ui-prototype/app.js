const combatClasses = [
  {
    id: 'guardian', name: 'Страж', glyph: '🛡️', role: 'Защита группы', short: 'Прикрывает союзников и удерживает угрозу.',
    damage: 2, durability: 5, support: 4, accent: '#65d6d0',
    path: 'Дозор маяка', pathText: 'Проверить защиту сигнального узла и решить, кого прикрыть во время шторма.',
    pathAction: 'Открыть дозор', skill: 'Встать на защиту', encounterText: 'Сдержите Эхо, пока группа завершает ремонт.'
  },
  {
    id: 'duelist', name: 'Дуэлянт', glyph: '⚔️', role: 'Ближний бой', short: 'Наносит точный урон и уклоняется от опасных атак.',
    damage: 5, durability: 2, support: 2, accent: '#f2a66d',
    path: 'След клинка', pathText: 'Выяснить, кто научил Конклав обходить охрану маяков.',
    pathAction: 'Начать тренировку', skill: 'Точный выпад', encounterText: 'Выберите момент для атаки по уязвимой цели.'
  },
  {
    id: 'ranger', name: 'Следопыт', glyph: '➶', role: 'Дальний бой и разведка', short: 'Находит угрозы, ставит метки и поддерживает группу на расстоянии.',
    damage: 4, durability: 3, support: 4, accent: '#86d59a',
    path: 'Тропа над облаками', pathText: 'Проследить исчезнувший маршрут и найти источник сигналов Эхо.',
    pathAction: 'Разведать путь', skill: 'Пометить цель', encounterText: 'Обнаружьте слабое место Эхо и помогите группе.'
  },
  {
    id: 'arcanist', name: 'Арканист', glyph: '✧', role: 'Магия и контроль', short: 'Работает с сигналами маяков, наносит магический урон и контролирует угрозы.',
    damage: 5, durability: 2, support: 4, accent: '#b69af1',
    path: 'Знаки Разлома', pathText: 'Расшифровать символы на осколке, не повторив ошибку прежних исследователей.',
    pathAction: 'Изучить сигнал', skill: 'Импульс Астры', encounterText: 'Стабилизируйте энергию и остановите опасное Эхо.'
  },
  {
    id: 'warden', name: 'Хранитель', glyph: '✚', role: 'Поддержка группы', short: 'Восстанавливает силы союзников и помогает пережить опасную встречу.',
    damage: 2, durability: 4, support: 5, accent: '#74c9e9',
    path: 'Голоса тишины', pathText: 'Помочь пострадавшим от Эхо и исследовать утраченные воспоминания.',
    pathAction: 'Помочь раненым', skill: 'Защитное сияние', encounterText: 'Поддержите группу и ослабьте негативный эффект.'
  }
];

const MovementEngine = window.EchoAstraMovement;
const CombatEngine = window.EchoAstraCombat;

const professions = [
  { id: 'blacksmith', name: 'Кузнец', role: 'Создание предметов', summary: 'Кует инструменты, детали и снаряжение.', work: 'Заказы кузницы', workText: 'Две заявки ждут материалы. Для следующей детали нужна руда.', action: 'Открыть мастерскую', accent: '#f2c66d' },
  { id: 'farmer', name: 'Фермер', role: 'Ферма и животноводство', summary: 'Выращивает пищу, шерсть и сырьё для ремесла.', work: 'Дела хозяйства', workText: 'Проверить урожай, собрать шерсть и подготовить заказ на шкуры.', action: 'Осмотреть ферму', accent: '#9bd28a' },
  { id: 'herbalist', name: 'Травник', role: 'Травы и лечебные сборы', summary: 'Собирает растения и готовит природные компоненты.', work: 'Сбор трав', workText: 'У маяка появились незнакомые растения. Нужна проверка образцов.', action: 'Исследовать травы', accent: '#82d7c1' },
  { id: 'miner', name: 'Рудокоп', role: 'Руда и камень', summary: 'Находит материалы для кузниц и городских проектов.', work: 'Месторождение', workText: 'Кузнец Лиора оставил заказ на три куска железной руды.', action: 'Посмотреть заказ', accent: '#d2a873' },
  { id: 'carpenter', name: 'Лесоруб / плотник', role: 'Древесина и детали', summary: 'Заготавливает древесину и делает деревянные компоненты.', work: 'Заказ на балки', workText: 'Для новых доков нужны обработанные доски и крепления.', action: 'Открыть мастерскую', accent: '#c99a6b' },
  { id: 'tanner', name: 'Кожевник', role: 'Обработка материалов', summary: 'Превращает шкуры в кожу и ремесленные заготовки.', work: 'Партия сырья', workText: 'Фермер передал шкуры. Выберите способ обработки заказа.', action: 'Обработать сырьё', accent: '#df9e86' },
  { id: 'builder', name: 'Строитель', role: 'Городские постройки', summary: 'Проектирует и организует мастерские и городские службы.', work: 'Проект поселения', workText: 'Не хватает досок и металлических деталей для городской кузницы.', action: 'Управлять проектом', accent: '#83b7e8' }
];

const AVATAR_OPTIONS = [
  { id: 'guardian', name: 'Страж Лиора', role: 'Страж · встроенный портрет', src: 'assets/classes/guardian.png', accent: '#65d6d0' },
  { id: 'duelist', name: 'Клинок рассвета', role: 'Дуэлянт · встроенный портрет', src: 'assets/classes/duelist.png', accent: '#f2a66d' },
  { id: 'ranger', name: 'Следопыт Эйры', role: 'Следопыт · встроенный портрет', src: 'assets/classes/ranger.png', accent: '#86d59a' },
  { id: 'arcanist', name: 'Астральный маг', role: 'Арканист · встроенный портрет', src: 'assets/classes/arcanist.png', accent: '#b69af1' },
  { id: 'warden', name: 'Светлый хранитель', role: 'Хранитель · встроенный портрет', src: 'assets/classes/warden.png', accent: '#74c9e9' }
];

function readSavedAvatarId() {
  try {
    const saved = window.localStorage.getItem('echo-astra.avatar-id');
    return AVATAR_OPTIONS.some(avatar => avatar.id === saved) ? saved : AVATAR_OPTIONS[0].id;
  } catch (error) { return AVATAR_OPTIONS[0].id; }
}

function saveAvatarId(avatarId) {
  try { window.localStorage.setItem('echo-astra.avatar-id', avatarId); }
  catch (error) { /* Private browsing and file:// storage may be unavailable. */ }
}

const GAME_CLOCK_RATE = 5; // Five in-game hours pass per one real hour.
const WORLD_MAP_VERSION = 2;
const MAP_CONFIG = { width: 1000, height: 1000, localSize: 10, biomeSize: 10, worldRegionSize: 100 };
const LIOR_CITY = { xMin: 491, xMax: 500, yMin: 491, yMax: 500, start: { x: 496, y: 496 } };
const BIOME_INFO = {
  city: { name: 'Лиор · городская локация', short: 'Город', glyph: '⌂' },
  cloud: { name: 'Белые облака', short: 'Облака · нужен транспорт', glyph: '☁' },
  forest: { name: 'Шепчущий лес', short: 'Лес', glyph: '♧' },
  highland: { name: 'Осколочные нагорья', short: 'Нагорья', glyph: '△' },
  marsh: { name: 'Сумрачные топи', short: 'Топи', glyph: '♨' },
  frost: { name: 'Северные льды', short: 'Льды', glyph: '❄' },
  mountain: { name: 'Непроходимый горный хребет', short: 'Хребет · обход', glyph: '▲' },
  'cloud-rock': { name: 'Скальные выступы в облаках', short: 'Скалы · объезд', glyph: '◆' }
};

// The world overview is a 10 × 10 grid of 100 × 100-cell regions (1,000 × 1,000 cells total).
// Former water/coast regions are now white, impassable cloud fields.
const worldBiomeRegions = [
  ['cloud', 'cloud', 'forest', 'forest', 'forest', 'highland', 'highland', 'frost', 'frost', 'frost'],
  ['cloud', 'cloud', 'cloud', 'forest', 'forest', 'highland', 'highland', 'frost', 'frost', 'frost'],
  ['cloud', 'cloud', 'forest', 'forest', 'forest', 'highland', 'highland', 'frost', 'frost', 'frost'],
  ['cloud', 'cloud', 'cloud', 'forest', 'forest', 'marsh', 'marsh', 'highland', 'highland', 'highland'],
  ['cloud', 'cloud', 'cloud', 'cloud', 'forest', 'marsh', 'marsh', 'highland', 'highland', 'highland'],
  ['cloud', 'cloud', 'forest', 'forest', 'forest', 'marsh', 'marsh', 'marsh', 'highland', 'highland'],
  ['cloud', 'cloud', 'forest', 'forest', 'forest', 'marsh', 'marsh', 'marsh', 'forest', 'forest'],
  ['cloud', 'forest', 'forest', 'forest', 'highland', 'marsh', 'marsh', 'forest', 'forest', 'forest'],
  ['forest', 'forest', 'forest', 'highland', 'highland', 'highland', 'forest', 'forest', 'cloud', 'cloud'],
  ['forest', 'forest', 'highland', 'highland', 'highland', 'forest', 'cloud', 'cloud', 'cloud', 'cloud']
];

// Fixed, deterministic terrain features: each ridge is a solid barrier, but ends before the world edge
// so players can walk around it. Their coordinates deliberately stay clear of starter city Lior.
const MOUNTAIN_RANGES = [
  { id: 'silver-ridge', name: 'Серебряный хребет', radius: 5, path: [{ x: 145, y: 205 }, { x: 250, y: 238 }, { x: 360, y: 222 }, { x: 470, y: 260 }, { x: 585, y: 232 }, { x: 700, y: 268 }, { x: 830, y: 242 }] },
  { id: 'echo-spine', name: 'Кряж Эхо', radius: 5, path: [{ x: 225, y: 342 }, { x: 310, y: 412 }, { x: 278, y: 500 }, { x: 350, y: 570 }, { x: 330, y: 662 }] },
  { id: 'windward-wall', name: 'Гребень Ветров', radius: 6, path: [{ x: 635, y: 326 }, { x: 700, y: 408 }, { x: 742, y: 500 }, { x: 704, y: 592 }, { x: 780, y: 690 }] },
  { id: 'southern-spine', name: 'Южный каменный пояс', radius: 5, path: [{ x: 365, y: 742 }, { x: 480, y: 786 }, { x: 600, y: 752 }, { x: 720, y: 792 }] }
];

// A few compact rocky teeth protrude through cloud fields. Each patch is only a handful of cells.
const CLOUD_ROCK_PATCHES = [
  { id: 'west-spire', cells: [{ x: 42, y: 132 }, { x: 43, y: 132 }, { x: 42, y: 133 }] },
  { id: 'mist-spire', cells: [{ x: 132, y: 468 }, { x: 133, y: 468 }, { x: 132, y: 469 }] },
  { id: 'western-needle', cells: [{ x: 76, y: 614 }, { x: 77, y: 614 }, { x: 76, y: 615 }] },
  { id: 'far-shelf', cells: [{ x: 882, y: 846 }, { x: 883, y: 846 }, { x: 882, y: 847 }] },
  { id: 'eastern-spire', cells: [{ x: 946, y: 949 }, { x: 947, y: 949 }, { x: 946, y: 950 }] }
];

const pointsOfInterest = [
  { id: 'iara', name: 'Иара Кест', kind: 'npc', glyph: '👩‍🔧', x: 496, y: 496, description: 'Инженер маяков · стартовый NPC' },
  { id: 'smith', name: 'Кузница Торена Валя', kind: 'npc', glyph: '⚒', x: 495, y: 496, description: 'Ремонт и базовое снаряжение' },
  { id: 'merchant', name: 'Лавка Мейры Соль', kind: 'npc', glyph: '◈', x: 496, y: 495, description: 'Городские расходники' },
  { id: 'herbalist', name: 'Травница Элна Рут', kind: 'npc', glyph: '✿', x: 496, y: 497, description: 'Лечебные средства и травы' },
  { id: 'guild', name: 'Гильдия «Крылья Эйры»', kind: 'guild', glyph: '⌘', x: 497, y: 496, description: 'Зал гильдии и городской совет' },
  { id: 'quest-board', name: 'Доска заданий', kind: 'service', glyph: '✦', x: 495, y: 495, description: 'Поручения Лиора' },
  { id: 'market', name: 'Торговая площадь', kind: 'service', glyph: '▤', x: 497, y: 495, description: 'Рынок и заявки игроков' },
  { id: 'beacon', name: 'Старый сигнальный маяк', kind: 'landmark', glyph: '✧', x: 501, y: 496, description: 'Переход к лесному тракту' }
];

const NPC_PROFILES = [
  { id: 'iara', poiId: 'iara', name: 'Иара Кест', role: 'Инженер маяков', glyph: '✧', art: 'assets/npcs/iara-kest.png', sprite: 'assets/cutouts/npcs/iara-kest.png', mirrorArt: true, mirrorSprite: false, quote: '«Не запускай узел вслепую. Я больше не буду решать за весь город одна».', story: 'В аварийную ночь Иара удержала маяк и нашла в старом журнале цену его сигналов. Теперь она делится знаниями и ищет способ, чтобы сетью не распоряжался один человек.', service: 'Помоги проверить сигнальный узел и восстановить безопасную связь.' },
  { id: 'vesta', name: 'Веста Ран', role: 'Представительница Дозора', glyph: '⌑', art: 'assets/npcs/vesta-ran.png', sprite: 'assets/cutouts/npcs/vesta-ran.png', quote: '«Запрет защищает только тогда, когда люди знают, от чего именно он их защищает».', story: 'Веста ограничивала доступ к маякам, пока не обнаружила скрытые отчёты о последствиях прежнего запуска. Теперь она публикует записи и помогает городу выработать общие правила.', service: 'Поговори о доступе к маякам и правилах безопасности.' },
  { id: 'nir', name: 'Нир', role: 'Следопыт Конклава', glyph: '➶', art: 'assets/npcs/nir.png', sprite: 'assets/cutouts/npcs/nir.png', quote: '«Я не доверяю организациям. Людям — иногда. Проверим, кто из нас ошибся».', story: 'Нир пришёл за осколком маяка, но следы привели к острову, потерянному из-за сети. Он передал героям доказательства и стал осторожным союзником, не отказавшись от сомнений.', service: 'Спроси о Конклаве, осколке и исчезнувших островах.' },
  { id: 'smith', poiId: 'smith', name: 'Торен Валь', role: 'Кузнец Лиора', glyph: '⚒', art: 'assets/npcs/toren-val.png', sprite: 'assets/cutouts/npcs/toren-val.png', quote: '«Сначала проверим металл. Маяк не место для догадок».', story: 'Торен держался за простые и безопасные изделия, пока игроки не помогли ему проверить старый чертёж. Теперь он передаёт другим городам надёжный способ чинить маяки.', service: 'Инструменты, обычное снаряжение и ремонт; покупки в прототипе отключены.' },
  { id: 'merchant', poiId: 'merchant', name: 'Мейра Соль', role: 'Торговка Лиора', glyph: '◈', art: 'assets/npcs/meyra-sol.png', sprite: 'assets/cutouts/npcs/meyra-sol.png', quote: '«Ведомости не сходились. Я нашла, кто менял маршруты во время шторма».', story: 'Мейра заметила поддельные ведомости грузов и вместе с жителями раскрыла перенаправление поставок. Теперь она отстаивает прозрачные правила торговли и помогает новым лавкам.', service: 'Городской ассортимент и расходники показаны как демонстрационный макет.' },
  { id: 'herbalist', poiId: 'herbalist', name: 'Элна Рут', role: 'Травница и полевая лекарка', glyph: '✿', art: 'assets/npcs/elna-rut.png', sprite: 'assets/cutouts/npcs/elna-rut.png', quote: '«Эти травы облегчают боль, но не возвращают воспоминания. Я не стану обещать невозможное».', story: 'После аварии Элна изучала растения у Эхо и нашла безопасные лечебные сборы. Она поделилась рецептами с жителями, честно объясняя, что утраченная память пока не возвращается.', service: 'Безопасные базовые лечебные средства и советы; магазин не продаёт предметы.' },
  { id: 'kora', name: 'Кора Вей', role: 'Смотритель городского устава', glyph: '☷', art: 'assets/npcs/kora-vei.png', sprite: 'assets/cutouts/npcs/kora-vei.png', mirrorArt: true, mirrorSprite: false, quote: '«Город принадлежит людям, а не тому, кто первым запер склад».', story: 'Кора регистрирует общинные проекты. Она помнит поселение, погибшее из-за монополии на склады, и помогает Лиору закрепить устав с общими правами и ответственностью.', service: 'Расскажи, как устроены городские правила и регистрация поселений.' }
];

const getNpcProfile = id => NPC_PROFILES.find(profile => profile.id === id || profile.poiId === id);

function isInsideLior(x, y) {
  return x >= LIOR_CITY.xMin && x <= LIOR_CITY.xMax && y >= LIOR_CITY.yMin && y <= LIOR_CITY.yMax;
}

function getWorldRegionBiomeId(x, y) {
  if (!Number.isFinite(Number(x)) || !Number.isFinite(Number(y)) || Number(x) < 1 || Number(x) > MAP_CONFIG.width || Number(y) < 1 || Number(y) > MAP_CONFIG.height) return 'cloud';
  return worldBiomeRegions[Math.floor((Number(y) - 1) / MAP_CONFIG.worldRegionSize)][Math.floor((Number(x) - 1) / MAP_CONFIG.worldRegionSize)];
}

function getBiomeId(x, y) {
  x = Number(x); y = Number(y);
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 1 || x > MAP_CONFIG.width || y < 1 || y > MAP_CONFIG.height) return 'cloud';
  if (isInsideLior(x, y)) return 'city';
  // Keep a clear, walkable approach around the starter city and its lighthouse.
  if (x >= 486 && x <= 510 && y >= 486 && y <= 510) return 'forest';
  const regionX = Math.floor((x - 1) / MAP_CONFIG.worldRegionSize);
  const regionY = Math.floor((y - 1) / MAP_CONFIG.worldRegionSize);
  const baseBiome = worldBiomeRegions[regionY][regionX];
  if (baseBiome === 'cloud') return 'cloud';
  const patchX = Math.floor(((x - 1) % MAP_CONFIG.worldRegionSize) / MAP_CONFIG.biomeSize);
  const patchY = Math.floor(((y - 1) % MAP_CONFIG.worldRegionSize) / MAP_CONFIG.biomeSize);
  const texture = (patchX * 7 + patchY * 3 + regionX * 5 + regionY * 11) % 29;
  if (baseBiome === 'forest' && texture === 0) return 'highland';
  if (baseBiome === 'forest' && texture === 1) return 'marsh';
  if (baseBiome === 'highland' && texture === 0) return 'forest';
  if (baseBiome === 'highland' && texture === 1) return 'frost';
  if (baseBiome === 'marsh' && texture === 0) return 'forest';
  if (baseBiome === 'marsh' && texture === 1) return 'highland';
  if (baseBiome === 'frost' && texture === 0) return 'highland';
  if (baseBiome === 'frost' && texture === 1) return 'forest';
  return baseBiome;
}

function distanceToSegment(x, y, start, end) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const lengthSquared = dx * dx + dy * dy;
  if (!lengthSquared) return Math.hypot(x - start.x, y - start.y);
  const t = Math.max(0, Math.min(1, ((x - start.x) * dx + (y - start.y) * dy) / lengthSquared));
  return Math.hypot(x - (start.x + t * dx), y - (start.y + t * dy));
}

function getMountainRangeAt(x, y) {
  x = Number(x); y = Number(y);
  if (!Number.isFinite(x) || !Number.isFinite(y) || isInsideLior(x, y)) return null;
  for (const range of MOUNTAIN_RANGES) {
    for (let index = 0; index < range.path.length - 1; index += 1) {
      if (distanceToSegment(x, y, range.path[index], range.path[index + 1]) <= range.radius) return range;
    }
  }
  return null;
}

function getCloudRockAt(x, y) {
  x = Number(x); y = Number(y);
  if (!Number.isInteger(x) || !Number.isInteger(y) || getBiomeId(x, y) !== 'cloud') return null;
  return CLOUD_ROCK_PATCHES.find(patch => patch.cells.some(cell => cell.x === x && cell.y === y)) || null;
}

function getTerrainFeatureAt(x, y) {
  const range = getMountainRangeAt(x, y);
  if (range) return { id: 'mountain', name: range.name, glyph: BIOME_INFO.mountain.glyph, alwaysBlocked: true, rangeId: range.id };
  const rock = getCloudRockAt(x, y);
  if (rock) return { id: 'cloud-rock', name: `Скальный выступ «${rock.id}»`, glyph: BIOME_INFO['cloud-rock'].glyph, alwaysBlocked: true, rockId: rock.id };
  return null;
}

function segmentIntersectsBounds(start, end, minX, minY, maxX, maxY) {
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  let low = 0;
  let high = 1;
  const p = [-dx, dx, -dy, dy];
  const q = [start.x - minX, maxX - start.x, start.y - minY, maxY - start.y];
  for (let index = 0; index < 4; index += 1) {
    if (p[index] === 0) {
      if (q[index] < 0) return false;
      continue;
    }
    const ratio = q[index] / p[index];
    if (p[index] < 0) low = Math.max(low, ratio);
    else high = Math.min(high, ratio);
    if (low > high) return false;
  }
  return true;
}

function getTerrainFeatureInBounds(minX, minY, maxX, maxY) {
  for (const range of MOUNTAIN_RANGES) {
    for (let index = 0; index < range.path.length - 1; index += 1) {
      if (segmentIntersectsBounds(range.path[index], range.path[index + 1], minX - range.radius, minY - range.radius, maxX + range.radius, maxY + range.radius)) {
        return { id: 'mountain', name: range.name, glyph: BIOME_INFO.mountain.glyph, alwaysBlocked: true, rangeId: range.id };
      }
    }
  }
  for (const patch of CLOUD_ROCK_PATCHES) {
    if (patch.cells.some(cell => cell.x >= minX && cell.x <= maxX && cell.y >= minY && cell.y <= maxY)) {
      return { id: 'cloud-rock', name: `Скальный выступ «${patch.id}»`, glyph: BIOME_INFO['cloud-rock'].glyph, alwaysBlocked: true, rockId: patch.id };
    }
  }
  return null;
}

const isCloudBlocked = (x, y, hasTransport = false) => getBiomeId(x, y) === 'cloud' && !hasTransport;
function isTerrainBlocked(x, y, hasTransport = false) {
  const feature = getTerrainFeatureAt(x, y);
  if (feature && feature.alwaysBlocked) return true;
  return isCloudBlocked(x, y, hasTransport);
}
const clampMapCoordinate = value => Math.max(1, Math.min(MAP_CONFIG.width, Math.round(Number(value) || 1)));

function getLegacyMapPosition(point) {
  const x = Number(point && point.x);
  const y = Number(point && point.y);
  if (!Number.isInteger(x) || !Number.isInteger(y) || x < 1 || x > 100 || y < 1 || y > 100) return { ...LIOR_CITY.start };
  if (x >= 7 && x <= 14 && y >= 47 && y <= 53) return { ...LIOR_CITY.start };
  const migrated = { x: clampMapCoordinate(x * 10), y: clampMapCoordinate(y * 10) };
  return isTerrainBlocked(migrated.x, migrated.y) ? { ...LIOR_CITY.start } : migrated;
}

const GAME_CLOCK_STORAGE_KEY = 'echo-astra.game-clock-anchor';
function readGameClockAnchor() {
  const now = Date.now();
  try {
    const saved = JSON.parse(window.localStorage.getItem(GAME_CLOCK_STORAGE_KEY) || 'null');
    const realTimestamp = Number(saved && saved.realTimestamp);
    const gameTimestamp = Number(saved && saved.gameTimestamp);
    if (Number.isFinite(realTimestamp) && realTimestamp > 0 && Number.isFinite(gameTimestamp) && gameTimestamp > 0) {
      return { realTimestamp, gameTimestamp };
    }
  } catch (error) { /* Start a new local demo clock when storage is unavailable. */ }
  const anchor = { realTimestamp: now, gameTimestamp: now };
  try { window.localStorage.setItem(GAME_CLOCK_STORAGE_KEY, JSON.stringify(anchor)); }
  catch (error) { /* Private browsing and file:// storage may be unavailable. */ }
  return anchor;
}
const gameClockAnchor = readGameClockAnchor();
function getGameTimestamp(realTimestamp = Date.now()) {
  return gameClockAnchor.gameTimestamp + (Number(realTimestamp) - gameClockAnchor.realTimestamp) * GAME_CLOCK_RATE;
}

function readSavedQuestTimers() {
  try {
    const saved = JSON.parse(window.localStorage.getItem('echo-astra.quest-timers') || '{}');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return {};
    return Object.keys(saved).reduce((timers, id) => {
      const timer = saved[id];
      if (timer && Number.isFinite(Number(timer.endsAtGame))) timers[id] = timer;
      return timers;
    }, {});
  } catch (error) { return {}; }
}

function saveQuestTimers() {
  try { window.localStorage.setItem('echo-astra.quest-timers', JSON.stringify(state.questTimers)); }
  catch (error) { /* Timers stay local to this demo install. */ }
}

const UPDATE_REPOSITORY = 'AlfaGideon/RPGGameAnime';
const UPDATE_BRANCH = 'arena/d3628144-rpggameanime';
const BUILD_MANIFEST_API = `https://api.github.com/repos/${UPDATE_REPOSITORY}/contents/apk-output/version.json?ref=${encodeURIComponent(UPDATE_BRANCH)}`;
const RELEASES_API = `https://api.github.com/repos/${UPDATE_REPOSITORY}/releases/latest`;
const RELEASES_PAGE = `https://github.com/${UPDATE_REPOSITORY}/releases`;
const LATEST_APK_URL = `https://github.com/${UPDATE_REPOSITORY}/releases/latest/download/Echo-Astra-UI-Prototype.apk`;

function readInstalledBuild() {
  const fallback = { versionName: '0.1.0', versionCode: 0 };
  try {
    const bridge = window.EchoAstraAndroid;
    if (!bridge || typeof bridge.getInstalledVersionName !== 'function') return fallback;
    const versionName = String(bridge.getInstalledVersionName() || fallback.versionName);
    const versionCode = typeof bridge.getInstalledVersionCode === 'function'
      ? Number(bridge.getInstalledVersionCode()) || 0
      : 0;
    return { versionName, versionCode };
  } catch (error) { return fallback; }
}

const installedBuild = readInstalledBuild();
const CURRENT_APP_VERSION = installedBuild.versionName;
const CURRENT_APP_VERSION_CODE = installedBuild.versionCode;

function readWorldProgress() {
  const fallback = { position: { ...LIOR_CITY.start }, travel: null };
  const validCell = point => point && Number.isInteger(Number(point.x)) && Number.isInteger(Number(point.y))
    && Number(point.x) >= 1 && Number(point.x) <= MAP_CONFIG.width
    && Number(point.y) >= 1 && Number(point.y) <= MAP_CONFIG.height;
  try {
    const saved = JSON.parse(window.localStorage.getItem('echo-astra.world-progress') || 'null');
    if (!saved || !saved.position) return fallback;
    if (Number(saved.mapVersion) !== WORLD_MAP_VERSION) {
      return { position: getLegacyMapPosition(saved.position), travel: null };
    }
    if (!validCell(saved.position)) return fallback;
    const position = { x: Number(saved.position.x), y: Number(saved.position.y) };
    if (isTerrainBlocked(position.x, position.y)) return fallback;
    const savedTravel = saved.travel;
    if (!savedTravel || !validCell(savedTravel.from) || !validCell(savedTravel.to)) return { position, travel: null };
    const startedAt = Number(savedTravel.startedAt);
    const storedEndsAt = Number(savedTravel.endsAt);
    const storedDurationMs = Number(savedTravel.durationMs);
    if (!Number.isFinite(startedAt) || !Number.isFinite(storedEndsAt) || !Number.isFinite(storedDurationMs) || storedDurationMs <= 0) return { position, travel: null };
    const from = { x: Number(savedTravel.from.x), y: Number(savedTravel.from.y) };
    const to = { x: Number(savedTravel.to.x), y: Number(savedTravel.to.y) };
    if (isTerrainBlocked(from.x, from.y) || isTerrainBlocked(to.x, to.y)) return { position, travel: null };
    const classId = combatClasses.some(item => item.id === savedTravel.classId) ? savedTravel.classId : 'guardian';
    const professionId = professions.some(item => item.id === savedTravel.professionId) ? savedTravel.professionId : 'blacksmith';
    const durationMs = getMovementDurationMs({ classId, professionId });
    const endsAt = startedAt + durationMs;
    if (endsAt <= Date.now()) return { position: to, travel: null };
    const fromBiome = getBiomeId(from.x, from.y);
    const toBiome = getBiomeId(to.x, to.y);
    const gameEndsAt = getGameTimestamp(endsAt);
    return {
      position: from,
      travel: {
        from, to, fromBiome, toBiome, biomeTransition: fromBiome !== toBiome,
        classId, professionId, durationMs, startedAt, endsAt, gameEndsAt,
        gameDurationSeconds: getMovementGameSeconds(durationMs)
      }
    };
  } catch (error) { return fallback; }
}

function readAutoUpdatePreference() {
  try { return window.localStorage.getItem('echo-astra.auto-update') === 'true'; }
  catch (error) { return false; }
}

function saveAutoUpdatePreference(enabled) {
  try { window.localStorage.setItem('echo-astra.auto-update', String(enabled)); }
  catch (error) { /* Private browsing and file:// storage may be unavailable. */ }
}

const navItems = [
  { id: 'home', label: 'Главная', icon: '⌂' },
  { id: 'map', label: 'Карта', icon: '⌖' },
  { id: 'quests', label: 'Задания', icon: '✦' },
  { id: 'character', label: 'Персонаж', icon: '◉' },
  { id: 'city', label: 'Город', icon: '▦' },
  { id: 'social', label: 'Связь', icon: '✉' }
];

const COMBAT_STORAGE_KEY = 'echo-astra.combat-v1';
function readSavedCombatData() {
  const empty = { encounter: null, history: { wins: 0, losses: 0, retreats: 0, xp: 0, marks: 0 } };
  try {
    const saved = JSON.parse(window.localStorage.getItem(COMBAT_STORAGE_KEY) || 'null');
    if (!saved || typeof saved !== 'object' || Array.isArray(saved)) return empty;
    const history = saved.history && typeof saved.history === 'object' && !Array.isArray(saved.history) ? saved.history : {};
    const safeCount = value => Math.max(0, Math.min(999999, Math.floor(Number(value) || 0)));
    return {
      encounter: CombatEngine.restoreEncounter(saved.encounter),
      history: {
        wins: safeCount(history.wins), losses: safeCount(history.losses), retreats: safeCount(history.retreats),
        xp: safeCount(history.xp), marks: safeCount(history.marks)
      }
    };
  } catch (error) { return empty; }
}

const initialWorldProgress = readWorldProgress();
const initialCombatData = readSavedCombatData();

const state = {
  screen: 'welcome',
  classId: 'guardian',
  professionId: 'blacksmith',
  characterName: 'Астра',
  avatarId: readSavedAvatarId(),
  questFilter: 'Все',
  marketTab: 'Фиксированная цена',
  characterTab: 'Обзор',
  cityMode: 'lior',
  position: initialWorldProgress.position,
  travel: initialWorldProgress.travel,
  hasCloudTransport: false,
  combat: initialCombatData.encounter,
  combatHistory: initialCombatData.history,
  questTimers: readSavedQuestTimers(),
  autoUpdateEnabled: readAutoUpdatePreference(),
  updateStatus: 'idle',
  updateCheckInProgress: false,
  latestRelease: null,
  apkDownloadStatus: 'idle',
  apkDownloadProgress: 0,
  apkDownloadMessage: '',
  modalChoice: null,
  notifications: [
    { id: 1, glyph: '✦', title: 'Добро пожаловать в Лиор', text: 'Ты начинаешь путь в портовом городе. Иара ждёт на клетке 496:496.', time: 'Сейчас', category: 'Сюжет', unread: true },
    { id: 2, glyph: '⌖', title: 'Открой карту мира', text: 'Три масштаба карты: 10 × 10, 100 × 100 и 1 000 × 1 000. Белые облака непроходимы без транспорта.', time: 'Сейчас', category: 'Мир', unread: true },
    { id: 3, glyph: '⚙', title: 'Настройки героя', text: 'В тестовом режиме класс и профессию можно менять бесплатно.', time: 'Сейчас', category: 'Система', unread: false }
  ],
  nextNotificationId: 4
};

const screenEl = document.getElementById('screen');
const topbarEl = document.getElementById('topbar');
const navEl = document.getElementById('bottom-nav');
const toastEl = document.getElementById('toast');
const modalBackdrop = document.getElementById('modal-backdrop');
const modalCard = document.getElementById('modal-card');
let toastTimer;

const cls = () => combatClasses.find(x => x.id === state.classId) || combatClasses[0];
const prof = () => professions.find(x => x.id === state.professionId) || professions[0];
const getWalletMarks = () => 100 + state.combatHistory.marks;
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const formatCell = (x, y) => `${String(x).padStart(3, '0')}:${String(y).padStart(3, '0')}`;
const unreadNotificationCount = () => state.notifications.filter(item => item.unread).length;
const currentAvatar = () => AVATAR_OPTIONS.find(avatar => avatar.id === state.avatarId) || AVATAR_OPTIONS[0];
function avatarImageMarkup(avatar = currentAvatar()) {
  return `<img class="avatar-image" src="${avatar.src}" alt="${esc(avatar.name)}">`;
}
function professionIconMarkup(professionId, className = 'profession-icon') {
  const profession = professions.find(item => item.id === professionId) || professions[0];
  return `<img class="${className}" src="assets/icons/profession-${profession.id}.svg" alt="" aria-hidden="true">`;
}
function classArtMarkup(combatClass = cls()) {
  return `<img class="class-profession-art-image" src="assets/classes/${combatClass.id}.png" alt="${esc(combatClass.name)} — иллюстрация боевого класса">`;
}
function getMovementDurationMs({ classId = 'guardian', professionId = 'blacksmith' } = {}) {
  return MovementEngine.getCellDurationMs({ classId, professionId });
}
function getMovementGameSeconds(durationMs = getMovementDurationMs()) {
  return MovementEngine.getGameDurationSeconds(durationMs, GAME_CLOCK_RATE);
}
function formatMovementSeconds(durationMs) {
  const seconds = durationMs / 1000;
  return Number.isInteger(seconds) ? String(seconds) : String(Number(seconds.toFixed(2)));
}
const moscowClockFormatter = (() => {
  try {
    return new Intl.DateTimeFormat('ru-RU', { timeZone: 'Europe/Moscow', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false });
  } catch (error) { return null; }
})();
function formatMoscowClock(timestamp = Date.now()) {
  if (moscowClockFormatter) return moscowClockFormatter.format(new Date(timestamp));
  return new Date(timestamp + 3 * 60 * 60 * 1000).toISOString().slice(11, 19);
}
function formatMoscowTime(timestamp = Date.now()) {
  return `${formatMoscowClock(timestamp)} МСК`;
}
function formatGameClock(realTimestamp = Date.now()) {
  return formatMoscowClock(getGameTimestamp(realTimestamp));
}
function formatGameDuration(milliseconds) {
  const totalMinutes = Math.max(0, Math.ceil(milliseconds / 60000));
  const days = Math.floor(totalMinutes / 1440);
  const hours = Math.floor((totalMinutes % 1440) / 60);
  const minutes = totalMinutes % 60;
  if (days) return `${days} д ${hours} ч`;
  if (hours) return `${hours} ч ${minutes} мин`;
  return `${minutes} мин`;
}
function saveWorldProgress() {
  try { window.localStorage.setItem('echo-astra.world-progress', JSON.stringify({ mapVersion: WORLD_MAP_VERSION, position: state.position, travel: state.travel })); }
  catch (error) { /* Private browsing and file:// storage may be unavailable. */ }
}
function saveCombatData() {
  try { window.localStorage.setItem(COMBAT_STORAGE_KEY, JSON.stringify({ encounter: state.combat, history: state.combatHistory })); }
  catch (error) { /* Combat progress remains available for this session if storage is unavailable. */ }
}
function updateMoscowClocks() {
  const now = Date.now();
  const clock = formatMoscowClock(now);
  const gameClock = formatGameClock(now);
  document.querySelectorAll('[data-moscow-clock]').forEach(element => { element.textContent = clock; });
  document.querySelectorAll('[data-game-clock]').forEach(element => { element.textContent = gameClock; });
  document.querySelectorAll('[data-quest-timer]').forEach(element => {
    const timer = state.questTimers[element.dataset.questTimer];
    if (!timer) return;
    const remaining = Number(timer.endsAtGame) - getGameTimestamp(now);
    element.textContent = remaining <= 0 ? 'Срок истёк' : `${formatGameDuration(remaining)} игрового времени`;
    element.classList.toggle('expired', remaining <= 0);
  });
}
function avatarButtonMarkup(className = 'player-portrait', showEdit = true) {
  return `<button type="button" class="${className} avatar-picker-trigger" data-action="open-avatar-picker" title="Сменить аватар" aria-label="Сменить аватар игрока">${avatarImageMarkup()}${showEdit ? '<span class="avatar-edit-indicator" aria-hidden="true">✎</span>' : ''}</button>`;
}
const getPoi = id => pointsOfInterest.find(point => point.id === id);
const getPoiAt = (x, y) => pointsOfInterest.find(point => point.x === x && point.y === y);
const isAtPoi = point => state.position.x === point.x && state.position.y === point.y;

function addNotification(title, text, glyph = '✦', category = 'Мир', key = '') {
  if (key && state.notifications.some(item => item.key === key)) return;
  state.notifications.unshift({
    id: state.nextNotificationId++, key, glyph, title, text, category,
    time: 'Только что', unread: true
  });
  state.notifications = state.notifications.slice(0, 20);
  if (state.screen !== 'welcome' && state.screen !== 'choose-class' && state.screen !== 'intro' && state.screen !== 'choose-profession') renderShell();
}

function getTravelRemainingMs() {
  return state.travel ? Math.max(0, state.travel.endsAt - Date.now()) : 0;
}

function formatCountdown(milliseconds) {
  const totalSeconds = Math.ceil(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function renderShell() {
  const currentTitle = {
    home: 'Лиор · портовый район', map: 'Карта мира', quests: 'Журнал заданий',
    character: 'Профиль героя', city: 'Город и службы', social: 'Сообщество',
    market: 'Торговая площадь', combat: 'Испытание', settings: 'Настройки'
  }[state.screen] || 'Лиор';
  const unread = unreadNotificationCount();
  const travelChip = state.travel ? `<button class="travel-chip" data-nav="map" aria-label="Вернуться к путешествию">🚶 <span data-travel-countdown>${formatCountdown(getTravelRemainingMs())}</span></button>` : '';
  topbarEl.innerHTML = `
    <div class="brand-mini">
      <div class="brand-mark">ЭА</div>
      <div class="brand-name"><strong>ЭХО АСТРЫ</strong><span>${currentTitle}${state.position ? ` · ${formatCell(state.position.x, state.position.y)}` : ''}</span></div>
    </div>
    <div class="top-actions">
      ${travelChip}
      <button class="icon-button notification-button" data-action="notifications" aria-label="Уведомления${unread ? `, непрочитано: ${unread}` : ''}" title="Уведомления">
        ♧${unread ? `<span class="notification-count">${unread > 9 ? '9+' : unread}</span>` : ''}
      </button>
      <button class="icon-button settings-button" data-nav="settings" aria-label="Настройки" title="Настройки">⚙</button>
      ${avatarButtonMarkup('avatar-small', false)}
    </div>`;
}

function renderNav() {
  navEl.innerHTML = navItems.map(item => `
    <button class="nav-item ${state.screen === item.id ? 'active' : ''}" data-nav="${item.id}" aria-label="${item.label}">
      <span class="nav-icon">${item.icon}</span><span>${item.label}</span>
    </button>`).join('');
}

function renderMap() {
  const { x, y } = state.position;
  const viewSize = MAP_CONFIG.localSize;
  const minX = Math.max(1, Math.min(MAP_CONFIG.width - viewSize + 1, x - Math.floor(viewSize / 2)));
  const minY = Math.max(1, Math.min(MAP_CONFIG.height - viewSize + 1, y - Math.floor(viewSize / 2)));
  const maxX = minX + viewSize - 1;
  const maxY = minY + viewSize - 1;
  const currentBiomeId = getBiomeId(x, y);
  const currentBiome = BIOME_INFO[currentBiomeId];
  const currentPoi = getPoiAt(x, y);
  const locationName = isInsideLior(x, y) ? 'Лиор · стартовый город' : (currentPoi ? currentPoi.name : currentBiome.name);
  const progress = state.travel ? Math.max(0, Math.min(100, ((Date.now() - state.travel.startedAt) / state.travel.durationMs) * 100)) : 0;
  const travelGameArrival = state.travel ? (Number(state.travel.gameEndsAt) || getGameTimestamp(state.travel.endsAt)) : 0;
  const nextStepDurationMs = getMovementDurationMs({ classId: state.classId, professionId: state.professionId });
  const nextStepGameSeconds = getMovementGameSeconds(nextStepDurationMs);
  const travelPanel = state.travel ? `
    <div class="card travel-panel">
      <div class="travel-panel-heading"><div><span class="eyebrow">перемещение</span><strong>Путь к клетке ${formatCell(state.travel.to.x, state.travel.to.y)}</strong></div><strong class="travel-countdown" data-travel-countdown>${formatCountdown(getTravelRemainingMs())}</strong></div>
      <div class="travel-progress"><span data-travel-progress style="width:${progress}%"></span></div>
      <p>${state.travel.gameDurationSeconds} игровых секунд · прибытие ${formatMoscowTime(state.travel.endsAt)} · игровое время прибытия ${formatMoscowClock(travelGameArrival)}. Игровые часы идут в 5 раз быстрее московских.</p>
    </div>` : `
    <div class="map-travel-note"><span class="travel-note-icon">⌛</span><span><strong>${cls().name} + ${prof().name}: ${formatMovementSeconds(nextStepDurationMs)} сек. за клетку.</strong> Базовый шаг — 6 секунд; класс и профессия меняют темп, Следопыт быстрее Стража. Сейчас это ${nextStepGameSeconds} игровых секунд при соотношении 1 ч МСК = 5 ч игры. Хребты и скалы непроходимы, облакам нужен транспорт.</span></div>`;

  const tiles = [];
  for (let rowY = minY; rowY <= maxY; rowY += 1) {
    for (let columnX = minX; columnX <= maxX; columnX += 1) {
      const current = columnX === x && rowY === y;
      const distance = Math.abs(columnX - x) + Math.abs(rowY - y);
      const biomeId = getBiomeId(columnX, rowY);
      const feature = getTerrainFeatureAt(columnX, rowY);
      const terrainId = feature ? feature.id : biomeId;
      const poi = getPoiAt(columnX, rowY);
      const target = state.travel && state.travel.to.x === columnX && state.travel.to.y === rowY;
      const terrainBlocked = !state.travel && distance === 1 && isTerrainBlocked(columnX, rowY, state.hasCloudTransport);
      const canMove = !state.travel && distance === 1 && !terrainBlocked;
      const blockReason = feature && feature.id === 'mountain' ? 'mountain' : feature && feature.id === 'cloud-rock' ? 'rock' : 'cloud';
      const blockHint = blockReason === 'mountain' ? ' · хребет нельзя пересечь даже на транспорте' : blockReason === 'rock' ? ' · скала всегда непроходима' : ' · пешком нельзя, нужен транспорт';
      const attrs = current && poi
        ? `data-action="interact-current" data-poi-id="${poi.id}"`
        : terrainBlocked
          ? `data-terrain-blocked data-block-reason="${blockReason}"`
          : canMove
            ? `data-map-move data-map-x="${columnX}" data-map-y="${rowY}"`
            : 'disabled';
      const tileName = feature ? feature.name : BIOME_INFO[biomeId].name;
      const tileLabel = `Клетка ${formatCell(columnX, rowY)} · ${tileName}${poi ? ` · ${poi.name}` : ''}${current ? ' · вы здесь' : ''}${terrainBlocked ? blockHint : ''}`;
      const marker = current ? '<span class="you-marker">●</span>' : poi ? `<span class="poi-marker">${poi.glyph}</span>` : `<span class="biome-marker">${feature ? feature.glyph : BIOME_INFO[biomeId].glyph}</span>`;
      tiles.push(`<button type="button" class="world-tile biome-${terrainId}${feature ? ' terrain-feature' : ''}${current ? ' current-tile' : ''}${poi ? ' poi-tile' : ''}${target ? ' travel-target' : ''}${canMove ? ' reachable-tile' : ''}${terrainBlocked ? ' terrain-locked' : ''}" ${attrs} aria-label="${esc(tileLabel)}" title="${esc(tileLabel)}">${marker}</button>`);
    }
  }

  const worldRegionX = Math.floor((x - 1) / MAP_CONFIG.worldRegionSize);
  const worldRegionY = Math.floor((y - 1) / MAP_CONFIG.worldRegionSize);
  const regionStartX = worldRegionX * MAP_CONFIG.worldRegionSize + 1;
  const regionStartY = worldRegionY * MAP_CONFIG.worldRegionSize + 1;
  const currentPatchX = Math.floor(((x - 1) % MAP_CONFIG.worldRegionSize) / MAP_CONFIG.biomeSize);
  const currentPatchY = Math.floor(((y - 1) % MAP_CONFIG.worldRegionSize) / MAP_CONFIG.biomeSize);
  const biomeTiles = Array.from({ length: 10 }, (_, patchY) => Array.from({ length: 10 }, (_, patchX) => {
    const patchMinX = regionStartX + patchX * MAP_CONFIG.biomeSize;
    const patchMinY = regionStartY + patchY * MAP_CONFIG.biomeSize;
    const patchMaxX = patchMinX + MAP_CONFIG.biomeSize - 1;
    const patchMaxY = patchMinY + MAP_CONFIG.biomeSize - 1;
    const sampleX = patchMinX + 4;
    const sampleY = patchMinY + 4;
    const baseBiomeId = getBiomeId(sampleX, sampleY);
    const feature = getTerrainFeatureInBounds(patchMinX, patchMinY, patchMaxX, patchMaxY);
    const terrainId = feature ? feature.id : baseBiomeId;
    const currentPatch = patchX === currentPatchX && patchY === currentPatchY;
    const name = `${feature ? feature.name : BIOME_INFO[baseBiomeId].name} · участок ${patchX + 1}:${patchY + 1} · 10 × 10 клеток`;
    const marker = feature ? feature.glyph : currentPatch ? '●' : baseBiomeId === 'city' ? '⌂' : '';
    return `<span class="sector-tile biome-${terrainId}${feature ? ' terrain-feature' : ''}${currentPatch ? ' active-sector' : ''}" title="${esc(name)}" aria-label="${esc(name)}">${marker}</span>`;
  }).join('')).join('');

  const worldTiles = worldBiomeRegions.map((row, rowIndex) => row.map((biomeId, columnIndex) => {
    const currentRegion = columnIndex === worldRegionX && rowIndex === worldRegionY;
    const regionMinX = columnIndex * MAP_CONFIG.worldRegionSize + 1;
    const regionMinY = rowIndex * MAP_CONFIG.worldRegionSize + 1;
    const feature = getTerrainFeatureInBounds(regionMinX, regionMinY, regionMinX + MAP_CONFIG.worldRegionSize - 1, regionMinY + MAP_CONFIG.worldRegionSize - 1);
    const terrainId = feature ? feature.id : biomeId;
    const cityRegion = Math.floor((LIOR_CITY.start.x - 1) / MAP_CONFIG.worldRegionSize) === columnIndex
      && Math.floor((LIOR_CITY.start.y - 1) / MAP_CONFIG.worldRegionSize) === rowIndex;
    const name = `${feature ? feature.name : BIOME_INFO[biomeId].name} · область ${columnIndex + 1}:${rowIndex + 1} · 100 × 100 клеток${cityRegion ? ' · здесь Лиор' : ''}`;
    const marker = cityRegion ? '⌂' : feature ? feature.glyph : currentRegion ? '●' : '';
    return `<span class="sector-tile world-region-tile biome-${terrainId}${feature ? ' terrain-feature' : ''}${currentRegion ? ' active-sector' : ''}${cityRegion ? ' city-region' : ''}" title="${esc(name)}" aria-label="${esc(name)}">${marker}</span>`;
  }).join('')).join('');

  const nearbyPoints = pointsOfInterest
    .map(point => ({ ...point, distance: Math.abs(point.x - x) + Math.abs(point.y - y) }))
    .filter(point => point.distance <= 10)
    .sort((a, b) => a.distance - b.distance)
    .map(point => `<button class="map-poi-row card-flat" data-action="visit-poi" data-poi-id="${point.id}">
      <span class="map-poi-glyph">${point.glyph}</span><span class="map-poi-copy"><strong>${point.name}</strong><small>${point.description}</small></span>
      <span class="map-poi-distance ${point.distance === 0 ? 'here' : ''}">${point.distance === 0 ? 'Здесь' : `${point.distance} кл.`}<small>${formatCell(point.x, point.y)}</small></span>
    </button>`).join('');

  screenEl.innerHTML = `
    <div class="page-title-row map-page-title"><div><div class="eyebrow">Эйра · мир 1000 × 1000 клеток</div><h1>Карта мира</h1><p>Три масштаба: участок, биом и весь мир.</p></div><span class="badge badge-teal">${currentBiome.glyph} ${currentBiome.short}</span></div>
    <section class="card map-location-card">
      <div class="map-location-pin">⌖</div>
      <div class="map-location-copy"><span class="eyebrow">текущее местоположение</span><strong>${locationName}</strong><span>${currentBiome.name} · клетка ${formatCell(x, y)}</span></div>
      <div class="map-time-panel"><div class="map-coordinate">X ${String(x).padStart(3, '0')} · Y ${String(y).padStart(3, '0')}</div><div class="map-clock-pair" aria-label="Обычное и игровое время"><span class="map-clock-chip"><small>МСК</small><b data-moscow-clock>${formatMoscowClock()}</b></span><span class="map-clock-chip game-clock-chip" title="1 час по Москве равен 5 игровым часам"><small>ИГРА ×5</small><b data-game-clock>${formatGameClock()}</b></span></div></div>
    </section>
    ${travelPanel}
    <section class="card map-view-card">
      <div class="map-view-heading"><div><strong>Обычный биом · 10 × 10 клеток</strong><span>Каждый квадрат — клетка; шаг только к соседней клетке</span></div><span class="map-scale">${formatCell(minX, minY)}—${formatCell(maxX, maxY)}</span></div>
      <div class="world-map-grid" role="group" aria-label="Локальная карта 10 на 10 клеток">${tiles.join('')}</div>
      <div class="map-direction-hint"><span class="direction-dot"></span>Белые облака требуют транспорта; хребты и скальные выступы нельзя пересечь — их обходят.</div>
    </section>
    <div class="map-legend card-flat">
      ${Object.entries(BIOME_INFO).map(([id, biome]) => `<span><i class="legend-swatch biome-${id}"></i>${biome.short}</span>`).join('')}
      <span><i class="legend-icon">✦</i>точка интереса</span><span><i class="legend-icon current-legend">●</i>ты</span>
    </div>
    ${currentPoi ? `<section class="card map-current-poi"><div class="map-poi-glyph">${currentPoi.glyph}</div><div class="map-poi-copy"><span class="eyebrow">точка на этой клетке</span><strong>${currentPoi.name}</strong><small>${currentPoi.description}</small></div><button class="btn btn-primary btn-small" data-action="interact-current" data-poi-id="${currentPoi.id}">${currentPoi.kind === 'npc' ? 'Поговорить' : 'Войти'}</button></section>` : ''}
    <details class="world-overview card-flat"><summary><span><strong>Карта биома · 100 × 100 клеток</strong><small>10 × 10 участков · каждый 10 × 10 клеток</small></span><span class="overview-toggle">＋</span></summary><div class="sector-grid" role="img" aria-label="Биом 100 на 100 клеток">${biomeTiles}</div><div class="overview-caption"><span>● текущий участок</span><span>Область ${worldRegionX + 1}:${worldRegionY + 1}</span></div></details>
    <details class="world-overview card-flat"><summary><span><strong>Общая мировая карта · 1000 × 1000</strong><small>10 × 10 областей · каждая 100 × 100 клеток</small></span><span class="overview-toggle">＋</span></summary><div class="sector-grid" role="img" aria-label="Мировая карта 1000 на 1000 клеток">${worldTiles}</div><div class="overview-caption"><span>⌂ стартовый город Лиор</span><span>● текущая область</span></div></details>
    <div class="section-head map-poi-heading"><h2>Точки поблизости</h2><span class="badge">по координатам</span></div>
    <div class="map-poi-list">${nearbyPoints || '<div class="card-flat empty-note">В радиусе 10 клеток отмеченных точек пока нет.</div>'}</div>
    <div class="notice map-rule-note">Стартовая точка — город Лиор. NPC доступны на своей клетке; переходы и время сохраняются локально. Облачные зоны блокируют пешее перемещение до получения транспорта.</div>`;
}

function renderWelcome() {
  screenEl.innerHTML = `
    <section class="welcome-screen">
      <div class="welcome-brand">
        <div class="welcome-mark">ЭА</div>
        <div><div class="eyebrow">мобильный UI-прототип</div><div class="small muted">аниме-RPG · локальная демонстрационная игра</div></div>
      </div>
      <div class="welcome-art">
        <img class="welcome-logo-art" src="assets/echo-astra-logo.png" alt="Логотип «Эхо Астры»: парящий город под звёздным маяком">
      </div>
      <div class="welcome-copy">
        <div class="eyebrow">добро пожаловать в Эйру</div>
        <h1>Мир ждёт<br>твоего имени</h1>
        <p>Создай героя, выбери боевой класс, пройди общее вступление и открой свою профессию.</p>
        <div class="welcome-actions">
          <button class="btn btn-primary btn-block" data-action="start-create">Создать персонажа <span aria-hidden="true">→</span></button>
          <button class="btn btn-secondary btn-block" data-action="quick-demo">Посмотреть демо-героя</button>
        </div>
        <p class="demo-note">Без сетевого сервера: карта, часы, бой и прогресс схваток работают только на этом устройстве.</p>
      </div>
    </section>`;
}

function ratingDots(value) {
  return `<div class="rating-row" aria-label="Оценка ${value} из 5">${[1,2,3,4,5].map(n => `<span class="rating-dot ${n <= value ? 'on' : ''}"></span>`).join('')}</div>`;
}

function renderClassChoice() {
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">создание персонажа · шаг 1 из 3</div><h1>Выбери боевой класс</h1><p>Профессию выберешь после общего вступительного задания.</p></div></div>
    <div class="form-row"><label for="hero-name">Имя персонажа</label><input id="hero-name" class="input" maxlength="18" placeholder="Например, Астра" value="${esc(state.characterName === 'Астра' ? '' : state.characterName)}"></div>
    <div class="class-grid class-art-grid">${combatClasses.map(c => `
      <button class="choice-card class-art-choice-card ${state.classId === c.id ? 'selected' : ''}" data-pick-class="${c.id}" style="--class-accent:${c.accent}">
        <span class="class-choice-image"><img src="assets/classes/${c.id}.png" alt="" aria-hidden="true"></span>
        <div class="class-choice-details"><span class="choice-icon" style="color:${c.accent}">${c.glyph}</span><strong>${c.name}</strong><small>${c.role}</small>
        <div class="class-rating-row">${ratingDots(c.damage)}</div><small class="tiny">Урон ${c.damage} · стойкость ${c.durability} · поддержка ${c.support}</small></div>
      </button>`).join('')}</div>
    <div class="choice-footer"><button class="btn btn-primary btn-block" data-action="to-intro">Подтвердить и продолжить</button><button class="btn btn-secondary btn-block" data-action="go-welcome">Назад</button></div>`;
}

function renderIntro() {
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">общее задание · одинаковое для всех</div><h1>На берег!</h1><p>Шаг 2 из 3 · знакомство с миром</p></div><span class="badge badge-gold">ЛИОР</span></div>
    <div class="hero-art" style="min-height:170px;margin-bottom:15px"><div class="hero-content"><div class="hero-location">сигнальный узел отключён</div><h2>Маяк молчит</h2><p>Над портом сгущается шторм.</p></div><div class="hero-bottom"><span class="chip">Общий пролог</span><span class="chip">${cls().name}</span></div></div>
    <div class="card card-pad">
      <div class="player-identity"><div class="player-portrait">👩‍🔧</div><div><div class="player-name">Иара Кест</div><div class="player-subtitle">Инженер маяков · NPC</div></div></div>
      <p style="margin:15px 0 0">«Помоги мне добраться до узла. Если маяк не заговорит снова, Лиор останется один перед штормом».</p>
      <div class="divider-label">цель задания</div>
      <div class="list-card card-flat"><div class="list-icon">✦</div><div class="list-copy"><strong>Запустить временный сигнал</strong><span>Найти детали и помочь жителям у порта.</span></div><span class="badge badge-teal">0/1</span></div>
      <div class="intro-quote" style="margin-top:15px">«Не пробуждайте Сердце. Каждый новый сигнал стирает то, что оно хранит».</div>
    </div>
    <div class="intro-actions"><button class="btn btn-primary btn-block" data-action="finish-intro">Завершить общий пролог</button><button class="btn btn-secondary btn-block" data-action="go-class">Назад к выбору класса</button></div>
    <p class="demo-note">В демо кнопка завершения только открывает следующий экран.</p>`;
}

function renderProfessionChoice() {
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">создание персонажа · шаг 3 из 3</div><h1>Выбери профессию</h1><p>Твой путь в ремесле, экономике и городах.</p></div></div>
    <div class="notice teal-notice" style="margin-bottom:13px">Твой боевой класс: <strong>${cls().glyph} ${cls().name}</strong>. Теперь выбери одну активную профессию.</div>
    <div class="class-grid">${professions.map(p => `
      <button class="choice-card ${state.professionId === p.id ? 'selected' : ''}" data-pick-profession="${p.id}">
        <div class="choice-icon" style="--choice-accent:${p.accent};color:${p.accent};background:rgba(242,198,109,.08)">${professionIconMarkup(p.id)}</div><strong>${p.name}</strong><small>${p.summary}</small>
      </button>`).join('')}</div>
    <div class="choice-footer"><button class="btn btn-primary btn-block" data-action="finish-creation">Войти в Лиор</button><button class="btn btn-secondary btn-block" data-action="go-intro">Назад</button></div>`;
}

function renderHome() {
  const c = cls();
  const p = prof();
  const inLior = isInsideLior(state.position.x, state.position.y);
  const currentBiomeName = BIOME_INFO[getBiomeId(state.position.x, state.position.y)].name;
  screenEl.innerHTML = `
    <div class="player-strip">
      <div class="player-identity">${avatarButtonMarkup('player-portrait', true)}<div style="min-width:0"><div class="player-name">${esc(state.characterName || 'Астра')} · Уровень 1</div><div class="player-subtitle">${c.name} <span class="muted">·</span> ${p.name}</div></div></div>
      <div class="currency-pill">✧ ${getWalletMarks()}</div>
    </div>
    <div class="home-location-card card-flat"><span class="home-location-icon">⌖</span><div><strong>${isInsideLior(state.position.x, state.position.y) ? 'Лиор · стартовый город' : BIOME_INFO[getBiomeId(state.position.x, state.position.y)].name}</strong><small>Клетка ${formatCell(state.position.x, state.position.y)}</small></div><button class="text-action" data-nav="map">Карта →</button></div>
    <section class="hero-art ${inLior ? 'hero-art--lior' : ''}">
      <div class="hero-content"><div class="hero-top"><div><div class="hero-location">${inLior ? 'первая безопасная гавань' : 'текущее место'}</div><h2>${inLior ? 'Лиор' : esc(currentBiomeName)}</h2><p>${inLior ? 'Порт над облаками' : `Клетка ${formatCell(state.position.x, state.position.y)}`}</p></div>${inLior ? '<span class="badge badge-gold">☀ ясное утро</span>' : ''}</div></div>
      ${inLior ? '<div class="hero-bottom"><button class="chip" data-action="visit-poi" data-poi-id="iara">✧ Иара · маяк</button><button class="chip" data-action="visit-poi" data-poi-id="smith">⚒ Кузница</button><button class="chip" data-action="visit-poi" data-poi-id="quest-board">✦ Доска заданий</button></div>' : ''}
    </section>
    <div class="section-head"><h2>Твой путь</h2><button data-nav="quests">Все задания</button></div>
    <section class="card quest-card">
      <div class="quest-meta"><span class="badge badge-gold">ОСНОВНОЙ СЮЖЕТ</span><span class="badge">Глава 1</span></div>
      <div class="quest-title">Город над облаками</div><p class="quest-desc">Помоги Лиору восстановить связь с соседними островами.</p>
      <div class="quest-progress"><span>Сигнальный узел</span><span>1 / 3</span></div><div class="progress-line"><span style="width:34%"></span></div>
      <button class="text-action" data-action="open-quests">Продолжить →</button>
    </section>
    <div class="section-head"><h2>Личные направления</h2><button data-nav="character">Профиль</button></div>
    <div class="path-grid">
      <article class="card path-card" data-glyph="${c.glyph}">
        <div class="path-icon" style="color:${c.accent}">${c.glyph}</div><span class="badge badge-teal">БОЕВОЙ КЛАСС</span>
        <h3 style="margin-top:9px">${c.path}</h3><p>${c.pathText}</p><button class="text-action" data-action="open-combat-path">${c.pathAction} →</button>
      </article>
      <article class="card path-card profession" data-glyph="">
        <div class="path-icon" style="--choice-accent:${p.accent};color:${p.accent}">${professionIconMarkup(p.id)}</div><span class="badge badge-gold">ПРОФЕССИЯ</span>
        <h3 style="margin-top:9px">${p.work}</h3><p>${p.workText}</p><button class="text-action" data-action="open-profession">${p.action} →</button>
      </article>
    </div>
    <div class="section-head"><h2>Быстрые действия</h2></div>
    <div class="action-row">
      <button class="card action-tile" data-action="open-combat"><span class="tile-icon">⚔</span><strong>Испытание</strong><span>Пошаговый бой с Эхо</span></button>
      <button class="card action-tile" data-action="open-market"><span class="tile-icon">◈</span><strong>Рынок</strong><span>Заказы и товары</span></button>
      <button class="card action-tile" data-action="open-social"><span class="tile-icon">⌘</span><strong>Помощь</strong><span>Найти игрока</span></button>
    </div>
    <div class="notice" style="margin-top:15px">Карта, часы и пошаговый бой работают локально на устройстве. Сетевые функции, постоянная экономика и общий игровой прогресс пока не реализованы.</div>`;
}

function getQuestRows() {
  return [
    { id: 'main-story', group: 'Основной сюжет', glyph: '✦', title: 'Город над облаками', desc: 'Помоги Иаре восстановить сигнальный узел.', status: '1/3', reward: '40 м', deadlineGameMinutes: 12 * 60 },
    { id: 'class-path', group: 'Боевой класс', glyph: cls().glyph, title: cls().path, desc: cls().pathText, status: '0/4', reward: 'Опыт' },
    { id: 'profession-order', group: 'Профессия', glyph: professionIconMarkup(prof().id), title: prof().work, desc: prof().workText, status: 'Заказ', reward: 'Материалы', deadlineGameMinutes: 8 * 60 },
    { id: 'lost-expedition', group: 'Побочные', glyph: '☼', title: 'Пропавшая экспедиция', desc: 'Мейра ищет записи о грузе, не дошедшем до порта.', status: 'Новое', reward: '25 м', deadlineGameMinutes: 6 * 60 },
    { id: 'daily-workshop', group: 'Ежедневные', glyph: '◷', title: 'Поручения мастерской', desc: 'Помоги одной из служб Лиора выполнить небольшой заказ.', status: 'Ежедневно', reward: '20 м', deadlineGameMinutes: 24 * 60 },
    { id: 'storm-signal', group: 'Еженедельные', glyph: '⚑', title: 'Сигнал из шторма', desc: 'Собери группу и проверь нестабильный маяк.', status: 'Еженедельно', reward: '100 м', deadlineGameMinutes: 72 * 60 }
  ];
}

function questTimerMarkup(quest) {
  if (!quest.deadlineGameMinutes) return '';
  const timer = state.questTimers[quest.id];
  const remaining = timer ? Number(timer.endsAtGame) - getGameTimestamp() : null;
  const running = Number.isFinite(remaining) && remaining > 0;
  const expired = Number.isFinite(remaining) && remaining <= 0;
  const timeLabel = running
    ? `${formatGameDuration(remaining)} игрового времени`
    : expired
      ? 'Срок истёк'
      : `${formatGameDuration(quest.deadlineGameMinutes * 60000)} на выполнение`;
  const action = running ? 'reset-quest-timer' : 'start-quest-timer';
  const actionLabel = running ? 'Сбросить' : expired ? 'Заново' : 'Запустить';
  return `<div class="quest-timer-row"><span class="quest-timer-icon" aria-hidden="true">◷</span><span class="quest-timer-copy"><small>Игровой срок</small><strong class="quest-timer-value${expired ? ' expired' : ''}" data-quest-timer="${quest.id}">${timeLabel}</strong></span><button class="quest-timer-button" data-action="${action}" data-quest-id="${quest.id}" aria-label="${actionLabel} игровой таймер: ${esc(quest.title)}">${actionLabel}</button></div>`;
}

function renderQuests() {
  const filters = ['Все', 'Основной сюжет', 'Боевой класс', 'Профессия', 'Побочные', 'Повторяющиеся'];
  const rows = getQuestRows().filter(q => {
    if (state.questFilter === 'Все') return true;
    if (state.questFilter === 'Повторяющиеся') return q.group === 'Ежедневные' || q.group === 'Еженедельные';
    return q.group === state.questFilter;
  });
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">журнал героя</div><h1>Задания</h1><p>Сроки отсчитываются в игровом времени: 1 час МСК = 5 игровых часов.</p></div><span class="badge badge-gold">6 открыто</span></div>
    <div class="filter-row">${filters.map(f => `<button class="filter-chip ${state.questFilter === f ? 'active' : ''}" data-filter="${f}">${f}</button>`).join('')}</div>
    <div class="list-stack">${rows.map(q => `
      <div class="quest-list-entry"><button class="card list-card" data-action="quest-detail" data-title="${esc(q.title)}">
        <div class="list-icon">${q.glyph}</div><div class="list-copy"><strong>${q.title}</strong><span>${q.desc}</span><div class="quest-meta" style="margin:7px 0 0"><span class="badge">${q.group}</span><span class="badge badge-teal">${q.status}</span></div></div><span class="list-side">${q.reward}</span>
      </button>${questTimerMarkup(q)}</div>`).join('')}
    </div>
    <div class="notice" style="margin-top:14px">Демо-таймеры показывают срок в игровом времени и сохраняются только на устройстве. Кнопка «Запустить» начинает локальный отсчёт; реальные игровые задания в прототипе не выдаются.</div>`;
}

function startQuestTimer(questId) {
  const quest = getQuestRows().find(item => item.id === questId);
  if (!quest || !quest.deadlineGameMinutes) return;
  const startedAtGame = getGameTimestamp();
  state.questTimers[questId] = {
    startedAtGame,
    endsAtGame: startedAtGame + quest.deadlineGameMinutes * 60000,
    durationGameMinutes: quest.deadlineGameMinutes
  };
  saveQuestTimers();
  render();
  showToast(`Игровой срок запущен · ${formatGameDuration(quest.deadlineGameMinutes * 60000)}`);
}

function resetQuestTimer(questId) {
  if (!state.questTimers[questId]) return;
  delete state.questTimers[questId];
  saveQuestTimers();
  render();
  showToast('Демо-таймер задания сброшен');
}

function renderCharacter() {
  const c = cls();
  const p = prof();
  const content = state.characterTab === 'Обзор' ? `
    <div class="card card-pad"><div class="player-identity">${avatarButtonMarkup('player-portrait', true)}<div><div class="player-name">${esc(state.characterName || 'Астра')}</div><div class="player-subtitle">Уровень 1 · Откликнувшийся</div></div><span class="badge badge-gold">${getWalletMarks()} м</span></div>
      <div class="stat-grid"><div class="card-flat stat-box"><strong>${c.damage}</strong><span>Урон</span></div><div class="card-flat stat-box"><strong>${c.durability}</strong><span>Стойкость</span></div><div class="card-flat stat-box"><strong>${c.support}</strong><span>Поддержка</span></div></div>
      <div class="list-card card-flat"><div class="list-icon">${c.glyph}</div><div class="list-copy"><strong>${c.name}</strong><span>${c.role}</span></div><span class="badge badge-teal">Боевой путь</span></div>
      <div class="list-card card-flat" style="margin-top:8px"><div class="list-icon profession-list-icon">${professionIconMarkup(p.id)}</div><div class="list-copy"><strong>${p.name}</strong><span>${p.role}</span></div><span class="badge badge-gold">Профессия</span></div>
    </div>
    <div class="section-head"><h2>Сюжетные линии</h2></div>
    <div class="list-stack"><div class="card list-card"><div class="list-icon">✦</div><div class="list-copy"><strong>Общий сюжет</strong><span>Город над облаками · этап 1 из 3</span></div><span class="badge">Общий</span></div><div class="card list-card"><div class="list-icon">${c.glyph}</div><div class="list-copy"><strong>${c.path}</strong><span>Персональная линия боевого класса</span></div><span class="badge badge-teal">0/4</span></div><div class="card list-card"><div class="list-icon profession-list-icon">${professionIconMarkup(p.id)}</div><div class="list-copy"><strong>${p.name}: начало пути</strong><span>Профессия и городские поручения</span></div><span class="badge badge-gold">0/5</span></div></div>` : state.characterTab === 'Инвентарь' ? `
    <div class="card card-pad"><div class="section-head" style="margin-top:0"><h2>Снаряжение</h2><span class="badge">4 предмета</span></div>${[['⚔','Короткий меч','Обычный · металлический'],['🛡','Дорожный щит','Обычный · защитный'],['⛏','Простая кирка','Инструмент'],['✧','Осколок маяка','Сюжетный предмет']].map(x=>`<div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${x[0]}</div><div class="list-copy"><strong>${x[1]}</strong><span>${x[2]}</span></div><button class="text-action" data-action="item-details">Открыть</button></div>`).join('')}</div>` : `
    <div class="card card-pad"><div class="section-head" style="margin-top:0"><h2>Способности</h2><span class="badge badge-teal">${c.name}</span></div>${[c.skill,'Защитная стойка','Сигнал Отклика'].map((x,i)=>`<div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${i===0?c.glyph:'✧'}</div><div class="list-copy"><strong>${x}</strong><span>${i===0?c.role:'Откроется по мере развития.'}</span></div><span class="badge">${i===0?'Доступно':'Закрыто'}</span></div>`).join('')}</div>`;
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">герой и развитие</div><h1>Персонаж</h1><p>Боевой путь и профессия развиваются отдельно.</p></div>${avatarButtonMarkup('player-portrait', true)}</div>
    <section class="class-profession-art" aria-label="Иллюстрация боевого класса и значок профессии">
      ${classArtMarkup(c)}<div class="class-profession-art-shade"></div>
      <div class="class-profession-art-copy"><span class="eyebrow">боевой класс</span><strong>${c.name}</strong><span class="profession-art-badge">${professionIconMarkup(p.id)}<span>${p.name}</span></span></div>
    </section>
    <div class="notice teal-notice">В тестовом режиме класс и профессию можно бесплатно сменить в настройках. В полноценной игре для этого появятся отдельные правила.</div>
    <div class="segmented">${['Обзор','Инвентарь','Способности'].map(t=>`<button class="${state.characterTab===t?'active':''}" data-character-tab="${t}">${t}</button>`).join('')}</div>
    ${content}
    <section class="card character-build-card">
      <div class="build-summary-row"><span class="build-summary-icon">${c.glyph}</span><div><span class="eyebrow">текущая сборка</span><strong>${c.name} · ${p.name}</strong><small>${c.role} · ${p.role}</small></div></div>
      <button class="btn btn-secondary btn-block" data-nav="settings">Настроить класс и профессию →</button>
      <p class="small">Переключатели находятся в настройках героя.</p>
    </section>`;
}

function getUpdateStatusText() {
  if (state.updateCheckInProgress || state.updateStatus === 'checking') return 'Ищем сборку APK в манифесте и GitHub Releases…';
  if (state.updateStatus === 'no-release') return 'Манифест сборки и опубликованный APK-релиз не найдены.';
  if (state.updateStatus === 'current') return `Установлена актуальная сборка ${state.latestRelease ? state.latestRelease.version_name : CURRENT_APP_VERSION}.`;
  if (state.updateStatus === 'update') return `Найдена новая сборка ${state.latestRelease ? state.latestRelease.version_name : ''}.`;
  if (state.updateStatus === 'error') return 'GitHub сейчас недоступен. Проверь подключение и попробуй ещё раз.';
  return 'Проверка версии ещё не выполнялась.';
}

function isApkDownloadBusy() {
  return ['starting', 'downloading', 'verifying', 'permission', 'installing'].includes(state.apkDownloadStatus);
}

function getApkDownloadStatusText() {
  if (state.apkDownloadStatus === 'starting') return 'Подготавливаем безопасную загрузку…';
  if (state.apkDownloadStatus === 'downloading') return `Скачиваем APK…${state.apkDownloadProgress > 0 ? ` ${state.apkDownloadProgress}%` : ''}`;
  if (state.apkDownloadStatus === 'verifying') return 'Проверяем SHA-256 и подпись APK…';
  if (state.apkDownloadStatus === 'permission') return state.apkDownloadMessage || 'Разреши установку приложений для «Эхо Астры» в системных настройках и вернись в игру.';
  if (state.apkDownloadStatus === 'installing') return state.apkDownloadMessage || 'Подтверди установку в системном окне Android.';
  if (state.apkDownloadStatus === 'success') return state.apkDownloadMessage || 'Установка завершена.';
  if (state.apkDownloadStatus === 'signature-mismatch') return state.apkDownloadMessage || 'Подпись не совпадает с установленной версией. Android не разрешит обновить её поверх.';
  if (state.apkDownloadStatus === 'error') return state.apkDownloadMessage || 'Не удалось скачать или проверить APK. Попробуй ещё раз.';
  return '';
}

function renderSettings() {
  const c = cls();
  const p = prof();
  const avatar = currentAvatar();
  const statusClass = state.updateStatus === 'update' ? 'update-found' : state.updateStatus === 'error' ? 'update-error' : '';
  const nativeUpdater = Boolean(window.EchoAstraAndroid && typeof window.EchoAstraAndroid.downloadAndInstallApk === 'function');
  const downloadBusy = isApkDownloadBusy();
  const downloadStatusText = getApkDownloadStatusText();
  const downloadButtonLabel = downloadBusy
    ? state.apkDownloadStatus === 'downloading' ? 'Скачиваем APK…'
      : state.apkDownloadStatus === 'verifying' ? 'Проверяем APK…'
        : state.apkDownloadStatus === 'installing' ? 'Ожидаем подтверждения Android…'
          : state.apkDownloadStatus === 'permission' ? 'Открой настройки Android…' : 'Подготавливаем…'
    : nativeUpdater ? 'Скачать и установить в приложении' : 'Скачать APK';
  const downloadProgress = Math.max(0, Math.min(100, Number(state.apkDownloadProgress) || 0));
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">персональные параметры</div><h1>Настройки</h1><p>Обновления и тестовые настройки героя.</p></div><span class="badge badge-teal">ТЕСТ</span></div>
    <section class="card settings-section update-settings-card">
      <div class="settings-heading"><div class="settings-icon update-icon">↻</div><div class="settings-heading-copy"><span class="eyebrow">версия приложения</span><h2>Обновления GitHub</h2><p>Проверка манифеста сборки и опубликованных APK-релизов.</p></div></div>
      <div class="settings-toggle-row"><div><strong>Автоматически проверять</strong><small>При запуске и по кнопке ниже</small></div><button type="button" class="settings-toggle ${state.autoUpdateEnabled ? 'enabled' : ''}" role="switch" aria-checked="${state.autoUpdateEnabled}" aria-label="Автопроверка обновлений GitHub" data-action="toggle-auto-update"><span></span></button></div>
      <div class="update-status ${statusClass}" aria-live="polite"><span class="status-pulse ${state.updateCheckInProgress ? 'checking' : ''}"></span><span>${getUpdateStatusText()}</span></div>
      <div class="update-version-row"><span>Установлено</span><strong>v${CURRENT_APP_VERSION}${CURRENT_APP_VERSION_CODE ? ` · код ${CURRENT_APP_VERSION_CODE}` : ''}</strong></div>
      <button class="btn btn-primary btn-block" data-action="check-github" ${state.updateCheckInProgress ? 'disabled' : ''}>${state.updateCheckInProgress ? 'Проверяем…' : 'Проверить GitHub сейчас'}</button>
      ${state.latestRelease && state.updateStatus === 'update' ? `<button class="btn btn-secondary btn-block release-link-button" data-action="${state.latestRelease.apk_url ? 'download-latest-apk' : 'open-latest-release'}" ${downloadBusy || (nativeUpdater && state.latestRelease.apk_url && !state.latestRelease.sha256) ? 'disabled' : ''}>${state.latestRelease.apk_url ? `${downloadButtonLabel} · v${esc(state.latestRelease.version_name)}` : `Открыть страницу релиза ${esc(state.latestRelease.tag_name)} →`}</button>` : ''}
      ${downloadStatusText ? `<div class="update-download-status ${['error', 'signature-mismatch'].includes(state.apkDownloadStatus) ? 'update-download-error' : ''}" aria-live="polite"><div class="update-download-status-copy">${esc(downloadStatusText)}</div>${state.apkDownloadStatus === 'downloading' ? `<div class="update-download-progress" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${downloadProgress}"><span style="width:${downloadProgress}%"></span></div>` : ''}</div>` : ''}
      <p class="settings-footnote">APK загружается в приложение, SHA-256 проверяется перед установкой. Android показывает системное подтверждение и может один раз попросить разрешить установку для «Эхо Астры». Обновление поверх требует одинаковой подписи APK.</p>
    </section>
    <div class="section-head"><h2>Аватар игрока</h2><span class="badge">Галерея игры</span></div>
    <section class="card settings-choice-card avatar-settings-card">
      <div class="avatar-settings-preview">${avatarImageMarkup(avatar)}</div><div class="settings-choice-copy"><span class="eyebrow">текущий портрет</span><strong>${avatar.name}</strong><small>Только встроенные изображения игры</small></div>
      <button class="btn btn-secondary btn-small" data-action="open-avatar-picker">Сменить</button>
    </section>
    <p class="settings-footnote avatar-gallery-note">Можно выбрать только картинку из галереи игры. Загрузка фотографии с устройства недоступна.</p>
    <div class="section-head"><h2>Боевой класс</h2><span class="badge badge-gold">Бесплатно в тесте</span></div>
    <section class="card settings-choice-card">
      <div class="settings-choice-icon" style="--choice-accent:${c.accent}">${c.glyph}</div><div class="settings-choice-copy"><span class="eyebrow">текущий боевой путь</span><strong>${c.name}</strong><small>${c.role}</small></div>
      <button class="btn btn-secondary btn-small" data-action="open-class-selector">Сменить</button>
    </section>
    <div class="section-head"><h2>Профессия</h2><span class="badge badge-gold">Бесплатно в тесте</span></div>
    <section class="card settings-choice-card">
      <div class="settings-choice-icon" style="--choice-accent:${p.accent}">${professionIconMarkup(p.id)}</div><div class="settings-choice-copy"><span class="eyebrow">текущее ремесло</span><strong>${p.name}</strong><small>${p.role}</small></div>
      <button class="btn btn-secondary btn-small" data-action="open-profession-selector">Сменить</button>
    </section>
    <div class="notice settings-note">В тестовом режиме смена класса и профессии бесплатна. После перехода к полноценной игре правила и возможная стоимость будут показаны до подтверждения.</div>`;
}

function renderChoiceModal() {
  if (!state.modalChoice) return;
  const isClass = state.modalChoice.type === 'class';
  const choices = isClass ? combatClasses : professions;
  const selectedId = state.modalChoice.selectedId;
  modalCard.innerHTML = `
    <div class="eyebrow">${isClass ? 'боевой путь' : 'ремесло героя'} · тестовый режим</div>
    <h2>${isClass ? 'Выбери класс' : 'Выбери профессию'}</h2>
    <p>Карточки показывают роль и особенности. Смена сейчас бесплатна.</p>
    <div class="selection-card-list ${isClass ? 'class-selection-list' : ''}">
      ${choices.map(choice => `<button type="button" class="selection-card ${selectedId === choice.id ? 'selected' : ''}" style="--choice-accent:${choice.accent}" data-select-option="${choice.id}" aria-pressed="${selectedId === choice.id}">
        <span class="selection-glyph">${isClass ? choice.glyph : professionIconMarkup(choice.id)}</span><span class="selection-copy"><strong>${choice.name}</strong><small>${choice.role}</small><span>${isClass ? choice.short : choice.summary}</span>${isClass ? `<em>Урон ${choice.damage} · стойкость ${choice.durability} · поддержка ${choice.support}</em>` : ''}</span>
        <span class="selection-check">${selectedId === choice.id ? '✓' : ''}</span>
      </button>`).join('')}
    </div>
    <div class="modal-actions"><button class="btn btn-secondary" data-action="cancel-choice">Отмена</button><button class="btn btn-primary" data-action="apply-choice">Применить бесплатно</button></div>`;
  modalBackdrop.hidden = false;
}

function renderNotificationsModal() {
  const unread = unreadNotificationCount();
  const notificationRows = state.notifications.map(item => `<article class="notification-row ${item.unread ? 'unread' : ''}">
    <span class="notification-row-glyph">${item.glyph}</span>
    <button type="button" class="notification-main" data-read-notification="${item.id}" aria-label="Открыть уведомление: ${esc(item.title)}">
      <span class="notification-meta"><span>${esc(item.category)}</span><time>${esc(item.time)}</time></span><strong>${esc(item.title)}</strong><small>${esc(item.text)}</small>
    </button>
    ${item.unread ? '<span class="notification-unread-dot" aria-label="Непрочитано"></span>' : ''}
    <button type="button" class="notification-dismiss" data-dismiss-notification="${item.id}" aria-label="Удалить уведомление">×</button>
  </article>`).join('');
  modalCard.innerHTML = `
    <div class="notification-modal-head"><div><div class="eyebrow">центр событий</div><h2>Уведомления <span class="notification-total">${unread || 0}</span></h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть">×</button></div>
    ${state.notifications.length ? `<div class="notification-list">${notificationRows}</div><div class="notification-controls"><button class="text-action" data-action="mark-all-read" ${unread ? '' : 'disabled'}>Отметить все прочитанными</button><button class="text-action clear-notifications" data-action="clear-notifications">Очистить</button></div>` : '<div class="notification-empty"><span>♧</span><strong>Пока тихо</strong><small>Новые события, прибытия и ответы появятся здесь.</small></div>'}
    <div class="modal-actions"><button class="btn btn-secondary" data-action="close-modal">Закрыть</button></div>`;
  modalBackdrop.hidden = false;
}

function renderAvatarPicker() {
  const selectedId = state.avatarId;
  modalCard.innerHTML = `
    <div class="notification-modal-head avatar-picker-heading"><div><div class="eyebrow">галерея игры</div><h2>Выбери аватар</h2></div><button class="icon-button" data-action="close-modal" aria-label="Закрыть">×</button></div>
    <p class="avatar-picker-note">Доступны только встроенные портреты «Эхо Астры». Свои изображения загрузить нельзя.</p>
    <div class="avatar-option-list">${AVATAR_OPTIONS.map(avatar => `<button type="button" class="avatar-option-card ${selectedId === avatar.id ? 'selected' : ''}" data-avatar-option="${avatar.id}" aria-pressed="${selectedId === avatar.id}" style="--avatar-accent:${avatar.accent}">
      <span class="avatar-option-image">${avatarImageMarkup(avatar)}</span><span class="avatar-option-copy"><strong>${avatar.name}</strong><small>${avatar.role}</small></span><span class="avatar-option-check">${selectedId === avatar.id ? '✓' : ''}</span>
    </button>`).join('')}</div>
    <div class="modal-actions"><button class="btn btn-secondary" data-action="close-modal">Закрыть</button></div>`;
  modalBackdrop.hidden = false;
}

function selectGameAvatar(avatarId) {
  const avatar = AVATAR_OPTIONS.find(option => option.id === avatarId);
  if (!avatar) return;
  if (state.avatarId === avatar.id) { closeModal(); showToast('Этот аватар уже выбран'); return; }
  state.avatarId = avatar.id;
  saveAvatarId(avatar.id);
  closeModal();
  addNotification('Аватар обновлён', `Выбран портрет «${avatar.name}» из галереи игры.`, '◉', 'Персонаж');
  render();
  showToast('Игровой аватар изменён');
}

function parseVersion(version) {
  const match = String(version || '').match(/(\d+)\.(\d+)\.(\d+)/);
  return match ? match.slice(1).map(Number) : null;
}

function isVersionNewer(candidate, current) {
  const next = parseVersion(candidate);
  const installed = parseVersion(current);
  if (!next || !installed) return String(candidate).replace(/^v/i, '') !== String(current).replace(/^v/i, '');
  for (let index = 0; index < 3; index += 1) {
    if (next[index] !== installed[index]) return next[index] > installed[index];
  }
  return false;
}

function isRemoteBuildNewer(build) {
  const remoteCode = Number(build.version_code || 0);
  if (remoteCode > 0 && CURRENT_APP_VERSION_CODE > 0) return remoteCode > CURRENT_APP_VERSION_CODE;
  return isVersionNewer(build.version_name || build.tag_name, CURRENT_APP_VERSION);
}

function finishGithubUpdateCheck(result) {
  state.updateCheckInProgress = false;
  if (result.status === 'no-release') {
    state.latestRelease = null;
    state.updateStatus = 'no-release';
    addNotification('Сборка APK не найдена', 'GitHub не вернул ни манифест сборки, ни опубликованный APK-релиз.', '↻', 'Обновление', 'github-no-release');
  } else if (result.status !== 'ok') {
    state.latestRelease = null;
    state.updateStatus = 'error';
    addNotification('Не удалось проверить GitHub', 'Проверь подключение к интернету и попробуй ещё раз.', '⚠', 'Обновление', 'github-check-error');
  } else {
    const versionName = String(result.version_name || result.versionName || result.tag_name || CURRENT_APP_VERSION);
    const tagName = String(result.tag_name || `v${versionName.replace(/^v/i, '')}`);
    const release = {
      tag_name: tagName,
      version_name: versionName,
      version_code: Number(result.version_code || result.versionCode || 0),
      html_url: result.html_url || result.page_url || RELEASES_PAGE,
      apk_url: result.apk_url || result.apkUrl || result.browser_download_url || '',
      build_sha: result.build_sha || result.buildSha || '',
      sha256: result.sha256 || ''
    };
    state.latestRelease = release;
    if (isRemoteBuildNewer(release)) {
      state.updateStatus = 'update';
      addNotification(`Доступно обновление ${release.version_name}`, 'Новая APK-сборка найдена. Скачай её в приложении и подтверди установку Android.', '↻', 'Обновление', `build-${release.version_code || release.version_name}`);
    } else {
      state.updateStatus = 'current';
      addNotification('Приложение обновлено', `Установлена актуальная сборка ${release.version_name}.`, '✓', 'Обновление', `current-${release.version_code || release.version_name}`);
    }
  }
  if (state.screen === 'settings') renderSettings();
  else renderShell();
}

window.onGitHubUpdatePayload = function (payload) {
  try { finishGithubUpdateCheck(JSON.parse(payload)); }
  catch (error) { finishGithubUpdateCheck({ status: 'error' }); }
};

window.onAndroidUpdateDownloadStatus = function (payload) {
  let result;
  try { result = typeof payload === 'string' ? JSON.parse(payload) : payload; }
  catch (error) { result = { status: 'error', message: 'Не удалось получить состояние загрузки.' }; }
  state.apkDownloadStatus = String(result && result.status || 'error');
  state.apkDownloadProgress = Number(result && result.progress) || 0;
  state.apkDownloadMessage = String(result && result.message || '');
  if (state.screen === 'settings') renderSettings();
  else renderShell();
};

async function checkGithubUpdates() {
  if (state.updateCheckInProgress) return;
  state.updateCheckInProgress = true;
  state.updateStatus = 'checking';
  if (state.screen === 'settings') renderSettings();

  if (window.EchoAstraAndroid && typeof window.EchoAstraAndroid.checkLatestRelease === 'function') {
    window.EchoAstraAndroid.checkLatestRelease();
    return;
  }

  try {
    if (typeof fetch !== 'function' || (typeof navigator !== 'undefined' && navigator.onLine === false)) throw new Error('offline');
    const headers = { Accept: 'application/vnd.github+json' };
    const options = { headers, cache: 'no-store' };
    const manifestResponse = await fetch(BUILD_MANIFEST_API, options);
    if (manifestResponse.status === 404) {
      const releaseResponse = await fetch(RELEASES_API, options);
      if (releaseResponse.status === 404) {
        finishGithubUpdateCheck({ status: 'no-release' });
        return;
      }
      if (!releaseResponse.ok) throw new Error(`GitHub HTTP ${releaseResponse.status}`);
      const release = await releaseResponse.json();
      const apk = (release.assets || []).find(asset => /\.apk$/i.test(asset.name || ''));
      const notes = String(release.body || '');
      const releaseSha256 = String(apk && apk.digest || '').replace(/^sha256:/i, '')
        || ((notes.match(/SHA-256\s*:\s*([a-f0-9]{64})/i) || [])[1] || '');
      const versionCodeMatch = notes.match(/Version code\s*:\s*(\d+)/i);
      finishGithubUpdateCheck({
        status: 'ok', tag_name: release.tag_name, html_url: release.html_url,
        apk_url: apk ? apk.browser_download_url : '', sha256: releaseSha256,
        version_code: versionCodeMatch ? Number(versionCodeMatch[1]) : 0,
        version_name: String(release.tag_name || '').replace(/^v/i, '')
      });
      return;
    }
    if (!manifestResponse.ok) throw new Error(`GitHub HTTP ${manifestResponse.status}`);
    const file = await manifestResponse.json();
    if (!file.content) throw new Error('Build manifest is empty');
    const manifest = JSON.parse(atob(String(file.content).replace(/\s/g, '')));
    finishGithubUpdateCheck({
      status: 'ok', version_name: manifest.versionName, version_code: manifest.versionCode,
      tag_name: manifest.tagName, apk_url: manifest.apkUrl || LATEST_APK_URL,
      html_url: manifest.htmlUrl || RELEASES_PAGE, build_sha: manifest.buildSha, sha256: manifest.sha256
    });
  } catch (error) {
    finishGithubUpdateCheck({ status: 'error' });
  }
}

function renderCity() {
  const isLior = state.cityMode === 'lior';
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">городские службы</div><h1>${isLior ? 'Лиор' : 'Новое поселение'}</h1><p>${isLior ? 'Стартовый город с постоянными NPC-службами.' : 'Город, который строят и обслуживают игроки.'}</p></div><span class="badge ${isLior?'badge-gold':'badge-teal'}">${isLior?'NPC':'ИГРОКИ'}</span></div>
    <div class="segmented"><button class="${isLior?'active':''}" data-city-mode="lior">Лиор</button><button class="${!isLior?'active':''}" data-city-mode="player">Город игроков</button></div>
    ${isLior ? `
      <div class="hero-art hero-art--lior" style="min-height:140px;margin-bottom:14px"><div class="hero-content"><div class="hero-location">стартовая гавань</div><h2>Лиор</h2><p>У каждой службы — собственная клетка на карте.</p></div></div>
      <div class="section-head"><h2>NPC-службы</h2><button data-nav="map">Открыть карту →</button></div>
      <div class="list-stack">
        ${[['smith','⚒','Кузница Торена Валя','Обычные инструменты, снаряжение и ремонт.'],['merchant','◈','Лавка Мейры Соль','Базовые расходники и городской ассортимент.'],['herbalist','✿','Травница Элна Рут','Простые лечебные средства и советы.']].map(([id,glyph,name,description])=>{const point=getPoi(id);const npc=getNpcProfile(id);return `<button class="card list-card location-service-card" data-action="visit-poi" data-poi-id="${id}"><img class="service-npc-art${npc && npc.mirrorArt ? ' is-mirrored' : ''}" src="${npc ? npc.art : ''}" alt="" loading="lazy"><div class="list-copy"><strong>${name}</strong><span>${description}</span><small>Клетка ${formatCell(point.x,point.y)} · ${isAtPoi(point)?'ты здесь':'требуется подойти'}</small></div><span class="badge ${isAtPoi(point)?'badge-teal':'badge-gold'}">${isAtPoi(point)?'Войти':'На карте'}</span></button>`;}).join('')}
      </div>
      <div class="section-head"><h2>Истории жителей</h2><span class="badge">7 персонажей</span></div>
      <div class="npc-story-grid">${NPC_PROFILES.map(npc => `<button class="card npc-story-card" data-action="npc-profile" data-npc-id="${npc.id}"><img class="npc-story-art${npc.mirrorArt ? ' is-mirrored' : ''}" src="${npc.art}" alt="" loading="lazy"><span class="npc-story-copy"><strong>${esc(npc.name)}</strong><small>${esc(npc.role)}</small><span>${esc(npc.story)}</span></span></button>`).join('')}</div>
      <div class="section-head"><h2>Городские службы</h2></div><div class="action-row"><button class="card action-tile" data-action="open-quests"><span class="tile-icon">✦</span><strong>Задания</strong><span>Доска Лиора</span></button><button class="card action-tile" data-action="open-social"><span class="tile-icon">⌘</span><strong>Группа</strong><span>Найти помощь</span></button><button class="card action-tile" data-action="open-market"><span class="tile-icon">◈</span><strong>Рынок</strong><span>Товары города</span></button></div>` : `
      <div class="card card-pad"><div class="city-status"><div class="guild-emblem">⌂</div><div class="city-progress"><strong>Гильдия «Крылья Эйры»</strong><div class="small muted" style="margin-top:4px">Основано 5 игроками · совет 2/3</div></div><span class="badge badge-teal">Ранг 1</span></div><div class="guild-location-row"><span class="small muted">Здание на карте · ${formatCell(getPoi('guild').x,getPoi('guild').y)}</span><button class="text-action" data-action="visit-poi" data-poi-id="guild">К гильдии →</button></div></div>
      <div class="section-head"><h2>Постройки</h2><button data-action="building-wizard">+ Проект</button></div>
      <div class="building-grid">
        <button class="card building-card" data-action="building-details"><span class="building-icon">⚒</span><strong>Кузница</strong><span>Работает · Торен, оператор</span></button>
        <button class="card building-card" data-action="building-details"><span class="building-icon">🌾</span><strong>Ферма</strong><span>Не хватает ресурсов</span></button>
        <button class="card building-card" data-action="building-details"><span class="building-icon">▦</span><strong>Рынок</strong><span>Общественная постройка</span></button>
        <button class="card building-card" data-action="building-details"><span class="building-icon">＋</span><strong>Свободный участок</strong><span>Нужен строитель</span></button>
      </div>
      <div class="section-head"><h2>Управление</h2></div>
      <div class="card card-pad"><div class="list-card" style="padding:0 0 12px"><div class="list-icon">☷</div><div class="list-copy"><strong>Городской совет</strong><span>Голоса: 2 из 3 · решение открыто</span></div></div><button class="btn btn-secondary btn-small btn-block" data-action="council-vote">Открыть голосование (демо)</button></div>
      <div class="notice" style="margin-top:12px">В поздних городах кузницы, фермы и лавки принадлежат игрокам. Эти карточки показывают макет, не сохраняют вложения.</div>`}`;
}

function renderSocial() {
  const recentNotifications = state.notifications.slice(0, 2);
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">игроки рядом</div><h1>Связь</h1><p>Группа, гильдия и совместные поручения.</p></div><span class="badge badge-teal">3 онлайн</span></div>
    <div class="card social-header"><div class="guild-emblem">⌘</div><div><strong>Гильдия «Крылья Эйры»</strong><div class="small muted" style="margin-top:4px">12 участников · город Лиор</div></div><button class="text-action" data-action="visit-poi" data-poi-id="guild">К гильдии →</button></div>
    <div class="card player-meeting-card"><div><strong>Сцена встречи игроков</strong><span>Посетитель слева · хозяин справа · зеркальное направление по роли.</span></div><button class="btn btn-secondary btn-small" data-action="show-player-meeting">Показать демо</button></div>
    <div class="section-head"><h2>Запросы на помощь</h2><button data-action="create-order">Создать</button></div>
    <div class="list-stack">
      <div class="card card-pad"><div class="quest-meta"><span class="badge badge-gold profession-badge-inline">${professionIconMarkup('blacksmith')}ПРОФЕССИЯ: КУЗНЕЦ</span><span class="badge badge-rose">Нужен Рудокоп</span></div><h3>Материал для маяка</h3><p class="small">Нужна руда для детали сигнального узла.</p><button class="btn btn-primary btn-small" data-action="help-order">Откликнуться</button></div>
      <div class="card card-pad"><div class="quest-meta"><span class="badge badge-teal">БОЕВОЙ КЛАСС</span><span class="badge">Нужен Следопыт</span></div><h3>Проверка маршрута</h3><p class="small">Помоги разведать путь к старому маяку.</p><button class="btn btn-secondary btn-small" data-action="help-order">Посмотреть</button></div>
    </div>
    <div class="section-head"><h2>Недавние помощники</h2><button data-action="friends">Все</button></div>
    <div class="card card-pad">${[['🛡','Ливен','Страж · Строитель'],['⛏','Роан','Следопыт · Рудокоп'],['✿','Мика','Хранитель · Травник']].map(x=>`<div class="member-row"><div class="member-avatar">${x[0]}</div><div class="member-info"><strong>${x[1]}</strong><span>${x[2]}</span></div><span class="online-dot"></span><button class="icon-button" data-action="message">✉</button></div>`).join('')}</div>
    <div class="section-head"><h2>Недавние уведомления</h2><button data-action="notifications">Все уведомления →</button></div>
    ${recentNotifications.length ? `<div class="list-stack">${recentNotifications.map(item=>`<button class="card list-card social-notification ${item.unread?'unread':''}" data-action="notifications"><div class="list-icon">${item.glyph}</div><div class="list-copy"><strong>${esc(item.title)}</strong><span>${esc(item.text)}</span></div><span class="badge ${item.unread?'badge-teal':''}">${item.unread?'Новое':esc(item.time)}</span></button>`).join('')}</div>` : '<div class="card-flat empty-note">Новых уведомлений нет.</div>'}`;
}

const marketItems = [
  { glyph: '⛏', name: 'Железная руда', meta: 'Материал · Рудокоп · 12 шт.', price: '18 м', type: 'Фиксированная цена' },
  { glyph: '🌿', name: 'Лиорская мята', meta: 'Компонент · Травник · 6 шт.', price: '12 м', type: 'Фиксированная цена' },
  { glyph: '⚒', name: 'Кузнечный молот', meta: 'Инструмент · Кузнец · обычный', price: '35 м', type: 'Аукцион' },
  { glyph: '🧵', name: 'Мягкая шерсть', meta: 'Сырьё · Фермер · 20 шт.', price: '22 м', type: 'Фиксированная цена' }
];

function renderMarket() {
  const shown = state.marketTab === 'Мои заявки' ? [] : marketItems.filter(x => state.marketTab === 'Аукцион' ? x.type === 'Аукцион' : x.type === 'Фиксированная цена');
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">лиорская торговая площадь</div><h1>Рынок</h1><p>Фиксированная цена · аукцион · лавки игроков.</p></div><span class="currency-pill">✧ ${getWalletMarks()}</span></div>
    <div class="segmented">${['Фиксированная цена','Аукцион','Мои заявки'].map(t=>`<button class="${state.marketTab===t?'active':''}" data-market-tab="${t}">${t}</button>`).join('')}</div>
    <div class="market-search"><input class="input" placeholder="Найти предмет"><button class="icon-button" data-action="filter-market">☷</button></div>
    <div class="section-head" style="margin-top:8px"><h2>${state.marketTab}</h2><button data-action="create-listing">+ Выставить</button></div>
    ${state.marketTab === 'Мои заявки' ? `<div class="card card-pad"><div class="notice teal-notice">У тебя пока нет заявок. Создание заявки здесь только показывает форму — реальные товары не продаются.</div><button class="btn btn-primary btn-block" style="margin-top:13px" data-action="create-listing">Создать демо-заявку</button></div>` : `<div class="list-stack">${shown.map(item=>`<div class="card market-item"><div class="item-thumb">${item.glyph}</div><div class="item-info"><strong>${item.name}</strong><span>${item.meta}</span></div><div class="market-price">${item.price}<br><span class="tiny muted">24 ч</span></div><button class="icon-button" data-action="buy-item" aria-label="Открыть предмет">→</button></div>`).join('')}</div>`}
    <div class="notice" style="margin-top:13px">Комиссия 5% отображается до подтверждения. Без премиума заявки работают, пока игрок в сети; премиум оставляет магазин активным офлайн до 24 часов.</div>`;
}

function startCombatEncounter() {
  if (state.combat && state.combat.status === 'active') { render(); return; }
  state.combat = CombatEngine.createEncounter({ classId: cls().id, heroName: state.characterName || 'Астра', stats: cls() });
  saveCombatData();
  render();
  showToast('Бой начался · твой ход');
}

function performCombatAction(action) {
  if (!state.combat) return;
  const previousStatus = state.combat.status;
  const result = CombatEngine.applyAction(state.combat, action);
  if (result.error) { showToast(result.error); return; }
  state.combat = result.state;
  if (previousStatus === 'active' && state.combat.status !== 'active') {
    if (state.combat.status === 'victory') {
      state.combatHistory.wins += 1;
      state.combatHistory.xp += state.combat.result.xp;
      state.combatHistory.marks += state.combat.result.marks;
    } else if (state.combat.status === 'defeat') {
      state.combatHistory.losses += 1;
    } else if (state.combat.status === 'retreated') {
      state.combatHistory.retreats += 1;
    }
  }
  saveCombatData();
  render();
  if (state.combat.status === 'victory') showToast(`Победа · +${state.combat.result.xp} опыта · +${state.combat.result.marks} лунных марок`);
  else if (state.combat.status === 'defeat') showToast('Герой пал · схватка проиграна');
  else if (state.combat.status === 'retreated') showToast('Ты отступил из боя');
}

function renderCombat() {
  const fight = state.combat;
  const combatClass = combatClasses.find(item => item.id === (fight && fight.classId)) || cls();
  const skill = CombatEngine.getSkill(combatClass.id);
  const previewStats = fight ? fight.player : CombatEngine.getPlayerStats(combatClass);
  const enemyHp = fight ? fight.enemy.hp : 112;
  const enemyMaxHp = fight ? fight.enemy.maxHp : 112;
  const enemyHealthPercent = Math.max(0, Math.min(100, Math.round(enemyHp / enemyMaxHp * 100)));
  const playerHealthPercent = Math.max(0, Math.min(100, Math.round(previewStats.hp / previewStats.maxHp * 100)));
  const playerManaPercent = Math.max(0, Math.min(100, Math.round(previewStats.mana / previewStats.maxMana * 100)));
  const active = Boolean(fight && fight.status === 'active');
  const fightReward = fight && fight.result ? fight.result : { xp: 0, marks: 0 };
  const intentText = fight && fight.enemy.intent === 'surge'
    ? 'Сторож накапливает волну Эхо — приготовь защиту.'
    : 'Сторож готовит обычный удар.';
  const outcome = fight && fight.status !== 'active' ? {
    victory: { title: 'Сигнал очищен', text: `Получено ${fightReward.xp} опыта и ${fightReward.marks} лунных марок.`, className: 'combat-result--win' },
    defeat: { title: 'Герой пал', text: 'Отдохни и попробуй снова. Результат хранится только на этом устройстве.', className: 'combat-result--loss' },
    retreated: { title: 'Ты отступил', text: 'Награды за незавершённую схватку не выдаются.', className: 'combat-result--retreat' }
  }[fight.status] : null;
  const skillError = active ? CombatEngine.getActionError(fight, 'skill') : '';
  const potionError = active ? CombatEngine.getActionError(fight, 'potion') : '';
  const combatLog = fight && fight.log.length
    ? `<ol class="combat-log-list">${fight.log.slice(-8).map((entry, index) => `<li class="${index === fight.log.slice(-8).length - 1 ? 'latest' : ''}">${esc(entry)}</li>`).join('')}</ol>`
    : '<p class="combat-log-empty">Сторож охраняет сигнальный узел. Победи его, чтобы очистить путь.</p>';
  const history = state.combatHistory;

  screenEl.innerHTML = `
    <div class="page-title-row combat-page-title">
      <div><div class="eyebrow">локальное пошаговое сражение</div><h1>Сигнальный узел</h1><p>${fight ? `Раунд ${fight.round} · ${esc(fight.heroName)} · ${combatClass.name}` : 'Испытание рядом с Лиором · одиночная схватка'}</p></div>
      <button class="back-button" data-nav="home" aria-label="Назад на главную">←</button>
    </div>

    <section class="card combat-enemy-card ${fight && fight.enemy.intent === 'surge' && active ? 'is-charging' : ''}">
      <div class="combat-card-top"><span class="badge badge-rose">ЭХО</span><span class="badge">${active ? `Раунд ${fight.round}` : fight ? (outcome ? outcome.title : 'Схватка завершена') : 'Угроза · средняя'}</span></div>
      <div class="combat-enemy-visual" aria-hidden="true">
        <svg viewBox="0 0 120 120" role="presentation"><defs><radialGradient id="echo-core" cx="40%" cy="34%"><stop offset="0" stop-color="#ffdfb0"/><stop offset=".28" stop-color="#f07878"/><stop offset="1" stop-color="#612d5c"/></radialGradient></defs><circle class="echo-aura" cx="60" cy="60" r="48"/><path class="echo-shard" d="M60 8 73 31 102 22 91 49 114 62 89 75 98 102 69 91 55 114 45 87 17 96 29 69 6 55 33 43 24 16 51 29Z"/><ellipse cx="60" cy="59" rx="29" ry="22" fill="url(#echo-core)"/><path class="echo-eye" d="M38 60 Q60 38 82 60 Q60 82 38 60Z"/><circle cx="60" cy="60" r="8" class="echo-pupil"/><circle cx="63" cy="57" r="2.5" fill="#fff4d8"/></svg>
      </div>
      <div class="combat-enemy-heading"><div><strong>Искажённый сторож</strong><small>${active ? (fight.enemy.marked ? 'Помечен Следопытом · следующая атака усилена' : 'Хранитель сигнального узла') : 'Эхо у старого маяка'}</small></div><span class="combat-hp-value">${enemyHp}<small> / ${enemyMaxHp} HP</small></span></div>
      <div class="combat-meter combat-meter--enemy" role="progressbar" aria-label="Здоровье сторожа" aria-valuemin="0" aria-valuemax="${enemyMaxHp}" aria-valuenow="${enemyHp}"><span style="width:${enemyHealthPercent}%"></span></div>
      ${active ? `<div class="combat-intent ${fight.enemy.intent === 'surge' ? 'combat-intent--danger' : ''}" role="status"><span aria-hidden="true">${fight.enemy.intent === 'surge' ? '⚡' : '◈'}</span>${intentText}</div>` : ''}
    </section>

    <section class="card combat-player-card" style="--combat-accent:${combatClass.accent}">
      <div class="combat-player-heading"><div class="combat-player-avatar"><img src="assets/cutouts/classes/${combatClass.id}.png" alt="" aria-hidden="true"></div><div class="combat-player-copy"><span class="eyebrow">${active ? 'твой ход' : 'боевой класс'}</span><strong>${esc(fight ? fight.heroName : state.characterName || 'Астра')}</strong><small>${combatClass.glyph} ${combatClass.name} · ${combatClass.role}</small></div><span class="combat-player-level">${combatClass.glyph}</span></div>
      <div class="combat-resource-row"><span>Здоровье</span><strong>${previewStats.hp} / ${previewStats.maxHp}</strong></div>
      <div class="combat-meter combat-meter--health" role="progressbar" aria-label="Здоровье героя" aria-valuemin="0" aria-valuemax="${previewStats.maxHp}" aria-valuenow="${previewStats.hp}"><span style="width:${playerHealthPercent}%"></span></div>
      <div class="combat-resource-row combat-mana-row"><span>Энергия</span><strong>${previewStats.mana} / ${previewStats.maxMana}</strong></div>
      <div class="combat-meter combat-meter--mana" role="progressbar" aria-label="Энергия героя" aria-valuemin="0" aria-valuemax="${previewStats.maxMana}" aria-valuenow="${previewStats.mana}"><span style="width:${playerManaPercent}%"></span></div>
      <div class="combat-stat-chips"><span>⚔ Урон ${previewStats.attackPower}</span><span>⬟ Защита ${previewStats.defense}</span>${fight ? `<span>♥ Настои ${fight.player.potions}</span>` : '<span>♥ Настои 2</span>'}</div>
    </section>

    ${outcome ? `<section class="combat-result ${outcome.className}" role="status"><span class="combat-result-icon" aria-hidden="true">${fight.status === 'victory' ? '✦' : fight.status === 'defeat' ? '×' : '↩'}</span><div><strong>${outcome.title}</strong><p>${outcome.text}</p></div></section>` : ''}
    ${!fight ? `<div class="notice teal-notice combat-intro-note">Управляй одним героем: атакуй, используй классовый навык, защищайся от тяжёлого удара или выпей настой. Бой и награды сохраняются локально, без игрового сервера.</div>` : ''}

    ${active ? `<div class="section-head combat-actions-heading"><h2>Действия</h2><span class="badge badge-teal">Твой ход</span></div>
      <div class="combat-action-grid">
        <button class="card combat-action-card combat-action-card--attack" data-combat-action="attack"><span class="combat-action-icon">⚔</span><strong>Обычная атака</strong><small>Нанести базовый физический урон.</small><span class="combat-action-cost">Без затрат</span></button>
        <button class="card combat-action-card combat-action-card--skill" data-combat-action="skill" ${skillError ? 'disabled' : ''} title="${esc(skillError || skill.description)}"><span class="combat-action-icon">${combatClass.glyph}</span><strong>${skill.name}</strong><small>${skill.description}</small><span class="combat-action-cost">−${skill.manaCost} энергии</span></button>
        <button class="card combat-action-card combat-action-card--guard" data-combat-action="defend"><span class="combat-action-icon">⬟</span><strong>Защита</strong><small>Сильно ослабить следующий удар и восстановить энергию.</small><span class="combat-action-cost">Стойка</span></button>
        <button class="card combat-action-card combat-action-card--potion" data-combat-action="potion" ${potionError ? 'disabled' : ''} title="${esc(potionError || 'Восстановить до 34 здоровья')}"><span class="combat-action-icon">✚</span><strong>Лечебный настой</strong><small>Восстановить до 34 здоровья.</small><span class="combat-action-cost">Осталось: ${fight.player.potions}</span></button>
      </div>
      <button class="combat-retreat-button" data-combat-action="retreat">Отступить из боя</button>` : fight ? `<button class="btn btn-primary btn-block combat-retry-button" data-combat-action="start">Начать новую схватку</button>` : `<button class="btn btn-primary btn-block combat-start-button" data-combat-action="start">Начать бой</button>`}

    <section class="card combat-log-card"><div class="combat-log-heading"><strong>Ход боя</strong><span>${history.wins} побед · ${history.losses} поражений</span></div>${combatLog}</section>
    <section class="combat-reward-card"><span class="combat-reward-glyph">✧</span><span><strong>Накоплено в этом прототипе</strong><small>${history.xp} опыта · ${history.marks} лунных марок · ${history.retreats} отступлений</small></span></section>
    <p class="demo-note combat-demo-note">Одиночный бой против локального противника. Сетевая группа и серверная синхронизация не подключены.</p>`;
}

function render() {
  const onboarding = ['welcome', 'choose-class', 'intro', 'choose-profession'].includes(state.screen);
  topbarEl.style.display = onboarding ? 'none' : 'flex';
  navEl.hidden = onboarding;
  screenEl.className = `screen ${onboarding ? 'onboarding' : ''} ${state.screen === 'welcome' ? 'welcome-onboarding' : ''}`;
  if (!onboarding) renderShell();

  switch (state.screen) {
    case 'welcome': renderWelcome(); break;
    case 'choose-class': renderClassChoice(); break;
    case 'intro': renderIntro(); break;
    case 'choose-profession': renderProfessionChoice(); break;
    case 'home': renderHome(); break;
    case 'map': renderMap(); break;
    case 'quests': renderQuests(); break;
    case 'character': renderCharacter(); break;
    case 'city': renderCity(); break;
    case 'social': renderSocial(); break;
    case 'market': renderMarket(); break;
    case 'combat': renderCombat(); break;
    case 'settings': renderSettings(); break;
  }
  if (!onboarding) renderNav();
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), 2300);
}

function openModal(title, body, primary = 'Понятно') {
  modalCard.classList.remove('dialogue-modal-card');
  modalCard.innerHTML = `<div class="eyebrow">демонстрационный макет</div><h2>${title}</h2><p>${body}</p><div class="modal-actions"><button class="btn btn-primary" data-action="close-modal">${primary}</button></div>`;
  modalBackdrop.hidden = false;
}

function dialogueActorMarkup(participant, side) {
  const isRight = side === 'right';
  const mirror = Boolean(participant.mirrorSource) !== isRight;
  const sprite = participant.sprite || `assets/cutouts/classes/${participant.classId}.png`;
  return `<div class="dialogue-actor dialogue-actor--${side}">
    <img class="dialogue-sprite${mirror ? ' is-mirrored' : ''}" src="${esc(sprite)}" alt="${esc(participant.name)}" loading="eager">
    <span class="dialogue-nameplate">${esc(participant.name)}</span>
  </div>`;
}

function renderDialogueScene({ left, right, location = 'Лиор · городская площадь' }) {
  return `<div class="dialogue-scene" role="img" aria-label="Сцена встречи: ${esc(left.name)} и ${esc(right.name)}">
    <div class="dialogue-scene-backdrop"></div>
    <div class="dialogue-scene-ground" aria-hidden="true"></div>
    ${dialogueActorMarkup(left, 'left')}
    ${dialogueActorMarkup(right, 'right')}
    <span class="dialogue-location-tag">${esc(location)}</span>
  </div>`;
}

function openNpcDialogue(npcId) {
  const profile = getNpcProfile(npcId);
  if (!profile) return;
  const point = profile.poiId ? getPoi(profile.poiId) : null;
  const playerName = state.characterName || 'Астра';
  const scene = renderDialogueScene({
    left: { name: profile.name, sprite: profile.sprite, mirrorSource: Boolean(profile.mirrorSprite) },
    right: { name: playerName, classId: cls().id },
    location: point ? `Лиор · ${formatCell(point.x, point.y)}` : 'Лиор · сюжетная встреча'
  });
  modalCard.classList.add('dialogue-modal-card');
  modalCard.innerHTML = `${scene}
    <div class="dialogue-copy"><span class="eyebrow">${esc(profile.role)}</span><h2>${esc(profile.name)}</h2>
      <p class="dialogue-line">${esc(profile.quote)}</p>
      <div class="dialogue-story"><strong>Краткая история</strong><p>${esc(profile.story)}</p></div>
      <div class="dialogue-service-note">${esc(profile.service)}</div>
      <div class="modal-actions"><button class="btn btn-primary" data-action="close-modal">Продолжить</button></div>
    </div>`;
  modalBackdrop.hidden = false;
}

function openPlayerMeetingDemo() {
  const scene = renderDialogueScene({
    left: { name: `${state.characterName || 'Астра'} · посетитель`, classId: cls().id },
    right: { name: 'Ливен · хозяин лавки', classId: 'guardian' },
    location: 'Лиор · встреча игроков'
  });
  modalCard.classList.add('dialogue-modal-card');
  modalCard.innerHTML = `${scene}<div class="dialogue-copy"><span class="eyebrow">демо встречи игроков</span><h2>Посетитель и хозяин лавки</h2>
    <p class="dialogue-line">Посетитель всегда слева и смотрит вправо; хозяин или продавец — справа и зеркально развёрнут влево. Эта сцена локальная: сетевой игры в прототипе нет.</p>
    <div class="modal-actions"><button class="btn btn-primary" data-action="close-modal">Понятно</button></div></div>`;
  modalBackdrop.hidden = false;
}

function closeModal() { modalBackdrop.hidden = true; modalCard.classList.remove('dialogue-modal-card'); state.modalChoice = null; }

function go(screen) {
  state.screen = screen;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

let travelInterval;

function beginMapTravel(targetX, targetY) {
  if (state.travel) { showToast('Подожди завершения текущего перехода'); return; }
  if (!Number.isInteger(targetX) || !Number.isInteger(targetY) || targetX < 1 || targetX > MAP_CONFIG.width || targetY < 1 || targetY > MAP_CONFIG.height) return;
  const distance = Math.abs(targetX - state.position.x) + Math.abs(targetY - state.position.y);
  if (distance !== 1) { showToast('За один шаг можно перейти только на соседнюю клетку'); return; }
  if (isTerrainBlocked(targetX, targetY, state.hasCloudTransport)) {
    const feature = getTerrainFeatureAt(targetX, targetY);
    showToast(feature && feature.id === 'mountain'
      ? `${feature.name} непроходим даже с транспортом — обойди хребет`
      : feature && feature.id === 'cloud-rock'
        ? 'Скальный выступ непроходим даже с транспортом — обойди его'
        : 'Белые облака непроходимы пешком — нужен транспорт');
    return;
  }

  const fromBiome = getBiomeId(state.position.x, state.position.y);
  const toBiome = getBiomeId(targetX, targetY);
  const biomeTransition = fromBiome !== toBiome;
  const classId = state.classId;
  const professionId = state.professionId;
  const durationMs = getMovementDurationMs({ classId, professionId });
  const gameDurationSeconds = getMovementGameSeconds(durationMs);
  const startedAt = Date.now();
  const endsAt = startedAt + durationMs;
  state.travel = {
    from: { ...state.position }, to: { x: targetX, y: targetY },
    fromBiome, toBiome, biomeTransition, classId, professionId, durationMs, gameDurationSeconds,
    startedAt, endsAt, gameEndsAt: getGameTimestamp(endsAt)
  };
  saveWorldProgress();
  render();
  clearInterval(travelInterval);
  travelInterval = setInterval(updateTravelTicker, 200);
}

function updateTravelTicker() {
  if (!state.travel) { clearInterval(travelInterval); return; }
  const remaining = getTravelRemainingMs();
  document.querySelectorAll('[data-travel-countdown]').forEach(element => { element.textContent = formatCountdown(remaining); });
  const progress = Math.max(0, Math.min(100, ((Date.now() - state.travel.startedAt) / state.travel.durationMs) * 100));
  document.querySelectorAll('[data-travel-progress]').forEach(element => { element.style.width = `${progress}%`; });
  if (remaining > 0) return;

  const arrival = state.travel;
  state.position = { ...arrival.to };
  state.travel = null;
  saveWorldProgress();
  clearInterval(travelInterval);
  const poi = getPoiAt(state.position.x, state.position.y);
  const biome = BIOME_INFO[arrival.toBiome];
  addNotification(
    arrival.biomeTransition ? `Ты вошёл в биом «${biome.name}»` : `Прибытие · клетка ${formatCell(state.position.x, state.position.y)}`,
    poi ? `На месте: ${poi.name}. ${poi.description}.` : `Ты прибыл в ${biome.name}. Следующий шаг снова займёт время.`,
    arrival.biomeTransition ? biome.glyph : '⌖',
    arrival.biomeTransition ? 'Переход между биомами' : 'Путешествие'
  );
  render();
  showToast(poi ? `Ты на месте: ${poi.name}` : `Прибытие · ${formatCell(state.position.x, state.position.y)}`);
}

function visitPoi(id) {
  const point = getPoi(id);
  if (!point) return;
  if (state.travel) {
    go('map');
    showToast('Сначала дождись прибытия — взаимодействовать в пути нельзя');
    return;
  }
  if (!isAtPoi(point)) {
    const distance = Math.abs(point.x - state.position.x) + Math.abs(point.y - state.position.y);
    go('map');
    showToast(`${point.name} доступен только на клетке ${formatCell(point.x, point.y)} · расстояние ${distance} кл.`);
    return;
  }
  switch (point.id) {
    case 'iara': openNpcDialogue('iara'); break;
    case 'smith': openNpcDialogue('smith'); break;
    case 'merchant': openNpcDialogue('merchant'); break;
    case 'herbalist': openNpcDialogue('herbalist'); break;
    case 'guild': openModal(`Гильдия «Крылья Эйры» · клетка ${formatCell(point.x, point.y)}`, 'Ты вошёл в здание гильдии. Здесь будут состав, казна, городской совет и права участников.'); break;
    case 'quest-board': go('quests'); showToast(`Доска заданий Лиора · клетка ${formatCell(point.x, point.y)}`); break;
    case 'market': go('market'); showToast(`Торговая площадь · клетка ${formatCell(point.x, point.y)}`); break;
    case 'beacon': openModal(`Старый сигнальный маяк · клетка ${formatCell(point.x, point.y)}`, 'Лесной тракт начинается за городской границей. Базовый шаг между клетками занимает 6 секунд (30 игровых секунд); класс и профессия немного меняют скорость. Белые облака нельзя пересекать пешком без транспорта.'); break;
    default: openModal(point.name, point.description);
  }
}

function openSelectionModal(type) {
  state.modalChoice = { type, selectedId: type === 'class' ? state.classId : state.professionId };
  renderChoiceModal();
}

function applySelection() {
  if (!state.modalChoice) return;
  const { type, selectedId } = state.modalChoice;
  const currentId = type === 'class' ? state.classId : state.professionId;
  if (selectedId === currentId) {
    state.modalChoice = null;
    closeModal();
    showToast('Этот выбор уже активен');
    return;
  }
  if (type === 'class') state.classId = selectedId;
  else state.professionId = selectedId;
  const chosen = type === 'class' ? cls() : prof();
  const chosenIcon = type === 'class' ? chosen.glyph : professionIconMarkup(chosen.id, 'profession-icon notification-profession-icon');
  state.modalChoice = null;
  closeModal();
  addNotification(`${type === 'class' ? 'Боевой класс' : 'Профессия'} изменён`, `Теперь активен выбор «${chosen.name}». В тестовом режиме смена бесплатна.`, chosenIcon, 'Настройки');
  render();
  showToast(`${chosen.name} выбран бесплатно · тестовый режим`);
}

function updateNotificationRead(id) {
  const notification = state.notifications.find(item => item.id === Number(id));
  if (notification) notification.unread = false;
  renderNotificationsModal();
  renderShell();
}

document.addEventListener('click', (event) => {
  const combatAction = event.target.closest('[data-combat-action]');
  if (combatAction) {
    if (combatAction.dataset.combatAction === 'start') startCombatEncounter();
    else performCombatAction(combatAction.dataset.combatAction);
    return;
  }

  const nav = event.target.closest('[data-nav]');
  if (nav) { state.screen = nav.dataset.nav; render(); window.scrollTo(0, 0); return; }

  const terrainBlocked = event.target.closest('[data-terrain-blocked]');
  if (terrainBlocked) {
    const reason = terrainBlocked.dataset.blockReason;
    showToast(reason === 'mountain'
      ? 'Горный хребет непроходим даже с транспортом — найди обход'
      : reason === 'rock'
        ? 'Скальный выступ всегда непроходим — обойди его'
        : 'Белые облака непроходимы пешком — нужен транспорт');
    return;
  }

  const mapMove = event.target.closest('[data-map-move]');
  if (mapMove) { beginMapTravel(Number(mapMove.dataset.mapX), Number(mapMove.dataset.mapY)); return; }

  const avatarChoice = event.target.closest('[data-avatar-option]');
  if (avatarChoice) { selectGameAvatar(avatarChoice.dataset.avatarOption); return; }

  const choiceOption = event.target.closest('[data-select-option]');
  if (choiceOption && state.modalChoice) {
    state.modalChoice.selectedId = choiceOption.dataset.selectOption;
    renderChoiceModal();
    return;
  }

  const readNotification = event.target.closest('[data-read-notification]');
  if (readNotification) { updateNotificationRead(readNotification.dataset.readNotification); return; }

  const dismissNotification = event.target.closest('[data-dismiss-notification]');
  if (dismissNotification) {
    state.notifications = state.notifications.filter(item => item.id !== Number(dismissNotification.dataset.dismissNotification));
    renderNotificationsModal();
    renderShell();
    return;
  }

  const pickClass = event.target.closest('[data-pick-class]');
  if (pickClass) { state.classId = pickClass.dataset.pickClass; renderClassChoice(); return; }

  const pickProfession = event.target.closest('[data-pick-profession]');
  if (pickProfession) { state.professionId = pickProfession.dataset.pickProfession; renderProfessionChoice(); return; }

  const filter = event.target.closest('[data-filter]');
  if (filter) { state.questFilter = filter.dataset.filter; render(); return; }

  const marketTab = event.target.closest('[data-market-tab]');
  if (marketTab) { state.marketTab = marketTab.dataset.marketTab; render(); return; }

  const cityMode = event.target.closest('[data-city-mode]');
  if (cityMode) { state.cityMode = cityMode.dataset.cityMode; render(); return; }

  const characterTab = event.target.closest('[data-character-tab]');
  if (characterTab) { state.characterTab = characterTab.dataset.characterTab; render(); return; }

  const actionButton = event.target.closest('[data-action]');
  if (!actionButton) {
    if (event.target === modalBackdrop) closeModal();
    return;
  }

  const action = actionButton.dataset.action;
  switch (action) {
    case 'start-create': go('choose-class'); break;
    case 'quick-demo': state.characterName = 'Астра'; go('home'); break;
    case 'go-welcome': go('welcome'); break;
    case 'to-intro': {
      const nameInput = document.getElementById('hero-name');
      if (nameInput && nameInput.value.trim()) state.characterName = nameInput.value.trim();
      go('intro'); break;
    }
    case 'go-class': go('choose-class'); break;
    case 'finish-intro': go('choose-profession'); break;
    case 'go-intro': go('intro'); break;
    case 'finish-creation': state.position = { ...LIOR_CITY.start }; state.travel = null; saveWorldProgress(); go('home'); showToast('Демо-персонаж создан · Лиор · без серверной синхронизации'); break;
    case 'open-quests': go('quests'); break;
    case 'open-character': go('character'); break;
    case 'open-city': go('city'); break;
    case 'open-social': go('social'); break;
    case 'show-player-meeting': openPlayerMeetingDemo(); break;
    case 'npc-profile': openNpcDialogue(actionButton.dataset.npcId); break;
    case 'open-market': go('market'); break;
    case 'open-combat': go('combat'); break;
    case 'open-combat-path': go('combat'); break;
    case 'open-profession': go('city'); showToast(`${prof().name}: демонстрационная мастерская`); break;
    case 'open-settings': go('settings'); break;
    case 'open-avatar-picker': renderAvatarPicker(); break;
    case 'open-npc': visitPoi('iara'); break;
    case 'visit-poi': visitPoi(actionButton.dataset.poiId); break;
    case 'interact-current': visitPoi(actionButton.dataset.poiId); break;
    case 'notifications': renderNotificationsModal(); break;
    case 'toggle-auto-update': {
      state.autoUpdateEnabled = !state.autoUpdateEnabled;
      saveAutoUpdatePreference(state.autoUpdateEnabled);
      addNotification(state.autoUpdateEnabled ? 'Автопроверка включена' : 'Автопроверка выключена', state.autoUpdateEnabled ? 'Проверка манифеста сборки и GitHub Releases будет запускаться при открытии приложения.' : 'Проверку обновлений можно запустить вручную в любой момент.', '↻', 'Настройки');
      render();
      showToast(state.autoUpdateEnabled ? 'Автопроверка GitHub включена' : 'Автопроверка GitHub выключена');
      if (state.autoUpdateEnabled) checkGithubUpdates();
      break;
    }
    case 'check-github': checkGithubUpdates(); break;
    case 'download-latest-apk': {
      const update = state.latestRelease;
      if (!update || !update.apk_url) break;
      if (window.EchoAstraAndroid && typeof window.EchoAstraAndroid.downloadAndInstallApk === 'function') {
        if (!/^[a-f0-9]{64}$/i.test(String(update.sha256 || ''))) {
          state.apkDownloadStatus = 'error';
          state.apkDownloadMessage = 'В манифесте нет корректного SHA-256. Загрузка остановлена, чтобы не устанавливать непроверенный APK.';
          renderSettings();
          break;
        }
        state.apkDownloadStatus = 'starting';
        state.apkDownloadProgress = 0;
        state.apkDownloadMessage = '';
        renderSettings();
        try {
          window.EchoAstraAndroid.downloadAndInstallApk(
            update.apk_url,
            update.sha256,
            update.version_name,
            Number(update.version_code || 0)
          );
        } catch (error) {
          state.apkDownloadStatus = 'error';
          state.apkDownloadMessage = 'Не удалось начать загрузку APK. Попробуй ещё раз.';
          renderSettings();
        }
      } else {
        window.open(update.apk_url, '_blank', 'noopener');
      }
      break;
    }
    case 'open-latest-release': {
      const updateUrl = (state.latestRelease && (state.latestRelease.apk_url || state.latestRelease.html_url)) || RELEASES_PAGE;
      if (window.EchoAstraAndroid && typeof window.EchoAstraAndroid.openRelease === 'function') window.EchoAstraAndroid.openRelease(updateUrl);
      else window.open(updateUrl, '_blank', 'noopener');
      break;
    }
    case 'open-class-selector': openSelectionModal('class'); break;
    case 'open-profession-selector': openSelectionModal('profession'); break;
    case 'apply-choice': applySelection(); break;
    case 'cancel-choice': closeModal(); break;
    case 'mark-all-read':
      state.notifications.forEach(item => { item.unread = false; });
      renderNotificationsModal(); renderShell();
      break;
    case 'clear-notifications':
      state.notifications = [];
      renderNotificationsModal(); renderShell();
      break;
    case 'smith': visitPoi('smith'); break;
    case 'merchant': visitPoi('merchant'); break;
    case 'herbalist': visitPoi('herbalist'); break;
    case 'building-wizard': openModal('Новый городской проект', 'Выбор типа постройки, вклад материалов, подходящая профессия и назначение оператора. Подтверждение не создаёт реальное здание.'); break;
    case 'building-details': openModal('Городская постройка', 'Макет карточки здания: статус, владелец, оператор, требования и городское голосование. Данные не сохраняются.'); break;
    case 'council-vote': showToast('Голосование показано только для проверки интерфейса'); break;
    case 'create-order': openModal('Запросить помощь', `Нужен игрок с профессией или классом для шага «${prof().name}». В реальной игре запрос попадёт на доску поручений.`); break;
    case 'help-order': showToast('Отклик записан только в демо'); break;
    case 'guild-details': visitPoi('guild'); break;
    case 'friends': openModal('Игроки', 'Макет списка друзей и недавних помощников.'); break;
    case 'message': showToast('Открытие личных сообщений — демонстрация'); break;
    case 'quest-detail': openModal(actionButton.dataset.title || 'Задание', 'Здесь показаны цель, награда и игровой срок. Сроки демонстрационных поручений отсчитываются по игровым часам: один час МСК равен пяти часам в игре.'); break;
    case 'start-quest-timer': startQuestTimer(actionButton.dataset.questId); break;
    case 'reset-quest-timer': resetQuestTimer(actionButton.dataset.questId); break;
    case 'create-listing': openModal('Выставить товар', 'Форма заявки покажет предмет, количество, срок, комиссию 5% и доступность офлайн-магазина. В прототипе заявка не создаётся.'); break;
    case 'buy-item': openModal('Карточка товара', 'Здесь будут продавец, цена, качество предмета и подтверждение сделки. Покупка отключена.'); break;
    case 'filter-market': showToast('Фильтры рынка показаны в макете'); break;
    case 'item-details': openModal('Предмет', 'Карточка предмета: описание, качество и доступные действия.'); break;
    case 'mock-skill': showToast('Действие показано для проверки боевого экрана'); break;
    case 'close-modal': closeModal(); break;
    default: showToast('Демонстрационное действие без игрового эффекта');
  }
});

document.addEventListener('input', (event) => {
  if (event.target.id === 'hero-name') state.characterName = event.target.value;
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

render();
updateMoscowClocks();
window.setInterval(updateMoscowClocks, 1000);
if (state.travel) {
  if (getTravelRemainingMs() === 0) updateTravelTicker();
  else travelInterval = window.setInterval(updateTravelTicker, 200);
}
if (state.autoUpdateEnabled) window.setTimeout(() => checkGithubUpdates(), 900);
