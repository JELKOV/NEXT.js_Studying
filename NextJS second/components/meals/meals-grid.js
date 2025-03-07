import MealItem from './meal-item'; // 개별 식사 아이템을 표시하는 MealItem 컴포넌트 불러오기
import classes from './meals-grid.module.css'; // CSS 모듈을 불러와서 스타일 적용

// MealsGrid 컴포넌트: 여러 개의 식사 아이템을 그리드 형태로 출력하는 역할
export default function MealsGrid({ meals }) {
  return (
    <ul className={classes.meals}>
      {/* 식사 목록을 감싸는 <ul> 태그 (CSS 스타일 적용) */}
      {meals.map(
        (
          meal // meals 배열을 순회하면서 각 meal 데이터를 렌더링
        ) => (
          <li key={meal.id}>
            {/* 각 식사 항목을 <li>로 감싸고, 고유한 key 값 설정 */}
            <MealItem {...meal} />
            {/* MealItem 컴포넌트에 meal 객체의 모든 속성을 전달 (전개 연산자 사용) */}
          </li>
        )
      )}
    </ul>
  );
}
