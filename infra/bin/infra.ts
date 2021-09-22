#!/usr/bin/env node
import { App } from 'monocdk';
import { CdkPipelineStack } from '../lib/cdkpipelines-stack';

const app = new App();

new CdkPipelineStack(app, 'CdkPipelineStack', {
  env: {
    account: '194962086589',
    region: 'us-west-2'
  }
});

app.synth();