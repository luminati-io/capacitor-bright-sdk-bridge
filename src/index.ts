import { registerPlugin } from '@capacitor/core';

import type { BrightSdkBridgePlugin } from './definitions';

const BrightSdkBridge = registerPlugin<BrightSdkBridgePlugin>('BrightSdkBridge', {
  web: () => import('./web').then((m) => new m.BrightSdkBridgeWeb()),
});

export * from './definitions';
export { BrightSdkBridge };
