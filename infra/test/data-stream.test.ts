import { expect as expectCDK, matchTemplate, MatchStyle } from '@aws-cdk/assert';
import * as cdk from '@aws-cdk/core';
import { DataStreamStack } from '../lib/datastream-stack';

test('Empty Stack', () => {
    const app = new cdk.App();
    // WHEN
    const stack = new DataStreamStack(app, 'MyTestStack');
    // THEN
    expectCDK(stack).to(matchTemplate({
      "Resources": {}
    }, MatchStyle.SUPERSET))
});
