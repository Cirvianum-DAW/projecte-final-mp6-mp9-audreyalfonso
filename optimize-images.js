const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const inputDir = "src/images";
const outputDir = "src/output";

fs.readdirSync(inputDir).forEach((file) => {
  const inputPath = path.join(inputDir, file);
  const outputFileName = file.replace(/\.(png|jpg|jpeg)$/, ".webp");
  const outputPath = path.join(outputDir, outputFileName);

  sharp(inputPath)
    .webp({ quality: 50 })
    .toFile(outputPath, (err, info) => {
      if (err) {
        console.log("Error al processar l'arxiu");
      } else {
        console.log("Imatge optimitzada correctament");
      }
    });
});
