/**
 * Merry Christmas & Happy Holidays 🎄
 * Interactive One-Page Website Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 0. 다크 / 화이트 모드 토글 초기화
  initThemeToggle();

  // 1. 눈 내리는 애니메이션 초기화
  initSnowfall();

  // 2. 파티클 / 폭죽 엔진 초기화
  initConfetti();

  // 3. 네비게이션 & 스크롤 & 모바일 메뉴
  initNavigation();

  // 4. D-Day 카운트다운
  initCountdown();

  // 5. 소원 트리 시스템
  initWishingTree();

  // 6. 선물 상자 모달
  initGiftBoxes();

  // 7. Web Audio API 캐롤 오르골 주크박스
  initCarolSynthesizer();

  // 8. 크리스마스 엽서 생성기 & 캔버스 다운로드
  initCardGenerator();

  // 9. 크리스마스 캐릭터 성향 테스트
  initHolidayQuiz();

  // 10. 맨 위로 가기 버튼
  initBackToTop();
});

/* ==========================================================================
   1. Snowfall Animation Engine (Canvas)
   ========================================================================== */
function initSnowfall() {
  const canvas = document.getElementById('snow-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const snowflakeCount = Math.min(Math.floor(width / 9), 140);
  const snowflakes = [];

  let mouseX = width / 2;
  let windSpeed = 0;

  window.addEventListener('mousemove', (e) => {
    const delta = (e.clientX - mouseX) * 0.005;
    windSpeed = Math.max(Math.min(delta, 1.2), -1.2);
    mouseX = e.clientX;
  });

  for (let i = 0; i < snowflakeCount; i++) {
    snowflakes.push(createSnowflake(width, height));
  }

  function createSnowflake(w, h, startAtTop = false) {
    return {
      x: Math.random() * w,
      y: startAtTop ? -10 : Math.random() * h,
      radius: Math.random() * 2.8 + 0.8,
      density: Math.random() * 1 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
      sway: Math.random() * 0.04 + 0.01,
      swayOffset: Math.random() * Math.PI * 2,
    };
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#ffffff';
    windSpeed *= 0.98; // 서서히 감속

    for (let i = 0; i < snowflakes.length; i++) {
      const p = snowflakes[i];

      p.swayOffset += p.sway;
      p.x += Math.sin(p.swayOffset) * 0.8 + windSpeed;
      p.y += (p.density + 0.6) * 1.1;

      // 화면 벗어나면 상단으로 재배치
      if (p.y > height + 10) {
        snowflakes[i] = createSnowflake(width, height, true);
      }
      if (p.x > width + 10) p.x = -10;
      if (p.x < -10) p.x = width + 10;

      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      
      const isLight = document.documentElement.getAttribute('data-theme') === 'light';
      if (isLight) {
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(p.alpha + 0.25, 0.98)})`;
        ctx.shadowBlur = 4;
        ctx.shadowColor = 'rgba(100, 150, 205, 0.7)';
      } else {
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.shadowBlur = p.radius > 2 ? 6 : 0;
        ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
      }

      ctx.fill();
      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}

/* ==========================================================================
   2. Confetti Cannon (축하 파티클)
   ========================================================================== */
let triggerConfettiEffect = () => {};

function initConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  let particles = [];
  const colors = ['#e63946', '#ffd166', '#06d6a0', '#118ab2', '#ffffff', '#ff70a6'];

  triggerConfettiEffect = function (originX = width / 2, originY = height / 2, count = 70) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: Math.random() * 8 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        life: 1,
        decay: Math.random() * 0.015 + 0.01,
      });
    }
  };

  function updateConfetti() {
    ctx.clearRect(0, 0, width, height);

    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.22; // gravity
      p.vx *= 0.98;
      p.rotation += p.vRot;
      p.life -= p.decay;

      if (p.life <= 0) {
        particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      ctx.restore();
    }

    requestAnimationFrame(updateConfetti);
  }

  updateConfetti();
}

/* ==========================================================================
   3. Navigation & Scroll
   ========================================================================== */
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const links = document.querySelectorAll('.nav-link');

  // 스크롤 시 네비게이션 배경 변화 & 액티브 메뉴 동기화
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach((sec) => {
      const secHeight = sec.offsetHeight;
      const secTop = sec.offsetTop - 120;
      const secId = sec.getAttribute('id');

      if (scrollY >= secTop && scrollY < secTop + secHeight) {
        links.forEach((l) => l.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[href="#${secId}"]`);
        if (activeLink) activeLink.classList.add('active');
      }
    });
  });

  // 모바일 메뉴 토글
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    links.forEach((l) => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }
}

/* ==========================================================================
   4. D-Day Countdown
   ========================================================================== */
