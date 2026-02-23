# capacitor-bright-sdk-bridge

Bright SDK bridge for capacitor.

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

**Returns:** <code>Promise&lt;{ value: number; }&gt;</code>

--------------------


### version()

```typescript
version() => Promise<{ value: string; }>
```

**Returns:** <code>Promise&lt;{ value: string; }&gt;</code>

--------------------


### uuid()

```typescript
uuid() => Promise<{ value?: string; }>
```

**Returns:** <code>Promise&lt;{ value?: string; }&gt;</code>

--------------------


### optOut()

```typescript
optOut() => Promise<void>
```

--------------------


### showConsent(...)

```typescript
showConsent(options?: { benefit?: string | undefined; agree_btn?: string | undefined; disagree_btn?: string | undefined; language?: string | undefined; } | undefined) => Promise<{ value: boolean; }>
```

| Param         | Type                                                                                             |
| ------------- | ------------------------------------------------------------------------------------------------ |
| **`options`** | <code>{ benefit?: string; agree_btn?: string; disagree_btn?: string; language?: string; }</code> |

**Returns:** <code>Promise&lt;{ value: boolean; }&gt;</code>

--------------------

</docgen-api>
