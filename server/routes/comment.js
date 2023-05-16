const express = require('express');
const router = express.Router();
const { Comment } = require('../models/Comment');

//=================================
//           Comment
//=================================

// 사용자가 입력한 댓글 정보를 받아와서 DB에 저장하고 해당 댓글의 작성자 정보를 가져와서 반환
router.post('/saveComment', async (req, res) => {
  try {
    const comment = new Comment(req.body);

    await comment.save();

    const newCommentData = await Comment.find({ _id: comment._id })
      .populate('writer')
      .sort({ _id: -1 })
      .exec();

    return res.status(200).json({ success: true, newCommentData });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

router.post('/getComments', async (req, res) => {
  try {
    const comments = await Comment.find({ videoId: req.body.videoId })
      .populate('writer')
      .exec();

    return res.status(200).json({ success: true, comments });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
