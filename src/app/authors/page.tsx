'use client';

import Link from 'next/link';
import { useGetAuthorsQuery, GetAuthorsQuery } from '@/gql/graphql';
import ListItem from '@/components/ListItem';

export default function AuthorsPage() {
  const { data, loading, error } = useGetAuthorsQuery({
    fetchPolicy: 'cache-and-network',
  });

  if (loading && !data) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading authors: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Authors</h1>
        <Link
          href="/authors/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Author
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg divide-y">
        {data?.authors.map((author: GetAuthorsQuery['authors'][0]) => (
          <ListItem
            key={author.id}
            id={author.id}
            title={author.name}
            subtitle={`${author.books?.length ?? 0} ${author.books?.length === 1 ? 'book' : 'books'}`}
            href={`/authors/${author.id}`}
            editHref={`/authors/${author.id}/edit`}
          />
        ))}
      </div>
    </div>
  );
} 