import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from 'react-icons/ai';
import axios from 'axios';

function LikeDislike({ video, userId, videoId, commentId }) {
  // let likeVariable = {};

  // // video: VideoDetailPage에서 전달받은 props
  // if (video) {
  //   // video에 대한 props
  //   likeVariable = { videoId: videoId, userId: userId };
  // } else {
  //   // comment에 대한 props
  //   likeVariable = { commentId: commentId, userId: userId };
  // }

  // // 현재 좋아요, 싫어요에 대한 데이터를 mongoDB에서 가져오기
  // useEffect(() => {
  //   // axios.post('/api/like/getLikes', likeVariable).then((response) => {
  //   //   if (response.data.success) {
  //   //   } else {
  //   //     alert('Like 데이터를 가져오지 못했습니다.');
  //   //   }
  //   // });
  // }, []);

  return (
    <LikeDislikeContainer>
      <LikeSection>
        <IconContainer>
          <AiFillLike className="icon" />
        </IconContainer>
        <span>1</span>
      </LikeSection>
      <DislikeSection>
        <IconContainer>
          <AiOutlineLike className="icon dislike-icon" />
        </IconContainer>
        <span>1</span>
      </DislikeSection>
    </LikeDislikeContainer>
  );
}

const LikeDislikeContainer = styled.div`
  color: #000;
  display: flex;
  align-items: center;
  height: 36px;
  font-size: 14px;
  line-height: 36px;
  border-radius: 18px;
  text-transform: none;
  font-weight: 500;
  margin-right: 1rem;
  cursor: pointer;
`;
const LikeSection = styled.span`
  display: flex;
  align-items: center;
`;
const DislikeSection = styled.span`
  display: flex;
  align-items: center;
`;
const IconContainer = styled.span`
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 32px;
  height: 32px;

  .icon {
    font-size: 18px;
  }

  .dislike-icon {
    transform: rotate(180deg);
  }

  &:hover {
    background-color: #e8e6e6;
  }
`;

export default LikeDislike;
