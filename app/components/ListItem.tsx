"use client";
import Link from "next/link";
import tw from "tailwind-styled-components";

export default function ListItem({ result }: any) {
  return (
    <StyledUl>
      {result.map((_: any, i: any) => (
        <StyledListItem key={i}>
          <h4>{result[i].category}</h4>
          <Link prefetch={false} href={`/detail/${result[i]._id}`}>
            <h4>{result[i].title}</h4>
          </Link>
          <p>{result[i].content}</p>
          <h4>{result[i].date}</h4>
          <h4>{result[i].author}</h4>
        </StyledListItem>
      ))}
    </StyledUl>
  );
}

const StyledUl = tw.ul`
grow
`;
const StyledListItem = tw.li`
border
border-indigo-600
m-1
rounded-lg
`;
