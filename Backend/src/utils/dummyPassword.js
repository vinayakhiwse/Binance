const generateDummyPassword = () => {
  const length = 8;
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";

  // Generate a random uppercase letter
  const randomUppercase =
    uppercaseChars[Math.floor(Math.random() * uppercaseChars.length)];

  // Generate 7 random characters (including numbers and lowercase letters)
  const randomChars = Array.from({ length: length - 2 }, () => {
    const allChars = uppercaseChars + "abcdefghijklmnopqrstuvwxyz" + numbers;
    return allChars[Math.floor(Math.random() * allChars.length)];
  });

  // Shuffle the array of characters
  const shuffledChars = [randomUppercase, ...randomChars].sort(
    () => Math.random() - 0.5
  );

  // Join the characters to form the password
  const password = shuffledChars.join("");

  return password;
};

module.exports = generateDummyPassword;
