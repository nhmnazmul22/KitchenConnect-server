export const VerifyIsFraud = async (req, res, next) => {
  const userInfo = req.headers.userInfo;
  if (!userInfo || !userInfo.status) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  if (userInfo.status === "fraud") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};
