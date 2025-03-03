import styled from "styled-components";
import Button from "../components/Button";
import StyledForm from "../components/Form";
import Line from "../components/Line";
import { useState } from "react";
import { ReactComponent as Musicbox } from "../img/MusicBox/Musicbox.svg";
import { useNavigate } from "react-router-dom";

const MusicNameDiv = styled.div`
  padding: 30px 0;
  input {
    width: 100% !important;
  }
  button {
    margin-top: 90px !important;
  }
`;

const MusicboxWrapper = styled.div`
  padding: 70px 0 0 0;
`;

function MusicName() {
  const [musicboxName, setMusicboxName] = useState("가빈의 별들");

  const nav = useNavigate();
  const location = useLocation();
  const { songId } = useParams();

  const handleChange = (e) => {
    setMusicboxName(e.target.value);
  };

  const handleSubmit = () => {
    // 유효성 검사
    if (!musicboxName) {
      alert("오르골에 이름을 붙여주세요.");
      return;
    }

    nav("/music/share/${songId}", { state: { musicboxName } });
  };

  return (
    <MusicNameDiv>
      <h1>만들어진 오르골에</h1>
      <h1>이름을 붙여볼까요?</h1>
      <MusicboxWrapper>
        <Musicbox />
      </MusicboxWrapper>
      <StyledForm>
        <div>
          <input value={musicboxName} onChange={handleChange} required></input>
          <Line />
        </div>
        <Button text="결정" onClick={handleSubmit}></Button>
      </StyledForm>
    </MusicNameDiv>
  );
}

export default MusicName;
