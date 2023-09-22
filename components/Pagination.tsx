import Link from 'next/link';
import tw from 'tailwind-styled-components';

interface PaginationProps {
  totalPosts: number;
  currentPage: number;
  pageSize: number;
}

export default function Pagination({ totalPosts, currentPage, pageSize }:PaginationProps) {
  const totalPages = Math.ceil(totalPosts / pageSize);

  const generatePageLinks = () => {
    const links = [];
    for (let i = 1; i <= totalPages; i++) {
      links.push(
        <Link key={i} href={`/list/${i}`} className={i === currentPage ? "text-blue-600" : ""}>
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