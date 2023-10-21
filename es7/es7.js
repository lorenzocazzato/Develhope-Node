const fs = require("fs");

const textContent = "Text";

const filePath =
  "/Users/lorenzocazzato/Desktop/Develhope2/Node-Es/Develhope-Node/es7/testo.txt";

fs.writeFile(filePath, textContent, (err) => {
  if (err) {
    console.error("Error writing to the file:", err);
  } else {
    console.log(`Successfully wrote to ${filePath}`);
  }
});
