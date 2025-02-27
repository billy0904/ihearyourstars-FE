import styled from "styled-components";
import Button from "../components/Button";
import StyledForm from "../components/Form";
import Line from "../components/Line";

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
      <span>만들어진 오르골에</span>
      <span>이름을 붙여볼까요?</span>
      <StyledForm>
        <input placeholder="기본이름" required></input>
          <Line />
        <Button text="결정"></Button>
      </StyledForm>
    </MusicNameDiv>
  );
}

export default MusicName;
