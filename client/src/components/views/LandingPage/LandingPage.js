import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function LandingPage() {
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('/api/hello').then((res) => console.log(res));
  }, []);

  const onClickHandler = () => {
    axios.get('/api/users/logout').then((response) => {
      if (response.data.success) {
        navigate('/login');
      } else {
        alert('로그아웃 하는데 실패 했습니다.');
      }
    });
  };

  return (
    <Container>
      <h2>시작 페이지</h2>

      <button onClick={onClickHandler}>로그아웃</button>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
`

export default LandingPage;