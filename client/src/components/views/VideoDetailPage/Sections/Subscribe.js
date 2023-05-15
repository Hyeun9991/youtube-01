import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

function Subscribe({ userTo, userFrom }) {
  const [SubscribeNumber, setSubscribeNumber] = useState(0);
  const [Subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let subscribeVariable = { userTo: userTo };

    // 구독자 수 정보 가져오기
    axios
      .post('/api/subscribe/subscribeNumber', subscribeVariable)
      .then((response) => {
        if (response.data.success) {
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

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom,
    };

    // 이미 구독 중이라면
    if (Subscribed) {
      axios
        .post('/api/subscribe/unSubscribe', subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber - 1);
            setSubscribed(!Subscribed);
          } else {
            alert('구독 취소 하는데 실패 했습니다.');
          }
        });
    } else {
      // 아직 구독 중이 아니라면
      axios
        .post('/api/subscribe/subscribe', subscribeVariable)
        .then((response) => {
          if (response.data.success) {
            setSubscribeNumber(SubscribeNumber + 1);
            setSubscribed(!Subscribed);
          } else {
            alert('구독 하는데 실패 했습니다.');
          }
        });
    }
  };

  return (
    <div>
      <SubscribeButton
        className={Subscribed ? 'subscribed-color' : ''}
        onClick={onSubscribe}
      >
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

  &.subscribed-color {
    background-color: #f2f2f2;
    color: #000;
  }
`;

export default Subscribe;
