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

const professions = [
  { id: 'blacksmith', name: 'Кузнец', glyph: '⚒', role: 'Создание предметов', summary: 'Кует инструменты, детали и снаряжение.', work: 'Заказы кузницы', workText: 'Две заявки ждут материалы. Для следующей детали нужна руда.', action: 'Открыть мастерскую', accent: '#f2c66d' },
  { id: 'farmer', name: 'Фермер', glyph: '🌾', role: 'Ферма и животноводство', summary: 'Выращивает пищу, шерсть и сырьё для ремесла.', work: 'Дела хозяйства', workText: 'Проверить урожай, собрать шерсть и подготовить заказ на шкуры.', action: 'Осмотреть ферму', accent: '#9bd28a' },
  { id: 'herbalist', name: 'Травник', glyph: '✿', role: 'Травы и лечебные сборы', summary: 'Собирает растения и готовит природные компоненты.', work: 'Сбор трав', workText: 'У маяка появились незнакомые растения. Нужна проверка образцов.', action: 'Исследовать травы', accent: '#82d7c1' },
  { id: 'miner', name: 'Рудокоп', glyph: '⛏', role: 'Руда и камень', summary: 'Находит материалы для кузниц и городских проектов.', work: 'Месторождение', workText: 'Кузнец Лиора оставил заказ на три куска железной руды.', action: 'Посмотреть заказ', accent: '#d2a873' },
  { id: 'carpenter', name: 'Лесоруб / плотник', glyph: '🪵', role: 'Древесина и детали', summary: 'Заготавливает древесину и делает деревянные компоненты.', work: 'Заказ на балки', workText: 'Для новых доков нужны обработанные доски и крепления.', action: 'Открыть мастерскую', accent: '#c99a6b' },
  { id: 'tanner', name: 'Кожевник', glyph: '◈', role: 'Обработка материалов', summary: 'Превращает шкуры в кожу и ремесленные заготовки.', work: 'Партия сырья', workText: 'Фермер передал шкуры. Выберите способ обработки заказа.', action: 'Обработать сырьё', accent: '#df9e86' },
  { id: 'builder', name: 'Строитель', glyph: '⌂', role: 'Городские постройки', summary: 'Проектирует и организует мастерские и городские службы.', work: 'Проект поселения', workText: 'Не хватает досок и металлических деталей для городской кузницы.', action: 'Управлять проектом', accent: '#83b7e8' }
];

