const { User } = require("../models/User");

// 인증 처리 미들웨어
let auth = async (req, res, next) => {
  try {
    // client cookie에서 token을 가져옴
    const token = req.cookies.x_auth;

    // token을 복호화한 후 유저를 찾음
    const user = await User.findByToken(token);

    if (!user) {
      return res.json({ isAuth: false, error: true });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { auth };
