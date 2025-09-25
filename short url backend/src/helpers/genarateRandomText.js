function generateRandomText() {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';
  const textLength = 6;

  for (let i = 0; i < textLength; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }

  return result;
}

module.exports = generateRandomText
