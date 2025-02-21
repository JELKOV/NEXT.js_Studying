import fs from 'node:fs';

import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';

const db = sql('meals.db');

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // throw new Error('Loading meals failed')
  return db.prepare('SELECT * FROM meals').all();
}

export function getMeal(slug) {
  return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug);
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  // 이미지 확장자 추출
  const extension = meal.image.name.split('.').pop();
  console.log(`DEBUG(extension): ${extension}`);
  const fileName = `${meal.slug}.${extension}`;
  console.log(`DEBUG(fileName): ${fileName}`);

  // 파일 저장
  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = Buffer.from(await meal.image.arrayBuffer());

  stream.write(bufferedImage, (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  // 데이터베이스에 이미지 경로 저장
  meal.image = `/images/${fileName}`;
  const stmt = db
    .prepare(
      `
        INSERT INTO meals (title, slug, summary, instructions, creator, creator_email, image)
        VALUES (@title, @slug, @summary, @instructions, @creator, @creator_email, @image)
    `
    )
    .run(meal);
}
