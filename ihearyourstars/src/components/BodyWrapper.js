import styled, { keyframes, css } from "styled-components";

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const BodyWrapper = styled.div`
  width: 100%;
  height: 100%;
  min-width: 100vw;
  min-height: 100vh;
  background: linear-gradient(120deg, #9098fd, #ffedf3);
  text-align: center;
  padding: 50px;
  z-index: -1;

  ${({ isLoading }) =>
    isLoading &&
    css`
      animation: ${gradientAnimation} 5s ease infinite;
      background-size: 200% 200%;
    `}
`;

export default BodyWrapper;
