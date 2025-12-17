import { TokenEncoded } from "../../lib/token.js";

export const generateToken = async (req, res, collection) => {
  const { userEmail } = req.params;
  if (!userEmail) {
    return res.status(404).json({
      success: true,
      message: "User Email not found",
      data: null,
    });
  }

  const userInfo = await collection.findOne({ email: userEmail });

  if (!userInfo) {
    return res.status(404).json({
      success: true,
      message: "User not found",
      data: null,
    });
  }

  const payload = {
    userId: userInfo._id,
    email: userInfo.email,
    role: userInfo.role,
    status: userInfo.status,
    chefId: userInfo.chefId,
  };

  const token = TokenEncoded(payload);

  // Save token in HTTP Cookies
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  return token;
};
