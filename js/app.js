// ===== 데이터와 컴포넌트를 불러옵니다 =====
import { SITE_MAP } from './data/site_map.js'; // 메뉴/파일코드 표입니다
import { PAGE_CONTENT, FAQ, NOTICES } from './data/content.js'; // 일반 텍스트·FAQ·공지 데이터입니다
import { renderEstimate, renderFAQ, renderNotice } from './components/pages.js'; // 특수 페이지 렌더러입니다

// ===== 편의 함수들입니다 =====
const $ = (s)=>document.querySelector(s); // 선택자를 넘기면 요소 하나를 찾아줍니다
const toHash = (code)=>`#/${code}`; // 파일코드를 주소 해시로 바꿔줍니다
const currentCode = ()=>location.hash.replace(/^#\//,'') || '1-1_intro_greeting'; // 현재 주소에서 코드만 뽑습니다
const findGroupKey = (code)=>({'1':'1_intro','2':'2_biz','3':'3_work','4':'4_manage','5':'5_job','6':'6_data','7':'7_ask','8':'8_notice'})[code.split('_')[0].split('-')[0]]; // 앞 숫자로 대분류 키를 구합니다

// ===== 상단 네비게이션을 만듭니다 =====
function buildTopNav(){ // 상단 메뉴(대분류/중분류)를 그립니다
  const nav = $('#topNav'); // 상단 네비게이션 박스입니다
  nav.innerHTML = ''; // 이전 내용을 지웁니다
  SITE_MAP.forEach(group=>{ // 대분류를 하나씩 처리합니다
    const btn = document.createElement('button'); // 버튼을 만듭니다
    btn.className = 'menu-btn'; // 버튼 모양을 적용합니다
    btn.textContent = group.title; // 대분류 이름을 씁니다
    const dd = document.createElement('div'); // 드롭다운 상자를 만듭니다
    dd.className = 'dropdown'; // 드롭다운 스타일을 적용합니다
    group.items.forEach(it=>{ // 중분류를 하나씩 넣습니다
      const a = document.createElement('a'); // 링크를 만듭니다
      a.href = toHash(it.code); // 클릭하면 해당 코드로 이동합니다
      a.textContent = it.title; // 항목 이름을 씁니다
      dd.appendChild(a); // 드롭다운에 붙입니다
    }); // 중분류 넣기 끝
    btn.appendChild(dd); // 버튼 밑에 드롭다운을 붙입니다
    nav.appendChild(btn); // 상단 네비게이션에 버튼을 추가합니다
  }); // 대분류 처리 끝
} // 상단 네비게이션 함수 끝

// ===== 왼쪽 사이드 메뉴를 만듭니다 =====
function buildSideNav(groupKey, code){ // 어느 대분류인지와 현재 코드를 받습니다
  const side = $('#sideNav'); // 사이드 박스입니다
  side.innerHTML = '<h3>메뉴</h3>'; // 제목을 먼저 넣습니다
  const list = SITE_MAP.find(g=>g.key===groupKey)?.items || []; // 중분류 목록을 찾습니다
  list.forEach(it=>{ // 각 항목을 링크로 만듭니다
    const a = document.createElement('a'); // 링크 요소입니다
    a.href = toHash(it.code); // 주소를 채웁니다
    a.textContent = it.title; // 글자를 채웁니다
    if(it.code===code) a.classList.add('active'); // 현재 페이지면 강조합니다
    side.appendChild(a); // 사이드에 붙입니다
  }); // 항목 반복 끝
} // 사이드 네비게이션 함수 끝

// ===== 현재 위치(빵부스러기)를 만듭니다 =====
function crumbs(groupKey, code){ // 위치 정보를 받아 글자를 만듭니다
  const group = SITE_MAP.find(g=>g.key===groupKey); // 대분류를 찾습니다
  const item = group?.items.find(i=>i.code===code); // 중분류를 찾습니다
  return `<div class="crumbs">${group?.title || ''} · ${item?.title || code}</div>`; // 보기 좋은 글자를 돌려줍니다
} // 빵부스러기 함수 끝

// ===== 일반 페이지(특수 기능 없음)를 그립니다 =====
function renderGeneric(code){ // 코드에 맞는 일반 페이지 템플릿입니다
  const data = PAGE_CONTENT[code]; // 데이터에서 내용을 꺼냅니다
  const title = data?.title || '내용 준비 중'; // 제목입니다
  const paras = (data?.paragraphs || ['이 페이지의 상세 내용은 준비 중입니다.']).map(p=>`<p style="color:var(--muted); margin-bottom:12px;">${p}</p>`).join(''); // 문단들을 합칩니다
  return `<h2 style="font-size:22px; margin:6px 0 12px 0;">${title}</h2>${paras}`; // 완성된 내용입니다
} // 일반 페이지 함수 끝

// ===== 코드별로 맞는 템플릿을 고릅니다 =====
function getTemplateFor(code){ // 어느 페이지 모양을 쓸지 결정합니다
  if(code==='7-1_ask_estimate') return renderEstimate(); // 견적 문의 폼입니다
  if(code==='7-2_ask_faq') return renderFAQ(FAQ); // FAQ 목록입니다
  if(code==='8-1_notice_board') return renderNotice(NOTICES); // 공지 표입니다
  return renderGeneric(code); // 기본은 일반 페이지입니다
} // 템플릿 선택 함수 끝

// ===== 화면을 실제로 그립니다 =====
function renderPage(code){ // 코드에 맞춰 본문을 바꿉니다
  const groupKey = findGroupKey(code); // 대분류 키입니다
  buildSideNav(groupKey, code); // 왼쪽 메뉴를 갱신합니다
  const content = $('#content'); // 오른쪽 내용 상자입니다
  content.innerHTML = ''; // 이전 내용을 비웁니다
  const box = document.createElement('div'); // 새 상자입니다
  box.className = 'fade-enter'; // 전환 시작 모양입니다
  box.innerHTML = crumbs(groupKey, code) + getTemplateFor(code); // 위치 + 내용입니다
  content.appendChild(box); // 화면에 붙입니다
  requestAnimationFrame(()=>box.classList.add('fade-enter-active')); // 다음 순간에 자연스럽게 보이게 합니다
} // 화면 그리기 함수 끝

// ===== KPI 숫자를 예쁘게 올라가게 만듭니다 =====
function animateKPIs(){ // 히어로의 큰 숫자를 올려주는 함수입니다
  document.querySelectorAll('.kpi-num').forEach(el=>{ // 모든 숫자 칸을 돌면서
    const target = parseInt(el.dataset.count||'0',10); // 목표 숫자를 읽습니다
    const dur = 900; // 애니메이션 시간을 0.9초로 정합니다
    let start=null; // 시작 시간을 저장할 변숩니다
    function step(t){ // 한 프레임마다 호출되는 함수입니다
      if(!start) start=t; // 처음 부르면 시작 시간을 기록합니다
      const p = Math.min((t-start)/dur, 1); // 0~1 사이의 진행률을 구합니다
      el.textContent = Math.floor(target*p).toLocaleString(); // 진행률만큼 숫자를 올려 적습니다
      if(p<1) requestAnimationFrame(step); // 아직 1이 아니면 다음 프레임을 예약합니다
    } // 프레임 처리 함수의 끝입니다
    requestAnimationFrame(step); // 애니메이션을 시작합니다
  }); // 숫자 칸 반복의 끝입니다
} // KPI 애니메이션 함수 끝

// ===== 하단 뉴스/공지 스트립을 채웁니다 =====
function renderNewsStrip(){ // 공지 몇 개를 가볍게 보여줍니다
  const box = $('#newsStrip'); // 공지 박스입니다
  if(!box) return; // 박스가 없으면 그냥 나갑니다
  box.innerHTML = ''; // 이전 내용을 지웁니다
  NOTICES.slice(0,4).forEach(n=>{ // 최근 4개만 간단히 보여줍니다
    const a = document.createElement('a'); // 링크를 만듭니다
    a.className = 'news-item'; // 공지 칸 모양을 적용합니다
    a.href = '#/8-1_notice_board'; // 전체 공지 페이지로 이동합니다
    a.innerHTML = `<span class="badge">NEW</span><span>${n.title}</span><span style="color:var(--muted);font-size:12px;">${n.date}</span>`; // 배지/제목/날짜를 넣습니다
    box.appendChild(a); // 박스에 붙입니다
  }); // 공지 반복 끝
} // 뉴스 스트립 함수 끝

// ===== 언어 버튼 동작(간단 알림) =====
function wireLangButtons(){ // KR/EN을 눌렀을 때의 반응입니다
  const kr = $('#langKR'); // KR 버튼입니다
  const en = $('#langEN'); // EN 버튼입니다
  if(kr) kr.onclick = ()=>alert('한국어가 기본입니다. (영문 페이지는 준비 중)'); // KR을 누르면 간단히 안내합니다
  if(en) en.onclick = ()=>alert('English version is under preparation.'); // EN을 누르면 영문 준비 중이라고 안내합니다
} // 언어 버튼 연결 함수 끝

// ===== 주소가 바뀌면 본문을 다시 그리도록 합니다 =====
window.addEventListener('hashchange', ()=>renderPage(currentCode())); // 해시 변경 시 페이지를 다시 그립니다

// ===== 처음 시작할 때 한 번만 실행합니다 =====
function init(){ // 초기 준비를 합니다
  buildTopNav(); // 상단 네비게이션을 만듭니다
  wireLangButtons(); // 언어 버튼을 연결합니다
  animateKPIs(); // 히어로의 숫자 애니메이션을 실행합니다
  renderNewsStrip(); // 하단 공지 스트립을 만듭니다
  // 히어로 빠른 이동 버튼 연결입니다
  const go = (id, code)=>{ const el = document.getElementById(id); if(el) el.onclick = ()=>location.hash = toHash(code); }; // 버튼과 코드를 연결해주는 작은 함수입니다
  go('goIntro','1-1_intro_greeting'); // 회사소개로 이동 버튼입니다 (있으면 동작합니다)
  go('goBiz','2-1_biz_electric'); // 사업소개로 이동 버튼입니다
  go('goWork','3-1_work_electric_eng'); // 주요실적으로 이동 버튼입니다
  go('goAsk','7-1_ask_estimate'); // 견적/문의로 이동 버튼입니다
  renderPage(currentCode()); // 현재 주소에 맞는 본문을 한 번 그립니다
} // 초기화 함수 끝

// ===== 문서가 준비되면 init을 실행합니다 =====
window.addEventListener('DOMContentLoaded', init); // 페이지가 준비되면 바로 시작합니다
