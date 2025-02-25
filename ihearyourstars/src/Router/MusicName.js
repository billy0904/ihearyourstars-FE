import styled from "styled-components";
import Button from "../components/Button";

const MusicNameDiv = styled.div`
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

function MusicName() {
  return (
    <MusicNameDiv>
      <span>만들어진 오르골에 이름을 붙여볼까요?</span>
      <input placeholder="기본제목" required></input>
      <Button text="결정"></Button>
    </MusicNameDiv>
  );
}

export default MusicName;
