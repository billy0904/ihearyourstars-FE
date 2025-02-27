import styled from "styled-components";
import line from "../img/form/line.png";

const StyledLine = styled.img`
  width: 110%;
  position: absolute;
  top: 11%;
  left: -11%;
  pointer-events: none;
`;

function Line() {
  return (
    <>
      <StyledLine src={line}></StyledLine>
    </>
  );
}

export default Line;
