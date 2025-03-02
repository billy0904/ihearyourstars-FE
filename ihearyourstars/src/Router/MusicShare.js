import styled, { keyframes } from "styled-components";
import Button from "../components/Button";
import { ReactComponent as Musicbox1 } from "../img/share/share_musicbox1.svg";
import { ReactComponent as Star } from "../img/MusicBox/musicbox_star.svg"
import { ReactComponent as Orbit } from "../img/MusicBox/orbit.svg";
import { useNavigate } from 'react-router-dom';

function MusicShare() {

  const musicTitle = "집에가고싶다";
  const songId = "12345";

  const nav = useNavigate();

  const handleCopyLink = async () => {
    const baseUrl = window.location.origin;
    const shareUrl = `${baseUrl}/musicbox/${songId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      alert("링크가 복사되었습니다!");
    } catch (err) {
      alert("복사에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const handleExit = () => {
    nav("/");
  };


  return (
    <MusicShareDiv>
      <Contents>
        <Title>
          <h1>{musicTitle}를</h1>
          <h1>간직하세요</h1>
        </Title>
        <MusicBoxDiv>
          <StarDiv>
            <Star />
          </StarDiv>
          <Musicbox1 />
        </MusicBoxDiv>
      </Contents>
      <Buttons>
        <Button text="링크 복사하기" onClick={handleCopyLink}></Button>
        <Button text="나가기" onClick={handleExit}></Button>
      </Buttons>
    </MusicShareDiv>
  );
}

const MusicShareDiv = styled.div`
  padding: 30px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const MusicBoxDiv = styled.div`
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
    top: 25%;
    left: 25%;
    z-index: 1;
    animation: ${floatAnimation} 3s infinite ease-in-out;
`;

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

`;

export default MusicShare;
