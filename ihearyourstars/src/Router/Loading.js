import styled, { keyframes } from "styled-components";
import { ReactComponent as Sparkle } from "../img/Sparkle.svg";
import { useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { generateOrgelMelody } from "../utils/OrgelMusicGenerator";

const LoadingDiv = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SparklesWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10;
`;

const fadeAnimation = keyframes`
  0% { opacity: 0; transform: scale(0.5); }
  15% { opacity: 1; transform: scale(1.1); }
  100% { opacity: 0; transform: scale(0.8); }
`;

const CreatedSparkle = styled(Sparkle)`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: 60px;
  height: 60px;
  pointer-events: none;
  animation: ${fadeAnimation} 3s ease-out forwards;
`;

function Loading() {
  const [sparkles, setSparkles] = useState([]);
  
  const nav = useNavigate();
  const location = useLocation();
  const { nickname, birth, starNum } = location.state || {};

  const generateAndSaveMelody = useCallback(async () => {
    try {
      if (!nickname || !birth || !starNum) {
        throw new Error("잘못된 접근입니다.");
      }

      // 멜로디 생성 및 저장
      const { melody, songId } = await generateOrgelMelody(nickname, birth, starNum);

      if (!melody.length || !songId) {
        throw new Error("멜로디 생성 또는 저장 실패");
      }

      // Music 페이지로 이동 (멜로디 데이터 전달)
        nav(`/music/${songId}`, { state: { nickname, melody: JSON.stringify(melody) } });
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
      nav("/");
    }
  }, [nickname, birth, starNum, nav]);

  useEffect(() => {
    generateAndSaveMelody();
  }, [generateAndSaveMelody]);

  const handleMouseUp = (e) => {
    const newSparkle = {
      x: e.clientX - 30,
      y: e.clientY - 30,
      createdAt: Date.now(),
    };

    setSparkles((prevSparkles) => {
      const updatedSparkles = [...prevSparkles, newSparkle];

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s !== newSparkle));
      }, 3000);

      return updatedSparkles;
    });
  };

  return (
    <>
      <LoadingDiv>
        <h1>나의 오르골을</h1>
        <h1>만드는 중이에요</h1>
      </LoadingDiv>
      <SparklesWrapper onMouseUp={handleMouseUp}>
        {sparkles.map((sparkle, index) => (
          <CreatedSparkle key={index} {...sparkle} />
        ))}
      </SparklesWrapper>
    </>
  );
}

export default Loading;