function initCountdown() {
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const statusEl = document.getElementById('countdown-status-msg');

  function update() {
    const now = new Date();
    let currentYear = now.getFullYear();
    let christmas = new Date(currentYear, 11, 25, 0, 0, 0);

    // 올해 크리스마스가 이미 지났다면 내년 크리스마스로
    if (now > christmas) {
      christmas = new Date(currentYear + 1, 11, 25, 0, 0, 0);
    }

    const diff = christmas.getTime() - now.getTime();

    // 당일인 경우
    if (now.getMonth() === 11 && now.getDate() === 25) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      if (statusEl) {
        statusEl.innerHTML = '🎅 오늘은 바로 신나는 <strong>크리스마스 당일</strong>입니다! 행복한 하루 보내세요! 🎉';
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(2, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minutesEl.textContent = String(minutes).padStart(2, '0');
    secondsEl.textContent = String(seconds).padStart(2, '0');

    if (statusEl) {
      statusEl.innerHTML = `크리스마스 아침까지 <strong>${days}일 ${hours}시간</strong> 남았어요! 설레는 하루 되세요 ❄️`;
    }
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   5. Wishing Tree (소원 트리 & LocalStorage)
   ========================================================================== */
const DEFAULT_WISHES = [
  { id: 1, author: '눈꽃별', text: '사랑하는 가족들 모두 건강하고 웃음만 가득한 겨울 되길!', shape: 'star', color: '#ffd166', x: 50, y: 22 },
  { id: 2, author: '산타의친구', text: '올해 준비한 모든 시험과 프로젝트 대박 나자!', shape: 'ball', color: '#e63946', x: 38, y: 38 },
  { id: 3, author: '루돌프코', text: '화이트 크리스마스가 찾아와서 펑펑 눈 쌓인 풍경 보고 싶어요 ☃️', shape: 'bell', color: '#ffd166', x: 62, y: 40 },
  { id: 4, author: '달콤쿠키', text: '좋은 사람들과 맛있는 케이크 나누며 따스한 연말 보내기!', shape: 'cookie', color: '#06d6a0', x: 28, y: 56 },
  { id: 5, author: '윈터러버', text: '새해에는 더 큰 용기로 새로운 도전에 성공하기를 ✨', shape: 'candy', color: '#ff70a6', x: 72, y: 58 },
  { id: 6, author: '포근한밤', text: '추운 겨울 모두 마음만은 든든하고 따뜻하게 보내요.', shape: 'ball', color: '#118ab2', x: 50, y: 68 },
];

function initWishingTree() {
  const ornamentsLayer = document.getElementById('tree-ornaments-layer');
  const wishForm = document.getElementById('wish-form');
  const authorInput = document.getElementById('wish-author');
  const textInput = document.getElementById('wish-text');
  const charNum = document.getElementById('char-num');
  const wishCountNum = document.getElementById('wish-count-num');
  const resetBtn = document.getElementById('reset-wishes-btn');

  // 모달 요소
  const modal = document.getElementById('wish-modal');
  const modalClose = document.getElementById('modal-close-btn');
  const modalAuthor = document.getElementById('modal-author');
  const modalMessage = document.getElementById('modal-message');
  const modalDecor = document.getElementById('modal-decor');

  // 오너먼트 / 컬러 픽커
  const shapeChoices = document.querySelectorAll('.ornament-choice');
  const colorOpts = document.querySelectorAll('.color-opt');

  let selectedShape = 'ball';
  let selectedColor = '#e63946';

  shapeChoices.forEach((btn) => {
    btn.addEventListener('click', () => {
      shapeChoices.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      selectedShape = btn.dataset.shape;
    });
  });

  colorOpts.forEach((opt) => {
    opt.addEventListener('click', () => {
      colorOpts.forEach((o) => o.classList.remove('active'));
      opt.classList.add('active');
      selectedColor = opt.dataset.color;
    });
  });

  // 글자 수 카운터
  textInput.addEventListener('input', () => {
    charNum.textContent = textInput.value.length;
  });

  // 소원 불러오기
  function loadWishes() {
    const saved = localStorage.getItem('christmas_wishes_2026');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_WISHES;
      }
    }
    return DEFAULT_WISHES;
  }

  function saveWishes(wishes) {
    localStorage.setItem('christmas_wishes_2026', JSON.stringify(wishes));
  }

  let wishes = loadWishes();

  // 트리 오너먼트 렌더링
  function renderOrnaments() {
    ornamentsLayer.innerHTML = '';
    wishCountNum.textContent = wishes.length;

    wishes.forEach((w) => {
      const el = document.createElement('div');
      el.className = 'tree-ornament';
      el.style.left = `${w.x}%`;
      el.style.top = `${w.y}%`;
      el.title = `${w.author}님의 소원 보기`;

      const emojiMap = {
        ball: '🔴',
        star: '⭐',
        candy: '🍬',
        bell: '🔔',
        cookie: '🍪',
      };

      const inner = document.createElement('div');
      inner.className = 'ornament-inner';
      inner.textContent = emojiMap[w.shape] || '🎄';
      inner.style.filter = `drop-shadow(0 0 8px ${w.color || '#ffd166'})`;

      el.appendChild(inner);

      el.addEventListener('click', () => {
        openWishModal(w);
      });

      ornamentsLayer.appendChild(el);
    });
  }

  // 모달 열기
  function openWishModal(w) {
    modalAuthor.textContent = `${w.author}님의 크리스마스 소원`;
    modalMessage.textContent = `"${w.text}"`;
    modalDecor.textContent = w.shape === 'star' ? '⭐' : w.shape === 'bell' ? '🔔' : '🎄';
    modal.classList.remove('hidden');
  }

  modalClose.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.add('hidden');
  });

  // 소원 제출
  wishForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const author = authorInput.value.trim();
    const text = textInput.value.trim();

    if (!author || !text) return;

    // 트리의 원뿔 형태 내부 좌표 랜덤 생성 (삼각형 범위 내)
    // y: 18% ~ 75%
    const y = Math.random() * 57 + 18;
    // y에 따라 트리의 폭 결정 (위쪽은 좁고 아래쪽은 넓음)
    const factor = (y - 15) / 60; // 0 ~ 1
    const maxHalfWidth = 12 + factor * 30; // 12% ~ 42%
    const x = 50 + (Math.random() * 2 - 1) * maxHalfWidth;

    const newWish = {
      id: Date.now(),
      author,
      text,
      shape: selectedShape,
      color: selectedColor,
      x: Math.round(x),
      y: Math.round(y),
    };

    wishes.push(newWish);
    saveWishes(wishes);
    renderOrnaments();

    // 폼 초기화
    authorInput.value = '';
    textInput.value = '';
    charNum.textContent = '0';

    // 축하 폭죽 효과
    const rect = wishForm.getBoundingClientRect();
    triggerConfettiEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, 80);

    showToast('✨ 소원이 트리에 예쁘게 걸렸습니다!');
  });

  // 초기화 버튼
  resetBtn.addEventListener('click', () => {
    if (confirm('소원 목록을 초기 기본 소원들로 되돌릴까요?')) {
      wishes = [...DEFAULT_WISHES];
      saveWishes(wishes);
      renderOrnaments();
      showToast('소원 트리가 기본 상태로 초기화되었습니다.');
    }
  });

  renderOrnaments();
}

