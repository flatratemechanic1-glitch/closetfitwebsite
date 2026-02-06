import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { join, parse } from 'path';

const INPUT_DIR = 'src/assets/screenshots';
const OUTPUT_DIR = 'public/screenshots';
const MAX_HEIGHT = 1024;
const QUALITY = 80;

async function main() {
  await mkdir(OUTPUT_DIR, { recursive: true });

  const files = await readdir(INPUT_DIR);
  const pngs = files.filter((f) => f.endsWith('.png'));

  console.log(`Optimizing ${pngs.length} screenshots to WebP...`);

  for (const file of pngs) {
    const { name } = parse(file);
    const inputPath = join(INPUT_DIR, file);
    const outputPath = join(OUTPUT_DIR, `${name}.webp`);

    const info = await sharp(inputPath)
      .resize({ height: MAX_HEIGHT, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outputPath);

    console.log(`  ${file} → ${name}.webp (${(info.size / 1024).toFixed(0)}KB)`);
  }

  console.log('Done.');
}

main().catch(console.error);
