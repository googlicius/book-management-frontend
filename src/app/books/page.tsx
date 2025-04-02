'use client';

import Link from 'next/link';
import { useGetBooksQuery, GetBooksQuery } from '@/gql/graphql';
import ListItem from '@/components/ListItem';

export default function BooksPage() {
  const { data, loading, error } = useGetBooksQuery({
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
          Error loading books: {error.message}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Books</h1>
        <Link
          href="/books/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
        >
          Add New Book
        </Link>
      </div>

      <div className="bg-white shadow rounded-lg divide-y">
        {data?.books.map((book: GetBooksQuery['books'][0]) => (
          <ListItem
            key={book.id}
            id={book.id}
            title={book.title}
            subtitle={`By ${book.author.name}`}
            href={`/books/${book.id}`}
            editHref={`/books/${book.id}/edit`}
          />
        ))}
      </div>
    </div>
  );
} 