/* ==========================================================================
   6. Secret Gift Box Modal (선물 상자)
   ========================================================================== */
const GIFT_DATA = {
  1: {
    badge: "RUDOLPH'S GIFT",
    icon: '🦌',
    title: '루돌프의 크리스마스 명작 영화 추천',
    body: '포근한 이불 속에서 귤 까먹으며 보기 딱 좋은 크리스마스 인생 영화를 추천해드려요!',
    extra: '🎬 <strong>추천 영화:</strong> <br>1. 나 홀로 집에 (Home Alone)<br>2. 패딩턴 2 (Paddington 2)<br>3. 클라우스 (Klaus - 넷플릭스 명작 애니)',
  },
  2: {
    badge: "SNOWMAN'S GIFT",
    icon: '⛄',
    title: '눈사람의 겨울 시그니처 힐링 레시피',
    body: '추운 몸과 마음을 사르르 녹여줄 달콤한 겨울 홈카페 음료 레시피예요!',
    extra: '☕ <strong>마시멜로 퐁당 핫초콜릿:</strong><br>따뜻한 우유 200ml + 다크초콜릿 40g 녹이기 + 퐁신퐁신 마시멜로 듬뿍 올린 후 시나몬 파우더 톡톡!',
  },
  3: {
    badge: "SANTA'S SECRET",
    icon: '🎅',
    title: '산타의 2026 연말 럭키 포춘 & 덕담',
    body: '올 한 해 수많은 어려움 속에서도 묵묵히 달려온 당신에게 산타가 전하는 응원입니다.',
    extra: '🌟 <em>"당신이 지나온 모든 발걸음은 헛되지 않았습니다. 다가오는 새해에는 상상했던 것보다 훨씬 더 찬란한 기쁨이 당신을 기다립니다."</em>',
  },
  4: {
    badge: "FAIRY'S GIFT",
    icon: '🧚',
    title: '크리스마스 요정의 소소한 행복 미션',
    body: '오늘 하루를 두 배로 따뜻하게 만들어줄 작은 미션을 드립니다!',
    extra: '💌 <strong>오늘의 3분 미션:</strong><br>최근에 연락이 뜸했던 소중한 친구나 가족에게 "올 한 해 고마웠어, 메리 크리스마스!" 따뜻한 안부 톡 한 통 보내보기.',
  },
  5: {
    badge: "GINGER COOKIE'S GIFT",
    icon: '🍪',
    title: '진저쿠키의 달콤한 베이킹 스토리',
    body: '크리스마스에 진저브레드를 굽는 이유는 향신료가 액운을 막고 행운을 가져다준다는 이야기에서 시작되었답니다.',
    extra: '✨ <strong>행운 한 조각:</strong><br>달콤한 쿠키처럼 부드럽고 유쾌한 일들이 당신의 연말을 달콤하게 채워줄 거예요!',
  },
  6: {
    badge: "AURORA'S GIFT",
    icon: '❄️',
    title: '오로라의 무한 자유 휴식 쿠폰',
    body: '지치고 바빴던 일상에서 벗어나 오롯이 나만을 위해 쓸 수 있는 황금 휴식권입니다.',
    extra: '🎟️ <strong>[2026 무제한 힐링 쿠폰]:</strong><br>아무런 걱정 없이 좋아하는 음악 듣기, 늦잠 자기, 멍때리기 무제한 사용 가능!',
  },
};

