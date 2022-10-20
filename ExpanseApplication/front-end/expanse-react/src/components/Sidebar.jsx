import React, { useState } from 'react';

//Svg files
import logo from '../assets/logo.svg';
import Home from '../assets/home.svg';
import Exit from '../assets/logout.svg';
import Savings from '../assets/savings.svg';
import Stock from '../assets/stock.svg';
import Leaderboard from '../assets/leaderboard.svg';
import styled from "styled-components";
import { Link} from 'react-router-dom';

const Container = styled.div`
  position: fixed;
  margin-top: 2.5rem;
  .active {
    border-right: 4px solid white;
    img {
      filter: invert(100%) sepia(0%) saturate(0%) hue-rotate(93deg)
        brightness(103%) contrast(103%);
    }
  }
`;

const Button = styled.button`
  background-color: #B1B2FF;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  margin: 0.5rem 0 0 0.5rem;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &::before,
  &::after {
    content: "";
    background-color: var(--white);
    height: 2px;
    width: 1rem;
    position: absolute;
    transition: all 0.3s ease;
  }
  &::before {
    top: ${(props) => (props.clicked ? "1.5" : "1rem")};
    transform: ${(props) => (props.clicked ? "rotate(135deg)" : "rotate(0)")};
  }
  &::after {
    top: ${(props) => (props.clicked ? "1.2" : "1.5rem")};
    transform: ${(props) => (props.clicked ? "rotate(-135deg)" : "rotate(0)")};
  }
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const SidebarContainer = styled.div`
  background-color: white;
  width: 3.5rem;
  height: 80vh;
  margin-top: 1rem;
  border-radius: 0 30px 30px 0;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  position: absolute !important;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  width: ${(props) => (props.clicked ? "12rem" : "3.5rem")};
  transition: all 0.5s ease;
`;

const Logo = styled.div`
  width: 2rem;
  img {
    width: 100%;
    height: auto;
  }
`;

const SlickBar = styled.ul`
  color: var(--black);
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--white);
  padding: 2rem 0;
  position: absolute;
  top: 6rem;
  left: 0;
  border-radius: 0 30px 30px 0;
`;

const Item = styled.span`
  text-decoration: none;
  color: var(--black);
  width: 100%;
  padding: 1rem 0;
  cursor: pointer;
  display: flex;
  padding-left: 1rem;
  &:hover {
    border-right: 4px solid var(--white);
    img {
      filter: invert(0%) sepia(100%) saturate(0%) hue-rotate(59deg) brightness(92%) contrast(104%);
    }
  }
  img {
    width: 1.2rem;
    height: auto;
    filter: invert(69%) sepia(41%) saturate(173%) hue-rotate(166deg) brightness(90%) contrast(86%);
    opacity: 0.9;
  }
  
`;

const Text = styled.span`
  font-weight: 500;
  color: #413F42;
  width: ${(props) => (props.clicked ? "100%" : "0")};
  overflow: hidden;
  margin-left: ${(props) => (props.clicked ? "1.5rem" : "0")};
  transition: all 0.5s ease;
`;


const Logout = styled.button`
  border: none;
  width: 2rem;
  height: 2rem;
  background-color: transparent;
  img {
    width: 100%;
    height: auto;
    filter: filter: invert(69%) sepia(41%) saturate(173%) hue-rotate(166deg) brightness(90%) contrast(86%);
    opacity: 0.4;
    transition: all 0.3s ease;
    &:hover {
      border: none;
      padding: 0;
      opacity: 0.6;
    }
  }
`;

const Sidebar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);


  return (
    <Container>
      <Button clicked={click} onClick={() => handleClick()}>
      </Button>
      <SidebarContainer clicked={click}>
        <Logo>
          <img src={logo} alt="logo" />
        </Logo>
        <SlickBar clicked={click}>
          <Item onClick={() => setClick(false)}>
          <Link to="/home">
            <img src={Home} alt="Home" />
          </Link>
            <Text clicked={click}>Home</Text>
          </Item>
          <Item onClick={() => setClick(false)}  href="/savings">
            <Link to="/savings">
              <img src={Savings} alt="Savings" />
            </Link>
            <Text clicked={click}>Savings</Text>
          </Item>
          <Item onClick={() => setClick(false)} href="/portfolio">
            <a href="/portfolio">
              <img src={Stock} alt="Stock Portfolio" />
            </a>
            <Text clicked={click}>Portfolio</Text>
          </Item>
          <Item onClick={() => setClick(false)}>
            <a href="/leaderboard">
              <img src={Leaderboard} alt="Leaderboard" href="/leaderboard"/>
            </a>
            <Text clicked={click}>Leaderboard</Text>
          </Item>
        </SlickBar>
            <Logout>
              <img src={Exit} alt="logout" />
            </Logout>
         
      </SidebarContainer>
    </Container>
  );
};

export default Sidebar;