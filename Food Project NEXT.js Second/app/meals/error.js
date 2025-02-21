'use client';

export default function Error({ error }) {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. please try again later</p>
      <p>
        <i>{error?.message}</i>
      </p>{' '}
      {/* 오류 메시지 표시 */}
    </main>
  );
}
