import { CfnOutput, Construct, Stage, StageProps } from 'monocdk';
import { DataStreamStack } from './datastream-stack';

/**
 * Deployable unit of web service app
 */
export class ApplicationStage extends Stage {
  public readonly urlOutput: CfnOutput;
  
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const service = new DataStreamStack(this, 'DataStream');
    
    // Expose CdkpipelinesDemoStack's output one level higher
    this.urlOutput = service.urlOutput;
  }
}