// 📌 [MealDetailsPage 컴포넌트]
// - 특정 식사의 상세 정보를 표시하는 페이지
// - URL의 `params.mealSlug` 값을 기반으로 해당 식사를 데이터베이스에서 가져옴
// - 식사 정보가 없으면 `notFound()`를 호출하여 404 페이지로 리디렉션

import { getMeal } from '@/lib/meal'; // ✅ 특정 식사 데이터를 가져오는 함수 (lib 폴더에서 가져옴)
import Image from 'next/image'; // ✅ Next.js에서 최적화된 이미지 로딩을 위한 Image 컴포넌트
import { notFound } from 'next/navigation'; // ✅ 존재하지 않는 데이터를 요청하면 404 페이지로 리디렉션
import classes from './page.module.css'; // ✅ 이 페이지 전용 CSS 모듈
export async function generateMetadata({ params }) {
  const meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound(); // ✅ 존재하지 않는 경우 404 페이지로 이동
  }

  return {
    title: meal.title,
    description: meal.summary,
  };
}

export default function MealDetailsPage({ params }) {
  // ✅ Next.js에서 자동으로 `params`를 props로 전달
  const meal = getMeal(params.mealSlug); // ✅ `mealSlug`를 사용하여 특정 식사 정보를 가져옴

  if (!meal) {
    notFound(); // ✅ 해당 식사가 존재하지 않으면 Next.js의 `notFound()`를 호출하여 404 페이지로 이동
  }

  // ✅ 줄바꿈 문자를 `<br />` 태그로 변환하여 HTML로 출력 가능하게 설정
  meal.instructions = meal.instructions.replace(/\n/g, '<br />');

  return (
    <>
      {/* ✅ 헤더 영역: 식사 이미지, 제목, 만든 사람, 요약 정보 표시 */}
      <header className={classes.header}>
        {/* ✅ 식사 이미지를 표시하는 영역 */}
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
          {/* ✅ `fill` 속성: 부모 요소 크기에 맞게 이미지 크기 조정 */}
        </div>

        {/* ✅ 식사 제목, 만든 사람 정보, 요약 정보 */}
        <div className={classes.headerText}>
          <h1>{meal.title}</h1> {/* ✅ 식사 이름 */}
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
            {/* ✅ `mailto:` 사용: 클릭 시 이메일 클라이언트에서 메일 작성 가능 */}
          </p>
          <p className={classes.summary}>{meal.summary}</p>{' '}
          {/* ✅ 식사 요약 정보 */}
        </div>
      </header>

      {/* ✅ 본문 영역: 식사 준비 방법 (instructions) */}
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{
            __html: meal.instructions, // ✅ 변환된 HTML 코드 (줄바꿈 적용된 텍스트)
          }}
        ></p>
      </main>
    </>
  );
}
