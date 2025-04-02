# Book Management System - Frontend

This is a modern web application built with Next.js for managing books, featuring a GraphQL API integration and a beautiful user interface.

## Technical Stack

- **Framework**: [Next.js](https://nextjs.org) 15.2.4
- **Language**: TypeScript
- **UI Library**: React 19
- **Styling**: TailwindCSS
- **GraphQL Client**: Apollo Client
- **Form Management**: React Hook Form with Yup validation
- **Code Generation**: GraphQL Code Generator

## Prerequisites

- Node.js (v18 or higher)
- npm or yarn package manager
- Access to the GraphQL backend API

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory with the following variables:
```env
NEXT_PUBLIC_GRAPHQL_URL=your_graphql_endpoint_url
```

## Development

1. Generate GraphQL types (first time setup):
```bash
npm run codegen
# or
yarn codegen
```

2. Start the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run codegen` - Generate GraphQL types
- `npm run codegen:watch` - Watch and regenerate GraphQL types on changes

## Project Structure

```
frontend/
├── app/                    # Next.js app directory
├── src/
│   ├── components/        # Reusable React components
│   ├── graphql/          # GraphQL queries and mutations
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions and configurations
│   └── types/            # TypeScript type definitions
├── public/               # Static assets
└── package.json          # Project dependencies and scripts
```

## Features

- Modern and responsive UI with TailwindCSS
- Type-safe GraphQL operations with code generation
- Form handling with validation
- Client-side state management with Apollo Client
- Server-side rendering capabilities

## Learn More

To learn more about the technologies used in this project:

- [Next.js Documentation](https://nextjs.org/docs)
- [Apollo Client Documentation](https://www.apollographql.com/docs/react/)
- [React Hook Form Documentation](https://react-hook-form.com/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## Deployment

The application can be deployed on any platform that supports Next.js applications. The recommended deployment platform is [Vercel](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

For more details about deployment, check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
