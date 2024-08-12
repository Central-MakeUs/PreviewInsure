import styled, { keyframes } from 'styled-components';
import logo from '@assets/imgs/logo-white.webp';
import character from '@assets/imgs/main-character.webp';
import media from '@styles/media';
import InsueMainIcon from '@components/Main/InsueMainIcon';
import { ReactComponent as Arrow } from '@assets/icons/Right.svg';
import { ReactComponent as ArrowMini } from '@assets/icons/RightMini.svg';

import { CategoryImg } from '@utils/common/InsurCategory';
import { useEffect, useRef, useState } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function MainScreen() {
  const [selected, setSelected] = useState<number>(0);
  const scrollWrapperRef = useRef<HTMLDivElement>(null);
  const SelectedIcon = CategoryImg[selected].img;

  const hanldeSelected = (plus: 1 | -1) => {
    if (selected + plus === CategoryImg.length) setSelected(0);
    else if (selected + plus === -1) setSelected(CategoryImg.length - 1);
    else setSelected((s) => s + plus);
  };

  useEffect(() => {
    muCenter(selected);
  }, [selected]);

  // 선택된 item 가운데로
  const muCenter = (targetIndex: number) => {
    const box = scrollWrapperRef.current;
    const scrItems = box?.querySelectorAll<HTMLDivElement>('.horizonScroll__item');
    const boxHarf = (box?.clientWidth ?? 0) / 2;
    let targetLeft = 0;

    for (let i = 0; i < targetIndex; i++) {
      targetLeft += scrItems?.[i].offsetWidth ?? 0;
    }

    const target = scrItems?.[targetIndex];
    const selectTargetPos = targetLeft + (target?.offsetWidth ?? 0) / 2;
    let pos;

    if (selectTargetPos <= boxHarf) {
      pos = 0;
    } else if (
      (scrItems?.[scrItems.length - 1].offsetLeft ?? 0) +
        (scrItems?.[scrItems.length - 1].offsetWidth ?? 0) -
        selectTargetPos <=
      boxHarf
    ) {
      pos =
        (scrItems?.[scrItems.length - 1].offsetLeft ?? 0) +
        (scrItems?.[scrItems.length - 1].offsetWidth ?? 0) -
        (box?.clientWidth ?? 0);
    } else {
      pos = selectTargetPos - boxHarf;
    }

    box?.scrollTo({
      left: pos,
      behavior: 'smooth',
    });
  };

  return (
    <Container>
      <TextBox>
        <Logoimg src={logo} />
        <TextSmall>가 선사하는</TextSmall>
        <br />
        <TextBig>보험의 새로운 경험</TextBig>
      </TextBox>

      <CharacterBox>
        <TransitionGroup>
          <CSSTransition key={selected} in={true} timeout={300} classNames="icon-transition" unmountOnExit>
            <IconBox>
              <IconTxt>{CategoryImg[selected].name}</IconTxt>
              <Icon>
                <SelectedIcon width={'100%'} height={'100%'} />
              </Icon>
            </IconBox>
          </CSSTransition>
        </TransitionGroup>
        <CharacterImg src={character} />
      </CharacterBox>

      <GradientImgBackground />
      <ColorBackground />

      <ScrollBox ref={scrollWrapperRef}>
        <SelectBox>
          {CategoryImg.map((category, _index) => (
            <div onClick={() => setSelected(_index)} className="horizonScroll__item" key={_index}>
              <InsueMainIcon
                txt={category.name}
                Icon={category.img}
                nav={category.nav}
                isSelected={selected === _index}
              />
            </div>
          ))}
        </SelectBox>
      </ScrollBox>

      <ArrowBox onClick={() => hanldeSelected(1)}>
        <Arrow width={43} height={'100%'} color="white" />
      </ArrowBox>
      <LeftArrowBox onClick={() => hanldeSelected(-1)}>
        <ArrowMini width={9} height={20} color="white" />
        <ArrowMini width={9} height={20} color="white" />
      </LeftArrowBox>
      <RightArrowBox onClick={() => hanldeSelected(1)}>
        <ArrowMini width={9} height={20} color="white" />
        <ArrowMini width={9} height={20} color="white" />
      </RightArrowBox>
    </Container>
  );
}
const Container = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 16rem); // header 높이만큼 빼기
  background-color: ${({ theme }) => theme.colors.Primary500};
  overflow: hidden;

  ${media.mobile`
    height: calc(100vh - 18rem - 78px); // header + nav
  `};
`;

const TextBox = styled.div`
  width: fit-content;
  height: fit-content;
  position: absolute;
  bottom: 55%;
  left: 10%;

  ${media.mobile`
    top: 3%;
    left: 7%;
  `};
`;
const Logoimg = styled.img`
  width: 23rem;
  margin-right: 2.4rem;
  margin-left: 0.8rem;

  ${media.small`
  margin-right: 2rem;
    margin-left: 0;
  `};
