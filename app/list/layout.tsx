import React from 'react';
import Aside from '@/components/common/Aside';
import tw from 'tailwind-styled-components';

export default function ListtLayout({ children }: { children: React.ReactNode }) {
  return (
    <Main>
      <Aside />
      <Container>{children}</Container>
      <Aside banner={'banner'} />
    </Main>
  );
}

const Main = tw.main`
  flex
  p-[20px]
  mb-[40px]
`;

const Container = tw.div`
  flex
  flex-col
  grow
`;
