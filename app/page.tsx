import tw from 'tailwind-styled-components';
import Image from 'next/image';
import mainIng from '../public/images/main.jpg';

import Aside from '../components/Aside';

export default async function Home() {
  return (
    <div className="flex justify-between p-5">
      <Aside/>
      <main>
        <Image src={mainIng} alt="main-image" height={300} width={500} />
        <div> Hello World of Coding!</div>
      </main>
      <Aside banner={'banner'} />
    </div>
  );
}
