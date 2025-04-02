'use client';

import { useRouter } from 'next/navigation';
import { useGetBookQuery, useUpdateBookMutation } from '@/gql/graphql';
import BookForm from '@/components/BookForm';
import { use } from 'react';

export default function EditBookPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter();
  const { data, loading, error } = useGetBookQuery({
    variables: { id },
  });
  const [updateBook] = useUpdateBookMutation();

  if (loading) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !data?.book) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error loading book: {error?.message || 'Book not found'}
        </div>
      </div>
    );
  }

  const handleSubmit = async (formData: {
    title: string;
    description?: string;
    authorId: string;
    publishedAt: string;
  }) => {
    try {
      await updateBook({
        variables: {
          id: id,
          updateBookInput: {
            title: formData.title,
            description: formData.description,
            authorId: formData.authorId,
            publishedAt: new Date(formData.publishedAt).toISOString(),
          },
        },
      });
      router.push('/books');
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <BookForm
          onSubmit={handleSubmit}
          defaultValues={{
            title: data.book.title,
            description: data.book.description || '',
            authorId: data.book.author.id,
            publishedAt: new Date(data.book.publishedAt).toISOString().split('T')[0],
          }}
          submitLabel="Update Book"
        />
      </div>
    </div>
  );
}
