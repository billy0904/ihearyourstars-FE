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
  const { songId } = useParams();
  const { nickname, melody } = location.state || {};
  const [canPlay, setCanPlay] = useState(false);

  // location.state가 없을 경우 리다이렉트
  useEffect(() => {
    if (!melody) {
      nav(`/musicbox/${songId}`, { replace: true });
    }
  }, [nickname, melody, songId, nav]);

  // 버튼을 클릭해야 재생 가능하도록 수정
  const handlePlay = async () => {
    setCanPlay(true); // 상태 변경 (사용자 액션 발생)
    await playMelody(melody, () => {}); // 이제 안전하게 실행 가능
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
