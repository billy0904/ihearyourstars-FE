import styled from "styled-components";

const StyledButton = styled.button`
  height: 40px;
  min-width: 250px;
  width: 100%;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px white;
  margin-top: 30px;
`;

function Button(props) {
  return (
    <>
      <StyledButton onClick={props.onClick}>{props.text}</StyledButton>
    </>
  );
}

export default Button;
