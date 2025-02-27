import styled, { keyframes } from "styled-components";
import { MusicBox } from '../components/MusicBox';
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
      <MusicBox />
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