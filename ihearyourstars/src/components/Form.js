import React, { useState } from "react";
import styled from "styled-components";
import Button from "./Button";

const StyledForm = styled.form`
  height: 100%;
  width: 200px;
  margin: 20px auto;
  text-align: center;
  input {
    padding: 7px;
    margin: 10px;
    height: 100%;
    width: 100%;
    background-color: transparent;
    border-bottom: 1px solid white;
    color: white;
  }
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

const DateField = styled.select`
  padding: 10px;
  margin: 10px;
  border-bottom: 1px solid white;
  background-color: transparent;
`;

const StarsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  button {
    padding: 10px;
    background-color: white;
    text-align: center;
    .selected {
      box-shadow: 0px 0px 5px red;
    }
  }
`;

function Form() {
  return (
    <>
      <StyledForm>
        <input placeholder="닉네임" required></input>
        <div>
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
        </div>
        <StarsContainer>
          <button class="star">태양</button>
          <button class="star">시리우스</button>
          <button class="star">북극성 (폴라리스)</button>
          <button class="star">알타이르</button>
          <button class="star">베가</button>
        </StarsContainer>
        <Button text="완료"></Button>
      </StyledForm>
    </>
  );
}

export default Form;
