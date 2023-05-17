import React, { useEffect, useState } from 'react';
import { AiFillCaretRight } from 'react-icons/ai';
import styled from 'styled-components';
import SingleComment from './SingleComment';

function ReplyComment({
  commentLists,
  parentCommentId,
  videoId,
  refreshFunction,
}) {
  const [ChildCommentNumber, setChildCommentNumber] = useState(0);
  const [OpenReplyComments, setOpenReplyComments] = useState(false);

  useEffect(() => {
    let commentNumber = 0; // 답글 개수

    commentLists.forEach((comment) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    });

    setChildCommentNumber(commentNumber);
  }, [commentLists, parentCommentId]); // 답글이 달려도 바로 화면에 출력

  // 답글이 출력안되는 에러 해결 => 중괄호는 return을 해줘야 한다.
  const renderReplyComment = (parentCommentId) => {
    return commentLists.map((comment) => (
      <React.Fragment key={comment._id}>
        {comment.responseTo === parentCommentId && (
          <ReplyCommentContainer>
            <SingleComment
              comment={comment}
              videoId={videoId}
              refreshFunction={refreshFunction}
            />
            <ReplyComment
              commentLists={commentLists}
              videoId={videoId}
              parentCommentId={comment._id}
              refreshFunction={refreshFunction}
            />
          </ReplyCommentContainer>
        )}
      </React.Fragment>
    ));
  };

  const onHandleChange = () => {
    setOpenReplyComments(!OpenReplyComments);
  };

  return (
    <div>
      {/* 답글이 있을때만 화면에 출력 */}
      {ChildCommentNumber > 0 && (
        <MoreButton onClick={onHandleChange}>
          <AiFillCaretRight
            className={OpenReplyComments ? 'close-icon icon' : 'icon'}
          />{' '}
          답글 {ChildCommentNumber}개
        </MoreButton>
      )}

      {OpenReplyComments && renderReplyComment(parentCommentId)}
    </div>
  );
}

const ReplyCommentContainer = styled.div`
  width: 90%;
  margin-left: 56px;
  margin-top: -1rem;
`;
const MoreButton = styled.button`
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #085ed4;
  font-size: 14px;
  line-height: 36px;
  padding: 0 16px;
  width: auto;
  border: none;
  border-radius: 18px;
  margin-left: 56px;
  cursor: pointer;

  .icon {
    transform: rotate(90deg);
  }

  .close-icon {
    transform: rotate(270deg);
  }

  &:hover {
    background-color: #085ed430;
  }
`;

export default ReplyComment;
