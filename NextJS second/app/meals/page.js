// 📌 Next.js 기반의 MealsPage 컴포넌트
// 이 페이지에서는 사용자가 공유한 식사 데이터를 데이터베이스에서 가져와 출력합니다.
// 데이터를 불러오는 동안 로딩 UI를 제공하며, Next.js의 서버 컴포넌트와 Suspense를 활용합니다.

import MealsGrid from '@/components/meals/meals-grid'; // ✅ Meal 리스트를 표시하는 컴포넌트
import { getMeals } from '@/lib/meal'; // ✅ DB에서 식사 데이터를 가져오는 함수
import Link from 'next/link'; // ✅ Next.js의 `Link` 컴포넌트: 클라이언트 사이드 내비게이션을 제공함
import { Suspense } from 'react'; // ✅ React의 `Suspense` 컴포넌트: 비동기 로딩 UI 처리
import classes from './page.module.css'; // ✅ 페이지 스타일을 적용하기 위한 CSS 모듈

export const metadata = {
  title: 'All Meals',
  description: 'Browse the delicious meals shared by our vibrant community.',
};
// 📌 [서버 컴포넌트] Meals 컴포넌트
// - `getMeals()` 함수를 호출하여 DB에서 meal 데이터를 불러옴
// - 데이터를 가져올 때까지 페이지가 멈추지 않도록, Suspense 내에서 사용됨
async function Meals() {
  const meals = await getMeals(); // ✅ 비동기 함수 호출하여 meal 데이터를 가져옴
  return <MealsGrid meals={meals} />; // ✅ 가져온 데이터를 MealsGrid에 전달하여 화면에 표시
}

// 📌 [페이지 컴포넌트] MealsPage
// - 사용자가 공유한 식사 정보를 확인할 수 있는 페이지
// - Suspense를 활용하여 데이터 로딩 중 "Fetching Meals..." 메시지를 표시함
export default function MealsPage() {
  return (
    <>
      {/* ✅ 페이지 상단 헤더 섹션 */}
      <header className={classes.header}>
        <h1>
          Delicious meals, created{' '}
          <span className={classes.highlight}>by you</span>
        </h1>
        <p>
          Choose your favorite recipe and cook it yourself. It is easy and fun!
        </p>
        <p className={classes.cta}>
          <Link href="/meals/share">
            {/* ✅ "Share your favorite recipe" 버튼 */}
            Share your favorite recipe
          </Link>
        </p>
      </header>

      {/* ✅ 메인 섹션 */}
      <main className={classes.main}>
        {/* ✅ Suspense 사용: Meals 컴포넌트가 데이터를 가져올 동안 "Fetching Meals..." 표시 */}
        <Suspense
          fallback={<p className={classes.loading}>Fetching Meals...</p>}
        >
          <Meals /> {/* ✅ 서버에서 데이터 가져온 후 MealsGrid를 렌더링 */}
        </Suspense>
      </main>
    </>
  );
}
