import styled, { keyframes } from "styled-components";
import { ReactComponent as Body } from "../img/MusicBox/musicbox_play.svg"
import { ReactComponent as Star } from "../img/MusicBox/musicbox_star.svg"
import { ReactComponent as Handle } from "../img/MusicBox/musicbox_handle.svg"

function MusicboxPlay() {
  return (
    <MusicboxPlayDiv>
      <Title>
        <h1>♪ 집에가고싶다</h1>
      </Title>
      <Notes />
      <MusicBox>
        <StarDiv>
          <Star />
        </StarDiv>
        <HandleDiv>
          <Handle />
        </HandleDiv>
        <Body />
      </MusicBox>
      <span>손잡이를 돌려 음악을 재생해보세요</span>
    </MusicboxPlayDiv>
  );
}

export default MusicboxPlay;

const MusicboxPlayDiv = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
    color: white;
    font-weight: 400;
    font-size: 15px;
  }
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  color: white;
  font-weight: 400;
  line-height: 40px;
  font-size: 20px;
`;

const Notes = styled.div`
  height: 470px;
`;

const MusicBox = styled.div`
  position: relative;
  width: 430px;
`;

const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-7%); }
  100% { transform: translateY(0); }
`;

const StarDiv = styled.div`
  position: absolute;
  top: -16%;
  left: 23%;
  z-index: 1;
  animation: ${floatAnimation} 3s infinite ease-in-out;
`;

const HandleDiv = styled.div`
  position: absolute;
  top: 37%;
  left: 44%;
  z-index: 2;
  cursor: pointer;
`;