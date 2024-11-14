import { ReactNode } from 'react';
import styled, { CSSProp } from 'styled-components';

type Props = {
  children: ReactNode;
  customStyle?: CSSProp;
};

type HeadProps = {
  title: ReactNode;
  description?: ReactNode;
  help?: ReactNode;
};

const SectionComponent = ({ children, customStyle }: Props) => {
  return <SectionS customStyle={customStyle}>{children}</SectionS>;
};

const Head = ({ title, description, help }: HeadProps) => {
  return (
    <HeadS>
      <Title>{title}</Title>
      {help && <Help>{help}</Help>}
      <Descrip>{description}</Descrip>
    </HeadS>
  );
};

interface WithHeader {
  Head: React.ComponentType<HeadProps>;
}
export const Section = SectionComponent as React.FC<Props> & WithHeader;
Section.Head = Head;

// 일단 모바일 기준으로 text size 설정. pc 화면에서 사용하게 되면 수정 필요.
const SectionS = styled.section<{ customStyle: CSSProp }>`
  ${({ customStyle }) => customStyle}
`;

const HeadS = styled.div`
  padding-top: 25px;
  padding-left: 20px;
  padding-bottom: 14px;
`;

const Title = styled.h2`
  font-size: 20px;
  line-height: 24px;
  font-weight: 600;
  display: inline;
  color: ${({ theme }) => theme.colors.Black_B};
`;

const Help = styled.div``;

const Descrip = styled.p`
  margin-top: 4px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.Black100};
`;
