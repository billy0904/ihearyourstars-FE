import styled from "styled-components";

const StyledButton = styled.button`
  height: 40px;
  width: 100px;
  margin: 20px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 10px;
  box-shadow: 0px 0px 5px white;
`;

function Button(props) {
  return (
    <>
      <StyledButton>{props.text}</StyledButton>
    </>
  );
}

export default Button;
