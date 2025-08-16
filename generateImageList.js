import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const imagesDir = path.join(__dirname, 'public', 'tn');
const outputFile = path.join(__dirname, 'src', 'imageList.json');

// Supported extensions
const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.svg', '.mp4'];

fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    process.exit(1);
  }
  // Output all image files
  const imageFiles = files.filter(f => imageExts.includes(path.extname(f).toLowerCase()));
  fs.writeFileSync(outputFile, JSON.stringify(imageFiles, null, 2), 'utf8');
  console.log(`Wrote ${imageFiles.length} image files to src/imageList.json`);
});
