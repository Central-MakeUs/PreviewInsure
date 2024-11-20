// 반응형 디자인을 위한 픽셀 컨버팅 함수
const pixelToRem = (size: number) => `${size / 10}rem`;

// font size를 객체로 반환
const fontSizes = {
  title: pixelToRem(45),
  subtitle: pixelToRem(30),
  paragraph: pixelToRem(25),
  small: pixelToRem(20),
  tiny: pixelToRem(15),
};

// 자주 사용하는 색
const colors = {
  Primary_W: '#EBEEFF',
  Primary100: '#D3D8FF',
  Primary200: '#B6BFFF',
  Primary300: '#96A2FF',
  Primary400: '#7A89FF',
  Primary500: '#6879FB',
  Secondary100: '#FFFBEF',
  Secondary200: '#FFF1CD',
  Secondary300: '#FFE7AB',
  Secondary400: '#FFDD85',
  Secondary500: '#FBD268',
  Black_W: '#F8F8F8',
  Black_B: '#111111',
  Black100: '#C7C7C7',
  Black200: '#AAAAAA',
  Black300: '#7E7E7E',
  Black400: '#575757',
  Black500: '#434343',
  AlertT: '#FF0000',
  AlertB: '#FFD2D2',
  White_bg: '#f8f9fb',
};

// 자주 사용하는 스타일 속성
const common = {
  flexCenter: `
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  flexCenterColumn: `
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  `,
};

// theme 객체에 감싸서 반환한다.
const theme = {
  fontSizes,
  colors,
  common,
};

export default theme;

export type Theme = typeof theme;
