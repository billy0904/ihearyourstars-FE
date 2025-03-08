import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Button from "../components/Button";
import StyledForm from "../components/Form";
import Line from "../components/Line";
import logo from "../img/common/logo.png";
import styled from "styled-components";
import { ReactComponent as CircleBg } from "../img/common/circle_bg.svg";
import starIcon from "../img/form/star.png";
import selectedStarIcon from "../img/form/selectedStar.png";

const BgEffect = styled(CircleBg)`
  position: absolute;
  top: -5%;
  left: -15%;
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

const DateField = styled.select`
  padding: 10px;
  margin: 10px;
  background-color: transparent;
  color: white;
  & option {
    color: black;
  }
`;

const StarsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center !important;
  margin-top: 5px;
`;

const StarsWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px !important;
  height: 75px !important;
`;

const Stars = styled.img`
  width: 75px;
  z-index: 1;
  filter: drop-shadow(0px 0px 10px ${({ shadowColor }) => shadowColor});
`;

const StarsName = styled.span`
  position: absolute;
  top: 52%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 11px;
  color: #9ea3fb !important;
  text-align: center;
  white-space: nowrap;
  pointer-events: none;
  z-index: 1;
`;

const StarsEffect = styled.img`
  position: absolute;
  top: -36%;
  left: -6.5%;
  width: 100px;
  opacity: ${({ isSelected }) => (isSelected ? 1 : 0)};
  filter: drop-shadow(0px 0px 10px ${({ shadowColor }) => shadowColor});
  pointer-events: none;
  z-index: 0;
`;

function Home() {
  const [nickname, setNickname] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [selectedStar, setSelectedStar] = useState(null);

  const starsData = [
    { name: "Antares", color: "#FFCBE4" },
    { name: "Sirius", color: "#D5FBFF" },
    { name: "Polaris", color: "#ffffff" },
    { name: "Capella", color: "rgba(255, 226, 203)" },
    { name: "Vega", color: "#D0FFE4" },
  ];

  const handleStarClick = (star) => {
    setSelectedStar(star);
  };

  const nav = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // 유효성 검사
    if (!nickname || !month || !day || !selectedStar) {
      alert("이름, 생일, 별을 올바르게 입력하세요!");
      return;
    }
    
    const birth = `${String(month).padStart(2, "0")}${String(day).padStart(2, "0")}`;
    const starNum = starsData.findIndex((star) => star.name === selectedStar) + 1;
  
    // Loading 페이지로 이동 (필요 데이터만 전달)
    nav("/loading", { state: { nickname, birth, starNum } });
  };
  

  return (
    <>
      <BgEffect />
      <Logo src={logo} />
      <DescriptionDiv>
        <span>
          너별들은 이러이러한 서비스인데요 이천이십오년 이월 이십 이일부터
          시작해서 이십팔일까지 진행한 프로젝트입니다 볼륨을 높여주세요 이어폰
          착용 권장 최대 네 줄 정도 나오면 좋을 것 같은데 뭐라고 넣지
        </span>
      </DescriptionDiv>

      <StyledForm onSubmit={handleSubmit}>
        <div>
          <span>닉네임</span>
          <input
            value={nickname}
            placeholder="2~6자 이내"
            required
            minLength={2}
            maxLength={6}
            onChange={(e) => setNickname(e.target.value)}
          ></input>
          <Line />
        </div>

        <div>
          <span>생일</span>
          <DateField
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
          >
            <option value="" disabled>
              월
            </option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}월
              </option>
            ))}
          </DateField>
          <DateField
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
          >
            <option value="" disabled>
              일
            </option>
            {Array.from({ length: 31 }, (_, i) => (
              <option key={i} value={i + 1}>
                {i + 1}일
              </option>
            ))}
          </DateField>
          <Line />
        </div>

        <div>
          <span>마음에 드는 별을 골라주세요</span>
          <Line />
        </div>
        <div>
          <StarsContainer>
            {starsData.map((star) => (
              <StarsWrapper key={star.name}>
                <Stars
                  key={star.name}
                  src={selectedStar === star.name ? "" : starIcon}
                  onClick={() => handleStarClick(star.name)}
                  className={selectedStar === star.name ? "selected" : ""}
                  shadowColor={star.color}
                />
                <StarsName>{star.name}</StarsName>
                <StarsEffect
                  src={selectedStarIcon}
                  isSelected={selectedStar === star.name}
                  shadowColor={star.color}
                ></StarsEffect>
              </StarsWrapper>
            ))}
          </StarsContainer>
        </div>

        <div>
          <Button text="완료" type="submit"></Button>
        </div>
      </StyledForm>
    </>
  );
}

export default Home;
