import styled from "styled-components";
import Button from "../components/Button";
import { ReactComponent as CircleBg } from "../img/common/circle_bg.svg";
import { ReactComponent as Orbit } from "../img/MusicBox/orbit.svg";

function MusicShare() {
  const musicTitle = "집에가고싶다";

  return (
    <MusicShareDiv>
      <Contents>
        <Title>
          <h1>{musicTitle}를</h1>
          <h1>간직하세요</h1>
        </Title>
        <CircleBg />
      </Contents>
      <Button text="링크 복사하기"></Button>
      <Button text="나가기"></Button>
    </MusicShareDiv>
  );
}

const MusicShareDiv = styled.div`
  padding: 30px 0;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;

  color: white;
  font-weight: 400;
  line-height: 40px;
  font-size: 32px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 47px;
  margin-bottom: 62px;

  `;

export default MusicShare;
