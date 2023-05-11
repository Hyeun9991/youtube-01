const express = require('express');
const router = express.Router();
// const { Video } = require('../models/Video');
const { auth } = require('../middleware/auth');
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');

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

//=================================
//             Video
//=================================

// 비디오를 서버에 저장
router.post('/uploadfiles', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.json({ success: false, err });

    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

// 썸네일 생성 하고 비디오 러닝타임도 가져오기
router.post('/thumbnail', (req, res) => {
  let filePath = '';
  let fileDuration = '';

  // 비디오 정보가져오기
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    // req.body.url: uploads 폴더안에 mp4 파일
    console.dir(metadata);
    console.log(metadata.format.duration);

    fileDuration = metadata.format.duration;
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
    // req.body.url: client에서 받은 비디오 저장 경로

    // 비디오 썸네일 파일 이름 생성
    .on('filenames', function (filenames) {
      console.log('Will generate' + filenames.join(','));
      console.log(filenames);

      filePath = 'uploads/thumbnails/' + filenames[0];
    })
    // 썸네일 생성 성공하면 success true, 썸네일 저장 경로, 이름, 러닝 타임 전달
    .on('end', function () {
      console.log('Screenshots taken');

      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    // 에러가 발생하면 무엇을 할 것인지
    .on('error', function (err) {
      console.log(err);

      return res.json({ success: false, err });
    })
    // option
    .screenshots({
      count: 3, // 3개의 썸네일을 찍을 수 있음
      folder: 'uploads/thumbnails', // 저장 폴더
      size: '320x240', // 썸네일 사이즈
      filename: 'thumbnail-%b.png', // 파일 이름 (extension은 뺀 이름)
    });
});

module.exports = router;
