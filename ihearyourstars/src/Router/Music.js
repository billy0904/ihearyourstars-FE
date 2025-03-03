import styled, { keyframes } from "styled-components";
import { ReactComponent as Orbit } from "../img/MusicBox/orbit.svg";
import { ReactComponent as Circle } from "../img/common/circle_bg.svg";
import { ReactComponent as Cloud } from "../img/MusicBox/cloud.svg";
import { ReactComponent as MusicboxTop } from "../img/MusicBox/Musicbox_top.svg";
import { ReactComponent as MusicboxBottom } from "../img/MusicBox/Musicbox_bottom.svg";
import { ReactComponent as Star } from "../img/MusicBox/Star.svg";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

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

const scaleUp = keyframes`
  0% { transform: scale(1); }
  100% { transform: scale(1.7); }
`;

const StyledMusicboxTop = styled(MusicboxTop)`
  z-index: 6;
  position: absolute;
  top: 45%;
  left: 37%;
  animation: ${({ isScaled }) => (isScaled ? scaleUp : "none")} 0.85s
    ease-in-out forwards;
`;

const StyledMusicboxBottom = styled(MusicboxBottom)`
  z-index: 4;
  position: absolute;
  top: 50%;
  left: 17%;
  animation: ${({ isScaled }) => (isScaled ? scaleUp : "none")} 0.85s
    ease-in-out forwards;
`;

const starDrop1 = keyframes`
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(-1.6px, 25px) scale(0.95) rotate(120deg); }
  66% { transform: translate(-3.2px, 50px) scale(0.9) rotate(240deg); }
  100% { transform: translate(-5px, 80px) scale(0.85) rotate(360deg); }
`;

const starDrop2 = keyframes`
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  33% { transform: translate(-40px, 30px) scale(0.95) rotate(240deg); }
  66% { transform: translate(-80px, 75px) scale(0.9) rotate(480deg); }
  100% { transform: translate(-95px, 110px) scale(0.85) rotate(720deg); }
`;

const StyledStar = styled(Star)`
  z-index: 5;
  position: absolute;
  width: 70px;
`;

const StyledStar1 = styled(StyledStar)`
  top: 20%;
  left: 30%;
  transform-origin: center;
  animation: ${({ isClicked }) => (isClicked ? starDrop1 : "none")} 0.4s
    ease-in-out forwards;
`;

const StyledStar2 = styled(StyledStar)`
  top: 5%;
  left: 65%;
  transform-origin: center;
  animation: ${({ isClicked }) => (isClicked ? starDrop2 : "none")} 0.4s
    ease-in-out forwards;
`;

const fadeInOut = keyframes`
  0% { opacity: 0; }
  10% { opacity: 0; }
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
  const { songId } = useParams()
  const { nickname, melody } = location.state || {};

  // melody를 JSON으로 파싱
  const parsedMelody = melody ? JSON.parse(melody) : [];

  const handleClick = () => {
    setIsClicked(!isClicked);
    setIsFading(!isFading);

    setTimeout(() => {
      setIsScaled(!isScaled);
    }, 400);

    setTimeout(() => {
      nav("/music/play/${songId}", { state: { melody } });
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
          <StyledStar1 isClicked={isClicked} isScaled={isScaled} />
          <StyledStar2 isClicked={isClicked} isScaled={isScaled} />
        </MusicBoxBg>

        <span>오르골을 눌러 음악을 들어보세요</span>
      </MusicDiv>
      <FullScreenFade isFading={isFading} />
    </>
  );
}

export default Music;
