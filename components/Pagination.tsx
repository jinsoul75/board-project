import Link from 'next/link';
import tw from 'tailwind-styled-components';

export default function Pagination({ totalPosts, currentPage, pageSize }) {
  const totalPages = Math.ceil(totalPosts / pageSize);

  const generatePageLinks = () => {
    const links = [];

    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <Link key={i} href={`/list/${i}`} className={i === currentPage ? "text-red" : ""}>
          {i}
        </Link>
      );
    }
    return links;
  };

  return <Container>{generatePageLinks()}</Container>;
}

const Container = tw.div`
    flex
    justify-center
    border
    border-soul-black
`