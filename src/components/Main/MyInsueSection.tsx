import { Section } from '@components/commons/Section';
import styled from 'styled-components';

const MyInsueSection = () => {
  return (
    <Section>
      <Section.Head title="내 보험" description="입력한 정보를 기반으로 내 보험을 보여줍니다." />
    </Section>
  );
};

const Text = styled.span`
  font-size: 2.4rem;
  font-weight: 600;
`;

export default MyInsueSection;
