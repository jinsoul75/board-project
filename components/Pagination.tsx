import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { GrCaretPrevious, GrCaretNext } from 'react-icons/gr';
interface PaginationProps {
  totalPosts: number;
  currentPage: number;
  pageSize: number;
  category: string;
}

export default function Pagination({
  totalPosts,
  currentPage,
  pageSize,
  category,
}: PaginationProps) {
  const totalPages = Math.ceil(totalPosts / pageSize);

  const FloorFive = 5 * Math.floor(currentPage / 5);
  const ceilFive = 5 * Math.ceil(currentPage / 5);

  const prevPage = FloorFive - 4;
  const nextPage = ceilFive + 1;

  const startPage = ceilFive - 4;

  const generatePageLinks = (currentPage: number) => {
    const links = [];

    const lastPage = totalPages >= ceilFive ? startPage + 4 : totalPages;
    for (let i = startPage; i <= lastPage; i++) {
      links.push(
        <Link
          key={i}
          href={{
            pathname: `/${category}`,
            query: { page: `${i}` },
          }}
          className={`p-2 border ${i === currentPage ? 'text-blue-600' : ''}`}
        >
          {i}
        </Link>,
      );
    }
    return links;
  };

  return (
    <Container>
      {currentPage <= 5 ? null : (
        <Link
          href={{
            pathname: `/${category}`,
            query: { page: `${prevPage}` },
          }}
        >
          <GrCaretPrevious />
        </Link>
      )}
      {generatePageLinks(currentPage)}
      {totalPages < ceilFive ? null : (
        <Link
          href={{
            pathname: `/${category}`,
            query: { page: `${nextPage}` },
          }}
        >
          <GrCaretNext />
        </Link>
      )}
    </Container>
  );
}

const Container = tw.div`
    flex
    justify-center
    p-2
    border
    border-soul-black
    items-center
`;

const PageLink = tw(Link)`
  
`;
