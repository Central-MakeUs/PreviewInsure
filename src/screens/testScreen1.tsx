import styled from 'styled-components';
import media from '@styles/media';
import Button from '@components/commons/Button';

const testPage1 = () => {
  return (
    <div>
      <Title>test1</Title>
      <p>1번 페이지</p>
      <p>이노 테스트용</p>

      <a>aaaaaaaaaaaaa</a>
      <b>bbbbbbbbbb</b>
      <br />
      <Button
        kind="fill"
        disable={false}
        text="Button"
        size="big"
        handler={() => {
          console.log('click!');
        }}
      ></Button>
      <Button
        kind="fill"
        disable={false}
        text="small"
        size="small"
        handler={() => {
          console.log('click!');
        }}
      ></Button>
      <br />
      <Button
        kind="outline"
        disable={false}
        text="버튼2"
        size="big"
        handler={() => {
          console.log('click!');
        }}
      ></Button>
      <br />
      <Button
        kind="text"
        disable={false}
        text="버튼3"
        size="big"
        handler={() => {
          console.log('click!');
        }}
      ></Button>

      <Container></Container>

      <PcView>
        <p>pc에서만 보이는 영역</p>
      </PcView>
    </div>
  );
};

const PcView = styled.div`
  background-color: ${({ theme }) => theme.colors.Primary100};
  width: 100px;
  height: 100px;

  ${media.small`
    display: none;
    `};
`;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.title};
`;

const Container = styled.div`
  background-color: black;
  width: 100px;
  height: 100px;

  ${media.small`
    background-color: yellow;
  `};
`;

export default testPage1;
