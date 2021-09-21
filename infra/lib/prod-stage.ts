import { CfnOutput, Construct, Stage, StageProps } from '@aws-cdk/core';
import { DataStreamStack } from './datastream_stack';

/**
 * Deployable unit of web service app
 */
export class ProdStage extends Stage {
  public readonly urlOutput: CfnOutput;
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new DataStreamStack(this, 'WebService');
    
    // Expose CdkpipelinesDemoStack's output one level higher
    this.urlOutput = service.urlOutput;
  }
}