// ===== 공용/데이터 모듈을 불러옵니다 =========================================
import { SITE_MAP } from './data/site_map.js'; // 메뉴 구조(대분류/중분류) 데이터입니다
import { PAGE_CONTENT, FAQ, NOTICES } from './data/content.js'; // 일반 콘텐츠/FAQ/공지 데이터입니다
import { renderEstimate, renderFAQ, renderNotice } from './components/pages.js'; // 특수 페이지 렌더 함수입니다
import { initTopBar } from '/menu/js/topnav.js'; // ★ 상단(로고/드롭다운/언어) 공용 스크립트입니다
import { renderGreeting } from './components/greeting.js';  // 인사말 전용 컴포넌트를 가져와요.
import { GREETING } from './data/content.js'; // 인사말에 쓸 데이터 묶음(GREETING)을 가져와요.

// ===== 편의 함수들입니다 =======================================================
const $ = (s)=>document.querySelector(s); // 선택자 문자열로 요소 하나를 찾아옵니다
const toHash = (code)=>`#/${code}`; // 파일 코드를 해시 라우팅 주소로 바꿉니다(예: #/2-1_biz_electric)
const currentCode = ()=>location.hash.replace(/^#\//,'') || '1-1_intro_greeting'; // 현재 해시에서 코드만 뽑고 기본값을 정합니다
const findGroupKey = (code)=>({ // 코드의 첫 숫자를 기반으로 대분류 키를 계산합니다
  '1':'1_intro','2':'2_biz','3':'3_work','4':'4_manage',
  '5':'5_job','6':'6_data','7':'7_ask','8':'8_notice'
}[code.split('_')[0].split('-')[0]]); // "3-1_work_electric_eng" → "3" → "3_work" 형태로 변환합니다

// ===== (상단 네비게이션은 topnav.js가 담당합니다 — 중복 제거) ================
// ★ 이전에 여기 있던 buildTopNav / wireLangButtons 함수는 삭제했습니다
//   → 이제 상단은 initTopBar() 한 줄로 공통 초기화합니다

// ===== 왼쪽 사이드 메뉴를 만듭니다 ===========================================
function buildSideNav(groupKey, code){ // 대분류 키와 현재 코드(페이지 식별자)를 받습니다
  const side = $('#sideNav'); // 왼쪽 사이드 컨테이너를 찾습니다
  side.innerHTML = '<h3>메뉴</h3>'; // "메뉴" 제목을 먼저 넣습니다
  const list = SITE_MAP.find(g=>g.key===groupKey)?.items || []; // 해당 대분류의 중분류 목록을 찾습니다
  list.forEach(it=>{ // 각 중분류 항목을 링크로 만듭니다
    const a = document.createElement('a'); // 링크 요소를 만듭니다
    a.href = toHash(it.code); // 해시 라우팅 주소를 넣습니다(예: #/2-1_biz_electric)
    a.textContent = it.title; // 항목 이름을 넣습니다
    if(it.code===code) a.classList.add('active'); // 현재 페이지인 경우 강조 표시합니다
    side.appendChild(a); // 링크를 사이드바에 붙입니다
  }); // 항목 반복 끝입니다
} // buildSideNav 함수 끝입니다

// ===== 현재 위치(빵부스러기)를 만듭니다 ======================================
function crumbs(groupKey, code){ // 현재 대분류와 코드로 표시 문자열을 만듭니다
  const group = SITE_MAP.find(g=>g.key===groupKey); // 대분류 객체를 찾습니다
  const item = group?.items.find(i=>i.code===code); // 현재 중분류 항목을 찾습니다
  return `<div class="crumbs">${group?.title || ''} · ${item?.title || code}</div>`; // "대분류 · 중분류" 형태의 HTML을 돌려줍니다
} // crumbs 함수 끝입니다

// ===== 일반 콘텐츠 페이지(특수 기능 없는 페이지)를 렌더링합니다 ==============
function renderGeneric(code){ // 코드로 일반 페이지 내용을 구성합니다
  const data = PAGE_CONTENT[code]; // 코드에 해당하는 데이터 덩어리를 찾습니다
  const title = data?.title || '내용 준비 중'; // 제목(없으면 기본 문구)
  const paras = (data?.paragraphs || ['이 페이지의 상세 내용은 준비 중입니다.']) // 문단 목록(없으면 기본 안내)
    .map(p=>`<p style="color:var(--muted); margin-bottom:12px;">${p}</p>`) // 각 문단을 <p>로 감쌉니다
    .join(''); // 하나의 문자열로 합칩니다
  return `<h2 style="font-size:22px; margin:6px 0 12px 0;">${title}</h2>${paras}`; // 제목 + 문단 HTML을 반환합니다
} // renderGeneric 함수 끝입니다

// ===== 코드별로 어떤 템플릿을 쓸지 결정합니다 ================================
function getTemplateFor(code){ // 코드에 맞는 렌더 함수를 선택합니다
  if(code==='7-1_ask_estimate') return renderEstimate(); // 견적/문의 폼 페이지입니다
  if(code==='7-2_ask_faq')      return renderFAQ(FAQ); // FAQ 리스트 페이지입니다
  if(code==='8-1_notice_board') return renderNotice(NOTICES); // 공지사항 표 페이지입니다
  if(code === '1-1_intro_greeting') return renderGreeting(GREETING); // "회사소개 > 인사말" 코드가 들어오면 인사말 전용 화면을 그려요.
  return renderGeneric(code); // 위에 없는 코드는 일반 페이지로 렌더합니다
} // getTemplateFor 함수 끝입니다

// ===== 본문 영역을 실제로 그립니다 ==========================================
function renderPage(code){ // 현재 코드에 맞춰 오른쪽 본문을 교체합니다
  const groupKey = findGroupKey(code); // 대분류 키를 구합니다
  buildSideNav(groupKey, code); // 왼쪽 사이드 메뉴를 재구성합니다
  const content = $('#content'); // 본문 컨테이너를 찾습니다
  content.innerHTML = ''; // 이전 내용을 비웁니다
  const box = document.createElement('div'); // 새 콘텐츠 상자 요소를 만듭니다
  box.className = 'fade-enter'; // 진입 애니메이션 시작 클래스를 붙입니다
  box.innerHTML = crumbs(groupKey, code) + getTemplateFor(code); // 빵부스러기 + 실제 콘텐츠를 채웁니다
  content.appendChild(box); // 본문 컨테이너에 붙입니다
  requestAnimationFrame(()=>box.classList.add('fade-enter-active')); // 다음 프레임에 부드럽게 나타나게 합니다
} // renderPage 함수 끝입니다

// ===== KPI 숫자를 0 → 목표값으로 올라가게 합니다 ============================
function animateKPIs(){ // 히어로 섹션의 숫자 애니메이션입니다
  document.querySelectorAll('.kpi-num').forEach(el=>{ // 모든 숫자 요소를 순회합니다
    const target = parseInt(el.dataset.count||'0',10); // 목표 숫자를 데이터 속성에서 읽습니다
    const dur = 900; // 애니메이션 총 시간(밀리초)입니다
    let start=null; // 시작 시각을 기록할 변수를 만듭니다
    function step(t){ // 프레임마다 호출되는 콜백입니다
      if(!start) start=t; // 첫 프레임이면 시작 시각을 기록합니다
      const p = Math.min((t-start)/dur, 1); // 진행률(0~1)을 계산합니다
      el.textContent = Math.floor(target*p).toLocaleString(); // 진행률만큼 올린 값을 표시합니다(천단위 구분)
      if(p<1) requestAnimationFrame(step); // 아직 끝이 아니면 다음 프레임을 요청합니다
    } // 한 프레임 처리 끝입니다
    requestAnimationFrame(step); // 애니메이션을 시작합니다
  }); // 숫자 요소 반복 끝입니다
} // animateKPIs 함수 끝입니다

// ===== 하단 뉴스/공지 스트립을 채웁니다 =====================================
function renderNewsStrip(){ // 최근 공지 몇 개를 간단히 보여줍니다
  const box = $('#newsStrip'); // 스트립 컨테이너를 찾습니다
  if(!box) return; // 없으면 아무 것도 하지 않습니다
  box.innerHTML = ''; // 이전 내용을 지웁니다
  NOTICES.slice(0,4).forEach(n=>{ // 최근 4개만 뽑아서 보여줍니다
    const a = document.createElement('a'); // 공지 링크 요소입니다
    a.className = 'news-item'; // 공지 박스 스타일을 붙입니다
    a.href = '/menu/#/8-1_notice_board'; // ★ 절대경로로 고정해 어느 경로에서도 일관되게 동작하게 합니다
    a.innerHTML = `
      <span class="badge">NEW</span>     <!-- 새 글 배지입니다 -->
      <span>${n.title}</span>            <!-- 공지 제목입니다 -->
      <span style="color:var(--muted);font-size:12px;">${n.date}</span> <!-- 날짜입니다 -->
    `.trim(); // 보기 좋게 줄을 정리합니다
    box.appendChild(a); // 컨테이너에 붙입니다
  }); // 공지 반복 끝입니다
} // renderNewsStrip 함수 끝입니다

// ===== 해시(주소) 변경 시 본문을 갱신합니다 ================================
window.addEventListener('hashchange', ()=>renderPage(currentCode())); // #/코드가 바뀌면 그 코드로 내용을 다시 렌더합니다

// ===== 초기 구동(한 번만) =====================================================
function init(){ // 페이지가 처음 로드될 때 한 번 실행합니다
  initTopBar(); // ★ 공용 상단(로고/드롭다운/언어 버튼)을 초기화합니다
  animateKPIs(); // 히어로 숫자 애니메이션을 시작합니다
  renderNewsStrip(); // 하단 공지 스트립을 채웁니다
  // 아래는 (있을 수도 있는) 히어로 내 "빠른 이동" 버튼들에 해시를 연결하는 보조 코드입니다
  const go = (id, code)=>{ // 버튼 id와 이동할 코드 문자열을 받아 연결합니다
    const el = document.getElementById(id); // 해당 id 요소를 찾습니다
    if(el) el.onclick = ()=>location.hash = toHash(code); // 클릭 시 해당 해시로 이동시킵니다
  }; // 보조 연결 함수의 끝입니다
  go('goIntro','1-1_intro_greeting'); // (선택) 회사소개로 이동 버튼 id 연결입니다
  go('goBiz','2-1_biz_electric'); // (선택) 사업소개로 이동 버튼 id 연결입니다
  go('goWork','3-1_work_electric_eng'); // (선택) 주요실적으로 이동 버튼 id 연결입니다
  go('goAsk','7-1_ask_estimate'); // (선택) 견적/문의로 이동 버튼 id 연결입니다
  renderPage(currentCode()); // 현재 해시에 맞는 본문을 최초 1회 렌더합니다
} // init 함수 끝입니다

// ===== 문서가 준비되면 init을 실행합니다 =====================================
window.addEventListener('DOMContentLoaded', init); // DOM이 준비되는 즉시 초기화를 수행합니다
