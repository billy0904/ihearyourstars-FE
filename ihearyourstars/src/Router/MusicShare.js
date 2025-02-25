import styled from "styled-components";
import Button from "../components/Button";

const MusicShareDiv = styled.div`
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

function MusicShare() {
  return (
    <MusicShareDiv>
      <span>"집에 가고 싶다" 를</span>
      <span>간직하세요</span>
      <Button text="링크 복사하기"></Button>
      <Button text="나가기"></Button>
    </MusicShareDiv>
  );
}

export default MusicShare;
