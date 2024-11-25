import QuestionBar from '@components/commons/QuestionBar';
import Banner from '@components/Main/Banner';
import IntroSection from '@components/Main/IntroSection';
import MyInsueSection from '@components/Main/MyInsueSection';
import QuestionSection from '@components/Main/QuestionSection';
import RecommandSection from '@components/Main/RecommandSection';
import styled, { css } from 'styled-components';

const MainScreenMobile = () => {
  return (
    <Container>
      <IntroSection />
      <QuestionBar customStyle={AIQuestion} />
      <Line />
      <RecommandSection />
      <Banner />
      <MyInsueSection />
      <QuestionSection />
    </Container>
  );
};

export default MainScreenMobile;

const Container = styled.div`
  background-color: #f8f9fb;
`;

const Line = styled.div`
  background-color: white;
  height: 5px;
  width: 100vw;
`;

const AIQuestion = css`
  margin-top: 25px;
  margin-bottom: 30px;
`;
