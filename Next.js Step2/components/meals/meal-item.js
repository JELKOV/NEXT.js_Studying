import Image from 'next/image'; // Next.js에서 최적화된 이미지 처리를 위한 Image 컴포넌트 불러오기
import Link from 'next/link'; // Next.js의 클라이언트 측 내비게이션을 위한 Link 컴포넌트 불러오기

import classes from './meal-item.module.css'; // CSS 모듈을 불러와서 스타일 적용

// MealItem 컴포넌트: 개별 식사 정보를 표시하는 컴포넌트
export default function MealItem({ title, slug, image, summary, creator }) {
  return (
    <article className={classes.meal}>
      {/* 개별 식사 아이템을 감싸는 컨테이너 */}
      <header>
        {/* 식사 아이템의 헤더 (이미지 및 기본 정보 포함) */}
        <div className={classes.image}>
          {/* 이미지 컨테이너 */}
          <Image
            src={image} // 이미지 URL (props로 전달됨)
            alt={title} // 접근성을 위한 대체 텍스트 (식사 이름)
            fill // 부모 요소 크기에 맞게 자동 조정
          />
        </div>
        <div className={classes.headerText}>
          {/* 제목 및 작성자 정보 */}
          <h2>{title}</h2> {/* 식사 제목 */}
          <p>by {creator}</p> {/* 작성자 정보 */}
        </div>
      </header>
      <div className={classes.content}>
        {/* 본문 내용 영역 */}
        <p className={classes.summary}>{summary}</p> {/* 식사 요약 정보 */}
        <div className={classes.actions}>
          {/* 액션 버튼 컨테이너 */}
          <Link href={`/meals/${slug}`}>View Details</Link>
          {/* 상세 페이지로 이동하는 링크 */}
        </div>
      </div>
    </article>
  );
}
