# react-gsi

<p>
    <a href="https://www.npmjs.com/package/react-gsi" target="_blank" rel="noreferrer">
      <img alt="npm" src="https://img.shields.io/npm/v/react-gsi.svg" />
    </a>&nbsp;
    <a href="https://github.com/michaelbull/react-gsi/actions?query=workflow%3Aci" target="_blank" rel="noreferrer">
      <img alt="CI Status" src="https://github.com/michaelbull/react-gsi/workflows/ci/badge.svg" />
    </a>&nbsp;
    <a href="https://github.com/michaelbull/react-gsi/blob/master/LICENSE" target="_blank" rel="noreferrer">
      <img alt="License" src="https://img.shields.io/github/license/michaelbull/react-gsi.svg" />
    </a>
</p>
<p>
  <a href="https://ko-fi.com/R5R0CFMN6" target="_blank" rel="noreferrer">
    <img alt="ko-fi" src="https://ko-fi.com/img/githubbutton_sm.svg" />
  </a>
</p>

React bindings for the [Sign in With Google for Web][gsi-overview] API.

[Demo][storybook]

## Installation

```shell
npm install --save react-gsi
```

## Usage

To enable Sign In With Google on your website, you first need to
[set up your Google API client ID][gsi-overview].

You must have a client ID to configure Sign In With Google and to verify ID
tokens on your backend.

A client ID looks like the following example:
`1234567890-abc123def456.apps.googleusercontent.com`

```tsx
import {
    GsiButton,
    IdTokenProvider,
    SignInWithGoogle,
    useIdToken,
    useOneTap
} from 'react-gsi';

const idConfiguration: IdConfiguration = {
    client_id: '1234567890-abc123def456.apps.googleusercontent.com'
}

const buttonConfiguration: GsiButtonConfiguration = {
    type: 'standard',
    theme: 'outline',
    size: 'large'
}

export function App() {
    return (
        <SignInWithGoogle>
            <IdTokenProvider configuration={configuration}>
                <Page/>
            </IdTokenProvider>
        </SignInWithGoogle>
    )
}

function Page() {
    const token = useIdToken();
    const signedOut = token === null;

    useOneTap({
        show: signedOut
    })

    if (signedOut) {
        return (
            <>
                <h1>Logged Out</h1>
                <GsiButton configuration={buttonConfiguration} />
            </>
        );
    } else {
        const { select_by, credential } = token;

        return (
            <>
                <h1>Logged In via {select_by}</h1>
                <p>{credential}</p>
            </>
        )
    }
}
```

## Components

<details>
<summary><h3><code>&lt;SignInWithGoogle&gt;</code></h3></summary>
<p>

The `<SignInWithGoogle>` component initializes the [JavaScript API][gsi-api].

Fallbacks can be provided whilst the library is loading or if it has failed to load.

```tsx
function LoadingFallback() {
    return <span>Loading...</span>
}

function ErrorFallback() {
    return <span>Error</span>
}

function App() {
    return (
        <SignInWithGoogle loading={LoadingFallback} error={ErrorFallback}>
            Library Loaded
        </SignInWithGoogle>
    );
}
```
</p>
</details>

<details>
<summary><h3><code>&lt;IdTokenProvider&gt;</code></h3></summary>
<p>

The `<IdTokenProvider>` initializes the API with the supplied [`IdConfiguration`][IdConfiguration].

When the API invokes the [`callback`][callback] to indicate a successful sign-in, the ID Token
returned is stored and passed to the children of the `<IdTokenProvider>` via an `<IdTokenContext>`.

Children may access the token in the current context by using the `useIdToken()` hook.

```tsx
const idConfiguration: IdConfiguration = {
    client_id: '1234567890-abc123def456.apps.googleusercontent.com'
}

function App() {
    return (
        <SignInWithGoogle>
            <IdTokenProvider configuration={idConfiguration}>
                <Page />
            </IdTokenProvider>
        </SignInWithGoogle>
    );
}

function Page() {
    const token = useIdToken();

    ...
}
```
</p>
</details>

<details>
<summary><h3><code>&lt;GsiButton&gt;</code></h3></summary>
<p>

The `<GsiButton>` will render the "Sign in with Google" button.

```tsx
function App() {
    return (
        <SignInWithGoogle>
            <GsiButton configuration={buttonConfiguration} />
        </SignInWithGoogle>
    );
}
```

![A button that says 'Sign in with Google' with no personalized information.](https://developers.google.com/static/identity/gsi/web/images/standard-button-white.png)

</p>
</details>

## Hooks

<details>
<summary><h3><code>useGsiClient()</code></h3></summary>
<p>

The `useGsiClient()` hook initializes the [JavaScript API][gsi-api].

The status of the script can be accessed via the return type.

```tsx
function App() {
    const { status } = useGsiClient();

    switch (status.type) {
        case 'loading':
            return <span>Loading...</span>;
        case 'loaded':
            return <Page />;
        case 'error':
            return <span>Error</span>;
    }
}
```
</p>
</details>

<details>
<summary><h3><code>useOneTap()</code></h3></summary>
<p>

The `useOneTap()` hook controls the One Tap flow.

The flow can begin by calling `prompt`, and can be stopped by calling `cancel.`

By default, the flow will begin automatically on mount. This can be changed by
setting the `show` flag to `false`.

```tsx
function App() {
    const { prompt, cancel } = useOneTap({
        show: true // show on mount
    });

    return (
        <>
            <button type="button" onClick={prompt}>Prompt</button>
            <button type="button" onClick={cancel}>Cancel</button>
        </>
    )
}
```

![Account Chooser page](https://developers.google.com/static/identity/gsi/web/images/one-tap-ac.png)

</p>
</details>

## Contributing

Bug reports and pull requests are welcome on [GitHub][github].

## License

This project is available under the terms of the ISC license. See the
[`LICENSE`](LICENSE) file for the copyright information and licensing terms.

[npm]: https://www.npmjs.com/package/react-gsi
[github]: https://github.com/michaelbull/react-gsi
[storybook]: https://michaelbull.github.io/react-gsi/?path=/story/examples
[gsi-overview]: https://developers.google.com/identity/gsi/web/guides/overview
[gsi-api]: https://developers.google.com/identity/gsi/web/reference/js-reference
[IdConfiguration]: https://developers.google.com/identity/gsi/web/reference/js-reference#IdConfiguration
[callback]: https://developers.google.com/identity/gsi/web/reference/js-reference#callback
