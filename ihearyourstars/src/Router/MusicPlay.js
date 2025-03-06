import styled from "styled-components";

const MusicPlayDiv = styled.div`
  padding: 30px 0;
`;

function MusicPlay() {
  return (
    <MusicPlayDiv>
      <h1>손잡이를 돌려</h1>
      <h1>음악을 재생해보세요</h1>
    </MusicPlayDiv>
  );
}

export default MusicPlay;