function initGiftBoxes() {
  const giftItems = document.querySelectorAll('.gift-box-item');
  const modal = document.getElementById('gift-modal');
  const closeBtn = document.getElementById('gift-modal-close-btn');
  const confirmBtn = document.getElementById('gift-modal-confirm-btn');

  const badgeEl = document.getElementById('gift-modal-badge');
  const iconEl = document.getElementById('gift-modal-icon');
  const titleEl = document.getElementById('gift-modal-title');
  const bodyEl = document.getElementById('gift-modal-body');
  const extraEl = document.getElementById('gift-modal-extra');

  giftItems.forEach((box) => {
    box.addEventListener('click', () => {
      const id = box.dataset.giftId;
      const data = GIFT_DATA[id];
      if (!data) return;

      badgeEl.textContent = data.badge;
      iconEl.textContent = data.icon;
      titleEl.textContent = data.title;
      bodyEl.textContent = data.body;
      extraEl.innerHTML = data.extra;

      modal.classList.remove('hidden');

      const rect = box.getBoundingClientRect();
      triggerConfettiEffect(rect.left + rect.width / 2, rect.top + rect.height / 2, 90);
    });
  });

  const closeModal = () => modal.classList.add('hidden');
  closeBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
}

/* ==========================================================================
   7. Carol Synthesizer (Web Audio API - Pure Music Box Chimes)
   ========================================================================== */
