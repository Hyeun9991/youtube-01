import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

function SingleComment({ comment, videoId, refreshFunction }) {
  const user = useSelector((state) => state.user); // redux store에서 user.userData 가져오기

  const [OpenReply, setOpenReply] = useState(false);
  const [CommentValue, setCommentValue] = useState('');

  const onClickReplyOpen = () => {
    setOpenReply(!OpenReply);
  };

  const onHandleChange = (e) => {
    // CommentValue => value (mongoDB에 content가 저장안되는 오류 해결)
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const commentVariables = {
      content: CommentValue,
      writer: user.userData._id,
      videoId: videoId,
      responseTo: comment._id,
    };

    // 댓글 작성자, 댓글 내용 등을 DB에 넣기
    axios
      .post('/api/comment/saveComment', commentVariables)
      .then((response) => {
        if (response.data.success) {
          refreshFunction(response.data.newCommentData);
          setCommentValue('');
          setOpenReply(false);
        } else {
          alert('댓글작성에 실패했습니다.');
        }
      });
  };

  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to">
      답글
    </span>,
  ];

  return (
    <SingleCommentContainer>
      <UserImageContainer>
        {comment.writer.image && (
          <img src={comment.writer.image} alt="작성자 이미지" />
        )}
      </UserImageContainer>
      <CommentContainer>
        <UserName>{comment.writer.name}</UserName>
        <ContentText>{comment.content}</ContentText>
        <Actions>{actions}</Actions>
        {OpenReply && (
          <ReplyCommentForm action="" onSubmit={onSubmit}>
            <MainComment>
              <SmUserImageContainer>
                {comment.writer.image && <img src="" />}
              </SmUserImageContainer>
              <CommentTextarea
                name=""
                id=""
                cols="30"
                rows="1"
                placeholder="댓글 추가..."
                value={CommentValue}
                onChange={onHandleChange}
              />
              <SubmitButton onClick={onSubmit}>댓글</SubmitButton>
            </MainComment>
          </ReplyCommentForm>
        )}
      </CommentContainer>
    </SingleCommentContainer>
  );
}

const SingleCommentContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;
const CommentContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ReplyCommentForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const MainComment = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const UserImageContainer = styled.div`
  background-color: black;
  width: 40px;
  height: 40px;
  border-radius: 50%;

  img {
    width: 100%;
  }
`;
const SmUserImageContainer = styled.div`
  background-color: black;
  width: 20px;
  height: 20px;
  border-radius: 50%;

  img {
    width: 100%;
  }
`;
const CommentTextarea = styled.textarea`
  height: 25px;
  flex: 1;
  resize: none;
  border: none;
  outline: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 4px;
  font-family: 'Roboto', 'Arial', sans-serif;
  transition: all 0.3s;

  &:focus {
    border-color: #000;
  }
`;
const SubmitButton = styled.button`
  background-color: #000;
  color: #fff;
  border: none;
  padding: 0 16px;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  text-transform: none;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
  cursor: pointer;
`;
const UserName = styled.p`
  font-size: 13px;
`;
const ContentText = styled.p`
  font-size: 14px;
`;
const Actions = styled.div`
  background-color: transparent;
  font-size: 13px;
  width: 44px;
  height: 32px;
  border-radius: 18px;
  text-transform: none;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    background-color: #f2f2f2;
    color: #000;
  }
`;

export default SingleComment;
