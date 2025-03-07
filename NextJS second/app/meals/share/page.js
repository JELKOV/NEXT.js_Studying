// 📌 [ShareMealPage 컴포넌트]
// - 사용자가 자신이 좋아하는 식사를 공유할 수 있는 페이지
// - 사용자 정보를 입력하고, 식사의 제목, 요약, 조리법, 이미지를 입력하는 폼을 포함
// - `ImagePicker` 컴포넌트를 사용하여 이미지를 선택 가능
'use client';
import ImagePicker from '@/components/meals/image-picker'; // 이미지 선택을 위한 ImagePicker 컴포넌트
import MealsFormSubmit from '@/components/meals/meals-form-submit';
import { shareMeal } from '@/lib/actions'; // Server Action 제출 import
import { useActionState } from 'react';
import classes from './page.module.css'; // 페이지 전용 CSS 모듈을 가져옴

export default function ShareMealPage() {
  const [state, formAction] = useActionState(shareMeal, { message: null });
  return (
    <>
      {/* 페이지의 헤더 영역 */}
      <header className={classes.header}>
        <h1>
          Share your <span className={classes.highlight}>favorite meal</span>
          {/* 강조 표시된 텍스트 (CSS로 스타일링) */}
        </h1>
        <p>Or any other meal you feel needs sharing!</p>{' '}
        {/* 사용자에게 설명을 제공하는 문구 */}
      </header>

      {/* 메인 콘텐츠 영역 */}
      <main className={classes.main}>
        {/* 식사를 공유하는 폼 */}
        <form className={classes.form} action={formAction}>
          {/* 사용자 정보 입력 필드 (이름 & 이메일) */}
          <div className={classes.row}>
            <p>
              <label htmlFor="name">Your name</label>{' '}
              {/* 이름 입력 필드 레이블 */}
              <input
                type="text"
                id="name"
                name="name"
                required
                defaultValue={state.previousData?.creator || ''}
              />
              {/* 이름 입력 필드 (필수 입력) */}
            </p>
            <p>
              <label htmlFor="email">Your email</label>{' '}
              {/* 이메일 입력 필드 레이블 */}
              <input
                type="email"
                id="email"
                name="email"
                required
                defaultValue={state.previousData?.creator_email || ''}
              />
              {/* 이메일 입력 필드 (필수 입력) */}
            </p>
          </div>
          {/* 식사 정보 입력 필드 */}
          <p>
            <label htmlFor="title">Title</label> {/* 식사 제목 입력 */}
            <input
              type="text"
              id="title"
              name="title"
              required
              defaultValue={state.previousData?.title || ''}
            />
          </p>
          <p>
            <label htmlFor="summary">Short Summary</label>
            {/* 식사에 대한 짧은 설명 입력 */}
            <input
              type="text"
              id="summary"
              name="summary"
              required
              defaultValue={state.previousData?.summary || ''}
            />
          </p>
          {/* 조리법 입력 필드 */}
          <p>
            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              name="instructions"
              rows="10"
              required
              defaultValue={state.previousData?.instructions || ''}
            ></textarea>
            {/* 조리법 입력 (여러 줄 입력 가능) */}
          </p>
          {/* 이미지 선택 기능 (ImagePicker 컴포넌트) */}
          <ImagePicker label="Your image" name="image" />
          {state.message && <p>{state.message}</p>}
          {/* 사용자가 이미지를 선택할 수 있도록 함 */}
          {/* 제출 버튼 */}
          <p className={classes.actions}>
            <MealsFormSubmit />
            {/* 식사 공유 버튼 (폼 제출) */}
          </p>
        </form>
      </main>
    </>
  );
}
