import { useQuestionInfiniteQuery } from '@apis/question/question';
import { Section } from '@components/commons/Section';
import styled from 'styled-components';

const QuestionSection = () => {
  // 전체 카테고리로 1페이지만 들고온다.
  const { questionQuery } = useQuestionInfiniteQuery({ insuranceType: null });

  return (
    <Section>
      <Section.Head title="게시판 최신글" description="18:30 기준" />

      <List>
        {questionQuery.data?.pages.map((page, pageIndex) =>
          page.content.map((q, index) => (
            <QuestionItem key={`${pageIndex}-${index}`} question={q.question} answer={q.answer} />
          )),
        )}
      </List>
    </Section>
  );
};

type Props = {
  question: String;
  answer: String;
};

const QuestionItem = ({ question, answer }: Props) => {
  return (
    <Item>
      <Type>생명보험</Type>
      <Question red={true}>{question}</Question>
      <Answer>{answer}</Answer>
      <Line>
        <Time>21분전</Time>
        <View>123</View>
        <Comment>123</Comment>
      </Line>
    </Item>
  );
};

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 20px;
`;

const Item = styled.div`
  background-color: white;
  width: 100vw;
  height: fit-content;
  padding: 12px 0;
`;

const Type = styled.div`
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${({ theme }) => theme.colors.Primary500};
  padding: 5px 9px;
  width: fit-content;
  margin-bottom: 10px;
  margin-left: 27px;
`;

const Question = styled.p<{ red: boolean }>`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.Black500};
  position: relative;
  margin-inline: 30px;

  ${({ red }) =>
    red &&
    `
    &::before {
      content: '';
      position: absolute;
      left: -9px;
      transform: translateY(100%);
      width: 5px;
      height: 5px;
      background-color: #ff5757;
      border-radius: 50%;
    }
  `}
`;

const Answer = styled.p`
  position: relative;
  padding-top: 15px;
  margin-inline: 30px;
  font-size: 15px;
  font-weight: 300;
  line-height: 18px;
  color: ${({ theme }) => theme.colors.Black200};

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Line = styled.div`
  margin: 20px;
  margin-bottom: 0;
  padding-top: 14px;
  width: calc(100% - 40px);
  border-top: 1px solid ${({ theme }) => theme.colors.Black200};
  display: flex;
`;

const Time = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.Black200};
  margin-right: auto;
`;
const View = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.Black200};
`;
const Comment = styled.span`
  font-size: 13px;
  font-weight: 400;
  color: ${({ theme }) => theme.colors.Black200};
  margin-left: 14px;
`;
export default QuestionSection;
