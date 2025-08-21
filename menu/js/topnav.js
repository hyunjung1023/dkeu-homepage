// /menu/js/topnav.js  ← 두 페이지가 공통으로 불러올 헤더 스크립트입니다. 즉 상단바스타일은 다 여기서 조정!!

import { SITE_MAP } from '/menu/js/data/site_map.js'; // 메뉴 구조 데이터를 불러옵니다

// 선택자를 받아 요소 하나를 찾는 도우미입니다
const $ = (sel) => document.querySelector(sel);

// 상단 드롭다운 메뉴를 그립니다 (두 페이지 공용)
export function buildTopNav(){ // 상단 네비게이션을 만드는 함수입니다
  const nav = $('#topNav'); // 네비게이션 컨테이너를 찾습니다
  if(!nav) return; // 없으면 아무 것도 하지 않습니다
  nav.innerHTML = ''; // 혹시 남아있는 내용을 비웁니다

  SITE_MAP.forEach(group => { // 대분류를 하나씩 꺼냅니다
    const btn = document.createElement('button'); // 버튼을 만듭니다
    btn.className = 'menu-btn'; // 버튼 모양 클래스를 붙입니다
    btn.textContent = group.title; // 버튼 글자를 대분류 이름으로 합니다

    const dd = document.createElement('div'); // 드롭다운 상자를 만듭니다
    dd.className = 'dropdown'; // 드롭다운 모양 클래스를 붙입니다

    group.items.forEach(it => { // 중분류 항목들을 하나씩 처리합니다
      const a = document.createElement('a'); // 링크를 만듭니다
      a.href = `/menu/#/${it.code}`; // /menu로 이동하여 해시 라우팅으로 엽니다
      a.textContent = it.title; // 항목 이름을 씁니다
      dd.appendChild(a); // 드롭다운 안에 넣습니다
    });

    btn.appendChild(dd); // 버튼 아래에 드롭다운을 붙입니다
    nav.appendChild(btn); // 상단 네비게이션에 버튼을 추가합니다
  });
}

// 언어 버튼(KR/EN)에 간단 안내를 연결합니다 (두 페이지 공용)
export function wireLangButtons(){ // 언어 버튼 안내 함수입니다
  const kr = $('#langKR'); // KR 버튼을 찾습니다
  const en = $('#langEN'); // EN 버튼을 찾습니다
  if(kr) kr.onclick = ()=>alert('한국어가 기본입니다.'); // 안내 팝업입니다
  if(en) en.onclick = ()=>alert('English version is under preparation.'); // 준비 중 안내입니다
}
