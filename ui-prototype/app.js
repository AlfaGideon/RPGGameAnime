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

const navItems = [
  { id: 'home', label: 'Главная', icon: '⌂' },
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
  questFilter: 'Все',
  marketTab: 'Фиксированная цена',
  characterTab: 'Обзор',
  cityMode: 'lior'
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

function renderShell() {
  const currentTitle = {
    home: 'Лиор · портовый район', quests: 'Журнал заданий', character: 'Профиль героя',
    city: 'Город и службы', social: 'Сообщество', market: 'Торговая площадь', combat: 'Испытание'
  }[state.screen] || 'Лиор';
  topbarEl.innerHTML = `
    <div class="brand-mini">
      <div class="brand-mark">ЭА</div>
      <div class="brand-name"><strong>ЭХО АСТРЫ</strong><span>${currentTitle}</span></div>
    </div>
    <div class="top-actions">
      <button class="icon-button" data-action="notifications" aria-label="Уведомления">♧</button>
      <div class="avatar-small" aria-label="Портрет персонажа">${cls().glyph}</div>
    </div>`;
}

function renderNav() {
  navEl.innerHTML = navItems.map(item => `
    <button class="nav-item ${state.screen === item.id ? 'active' : ''}" data-nav="${item.id}" aria-label="${item.label}">
      <span class="nav-icon">${item.icon}</span><span>${item.label}</span>
    </button>`).join('');
}

function renderWelcome() {
  screenEl.innerHTML = `
    <section class="welcome-screen">
      <div class="welcome-brand">
        <div class="welcome-mark">ЭА</div>
        <div><div class="eyebrow">мобильный UI-прототип</div><div class="small muted">аниме-MMORPG · интерфейс без игровых функций</div></div>
      </div>
      <div class="welcome-art" aria-hidden="true">
        <div class="welcome-orb"></div><div class="welcome-island"></div><div class="welcome-tower"></div>
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
      <div class="player-identity"><div class="player-portrait">${c.glyph}</div><div style="min-width:0"><div class="player-name">${esc(state.characterName || 'Астра')} · Уровень 1</div><div class="player-subtitle">${c.name} <span class="muted">·</span> ${p.name}</div></div></div>
      <div class="currency-pill">✧ 100</div>
    </div>
    <section class="hero-art">
      <div class="hero-content"><div class="hero-top"><div><div class="hero-location">первая безопасная гавань</div><h2>Лиор</h2><p>Порт над облаками</p></div><span class="badge badge-gold">☀ ясное утро</span></div></div>
      <div class="hero-bottom"><button class="chip" data-action="open-npc">👩‍🔧 Иара</button><button class="chip" data-action="open-city">⚒ Кузница</button><button class="chip" data-action="open-quests">✦ Доска заданий</button></div>
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
    <div class="card card-pad"><div class="player-identity"><div class="player-portrait">${c.glyph}</div><div><div class="player-name">${esc(state.characterName || 'Астра')}</div><div class="player-subtitle">Уровень 1 · Откликнувшийся</div></div><span class="badge badge-gold">100 м</span></div>
      <div class="stat-grid"><div class="card-flat stat-box"><strong>${c.damage}</strong><span>Урон</span></div><div class="card-flat stat-box"><strong>${c.durability}</strong><span>Стойкость</span></div><div class="card-flat stat-box"><strong>${c.support}</strong><span>Поддержка</span></div></div>
      <div class="list-card card-flat"><div class="list-icon">${c.glyph}</div><div class="list-copy"><strong>${c.name}</strong><span>${c.role}</span></div><span class="badge badge-teal">Боевой путь</span></div>
      <div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${p.glyph}</div><div class="list-copy"><strong>${p.name}</strong><span>${p.role}</span></div><span class="badge badge-gold">Профессия</span></div>
    </div>
    <div class="section-head"><h2>Сюжетные линии</h2></div>
    <div class="list-stack"><div class="card list-card"><div class="list-icon">✦</div><div class="list-copy"><strong>Общий сюжет</strong><span>Город над облаками · этап 1 из 3</span></div><span class="badge">Общий</span></div><div class="card list-card"><div class="list-icon">${c.glyph}</div><div class="list-copy"><strong>${c.path}</strong><span>Персональная линия боевого класса</span></div><span class="badge badge-teal">0/4</span></div><div class="card list-card"><div class="list-icon">${p.glyph}</div><div class="list-copy"><strong>${p.name}: начало пути</strong><span>Профессия и городские поручения</span></div><span class="badge badge-gold">0/5</span></div></div>` : state.characterTab === 'Инвентарь' ? `
    <div class="card card-pad"><div class="section-head" style="margin-top:0"><h2>Снаряжение</h2><span class="badge">4 предмета</span></div>${[['⚔','Короткий меч','Обычный · металлический'],['🛡','Дорожный щит','Обычный · защитный'],['⛏','Простая кирка','Инструмент'],['✧','Осколок маяка','Сюжетный предмет']].map(x=>`<div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${x[0]}</div><div class="list-copy"><strong>${x[1]}</strong><span>${x[2]}</span></div><button class="text-action" data-action="item-details">Открыть</button></div>`).join('')}</div>` : `
    <div class="card card-pad"><div class="section-head" style="margin-top:0"><h2>Способности</h2><span class="badge badge-teal">${c.name}</span></div>${[c.skill,'Защитная стойка','Сигнал Отклика'].map((x,i)=>`<div class="list-card card-flat" style="margin-top:8px"><div class="list-icon">${i===0?c.glyph:'✧'}</div><div class="list-copy"><strong>${x}</strong><span>${i===0?c.role:'Откроется по мере развития.'}</span></div><span class="badge">${i===0?'Доступно':'Закрыто'}</span></div>`).join('')}</div>`;
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">герой и развитие</div><h1>Персонаж</h1><p>Боевой путь и профессия развиваются отдельно.</p></div><div class="player-portrait">${c.glyph}</div></div>
    <div class="notice teal-notice">ДЕМО: переключай классы ниже, чтобы сравнить интерфейс. Выбор временный и не меняет игру.</div>
    <div class="segmented">${['Обзор','Инвентарь','Способности'].map(t=>`<button class="${state.characterTab===t?'active':''}" data-character-tab="${t}">${t}</button>`).join('')}</div>
    ${content}
    <div class="section-head"><h2>Предпросмотр классов</h2></div>
    <div class="card card-pad">
      <div class="form-row"><label for="combat-class-select">Боевой класс</label><select class="select" id="combat-class-select">${combatClasses.map(x=>`<option value="${x.id}" ${state.classId===x.id?'selected':''}>${x.glyph} ${x.name} — ${x.role}</option>`).join('')}</select></div>
      <div class="form-row"><label for="profession-select">Профессия</label><select class="select" id="profession-select">${professions.map(x=>`<option value="${x.id}" ${state.professionId===x.id?'selected':''}>${x.glyph} ${x.name} — ${x.role}</option>`).join('')}</select></div>
      <p class="small" style="margin-bottom:0">В настоящей игре смена будет происходить по правилам наставника; здесь это только переключатель макета.</p>
    </div>`;
}

function renderCity() {
  const isLior = state.cityMode === 'lior';
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">городские службы</div><h1>${isLior ? 'Лиор' : 'Новое поселение'}</h1><p>${isLior ? 'Стартовый город с постоянными NPC-службами.' : 'Город, который строят и обслуживают игроки.'}</p></div><span class="badge ${isLior?'badge-gold':'badge-teal'}">${isLior?'NPC':'ИГРОКИ'}</span></div>
    <div class="segmented"><button class="${isLior?'active':''}" data-city-mode="lior">Лиор</button><button class="${!isLior?'active':''}" data-city-mode="player">Город игроков</button></div>
    ${isLior ? `
      <div class="hero-art" style="min-height:140px;margin-bottom:14px"><div class="hero-content"><div class="hero-location">стартовая гавань</div><h2>Лиор</h2><p>Базовые услуги всегда доступны</p></div></div>
      <div class="section-head"><h2>NPC-службы</h2><span class="badge">3 открыто</span></div>
      <div class="list-stack">
        <button class="card list-card" data-action="smith"><div class="list-icon">⚒</div><div class="list-copy"><strong>Кузница Торена Валя</strong><span>Обычные инструменты, простое снаряжение и ремонт.</span></div><span class="badge badge-gold">Открыть</span></button>
        <button class="card list-card" data-action="merchant"><div class="list-icon">◈</div><div class="list-copy"><strong>Лавка Мейры Соль</strong><span>Базовые расходники и городской ассортимент.</span></div><span class="badge badge-gold">Открыть</span></button>
        <button class="card list-card" data-action="herbalist"><div class="list-icon">✿</div><div class="list-copy"><strong>Травница Элна Рут</strong><span>Простые лечебные средства и советы.</span></div><span class="badge badge-gold">Открыть</span></button>
      </div>
      <div class="section-head"><h2>Городские службы</h2></div><div class="action-row"><button class="card action-tile" data-action="open-quests"><span class="tile-icon">✦</span><strong>Задания</strong><span>Доска Лиора</span></button><button class="card action-tile" data-action="open-social"><span class="tile-icon">⌘</span><strong>Группа</strong><span>Найти помощь</span></button><button class="card action-tile" data-action="open-market"><span class="tile-icon">◈</span><strong>Рынок</strong><span>Товары города</span></button></div>` : `
      <div class="card card-pad"><div class="city-status"><div class="guild-emblem">⌂</div><div class="city-progress"><strong>Гильдия «Крылья Эйры»</strong><div class="small muted" style="margin-top:4px">Основано 5 игроками · совет 2/3</div></div><span class="badge badge-teal">Ранг 1</span></div></div>
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
  screenEl.innerHTML = `
    <div class="page-title-row"><div><div class="eyebrow">игроки рядом</div><h1>Связь</h1><p>Группа, гильдия и совместные поручения.</p></div><span class="badge badge-teal">3 онлайн</span></div>
    <div class="card social-header"><div class="guild-emblem">⌘</div><div><strong>Гильдия «Крылья Эйры»</strong><div class="small muted" style="margin-top:4px">12 участников · город Лиор</div></div><button class="text-action" data-action="guild-details">Открыть →</button></div>
    <div class="section-head"><h2>Запросы на помощь</h2><button data-action="create-order">Создать</button></div>
    <div class="list-stack">
      <div class="card card-pad"><div class="quest-meta"><span class="badge badge-gold">ПРОФЕССИЯ: КУЗНЕЦ</span><span class="badge badge-rose">Нужен Рудокоп</span></div><h3>Материал для маяка</h3><p class="small">Нужна руда для детали сигнального узла.</p><button class="btn btn-primary btn-small" data-action="help-order">Откликнуться</button></div>
      <div class="card card-pad"><div class="quest-meta"><span class="badge badge-teal">БОЕВОЙ КЛАСС</span><span class="badge">Нужен Следопыт</span></div><h3>Проверка маршрута</h3><p class="small">Помоги разведать путь к старому маяку.</p><button class="btn btn-secondary btn-small" data-action="help-order">Посмотреть</button></div>
    </div>
    <div class="section-head"><h2>Недавние помощники</h2><button data-action="friends">Все</button></div>
    <div class="card card-pad">${[['🛡','Ливен','Страж · Строитель'],['⛏','Роан','Следопыт · Рудокоп'],['✿','Мика','Хранитель · Травник']].map(x=>`<div class="member-row"><div class="member-avatar">${x[0]}</div><div class="member-info"><strong>${x[1]}</strong><span>${x[2]}</span></div><span class="online-dot"></span><button class="icon-button" data-action="message">✉</button></div>`).join('')}</div>
    <div class="section-head"><h2>Системные сообщения</h2></div><div class="card list-card"><div class="list-icon">◷</div><div class="list-copy"><strong>Помощь кузнецу нужна</strong><span>Новый заказ ждёт игрока с профессией Рудокоп.</span></div><span class="badge">Сейчас</span></div>`;
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
    case 'quests': renderQuests(); break;
    case 'character': renderCharacter(); break;
    case 'city': renderCity(); break;
    case 'social': renderSocial(); break;
    case 'market': renderMarket(); break;
    case 'combat': renderCombat(); break;
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

function closeModal() { modalBackdrop.hidden = true; }

function go(screen) {
  state.screen = screen;
  window.scrollTo({ top: 0, behavior: 'smooth' });
  render();
}

document.addEventListener('click', (event) => {
  const nav = event.target.closest('[data-nav]');
  if (nav) { state.screen = nav.dataset.nav; render(); window.scrollTo(0, 0); return; }

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
    case 'open-npc': openModal('Иара Кест', '«Помоги мне проверить сигнальный узел. Эта реплика и кнопки показывают внешний вид диалога; квест в демо не запускается.'); break;
    case 'notifications': openModal('Уведомления', 'Здесь будут новые задания, ответы на поручения и сообщения. В этом прототипе уведомления демонстрационные.'); break;
    case 'smith': openModal('Кузница Торена Валя', 'Простая кирка — 20 м · рабочий молот — 20 м · короткий меч — 35 м · ремонт — 10 м. Покупки здесь не совершаются.'); break;
    case 'merchant': openModal('Лавка Мейры Соль', 'Макет базового городского ассортимента. Торговые операции отключены.'); break;
    case 'herbalist': openModal('Элна Рут', 'Базовые лечебные средства и травы. В этом макете магазин не продаёт предметы.'); break;
    case 'building-wizard': openModal('Новый городской проект', 'Выбор типа постройки, вклад материалов, подходящая профессия и назначение оператора. Подтверждение не создаёт реальное здание.'); break;
    case 'building-details': openModal('Городская постройка', 'Макет карточки здания: статус, владелец, оператор, требования и городское голосование. Данные не сохраняются.'); break;
    case 'council-vote': showToast('Голосование показано только для проверки интерфейса'); break;
    case 'create-order': openModal('Запросить помощь', `Нужен игрок с профессией или классом для шага «${prof().name}». В реальной игре запрос попадёт на доску поручений.`); break;
    case 'help-order': showToast('Отклик записан только в демо'); break;
    case 'guild-details': openModal('Гильдия «Крылья Эйры»', 'Здесь будут состав, казна, совет и городские права. Это демонстрационный экран.'); break;
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

document.addEventListener('change', (event) => {
  if (event.target.id === 'combat-class-select') {
    state.classId = event.target.value;
    render();
    showToast('Предпросмотр боевого интерфейса обновлён');
  }
  if (event.target.id === 'profession-select') {
    state.professionId = event.target.value;
    render();
    showToast('Предпросмотр профессии обновлён');
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

render();
