export type BrightSdkBridgePluginChoiceChangeEvent = { value: number };
export interface BrightSdkBridgePlugin {
  /**
   * Returns user choice with SDK's consent.
   * 
   * - 0 is for `no choice`
   * - 1 is for `agreed`
   * - 2 is for `disagreed`
   */
  currentChoice(): Promise<{ value: number }>;
  /**
   * Returns the Bright iOS SDK version string.
   */
  version(): Promise<{ value: string }>;
  /**
   * Returns the SDKs UUID assigned for app installation.
   * May be undefined if the SDK was not initialized before.
   */
  uuid(): Promise<{ value?: string }>;
  /**
   * Disables SDK.
   */
  optOut(): Promise<void>;
  /**
   * Shows the consent on the user's action.
   * This can be used when a user tries to close an ad or clicks the checkbox in Settings screen to activate Bright SDK.
   * 
   * @returns true if sdk is initialized and child control disabled.
   */
  showConsent(options?: {
    benefit?: string;
    agree_btn?: string;
    disagree_btn?: string;
    language?: string;
  }): Promise<{ value: boolean }>;
}
