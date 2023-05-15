const express = require('express');
const router = express.Router();
const { User } = require('../models/User');
const { auth } = require('../middleware/auth');

//=================================
//             User
//=================================

// 인증
router.get('/auth', auth, async (req, res) => {
  try {
    // auth 미들웨어를 통과했다면 client에 데이터 전달
    res.status(200).json({
      _id: req.user._id,
      isAdmin: req.user.role === 0 ? false : true,
      isAuth: true,
      email: req.user.email,
      name: req.user.name,
      lastname: req.user.lastname,
      role: req.user.role,
      image: req.user.image,
    });
  } catch (err) {
    next(err);
  }
});

// 회원가입
router.post('/register', async (req, res) => {
  const user = new User(req.body); // 인스턴스 생성

  // client에서 전달받은 data를 User Model(DB)에 저장
  await user
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      res.json({
        success: false,
        err: err,
      });
    });
});

// 로그인
router.post('/login', async (req, res) => {
  try {
    // 요청된 email을 DB에서 찾기
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: '제공된 이메일에 해당하는 유저가 없습니다.',
      });
    }

    // 요청된 email이 있다면 password가 일치하는지 확인
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.json({
        loginSuccess: false,
        message: '비밀번호가 틀렸습니다.',
      });
    }

    // Password가 일치하면 token 생성
    const token = await user.generateToken();

    // token을 cookie에 저장
    res
      .cookie('x_auth', token)
      .status(200)
      .json({ loginSuccess: true, userId: user._id });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// 로그아웃
router.get('/logout', auth, async (req, res) => {
  try {
    // auth middleware에서 가져와서 찾음
    const user = await User.findOneAndUpdate(
      { _id: req.user._id },
      { token: '' }
    );

    if (!user) {
      return res.json({ success: false, message: 'Failed to logout' });
    }

    return res.status(200).send({ success: true });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
