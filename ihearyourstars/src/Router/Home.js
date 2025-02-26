import StyledForm from "../components/Form";
import logo from "../img/logo.png";
import styled from "styled-components";
import line from "../img/line.png";
import bgEffect from "../img/bgEffect.png";

const BgEffect = styled.img`
  position: absolute;
  top: -8%;
  left: -20%;
  width: 85%;
  z-index: 0;
  pointer-events: none;
`;

const Logo = styled.img`
  width: 250px;
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

const Line = styled.img`
  width: 110%;
  position: absolute;
  top: 11%;
  left: -11%;
  pointer-events: none;
`;

const DateField = styled.select`
  padding: 10px;
  margin: 10px;
  background-color: transparent;
  color: white;
  & option {
    color: black;
  }
`;

`;

function Home() {
  return (
    <>
      <BgEffect src={bgEffect} />
      <Logo src={logo} />
      <DescriptionDiv>
        <span>
          너별들은 이러이러한 서비스인데요 이천이십오년 이월 이십 이일부터
          시작해서 이십팔일까지 진행한 프로젝트입니다 볼륨을 높여주세요 이어폰
          착용 권장 최대 네 줄 정도 나오면 좋을 것 같은데 뭐라고 넣지
        </span>
      </DescriptionDiv>

      <StyledForm>
        <div>
          <span>닉네임</span>
          <input
            placeholder="2~6자 이내"
            required
            minLength={1}
            maxLength={5}
          ></input>
          <Line src={line}></Line>
        </div>

        <div>
          <span>생일</span>
          <DateField>
            <option value="">월</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </DateField>
          <DateField>
            <option value="">일</option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}일
              </option>
            ))}
          </DateField>
          <Line src={line}></Line>
        </div>

        <div>
          <span>마음에 드는 별을 골라주세요</span>
          <Line src={line}></Line>
        </div>
        </div>
      </StyledForm>
    </>
  );
}

export default Home;
