# AWS Amplify Deployment Infrastructure

This directory contains the infrastructure as code (using AWS CDK) for deploying Next.js applications with AWS Amplify. The setup is generic and can be used for any Next.js application.

## Prerequisites

1. AWS CLI installed and configured
2. Node.js and npm installed
3. AWS CDK installed globally: `npm install -g aws-cdk`
4. GitHub personal access token (with repo scope)

## Infrastructure Overview

The CDK stack creates:
- An AWS Amplify application connected to your GitHub repository
- Branch deployments for production, development, and feature branches
- Environment-specific configurations
- Automatic deployments when code is pushed to the repository

## Configuration

You can configure the deployment using environment variables:

1. **Environment File**: Copy `.env.example` to `.env` and set your values
2. **Command Line**: Set variables when running CDK commands
3. **Direct Code Edit**: Modify the CDK app in `bin/book-management-app.ts`

### Required Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `REPO_OWNER` | GitHub username or organization | None (required) |
| `REPO_NAME` | Repository name | None (required) |
| `APP_NAME` | Name shown in AWS console | "NextJsApplication" |
| `GITHUB_TOKEN` | GitHub personal access token | None (required) |

### Optional Configuration

| Parameter | Description | Default |
|-----------|-------------|---------|
| `APP_PATH` | Path to application in repo | "frontend" |
| `PROD_BRANCH` | Production branch name | "main" |
| `DEV_BRANCH` | Development branch name | "develop" |
| `FEATURE_BRANCH_NAME` | Specific feature branch to deploy | "" (empty = not deployed) |
| `PROD_GRAPHQL_URL` | GraphQL endpoint for production | Default URL |
| `DEV_GRAPHQL_URL` | GraphQL endpoint for development | Default URL |

## GitHub Token

The GitHub token is used to connect AWS Amplify to your GitHub repository. Create a personal access token with the following scopes:
- `repo` (Full control of private repositories)
- `admin:repo_hook` (Full control of repository webhooks)

Store this token in your `.env` file as `GITHUB_TOKEN=your_token_here`. This token should be kept secure and never committed to your repository.

## Feature Branches

AWS Amplify doesn't support wildcard branch patterns (like "feature/*") via CDK. Instead:

1. **Initial Deployment**: You can specify a single feature branch to deploy in `.env` 
2. **Additional Branches**: After deployment, you can add more branches through the AWS Amplify Console
3. **Automated Approach**: For automated feature branch deployments, consider adding a GitHub Actions workflow

## Deployment Instructions

1. Set up your environment variables:
   ```
   cp .env.example .env
   # Edit .env with your configuration values including GitHub token
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Bootstrap your AWS environment (if not already done):
   ```
   cdk bootstrap
   ```

4. Deploy the infrastructure:
   ```
   cdk deploy
   ```

5. To override environment variables from command line:
   ```
   REPO_OWNER=myusername REPO_NAME=myrepo GITHUB_TOKEN=mytoken cdk deploy
   ```

## How It Works

When deployed, the infrastructure:
1. Creates an Amplify application linked to your GitHub repository
2. Sets up branch deployments with environment-specific variables
3. Configures automatic builds when code is pushed
4. Deploys your Next.js application to AWS Amplify hosting

When you push changes to any configured branch, Amplify automatically:
1. Detects the change
2. Pulls the latest code
3. Builds the application according to the buildspec
4. Deploys the new version

## Adding New Branches

After deployment, you can add more branches to your Amplify app:
1. Go to the AWS Amplify Console
2. Select your app
3. Navigate to the "Hosting" section
4. Click on "Connect branch" 
5. Select the branch you want to deploy
6. Configure build settings if needed

## Monitoring Deployments

You can monitor deployments in the AWS Amplify Console, which shows:
- Build logs
- Deployment status
- Deployment history
- Preview URLs

## Cleaning Up

To remove all deployed resources:
```
cdk destroy
``` 