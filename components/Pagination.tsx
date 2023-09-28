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

  const generatePageLinks = (currentPage: number) => {
    const links = [];

    const standardPage = 5 * Math.ceil(currentPage / 5) - 4;

    const lastPage =
      totalPages >= 5 * Math.ceil(currentPage / 5) ? 5 * Math.ceil(currentPage / 5) : totalPages;

    for (let i = standardPage; i <= lastPage; i++) {
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
            query: { page: `${5 * Math.floor(currentPage / 5) - 4}` },
          }}
        >
          <GrCaretPrevious />
        </Link>
      )}

      {generatePageLinks(currentPage)}
      {currentPage > 5 && currentPage <= totalPages ? null : (
        <Link
          href={{
            pathname: `/${category}`,
            query: { page: `${5 * Math.ceil(currentPage / 5) + 1}` },
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
