import styled from "styled-components";
import Button from "../components/Button";
import StyledForm from "../components/Form";
import Line from "../components/Line";
import { useState } from "react";
import { ReactComponent as Musicbox } from "../img/MusicBox/Musicbox.svg";
import { useNavigate, useLocation, useParams } from "react-router-dom";
import { updateSongTitle } from "../services/SupabaseService";

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
  const [title, setTitle] = useState("");

  const nav = useNavigate();
  const location = useLocation();
  const { nickname } = location.state || {};
  const { songId } = useParams();

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 자동 제출 방지
    
    if (!title.trim()) {
      alert("오르골에 이름을 붙여주세요.");
      return;
    }
  
    // 제목 변경
    await updateSongTitle(songId, title);
    nav(`/music/share/${songId}`, { state: { title } });
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
          <input value={title} onChange={handleChange} required></input>
          <Line />
        </div>
        <Button text="결정" onClick={handleSubmit}></Button>
      </StyledForm>
    </MusicNameDiv>
  );
}

export default MusicName;
