'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useGetAuthorsQuery } from '@/gql/graphql';

interface BookFormData {
  title: string;
  description?: string;
  authorId: string;
  publishedAt: string;
}

interface BookFormProps {
  onSubmit: (data: BookFormData) => Promise<void>;
  defaultValues?: Partial<BookFormData>;
  submitLabel?: string;
}

export default function BookForm({
  onSubmit,
  defaultValues,
  submitLabel = 'Create Book',
}: BookFormProps) {
  const router = useRouter();
  const { data: authorsData } = useGetAuthorsQuery();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BookFormData>({
    defaultValues: {
      title: '',
      description: '',
      authorId: '',
      publishedAt: new Date().toISOString().split('T')[0],
      ...defaultValues,
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          {...register('title', { required: 'Title is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          {...register('description')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
      </div>

      <div>
        <label
          htmlFor="authorId"
          className="block text-sm font-medium text-gray-700"
        >
          Author
        </label>
        <select
          id="authorId"
          {...register('authorId', { required: 'Author is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          <option value="">Select an author</option>
          {authorsData?.authors.map((author) => (
            <option key={author.id} value={author.id}>
              {author.name}
            </option>
          ))}
        </select>
        {errors.authorId && (
          <p className="mt-1 text-sm text-red-600">{errors.authorId.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="publishedAt"
          className="block text-sm font-medium text-gray-700"
        >
          Publication Date
        </label>
        <input
          type="date"
          id="publishedAt"
          {...register('publishedAt', { required: 'Publication date is required' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        />
        {errors.publishedAt && (
          <p className="mt-1 text-sm text-red-600">
            {errors.publishedAt.message}
          </p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isSubmitting ? 'Saving...' : submitLabel}
        </button>
      </div>
    </form>
  );
} 