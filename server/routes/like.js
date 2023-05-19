const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//            Like
//=================================

// Like 콜렉션에서 좋아요(video/comment) 데이터 가져오기
router.post('/getLikes', async (req, res) => {
  try {
    let variable = {};

    if (req.body.videoId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { commentId: req.body.commentId };
    }

    const likes = await Like.find(variable).exec();

    return res.status(200).json({ success: true, likes });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Dislike 콜렉션에서 싫어요(video/comment) 데이터 가져오기
router.post('/getDislikes', async (req, res) => {
  try {
    let variable = {};

    if (req.body.videoId) {
      variable = { videoId: req.body.videoId };
    } else {
      variable = { commentId: req.body.commentId };
    }

    const dislikes = await Dislike.find(variable).exec();

    return res.status(200).json({ success: true, dislikes });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
