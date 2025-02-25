import styled from "styled-components";

const MusicDiv = styled.div`
  padding: 100px 0;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
    color: white;
    font-weight: 500;
    font-size: 30px;
  }
`;

function Music() {
  return (
    <MusicDiv>
      <span>오르골을 눌러</span>
      <span>음악을 들어보세요</span>
    </MusicDiv>
  );
}

export default Music;
