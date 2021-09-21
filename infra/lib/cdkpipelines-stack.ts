import { Construct, SecretValue, Stack, StackProps } from '@aws-cdk/core';
import { CodePipeline, CodePipelineSource, ShellStep } from "@aws-cdk/pipelines";
import { ApplicationStage } from './application-stage';

/**
 * The stack that defines the application pipeline
 */
export class CdkPipelineStack extends Stack {
    constructor(scope: Construct, id: string, props?: StackProps) {
        super(scope, id, props);

        const pipeline = new CodePipeline(this, 'Pipeline', {
            // The pipeline name
            pipelineName: 'OpenTeslaDashPipeline',

            // How it will be built and synthesized
            synth: new ShellStep('Synth', {
                // Where the source can be found
                input: CodePipelineSource.gitHub('dingcheng/open-tesla-dash', 'main'),

                // Install dependencies, build and run cdk synth
                commands: [
                    'npm install -g aws-cdk',
                    'cd infra',
                    'npm ci',
                    'npm run build',
                    'cdk synth'
                ],

                primaryOutputDirectory: 'infra/cdk.out'
            }),
        });

        // This is where we add the application stages
        // ...
        pipeline.addStage(new ApplicationStage(this, 'Prod', {
            env: {
                account: '194962086589',
                region: 'us-west-2'
            }
        }))
    }
}