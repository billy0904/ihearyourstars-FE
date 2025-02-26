import styled from "styled-components";
import Button from "../components/Button";
import { ReactComponent as CircleBg } from "../img/common/circle_bg.svg";
import { useNavigate } from 'react-router-dom';

function Musicbox() {
  const userName = "가빈";
  const musicTitle = "집에가고싶다";

  const nav = useNavigate();

  const handleNavigateHome = () => {
    nav('/');
  }

  return (
    <MusicboxTitleDiv>
      <Contents>
              <Title>
                <h1>{userName} 님의 오르골</h1>
                <h1>"{musicTitle}"</h1>
              </Title>
              <CircleBg />
              <Text>오르골을 눌러 노래를 들어보세요</Text>
            </Contents>
      <Button text="나도 만들기" onClick={handleNavigateHome}></Button>
    </MusicboxTitleDiv>
  );
}

const MusicboxTitleDiv = styled.div`
  position: relative;
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

const Text = styled.div`
  color: rgba(0, 0, 0, 0.50);
  font-weight: 400;
  line-height: 20px;
  font-size: 15px;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 47px;
  margin-bottom: 62px;

`;

export default Musicbox;
