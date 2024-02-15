import jwt from "jsonwebtoken";
import "dotenv/config";

const auth = (req, res, next) => {
  const token = req.headers.authorization || req.headers.Authorization;

  try {
    if (!token) {
      throw new Error('Token not provided');
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export default auth;
