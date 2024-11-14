import { Section } from '@components/commons/Section';
import styled from 'styled-components';

const QuestionSection = () => {
  return (
    <Section>
      <Section.Head title="게시판 최신글" description="18:30 기준" />
    </Section>
  );
};

const Text = styled.span`
  font-size: 2.4rem;
  font-weight: 600;
`;

export default QuestionSection;
