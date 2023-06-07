import Aside from "../components/Aside";
import tw from "tailwind-styled-components";

export default async function Home() {
  return (
    <Main>
      <Aside />

      <Aside banner={"banner"} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
`;
