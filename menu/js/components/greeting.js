// /menu/js/components/greeting.js
// =================== 인사말 페이지 전용 컴포넌트 ===================

// 초등학생 설명: 이 함수는 "인사말 페이지"에 보여 줄 HTML을 만들어 돌려줘요.
export function renderGreeting(data){
  // data에서 필요한 것들을 꺼내요(사진, 제목, 문단들, 서명).
  const { image, headline, paragraphs, sign } = data;

  // 화면에 그릴 HTML 글자를 만들어서 돌려줘요.
  // HTML 안에도 <!-- 이런 주석 -->을 넣어서 어떤 부분인지 쉽게 보이게 했어요.
  return `
    <!-- 인사말 페이지 전체 박스 -->
    <section class="greet">

      <!-- 위쪽: 큰 제목/슬로건 + 사진을 나란히 보여주는 부분 -->
      <header class="greet-hero">
        <!-- 왼쪽: 슬로건(큰 글자)과 작은 설명 -->
        <div class="greet-text">
          <div class="eyebrow">CEO MESSAGE</div> <!-- 아주 작은 영어 소제목 -->
          <h2 class="greet-headline">&ldquo;${headline}&rdquo;</h2> <!-- 큰 슬로건(따옴표 포함) -->
          <p class="greet-brief">전기 · 통신 · 소방 분야의 공공 프로젝트 파트너</p> <!-- 한 줄 보조 설명 -->
        </div>

        <!-- 오른쪽: 사진 상자(둥근 모서리 + 그림자) -->
        <figure class="greet-photo">
          <img src="${image}" alt="대광사업단 인사말 이미지" /> <!-- 위 0단계에서 넣은 사진 -->
        </figure>
      </header>

      <!-- 아래쪽: 본문 문단들을 차례대로 보여주는 부분 -->
      <article class="greet-body">
        ${paragraphs.map(p => `<p>${p}</p>`).join('')} <!-- 배열의 문단들을 <p>로 이어붙여요 -->
        <p class="greet-sign">
          ${sign[0]}<br /><strong>${sign[1]}</strong> <!-- 회사명과 대표자 서명 -->
        </p>
      </article>
    </section>
  `;
}
