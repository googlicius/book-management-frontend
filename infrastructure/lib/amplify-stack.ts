import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as amplify from 'aws-cdk-lib/aws-amplify';

export interface AmplifyDeploymentProps extends cdk.StackProps {
  /** Repository owner (username or organization) */
  readonly repoOwner: string;
  /** Repository name */
  readonly repoName: string;
  /** Application name shown in AWS console */
  readonly appName: string;
  /** GitHub access token */
  readonly githubToken: string;
  /** Production branch name */
  readonly prodBranchName?: string;
  /** Development branch name */
  readonly devBranchName?: string;
  /** Feature branch name (for preview) */
  readonly featureBranchName?: string;
  /** Environment variables for all branches */
  readonly environmentVariables?: Record<string, string>;
  /** Production-specific environment variables */
  readonly prodEnvironmentVariables?: Record<string, string>;
  /** Development-specific environment variables */
  readonly devEnvironmentVariables?: Record<string, string>;
  /** Feature branch-specific environment variables */
  readonly featureEnvironmentVariables?: Record<string, string>;
}

export class AmplifyDeploymentStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: AmplifyDeploymentProps) {
    super(scope, id, props);

    // Set defaults for optional properties
    const {
      repoOwner,
      repoName,
      appName,
      githubToken,
      prodBranchName = 'main',
      devBranchName = 'develop',
      featureBranchName,
      environmentVariables = {},
      prodEnvironmentVariables = {},
      devEnvironmentVariables = {},
      featureEnvironmentVariables = {}
    } = props;

    // Convert environment variables to Amplify format
    const convertEnvVars = (envVars: Record<string, string>) => {
      return Object.entries(envVars).map(([name, value]) => ({ name, value }));
    };

    // Base environment variables
    const baseEnvVars = convertEnvVars(environmentVariables);

    // Create the Amplify App
    const amplifyApp = new amplify.CfnApp(this, 'AmplifyApp', {
      name: appName,
      repository: `https://github.com/${repoOwner}/${repoName}`,
      accessToken: githubToken,
      platform: 'WEB_COMPUTE',
      buildSpec: `
        version: 1
        frontend:
          phases:
            preBuild:
              commands:
                - npm ci --cache .npm --prefer-offline
            build:
              commands:
                - npm run build
          artifacts:
            baseDirectory: .next
            files:
              - '**/*'
          cache:
            paths:
              - .next/cache/**/*
              - .npm/**/*
      `,
      customRules: [
        {
          "source": "/<*>",
          "status": "404-200",
          "target": "/index.html"
        }
      ],
      environmentVariables: baseEnvVars,
    });

    // Create a branch for the production deployment
    if (prodBranchName) {
      const prodEnvVars = [...baseEnvVars, ...convertEnvVars(prodEnvironmentVariables)];
      new amplify.CfnBranch(this, 'ProductionBranch', {
        appId: amplifyApp.attrAppId,
        branchName: prodBranchName,
        enableAutoBuild: true,
        stage: 'PRODUCTION',
        environmentVariables: prodEnvVars,
      });
      
      // Output the production URL
      new cdk.CfnOutput(this, 'ProductionAppURL', {
        value: `https://${prodBranchName}.${amplifyApp.attrDefaultDomain}`,
        description: 'URL of the Production Amplify application',
      });
    }
    
    // Create a branch for the development deployment
    if (devBranchName) {
      const devEnvVars = [...baseEnvVars, ...convertEnvVars(devEnvironmentVariables)];
      new amplify.CfnBranch(this, 'DevelopmentBranch', {
        appId: amplifyApp.attrAppId,
        branchName: devBranchName,
        enableAutoBuild: true,
        stage: 'DEVELOPMENT',
        environmentVariables: devEnvVars,
      });
      
      // Output the development URL
      new cdk.CfnOutput(this, 'DevelopmentAppURL', {
        value: `https://${devBranchName}.${amplifyApp.attrDefaultDomain}`,
        description: 'URL of the Development Amplify application',
      });
    }
    
    // Optional: Configure a specific feature branch for preview
    if (featureBranchName) {
      const featureEnvVars = [...baseEnvVars, ...convertEnvVars(featureEnvironmentVariables)];
      new amplify.CfnBranch(this, 'FeatureBranch', {
        appId: amplifyApp.attrAppId,
        branchName: featureBranchName,
        enableAutoBuild: true,
        stage: 'DEVELOPMENT',
        environmentVariables: featureEnvVars,
      });
      
      // Output the feature branch URL
      new cdk.CfnOutput(this, 'FeatureBranchURL', {
        value: `https://${featureBranchName}.${amplifyApp.attrDefaultDomain}`,
        description: 'URL of the Feature Branch preview',
      });
    }
    
    // Output instructions for adding new branches later
    new cdk.CfnOutput(this, 'AddNewBranchInstructions', {
      value: `To add a new branch, go to AWS Amplify Console: https://console.aws.amazon.com/amplify/home?region=${this.region}#/${amplifyApp.attrAppId}/main/branches`,
      description: 'Instructions for adding new branches',
    });
    
    // Output the Amplify App ID
    new cdk.CfnOutput(this, 'AmplifyAppId', {
      value: amplifyApp.attrAppId,
      description: 'Amplify App ID',
    });
  }
}
