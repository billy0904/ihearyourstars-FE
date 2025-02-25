import styled from "styled-components";
import Button from "../components/Button";

const MusicboxTitleDiv = styled.div`
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

function Musicbox() {
  return (
    <MusicboxTitleDiv>
      <span>가빈 님의 오르골</span>
      <span>"집에 가고 싶다"</span>
      <span>오르골을 눌러</span>
      <span>음악을 들어보세요</span>
      <Button text="나도 만들기"></Button>
    </MusicboxTitleDiv>
  );
}

export default Musicbox;
