// 메인 헤더 컴포넌트를 불러옴 (모든 페이지에서 공통으로 사용)
import MainHeader from '@/components/main-header/main-header';
// 글로벌 스타일 적용 (전역적으로 사용될 CSS 파일)
import './globals.css';

// 페이지의 메타데이터 (HTML <head> 요소에 들어갈 내용)
export const metadata = {
  title: 'NextLevel Food', // 웹사이트 제목 (브라우저 탭에 표시됨)
  description: 'Delicious meals, shared by a food-loving community.', // 검색 엔진 및 SNS 공유 시 표시되는 설명
};

// RootLayout 컴포넌트 (Next.js에서 전체 레이아웃을 설정하는 역할)
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* HTML 문서의 기본 언어를 설정 (영어) */}
      <body>
        {/* 모든 페이지에 공통적으로 표시될 메인 헤더 */}
        <MainHeader />
        {/* 각 페이지의 개별 컨텐츠가 children으로 들어옴 */}
        {children}
      </body>
    </html>
  );
}
