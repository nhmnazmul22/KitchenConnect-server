import jwt from "jsonwebtoken";

export const TokenEncoded = (payload, expiresIn = "7d") => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: expiresIn,
  });

  if (!token) {
    return null;
  }

  return token;
};

export const TokenDecoded = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return null;
  }

  return decoded;
};
