// backend server
const express = require('express');
const app = express();
const config = require('./config/key');
const cookieParser = require('cookie-parser');

// mongoose 연결
const mongoose = require('mongoose');
mongoose
  .connect(config.mongoURI)
  .then(() => {
    console.log('MongoDB Connected...');
  })
  .catch((err) => console.log(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(cookieParser());

app.use('/api/users', require('./routes/users'));
app.use('/api/video', require('./routes/video'));
app.use('/api/subscribe', require('./routes/subscribe'));
app.use('/api/comment', require('./routes/comment'));
app.use('/api/like', require('./routes/like'));

// 프로덕션 중인 경우 정적 애셋 제공
if (process.env.NODE_ENV === 'production') {
  // 정적 폴더 설정
  app.use(express.static('/client/build'));

  // 모든 페이지 경로에 대한 index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// port 연결 확인
const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Server Running at ${port}`));
