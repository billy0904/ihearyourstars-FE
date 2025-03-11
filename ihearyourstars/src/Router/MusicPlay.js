import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { playMelody } from "../utils/PlayMelody";

const MusicPlayDiv = styled.div`
  padding: 30px 0;
`;

function MusicPlay() {
  const nav = useNavigate();
  const location = useLocation();
  const { nickname, melody } = location.state || {};
  const { songId } = useParams();

  useEffect(() => {
    if (melody) {
      playMelody(melody, () => {});
    }
  }, [melody]);

  return (
    <MusicPlayDiv>
      <h1>손잡이를 돌려</h1>
      <h1>음악을 재생해보세요</h1>
    </MusicPlayDiv>
  );
}

export default MusicPlay;