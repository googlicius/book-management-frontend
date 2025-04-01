'use client';

import Link from 'next/link';
import { useGetAuthorsQuery, GetAuthorsQuery } from '@/gql/graphql';

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
          <div
            key={author.id}
            className="block p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex justify-between items-center">
              <Link
                href={`/authors/${author.id}`}
                className="flex-1"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                      {author.name}
                    </h2>
                    <p className="text-sm text-gray-500">
                      {author.books?.length ?? 0} {author.books?.length === 1 ? 'book' : 'books'}
                    </p>
                  </div>
                  <div className="text-gray-400">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </Link>
              <Link
                href={`/authors/${author.id}/edit`}
                className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors"
                title="Edit author"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 