// 특별한 동작이 필요한 몇 개의 페이지를 이 파일에서 정의합니다
export function renderEstimate() { // 견적 의뢰 페이지를 만드는 함수입니다
  return `
    <h2 style="font-size:22px; margin:6px 0 12px 0;">온라인 견적 의뢰</h2> <!-- 큰 제목을 보여줍니다 -->
    <p style="color:var(--muted); margin-bottom:12px;">프로젝트 정보를 알려주시면 빠르게 검토해 드립니다.</p> <!-- 안내 문장입니다 -->
    <form onsubmit="event.preventDefault(); alert('제출이 완료되었습니다. 감사합니다!');" style="display:grid; gap:10px;"> <!-- 제출 시 새로고침을 막고 안내를 띄웁니다 -->
      <input required placeholder="회사/기관명" style="padding:12px; border:1px solid #e5e7eb; border-radius:10px;" /> <!-- 회사명을 입력받는 칸입니다 -->
      <input required placeholder="담당자 성함" style="padding:12px; border:1px solid #e5e7eb; border-radius:10px;" /> <!-- 담당자 이름을 입력받는 칸입니다 -->
      <input required type="tel" placeholder="연락처" style="padding:12px; border:1px solid #e5e7eb; border-radius:10px;" /> <!-- 전화번호를 입력받는 칸입니다 -->
      <textarea required placeholder="프로젝트 개요" rows="4" style="padding:12px; border:1px solid #e5e7eb; border-radius:10px;"></textarea> <!-- 프로젝트 설명을 입력받는 칸입니다 -->
      <button style="padding:12px; border:none; border-radius:12px; background:var(--brand); color:white; cursor:pointer;">견적 요청 보내기</button> <!-- 제출 버튼입니다 -->
    </form> <!-- 폼의 끝입니다 -->
  `; // 완성된 HTML 문자열을 돌려줍니다
} // 견적 페이지 함수의 끝입니다

export function renderFAQ(list) { // FAQ 페이지를 만드는 함수입니다
  const items = list.map(({q,a}) => `
    <details style="border:1px solid #e5e7eb; border-radius:12px; padding:12px; margin-bottom:8px;"> <!-- 접었다 펼 수 있는 상자입니다 -->
      <summary style="cursor:pointer; font-weight:600;">${q}</summary> <!-- 질문을 클릭하면 답이 보입니다 -->
      <p style="color:var(--muted); margin-top:8px;">${a}</p> <!-- 실제 답변 내용입니다 -->
    </details> <!-- 한 항목의 끝입니다 -->
  `).join(''); // 모든 항목을 하나의 문자열로 합칩니다
  return `
    <h2 style="font-size:22px; margin:6px 0 12px 0;">자주 묻는 질문</h2> <!-- 페이지 제목입니다 -->
    ${items} <!-- 위에서 만든 항목들을 붙입니다 -->
  `; // 완성된 HTML을 돌려줍니다
} // FAQ 페이지 함수의 끝입니다

export function renderNotice(list) { // 공지사항 페이지를 만드는 함수입니다
  const rows = list.map(n => `
    <tr> <!-- 표의 한 줄입니다 -->
      <td style="padding:10px; border-bottom:1px solid #f1f5f9;">${n.title}</td> <!-- 공지 제목입니다 -->
      <td style="padding:10px; border-bottom:1px solid #f1f5f9;">${n.date}</td> <!-- 공지 날짜입니다 -->
    </tr> <!-- 한 줄의 끝입니다 -->
  `).join(''); // 모든 줄을 하나로 합칩니다
  return `
    <h2 style="font-size:22px; margin:6px 0 12px 0;">공지사항</h2> <!-- 페이지 제목입니다 -->
    <p style="color:var(--muted); margin-bottom:12px;">회사 소식과 채용, 입찰, 인증 관련 공지를 안내드립니다.</p> <!-- 안내 문장입니다 -->
    <table style="width:100%; border-collapse:collapse;"> <!-- 칸 사이 공백이 없도록 설정한 표입니다 -->
      <thead> <!-- 표의 머리 부분입니다 -->
        <tr> <!-- 머리의 한 줄입니다 -->
          <th style="text-align:left; padding:10px; border-bottom:1px solid #e5e7eb;">제목</th> <!-- 제목 칸 머리입니다 -->
          <th style="text-align:left; padding:10px; border-bottom:1px solid #e5e7eb;">등록일</th> <!-- 날짜 칸 머리입니다 -->
        </tr> <!-- 머리 줄의 끝입니다 -->
      </thead> <!-- 머리 부분의 끝입니다 -->
      <tbody> <!-- 표의 실제 내용 부분입니다 -->
        ${rows} <!-- 위에서 만든 줄들을 붙입니다 -->
      </tbody> <!-- 내용 부분의 끝입니다 -->
    </table> <!-- 표의 끝입니다 -->
  `; // 완성된 표 HTML을 돌려줍니다
} // 공지사항 페이지 함수의 끝입니다