function initCarolSynthesizer() {
  let audioCtx = null;
  let isPlaying = false;
  let currentTrack = 'jingleBells';
  let masterGain = null;
  let noteTimeoutId = null;

  const playBtn = document.getElementById('carol-play-btn');
  const playBtnIcon = document.getElementById('play-btn-icon');
  const playBtnText = document.getElementById('play-btn-text');
  const bgmToggleBtn = document.getElementById('bgm-toggle-btn');
  const bgmText = document.querySelector('.bgm-text');
  const disc = document.getElementById('music-disc');
  const volumeSlider = document.getElementById('volume-slider');
  const trackBtns = document.querySelectorAll('.track-btn');
  const trackTitle = document.getElementById('track-title');
  const trackDesc = document.getElementById('track-desc');

  // 음계 주파수 테이블 (Hz)
  const NOTES = {
    G3: 196.0, A3: 220.0, B3: 246.94,
    C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.0, 'G#4': 415.3, A4: 440.0, B4: 493.88,
    C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, A5: 880.0, B5: 987.77,
    C6: 1046.5,
    REST: 0,
  };

  // 트랙별 악보 정의 [음이름, 박자단위(1 = 4분음표)]
  const SONGS = {
    jingleBells: {
      title: 'Jingle Bells (징글벨)',
      desc: '경쾌한 방울소리와 함께 달리는 썰매의 멜로디',
      tempo: 220, // ms per beat unit
      notes: [
        ['E4', 1], ['E4', 1], ['E4', 2],
        ['E4', 1], ['E4', 1], ['E4', 2],
        ['E4', 1], ['G4', 1], ['C4', 1.5], ['D4', 0.5],
        ['E4', 4],
        ['F4', 1], ['F4', 1], ['F4', 1.5], ['F4', 0.5],
        ['F4', 1], ['E4', 1], ['E4', 1], ['E4', 0.5], ['E4', 0.5],
        ['E4', 1], ['D4', 1], ['D4', 1], ['E4', 1],
        ['D4', 2], ['G4', 2],
        ['E4', 1], ['E4', 1], ['E4', 2],
        ['E4', 1], ['E4', 1], ['E4', 2],
        ['E4', 1], ['G4', 1], ['C4', 1.5], ['D4', 0.5],
        ['E4', 4],
        ['F4', 1], ['F4', 1], ['F4', 1.5], ['F4', 0.5],
        ['F4', 1], ['E4', 1], ['E4', 1], ['E4', 0.5], ['E4', 0.5],
        ['G4', 1], ['G4', 1], ['F4', 1], ['D4', 1],
        ['C4', 4], ['REST', 2],
      ],
    },
    weWishYou: {
      title: 'We Wish You A Merry Christmas',
      desc: '따뜻한 축복과 행복을 기원하는 전 세계인의 캐롤',
      tempo: 240,
      notes: [
        ['D4', 1],
        ['G4', 1], ['G4', 0.5], ['A4', 0.5], ['G4', 0.5], ['F#4', 0.5],
        ['E4', 1], ['E4', 1], ['E4', 1],
        ['A4', 1], ['A4', 0.5], ['B4', 0.5], ['A4', 0.5], ['G4', 0.5],
        ['F#4', 1], ['D4', 1], ['D4', 1],
        ['B4', 1], ['B4', 0.5], ['C5', 0.5], ['B4', 0.5], ['A4', 0.5],
        ['G4', 1], ['E4', 1], ['D4', 0.5], ['D4', 0.5],
        ['E4', 1], ['A4', 1], ['F#4', 1],
        ['G4', 2], ['REST', 1],
      ],
    },
    silentNight: {
      title: 'Silent Night (고요한 밤 거룩한 밤)',
      desc: '포근하고 평화로운 성탄 밤을 그리는 오르골 선율',
      tempo: 300,
      notes: [
        ['G4', 1.5], ['A4', 0.5], ['G4', 1],
        ['E4', 3],
        ['G4', 1.5], ['A4', 0.5], ['G4', 1],
        ['E4', 3],
        ['D5', 2], ['D5', 1],
        ['B4', 3],
        ['C5', 2], ['C5', 1],
        ['G4', 3],
        ['A4', 2], ['A4', 1],
        ['C5', 1.5], ['B4', 0.5], ['A4', 1],
        ['G4', 1.5], ['A4', 0.5], ['G4', 1],
        ['E4', 3],
        ['REST', 2],
      ],
    },
    joyToTheWorld: {
      title: 'Joy to the World (기쁘다 구주 오셨네)',
      desc: '희망과 기쁨이 가득 울려 퍼지는 축제의 멜로디',
      tempo: 200,
      notes: [
        ['C5', 2], ['B4', 1.5], ['A4', 0.5],
        ['G4', 3], ['F4', 1],
        ['E4', 2], ['D4', 2],
        ['C4', 3], ['G4', 1],
        ['A4', 3], ['A4', 1],
        ['B4', 3], ['B4', 1],
        ['C5', 4],
        ['REST', 2],
      ],
    },
  };

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      audioCtx = new AudioContextClass();
      masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(parseFloat(volumeSlider.value) || 0.7, audioCtx.currentTime);
      masterGain.connect(audioCtx.destination);
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // 크리스마스 인터랙티브 효과음 (SFX)
  window.playChristmasSfx = function (type) {
    try {
      const ctx = getAudioContext();
      const now = ctx.currentTime;

      if (type === 'bell') {
        // 딸랑딸랑 은방울 소리 (고음역 맑은 2연타)
        [1046.5, 1318.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.08);
          gain.gain.setValueAtTime(0.18, now + i * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.35);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.08);
          osc.stop(now + i * 0.08 + 0.36);
        });
      } else if (type === 'magic') {
        // 마법 차임 아르페지오 (C5 -> E5 -> G5 -> C6)
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.07);
          gain.gain.setValueAtTime(0.2, now + i * 0.07);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.45);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.07);
          osc.stop(now + i * 0.07 + 0.46);
        });
      } else if (type === 'sparkle') {
        // 반짝임 차임
        [880.0, 1174.6, 1760.0].forEach((freq, i) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.05);
          gain.gain.setValueAtTime(0.15, now + i * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.05 + 0.3);
          osc.connect(gain);
          gain.connect(masterGain);
          osc.start(now + i * 0.05);
          osc.stop(now + i * 0.05 + 0.31);
        });
      }
    } catch (e) {
      // 오류 무시
    }
  };

  // 벨/오르골 사운드 단일 음 합성 함수
  function playChimeNote(freq, durationSec) {
    if (freq <= 0) return;
    const ctx = getAudioContext();
    const now = ctx.currentTime;

    // 1. 기본 오실레이터 (Sine 파형 - 맑고 둥근 음색)
    const osc1 = ctx.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(freq, now);

    // 2. 하모닉스 오실레이터 (Triangle 파형 - 오르골 특유의 반짝임)
    const osc2 = ctx.createOscillator();
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(freq * 2, now);

    // 음색 엔벨로프 (Attack 즉시 치고 Exponential Decay로 여운)
    const noteGain = ctx.createGain();
    noteGain.gain.setValueAtTime(0, now);
    noteGain.gain.linearRampToValueAtTime(0.4, now + 0.015);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + Math.max(durationSec * 1.5, 0.4));

    const osc2Gain = ctx.createGain();
    osc2Gain.gain.setValueAtTime(0.12, now);
    osc2Gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

    osc1.connect(noteGain);
    osc2.connect(osc2Gain);
    osc2Gain.connect(noteGain);

    noteGain.connect(masterGain);

    osc1.start(now);
    osc2.start(now);

    const stopTime = now + Math.max(durationSec * 1.6, 0.5);
    osc1.stop(stopTime);
    osc2.stop(stopTime);
  }

  // 곡 재생 루프
  let noteIndex = 0;
  function playSongLoop() {
    if (!isPlaying) return;
    const song = SONGS[currentTrack];
    if (!song) return;

    if (noteIndex >= song.notes.length) {
      noteIndex = 0;
    }

    const [noteName, beats] = song.notes[noteIndex];
    const freq = NOTES[noteName] || 0;
    const durationMs = beats * song.tempo;

    if (freq > 0) {
      playChimeNote(freq, durationMs / 1000);
    }

    noteIndex++;
    noteTimeoutId = setTimeout(playSongLoop, durationMs);
  }

  function startMusic() {
    getAudioContext();
    isPlaying = true;
    playSongLoop();

    // UI 상태 업데이트
    playBtnIcon.textContent = '⏸';
    playBtnText.textContent = '캐롤 일시정지';
    bgmToggleBtn.classList.add('playing');
    bgmText.textContent = 'BGM On';
    disc.classList.add('rotating');
  }

  function stopMusic() {
    isPlaying = false;
    if (noteTimeoutId) {
      clearTimeout(noteTimeoutId);
      noteTimeoutId = null;
    }

    // UI 상태 업데이트
    playBtnIcon.textContent = '▶';
    playBtnText.textContent = '캐롤 재생하기';
    bgmToggleBtn.classList.remove('playing');
    bgmText.textContent = 'BGM Off';
    disc.classList.remove('rotating');
  }

  function toggleMusic() {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  }

  playBtn.addEventListener('click', toggleMusic);
  bgmToggleBtn.addEventListener('click', toggleMusic);

  // 트랙 변경
  trackBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const selected = btn.dataset.track;
      if (selected === currentTrack && isPlaying) return;

      trackBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      currentTrack = selected;
      noteIndex = 0;

      const song = SONGS[currentTrack];
      trackTitle.textContent = song.title;
      trackDesc.textContent = song.desc;

      if (isPlaying) {
        if (noteTimeoutId) clearTimeout(noteTimeoutId);
        playSongLoop();
      }
    });
  });

  // 볼륨 조절
  volumeSlider.addEventListener('input', (e) => {
    const val = parseFloat(e.target.value);
    if (masterGain && audioCtx) {
      masterGain.gain.setValueAtTime(val, audioCtx.currentTime);
    }
  });
}

