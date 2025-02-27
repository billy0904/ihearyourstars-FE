import styled from "styled-components";

const LoadingDiv = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  span {
    display: block;
    width: 100%;
    background-color: transparent;
    color: white;
    font-weight: 500;
    font-size: 30px;
  }
`;

function Loading() {
  return (
    <LoadingDiv>
      <span>나의 오르골을</span>
      <span>만드는 중이에요</span>
    </LoadingDiv>
  );
}

export default Loading;
