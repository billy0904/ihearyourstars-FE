import styled, { keyframes } from "styled-components";
import Button from "../components/Button";
import { ReactComponent as Musicbox1 } from "../img/share/share_musicbox1.svg";
import { ReactComponent as Star } from "../img/MusicBox/musicbox_star.svg"
import { useNavigate, useParams } from 'react-router-dom';

function Musicbox() {
  const nav = useNavigate();
  const { songId } = useParams();
  const { melody, nickname, title, loading, error } = useFetchSong(songId);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>데이터를 불러오는 중 오류가 발생했습니다.</p>;

  const handleNavigateHome = () => {
    nav("/");
  };

  const handleNavigatePlay = () => {
    if (!melody) {
      alert("멜로디 데이터를 불러오는 중입니다. 잠시 후 다시 시도하세요.");
      return;
    }
    nav(`/musicbox/play/${songId}`, { state: { melody, nickname, title } });
  };
  
  return (
    <MusicboxTitleDiv>
      <Contents>
        <Title>
          <h1>{nickname} 님의 오르골</h1>
          <h1>"{title}"</h1>
        </Title>
        <MusicBoxDiv onClick={handleNavigatePlay}>
          <StarDiv>
            <Star />
          </StarDiv>
          <Musicbox1 />
        </MusicBoxDiv>
        <Text>오르골을 눌러 노래를 들어보세요</Text>
      </Contents>
      <Buttons>
        <Button text="나도 만들기" onClick={handleNavigateHome}></Button>
      </Buttons>
    </MusicboxTitleDiv>
  );
}

const MusicboxTitleDiv = styled.div`
  position: relative;
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
`;

const blinkAnimation = keyframes`
  0% { opacity: 0.3; }
  50% { opacity: 0.5; }
  100% { opacity: 0.3; }
`;

const Text = styled.div`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 400;
  line-height: 20px;
  font-size: 15px;
  animation: ${blinkAnimation} 3s infinite ease-in-out;
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
  cursor: pointer;
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

export default Musicbox;
