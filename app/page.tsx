import Image from 'next/image';
import mainIng from '../public/images/main.jpg';

import Aside from '../components/common/Aside';

export default async function Home() {
  return (
    <div className="flex justify-between p-5 mb-[40px]">
      <Aside />
      <main className="flex justify-center flex-col">
        <Image src={mainIng} alt="main-image" height={300} width={500} />
        <div className='flex justify-center font-bold text-2xl'>
          <div>Hello World of Coding!</div>
        </div>
      </main>
      <Aside banner={'banner'} />
    </div>
  );
}