const AVATAR_OPTIONS = [
  { id: 'guardian', name: 'Хранитель Лиора', role: 'Страж · портрет игры', src: 'assets/avatars/guardian.svg', accent: '#65d6d0' },
  { id: 'duelist', name: 'Клинок рассвета', role: 'Дуэлянт · портрет игры', src: 'assets/avatars/duelist.svg', accent: '#f2a66d' },
  { id: 'ranger', name: 'Следопыт Эйры', role: 'Разведчик · портрет игры', src: 'assets/avatars/ranger.svg', accent: '#86d59a' },
  { id: 'arcanist', name: 'Астральный маг', role: 'Арканист · портрет игры', src: 'assets/avatars/arcanist.svg', accent: '#b69af1' },
  { id: 'warden', name: 'Светлый хранитель', role: 'Целитель · портрет игры', src: 'assets/avatars/warden.svg', accent: '#74c9e9' }
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

const MAP_CONFIG = { width: 100, height: 100, viewRadius: 4, stepSeconds: 6, borderStepSeconds: 9, gameMinutesPerStep: 4 };
const BIOME_INFO = {
  coast: { name: 'Туманное побережье', short: 'Побережье', glyph: '≈' },
  forest: { name: 'Шепчущий лес', short: 'Лес', glyph: '♧' },
  highland: { name: 'Осколочные нагорья', short: 'Нагорья', glyph: '△' },
  marsh: { name: 'Сумрачные топи', short: 'Топи', glyph: '♨' },
  frost: { name: 'Северные льды', short: 'Льды', glyph: '❄' }
};

// The world contains 10 × 10 sectors; each sector is a 10 × 10 tile area.
const biomeSectors = [
  ['coast', 'coast', 'forest', 'forest', 'forest', 'highland', 'highland', 'frost', 'frost', 'frost'],
  ['coast', 'coast', 'coast', 'forest', 'forest', 'highland', 'highland', 'frost', 'frost', 'frost'],
  ['coast', 'coast', 'forest', 'forest', 'forest', 'highland', 'highland', 'frost', 'frost', 'frost'],
  ['coast', 'coast', 'coast', 'forest', 'forest', 'marsh', 'marsh', 'highland', 'highland', 'highland'],
  ['coast', 'coast', 'coast', 'coast', 'forest', 'marsh', 'marsh', 'highland', 'highland', 'highland'],
  ['coast', 'coast', 'forest', 'forest', 'forest', 'marsh', 'marsh', 'marsh', 'highland', 'highland'],
  ['coast', 'coast', 'forest', 'forest', 'forest', 'marsh', 'marsh', 'marsh', 'forest', 'forest'],
  ['coast', 'forest', 'forest', 'forest', 'highland', 'marsh', 'marsh', 'forest', 'forest', 'forest'],
  ['forest', 'forest', 'forest', 'highland', 'highland', 'highland', 'forest', 'forest', 'coast', 'coast'],
  ['forest', 'forest', 'highland', 'highland', 'highland', 'forest', 'coast', 'coast', 'coast', 'coast']
];

const pointsOfInterest = [
  { id: 'iara', name: 'Иара Кест', kind: 'npc', glyph: '👩‍🔧', x: 10, y: 50, description: 'Инженер маяков · стартовый NPC' },
  { id: 'smith', name: 'Кузница Торена Валя', kind: 'npc', glyph: '⚒', x: 9, y: 50, description: 'Ремонт и базовое снаряжение' },
  { id: 'merchant', name: 'Лавка Мейры Соль', kind: 'npc', glyph: '◈', x: 10, y: 49, description: 'Городские расходники' },
  { id: 'herbalist', name: 'Травница Элна Рут', kind: 'npc', glyph: '✿', x: 10, y: 51, description: 'Лечебные средства и травы' },
  { id: 'guild', name: 'Гильдия «Крылья Эйры»', kind: 'guild', glyph: '⌘', x: 11, y: 50, description: 'Зал гильдии и городской совет' },
  { id: 'quest-board', name: 'Доска заданий', kind: 'service', glyph: '✦', x: 9, y: 49, description: 'Поручения Лиора' },
  { id: 'market', name: 'Торговая площадь', kind: 'service', glyph: '▤', x: 11, y: 49, description: 'Рынок и заявки игроков' },
  { id: 'beacon', name: 'Старый сигнальный маяк', kind: 'landmark', glyph: '✧', x: 30, y: 50, description: 'Переход к лесному тракту' }
];

const UPDATE_REPOSITORY = 'AlfaGideon/RPGGameAnime';
const CURRENT_APP_VERSION = '0.1.0';

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
  position: { x: 10, y: 50 },
  travel: null,
  autoUpdateEnabled: readAutoUpdatePreference(),
  updateStatus: 'idle',
  updateCheckInProgress: false,
  latestRelease: null,
  modalChoice: null,
  notifications: [
    { id: 1, glyph: '✦', title: 'Добро пожаловать в Лиор', text: 'Ты начинаешь путь в портовом городе. Иара ждёт на клетке 10:50.', time: 'Сейчас', category: 'Сюжет', unread: true },
    { id: 2, glyph: '⌖', title: 'Открой карту мира', text: 'Лиор занимает несколько клеток. У каждого NPC и здания есть своя точка.', time: 'Сейчас', category: 'Мир', unread: true },
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
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const formatCell = (x, y) => `${x}:${y}`;
const unreadNotificationCount = () => state.notifications.filter(item => item.unread).length;
const currentAvatar = () => AVATAR_OPTIONS.find(avatar => avatar.id === state.avatarId) || AVATAR_OPTIONS[0];
function avatarImageMarkup(avatar = currentAvatar()) {
  return `<img class="avatar-image" src="${avatar.src}" alt="${esc(avatar.name)}">`;
}
function avatarButtonMarkup(className = 'player-portrait', showEdit = true) {
  return `<button type="button" class="${className} avatar-picker-trigger" data-action="open-avatar-picker" title="Сменить аватар" aria-label="Сменить аватар игрока">${avatarImageMarkup()}${showEdit ? '<span class="avatar-edit-indicator" aria-hidden="true">✎</span>' : ''}</button>`;
}
const getBiomeId = (x, y) => biomeSectors[Math.floor((y - 1) / 10)][Math.floor((x - 1) / 10)];
const getPoi = id => pointsOfInterest.find(point => point.id === id);
const getPoiAt = (x, y) => pointsOfInterest.find(point => point.x === x && point.y === y);
const isAtPoi = point => state.position.x === point.x && state.position.y === point.y;
const isInsideLior = (x, y) => x >= 7 && x <= 14 && y >= 47 && y <= 53;

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
  return `00:${String(totalSeconds).padStart(2, '0')}`;
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
  const radius = MAP_CONFIG.viewRadius;
  const minX = Math.max(1, x - radius);
  const maxX = Math.min(MAP_CONFIG.width, x + radius);
  const minY = Math.max(1, y - radius);
  const maxY = Math.min(MAP_CONFIG.height, y + radius);
  const currentBiomeId = getBiomeId(x, y);
  const currentBiome = BIOME_INFO[currentBiomeId];
  const currentPoi = getPoiAt(x, y);
  const locationName = currentPoi ? currentPoi.name : (isInsideLior(x, y) ? 'Лиор · улицы порта' : currentBiome.name);
  const progress = state.travel ? Math.min(100, ((Date.now() - state.travel.startedAt) / state.travel.durationMs) * 100) : 0;
  const travelPanel = state.travel ? `
    <div class="card travel-panel">
      <div class="travel-panel-heading"><div><span class="eyebrow">перемещение</span><strong>Путь к клетке ${formatCell(state.travel.to.x, state.travel.to.y)}</strong></div><strong class="travel-countdown" data-travel-countdown>${formatCountdown(getTravelRemainingMs())}</strong></div>
      <div class="travel-progress"><span data-travel-progress style="width:${progress}%"></span></div>
      <p>${state.travel.biomeTransition ? 'Переход между биомами · ' : ''}${state.travel.gameMinutes} игровых мин. · в демо ожидание ${Math.ceil(state.travel.durationMs / 1000)} сек.</p>
    </div>` : `
    <div class="map-travel-note"><span class="travel-note-icon">⌛</span><span>Один шаг занимает около <strong>${MAP_CONFIG.gameMinutesPerStep} игровых минут</strong>. В демо переход длится 6 секунд, граница биома — 9 секунд.</span></div>`;

  const tiles = [];
  for (let rowY = y - radius; rowY <= y + radius; rowY += 1) {
    for (let columnX = x - radius; columnX <= x + radius; columnX += 1) {
      const insideWorld = columnX >= 1 && columnX <= MAP_CONFIG.width && rowY >= 1 && rowY <= MAP_CONFIG.height;
      const current = columnX === x && rowY === y;
      const distance = Math.abs(columnX - x) + Math.abs(rowY - y);
      if (!insideWorld) {
        tiles.push('<span class="world-tile world-edge" aria-hidden="true"></span>');
        continue;
      }
      const biomeId = getBiomeId(columnX, rowY);
      const poi = getPoiAt(columnX, rowY);
      const target = state.travel && state.travel.to.x === columnX && state.travel.to.y === rowY;
      const canMove = !state.travel && distance === 1;
      const attrs = current && poi
        ? `data-action="interact-current" data-poi-id="${poi.id}"`
        : canMove
          ? `data-map-move data-map-x="${columnX}" data-map-y="${rowY}"`
          : 'disabled';
      const tileLabel = `Клетка ${formatCell(columnX, rowY)} · ${BIOME_INFO[biomeId].name}${poi ? ` · ${poi.name}` : ''}${current ? ' · вы здесь' : ''}`;
      tiles.push(`<button type="button" class="world-tile biome-${biomeId}${current ? ' current-tile' : ''}${poi ? ' poi-tile' : ''}${target ? ' travel-target' : ''}${canMove ? ' reachable-tile' : ''}" ${attrs} aria-label="${esc(tileLabel)}" title="${esc(tileLabel)}">
        ${current ? '<span class="you-marker">●</span>' : poi ? `<span class="poi-marker">${poi.glyph}</span>` : `<span class="biome-marker">${BIOME_INFO[biomeId].glyph}</span>`}
      </button>`);
    }
  }

  const sectorTiles = biomeSectors.map((row, rowIndex) => row.map((biomeId, columnIndex) => {
    const currentSector = Math.floor((x - 1) / 10) === columnIndex && Math.floor((y - 1) / 10) === rowIndex;
    const name = `${BIOME_INFO[biomeId].name} · сектор ${columnIndex + 1}:${rowIndex + 1}`;
    return `<span class="sector-tile biome-${biomeId}${currentSector ? ' active-sector' : ''}" title="${esc(name)}" aria-label="${esc(name)}">${currentSector ? '●' : ''}</span>`;
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
    <div class="page-title-row map-page-title"><div><div class="eyebrow">путешествия по Эйре · 100 × 100 клеток</div><h1>Карта мира</h1><p>Открой соседнюю клетку, чтобы сделать следующий шаг.</p></div><span class="badge badge-teal">${currentBiome.glyph} ${currentBiome.short}</span></div>
    <section class="card map-location-card">
      <div class="map-location-pin">⌖</div><div class="map-location-copy"><span class="eyebrow">текущее местоположение</span><strong>${locationName}</strong><span>${currentBiome.name} · клетка ${formatCell(x, y)}</span></div>
      <span class="map-coordinate">X ${String(x).padStart(2, '0')}<br>Y ${String(y).padStart(2, '0')}</span>
    </section>
    ${travelPanel}
    <section class="card map-view-card">
      <div class="map-view-heading"><div><strong>Окрестности</strong><span>Каждый квадрат — одна клетка</span></div><span class="map-scale">${minX}—${maxX} · ${minY}—${maxY}</span></div>
      <div class="world-map-grid" role="group" aria-label="Соседние клетки мира">${tiles.join('')}</div>
      <div class="map-direction-hint"><span class="direction-dot"></span>Двигайся на 1 клетку за шаг · нажимай только подсвеченные соседние клетки</div>
    </section>
    <div class="map-legend card-flat">
      ${Object.entries(BIOME_INFO).map(([id, biome]) => `<span><i class="legend-swatch biome-${id}"></i>${biome.short}</span>`).join('')}
      <span><i class="legend-icon">✦</i>точка интереса</span><span><i class="legend-icon current-legend">●</i>ты</span>
    </div>
    ${currentPoi ? `<section class="card map-current-poi"><div class="map-poi-glyph">${currentPoi.glyph}</div><div class="map-poi-copy"><span class="eyebrow">точка на этой клетке</span><strong>${currentPoi.name}</strong><small>${currentPoi.description}</small></div><button class="btn btn-primary btn-small" data-action="interact-current" data-poi-id="${currentPoi.id}">${currentPoi.kind === 'npc' ? 'Поговорить' : 'Войти'}</button></section>` : ''}
    <details class="world-overview card-flat"><summary><span><strong>Обзор всего мира</strong><small>10 × 10 секторов · каждый 10 × 10 клеток</small></span><span class="overview-toggle">＋</span></summary><div class="sector-grid" role="img" aria-label="Схема биомов всего мира">${sectorTiles}</div><div class="overview-caption"><span>● текущий сектор</span><span>100 × 100 клеток всего</span></div></details>
    <div class="section-head map-poi-heading"><h2>Точки поблизости</h2><span class="badge">по координатам</span></div>
    <div class="map-poi-list">${nearbyPoints || '<div class="card-flat empty-note">В радиусе 10 клеток отмеченных точек пока нет.</div>'}</div>
    <div class="notice map-rule-note">NPC и здания доступны только на своей клетке. Быстрого перемещения нет: время пути и переходы между биомами сохраняются в маршруте.</div>`;
}

function renderWelcome() {
  screenEl.innerHTML = `
    <section class="welcome-screen">
      <div class="welcome-brand">
        <div class="welcome-mark">ЭА</div>
        <div><div class="eyebrow">мобильный UI-прототип</div><div class="small muted">аниме-MMORPG · интерфейс без игровых функций</div></div>
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
        <p class="demo-note">Это только макет экранов: кнопки меняют демонстрационные страницы, прогресс не сохраняется.</p>
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
    <div class="class-grid">${combatClasses.map(c => `
      <button class="choice-card ${state.classId === c.id ? 'selected' : ''}" data-pick-class="${c.id}" style="--class-accent:${c.accent}">
        <div class="choice-icon">${c.glyph}</div><strong>${c.name}</strong><small>${c.role}</small>
        ${ratingDots(c.damage)}<small class="tiny">Урон ${c.damage} · стойкость ${c.durability} · поддержка ${c.support}</small>
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
        <div class="choice-icon" style="color:${p.accent};background:rgba(242,198,109,.08)">${p.glyph}</div><strong>${p.name}</strong><small>${p.summary}</small>
      </button>`).join('')}</div>
    <div class="choice-footer"><button class="btn btn-primary btn-block" data-action="finish-creation">Войти в Лиор</button><button class="btn btn-secondary btn-block" data-action="go-intro">Назад</button></div>`;
}

function renderHome() {
  const c = cls();
  const p = prof();
  screenEl.innerHTML = `
    <div class="player-strip">
      <div class="player-identity">${avatarButtonMarkup('player-portrait', true)}<div style="min-width:0"><div class="player-name">${esc(state.characterName || 'Астра')} · Уровень 1</div><div class="player-subtitle">${c.name} <span class="muted">·</span> ${p.name}</div></div></div>
      <div class="currency-pill">✧ 100</div>
    </div>
    <div class="home-location-card card-flat"><span class="home-location-icon">⌖</span><div><strong>${isInsideLior(state.position.x, state.position.y) ? 'Лиор · стартовый город' : BIOME_INFO[getBiomeId(state.position.x, state.position.y)].name}</strong><small>Клетка ${formatCell(state.position.x, state.position.y)}</small></div><button class="text-action" data-nav="map">Карта →</button></div>
    <section class="hero-art">
      <div class="hero-content"><div class="hero-top"><div><div class="hero-location">первая безопасная гавань</div><h2>Лиор</h2><p>Порт над облаками</p></div><span class="badge badge-gold">☀ ясное утро</span></div></div>
      <div class="hero-bottom"><button class="chip" data-action="visit-poi" data-poi-id="iara">👩‍🔧 Иара · ${formatCell(getPoi('iara').x, getPoi('iara').y)}</button><button class="chip" data-action="visit-poi" data-poi-id="smith">⚒ Кузница</button><button class="chip" data-action="visit-poi" data-poi-id="quest-board">✦ Доска заданий</button></div>
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
      <article class="card path-card profession" data-glyph="${p.glyph}">
        <div class="path-icon" style="color:${p.accent}">${p.glyph}</div><span class="badge badge-gold">ПРОФЕССИЯ</span>
        <h3 style="margin-top:9px">${p.work}</h3><p>${p.workText}</p><button class="text-action" data-action="open-profession">${p.action} →</button>
      </article>
    </div>
    <div class="section-head"><h2>Быстрые действия</h2></div>
    <div class="action-row">
      <button class="card action-tile" data-action="open-combat"><span class="tile-icon">⚔</span><strong>Испытание</strong><span>Демо-экран боя</span></button>
      <button class="card action-tile" data-action="open-market"><span class="tile-icon">◈</span><strong>Рынок</strong><span>Заказы и товары</span></button>
      <button class="card action-tile" data-action="open-social"><span class="tile-icon">⌘</span><strong>Помощь</strong><span>Найти игрока</span></button>
    </div>
    <div class="notice" style="margin-top:15px">Прототип интерфейса: классовые карточки меняются при выборе другого класса или профессии. Игровые действия здесь не выполняются.</div>`;
}

function getQuestRows() {
  return [
    { group: 'Основной сюжет', glyph: '✦', title: 'Город над облаками', desc: 'Помоги Иаре восстановить сигнальный узел.', status: '1/3', reward: '40 м' },
    { group: 'Боевой класс', glyph: cls().glyph, title: cls().path, desc: cls().pathText, status: '0/4', reward: 'Опыт' },
    { group: 'Профессия', glyph: prof().glyph, title: prof().work, desc: prof().workText, status: 'Заказ', reward: 'Материалы' },
    { group: 'Побочные', glyph: '☼', title: 'Пропавшая экспедиция', desc: 'Мейра ищет записи о грузе, не дошедшем до порта.', status: 'Новое', reward: '25 м' },
    { group: 'Ежедневные', glyph: '◷', title: 'Поручения мастерской', desc: 'Помоги одной из служб Лиора выполнить небольшой заказ.', status: 'Ежедневно', reward: '20 м' },
    { group: 'Еженедельные', glyph: '⚑', title: 'Сигнал из шторма', desc: 'Собери группу и проверь нестабильный маяк.', status: 'Еженедельно', reward: '100 м' }
  ];
}

function renderQuests() {
  const filters = ['Все', 'Основной сюжет', 'Боевой класс', 'Профессия', 'Побочные', 'Повторяющиеся'];
  const rows = getQuestRows().filter(q => {
    if (state.questFilter === 'Все') return true;
    if (state.questFilter === 'Повторяющиеся') return q.group === 'Ежедневные' || q.group === 'Еженедельные';
    return q.group === state.questFilter;
  });
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">журнал героя</div><h1>Задания</h1><p>Сюжетные и ежедневные пути.</p></div><span class="badge badge-gold">6 открыто</span></div>
    <div class="filter-row">${filters.map(f => `<button class="filter-chip ${state.questFilter === f ? 'active' : ''}" data-filter="${f}">${f}</button>`).join('')}</div>
    <div class="list-stack">${rows.map(q => `
      <button class="card list-card" data-action="quest-detail" data-title="${q.title}">
        <div class="list-icon">${q.glyph}</div><div class="list-copy"><strong>${q.title}</strong><span>${q.desc}</span><div class="quest-meta" style="margin:7px 0 0"><span class="badge">${q.group}</span><span class="badge badge-teal">${q.status}</span></div></div><span class="list-side">${q.reward}</span>
      </button>`).join('')}
    </div>
    <div class="notice" style="margin-top:14px">Это примерный список. В прототипе фильтры меняют отображение, но задания не выдаются и не сохраняются.</div>`;
}

function renderCharacter() {
  const c = cls();
  const p = prof();
  const content = state.characterTab === 'Обзор' ? `
    <div class="card card-pad"><div class="player-identity">${avatarButtonMarkup('player-portrait', true)}<div><div class="player-name">${esc(state.characterName || 'Астра')}</div><div class="player-subtitle">Уровень 1 · Откликнувшийся</div></div><span class="badge badge-gold">100 м</span></div>
      <div class="stat-grid"><div class="card-flat stat-box"><strong>${c.damage}</strong><span>Урон</span></div><div class="card-flat stat-box"><strong>${c.durability}</strong><span>Стойкость</span></div><div class="card-flat stat-box"><strong>${c.support}</strong><span>Поддержка</span></div></div>
      <div class="list-card card-flat"><div class="list-icon">${c.glyph}</div><div class="list-copy"><strong>${c.name}</strong><span>${c.role}</span></div><span class="badge badge-teal">Боевой путь</span></div>
      <div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${p.glyph}</div><div class="list-copy"><strong>${p.name}</strong><span>${p.role}</span></div><span class="badge badge-gold">Профессия</span></div>
    </div>
    <div class="section-head"><h2>Сюжетные линии</h2></div>
    <div class="list-stack"><div class="card list-card"><div class="list-icon">✦</div><div class="list-copy"><strong>Общий сюжет</strong><span>Город над облаками · этап 1 из 3</span></div><span class="badge">Общий</span></div><div class="card list-card"><div class="list-icon">${c.glyph}</div><div class="list-copy"><strong>${c.path}</strong><span>Персональная линия боевого класса</span></div><span class="badge badge-teal">0/4</span></div><div class="card list-card"><div class="list-icon">${p.glyph}</div><div class="list-copy"><strong>${p.name}: начало пути</strong><span>Профессия и городские поручения</span></div><span class="badge badge-gold">0/5</span></div></div>` : state.characterTab === 'Инвентарь' ? `
    <div class="card card-pad"><div class="section-head" style="margin-top:0"><h2>Снаряжение</h2><span class="badge">4 предмета</span></div>${[['⚔','Короткий меч','Обычный · металлический'],['🛡','Дорожный щит','Обычный · защитный'],['⛏','Простая кирка','Инструмент'],['✧','Осколок маяка','Сюжетный предмет']].map(x=>`<div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${x[0]}</div><div class="list-copy"><strong>${x[1]}</strong><span>${x[2]}</span></div><button class="text-action" data-action="item-details">Открыть</button></div>`).join('')}</div>` : `
    <div class="card card-pad"><div class="section-head" style="margin-top:0"><h2>Способности</h2><span class="badge badge-teal">${c.name}</span></div>${[c.skill,'Защитная стойка','Сигнал Отклика'].map((x,i)=>`<div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${i===0?c.glyph:'✧'}</div><div class="list-copy"><strong>${x}</strong><span>${i===0?c.role:'Откроется по мере развития.'}</span></div><span class="badge">${i===0?'Доступно':'Закрыто'}</span></div>`).join('')}</div>`;
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">герой и развитие</div><h1>Персонаж</h1><p>Боевой путь и профессия развиваются отдельно.</p></div>${avatarButtonMarkup('player-portrait', true)}</div>
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
  if (state.updateCheckInProgress || state.updateStatus === 'checking') return 'Проверяем GitHub Releases…';
  if (state.updateStatus === 'no-release') return 'Опубликованных APK-релизов пока нет.';
  if (state.updateStatus === 'current') return `Установлена актуальная версия ${CURRENT_APP_VERSION}.`;
  if (state.updateStatus === 'update') return `Найдена новая версия ${(state.latestRelease && state.latestRelease.tag_name) || ''}.`;
  if (state.updateStatus === 'error') return 'GitHub сейчас недоступен. Проверь подключение и попробуй ещё раз.';
  return 'Проверка версии ещё не выполнялась.';
}

function renderSettings() {
  const c = cls();
  const p = prof();
  const avatar = currentAvatar();
  const statusClass = state.updateStatus === 'update' ? 'update-found' : state.updateStatus === 'error' ? 'update-error' : '';
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">персональные параметры</div><h1>Настройки</h1><p>Обновления и тестовые настройки героя.</p></div><span class="badge badge-teal">ТЕСТ</span></div>
    <section class="card settings-section update-settings-card">
      <div class="settings-heading"><div class="settings-icon update-icon">↻</div><div class="settings-heading-copy"><span class="eyebrow">версия приложения</span><h2>Обновления GitHub</h2><p>Проверка новых APK-релизов проекта.</p></div></div>
      <div class="settings-toggle-row"><div><strong>Автоматически проверять</strong><small>При запуске и по кнопке ниже</small></div><button type="button" class="settings-toggle ${state.autoUpdateEnabled ? 'enabled' : ''}" role="switch" aria-checked="${state.autoUpdateEnabled}" aria-label="Автопроверка обновлений GitHub" data-action="toggle-auto-update"><span></span></button></div>
      <div class="update-status ${statusClass}" aria-live="polite"><span class="status-pulse ${state.updateCheckInProgress ? 'checking' : ''}"></span><span>${getUpdateStatusText()}</span></div>
      <div class="update-version-row"><span>Установлено</span><strong>v${CURRENT_APP_VERSION}</strong></div>
      <button class="btn btn-primary btn-block" data-action="check-github" ${state.updateCheckInProgress ? 'disabled' : ''}>${state.updateCheckInProgress ? 'Проверяем…' : 'Проверить GitHub сейчас'}</button>
      ${state.latestRelease && state.latestRelease.html_url && state.updateStatus === 'update' ? `<button class="btn btn-secondary btn-block release-link-button" data-action="open-latest-release">Открыть релиз ${esc(state.latestRelease.tag_name)} →</button>` : ''}
      <p class="settings-footnote">Источник: <code>${UPDATE_REPOSITORY}/releases/latest</code>. Android попросит подтвердить установку APK. Для выпуска обновлений нужна стабильная подпись приложения.</p>
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
      <div class="settings-choice-icon" style="--choice-accent:${p.accent}">${p.glyph}</div><div class="settings-choice-copy"><span class="eyebrow">текущее ремесло</span><strong>${p.name}</strong><small>${p.role}</small></div>
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
        <span class="selection-glyph">${choice.glyph}</span><span class="selection-copy"><strong>${choice.name}</strong><small>${choice.role}</small><span>${isClass ? choice.short : choice.summary}</span>${isClass ? `<em>Урон ${choice.damage} · стойкость ${choice.durability} · поддержка ${choice.support}</em>` : ''}</span>
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

function finishGithubUpdateCheck(result) {
  state.updateCheckInProgress = false;
  if (result.status === 'no-release') {
    state.latestRelease = null;
    state.updateStatus = 'no-release';
    addNotification('Релизов APK пока нет', 'GitHub доступен, но в репозитории ещё не опубликован релиз для автообновления.', '↻', 'Обновление', 'github-no-release');
  } else if (result.status !== 'ok') {
    state.latestRelease = null;
    state.updateStatus = 'error';
    addNotification('Не удалось проверить GitHub', 'Проверь подключение к интернету и попробуй ещё раз.', '⚠', 'Обновление', 'github-check-error');
  } else {
    const release = { tag_name: result.tag_name || '', html_url: result.html_url || `https://github.com/${UPDATE_REPOSITORY}/releases` };
    state.latestRelease = release;
    if (isVersionNewer(release.tag_name, CURRENT_APP_VERSION)) {
      state.updateStatus = 'update';
      addNotification(`Доступно обновление ${release.tag_name}`, 'Открой релиз GitHub и установи APK после подтверждения Android.', '↻', 'Обновление', `release-${release.tag_name}`);
    } else {
      state.updateStatus = 'current';
      addNotification('Приложение обновлено', `Сейчас установлена последняя версия ${release.tag_name || CURRENT_APP_VERSION}.`, '✓', 'Обновление', `current-${release.tag_name || CURRENT_APP_VERSION}`);
    }
  }
  if (state.screen === 'settings') renderSettings();
  else renderShell();
}

window.onGitHubUpdatePayload = function (payload) {
  try { finishGithubUpdateCheck(JSON.parse(payload)); }
  catch (error) { finishGithubUpdateCheck({ status: 'error' }); }
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
    const response = await fetch(`https://api.github.com/repos/${UPDATE_REPOSITORY}/releases/latest`, {
      headers: { Accept: 'application/vnd.github+json' }, cache: 'no-store'
    });
    if (response.status === 404) {
      finishGithubUpdateCheck({ status: 'no-release' });
      return;
    }
    if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
    const release = await response.json();
    finishGithubUpdateCheck({ status: 'ok', tag_name: release.tag_name, html_url: release.html_url });
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
      <div class="hero-art" style="min-height:140px;margin-bottom:14px"><div class="hero-content"><div class="hero-location">стартовая гавань</div><h2>Лиор</h2><p>У каждой службы — собственная клетка на карте.</p></div></div>
      <div class="section-head"><h2>NPC-службы</h2><button data-nav="map">Открыть карту →</button></div>
      <div class="list-stack">
        ${[['smith','⚒','Кузница Торена Валя','Обычные инструменты, снаряжение и ремонт.'],['merchant','◈','Лавка Мейры Соль','Базовые расходники и городской ассортимент.'],['herbalist','✿','Травница Элна Рут','Простые лечебные средства и советы.']].map(([id,glyph,name,description])=>{const point=getPoi(id);return `<button class="card list-card location-service-card" data-action="visit-poi" data-poi-id="${id}"><div class="list-icon">${glyph}</div><div class="list-copy"><strong>${name}</strong><span>${description}</span><small>Клетка ${formatCell(point.x,point.y)} · ${isAtPoi(point)?'ты здесь':'требуется подойти'}</small></div><span class="badge ${isAtPoi(point)?'badge-teal':'badge-gold'}">${isAtPoi(point)?'Войти':'На карте'}</span></button>`;}).join('')}
      </div>
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
    <div class="section-head"><h2>Запросы на помощь</h2><button data-action="create-order">Создать</button></div>
    <div class="list-stack">
      <div class="card card-pad"><div class="quest-meta"><span class="badge badge-gold">ПРОФЕССИЯ: КУЗНЕЦ</span><span class="badge badge-rose">Нужен Рудокоп</span></div><h3>Материал для маяка</h3><p class="small">Нужна руда для детали сигнального узла.</p><button class="btn btn-primary btn-small" data-action="help-order">Откликнуться</button></div>
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
    <div class="page-title-row"><div><div class="eyebrow">лиорская торговая площадь</div><h1>Рынок</h1><p>Фиксированная цена · аукцион · лавки игроков.</p></div><span class="currency-pill">✧ 100</span></div>
    <div class="segmented">${['Фиксированная цена','Аукцион','Мои заявки'].map(t=>`<button class="${state.marketTab===t?'active':''}" data-market-tab="${t}">${t}</button>`).join('')}</div>
    <div class="market-search"><input class="input" placeholder="Найти предмет"><button class="icon-button" data-action="filter-market">☷</button></div>
    <div class="section-head" style="margin-top:8px"><h2>${state.marketTab}</h2><button data-action="create-listing">+ Выставить</button></div>
    ${state.marketTab === 'Мои заявки' ? `<div class="card card-pad"><div class="notice teal-notice">У тебя пока нет заявок. Создание заявки здесь только показывает форму — реальные товары не продаются.</div><button class="btn btn-primary btn-block" style="margin-top:13px" data-action="create-listing">Создать демо-заявку</button></div>` : `<div class="list-stack">${shown.map(item=>`<div class="card market-item"><div class="item-thumb">${item.glyph}</div><div class="item-info"><strong>${item.name}</strong><span>${item.meta}</span></div><div class="market-price">${item.price}<br><span class="tiny muted">24 ч</span></div><button class="icon-button" data-action="buy-item" aria-label="Открыть предмет">→</button></div>`).join('')}</div>`}
    <div class="notice" style="margin-top:13px">Комиссия 5% отображается до подтверждения. Без премиума заявки работают, пока игрок в сети; премиум оставляет магазин активным офлайн до 24 часов.</div>`;
}

function renderCombat() {
  const c = cls();
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">макет встречи · действия демонстрационные</div><h1>Сигнальный узел</h1><p>Испытание рядом с Лиором · группа 3/4</p></div><button class="back-button" data-nav="home" aria-label="Назад">←</button></div>
    <div class="card encounter-card"><div class="quest-meta"><span class="badge badge-rose">ЭХО</span><span class="badge">Угроза: средняя</span></div><div class="encounter-figure">👁️‍🗨️</div><div style="display:flex;justify-content:space-between;align-items:center"><strong>Искажённый сторож</strong><span class="small muted">Состояние 72%</span></div><div class="health-line"><span></span></div></div>
    <div class="section-head"><h2>Твоя очередь · ${c.name}</h2><span class="badge badge-teal">${c.role}</span></div>
    <div class="skill-grid">${[[c.skill,c.encounterText],[`Защитное действие`, 'Снизить риск для группы.'],['Использовать предмет','Расходник из инвентаря.'],['Посмотреть ситуацию','Уточнить цель и состояние группы.']].map((x,i)=>`<button class="card skill-button" data-action="mock-skill"><strong>${i===0?c.glyph+' ':''}${x[0]}</strong><span>${x[1]}</span></button>`).join('')}</div>
    <div class="section-head"><h2>Группа</h2></div><div class="card card-pad">${[['🛡','Ливен · Страж',83],['✧','Тая · Арканист',61],['✚','Мика · Хранитель',92]].map(x=>`<div class="member-row"><div class="member-avatar">${x[0]}</div><div class="member-info"><strong>${x[1]}</strong><div class="health-line"><span style="width:${x[2]}%;background:linear-gradient(90deg,#65d6d0,#86d59a)"></span></div></div><span class="tiny muted">${x[2]}%</span></div>`).join('')}</div>
    <div class="notice" style="margin-top:12px">Кнопки не запускают бой и не меняют характеристики — это только проверка компоновки экрана.</div>`;
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
  modalCard.innerHTML = `<div class="eyebrow">демонстрационный макет</div><h2>${title}</h2><p>${body}</p><div class="modal-actions"><button class="btn btn-primary" data-action="close-modal">${primary}</button></div>`;
  modalBackdrop.hidden = false;
}

function closeModal() { modalBackdrop.hidden = true; state.modalChoice = null; }

function go(screen) {
  state.screen = screen;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

let travelInterval;

function beginMapTravel(targetX, targetY) {
  if (state.travel) { showToast('Подожди завершения текущего перехода'); return; }
  if (targetX < 1 || targetX > MAP_CONFIG.width || targetY < 1 || targetY > MAP_CONFIG.height) return;
  const distance = Math.abs(targetX - state.position.x) + Math.abs(targetY - state.position.y);
  if (distance !== 1) { showToast('За один шаг можно перейти только на соседнюю клетку'); return; }

  const fromBiome = getBiomeId(state.position.x, state.position.y);
  const toBiome = getBiomeId(targetX, targetY);
  const biomeTransition = fromBiome !== toBiome;
  const durationMs = (biomeTransition ? MAP_CONFIG.borderStepSeconds : MAP_CONFIG.stepSeconds) * 1000;
  state.travel = {
    from: { ...state.position }, to: { x: targetX, y: targetY },
    fromBiome, toBiome, biomeTransition, durationMs,
    gameMinutes: MAP_CONFIG.gameMinutesPerStep + (biomeTransition ? 3 : 0),
    startedAt: Date.now(), endsAt: Date.now() + durationMs
  };
  render();
  clearInterval(travelInterval);
  travelInterval = setInterval(updateTravelTicker, 200);
}

function updateTravelTicker() {
  if (!state.travel) { clearInterval(travelInterval); return; }
  const remaining = getTravelRemainingMs();
  document.querySelectorAll('[data-travel-countdown]').forEach(element => { element.textContent = formatCountdown(remaining); });
  const progress = Math.min(100, ((Date.now() - state.travel.startedAt) / state.travel.durationMs) * 100);
  document.querySelectorAll('[data-travel-progress]').forEach(element => { element.style.width = `${progress}%`; });
  if (remaining > 0) return;

  const arrival = state.travel;
  state.position = { ...arrival.to };
  state.travel = null;
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
    case 'iara': openModal('Иара Кест · клетка 10:50', '«Помоги мне проверить сигнальный узел. Ты пришёл в правильную точку Лиора — взаимодействие доступно только здесь.»'); break;
    case 'smith': openModal('Кузница Торена Валя · клетка 9:50', 'Простая кирка — 20 м · рабочий молот — 20 м · короткий меч — 35 м · ремонт — 10 м. Покупки здесь не совершаются.'); break;
    case 'merchant': openModal('Лавка Мейры Соль · клетка 10:49', 'Макет базового городского ассортимента. Торговые операции отключены.'); break;
    case 'herbalist': openModal('Элна Рут · клетка 10:51', 'Базовые лечебные средства и травы. В этом макете магазин не продаёт предметы.'); break;
    case 'guild': openModal('Гильдия «Крылья Эйры» · клетка 11:50', 'Ты вошёл в здание гильдии. Здесь будут состав, казна, городской совет и права участников.'); break;
    case 'quest-board': go('quests'); showToast('Доска заданий Лиора · клетка 9:49'); break;
    case 'market': go('market'); showToast('Торговая площадь · клетка 11:49'); break;
    case 'beacon': openModal('Старый сигнальный маяк · клетка 30:50', 'Ты пересёк границу побережья и лесного тракта. Переходы между биомами занимают дополнительное время.'); break;
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
  state.modalChoice = null;
  closeModal();
  addNotification(`${type === 'class' ? 'Боевой класс' : 'Профессия'} изменён`, `Теперь активен выбор «${chosen.name}». В тестовом режиме смена бесплатна.`, chosen.glyph, 'Настройки');
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
  const nav = event.target.closest('[data-nav]');
  if (nav) { state.screen = nav.dataset.nav; render(); window.scrollTo(0, 0); return; }

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
    case 'finish-creation': go('home'); showToast('Демо-персонаж создан · прогресс не сохранён'); break;
    case 'open-quests': go('quests'); break;
    case 'open-character': go('character'); break;
    case 'open-city': go('city'); break;
    case 'open-social': go('social'); break;
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
      addNotification(state.autoUpdateEnabled ? 'Автопроверка включена' : 'Автопроверка выключена', state.autoUpdateEnabled ? 'Проверка GitHub Releases будет запускаться при открытии приложения.' : 'Проверку обновлений можно запустить вручную в любой момент.', '↻', 'Настройки');
      render();
      showToast(state.autoUpdateEnabled ? 'Автопроверка GitHub включена' : 'Автопроверка GitHub выключена');
      if (state.autoUpdateEnabled) checkGithubUpdates();
      break;
    }
    case 'check-github': checkGithubUpdates(); break;
    case 'open-latest-release': {
      const releaseUrl = (state.latestRelease && state.latestRelease.html_url) || `https://github.com/${UPDATE_REPOSITORY}/releases`;
      if (window.EchoAstraAndroid && typeof window.EchoAstraAndroid.openRelease === 'function') window.EchoAstraAndroid.openRelease(releaseUrl);
      else window.open(releaseUrl, '_blank', 'noopener');
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
    case 'quest-detail': openModal(actionButton.dataset.title || 'Задание', 'Здесь будут описание, цели, награды и кнопка начала. Демонстрационное задание не влияет на прогресс.'); break;
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
if (state.autoUpdateEnabled) window.setTimeout(() => checkGithubUpdates(), 900);
