// /menu/js/topnav.js  ← 메인(/)과 /menu/가 함께 쓰는 "공용 헤더 스크립트" 파일입니다

import { SITE_MAP } from '/menu/js/data/site_map.js'; // 메뉴 구조 데이터를 가져옵니다(대분류·중분류 목록입니다)

// 선택자(예: '#topNav')로 화면에서 요소 하나를 찾아주는 간단한 도우미입니다
const $ = (sel) => document.querySelector(sel);

// 상단 드롭다운 메뉴(대분류 버튼 + 중분류 목록)를 만들어 넣는 함수입니다
export function buildTopNav(){                           // 다른 파일에서 쓸 수 있도록 export 합니다
  const nav = $('#topNav');                              // 상단 메뉴가 들어갈 비어 있는 <nav id="topNav">를 찾습니다
  if(!nav) return;                                       // 만약 못 찾으면 더 이상 하지 않고 그대로 끝냅니다(안전장치입니다)

  nav.innerHTML = '';                                    // 혹시 전에 있던 내용이 있다면 싹 비웁니다(깨끗한 상태로 시작)

  // SITE_MAP 안에 대분류들이 들어있습니다. 하나씩 꺼내서 버튼을 만듭니다.
  SITE_MAP.forEach(group => {                            // group.title = 대분류 이름, group.items = 중분류 배열
    const btn = document.createElement('button');        // 대분류 버튼을 하나 만듭니다
    btn.className = 'menu-btn';                          // 버튼에 모양(스타일) 클래스를 붙입니다
    btn.type = 'button';                                 // 폼 버튼이 아니라고 표시합니다(엔터 눌러도 제출 안 되게)
    btn.textContent = group.title;                       // 버튼 글자를 대분류 이름으로 적습니다
    btn.setAttribute('aria-haspopup','true');            // 접근성: 이 버튼은 하위 메뉴를 가진다고 알려줍니다
    btn.setAttribute('aria-expanded','false');           // 접근성: 기본은 펼쳐지지 않았다고 표시합니다

    const dd = document.createElement('div');            // 버튼 아래에 보일 드롭다운 상자를 만듭니다
    dd.className = 'dropdown';                           // 드롭다운 스타일 클래스를 붙입니다
    dd.setAttribute('role','menu');                      // 접근성: 메뉴 역할이라고 알려줍니다

    // 중분류 항목들을 하나씩 만들어 드롭다운 안에 넣습니다
    group.items.forEach(it => {                          // it.title = 항목 이름, it.code = 링크 코드
      const a = document.createElement('a');             // 링크를 하나 만듭니다
      a.href = `/menu/#/${it.code}`;                     // /menu로 가서 해시 라우팅으로 해당 페이지를 열게 합니다
      a.textContent = it.title;                          // 링크 글자를 중분류 이름으로 적습니다
      a.setAttribute('role','menuitem');                 // 접근성: 이 링크는 메뉴 항목이라고 알려줍니다
      dd.appendChild(a);                                 // 만든 링크를 드롭다운 상자 안에 넣습니다
    });

    // 만들어둔 드롭다운을 버튼 밑에 붙입니다
    btn.appendChild(dd);                                 // 버튼 → 드롭다운 순서대로 붙입니다

    // 키보드 접근성을 조금 돕기 위해 포커스 들어오고 나갈 때 aria-expanded 값을 바꿔줍니다
    btn.addEventListener('focus', () => {                // 버튼에 포커스가 오면
      btn.setAttribute('aria-expanded','true');          // 펼쳐졌다고 표시합니다(시각적 표시는 CSS :hover가 담당)
    });
    btn.addEventListener('blur', () => {                 // 버튼에서 포커스가 나가면
      btn.setAttribute('aria-expanded','false');         // 접혔다고 표시합니다
    });

    // 완성된 버튼(대분류+드롭다운)을 상단 <nav> 안에 넣습니다
    nav.appendChild(btn);                                // 상단 메뉴줄에 버튼을 추가합니다
  });
}

// KR/EN 언어 버튼을 눌렀을 때 간단한 안내창을 띄워주는 함수입니다
export function wireLangButtons(){                       // 다른 파일에서 쓸 수 있도록 export 합니다
  const kr = $('#langKR');                               // 한국어 안내 버튼을 찾습니다
  const en = $('#langEN');                               // 영어 안내 버튼을 찾습니다
  if(kr) kr.onclick = () => alert('한국어가 기본입니다.'); // KR 버튼을 누르면 한국어 기본이라고 알려줍니다
  if(en) en.onclick = () => alert('English version is under preparation.'); // EN 버튼을 누르면 준비 중이라고 알려줍니다
}

// (선택) 한 줄로 상단을 초기화하고 싶을 때 쓰는 편의 함수입니다
export function initTopBar(){                            // 필요하면 이 함수 하나만 불러도 됩니다
  buildTopNav();                                         // 상단 드롭다운을 먼저 그립니다
  wireLangButtons();                                     // 언어 버튼 동작을 연결합니다
}
