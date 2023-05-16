import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SideVideo from './Sections/SideVideo';
import Subscribe from './Sections/Subscribe';

function VideoDetailPage() {
  const videoId = useParams().videoId; // url에서 video id가져오기
  const videoVariable = { videoId: videoId }; // json 형식으로 보내야 서버에서 알맞게 받을 수 있음

  const [VideoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    // id를 보내서 해당 비디오 정보 가져오기
    axios.post('/api/video/getVideoDetail', videoVariable).then((response) => {
      if (response.data.success) {
        setVideoDetail(response.data.videoDetail);
      } else {
        alert('비디로 정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  // VideoDetail.writer.image를 불러오기전에 랜더링되기 떄문에 writer가 있으면 랜더링
  if (VideoDetail && VideoDetail.writer) {

    // 유저의 아이디와 비디오 작성자의 아이디가 다른 경우에만 구독 버튼 보이게 하는 함수
    const subscribeButton = VideoDetail.writer._id !==
      localStorage.getItem('userId') && (
      <Subscribe
        userTo={VideoDetail.writer._id}
        userFrom={localStorage.getItem('userId')}
      />
    );

    return (
      <Container>
        <MainSection className="main-section sections">
          <VideoScreen
            src={`http://localhost:8080/${VideoDetail.filePath}`}
            controls
          />

          <VideoTitle>{VideoDetail.title}</VideoTitle>

          <UserInfo>
            <UserImage src={VideoDetail.writer.image} alt="작성자 이미지" />
            <div>
              <UserName>{VideoDetail.writer.name}</UserName>
              <SubscribeNumber>구독자 0명</SubscribeNumber>
            </div>
            {subscribeButton}
          </UserInfo>

          <VideoDescription>{VideoDetail.description}</VideoDescription>

          {/* Comments */}
        </MainSection>
        <SideSection className="side-section sections">
          <SideVideo />
        </SideSection>
      </Container>
    );
  } else {
    return <div>loading...</div>;
  }
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  gap: 1.4rem;

  @media (min-width: 481px) and (max-width: 1024px) {
    flex-direction: column;
    gap: 3rem;

    .sections {
      width: 100%;

      .side-card {
        .side-left-section {
          width: auto;
          height: 100%;
        }
      }
    }
  }
`;
const MainSection = styled.div`
  width: 70%;
`;
const SideSection = styled.div`
  width: 27%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const VideoScreen = styled.video`
  width: 100%;
`;
const VideoTitle = styled.h2`
  font-size: 20px;
  margin-top: 0.5rem;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
const VideoDescription = styled.div`
  background-color: #f2f2f2;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  border-radius: 0.75rem;
  margin-top: 1rem;
`;
const UserName = styled.p`
  font-size: 16px;
  font-weight: 700;
`;
const SubscribeNumber = styled.p`
  opacity: 0.7;
  font-size: 12px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: #000;
`;

export default VideoDetailPage;
