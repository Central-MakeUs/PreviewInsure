import React, { useState, useRef } from 'react';
import styled, { CSSProp } from 'styled-components';

type Props = {
  customStyle?: CSSProp;
};

function QuestionBar({ customStyle }: Props) {
  const searchRef = useRef<any>(null);
  const [text, setText] = useState<string>('');
  return (
    <SearchBarContainer
      customStyle={customStyle}
      onClick={() => {
        searchRef.current.focus();
      }}
    >
      QuestionBar
    </SearchBarContainer>
  );
}

const SearchBarContainer = styled.div<{ customStyle: CSSProp }>`
  ${({ customStyle }) => customStyle}
  width: 100%;
  height: 44px;
  font-size: 14px;
`;
export default QuestionBar;
