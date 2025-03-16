import classes from './main-header-background.module.css'; // CSS 모듈을 불러와 스타일 적용

// 📌 MainHeaderBackground 컴포넌트: 헤더의 배경을 담당하는 SVG 그래픽 렌더링
export default function MainHeaderBackground() {
  return (
    <div className={classes['header-background']}>
      {/* 배경 스타일을 적용하는 div */}
      <svg
        className={classes['header-background svg']} // SVG 스타일 적용
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <defs>
          {/* 📌 SVG 선형 그라디언트 정의 (왼쪽에서 오른쪽으로 색상이 변함) */}
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: '#59453c', stopOpacity: '1' }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#8f3a09', stopOpacity: '1' }}
            />
          </linearGradient>
        </defs>
        {/* 📌 배경 곡선의 Path (SVG를 이용해 물결 모양 배경 생성) */}
        <path
          fill="url(#gradient)" // 위에서 정의한 그라디언트 색상을 채우기로 사용
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
    </div>
  );
}
