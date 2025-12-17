export const VerifyIsAdmin = async (req, res, next) => {
  const userInfo = req.headers.userInfo;
  if (!userInfo || !userInfo.role) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  if (userInfo.role !== "admin") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};

export const VerifyIsChef = async (req, res, next) => {
  const userInfo = req.headers.userInfo;
  if (!userInfo || !userInfo.role) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  if (userInfo.role !== "chef") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};

export const VerifyIsUser = async (req, res, next) => {
  const userInfo = req.headers.userInfo;
  if (!userInfo || !userInfo.role) {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }

  if (userInfo.role !== "user") {
    return res.status(403).json({ success: false, message: "Forbidden" });
  }
  next();
};