/* ==========================================================================
   8. Holiday Card Generator & Canvas PNG Exporter
   ========================================================================== */
function initCardGenerator() {
  const toInput = document.getElementById('card-to');
  const msgInput = document.getElementById('card-message');
  const fromInput = document.getElementById('card-from');

  const previewTo = document.getElementById('preview-to');
  const previewMsg = document.getElementById('preview-msg');
  const previewFrom = document.getElementById('preview-from');
  const cardDisplay = document.getElementById('holiday-card-display');

  const themeBtns = document.querySelectorAll('.theme-btn');
  const downloadBtn = document.getElementById('download-card-btn');
  const copyBtn = document.getElementById('copy-card-text-btn');

  let currentTheme = 'classic-red';

  function updatePreview() {
    previewTo.textContent = `To. ${toInput.value || '소중한 분에게'}`;
    previewMsg.textContent = msgInput.value || '메리 크리스마스 & 해피 뉴 이어!';
    previewFrom.textContent = `From. ${fromInput.value || '친구'}`;
  }

  toInput.addEventListener('input', updatePreview);
  msgInput.addEventListener('input', updatePreview);
  fromInput.addEventListener('input', updatePreview);

  // 테마 선택
  themeBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      themeBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentTheme = btn.dataset.theme;

      cardDisplay.className = `holiday-card-canvas-wrap theme-${currentTheme}`;
    });
  });

  // 텍스트 복사 버튼
  copyBtn.addEventListener('click', () => {
    const fullText = `[🎄 크리스마스 엽서]\nTo. ${toInput.value}\n\n${msgInput.value}\n\nFrom. ${fromInput.value}\n★ Merry Christmas & Happy New Year! ★`;
    navigator.clipboard
      .writeText(fullText)
      .then(() => {
        showToast('📋 카드 메시지가 클립보드에 복사되었습니다!');
      })
      .catch(() => {
        showToast('복사에 실패했습니다. 수동으로 복사해주세요.');
      });
  });

  // 순수 HTML5 Canvas를 이용한 고해상도 카드 PNG 이미지 다운로드
  downloadBtn.addEventListener('click', () => {
    const canvas = document.createElement('canvas');
    const width = 800;
    const height = 1000;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // 테마별 색상 팔레트
    const themePalettes = {
      'classic-red': { bgTop: '#b7094c', bgBottom: '#3e0018', border: '#ffd166', textGold: '#ffe6a7', body: '#ffffff' },
      'forest-green': { bgTop: '#2d6a4f', bgBottom: '#081c15', border: '#ffd166', textGold: '#b7e4c7', body: '#ffffff' },
      'midnight-blue': { bgTop: '#1d3557', bgBottom: '#030a17', border: '#a8dadc', textGold: '#f1faee', body: '#ffffff' },
      'champagne-gold': { bgTop: '#7f5539', bgBottom: '#241003', border: '#ffe6a7', textGold: '#faedcd', body: '#ffffff' },
    };

    const palette = themePalettes[currentTheme] || themePalettes['classic-red'];

    // 1. 배경 그라디언트
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, palette.bgTop);
    grad.addColorStop(1, palette.bgBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // 2. 눈꽃 배경 파티클
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    for (let i = 0; i < 40; i++) {
      const rx = Math.random() * width;
      const ry = Math.random() * height;
      const r = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }

    // 3. 골드 테두리 프레임
    ctx.strokeStyle = palette.border;
    ctx.lineWidth = 10;
    ctx.strokeRect(30, 30, width - 60, height - 60);

    // 내부 점선 프레임
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.lineWidth = 3;
    ctx.setLineDash([10, 8]);
    ctx.strokeRect(50, 50, width - 100, height - 100);
    ctx.setLineDash([]);

    // 4. 모서리 눈송이 이모지
    ctx.font = '32px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('❄️', 70, 70);
    ctx.fillText('❄️', width - 70, 70);
    ctx.fillText('❄️', 70, height - 70);
    ctx.fillText('❄️', width - 70, height - 70);

    // 5. 상단 헤더 배지
    ctx.fillStyle = palette.border;
    ctx.font = 'bold 22px sans-serif';
    ctx.fillText('★ MERRY CHRISTMAS & HAPPY NEW YEAR ★', width / 2, 130);

    // 6. 메인 일러스트 이모지
    ctx.font = '64px sans-serif';
    ctx.fillText('🎅 ✨ 🦌', width / 2, 230);

    // 7. 받는 사람 (To)
    ctx.textAlign = 'left';
    ctx.fillStyle = palette.border;
    ctx.font = 'bold 30px sans-serif';
    ctx.fillText(`To. ${toInput.value || '소중한 분에게'}`, 100, 330);

    // 8. 본문 메시지 (자동 줄바꿈 렌더링)
    ctx.fillStyle = palette.body;
    ctx.font = '24px sans-serif';
    const message = msgInput.value || '메리 크리스마스 & 해피 뉴 이어!';
    const maxWidth = width - 200;
    const lineHeight = 42;
    let lineY = 410;

    const words = message.split('');
    let currentLine = '';

    for (let n = 0; n < words.length; n++) {
      if (words[n] === '\n') {
        ctx.fillText(currentLine, 100, lineY);
        currentLine = '';
        lineY += lineHeight;
        continue;
      }
      const testLine = currentLine + words[n];
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && n > 0) {
        ctx.fillText(currentLine, 100, lineY);
        currentLine = words[n];
        lineY += lineHeight;
      } else {
        currentLine = testLine;
      }
    }
    ctx.fillText(currentLine, 100, lineY);

    // 9. 보내는 사람 (From)
    ctx.textAlign = 'right';
    ctx.fillStyle = palette.textGold;
    ctx.font = 'italic bold 28px sans-serif';
    ctx.fillText(`From. ${fromInput.value || '친구'}`, width - 100, 760);

    // 10. 하단 데코
    ctx.textAlign = 'center';
    ctx.font = '36px sans-serif';
    ctx.fillText('🔔 🕯️ 🎁 🌲 ⛄', width / 2, 860);

    // 다운로드 실행
    const link = document.createElement('a');
    link.download = `Christmas-Card-${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    triggerConfettiEffect(window.innerWidth / 2, window.innerHeight / 2, 70);
    showToast('🎉 크리스마스 엽서가 이미지로 저장되었습니다!');
  });
}

/* ==========================================================================
   9. Holiday Quiz (크리스마스 캐릭터 성향 테스트)
   ========================================================================== */
function initHolidayQuiz() {
  const questions = [
    {
      q: '크리스마스 이브 저녁, 당신이 가장 보내고 싶은 시간은?',
      options: [
        { text: '따뜻한 모닥불 앞에서 소중한 사람들과 선물 나누기', char: 'santa', emoji: '🎁' },
        { text: '화려한 불빛 아래 번화가나 파티에서 신나게 뛰어놀기', char: 'rudolph', emoji: '🎉' },
        { text: '조용히 눈 내리는 창밖을 보며 따뜻한 차와 책/음악 즐기기', char: 'snowman', emoji: '☕' },
        { text: '달콤한 디저트와 함께 맛있는 크리스마스 만찬 요리하기', char: 'cookie', emoji: '🍰' },
      ],
    },
    {
      q: '겨울철 내가 가장 좋아하는 디저트나 간식은?',
      options: [
        { text: '달콤바삭한 시나몬 진저브레드 쿠키와 달콤한 빵', char: 'cookie', emoji: '🍪' },
        { text: '호호 불며 나눠먹는 따끈한 붕어빵과 군고구마', char: 'santa', emoji: '🍠' },
        { text: '톡톡 터지는 탄산 샴페인과 반짝이는 딸기 타르트', char: 'rudolph', emoji: '🍓' },
        { text: '폭신폭신 마시멜로를 듬뿍 올린 진한 핫초콜릿', char: 'snowman', emoji: '🍫' },
      ],
    },
    {
      q: '만약 눈이 펑펑 오는 화이트 크리스마스가 된다면?',
      options: [
        { text: '제일 먼저 밖으로 뛰어나가 눈사람 만들고 눈싸움하기!', char: 'rudolph', emoji: '⛄' },
        { text: '사람들이 미끄러지지 않게 집 앞 눈을 부지런히 쓸어두기', char: 'santa', emoji: '🧹' },
        { text: '포근한 담요 속에서 눈 내리는 풍경을 감상하며 멍때리기', char: 'snowman', emoji: '❄️' },
        { text: '예쁜 눈꽃을 사진으로 찍어 친구들에게 자랑하기', char: 'cookie', emoji: '📸' },
      ],
    },
  ];

  const CHARACTERS = {
    santa: {
      avatar: '🎅',
      name: '인자한 마음의 리더 산타클로스',
      title: '"모두에게 따뜻한 사랑과 온기를 선물하는 든든한 캡틴"',
      desc: '주변 사람들을 챙기고 기쁨을 주는 일에 진심인 당신! 넉넉한 포용력과 듬직함으로 모임이나 팀에서 언제나 중심을 잡아주는 산타 같은 존재입니다.',
      bestMatch: '🦌 루돌프 (함께하면 지치지 않는 최고의 콤비)',
      gift: '포근한 수면양말과 고급 캐시미어 머플러',
    },
    rudolph: {
      avatar: '🦌',
      name: '에너자이저 분위기 메이커 루돌프',
      title: '"어둠 속에서도 길을 밝히는 유쾌한 열정둥이"',
      desc: '밝고 긍정적인 에너지로 언제 어디서나 사람들에게 웃음을 주는 당신! 특유의 호기심과 친화력으로 분위기를 한층 띄우는 크리스마스의 일등공신입니다.',
      bestMatch: '🎅 산타클로스 (내 열정을 알아주고 밀어주는 멘토)',
      gift: '화려한 파티 조명과 블루투스 스피커',
    },
    snowman: {
      avatar: '⛄',
      name: '낭만 감성파 눈사람 프로스티',
      title: '"눈꽃처럼 맑고 순수한 감성을 지닌 힐러"',
      desc: '조용하지만 깊은 배려심을 가진 당신! 화려한 것보다는 소박하고 진실한 순간을 사랑하며, 함께 있는 것만으로도 상대방의 마음을 편안하게 녹여줍니다.',
      bestMatch: '🍪 진저쿠키 (달콤한 대화로 온기를 전해주는 짝궁)',
      gift: '향기로운 캔들과 겨울 오르골 무드등',
    },
    cookie: {
      avatar: '🍪',
      name: '달콤 유쾌한 센스쟁이 진저브레드',
      title: '"센스 만점 아이디어로 일상을 달콤하게 만드는 요정"',
      desc: '감각적인 센스와 재치 넘치는 유머로 사람들의 마음을 사로잡는 당신! 아기자기한 선물과 맛있는 디저트를 나누며 세상을 달콤하게 물들입니다.',
      bestMatch: '⛄ 눈사람 (내 유쾌함을 가장 편안하게 받아주는 친구)',
      gift: '홈베이킹 키트와 크리스마스 한정판 마카롱 세트',
    },
  };

  let currentStep = 0;
  const scores = { santa: 0, rudolph: 0, snowman: 0, cookie: 0 };

  const questionScreen = document.getElementById('quiz-question-screen');
  const resultScreen = document.getElementById('quiz-result-screen');
  const stepLabel = document.getElementById('quiz-step-label');
  const progressFill = document.getElementById('quiz-progress-fill');
  const qTitle = document.getElementById('quiz-question-title');
  const optionsList = document.getElementById('quiz-options-list');

  const resultAvatar = document.getElementById('result-avatar');
  const resultName = document.getElementById('result-name');
  const resultSubtitle = document.getElementById('result-subtitle');
  const resultDesc = document.getElementById('result-desc');
  const resultBestMatch = document.getElementById('result-best-match');
  const resultGift = document.getElementById('result-gift');
  const retryBtn = document.getElementById('retry-quiz-btn');
  const shareBtn = document.getElementById('share-quiz-btn');

  function renderQuestion(idx) {
    const q = questions[idx];
    stepLabel.textContent = `질문 ${idx + 1} / ${questions.length}`;
    progressFill.style.width = `${((idx + 1) / questions.length) * 100}%`;
    qTitle.textContent = q.q;

    optionsList.innerHTML = '';
    q.options.forEach((opt) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'quiz-option-btn';
      btn.innerHTML = `<span class="option-emoji">${opt.emoji}</span> <span>${opt.text}</span>`;
      btn.addEventListener('click', () => {
        scores[opt.char]++;
        if (currentStep < questions.length - 1) {
          currentStep++;
          renderQuestion(currentStep);
        } else {
          showResult();
        }
      });
      optionsList.appendChild(btn);
    });
  }

  function showResult() {
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    let highestChar = 'santa';
    let highestScore = -1;
    for (const key in scores) {
      if (scores[key] > highestScore) {
        highestScore = scores[key];
        highestChar = key;
      }
    }

    const res = CHARACTERS[highestChar];
    resultAvatar.textContent = res.avatar;
    resultName.textContent = res.name;
    resultSubtitle.textContent = res.title;
    resultDesc.textContent = res.desc;
    resultBestMatch.textContent = res.bestMatch;
    resultGift.textContent = res.gift;

    triggerConfettiEffect(window.innerWidth / 2, window.innerHeight / 2, 100);
  }

  retryBtn.addEventListener('click', () => {
    currentStep = 0;
    for (const key in scores) scores[key] = 0;
    resultScreen.classList.add('hidden');
    questionScreen.classList.remove('hidden');
    renderQuestion(0);
  });

  shareBtn.addEventListener('click', () => {
    const text = `🎄 나의 크리스마스 캐릭터 성향 테스트 결과: [${resultName.textContent}]!\n"${resultSubtitle.textContent}"\n모두 행복한 메리 크리스마스 보내세요! ✨`;
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showToast('📢 결과 텍스트가 복사되었습니다!');
      })
      .catch(() => {
        showToast('복사에 실패했습니다.');
      });
  });

  renderQuestion(0);
}

/* ==========================================================================
   10. Toast Notification & Back to top
   ========================================================================== */
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2800);
}

function initBackToTop() {
  const topBtn = document.getElementById('back-to-top');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   11. Dark & Light (White) Theme Switcher
   ========================================================================== */
function initThemeToggle() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const iconEl = themeBtn.querySelector('.theme-icon');
  const textEl = themeBtn.querySelector('.theme-text');

  // 저장된 테마 또는 기본 다크
  const currentTheme = localStorage.getItem('christmas_theme') || 'dark';
  applyThemeUI(currentTheme);

  themeBtn.addEventListener('click', () => {
    const active = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = active === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', nextTheme);
    localStorage.setItem('christmas_theme', nextTheme);
    applyThemeUI(nextTheme);

    showToast(nextTheme === 'light' ? '☀️ 화사한 화이트 크리스마스 모드입니다!' : '🌙 포근한 밤하늘 다크 모드입니다!');
  });

  function applyThemeUI(theme) {
    if (theme === 'light') {
      if (iconEl) iconEl.textContent = '☀️';
      if (textEl) textEl.textContent = '화이트';
      themeBtn.title = '다크 모드로 전환';
    } else {
      if (iconEl) iconEl.textContent = '🌙';
      if (textEl) textEl.textContent = '다크';
      themeBtn.title = '화이트 모드로 전환';
    }
  }
}


