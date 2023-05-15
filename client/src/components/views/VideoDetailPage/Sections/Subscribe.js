import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Subscribe({ userTo }) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let subscribeVariable = { userTo: userTo };

    // 구독자 수 정보 가져오기
    axios
      .post('/api/subscribe/subscribeNumber', subscribeVariable)
      .then((response) => {
        if (response.data.success) {
          console.log(response.data);
          setSubscribeNumber(response.data.subscribeNumber);
        } else {
          alert('구독자 수 정보를 받아오지 못했습니다.');
        }
      });

    let subscribedVariable = {
      userTo: userTo,
      userFrom: localStorage.getItem('userId'),
    };

    axios
      .post('/api/subscribe/subscribed', subscribedVariable)
      .then((response) => {
        if (response.data.success) {
          setSubscribed(response.data.subscribed);
        } else {
          alert('정보를 받아오지 못했습니다.');
        }
      });
  }, []);

  return (
    <div>
      <SubscribeButton className={Subscribed ? 'subscribed-color' : ''}>
        {SubscribeNumber} {Subscribed ? '구독중' : '구독'}
      </SubscribeButton>
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

  .subscribed-color {
    background-color: #f2f2f2;
  }
`;

export default Subscribe;
