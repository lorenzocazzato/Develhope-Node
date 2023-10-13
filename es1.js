const crypto = require("crypto");

function generateRandomId(length) {
  return crypto.randomBytes(length).toString("hex");
}

const randomId = generateRandomId(6); // Generate a random ID with 16 bytes (32 hexadecimal characters)
console.log("Random ID:", randomId);
