// Next.js의 Link 컴포넌트를 가져옴 (페이지 이동을 위한 링크 생성)
import Link from 'next/link';
// 페이지 스타일을 적용하기 위해 CSS 모듈을 불러옴
import classes from './page.module.css';
// 이미지 슬라이드쇼 컴포넌트를 가져옴
import ImageSlideshow from '@/components/images/image-slideshow';

// Home 컴포넌트 (Next.js의 기본 페이지 컴포넌트)
export default function Home() {
  return (
    <>
      {/* 헤더 섹션 시작 */}
      <header className={classes.header}>
        {/* 이미지 슬라이드쇼 컨테이너 */}
        <div className={classes.slideshow}>
          <ImageSlideshow />
        </div>

        {/* 히어로 섹션: 메인 제목 및 소개 */}
        <div>
          <div className={classes.hero}>
            {/* 메인 페이지 타이틀 */}
            <h1>NextLevel Food for NextLevel Foodies</h1>
            {/* 서브 텍스트 */}
            <p>Taste & share food from all over the world.</p>
          </div>

          {/* CTA (Call To Action) 버튼: 커뮤니티 참여 & 식사 탐색 */}
          <div className={classes.cta}>
            {/* 커뮤니티 페이지로 이동하는 버튼 */}
            <Link href="/community">Join the Community</Link>
            {/* 식사 목록 페이지로 이동하는 버튼 */}
            <Link href="/meals">Explore Meals</Link>
          </div>
        </div>
      </header>

      {/* 메인 컨텐츠 영역 */}
      <main>
        {/* "How it works" 섹션 */}
        <section className={classes.section}>
          <h2>How it works</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>

        {/* "Why NextLevel Food?" 섹션 */}
        <section className={classes.section}>
          <h2>Why NextLevel Food?</h2>
          <p>
            NextLevel Food is a platform for foodies to share their favorite
            recipes with the world. It&apos;s a place to discover new dishes,
            and to connect with other food lovers.
          </p>
          <p>
            NextLevel Food is a place to discover new dishes, and to connect
            with other food lovers.
          </p>
        </section>
      </main>
    </>
  );
}
