'use client';

import { gql } from '@apollo/client';
import { useQuery } from '@apollo/client/react';
import Image from 'next/image';

const HELLO_QUERY = gql`
  query HelloQuery {
    hello
  }
`;

export default function Home() {
  const { data, loading, error } = useQuery<{ hello: string }>(HELLO_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div className="font-mono text-center sm:text-left">
          {data && <p>{data.hello}</p>}
        </div>
      </main>
    </div>
  );
}
