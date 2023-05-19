import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import axios from 'axios';

function LikeDislike({ video, userId, videoId, commentId }) {
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  let likeVariable = {};

  // video: VideoDetailPage에서 전달받은 props
  if (video) {
    // video에 대한 props
    likeVariable = { videoId: videoId, userId: userId };
  } else {
    // comment에 대한 props
    likeVariable = { commentId: commentId, userId: userId };
  }

  useEffect(() => {
    // 좋아요(like) 대한 데이터 요청
    axios.post('/api/like/getLikes', likeVariable).then((response) => {
      if (response.data.success) {
        // 좋아요 개수
        console.log('좋이요', response.data.likes.length);
        setLikes(response.data.likes.length);

        // 로그인한 유저가 좋아요를 눌렀는지 여부 확인
        // 모든 좋아요 데이터에서
        response.data.likes.map((like) => {
          // 로컬스토리지에서 가져온 유저의 아이디(userId)를 이용해서 유저가 눌렀는지 확인
          if (like.userId === userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Like에 대한 데이터를 가져오지 못했습니다.');
      }
    });

    // 싫어요(dislike) 대한 데이터 요청
    axios.post('/api/like/getDislikes', likeVariable).then((response) => {
      if (response.data.success) {
        // 싫어요 개수
        console.log('싫어요', response.data.dislikes.length);
        setDislikes(response.data.dislikes.length);

        // 로그인한 유저가 싫어요를 눌렀는지 여부 확인
        // 모든 싫어요 데이터에서
        response.data.dislikes.map((dislike) => {
          // 로컬스토리지에서 가져온 유저의 아이디(userId)를 이용해서 유저가 눌렀는지 확인
          if (dislike.userId === userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Dislike에 대한 데이터를 가져오지 못했습니다.');
      }
    });
  }, []);

  return (
    <LikeDislikeContainer>
      <LikeSection>
        <IconContainer>
          {LikeAction === 'liked' ? (
            <AiFillLike className="icon" />
          ) : (
            <AiOutlineLike className="icon" />
          )}
        </IconContainer>
        <span>{Likes}</span>
      </LikeSection>
      <DislikeSection>
        <IconContainer>
          {DislikeAction === 'disliked' ? (
            <AiFillLike className="icon dislike-icon" />
          ) : (
            <AiOutlineLike className="icon dislike-icon" />
          )}
        </IconContainer>
        <span>{Dislikes}</span>
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
