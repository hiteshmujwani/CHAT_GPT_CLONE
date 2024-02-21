import bcryptjs from "bcryptjs";

export const hashPassword = async (password) => {
  try {
    const hashedPassword = await bcryptjs.hash(password, 10);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const matchPassword = async (loginPassword, password) => {
  try {
    const comparePassword = await bcryptjs.compare(loginPassword, password);
    return comparePassword;
  } catch (error) {
    console.log(error);
  }
};
