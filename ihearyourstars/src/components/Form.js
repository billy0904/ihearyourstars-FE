import styled from "styled-components";

const StyledForm = styled.form`
  height: 100%;
  width: 230px;
  margin: 20px auto;
  text-align: center;
  input {
    padding: 7px;
    margin: 10px;
    height: 100%;
    width: 160px;
    background-color: transparent;
    border-bottom: 1px solid white;
    color: white;
  }
  div {
    min-height: 50px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  span {
    display: block;
    color: white;
  }
`;

export default StyledForm;
