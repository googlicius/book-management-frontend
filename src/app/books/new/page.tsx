'use client';

import { useRouter } from 'next/navigation';
import { useCreateBookMutation } from '@/gql/graphql';
import BookForm from '@/components/BookForm';

export default function NewBookPage() {
  const router = useRouter();
  const [createBook] = useCreateBookMutation();

  const handleSubmit = async (data: {
    title: string;
    description?: string;
    authorId: string;
    publishedAt: string;
  }) => {
    try {
      await createBook({
        variables: {
          createBookInput: {
            title: data.title,
            description: data.description,
            authorId: data.authorId,
            publishedAt: new Date(data.publishedAt).toISOString(),
          },
        },
      });
      router.push('/books');
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">New Book</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <BookForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
} 