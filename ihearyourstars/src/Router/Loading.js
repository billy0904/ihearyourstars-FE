import styled from "styled-components";
import { ReactComponent as Sparkle } from "../img/Sparkle.svg";
import { useState } from "react";

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

const CreatedSparkle = styled(Sparkle)`
  position: absolute;
  left: ${(props) => props.x}px;
  top: ${(props) => props.y}px;
  width: 60px;
  height: 60px;
  pointer-events: none;
`;

function Loading() {
  const [sparkles, setSparkles] = useState([]);

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
