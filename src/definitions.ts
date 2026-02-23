export type BrightSdkBridgePluginChoiceChangeEvent = { value: number };
export interface BrightSdkBridgePlugin {
  currentChoice(): Promise<{ value: number }>;
  version(): Promise<{ value: string }>;
  uuid(): Promise<{ value?: string }>;
  optOut(): Promise<void>;
  showConsent(options?: {
    benefit?: string;
    agree_btn?: string;
    disagree_btn?: string;
    language?: string;
  }): Promise<{ value: boolean }>;
}
