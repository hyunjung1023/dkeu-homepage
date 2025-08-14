// ===== 모듈 가져오기: 데이터와 컴포넌트를 불러옵니다 =====
import { SITE_MAP } from './data/site_map.js'; // 메뉴와 파일 코드를 담은 데이터입니다
import { PAGE_CONTENT, FAQ, NOTICES } from './data/content.js'; // 각 페이지의 텍스트와 리스트입니다
import { renderEstimate, renderFAQ, renderNotice } from './components/pages.js'; // 특별 페이지를 그리는 함수들입니다

// ===== 유틸리티: 주소 해시와 공통 함수들입니다 =====
const $ = (sel) => document.querySelector(sel); // 선택자를 받아 한 요소를 찾는 간단한 도우미입니다
const toHash = (code) => `#/${code}`; // 파일 코드를 주소의 해시 형식으로 바꿉니다
const currentCode = () => location.hash.replace(/^#\//,'') || '1-1_intro_greeting'; // 현재 주소에서 코드를 꺼내고, 없으면 기본값을 줍니다
const findGroupKey = (code) => ({'1':'1_intro','2':'2_biz','3':'3_work','4':'4_manage','5':'5_job','6':'6_data','7':'7_ask','8':'8_notice'})[code.split('_')[0].split('-')[0]]; // 코드 앞 숫자로 대분류 키를 찾습니다

// ===== 상단 네비게이션을 만듭니다 =====
function buildTopNav() { // 상단 메뉴를 화면에 그리는 함수입니다
  const nav = $('#topNav'); // 상단 네비게이션 영역을 찾습니다
  nav.innerHTML = ''; // 혹시 이전 내용이 있으면 지웁니다
  SITE_MAP.forEach(group => { // 대분류를 하나씩 꺼냅니다
    const btn = document.createElement('button'); // 버튼 요소를 만듭니다
    btn.className = 'menu-btn'; // 버튼에 스타일 이름을 붙입니다
    btn.textContent = group.title; // 버튼에 대분류 이름을 적습니다
    const dd = document.createElement('div'); // 드롭다운 상자를 만듭니다
    dd.className = 'dropdown'; // 드롭다운 스타일을 붙입니다
    group.items.forEach(it => { // 중분류들을 하나씩 처리합니다
      const a = document.createElement('a'); // 링크 요소를 만듭니다
      a.href = toHash(it.code); // 클릭하면 해당 페이지로 이동하도록 주소를 줍니다
      a.textContent = it.title; // 링크에 항목 이름을 적습니다
      dd.appendChild(a); // 드롭다운 상자에 링크를 넣습니다
    }); // 중분류 처리의 끝입니다
    btn.appendChild(dd); // 버튼 아래에 드롭다운을 붙입니다
    nav.appendChild(btn); // 상단 네비게이션에 버튼을 추가합니다
  }); // 대분류 처리의 끝입니다
} // 상단 네비게이션 그리기 함수의 끝입니다

// ===== 왼쪽 사이드 메뉴를 만듭니다 =====
function buildSideNav(groupKey, code) { // 어느 대분류인지와 현재 코드를 받습니다
  const side = $('#sideNav'); // 사이드 영역을 찾습니다
  side.innerHTML = '<h3>메뉴</h3>'; // 제목을 먼저 넣습니다
  const list = SITE_MAP.find(g => g.key === groupKey)?.items || []; // 해당 대분류의 중분류 목록을 찾습니다
  list.forEach(it => { // 각 항목을 하나씩 처리합니다
    const a = document.createElement('a'); // 링크 요소를 만듭니다
    a.href = toHash(it.code); // 주소를 넣습니다
    a.textContent = it.title; // 보여줄 이름을 적습니다
    if (it.code === code) a.classList.add('active'); // 현재 페이지면 강조 표시를 합니다
    side.appendChild(a); // 사이드 영역에 링크를 붙입니다
  }); // 항목 처리의 끝입니다
} // 사이드 네비게이션 그리기 함수의 끝입니다

// ===== 현재 위치(빵부스러기)를 만들어 문자열로 돌려줍니다 =====
function crumbs(groupKey, code) { // 위치 정보를 받아 예쁜 글을 만듭니다
  const group = SITE_MAP.find(g => g.key === groupKey); // 대분류를 찾습니다
  const item = group?.items.find(i => i.code === code); // 중분류를 찾습니다
  return `<div class="crumbs">${group?.title || ''} · ${item?.title || code}</div>`; // 완성된 HTML 문자열을 줍니다
} // 빵부스러기 함수의 끝입니다

// ===== 공통 제목과 설명을 만드는 작은 템플릿입니다 =====
const prettyTitle = (t) => `<h2 style="font-size:22px; margin:6px 0 12px 0;">${t}</h2>`; // 큰 제목 상자입니다
const smallPara = (t) => `<p style="color:var(--muted); margin-bottom:12px;">${t}</p>`; // 설명 문장입니다

// ===== 일반 페이지(특수 기능이 없는 페이지)를 그립니다 =====
function renderGeneric(code) { // 코드에 맞는 일반 페이지를 만듭니다
  const data = PAGE_CONTENT[code]; // 데이터에서 내용을 꺼냅니다
  const title = data?.title || '내용 준비 중'; // 제목을 정합니다
  const paras = (data?.paragraphs || ['이 페이지의 상세 내용은 준비 중입니다.']).map(p => smallPara(p)).join(''); // 문단들을 합칩니다
  return `${prettyTitle(title)}${paras} 
    <div style="display:grid; gap:10px; grid-template-columns:repeat(auto-fill, minmax(220px, 1fr));"> 
      <div style="border:1px solid #e5e7eb; border-radius:12px; padding:12px;"> 
        <div style="font-weight:700; margin-bottom:6px;">관련 문서</div> 
        <div style="font-size:14px; color:var(--muted);">프로필, 인증서, 실적표 등 연결 예정</div> 
      </div> 
      <div style="border:1px solid #e5e7eb; border-radius:12px; padding:12px;"> 
        <div style="font-weight:700; margin-bottom:6px;">담당 부서</div> 
        <div style="font-size:14px; color:var(--muted);">해당 부서 연락처 연결 예정</div> 
      </div> 
      <div style="border:1px solid #e5e7eb; border-radius:12px; padding:12px;"> 
        <div style="font-weight:700; margin-bottom:6px;">다운로드</div> 
        <div style="font-size:14px; color:var(--muted);">소개서, 지명원, 실적집 제공 예정</div> 
      </div> 
    </div>`; // 공통 카드 3개를 보여줍니다
} // 일반 페이지 렌더러의 끝입니다

// ===== 코드에 따라 어떤 템플릿을 쓸지 고르는 함수입니다 =====
function getTemplateFor(code) { // 코드별로 분기합니다
  if (code === '7-1_ask_estimate') return renderEstimate(); // 견적 페이지일 때는 견적 폼을 그립니다
  if (code === '7-2_ask_faq') return renderFAQ(FAQ); // FAQ 페이지일 때는 질문 목록을 그립니다
  if (code === '8-1_notice_board') return renderNotice(NOTICES); // 공지사항 페이지일 때는 공지 표를 그립니다
  return renderGeneric(code); // 나머지는 일반 페이지를 사용합니다
} // 템플릿 선택 함수의 끝입니다

// ===== 실제로 화면을 그리는 함수입니다 =====
function renderPage(code) { // 코드에 맞춰 전체를 갱신합니다
  const groupKey = findGroupKey(code); // 대분류 키를 구합니다
  buildSideNav(groupKey, code); // 왼쪽 사이드 메뉴를 다시 만듭니다
  const content = document.getElementById('content'); // 콘텐츠 영역을 찾습니다
  content.innerHTML = ''; // 이전 내용을 지웁니다
  const box = document.createElement('div'); // 새 박스를 만듭니다
  box.className = 'fade-enter'; // 전환 시작 모양을 넣습니다
  box.innerHTML = crumbs(groupKey, code) + getTemplateFor(code); // 위치 표기와 본문을 합쳐 넣습니다
  content.appendChild(box); // 화면에 박스를 붙입니다
  requestAnimationFrame(() => box.classList.add('fade-enter-active')); // 다음 순간에 전환을 시작합니다
} // 화면 그리기 함수의 끝입니다

// ===== 주소가 바뀔 때 화면을 다시 그리도록 이벤트를 겁니다 =====
window.addEventListener('hashchange', () => renderPage(currentCode())); // 해시가 바뀌면 다시 그립니다

// ===== 첫 로딩 때 한 번 실행하는 초기화입니다 =====
function init() { // 처음 시작할 준비를 합니다
  buildTopNav(); // 상단 네비게이션을 만듭니다
  document.getElementById('goIntro').onclick = () => location.hash = toHash('1-1_intro_greeting'); // 회사소개로 이동 버튼입니다
  document.getElementById('goBiz').onclick   = () => location.hash = toHash('2-1_biz_electric'); // 사업소개로 이동 버튼입니다
  document.getElementById('goWork').onclick  = () => location.hash = toHash('3-1_work_electric_eng'); // 주요실적으로 이동 버튼입니다
  document.getElementById('goAsk').onclick   = () => location.hash = toHash('7-1_ask_estimate'); // 견적/문의로 이동 버튼입니다
  renderPage(currentCode()); // 현재 주소의 코드로 첫 화면을 만듭니다
} // 초기화 함수의 끝입니다

// ===== 문서가 준비되면 초기화를 실행합니다 =====
window.addEventListener('DOMContentLoaded', init); // 페이지가 준비되면 init을 부릅니다
