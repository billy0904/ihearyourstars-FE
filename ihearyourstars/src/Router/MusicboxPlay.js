import styled, { keyframes } from "styled-components";
import React, { useEffect, useState, useRef } from 'react';
import { MusicBoxComponent } from '../components/MusicBoxComponent';
import { ReactComponent as Star1 } from "../img/MusicBox/Star1.svg";
import { ReactComponent as Star2 } from "../img/MusicBox/Star2.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { loadSoundFont, playNote } from "../utils/PlayMelody";

function MusicboxPlay() {

  const location = useLocation();
  const { title } = location.state || {};
    
  return (
    <MusicboxPlayDiv>
      <Title>
        <h1>♪ {title}</h1>
      </Title>
      <span>손잡이를 돌려 음악을 재생해보세요</span>
      {/* <button onClick={handlePlay}>음악 재생하기</button> */}
      <MusicBoxComponent />
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