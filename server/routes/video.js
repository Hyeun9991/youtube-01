const express = require('express');
const router = express.Router();
const { Video } = require('../models/Video');
const { Subscriber } = require('../models/Subscriber');
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

// 유저가 구독한 사람들을 찾고, 찾은 사람들의 비디오 데이터를 client에 전달
router.post('/getSubscriptionVideos', async (req, res) => {
  try {
    // 1. 로컬스토리지에 저장된 유저의 아이디를 가지고 구독하는 사람들을 찾음
    const subscriberInfo = await Subscriber.find({
      userFrom: req.body.userFrom,
    }).exec();

    let subscribedUser = [];

    // 유저가 구독한 사람들의 아이디를 담음.
    subscriberInfo.map((subscriber) => {
      subscribedUser.push(subscriber.userTo);
    });

    // 2. 찾은 사람들의 비디오를 가지고 client에 전달
    // $in: subscribedUser에 들어있는 모든 사람들의 아이디를 가지고 writer를 찾을 수 있음.
    const videos = await Video.find({ writer: { $in: subscribedUser } })
      .populate('writer')
      .exec();

    return res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// id를 이용해서 비디오 데이터를 찾은 다음 client에 전달
router.post('/getVideoDetail', async (req, res) => {
  try {
    // 클라이언트에서 보낸 videoId를 이용해서 비디오를 찾음
    // populate: 유저의 모든 데이터 (이미지, 이름, 다른데이터까지 다 가져옴)
    const videoDetail = await Video.findOne({ _id: req.body.videoId }).populate(
      'writer'
    );
    return res.status(200).json({ success: true, videoDetail });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// 비디오를 mongoDB에서 가져와서 client에 전달
router.get('/getVideo', async (req, res) => {
  try {
    const videos = await Video.find().populate('writer').exec();
    res.status(200).json({ success: true, videos });
  } catch (err) {
    return res.status(400).send(err);
  }
});

// 비디오 데이터들을 mongoDB에 저장
router.post('/uploadVideo', async (req, res) => {
  const video = new Video(req.body);

  await video
    .save()
    .then(() => {
      res.status(200).json({
        success: true,
      });
    })
    .catch((err) => {
      console.log(err);
      res.json({
        success: false,
        err: err,
      });
    });
});

// 비디오 데이터를 이용해서 썸네일을 생성 하고 데이터를 client에 전달
router.post('/thumbnail', (req, res) => {
  let filePath = '';
  let fileDuration = '';

  // 비디오 데이터 가져오기
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
    // 썸네일 생성 성공하면 데이터 전달
    .on('end', function () {
      console.log('Screenshots taken');

      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      });
    })
    // 에러 처리
    .on('error', function (err) {
      console.log(err);

      return res.json({ success: false, err });
    })
    // 썸네일 옵션
    .screenshots({
      count: 3, // 3개의 썸네일을 찍을 수 있음
      folder: 'uploads/thumbnails', // 저장 폴더
      size: '320x240', // 썸네일 사이즈
      filename: 'thumbnail-%b.png', // 파일 이름 (extension은 뺀 이름)
    });
});

module.exports = router;
