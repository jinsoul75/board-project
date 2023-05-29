"use client";
import tw from "tailwind-styled-components";
import Button from "../components/Button";
import Aside from "../components/Aside";

export default function write() {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  console.log(`${year}-${month + 1}-${day}`);
  return (
    <Container>
      <Aside />
      <FormContainer>
        <h4>새글작성</h4>
        <form action='/api/post/new' method='POST'>
          <label htmlFor='category'>카테고리</label>
          <select id='category' name='category'>
            <option value='FRONTEND'>프론트앤드</option>
            <option value='BACKEND'>백앤드</option>
          </select>
          <label htmlFor='title'>제목</label>
          <StyledInput id='title' name='title' type='text'></StyledInput>
          <label htmlFor='content'>내용</label>
          <StyledTextarea id='content' name='content'></StyledTextarea>
          <StyledInput
            name='date'
            defaultValue={`${year}-${month + 1}-${day}`}
          ></StyledInput>
          <Button buttonName={"Submit"} />
        </form>
      </FormContainer>
      <Aside banner={"banner"} />
    </Container>
  );
}
const StyledInput = tw.input`
border
border-indigo-600
rounded-lg
`;

const StyledTextarea = tw.textarea`
border
border-indigo-600
rounded-lg
w-60
resize-none	
`;

const Container = tw.div`
  flex
`;

const FormContainer = tw.div`
  flex
  flex-col
`;
