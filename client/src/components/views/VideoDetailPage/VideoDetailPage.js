import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';
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

  if (VideoDetail && VideoDetail.writer) {
    return (
      <Container>
        <MainSection>
          <VideoScreen
            src={`http://localhost:8080/${VideoDetail.filePath}`}
            controls
          />

          <UserInfo>
            <UserImage src={VideoDetail.writer.image} alt="작성자 이미지" />
            <div>
              <p>{VideoDetail.writer.name}</p>
              <p>{VideoDetail.description}</p>
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
  max-width: 1080px;
  margin: 70px auto 0;
  display: flex;
  gap: 1rem;
`;
const MainSection = styled.div`
  background-color: red;
  width: 720px;
`;
const SideSection = styled.div`
  background-color: yellow;
  width: 360px;
`;
const VideoScreen = styled.video`
  width: 100%;
`
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
`;
const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 1rem;
  background-color: #000;
`;

export default VideoDetailPage;
