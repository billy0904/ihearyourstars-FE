import styled from "styled-components";

const StyledForm = styled.form`
  height: 100%;
  width: 250px;
  margin: 20px auto;
  text-align: center;
  input {
    padding: 7px;
    margin: 10px;
    height: 100%;
    width: 160px;
    background-color: transparent;
    color: white;
  }
  div {
    min-height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  span {
    display: block;
    color: white;
    min-width: 50px;
  }
`;

export default StyledForm;