`;
const TextSmall = styled.span`
  font-size: 4rem;
  font-weight: 600;
  color: white;
`;
const TextBig = styled.p`
  font-size: 7rem;
  font-weight: 600;
  color: white;
  margin-top: 1.7rem;

  ${media.small`
    font-size: 5rem;
    /* margin-top: 0.9rem; */
  `};
`;

const CharacterBox = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;

  /* top: -18rem; */
  /* top: 42%; */
  /* transform: translate(0, -50%); */
  width: 60%;
  /* max-height: 100rem; */
  height: 100%;
  /* margin-top: 5rem;
  margin-bottom: 5rem; */
  /* max-height: 90rem; */
  /* overflow: hidden; */

  ${media.small`
    width: 70%;
    /* max-height:100%; */
  `}

  ${media.mobile`
    /* top: 50%; */
    /* left:50%; */
    /* position: relative; */
    /* left: 50%; */
    /* top: 0; */
    /* transform: translate(-50%,0); */
    width: 100%;
    height: 100%;
    max-height: 100%;
    margin-bottom: 25rem;
  `};
`;

// TODO: 디자이너와 animation 협의
const moving = keyframes`
  0%{
    transform: translateY(-9px);
  }
  100%{
    transform: translateY(5px);
    transform: translateX(-5px);
  }
`;

const IconBox = styled.div`
  width: 20rem;
  height: 20rem;
  position: absolute;
  bottom: 50%;
  /* transform: translate(-200%, -50%); */
  left: 15%;
  z-index: 3;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  transition: all 2s;

  ${media.small`
    width: 30rem;
    height: 30rem;
    /* left: 15%; */
    /* transform: translate(0,0); */
  `};

  ${media.mobile`
    left:8%;
    bottom: 35%;
  `}

  transition:
    transform 300ms ease-in-out,
    opacity 300ms ease-in-out;

  &.icon-transition-enter {
    opacity: 0;
  }
  &.icon-transition-enter-active {
    opacity: 1;
    transition:
      opacity 300ms ease-in-out,
      transform 300ms ease-in-out;
  }
  &.icon-transition-exit {
    opacity: 1;
  }
  &.icon-transition-exit-active {
    opacity: 0;
    transition:
      opacity 300ms ease-in-out,
      transform 300ms ease-in-out;
  }
`;

const IconTxt = styled.span`
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.paragraph};
  color: white;
  white-space: nowrap;

  ${media.small`
    font-size: 4rem
  `};
`;

const Icon = styled.div`
  width: 100%;
  min-width: 12rem;

  animation: ${moving} 1s 0s linear alternate infinite;
`;

const CharacterImg = styled.img`
  position: absolute;
  bottom: 10rem;
  left: 0;
  width: 100%;
  height: fit-content;
  height: 100%;
  min-height: 90rem;
  max-width: 120rem;
  object-fit: contain;

  ${media.small`
    max-width: 200rem;
  `}

  ${media.mobile`
    width:120%;
    max-width: 120%;
    left:53%;
    bottom: 38%;
    transform: translate(-50%, 50%);
    /* position: absolute; */
    /* width: 100%; */
    /* height: 100%; */
    /* bottom:10%;
    left: 50%;
    transform: translateX(-50%); */
  `};
`;
const GradientImgBackground = styled.div`
  width: 100%;
  max-height: 8rem;
  height: 20%;
  min-height: 5.8rem;
  position: absolute;
  bottom: 27.8rem;
  background: linear-gradient(180deg, rgba(104, 121, 251, 0) 0%, ${({ theme }) => theme.colors.Primary500} 100%);

  ${media.small`
    bottom: 39.8rem;
  `}

  ${media.mobile`
  bottom: 59.8rem;
  `};
`;

const ColorBackground = styled.div`
  width: 100%;
  height: 28rem;
  position: absolute;
  bottom: 0;
  background-color: ${({ theme }) => theme.colors.Primary500};

  ${media.small`
    height: 40rem;
  `};
  ${media.mobile`
    height: 60rem;
  `};
`;

const ScrollBox = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow-x: auto;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
`;

const SelectBox = styled.div`
  width: fit-content;
  min-width: 10rem;
  padding-bottom: 3%;
  z-index: 2;

  display: flex;
  gap: 1.6rem;
  align-items: end;
  overflow: visible;
`;

const ArrowBox = styled.div`
  z-index: 3;
  position: absolute;
  bottom: 6rem;
  right: 4rem;
  height: 20rem;
  ${media.mobile`
    display: none;
  `};
`;
const LeftArrowBox = styled.div`
  z-index: 3;
  position: absolute;
  bottom: 23%;
  left: 2.5rem;
  display: none;

  transform: rotate(180deg);
  ${media.mobile`
    display: block;
  `};
`;
const RightArrowBox = styled.div`
  z-index: 3;
  position: absolute;
  bottom: 23%;
  right: 2.5rem;
  display: none;
  ${media.mobile`
    display: block;
  `};
`;
export default MainScreen;
