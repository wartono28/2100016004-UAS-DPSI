const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  console.log(token);
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
  try {
    const decoded = jwt.verify(token, "mabduh");
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Token is not valid" });
  }
};

/* membuat sebuah fungsi untuk mengecek role seriap user
yang telah disesuaikan melalui parameter,

ketika pengguna tidak mempunyai mempunyai atau tidak sesuai role,
meka akan mengembalkikan pesan forbidden,
jika berhasil maka proses akan dilanjutkan.
*/ 
const authorize = (roles = []) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }
    next();
  };
};
module.exports = { authenticate, authorize };
