// 📌 [NotFound 컴포넌트]
// - Next.js의 자동 감지 파일 중 하나인 `not-found.js` 파일
// - 사용자가 존재하지 않는 페이지나 데이터를 요청했을 때 렌더링됨
// - 예를 들어, `/meals/잘못된-slug` 경로에 접근했을 때 실행될 수 있음

export default function NotFound() {
  return (
    <main className="not-found">
      {/* ✅ 전체 영역을 감싸는 main 태그 (CSS 적용 가능) */}
      <h1>Meal not found</h1> {/* ✅ 404 페이지 제목 */}
      <p>Unfortunately, we could not find the requested page or meal data.</p>
      {/* ✅ 에러 메시지 */}
    </main>
  );
}
