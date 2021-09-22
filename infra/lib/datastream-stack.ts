import * as apigw from 'monocdk/aws-apigateway';
import * as lambda from 'monocdk/aws-lambda';
import { CfnOutput, Construct, Stack, StackProps } from 'monocdk';
import * as path from 'path';

export class DataStreamStack extends Stack {
  /**
 * The URL of the API Gateway endpoint, for use in the integ tests
 */
  public readonly urlOutput: CfnOutput;

  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The Lambda function that contains the functionality
    const handler = new lambda.Function(this, 'Lambda', {
      runtime: lambda.Runtime.PYTHON_3_9,
      handler: 'data_stream_collector.handler',
      code: lambda.Code.fromAsset(path.resolve(__dirname, '../../lambda')),
    });

     // An API Gateway to make the Lambda web-accessible
     const gw = new apigw.LambdaRestApi(this, 'Gateway', {
      description: 'Endpoint for a simple Lambda-powered web service',
      handler,
    });

    this.urlOutput = new CfnOutput(this, 'Url', {
      value: gw.url,
    });
    
  }
}
