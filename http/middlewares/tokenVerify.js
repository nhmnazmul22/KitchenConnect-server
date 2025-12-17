import { TokenDecoded } from "../../lib/token.js";

export const VerifyToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const decoded = TokenDecoded(token);

  if (!decoded) {
    res.status(401).json({ success: false, message: "Unauthorized" });
  }

  req.headers.userInfo = decoded;
  next();
};
