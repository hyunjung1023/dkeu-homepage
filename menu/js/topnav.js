// /menu/js/topnav.js
// 메인(/)과 /menu 공통 상단바(데스크톱 드롭다운 + 모바일 햄버거)를 구성합니다.
import { SITE_MAP } from './data/site_map.js';

const isMenu = location.pathname.startsWith('/menu');
const hrefFor = (code) => isMenu ? `#/${code}` : `/menu/#/${code}`;

/* 데스크톱: 상단 드롭다운 네비 */
function buildDesktopNav(){
  const nav = document.getElementById('topNav');
  if(!nav) return;
  nav.innerHTML = '';
  SITE_MAP.forEach(group=>{
    const btn = document.createElement('button');
    btn.className = 'menu-btn';
    btn.textContent = group.title;
    const dd = document.createElement('div');
    dd.className = 'dropdown';
    group.items.forEach(it=>{
      const a = document.createElement('a');
      a.href = hrefFor(it.code);
      a.textContent = it.title;
      dd.appendChild(a);
    });
    btn.appendChild(dd);
    nav.appendChild(btn);
  });
}

/* 모바일: 햄버거 버튼 + 우측 슬라이드 드로어 */
function buildMobileNav(){
  const wrap = document.querySelector('header.site .wrap');
  if(!wrap) return;

  // 햄버거 버튼이 이미 있으면 재구축하지 않음
  if(document.getElementById('hamBtn')) return;

  // 1) 햄버거 버튼
  const ham = document.createElement('button');
  ham.className = 'hamburger';
  ham.id = 'hamBtn';
  ham.setAttribute('aria-label','메뉴 열기');
  ham.setAttribute('aria-expanded','false');
  ham.innerHTML = '<span></span><span></span><span></span>';
  wrap.appendChild(ham); // nav.top 뒤쪽에 붙이므로 모바일에서 오른쪽에 보입니다

  // 2) 배경 & 패널
  let backdrop = document.getElementById('mnavBg');
  let panel    = document.getElementById('mnavPanel');

  if(!backdrop){
    backdrop = document.createElement('div');
    backdrop.id = 'mnavBg';
    backdrop.className = 'mnav-backdrop';
    document.body.appendChild(backdrop);
  }
  if(!panel){
    panel = document.createElement('aside');
    panel.id = 'mnavPanel';
    panel.className = 'mnav';
    panel.innerHTML = `
      <div class="mnav-head">
        <button class="mnav-close" id="mnavClose" aria-label="메뉴 닫기">×</button>
      </div>
      <nav class="mnav-body" id="mnavBody"></nav>
    `;
    document.body.appendChild(panel);
  }

  const body = panel.querySelector('#mnavBody');
  body.innerHTML = '';

  // 3) 대분류 + 중분류(아코디언)
  SITE_MAP.forEach(group=>{
    const box = document.createElement('div');

    const gbtn = document.createElement('button');
    gbtn.type = 'button';
    gbtn.className = 'mnav-group-btn';
    gbtn.textContent = group.title;

    const sub = document.createElement('div');
    sub.className = 'mnav-sub';

    group.items.forEach(it=>{
      const a = document.createElement('a');
      a.href = hrefFor(it.code);
      a.textContent = it.title;
      sub.appendChild(a);
    });

    gbtn.addEventListener('click', ()=>{
      // 다른 열린 것 닫고 이 그룹만 토글
      body.querySelectorAll('.mnav-sub').forEach(el=>{ if(el!==sub) el.classList.remove('open'); });
      sub.classList.toggle('open');
    });

    box.appendChild(gbtn);
    box.appendChild(sub);
    body.appendChild(box);
  });

  // 4) 열고 닫기
  const open  = ()=>{ panel.classList.add('on'); backdrop.classList.add('on'); ham.setAttribute('aria-expanded','true'); document.documentElement.classList.add('no-scroll'); };
  const close = ()=>{ panel.classList.remove('on'); backdrop.classList.remove('on'); ham.setAttribute('aria-expanded','false'); document.documentElement.classList.remove('no-scroll'); };

  ham.onclick = open;
  backdrop.onclick = close;
  panel.querySelector('#mnavClose').onclick = close;

  // 링크 클릭 시 자동 닫힘
  body.addEventListener('click', (e)=>{
    const t = e.target;
    if(t && t.tagName === 'A'){ close(); }
  });
}

/* 외부에서 쓸 초기화 함수 */
export function initTopBar(){
  buildDesktopNav();
  buildMobileNav();
}

/* (선택) 상단 스케일을 한 줄로 조정하고 싶을 때 사용할 수 있습니다 */
export function setHeaderScale(scale){
  document.documentElement.style.setProperty('--header-scale', String(scale));
}

/* (선택) 활성 표시 갱신 훅 — 필요 시 확장 가능 */
export function refreshActive(){ /* 현재는 생략 */ }
