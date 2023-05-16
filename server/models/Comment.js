const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = mongoose.Schema(
  {
    writer: {
      // 댓글 작성자
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    videoId: {
      // 비디오 아이디
      type: Schema.Types.ObjectId,
      ref: 'Video',
    },
    responseTo: {
      // 답댓글 받는 사람
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    content: {
      // 댓글 내용
      type: String,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

module.exports = { Comment };
