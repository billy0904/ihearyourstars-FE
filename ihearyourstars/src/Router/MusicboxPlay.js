import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from 'react';
import { MusicBoxComponent } from '../components/MusicBoxComponent';
import { ReactComponent as Star1 } from "../img/MusicBox/Star1.svg";
import { ReactComponent as Star2 } from "../img/MusicBox/Star2.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { playMelody } from "../utils/PlayMelody";

function MusicboxPlay() {
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const nav = useNavigate();
  const location = useLocation();
  const { songId } = useParams();
  const { title, nickname, melody } = location.state || {};
  const [canPlay, setCanPlay] = useState(false);
  
  useEffect(() => {
    if (!melody) {
      nav(`/musicbox/${songId}`, { replace: true });
    }
  }, [nickname, melody, songId, nav]);
    
  const handlePlay = async () => {
    if (!canPlay) {
      setCanPlay(true); // 상태 변경
      await playMelody(melody, () => {});
    }
  };
    
  return (
    <MusicboxPlayDiv>
      <Title>
        <h1>♪ {title}</h1>
      </Title>
      <span>손잡이를 돌려 음악을 재생해보세요</span>
      <button onClick={handlePlay}>음악 재생하기</button>
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

// 크로매틱 스케일에 따른 음표 위치 지정
const Notes = ({ melody, rotationSpeed }) => {
  const notePositions = {
    "C": 5, "Db": 10, "D": 15, "Eb": 20, "E": 25, "F": 30,
    "Gb": 35, "G": 40, "Ab": 45, "A": 50, "Bb": 55, "B": 60
  };

  return (
    <NotesContainer>
      {melody && melody.map((note, index) => {
        const RandomStar = Math.random() > 0.5 ? Star1 : Star2;
        const notePosition = notePositions[note] || Math.random() * 90 + 5; // 정의되지 않은 음은 랜덤 위치
        const animationDuration = 5 - Math.min(rotationSpeed / 100, 1.5);

        return (
          <FloatingStar key={index} left={notePosition} duration={animationDuration}>
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