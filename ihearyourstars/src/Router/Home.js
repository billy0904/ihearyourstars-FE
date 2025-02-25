import Form from "../components/Form";
import logo from "../img/logo.png";
import styled from "styled-components";

const Logo = styled.img`
  width: 200px;
`;

const DescriptionDiv = styled.div`
  padding: 30px;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
    color: white;
    font-weight: 500;
    font-size: 14px;
  }
`;

function Home() {
  return (
    <>
      <Logo src={logo} />
      <DescriptionDiv>
        <span>
          너별들은 이러이러한 서비스인데요 이천이십오년 이월 이십 이일부터
          시작해서 이십팔일까지 진행한 프로젝트입니다 볼륨을 높여주세요 이어폰
          착용 권장 최대 네 줄 정도 나오면 좋을 것 같은데 뭐라고 넣지
        </span>
      </DescriptionDiv>
      <Form />
    </>
  );
}

export default Home;
