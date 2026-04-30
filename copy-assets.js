const fs = require('fs');
const path = require('path');

const srcFiles = [
    'core-team.jpg.jpg', 'ethos1.jpg.jpg', 'ethos2.jpg.jpg',
    'accountability1.jpg.jpg', 'accountability2.jpg.jpg',
    'transparency1.jpg.jpg', 'transparency2.jpg.jpg',
    'growth1.jpg.jpg', 'growth2.jpg.jpg', 'growth3.jpg.jpg', 'team.jpg.jpg'
];

const destDir = path.join(__dirname, 'src', 'assets');
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
}

srcFiles.forEach(file => {
    const srcPath = path.join(__dirname, file);
    // Replace .jpg.jpg with .jpg
    const newName = file.replace('.jpg.jpg', '.jpg').replace('.png.png', '.png');
    const destPath = path.join(destDir, newName);
    
    if (fs.existsSync(srcPath)) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Copied ${file} to ${destPath}`);
    } else {
        console.log(`File not found: ${srcPath}`);
    }
});
