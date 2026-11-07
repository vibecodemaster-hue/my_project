# 🎅 Merry Christmas & Happy Holidays ❄️
> 따뜻한 온기와 반짝이는 설렘이 가득한 **인터랙티브 크리스마스 원페이지 웹사이트**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![No_Dependency](https://img.shields.io/badge/Dependencies-Zero-brightgreen?style=flat-square)

---

## ✨ 프로젝트 소개
별도의 복잡한 설치나 외부 라이브러리 없이, 순수 웹 기술(Vanilla HTML/CSS/JavaScript)만으로 구현된 완성도 높은 감성 크리스마스 원페이지 웹사이트입니다. 브라우저에서 `index.html`을 실행하는 것만으로 오르골 캐롤 연주, 눈 내리는 효과, 소원 트리, 선물 상자, 카드 다운로드 등의 모든 기능을 즉시 체험할 수 있습니다.

---

## 🎁 주요 핵심 기능

### 1. ❄️ 인터랙티브 스노우폴 애니메이션 (HTML5 Canvas)
- 캔버스 파티클 엔진을 통해 3단계 깊이감의 눈송이가 부드럽게 화면을 채웁니다.
- 사용자의 마우스 움직임 방향에 따라 바람 효과가 작용하여 눈송이가 자연스럽게 흩날립니다.

### 2. 💡 반짝이는 전구 스트링 (Fairy Lights) & 🌓 다크/화이트 모드 지원
- 화면 상단에 크리스마스 무드의 컬러 전구 스트링이 교차 점멸하여 축제 분위기를 극대화합니다.
- **다크 모드 (포근한 밤하늘 톤)** & **화이트 모드 (순백의 설원 톤)**를 자유롭게 전환할 수 있습니다.
- 사용자의 테마 설정을 `LocalStorage`에 저장하여 재방문 시에도 선택한 모드를 그대로 유지합니다.

### 3. ⏰ 실시간 크리스마스 D-Day 카운트다운
- 12월 25일 00:00:00를 향해 남은 일, 시간, 분, 초를 1초 단위로 실시간 표시합니다.
- 당일 및 연도 변경을 자동으로 감지합니다.

### 4. 🌲 모두의 소원 트리 (Interactive Wishing Tree)
- 원하는 오너먼트 모양(방울, 별, 사탕, 종, 쿠키)과 색상을 골라 소원을 작성하면 트리의 빈 가지에 즉시 매달립니다.
- 매달린 오너먼트를 클릭하면 소원 카드가 팝업됩니다.
- `LocalStorage`를 지원하여 브라우저를 닫거나 새로고침해도 소원이 안전하게 유지됩니다.

### 5. 🎁 산타의 시크릿 럭키 선물 상자 (Mystery Gift Box)
- 6개의 선물 상자 중 하나를 클릭하면 팡 터지는 폭죽(Confetti) 효과와 함께 특별한 크리스마스 선물이 열립니다.
  - 🎬 크리스마스 명작 영화 컬렉션 (*나 홀로 집에, 패딩턴 2, 클라우스*)
  - ☕ 힐링 핫초콜릿 & 뱅쇼 레시피
  - 🌟 산타의 연말 포춘 & 응원 덕담
  - 💌 소중한 사람에게 전하는 안부 미션
  - 🍪 진저쿠키의 달콤한 베이킹 스토리
  - 🎟️ 무제한 자유 휴식 쿠폰

### 6. 🎶 Web Audio API 캐롤 오르골 주크박스
- 외부 mp3 파일 없이 **브라우저 내장 오디오 신디사이저**로 맑고 청아한 오르골/차임 벨 사운드를 직접 합성하여 연주합니다.
- **수록곡 4곡**:
  1. *Jingle Bells (징글벨)*
  2. *We Wish You A Merry Christmas*
  3. *Silent Night (고요한 밤 거룩한 밤)*
  4. *Joy to the World (기쁘다 구주 오셨네)*
- 턴테이블 회전 애니메이션, 곡 선택, 볼륨 슬라이더, 상단 BGM 토글 바 지원.

### 7. 💌 나만의 크리스마스 엽서 제작기 (PNG 다운로드)
- 받는 사람, 전할 메시지, 보내는 사람 및 4가지 테마(클래식 레드, 포레스트 그린, 윈터 나이트, 샴페인 골드) 선택.
- 실시간 카드 미리보기 제공.
- **[이미지(PNG)로 저장하기]**: 순수 Canvas 렌더러로 작성된 카드를 고해상도 PNG 이미지 파일로 즉시 다운로드.
- 클립보드 텍스트 복사 기능 지원.

### 8. 🔮 크리스마스 캐릭터 성향 테스트 (Holiday Quiz)
- 3가지 흥미로운 질문으로 알아보는 나의 크리스마스 캐릭터.
  - 🎅 인자한 리더 **산타클로스**
  - 🦌 에너자이저 분위기 메이커 **루돌프**
  - ⛄ 낭만 감성파 **눈사람 프로스티**
  - 🍪 달콤 센스쟁이 **진저브레드**
- 찰떡궁합 친구 추천, 선물 추천, 결과 공유 기능.

---

## 📁 디렉터리 구조

```
my_project/
├── index.html        # 시맨틱 마크업 및 전체 섹션 구조
├── style.css         # 글래스모피즘, 전구 애니메이션, 반응형 스타일
├── script.js         # 눈/폭죽 물리 엔진, Web Audio 캐롤, 소원 트리, 카드 생성기
└── README.md         # 프로젝트 안내 문서
```

---

## 🚀 실행 방법

1. 저장소를 클론하거나 다운로드합니다:
   ```bash
   git clone https://github.com/vibecodemaster-hue/my_project.git
   ```
2. 폴더 내 `index.html` 파일을 웹 브라우저(Chrome, Edge, Safari 등)에서 더블클릭하여 바로 실행합니다.
   - Node.js나 Python 등 별도의 웹 서버 설정 없이도 즉시 모든 기능이 동작합니다.

---

## 📱 브라우저 및 반응형 지원
- 데스크탑, 태블릿, 모바일 스마트폰 화면 크기에 맞춘 유연한 반응형 레이아웃
- 최신 웹 표준 준수 (Chrome, Safari, Firefox, Edge 완벽 호환)

---

## 🎅 라이선스 & 인사말
하늘에는 영광, 땅에는 평화! 따뜻하고 사랑 넘치는 행복한 크리스마스 보내세요! 🎄✨  
Crafted with warmth & holiday cheer for 2026.

