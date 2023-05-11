import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import styled from 'styled-components';

function Navbar() {
  return (
    <Header>
      <Container>
        <Logo>
          <Link to="/">eunhye</Link>
        </Logo>
        <Menu>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? 'active' : '')}
              to="/login"
            >
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive, isPending }) =>
                isPending ? 'pending' : isActive ? 'active' : ''
              }
              to="/register"
            >
              Sign Up
            </NavLink>
          </li>
        </Menu>
      </Container>
    </Header>
  );
}

const Header = styled.nav`
  background-color: #f2f2f79c;
  backdrop-filter: blur(4px);
  height: 70px;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
`;
const Container = styled.div`
  width: 90%;
  padding: 1rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 auto;
`;
const Logo = styled.h1`
  display: flex;
  align-items: center;

  a {
    color: #1c1c1e;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 14px;
    font-weight: 700;
  }
`;
const Menu = styled.ul`
  display: flex;
  gap: 2rem;

  li {
    list-style: none;
  }

  a {
    color: #1c1c1e;
    text-decoration: none;
    font-size: 14px;
    opacity: 0.7;

    &:hover {
      opacity: 1;
      text-decoration: underline;
    }

    &.active {
      opacity: 1;
      font-weight: 700;
    }
  }
`;

export default Navbar;
