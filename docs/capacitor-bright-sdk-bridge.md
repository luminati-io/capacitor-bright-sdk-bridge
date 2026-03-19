# capacitor-bright-sdk-bridge – Full Documentation

## Overview

capacitor-bright-sdk-bridge is a Capacitor plugin that exposes Bright SDK APIs to JavaScript applications.

Current state from source:

- iOS implementation: functional and integrated with Bright iOS SDK binary
- Android implementation: scaffold/stub only (echo method), not yet parity with iOS API
- Web implementation: fallback stub values for development/testing

Repository: https://github.com/BrightSDK/capacitor-bright-sdk-bridge
Default branch: develop

---

## Package Metadata

From package.json:

- Name: capacitor-bright-sdk-bridge
- Version: 0.0.1
- License: MIT
- Author: Bright Data, Inc
- Peer dependency: @capacitor/core >= 8.0.0
- Build output:
  - CommonJS: dist/plugin.cjs.js
  - ESM: dist/esm/index.js
  - Types: dist/esm/index.d.ts
  - Browser UMD: dist/plugin.js

Published files include native platform sources:

- android/src/main/
- ios/Sources
- Package.swift
- CapacitorBrightSdkBridge.podspec

---

## JavaScript API Surface

Exposed plugin name in JS registration:

- BrightSdkBridge

Type definitions (`src/definitions.ts`) expose:

- currentChoice(): Promise<{ value: number }>
- version(): Promise<{ value: string }>
- uuid(): Promise<{ value?: string }>
- optOut(): Promise<void>
- showConsent(options?): Promise<{ value: boolean }>
- Event payload type: BrightSdkBridgePluginChoiceChangeEvent = { value: number }

Consent choice semantics:

- 0 = no choice
- 1 = agreed
- 2 = disagreed

showConsent options:

- benefit?: string
- agree_btn?: string
- disagree_btn?: string
- language?: string

---

## iOS Implementation

File: ios/Sources/BrightSdkBridgePlugin/BrightSdkBridgePlugin.swift

Key implementation details:

- Uses `brdsdk` binary SDK (`import brdsdk`)
- Plugin class implements CAPPlugin and CAPBridgedPlugin
- JS name: BrightSdkBridge
- Initializes SDK in plugin constructor with:
  - `try! brd_api(skip_consent: true)`
- Subscribes to choice changes:
  - `brd_api.onChoiceChange = { ... notifyListeners("onChoiceChange", data: ["value": ...]) }`

Mapped methods:

- currentChoice
  - Returns `brd_api.currentChoice.rawValue`
- version
  - Returns `brd_api.sdkVersion`
- uuid
  - Returns `brd_api.get_uuid()`
- optOut
  - Calls `brd_api.optOut(from: .manual)`
- showConsent
  - Reads optional fields from call
  - Runs on main thread
  - Calls `brd_api.show_consent(...)`
  - Returns `{ value: shown }`

Important behavior:

- Consent UI invocation is explicitly dispatched onto `DispatchQueue.main`.
- `skip_consent: true` indicates consent flow is controlled explicitly via bridge calls.

---

## Android Implementation (Current)

Files:

- android/src/main/java/com/brightsdk/bridge/capacitor/BrightSdkBridgePlugin.java
- android/src/main/java/com/brightsdk/bridge/capacitor/BrightSdkBridge.java

Current status:

- Only one plugin method exists: `echo`
- No Android Bright SDK integration methods are implemented yet for:
  - currentChoice
  - version
  - uuid
  - optOut
  - showConsent
  - onChoiceChange event

This matches README status:

- Bridge for iOS/tvOS SDK: checked
- Bridge for Android SDK: unchecked

Android module config highlights (`android/build.gradle`):

- com.android.library
- compileSdk 36
- minSdk 24, targetSdk 36
- Java source/target compatibility 21
- Depends on `project(':capacitor-android')`

---

## Web Implementation

File: src/web.ts

`BrightSdkBridgeWeb` implements the same interface with safe defaults:

- currentChoice -> { value: 0 }
- version -> { value: '0.0.0' }
- uuid -> {}
- optOut -> no-op
- showConsent -> { value: false }

Useful for browser dev/testing where native runtime is unavailable.

---

## iOS Packaging and Binary SDK Pin

SwiftPM (`Package.swift`):

- Platform: iOS 15+
- Capacitor dependency: capacitor-swift-pm from 8.0.0
- Binary target `brdsdk` pinned to CDN zip:
  - https://cdn.bright-sdk.com/static/bright_sdk_ios-1.605.415.zip
- Includes checksum pin for integrity

CocoaPods (`CapacitorBrightSdkBridge.podspec`):

- Pod name: CapacitorBrightSdkBridge
- iOS deployment target: 15.0
- Depends on Capacitor
- Swift version: 5.1

Note:

- Podspec source points to repository URL from package.json.
- package.json repository/bugs URLs currently reference `luminati-io` URL format.

---

## Build, Verify, and Tooling

Top-level scripts:

- npm run build
  - clean -> docgen -> tsc -> rollup
- npm run verify
  - verify:ios + verify:android + verify:web
- npm run lint
  - eslint + prettier check + swiftlint
- npm run fmt
  - eslint fix + prettier write + swiftlint fix

Doc generation:

- docgen emits API docs into README.md and dist/docs.json

---

## Example App

Directory: example-app/

Usage pattern in example JS:

- Imports BrightSdkBridge from plugin
- Subscribes to `onChoiceChange`
- Calls:
  - currentChoice()
  - version()
  - uuid()
  - showConsent({ benefit: 'Demo benefit' })
  - optOut()
- Uses UI state toggling based on consent value

Dependency setup in example-app/package.json:

- capacitor-bright-sdk-bridge: file:..
- @capacitor/core latest
- @capacitor/ios 8.0.0
- @capacitor/android 8.0.0

---

## Capability Matrix

- JS API type definitions: available
- iOS native bridge: implemented
- Android native bridge: pending (stub only)
- Web shim: implemented
- Choice-change event forwarding: implemented on iOS

---

## Known Gaps

1. Android parity gap
- Android implementation currently does not expose Bright SDK methods used by JS typings.

2. Metadata mismatch risk
- package.json repository URL points to luminati-io URL format; repo is under BrightSDK org.

3. Versioning maturity
- package version still 0.0.1 while iOS bridge is functional; Android is incomplete.

---

## Integration Quick Start

Install:

```bash
npm install capacitor-bright-sdk-bridge
npx cap sync
```

Example usage:

```ts
import { BrightSdkBridge } from 'capacitor-bright-sdk-bridge';

BrightSdkBridge.addListener('onChoiceChange', (event) => {
  console.log('choice changed:', event.value);
});

const { value: version } = await BrightSdkBridge.version();
const { value: uuid } = await BrightSdkBridge.uuid();
await BrightSdkBridge.showConsent({ benefit: 'Enable rewards' });
```

---

## Source Map

Core files to review:

- README.md
- src/definitions.ts
- src/index.ts
- src/web.ts
- ios/Sources/BrightSdkBridgePlugin/BrightSdkBridgePlugin.swift
- android/src/main/java/com/brightsdk/bridge/capacitor/BrightSdkBridgePlugin.java
- android/src/main/java/com/brightsdk/bridge/capacitor/BrightSdkBridge.java
- Package.swift
- CapacitorBrightSdkBridge.podspec
- example-app/src/js/example.js
