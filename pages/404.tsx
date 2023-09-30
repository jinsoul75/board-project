import Image from 'next/image';
import tw from 'tailwind-styled-components';
import errorImg from '/public/images/404.jpg';

export default function Custom404() {
  return (
    <Div>
      <Image src={errorImg} alt="404Error" width={500} height={500} />
      <h1 className="text-4xl font-bold">Oops!</h1>
      <p className="text-xl">The page you&apos;re looking for doesn&apos;t exist.</p>
    </Div>
  );
}

const Div = tw.div`
  flex
`;
