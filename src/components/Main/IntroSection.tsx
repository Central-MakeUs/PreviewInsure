import { Section } from '@components/commons/Section';
import theme from '@styles/theme';
import styled from 'styled-components';

const IntroSection = () => {
  return (
    <Container>
      <Head>
        참고하는 우유뱀님,
        <br />
        비가오는 날엔 <span>운전조심</span>하세요!'
      </Head>
    </Container>
  );
};

const Container = styled.div`
  padding-inline: 20px;
`;

const Head = styled.h1`
  font-size: 22px;
  line-height: 26px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.Black500};

  span {
    background: linear-gradient(
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0) 48%,
      rgba(104, 121, 251, 0.3) 52%,
      rgba(104, 121, 251, 0.3)
    );
  }
`;

export default IntroSection;
