'use client';

import { useRouter } from 'next/navigation';
import { useCreateAuthorMutation } from '@/gql/graphql';
import AuthorForm from '@/components/AuthorForm';

export default function NewAuthorPage() {
  const router = useRouter();
  const [createAuthor, { loading }] = useCreateAuthorMutation();

  const handleSubmit = async (data: { name: string; email: string }) => {
    try {
      await createAuthor({
        variables: {
          createAuthorInput: data,
        },
      });
      router.push('/authors');
    } catch (error) {
      console.error('Error creating author:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">New Author</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <AuthorForm onSubmit={handleSubmit} isLoading={loading} />
      </div>
    </div>
  );
} 