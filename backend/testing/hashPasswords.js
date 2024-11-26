// hashPasswords.js
import bcrypt from 'bcrypt';

const generateHashedPassword = async (plainPassword) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
  console.log(`Hashed password for "${plainPassword}": ${hashedPassword}`);
};

// Example passwords for HOD and Staff
generateHashedPassword('hod1234');
generateHashedPassword('stafffs1234');
generateHashedPassword('staffml1234');
