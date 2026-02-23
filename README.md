# capacitor-bright-sdk-bridge

Bright SDK bridge for capacitor.

## Supports

- [x] Bridge for iOS/tvOS SDK. (release `1.605.415`)
- [ ] Bridge for Android SDK.

## Install

```bash
npm install capacitor-bright-sdk-bridge
npx cap sync
```

## API

<docgen-index>

* [`currentChoice()`](#currentchoice)
* [`version()`](#version)
* [`uuid()`](#uuid)
* [`optOut()`](#optout)
* [`showConsent(...)`](#showconsent)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### currentChoice()

```typescript
currentChoice() => Promise<{ value: number; }>
```

Returns user choice with SDK's consent.

- 0 is for `no choice`
- 1 is for `agreed`
- 2 is for `disagreed`

**Returns:** <code>Promise&lt;{ value: number; }&gt;</code>

--------------------


### version()

```typescript
version() => Promise<{ value: string; }>
```

Returns the Bright iOS SDK version string.

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### uuid()

```typescript
uuid() => Promise<{ value?: string; }>
```

Returns the SDKs UUID assigned for app installation.
May be undefined if the SDK was not initialized before.

**Returns:** <code>Promise&lt;{ value?: string; }&gt;</code>

--------------------


### optOut()

```typescript
optOut() => Promise<void>
```

Disables SDK.

--------------------


### showConsent(...)

```typescript
showConsent(options?: { benefit?: string | undefined; agree_btn?: string | undefined; disagree_btn?: string | undefined; language?: string | undefined; } | undefined) => Promise<{ value: boolean; }>
```

Shows the consent on the user's action.
This can be used when a user tries to close an ad or clicks the checkbox in Settings screen to activate Bright SDK.

| Param         | Type                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| **`options`** | <code>{ benefit?: string; agree_btn?: string; disagree_btn?: string; language?: string; }</code> |

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

--------------------

</docgen-api>
