import { Section } from '@components/commons/Section';
import styled from 'styled-components';

const RecommandSection = () => {
  return (
    <Section>
      <Section.Head title="보험 추천" description="20,30대 여성이 많이 찾는 보험이에요." />
    </Section>
  );
};

const Text = styled.span`
  font-size: 2.4rem;
  font-weight: 600;
`;

export default RecommandSection;
