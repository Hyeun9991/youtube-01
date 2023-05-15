import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import ReactPlayer from 'react-player/lazy';

function VideoDetailPage() {
  const videoId = useParams().videoId; // url에서 video id가져오기
  const videoVariable = { videoId: videoId };

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
        <ReactPlayer
          style={{ width: '100%' }}
          url={`http://localhost:8080/${VideoDetail.filePath}`}
          playing={true} // 자동 재생 on
          controls={true} // 플레이어 컨트롤 노출 여부
          light={false} // 플레이어 모드
          pip={true} // pip 모드 설정 여부
        />

        <UserInfo>
          <UserImage src={VideoDetail.writer.image} alt="작성자 이미지" />
          <div>
            <p>{VideoDetail.writer.name}</p>
            <p>{VideoDetail.description}</p>
          </div>
        </UserInfo>

        {/* Comments */}
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
  margin: 7% auto 0;
`;
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
