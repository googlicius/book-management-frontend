'use client';

import { useRouter } from 'next/navigation';
import { useGetAuthorQuery, useUpdateAuthorMutation } from '@/gql/graphql';
import AuthorForm from '@/components/AuthorForm';
import { use } from 'react';

export default function EditAuthorPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { id } = use(params);
  const { data, loading: loadingAuthor } = useGetAuthorQuery({
    variables: { id },
  });
  const [updateAuthor, { loading: updating }] = useUpdateAuthorMutation();

  const handleSubmit = async (formData: { name: string; email: string }) => {
    try {
      await updateAuthor({
        variables: {
          id,
          updateAuthorInput: formData,
        },
      });
      router.push('/authors');
    } catch (error) {
      console.error('Error updating author:', error);
    }
  };

  if (loadingAuthor) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!data?.author) {
    return (
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Author not found
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Edit Author</h1>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <AuthorForm
          onSubmit={handleSubmit}
          initialData={{
            name: data.author.name,
            email: data.author.email,
          }}
          isLoading={updating}
        />
      </div>
    </div>
  );
} 