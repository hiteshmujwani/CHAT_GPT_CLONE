import Jwt from "jsonwebtoken";
export const requireSignin = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).send({
        success: false,
        message: "Please Login",
      });
      return;
    }
    const decode = await Jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
