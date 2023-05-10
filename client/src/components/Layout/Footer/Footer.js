import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

function Footer() {
  return (
    <FooterWrapper>
      <Container>
        <Logo>
          <Link to="/">eunhye</Link>
        </Logo>
        <Menu>
          <li>
            <Link to="mailto:hyeun9991@gmail.com" target="_blank">
              hyeun9991@gmail.com
            </Link>
          </li>
          <li>
            <Link to="https://github.com/Hyeun9991" target="_blank">
              github
            </Link>
          </li>
        </Menu>
      </Container>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.div`
  background-color: #000;
  width: 100%;
  height: 120px;
`;
const Container = styled.div`
  width: 90%;
  height: 100%;
  margin: 0 auto;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const Logo = styled.h1`
  display: flex;
  align-items: center;

  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: normal;
  }
`;
const Menu = styled.ul`
  display: flex;
  gap: 2rem;

  li {
    list-style: none;
  }

  a {
    color: #fff;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 14px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    &.active {
      opacity: 1;
      font-weight: 700;
    }
  }
`;

export default Footer;
