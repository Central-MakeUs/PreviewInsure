import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css, keyframes } from 'styled-components';
import _ from 'lodash';

import { ReactComponent as HomeIcon } from '@assets/icons/BottomNav/Home.svg';
import { ReactComponent as PlannerIcon } from '@assets/icons/BottomNav/InsuePlanner.svg';
import { ReactComponent as QnaIcon } from '@assets/icons/BottomNav/QNA.svg';
import { ReactComponent as MyInsueIcon } from '@assets/icons/BottomNav/MyInsue.svg';
import { ReactComponent as UserIcon } from '@assets/icons/BottomNav/User.svg';
import media from '@styles/media';

function BottomNav() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState<string>('/');
  const [clickCount, setClickCount] = useState<number>(0);
  const [showNav, setShowNav] = useState<boolean>(true);
  let lastScrollTop = 0;

  useEffect(() => {
    const cur = location.pathname.split('/')[1];
    setActiveNav('/' + cur);

    if (cur === 'insueBording') setShowNav(false);
    else setShowNav(true);
  }, [location.pathname]);

  const handleNavClick = (path: string) => {
    // 두번 클릭시 화면 상단으로 이동
    if (activeNav === path) {
      setClickCount((prevCount) => {
        const newCount = prevCount + 1;
        if (newCount >= 1) window.scrollTo({ top: 0, behavior: 'smooth' });
        return newCount;
      });
    }
    // 해당 화면으로 이동
    else {
      setActiveNav(path);
      navigate(path);
      setClickCount(0);
      window.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // // 스크롤 이벤트 감지
  // const handleScroll = useCallback(
  //   _.throttle(() => {
  //     const currentScrollTop = window.scrollY;
  //     if (currentScrollTop > lastScrollTop) {
  //       //  down
  //       setShowNav(false);
  //     } else {
  //       // up
  //       setShowNav(true);
  //     }
  //     lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop; //  Mobile, negative scrolling
  //   }, 200), // 쓰로틀 간격을 200ms로 설정
  //   [],
  // );

  // // 300ms동안 스크롤이 일어나지 않을 때
  // const handleScrollEnd = useCallback(
  //   _.debounce(() => {
  //     setShowNav(true);
  //   }, 300),
  //   [],
  // );

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   window.addEventListener('scroll', handleScrollEnd);

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     window.removeEventListener('scroll', handleScrollEnd);
  //   };
  // }, [handleScroll, handleScrollEnd]);

  return (
    <Container style={{ display: showNav ? 'block' : 'none' }}>
      <Nav>
        <NavItem isActive={activeNav === '/'} onClick={() => handleNavClick('/')}>
          <HomeIcon width={18} height={19} style={{ marginBottom: '17.38px' }} />
          <span>맵</span>
        </NavItem>
        <NavItem isActive={activeNav === '/insuePlanner'} onClick={() => handleNavClick('/insuePlanner')}>
          <PlannerIcon width={22} height={21} style={{ marginBottom: '14.97px' }} />
          <span>인슈플래너</span>
        </NavItem>
        <NavItem isActive={activeNav === '/question'} onClick={() => handleNavClick('/question')}>
          <QnaIcon width={24} height={24} style={{ marginBottom: '11.38px' }} />
          <span>Q&A</span>
        </NavItem>
        <NavItem isActive={activeNav === '/myInsue'} onClick={() => handleNavClick('/myInsue')}>
          <MyInsueIcon width={17} height={20} style={{ marginBottom: '13.38px' }} />
          <span>내보험</span>
        </NavItem>
        <NavItem isActive={activeNav === '/user'} onClick={() => handleNavClick('/user')}>
          <UserIcon width={19} height={20} style={{ marginBottom: '14px' }} />
          <span>마이</span>
        </NavItem>
      </Nav>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: fit-content; //78px
  padding: 15px 30px;
  background-color: white;
  z-index: 6;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: end;
  justify-content: space-evenly;
  font-size: ${({ theme }) => theme.fontSizes.small};
  font-weight: 600;
`;

const growAnimation = keyframes`
  0% {
    transform: scale(1);
  }
  30% {
    transform: scaleX(1) translateY(2px);
  }
  40% {
    transform: scaleX(1.1);
  }
  100% {
    transform: scale(1);
  }
`;
const NavItem = styled.div<{ isActive: boolean }>`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  overflow: visible;
  span {
    font-weight: 400;
    color: ${({ isActive, theme }) => (isActive ? theme.colors.Primary500 : theme.colors.Black300)};
    font-size: ${({ theme }) => theme.fontSizes.subtitle};
  }

  svg {
    color: ${({ isActive, theme }) => (isActive ? 'transparent' : theme.colors.Black200)};
    fill: ${({ isActive, theme }) => (isActive ? theme.colors.Primary500 : 'transparent')};
    animation: ${({ isActive }) =>
      isActive
        ? css`
            ${growAnimation} 0.5s linear
          `
        : 'none'};
  }
`;

export default BottomNav;
