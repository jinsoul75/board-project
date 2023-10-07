import Image from 'next/image';
import mainIng from '../public/images/main.jpg';

export default async function Home() {
  return (
    <main className="flex justify-center flex-col items-center">
      <Image src={mainIng} alt="main-image" height={300} width={500} />
      <div className='font-bold text-3xl'>Hello World of Coding!</div>
    </main>
  );
}
