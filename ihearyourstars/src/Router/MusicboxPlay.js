import styled, { keyframes } from "styled-components";
import React, { useEffect, useState, useRef } from 'react';
import { MusicBoxComponent } from '../components/MusicBoxComponent';
import { ReactComponent as Star1 } from "../img/MusicBox/Star1.svg";
import { ReactComponent as Star2 } from "../img/MusicBox/Star2.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { loadSoundFont, playNote } from "../utils/PlayMelody";

function MusicboxPlay() {
  const [rotationSpeed, setRotationSpeed] = useState(0);
  const [noteIndex, setNoteIndex] = useState(0);
  const isPlayingRef = useRef(false);
  const intervalRef = useRef(null);
  
  const nav = useNavigate();
  const location = useLocation();
  const { songId } = useParams();
  const { title, nickname, melody } = location.state || {};

  useEffect(() => {
    if (!melody) {
      nav(`/musicbox/${songId}`, { replace: true });
    } else {
      loadSoundFont(); // 미리 로드
    }
  }, [nickname, melody, songId, nav]);

  // 손잡이를 돌릴 때 호출됨
  const handleRotate = (speed) => {
    setRotationSpeed(speed);

    if (speed > 10) {
      if (!intervalRef.current) {
        intervalRef.current = setInterval(async () => {
          if (isPlayingRef.current) return;
          isPlayingRef.current = true;

          const note = melody[noteIndex];
          if (note && note !== "-") {
            await playNote(note, 500);
          } else {
            await new Promise((res) => setTimeout(res, 500));
          }

          setNoteIndex((prev) => (prev + 1) % melody.length);
          isPlayingRef.current = false;
        }, Math.max(300, 1000 - speed * 10)); // 속도에 따라 간격 줄이기
      }
    } else {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);
    
  return (
    <MusicboxPlayDiv>
      <Title>
        <h1>♪ {title}</h1>
      </Title>
      <span>손잡이를 돌려 음악을 재생해보세요</span>
      {/* <button onClick={handlePlay}>음악 재생하기</button> */}
      <Notes melody={melody} rotationSpeed={rotationSpeed} />
      <MusicBoxComponent onRotate={handleRotate} />
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
        const notePosition = notePositions[note] || Math.random() * 90 + 5; // 정의되지 않은 음은 랜덤 위치
        const animationDuration = 5 - Math.min(rotationSpeed / 100, 1.5);

        return (
          <FloatingStar key={index} left={notePosition} duration={animationDuration}>
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