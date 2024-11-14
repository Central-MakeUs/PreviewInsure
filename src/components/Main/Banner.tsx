import { Section } from '@components/commons/Section';
import styled from 'styled-components';

import Coin from '@/assets/icons/coin.webp';

const Banner = () => {
  return (
    <Box>
      <Img src={Coin} />
      <div>
        <Discrip>나야, 보험료. 이제 부가세를 곁들인.</Discrip>
        <Line>
          <Title>나는 보험료를 얼마나 내고 있을까?</Title>
          <BetaBtn>Beta</BetaBtn>
        </Line>
      </div>
    </Box>
  );
};

const Box = styled.div`
  background-color: white;
  border-radius: 12px;
  width: fit-content;
  margin-inline: auto;
  display: flex;
  align-items: center;
`;

const Img = styled.img`
  width: 38px;
  margin-block: 9px;
  margin-inline: 13px;
`;

const Discrip = styled.p`
  font-size: 11px;
  line-height: 9px;
  color: ${({ theme }) => theme.colors.Black200};
  padding-top: 4px;
  padding-bottom: 4px;
`;

const Title = styled.h3`
  font-size: 15px;
  line-height: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.Black500};
  display: inline;
`;

const Line = styled.div`
  display: flex;
  align-items: center;
`;
const BetaBtn = styled.button`
  margin-left: 7px;
  margin-right: 25px;
  background-color: ${({ theme }) => theme.colors.Primary100};
  color: white;
  border: 0;
  border-radius: 24rem;

  font-size: 9px;
  font-weight: 500;
  width: 35px;
  height: 20px;
`;

export default Banner;
