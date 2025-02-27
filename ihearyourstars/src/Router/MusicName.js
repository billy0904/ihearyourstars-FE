import styled from "styled-components";
import Button from "../components/Button";
import StyledForm from "../components/Form";
import Line from "../components/Line";

const MusicNameDiv = styled.div`
  padding: 30px 0;
  }
`;

function MusicName() {
  return (
    <MusicNameDiv>
      <h1>만들어진 오르골에</h1>
      <h1>이름을 붙여볼까요?</h1>
      <StyledForm>
        <input placeholder="기본이름" required></input>
          <Line />
        <Button text="결정"></Button>
      </StyledForm>
    </MusicNameDiv>
  );
}

export default MusicName;
