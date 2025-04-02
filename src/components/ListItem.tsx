'use client';

import Link from 'next/link';

interface ListItemProps {
  id: string;
  title: string;
  subtitle?: string;
  href: string;
  editHref: string;
  showEditButton?: boolean;
}

export default function ListItem({
  title,
  subtitle,
  href,
  editHref,
  showEditButton = true,
}: ListItemProps) {
  return (
    <div className="block p-4 hover:bg-gray-50 transition-colors">
      <div className="flex justify-between items-center">
        <Link href={href} className="flex-1">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                {title}
              </h2>
              {subtitle && (
                <p className="text-sm text-gray-500">
                  {subtitle}
                </p>
              )}
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
        {showEditButton && (
          <Link
            href={editHref}
            className="ml-4 p-2 text-gray-400 hover:text-blue-600 transition-colors"
            title="Edit"
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
        )}
      </div>
    </div>
  );
} 