# react-sign-in-with-google

<p>
    <a href="https://www.npmjs.com/package/react-sign-in-with-google" target="_blank" rel="noreferrer">
      <img alt="npm" src="https://img.shields.io/npm/v/react-sign-in-with-google.svg" />
    </a>&nbsp;
    <a href="https://github.com/michaelbull/react-sign-in-with-google/actions?query=workflow%3Aci" target="_blank" rel="noreferrer">
      <img alt="CI Status" src="https://github.com/michaelbull/react-sign-in-with-google/workflows/ci/badge.svg" />
    </a>&nbsp;
    <a href="https://github.com/michaelbull/react-sign-in-with-google/blob/master/LICENSE" target="_blank" rel="noreferrer">
      <img alt="License" src="https://img.shields.io/github/license/michaelbull/react-sign-in-with-google.svg" />
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
npm install --save react-sign-in-with-google
```

## Usage

To enable Sign In With Google on your website, you first need to
[set up your Google API client ID][gsi-setup].

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
} from 'react-sign-in-with-google';

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
                <GsiButton configuration={buttonConfiguration}/>
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

## Contributing

Bug reports and pull requests are welcome on [GitHub][github].

## License

This project is available under the terms of the ISC license. See the
[`LICENSE`](LICENSE) file for the copyright information and licensing terms.

[npm]: https://www.npmjs.com/package/react-sign-in-with-google
[github]: https://github.com/michaelbull/react-sign-in-with-google
[storybook]: https://michaelbull.github.io/react-sign-in-with-google/?path=/story/examples
[gsi-overview]: https://developers.google.com/identity/gsi/web/guides/overview
[gsi-setup]: https://developers.google.com/identity/gsi/web/guides/overview
