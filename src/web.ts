import { WebPlugin } from '@capacitor/core';

import type { BrightSdkBridgePlugin } from './definitions';

export class BrightSdkBridgeWeb extends WebPlugin implements BrightSdkBridgePlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
