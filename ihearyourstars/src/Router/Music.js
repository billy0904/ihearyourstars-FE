import styled, { css, keyframes } from "styled-components";
import { ReactComponent as Orbit } from "../img/MusicBox/orbit.svg";
import { ReactComponent as Circle } from "../img/common/circle_bg.svg";
import { ReactComponent as Cloud } from "../img/MusicBox/cloud.svg";
import { ReactComponent as MusicboxTop } from "../img/MusicBox/Musicbox_top.svg";
import { ReactComponent as MusicboxBottom } from "../img/MusicBox/Musicbox_bottom.svg";
import { ReactComponent as Star } from "../img/MusicBox/Star.svg";
import { useState } from "react";
import { useNavigate, useLocation, useParams } from "react-router-dom";

const MusicDiv = styled.div`
  padding: 30px 0;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
    color: white;
    font-weight: 500;
    font-size: 14px;
    padding: 50px 0;
  }
`;

const OrbitBg = styled(Orbit)`
  position: absolute;
  pointer-events: none;
  top: 0;
  right: 0;
`;

const MusicBoxBg = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
`;

const CircleBg = styled(Circle)`
  margin-top: 50px;
  pointer-events: none;
  z-index: 1;
`;

const CloudBg = styled(Cloud)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  pointer-events: none;
`;

const scaleUpAnimation = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.7); }
`;

const StyledMusicboxTop = styled(MusicboxTop)`
  z-index: 6;
  position: absolute;
  top: 45%;
  left: 38%;
  animation: ${({ isScaled }) => (isScaled ? scaleUpAnimation : "none")} 0.85s
    ease-in-out forwards;
`;

const StyledMusicboxBottom = styled(MusicboxBottom)`
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 17%;
  animation: ${({ isScaled }) => (isScaled ? scaleUpAnimation : "none")} 0.85s
    ease-in-out forwards;
`;

const floatAnimation = keyframes`
    0% { transform: translateY(0); }
    50% { transform: translateY(-7%); }
    100% { transform: translateY(0); }
`;

const DropAnimation = keyframes`
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(3px, 16px) scale(0.85) rotate(240deg); }
  66% { transform: translate(6px, 40px) scale(0.7) rotate(480deg); }
  100% { transform: translate(9px, 65px) scale(0.55) rotate(720deg); }
`;

const StyledStar = styled(Star)`
  z-index: 5;
  position: absolute;
  left: 15%;
  top: 25%;
  animation: ${({ isClicked }) =>
    isClicked
      ? css`
          ${DropAnimation} 0.4s ease-in-out forwards
        `
      : css`
          ${floatAnimation} 3s infinite ease-in-out
        `};
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  100% { opacity: 0.9; }
`;

const FullScreenFade = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  opacity: 0;
  pointer-events: none;
  animation: ${({ isFading }) => (isFading ? fadeInOut : "none")} 1s ease-in-out
    forwards;
  z-index: 9999;
`;

function Music() {
  const [isClicked, setIsClicked] = useState(false);
  const [isScaled, setIsScaled] = useState(false);
  const [isFading, setIsFading] = useState(false);

  const nav = useNavigate();
  const location = useLocation();
  const { nickname, melody } = location.state || {};
  const { songId } = useParams()

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsFading(!isFading);

    setTimeout(() => {
      setIsScaled(!isScaled);
    }, 350);

    setTimeout(() => {
      nav(`/musicbox/play/${songId}`, { state: { nickname, melody } });
    }, 1000);
  };

  return (
    <>
      <MusicDiv onClick={handleClick}>
        <OrbitBg />
        <h1>{nickname}님의 음악이</h1>
        <h1>완성됐어요!</h1>
        <MusicBoxBg>
          <CircleBg />
          <CloudBg />
          <StyledMusicboxTop isScaled={isScaled} />
          <StyledMusicboxBottom isScaled={isScaled} />
          <StyledStar isClicked={isClicked} isScaled={isScaled} />
        </MusicBoxBg>

        <span>오르골을 눌러 음악을 들어보세요</span>
      </MusicDiv>
      <FullScreenFade isFading={isFading} />
    </>
  );
}

export default Music;
