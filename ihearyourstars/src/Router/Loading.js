import styled, { keyframes } from "styled-components";
import { ReactComponent as Sparkle } from "../img/Sparkle.svg";
import { useState, useEffect, useRef } from "react";
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
  
  const hasRun = useRef(false); // 한 번만 실행되도록 막기
  const nav = useNavigate();
  const location = useLocation();
  const { nickname, birth, starNum } = location.state || {};

  useEffect(() => {
    if (hasRun.current) return; // ✅ 두 번째 실행 방지
    hasRun.current = true; // ✅ 첫 실행 이후 true로 변경

    const generateAndSaveMelody = async () => {
      try {
        if (!nickname || !birth || !starNum) {
          throw new Error("잘못된 접근입니다.");
        }

        const { melody, songId } = await generateOrgelMelody(nickname, birth, starNum);
        if (!melody.length || !songId) {
          throw new Error("멜로디 생성 또는 저장 실패");
        }

        nav(`/music/${songId}`, { state: { nickname, melody } });
      } catch (error) {
        console.error(error);
        alert("오류가 발생했습니다.");
        nav("/");
      }
    };

    generateAndSaveMelody();
  }, [nickname, birth, starNum, nav]);

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
