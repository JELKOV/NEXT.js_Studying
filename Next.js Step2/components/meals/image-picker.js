'use client'; // Next.js에서 클라이언트 컴포넌트로 지정 (브라우저에서 실행됨)

import Image from 'next/image'; // Next.js의 최적화된 Image 컴포넌트 사용
import { useRef, useState } from 'react'; // 상태 관리(useState)와 DOM 요소 접근(useRef)을 위한 React 훅 불러오기
import classes from './image-picker.module.css'; // CSS 모듈을 임포트하여 스타일 적용

export default function ImagePicker({ label, name }) {
  // 파일 입력 필드를 직접 조작하기 위한 ref 생성
  const imageInput = useRef();

  // 선택된 이미지를 저장하는 상태 (초기값은 null)
  const [pickedImage, setPickedImage] = useState(null);

  // 사용자 정의 버튼을 클릭하면 input 요소의 파일 선택 창을 여는 함수
  function handlePickClick() {
    imageInput.current.click(); // 숨겨진 input 요소를 클릭하여 파일 선택 창 활성화
  }

  // 사용자가 파일을 선택했을 때 실행되는 핸들러
  function handleImageChange(event) {
    const file = event.target.files[0]; // 사용자가 선택한 첫 번째 파일 가져오기

    // 사용자가 파일을 선택하지 않은 경우 상태를 초기화하고 함수 종료
    if (!file) {
      setPickedImage(null);
      return;
    }

    // FileReader 객체를 생성하여 파일을 읽음
    const fileReader = new FileReader();

    // 파일 읽기가 완료되었을 때 실행될 이벤트 핸들러
    fileReader.onload = () => {
      setPickedImage(fileReader.result); // 읽은 파일의 데이터 URL을 상태에 저장하여 미리보기에 사용
    };

    // 파일을 Data URL 형식으로 읽어 들임 (브라우저에서 미리보기에 사용 가능)
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={classes.picker}>
      {/* 이미지 선택 필드의 라벨 (label prop을 사용하여 유동적인 제목 설정 가능) */}
      <label htmlFor={name}>{label}</label>

      <div className={classes.controls}>
        {/* 선택된 이미지 미리보기 */}
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet.</p>}{' '}
          {/* 선택된 이미지가 없을 경우 메시지 표시 */}
          {pickedImage && (
            <Image
              src={pickedImage} // FileReader로 변환된 데이터 URL 사용
              alt="The image selected by the user" // 접근성을 위한 alt 텍스트
              fill // 부모 요소 크기에 맞춰 자동 조정 (Next.js의 Image 최적화 기능 활용)
            />
          )}
        </div>

        {/* 숨겨진 파일 입력 필드 */}
        <input
          className={classes.input} // 숨김 처리된 input 필드
          type="file" // 파일 선택 입력 필드
          id={name} // 라벨과 연결될 고유 ID
          name={name} // form 제출 시 사용될 name 값
          accept="image/png, image/jpeg" // 허용되는 파일 유형 (PNG, JPEG)
          ref={imageInput} // useRef를 통해 접근 가능하게 설정
          onChange={handleImageChange} // 파일 선택 시 실행될 핸들러 함수 지정
          required // 필수 입력 필드로 설정
        />

        {/* 사용자가 클릭할 버튼 (숨겨진 input을 클릭하도록 유도) */}
        <button
          type="button"
          className={classes.button}
          onClick={handlePickClick}
        >
          Pick an image
        </button>
      </div>
    </div>
  );
}
