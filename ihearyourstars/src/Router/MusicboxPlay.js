import styled, { keyframes } from "styled-components";
import React, { useState } from 'react';
import { MusicBoxComponent } from '../components/MusicBoxComponent';
import { ReactComponent as Star1 } from "../img/MusicBox/Star1.svg";
import { ReactComponent as Star2 } from "../img/MusicBox/Star2.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";

function MusicboxPlay() {
  const musicTitle = "집에가고싶다";
  const [rotationSpeed, setRotationSpeed] = useState (0);
  const location = useLocation();
  const { title, melody } = location.state || {};
  const { songId } = useParams();

  return (
    <MusicboxPlayDiv>
      <Title>
        <h1>♪ {musicTitle}</h1>
      </Title>
      <span>손잡이를 돌려 음악을 재생해보세요</span>
      <Notes rotationSpeed={rotationSpeed} />
      <MusicBoxComponent setRotationSpeed={setRotationSpeed} />
    </MusicboxPlayDiv>
  );
}

export default MusicboxPlay;

const MusicboxPlayDiv = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
    color: white;
    font-weight: 400;
    font-size: 15px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;

  color: white;
  font-weight: 400;
  line-height: 40px;
  font-size: 20px;
`;

const Notes = ({ rotationSpeed }) => {
  return (
    <NotesContainer>
      {[...Array(10)].map((_, index) => {
        const RandomStar = Math.random() > 0.5 ? Star1 : Star2;
        const randomLeft = Math.random() * 90 + 5; // 이 부분 악보 나오면 수정 필요 
        const animationDuration = 5 - Math.min(rotationSpeed / 100, 1.5);

        return (
          <FloatingStar
            key={index}
            left={randomLeft}
            duration={animationDuration}
          >
            <RandomStar />
          </FloatingStar>
        );
      })}
    </NotesContainer>
  );
};

const NotesContainer = styled.div`
  position: relative;
  width: 450px;
  height: 470px;
  overflow: hidden;
`;

const floatUp = keyframes`
  0% { transform: translateY(100%); opacity: 1; }
  100% { transform: translateY(-400%); opacity: 1; }
`;

const FloatingStar = styled.div`
  position: absolute;
  bottom: 0;
  left: ${({ left }) => left}%;
  animation: ${floatUp} ${({ duration }) => duration}s linear infinite;
`;