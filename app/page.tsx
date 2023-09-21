import tw from "tailwind-styled-components";

import Aside from "../components/Aside";

export default async function Home() {
  return (
    <>
      <Main>
        <Aside />
        <div>뭔가 멋진 메인 사진을 걸고 싶어요 캐러셀같은거 넣으면 좋겠다</div>
        <Aside banner={"banner"} />
      </Main>
    </>
  );
}

const Main = tw.main`
  flex
  justify-between
  p-[20px]
`;
