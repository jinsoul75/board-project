import Link from 'next/link';
import tw from 'tailwind-styled-components';
import { FcPrevious,FcNext } from 'react-icons/fc';

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
          className={`text-center p-2 mx-1 rounded-full w-10 hover:bg-blue-300 hover:text-white  ${
            i === currentPage ? 'bg-blue-400 text-white' : ''
          }`}
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
        <PageLink
          href={{
            pathname: `/${category}`,
            query: { page: `${prevPage}` },
          }}
        >
          <FcPrevious className="" />
        </PageLink>
      )}
      {generatePageLinks(currentPage)}
      {totalPages < ceilFive ? null : (
        <PageLink
          href={{
            pathname: `/${category}`,
            query: { page: `${nextPage}` },
          }}
        >
          <FcNext className="" />
        </PageLink>
      )}
    </Container>
  );
}

const Container = tw.div`
  flex
  justify-center
  p-2
  items-center
`;

const PageLink = tw(Link)`
  text-center
  p-2
  m-2
  rounded-full
  flex
  justify-center
  hover:bg-blue-100
`;
