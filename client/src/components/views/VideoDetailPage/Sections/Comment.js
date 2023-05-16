import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';

function Comment(props) {
  const user = useSelector((state) => state.user); // redux store에서 user.userData 가져오기

  const [commentValue, setCommentValue] = useState('');

  const handleClick = (e) => {
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const commentVariables = {
      content: commentValue,
      writer: user.userData._id,
      videoId: props.videoId,
    };

    // 댓글 작성자, 댓글 내용 등을 DB에 넣기
    axios
      .post('/api/comment/saveComment', commentVariables)
      .then((response) => {
        if (response.data.success) {
          props.refreshFunction(response.data.newCommentData);
          setCommentValue('');
        } else {
          alert('댓글작성에 실패했습니다.');
        }
      });
  };

  console.log(props.commentLists);

  return (
    <Container>
      <CommentTitle>댓글 {props.commentLists.length}개</CommentTitle>

      {/* Root Comment Form */}
      <RootCommentForm action="" onSubmit={onSubmit}>
        <MainComment>
          <UserImageContainer>
            <img src="" />
          </UserImageContainer>
          <CommentTextarea
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="댓글 추가..."
            value={commentValue}
            onChange={handleClick}
          />
          <SubmitButton onClick={onSubmit}>댓글</SubmitButton>
        </MainComment>
      </RootCommentForm>

      {/* Comment Lists, 내림차순으로 화면에 출력 */}
      {props.commentLists &&
        props.commentLists
          .slice()
          .reverse()
          .map(
            (comment) =>
              // responseTo가 없는 댓글만 화면에 출력
              !comment.responseTo && (
                <SingleComment
                  key={comment._id}
                  comment={comment}
                  videoId={props.videoId}
                  refreshFunction={props.refreshFunction}
                />
              )
          )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
const CommentTitle = styled.p`
  margin-bottom: 1.5rem;
`;
const CommentLists = styled.div``;
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
const RootCommentForm = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 1rem;
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

export default Comment;
