import Image from 'next/image'; // 최적화된 이미지 로딩을 제공하는 Next.js의 Image 컴포넌트
import Link from 'next/link'; // Next.js에서 제공하는 Link 컴포넌트 (클라이언트 측 라우팅)

import logoImg from '@/assets/logo.png'; // 로고 이미지 파일 불러오기
import MainHeaderBackground from './main-header-background'; // 헤더 배경 컴포넌트 불러오기
import classes from './main-header.module.css'; // CSS 모듈을 불러와 스타일 적용
import NavLink from './nav-link'; // 네비게이션 링크 컴포넌트 불러오기

// 📌 MainHeader 컴포넌트: 상단 네비게이션 바 (로고 + 메뉴)
export default function MainHeader() {
  return (
    <>
      {/* 📌 헤더의 배경을 표시하는 컴포넌트 */}
      <MainHeaderBackground />

      <header className={classes.header}>
        {/* 📌 헤더 스타일 적용된 컨테이너 */}
        {/* 📌 로고 및 홈 링크 */}
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate with food on it" priority />{' '}
          {/* 최적화된 로고 이미지 */}
          <span>NextLevel Food</span> {/* 사이트 제목 */}
        </Link>
        {/* 📌 네비게이션 메뉴 */}
        <nav className={classes.nav}>
          <ul>
            <li>
              {/* 📌 "/meals" 페이지로 이동하는 링크 (음식 리스트 페이지) */}
              <NavLink href="/meals">Browse Meals</NavLink>
            </li>
            <li>
              {/* 📌 "/community" 페이지로 이동하는 링크 (커뮤니티 페이지) */}
              <NavLink href="/community">Foodies Community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
}
