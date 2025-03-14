import styled, { keyframes } from "styled-components";
import React, { useEffect, useState } from 'react';
import { MusicBoxComponent } from '../components/MusicBoxComponent';
import { ReactComponent as Star1 } from "../img/MusicBox/Star1.svg";
import { ReactComponent as Star2 } from "../img/MusicBox/Star2.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { playMelody } from "../utils/PlayMelody";

function MusicboxPlay() {
  const [rotationSpeed, setRotationSpeed] =  (0);
  const nav = useNavigate();
  const location = useLocation();
  const { songId } = useParams();
  const { title, nickname, melody } = location.state || {};
  
  // location.state가 없을 경우 리다이렉트
    useEffect(() => {
      if (!melody) {
        nav(`/musicbox/${songId}`, { replace: true });
      }
    }, [nickname, melody, songId, nav]);
  
    useEffect(() => {
      if (!Array.isArray(melody)) {
        console.error("❌ melody가 배열이 아닙니다!", melody);
        return <p>노래 데이터를 불러오는 중 오류가 발생했습니다.</p>;
      }
      
    }, [melody]);

    // 버튼을 클릭해야 재생 가능하도록 수정
  
  return (
    <MusicboxPlayDiv>
      <Title>
        <h1>♪ {title}</h1>
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