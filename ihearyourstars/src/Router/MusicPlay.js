import styled from "styled-components";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { playMelody } from "../utils/PlayMelody";

const MusicPlayDiv = styled.div`
  padding: 30px 0;
`;

function MusicPlay() {
  const nav = useNavigate();
  const location = useLocation();
  const { nickname, melody } = location.state || {};
  const { songId } = useParams();
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    if (!melody) {
      nav(`/music/${songId}`, { replace: true });
    }
  }, [nickname, melody, songId, nav]);

  // 버튼을 클릭해야 재생 가능
  const handlePlay = async () => {
    if (!canPlay) {
      setCanPlay(true); // 상태 변경
      await playMelody(melody, () => {});
    }
  };

  return (
    <MusicPlayDiv>
      <h1>손잡이를 돌려</h1>
      <h1>음악을 재생해보세요</h1>
      <button onClick={handlePlay}>🎵 음악 재생하기</button>
    </MusicPlayDiv>
  );
}

export default MusicPlay;
