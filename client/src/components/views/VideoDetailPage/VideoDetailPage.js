import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import SideVideo from './Sections/SideVideo';

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

  console.log(VideoDetail.title);

  if (VideoDetail && VideoDetail.writer) {
    return (
      <Container>
        <MainSection>
          <VideoScreen
            src={`http://localhost:8080/${VideoDetail.filePath}`}
            controls
          />

          <VideoTitle>{VideoDetail.title}</VideoTitle>

          <UserInfo>
            <UserImage src={VideoDetail.writer.image} alt="작성자 이미지" />
            <div>
              <UserName>{VideoDetail.writer.name}</UserName>
              <VideoDescription>{VideoDetail.description}</VideoDescription>
            </div>
          </UserInfo>

          {/* Comments */}
        </MainSection>
        <SideSection>
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
  margin-top: 0.5rem;
`;
const UserName = styled.p`
  font-size: 16px;
  font-weight: 700;
`;
const VideoDescription = styled.p`
  opacity: 0.5;
  font-size: 14px;
`;
const UserImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
  background-color: #000;
`;

export default VideoDetailPage;
