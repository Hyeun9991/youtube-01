import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';

function Subscribe({ userTo }) {
  // useEffect(() => {
  //   let subscribeVariable = { userTo: userTo };

  //   axios
  //     .post('/api/subscribe/subscribeNumber', subscribeVariable)
  //     .then((response) => {
  //       if (response.data.success) {
  //       } else {
  //         alert('구독자 수 정보를 받아오지 못했습니다.');
  //       }
  //     });
  // }, []);

  return (
    <div>
      <SubscribeButton>0 구독</SubscribeButton>
    </div>
  );
}

const SubscribeButton = styled.button`
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
  margin-left: 1.5rem;
  cursor: pointer;
`;

export default Subscribe;
