import Link from 'next/link';

export interface ProfileType {
  name: string;
  introPhrase: string;
  historyData: string[];
  blog: string;
  github: string;
  email: string;
}

export default function Profile({ info }: { info: ProfileType }) {

  return (
    <section>
      <h2>{info.name}</h2>
      <div>{info.introPhrase}</div>
      <ul>
        {info.historyData.map((history) => {
          return <li>{history}</li>;
        })}
      </ul>
      <Link href={info.blog}>{info.blog}</Link>
      <Link href={info.github}>{info.github}</Link>
      <div>{info.email}</div>
    </section>
  );
}
