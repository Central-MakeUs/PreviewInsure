import { useInsueListQuery } from '@apis/account/account';
import { Section } from '@components/commons/Section';
import { convertInsureString } from '@utils/common/convertInsureType';
import styled from 'styled-components';

const MyInsueSection = () => {
  const { insurancesQuery } = useInsueListQuery();

  const clickInsue = () => {
    console.log('click');
  };

  return (
    <Section>
      <Section.Head title="내 보험" description="입력한 정보를 기반으로 내 보험을 보여줍니다." />

      <Scroll>
        <List>
          {insurancesQuery.data?.map((insue) => (
            <InsueItem key={insue.accountInsuranceId} onClick={clickInsue}>
              <Img></Img>
              <Type>{convertInsureString(insue.insuranceType)}</Type>
              <Name>{insue.insuranceCompany}</Name>
            </InsueItem>
          ))}
        </List>
      </Scroll>
    </Section>
  );
};

const Scroll = styled.div`
  overflow-x: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
`;

const List = styled.div`
  padding-inline: 20px;
  width: fit-content;
  display: flex;
  gap: 10px;
`;

const InsueItem = styled.div`
  background-color: white;
  width: 189px;
  height: 185px;
  border-radius: 12px;
  padding: 10px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 169px;
  height: 99px;
  background-color: #f8f9ff;
  border-radius: 8px;
  border-width: 0;
  padding-inline: 25px;
`;

const Type = styled.p`
  padding-top: 17px;
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.Black500};
`;

const Name = styled.p`
  padding-top: 10px;
  font-size: 14px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.Black200};
`;
export default MyInsueSection;
