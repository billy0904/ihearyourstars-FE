import styled from "styled-components";

const LoadingDiv = styled.div`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Loading() {
  return (
    <LoadingDiv>
      <h1>나의 오르골을</h1>
      <h1>만드는 중이에요</h1>
    </LoadingDiv>
  );
}

export default Loading;
