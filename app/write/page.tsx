import tw from "tailwind-styled-components";
import Button from "../../components/Button";
import Aside from "../../components/Aside";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { redirect } from 'next/navigation';

export default async function write() {
  const session = await getServerSession(authOptions);
 if(!session){
  redirect('/api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2F')
 }
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
          <input
            name='date'
            defaultValue={new Date().toLocaleString()}
          ></input>
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
  p-[20px]
`;

const FormContainer = tw.div`
  flex
  flex-col
`;
