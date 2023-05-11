const express = require('express');
const router = express.Router();
// const { Video } = require('../models/Video');
const { auth } = require('../middleware/auth');
const multer = require('multer');

//=================================
//             Video
//=================================

// storage multer config
const storage = multer.diskStorage({
  // 저장 폴더
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },

  // 파일 이름
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

// 파일 필터
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'video/mp4') {
    cb(null, true);
  } else {
    cb({ msg: 'mp4 파일만 업로드 가능합니다.' }, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  'file'
);

router.post('/uploadfiles', (req, res) => {
  // 비디오를 서버에 저장
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

module.exports = router;
