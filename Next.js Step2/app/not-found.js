// NotFound 컴포넌트 (Next.js에서 자동 감지하는 404 페이지)
// 이 컴포넌트는 사용자가 존재하지 않는 페이지에 접근할 경우 표시됩니다.

export default function NotFound() {
  return (
    <main className="not-found">
      {/* 404 페이지 전용 스타일을 적용할 클래스 */}
      <h1>Not found</h1> {/* 큰 제목으로 "Not found" 표시 */}
      <p>Unfortunately, we could not find the requested page or resource.</p>
      {/* 요청한 페이지나 리소스를 찾을 수 없다는 안내 메시지 */}
    </main>
  );
}
