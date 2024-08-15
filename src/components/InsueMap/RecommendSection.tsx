import styled, { keyframes } from 'styled-components';

import media from '@styles/media';
import { useStore } from '@stores/useStore';
import Loading from '@components/commons/Loading';
import RecommendItem from './RecommendItem';
import { useState } from 'react';
import Colors from '@styles/Colors';
import { ReactComponent as Info } from '@assets/icons/Information.svg';

function RecommendSection({ isLoading, insuranceRecommends }: RecommendProps) {
  // 닉네임
  const { nickName } = useStore();
  const [isHelp1, setIsHelp1] = useState<boolean>(false);
  const [isHelp2, setIsHelp2] = useState<boolean>(false);

  const handleHelp1Click = () => {
    setIsHelp1(true);
    setTimeout(() => {
      setIsHelp1(false);
    }, 3000); // 3초
  };

  const handleHelp2Click = () => {
    setIsHelp2(true);
    setTimeout(() => {
      setIsHelp2(false);
    }, 3000); // 3초
  };

  return (
    <Container>
      <h1>{`${nickName}님,\n이런 보험은 어떤가요?`}</h1>

      <TableHead>
        <Line style={{ top: 0 }} />
        <Blank />
        <Company>기업명</Company>
        <Content>상품명</Content>
        <Detail>
          보험 가격 지수
          <Info width={20} height={'fit-content'} fill={Colors.Black100} onClick={() => handleHelp1Click()} />
          <Help visible={isHelp1}>
            {`보험 가격 지수는 보험료를 동일 유형 상품의 평균적인 가격과 비교하는 지표입니다.\n*보험가격지수 = { 영업보험료 / (참조순보험료 + 상품군별 평균사업비 ) } × 100\n보험 가격 지수가 낮을수록, 동일 상품 대비 저렴할 것으로 추측할 수 있습니다.`}
          </Help>
        </Detail>
        <Detail>
          추정 평균 가입 금액
          <Info width={20} height={'fit-content'} fill={Colors.Black100} onClick={() => handleHelp2Click()} />
          <Help
            visible={isHelp2}
          >{`추정 평균 가입 금액은 가상의 인물로 측정된 금액입니다.\n보험 가입 시, 나이 및 병력 등에 따라 금액이 변경될 수 있습니다.`}</Help>
        </Detail>
        <Line style={{ bottom: 0 }} />
      </TableHead>

      {isLoading ? (
        <Loading type={'spinningBubbles'} color={'#6879FB'} width={69.33} height={69.33} />
      ) : (
        insuranceRecommends?.map((item) => (
          <RecommendItem
            key={item.insuranceId}
            insuranceCompany={item.insuranceCompany}
            insuranceContent={item.insuranceContent}
            insuranceImage={item.insuranceImage}
            insuranceRate={item.insuranceRate}
            link={item.link}
            price={item.price}
          />
        ))
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 63%;
  margin-top: 6.9rem;
  margin-bottom: 6rem;

  ${media.mobile`
    width: 86%;
    margin-top: 16rem;
  `};

  h1 {
    font-weight: 600;
    margin-bottom: 3rem;
    line-height: normal;
    font-size: ${({ theme }) => theme.fontSizes.subtitle};
    color: ${({ theme }) => theme.colors.Primary500};

    ${media.mobile`
      font-size: 20px;
      white-space: pre-wrap;
    `}
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(10px);
  }
`;

const Help = styled.div<{ visible: boolean }>`
  position: absolute;
  top: -190%;
  width: max-content;
  display: block;
  white-space: pre-line;
  font-weight: 400;
  line-height: normal;
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.tiny};
  background-color: ${({ theme }) => theme.colors.Black_W};
  border: 1px solid ${({ theme }) => theme.colors.Black100};
  border-radius: 2.2rem;
  margin-left: 0.9rem;
  padding: 2.4rem 3rem 2.3rem 3.1rem;
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  animation: ${({ visible }) => (visible ? fadeIn : fadeOut)} 0.5s ease;
`;

const Line = styled.div`
  width: 100%;
  position: absolute;
  border-style: solid;
  border-bottom-width: 1px;
  border-color: ${({ theme }) => theme.colors.Black100};
`;

const TableHead = styled.div`
  position: relative;
  display: flex;

  min-height: 6rem;
  align-items: center;

  color: ${({ theme }) => theme.colors.Black500};
  font-weight: 600;
  font-size: 2rem;
  text-align: center;

  ${media.mobile`
    display: none;
  `}
`;
const Blank = styled.div`
  flex: 2 1 0;
`;

const Company = styled.p`
  flex: 2 1 0;
`;

const Content = styled.p`
  flex: 6 1 0;
`;

const Detail = styled.p`
  flex: 3 1 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;

export default RecommendSection;