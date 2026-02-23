export interface BrightSdkBridgePlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
