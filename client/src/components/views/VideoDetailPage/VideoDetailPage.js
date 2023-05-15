import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

function VideoDetailPage() {
  // const videoId = useParams().videoId; // url에서 가져온 video id
  // const variable = { videoId: videoId };

  /**
   * [실패]
   * server에서 보낸 videoDetail이 텅 빈채로 전달됨
   * writer, filPath도 못 가져오고 있는 상황
   */

  return (
    <Container>
      <div>
        <video
          // src={`http://localhost:8080/${VideoDetail.filePath}`}
          controls
        />
      </div>

      <div>
        {/* <p>{VideoDetail.writer}</p>
        <p>{VideoDetail.description}</p> */}
      </div>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  max-width: 1080px;
  margin: 7% auto 0;
`;
const VideoTag = styled.video`
  width: 100%;
`;

export default VideoDetailPage;
