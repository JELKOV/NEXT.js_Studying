'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { saveMeal } from './meal';

function isInvalidText(text) {
  return !text || text.trim() === '';
}

export async function shareMeal(previousState, formData) {
  const meal = {
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('image'),
    creator: formData.get('name'),
    creator_email: formData.get('email'),
  };

  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return {
      message: 'Invalid input.',
      previousData: meal,
    }; // ❗ 리다이렉트 없이 오류 메시지 반환
  }

  await saveMeal(meal);
  revalidatePath('/meals');
  redirect('/meals'); // ✅ 성공 시 리다이렉트 (상태 유지 X)
}
