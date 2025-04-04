'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(path + '/');
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-900">
              Book Management
            </Link>
          </div>
          
          <div className="flex space-x-4">
            <Link
              href="/books"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/books')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Books
            </Link>
            <Link
              href="/authors"
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/authors')
                  ? 'bg-blue-100 text-blue-700'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              Authors
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
