#!/usr/bin/env node
import 'source-map-support/register';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as cdk from 'aws-cdk-lib';
import { AmplifyDeploymentStack } from '../lib/amplify-stack';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const app = new cdk.App();

// Helper function to get environment variables with fallbacks
const getEnvValue = (key: string, defaultValue?: string): string => {
  return process.env[key] || defaultValue || '';
};

// Validate required environment variables
const githubToken = getEnvValue('GITHUB_TOKEN');
if (!githubToken) {
  throw new Error('GITHUB_TOKEN environment variable is required but not set');
}

const repoOwner = getEnvValue('REPO_OWNER');
if (!repoOwner) {
  throw new Error('REPO_OWNER environment variable is required but not set');
}

const repoName = getEnvValue('REPO_NAME');
if (!repoName) {
  throw new Error('REPO_NAME environment variable is required but not set');
}

// Create the stack with parameters from environment variables
new AmplifyDeploymentStack(app, 'NextJsAmplifyDeployment', {
  env: { 
    account: process.env.CDK_DEFAULT_ACCOUNT, 
    region: process.env.CDK_DEFAULT_REGION
  },
  description: 'Amplify Deployment for NextJS Application',
  
  // Required parameters
  repoOwner: repoOwner,
  repoName: repoName,
  appName: getEnvValue('APP_NAME', 'NextJsApplication'),
  githubToken: githubToken,
  
  // Optional parameters with defaults
  prodBranchName: getEnvValue('PROD_BRANCH', 'main'),
  devBranchName: getEnvValue('DEV_BRANCH', ''),
  featureBranchName: getEnvValue('FEATURE_BRANCH_NAME', ''),
  
  // Environment variables
  environmentVariables: {
    // Global environment variables for all environments
    // NODE_ENV: 'production',
  },
  
  // Production-specific environment variables
  prodEnvironmentVariables: {
    NEXT_PUBLIC_GRAPHQL_URL: getEnvValue('PROD_GRAPHQL_URL', 'https://api.example.com/graphql'),
  },
  
  // Development-specific environment variables
  devEnvironmentVariables: {
    NEXT_PUBLIC_GRAPHQL_URL: getEnvValue('DEV_GRAPHQL_URL', 'https://api-dev.example.com/graphql'),
  },
  
  // Feature branch-specific environment variables
  featureEnvironmentVariables: {
    NEXT_PUBLIC_GRAPHQL_URL: getEnvValue('DEV_GRAPHQL_URL', 'https://api-dev.example.com/graphql'),
  },
});
