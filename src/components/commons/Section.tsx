import { ReactNode } from 'react';
import styled, { CSSProp, keyframes } from 'styled-components';
import { ReactComponent as InfoIcon } from '@/assets/icons/Information.svg';

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
      {help && (
        <Help>
          <InfoIcon color="#D9D9D9" width={14} height={14} />
          <ToolTip>{help}</ToolTip>
        </Help>
      )}
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

const Help = styled.div`
  display: inline;
  margin-left: 7px;
  height: fit-content;
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
    visibility: visible;
  }
  90% {
    opacity: 1;
    visibility: visible;
  }
  100% {
    opacity: 0;
    visibility: hidden;
  }
`;

const ToolTip = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.Black200};
  margin-left: 4px;
  visibility: hidden;
  /* transition:
    opacity 0.2s ease-out,
    visibility 0.2s ease-out; */

  ${Help}:hover &,
  ${Help}:focus & {
    opacity: 1;
    visibility: visible;
    animation: ${fadeOut} 3s forwards;
  }
`;

const Descrip = styled.p`
  margin-top: 4px;
  font-size: 14px;
  line-height: 17px;
  font-weight: 300;
  color: ${({ theme }) => theme.colors.Black100};
`;
