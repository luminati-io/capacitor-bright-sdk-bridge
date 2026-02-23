import { WebPlugin } from '@capacitor/core';

import type { BrightSdkBridgePlugin } from './definitions';

export class BrightSdkBridgeWeb extends WebPlugin implements BrightSdkBridgePlugin {
  async currentChoice(): Promise<{ value: number }> {
    return { value: 0 };
  }
  async version(): Promise<{ value: string }> {
    return { value: '0.0.0' };
  }
  async uuid(): Promise<{ value?: string }> {
    return {};
  }
  async optOut(): Promise<void> {
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async showConsent(_options?: {
    benefit?: string;
    agree_btn?: string;
    disagree_btn?: string;
    language?: string;
  }): Promise<{ value: boolean }> {
    return { value: false };
  }
}
