import styled from 'styled-components';
import media from '@styles/media';
import MainScreenPc from './MainScreenPc';
import MainScreenMobile from './MainScreenMobile';

function MainScreen() {
  return (
    <>
      <PC>
        <MainScreenPc />
      </PC>
      <Mobile>
        <MainScreenMobile />
      </Mobile>
    </>
  );
}
const PC = styled.div`
  display: block;

  ${media.mobile`
    display: none;
  `};
`;

const Mobile = styled.div`
  display: none;

  ${media.mobile`
    display: block;
  `};
`;
export default MainScreen;
