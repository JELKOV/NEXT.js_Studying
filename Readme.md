# Next.js APP Routing 학습 정리 (README.md)

## 1. Next.js 기본 개념
### 파일 기반 라우팅과 서버 사이드 렌더링 이해
- Next.js의 라우팅 시스템은 파일 기반으로 작동하며, `pages/` 또는 `app/` 디렉토리에 파일을 추가하면 자동으로 라우트가 생성됨
- 서버 사이드 렌더링(SSR), 정적 사이트 생성(SSG), 클라이언트 사이드 렌더링(CSR) 및 ISR 활용 가능

### 페이지 생성 및 이동
- 새로운 페이지를 추가하는 방법 및 동적 라우트 (`[id].js` vs `[[...slug]].js`)
- `Link` 컴포넌트를 사용하여 네비게이션 최적화
- 정적 페이지(`getStaticProps`) vs 동적 페이지(`getServerSideProps`) 비교

### 레이아웃과 스타일링 관리
- `layout.js`를 활용하여 공통 레이아웃 정의
- `globals.css`, `icon.png` 등을 활용한 전역 스타일 및 정적 파일 관리
- 동적 라우트 우선순위 이해 및 보호된 파일 처리

## 2. Next.js 고급 실습
### 이미지 최적화
- `next/image`를 활용한 자동 최적화 및 크기 조정
- `priority`, `layout`, `placeholder` 속성 활용
- Cloudinary와 연동한 이미지 업로드 및 최적화

### 데이터 페칭
- 백엔드 API와 연결하여 데이터를 가져오는 방식 (`fetch`, `useSWR`, `getStaticProps`, `getServerSideProps` 등)
- 별도 백엔드 없이 데이터베이스 연결 (`Prisma`, `MongoDB`, `Firebase` 등)
- 데이터 로딩 최적화 및 로딩 상태 처리 (`Suspense`, `loading.js` 활용)

### 서버 액션 (Server Actions)
- Next.js 15에서 도입된 Server Actions 이해 및 활용
- 클라이언트에서 서버 액션을 호출하는 방법
- 데이터 검증 및 폼 유효성 검사 (`useActionState` 활용)
- 배포 환경에서 데이터 업데이트 및 캐싱 문제 해결

## 3. Next.js 라우팅과 렌더링
### 동적 라우트 및 인터셉팅 라우트
- `pages/[id].js`를 활용한 동적 라우트 생성
- `Route Groups` 및 `Middleware`를 활용한 인증 및 권한 관리
- `Interception Routes`를 이용한 특정 경로 인터셉트 및 리디렉션

### 미들웨어와 API 핸들러
- `Middleware`를 활용한 요청 전처리 (로그인 검증, API Rate Limiting)
- `api/` 디렉토리를 활용한 서버리스 API 개발
- `Route Handlers`를 사용한 API 요청 처리 (`GET`, `POST`, `DELETE` 등)

## 4. Next.js 인증 시스템 구현
### Lucia를 활용한 인증 시스템
- `Lucia`를 활용한 세션 기반 인증 구현 (`createAuthSession`, `verifyAuth` 등)
- 인증 세션을 유지하고 로그인 상태를 검증하는 방법 (`cookies()` 활용)
- `useFormState`를 활용한 인증 UI 구성 및 로그인/회원가입 구현
- 로그아웃 기능 추가 (`destroySession`) 및 인증 상태 유지

## 5. Next.js 배포 및 성능 최적화
### 캐싱 및 데이터 최적화
- `unstable_cache`를 활용한 데이터 캐싱
- `revalidatePath`와 `revalidateTag`를 이용한 캐시 무효화
- 정적 사이트 생성(SSG)과 서버 사이드 렌더링(SSR)의 차이점 및 적용 사례

### SEO 및 메타데이터 관리
- `metadata` API를 활용한 SEO 최적화
- 동적 메타데이터(Dynamic Metadata) 설정 및 활용

### AWS S3 및 이미지 최적화
- AWS S3를 활용한 이미지 업로드 및 배포
- `next/image`를 활용한 로딩 최적화 및 성능 개선

## 6. Next.js 프로젝트 구조 정리
### 프로젝트 폴더 구조
```plaintext
📂 nextjs-project/
├── 📂 app/ (App Router 사용 시)
│   ├── 📂 (auth)/ (인증이 필요한 페이지)
│   │   ├── layout.js (로그인한 사용자 전용 레이아웃)
│   │   ├── page.js (훈련 페이지 등)
│   ├── layout.js (메인 레이아웃)
│   ├── page.js (홈페이지)
├── 📂 components/ (재사용 가능한 UI 컴포넌트)
├── 📂 lib/ (인증 및 데이터 관련 라이브러리)
├── 📂 styles/ (CSS 및 Tailwind 설정)
├── 📂 public/ (정적 파일 및 이미지)
├── 📂 api/ (API 라우트, 백엔드 핸들러)
├── .gitignore
├── next.config.js
├── package.json
```

## 7. Next.js 최신 트렌드
### App Router vs Pages Router
- `Pages Router`는 기존 Next.js 방식 (`pages/` 폴더 사용)
- `App Router`는 최신 방식 (`app/` 폴더 사용)으로, `React Server Components` 활용 가능
- 서버 컴포넌트와 클라이언트 컴포넌트를 혼합하여 사용
- 현재 `App Router`가 트렌드이며, 신규 프로젝트에서는 적극적으로 사용 권장


## 8. 정리 - Notion Page
### 링크
- [Notion 정리 페이지](https://jelkov-developer.notion.site/NEXT-js-195c23f3073480d9aa9ff8f707c19a0a?pvs=4)
---


이 README.md는 Next.js 학습 과정에서 다룬 주요 개념을 정리한 내용입니다.

