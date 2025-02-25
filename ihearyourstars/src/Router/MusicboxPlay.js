import styled from "styled-components";

const MusicboxPlayDiv = styled.div`
  padding: 30px 0;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
    color: white;
    font-weight: 500;
    font-size: 30px;
  }
`;

function MusicboxPlay() {
  return (
    <MusicboxPlayDiv>
      <span>손잡이를 돌려 음악을 재생해보세요</span>
    </MusicboxPlayDiv>
  );
}

export default MusicboxPlay;
