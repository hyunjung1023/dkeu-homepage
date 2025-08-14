// 사이트의 대분류·중분류와 파일 코드를 한 곳에 모아 둡니다
export const SITE_MAP = [ // 대분류 배열을 시작합니다
  { // 1. 회사소개입니다
    key: '1_intro', // 대분류의 고유 키입니다
    title: '회사소개', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '1-1_intro_greeting', title: '인사말' }, // 1-1 페이지입니다
      { code: '1-2_intro_history', title: '연혁 및 수상' }, // 1-2 페이지입니다
      { code: '1-3_intro_about', title: '기업개요' }, // 1-3 페이지입니다
      { code: '1-4_intro_map', title: '찾아오시는 길' }, // 1-4 페이지입니다
      { code: '1-5_intro_organization', title: '조직도' } // 1-5 페이지입니다
    ] // 중분류 목록의 끝입니다
  }, // 회사소개 대분류의 끝입니다
  { // 2. 사업소개입니다
    key: '2_biz', // 대분류의 고유 키입니다
    title: '사업소개', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '2-1_biz_electric', title: '전기' }, // 2-1 페이지입니다
      { code: '2-2_biz_telecom', title: '통신' }, // 2-2 페이지입니다
      { code: '2-3_biz_fire', title: '소방' }, // 2-3 페이지입니다
      { code: '2-4_biz_partner', title: '주요파트너' } // 2-4 페이지입니다
    ] // 중분류 목록의 끝입니다
  }, // 사업소개 대분류의 끝입니다
  { // 3. 주요실적입니다
    key: '3_work', // 대분류의 고유 키입니다
    title: '주요실적', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '3-1_work_electric_eng', title: '전기공사' }, // 3-1 페이지입니다
      { code: '3-2_work_electric_design', title: '전기설계' }, // 3-2 페이지입니다
      { code: '3-3_work_electric_supervision', title: '전기감리' }, // 3-3 페이지입니다
      { code: '3-4_work_telecom_eng', title: '통신공사' }, // 3-4 페이지입니다
      { code: '3-5_work_telecom_design', title: '통신설계' }, // 3-5 페이지입니다
      { code: '3-6_work_telecom_supervision', title: '통신감리' }, // 3-6 페이지입니다
      { code: '3-7_work_fire_eng', title: '소방공사' }, // 3-7 페이지입니다
      { code: '3-8_work_fire_design', title: '소방설계' } // 3-8 페이지입니다
    ] // 중분류 목록의 끝입니다
  }, // 주요실적 대분류의 끝입니다
  { // 4. 지속가능경영입니다
    key: '4_manage', // 대분류의 고유 키입니다
    title: '지속가능경영', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '4-1_manage_safety', title: '안전보건 경영' }, // 4-1 페이지입니다
      { code: '4-2_manage_quality', title: '품질환경 경영' }, // 4-2 페이지입니다
      { code: '4-3_manage_ethics', title: '인권윤리 경영' }, // 4-3 페이지입니다
      { code: '4-4_manage_esg', title: 'ESG 경영' } // 4-4 페이지입니다
    ] // 중분류 목록의 끝입니다
  }, // 지속가능경영 대분류의 끝입니다
  { // 5. 인재채용입니다
    key: '5_job', // 대분류의 고유 키입니다
    title: '인재채용', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '5-1_job_talent', title: '인재상' }, // 5-1 페이지입니다
      { code: '5-2_job_intro', title: '직무소개' }, // 5-2 페이지입니다
      { code: '5-3_job_welfare', title: '복리후생' }, // 5-3 페이지입니다
      { code: '5-4_job_vacancy', title: '채용공고' } // 5-4 페이지입니다
    ] // 중분류 목록의 끝입니다
  }, // 인재채용 대분류의 끝입니다
  { // 6. 홍보센터입니다
    key: '6_data', // 대분류의 고유 키입니다
    title: '홍보센터', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '6-1_data_award', title: '수상실적' }, // 6-1 페이지입니다
      { code: '6-2_data_confirmation', title: '신인도' }, // 6-2 페이지입니다
      { code: '6-3_data_certificate', title: '인증서' }, // 6-3 페이지입니다
      { code: '6-4_data_proposal', title: '지명원' }, // 6-4 페이지입니다
      { code: '6-5_data_news', title: '뉴스' } // 6-5 페이지입니다
    ] // 중분류 목록의 끝입니다
  }, // 홍보센터 대분류의 끝입니다
  { // 7. 견적 및 문의입니다
    key: '7_ask', // 대분류의 고유 키입니다
    title: '견적 및 문의', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '7-1_ask_estimate', title: '견적' }, // 7-1 페이지입니다
      { code: '7-2_ask_faq', title: 'FAQ' } // 7-2 페이지입니다
    ] // 중분류 목록의 끝입니다
  }, // 견적 및 문의 대분류의 끝입니다
  { // 8. 공지사항입니다
    key: '8_notice', // 대분류의 고유 키입니다
    title: '공지사항', // 화면에 보이는 이름입니다
    items: [ // 중분류 목록입니다
      { code: '8-1_notice_board', title: '공지사항' } // 8-1 페이지입니다
    ] // 중분류 목록의 끝입니다
  } // 공지사항 대분류의 끝입니다
]; // 대분류 배열의 끝입니다
