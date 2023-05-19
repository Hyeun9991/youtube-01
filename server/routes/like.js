const express = require('express');
const router = express.Router();
const { Like } = require('../models/Like');
const { Dislike } = require('../models/Dislike');

//=================================
//             Like
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

// 좋아요 올리기
router.post('/upLike', async (req, res) => {
  try {
    let variable = {};

    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    // Like collection에 클릭 정보 넣기
    const like = new Like(variable);

    like.save();

    // 만약에 Dislike이 이미 클릭이 되어있다면, Dislike 1 줄여준다.
    const dislikeResult = await Dislike.findOneAndDelete(variable).exec();

    return res.status(200).json({ success: true, dislikeResult });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 좋아요 내리기
router.post('/unLike', async (req, res) => {
  try {
    let variable = {};

    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    // Like collection에서 삭제
    const likeResult = await Like.findOneAndDelete(variable);

    return res.status(200).json({ success: true, likeResult });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 싫어요 내리기
router.post('/unDislike', async (req, res) => {
  try {
    let variable = {};

    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    // Dislike collection에서 삭제
    const dislikeResult = await Dislike.findOneAndDelete(variable);

    return res.status(200).json({ success: true, dislikeResult });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// 싫어요 올리기
router.post('/upDislike', async (req, res) => {
  try {
    let variable = {};

    if (req.body.videoId) {
      variable = { videoId: req.body.videoId, userId: req.body.userId };
    } else {
      variable = { commentId: req.body.commentId, userId: req.body.userId };
    }

    // Dislike collection에 클릭 정보 넣기
    const dislike = new Dislike(variable);

    dislike.save();

    // 만약에 Like이 이미 클릭이 되어있다면, Like 1 줄여준다.
    const dislikeResult = await Like.findOneAndDelete(variable).exec();

    return res.status(200).json({ success: true, dislikeResult });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
