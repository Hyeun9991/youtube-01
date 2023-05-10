const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const saltRounds = 10; // saltRounds: salt가 몇 글자인지 정의
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, // 공백 없앰
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastName: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    // 토큰  유효기간
    type: Number,
  },
});

// User 모델의 password 필드가 변경될 때만 해당 비밀번호를 암호화해서 저장하는 코드
// save() 메소드가 실행되기 전에 pre-hook 함수를 실행
userSchema.pre("save", function (next) {
  var user = this;

  // User Model안 field중에 password가 변환 될 때만 실행
  if (user.isModified("password")) {
    // 비밀번호를 암호화
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);

      // user.password: 플레인 비밀번호 / hash: 암호화된 비밀번호
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 비밀번호 확힌 메소드
userSchema.methods.comparePassword = async function (plainPassword) {
  const user = this; // this = userSchema
  try {
    return await bcrypt.compare(plainPassword, user.password);
  } catch (err) {
    throw new Error(err);
  }
};

// 토큰 생성 메소드
userSchema.methods.generateToken = async function () {
  const user = this;

  const token = jwt.sign(user._id.toHexString(), "secretToken");

  user.token = token;
  await user.save();

  return token;
};

// 토큰 복호화 메소드
userSchema.statics.findByToken = async function (token) {
  const user = this;

  // 유저 아이디를 이용해서 유저를 찾은 다음에
  // 클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인

  try {
    const decoded = jwt.verify(token, "secretToken");
    const foundUser = await user.findOne({ _id: decoded, token: token });
    return foundUser;
  } catch (err) {
    throw err;
  }
};

// model로 schema 감싸기
const User = mongoose.model("User", userSchema);

module.exports = { User };
