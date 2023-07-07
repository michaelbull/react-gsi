import React from 'react';
import {
    Meta,
    StoryObj
} from '@storybook/react';
import {
    GsiButton,
    GsiButtonProps,
    IdTokenProvider,
    ScriptErrorStatus,
    SignInWithGoogle,
    useIdToken
} from '../../src';
import { TokenDetails } from './TokenDetails';

interface StoryProps {
    readonly clientId: IdConfiguration['client_id'];
    readonly onToken: IdConfiguration['callback'];
    readonly buttonType: GsiButtonConfiguration['type'];
    readonly buttonTheme: GsiButtonConfiguration['theme'];
    readonly buttonSize: GsiButtonConfiguration['size'];
    readonly buttonText: GsiButtonConfiguration['text'];
    readonly buttonShape: GsiButtonConfiguration['shape'];
    readonly buttonLogoAlignment: GsiButtonConfiguration['logo_alignment'];
    readonly buttonWidth: GsiButtonConfiguration['width'];
    readonly buttonLocale: GsiButtonConfiguration['locale'];
}

const meta: Meta<StoryProps> = {
    title: 'Examples',
    parameters: {
        layout: 'centered'
    },
    args: {
        clientId: ''
    },
    argTypes: {
        /* https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id */
        clientId: {
            name: 'Google API client ID',
            description: 'You must have a client ID to configure Sign In With Google and to verify ID tokens on your backend. A client ID looks like the following example: 1234567890-abc123def456.apps.googleusercontent.com'
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#type */
        buttonType: {
            name: 'Button Type',
            description: 'The button type. The default value is standard.',
            control: 'select',
            options: [
                'standard',
                'icon'
            ]
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#theme */
        buttonTheme: {
            name: 'Button Theme',
            description: 'The button theme. The default value is outline.',
            control: 'select',
            options: [
                'outline',
                'filled_blue',
                'filled_black'
            ]
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#size */
        buttonSize: {
            name: 'Button Size',
            description: 'The button size. The default value is large.',
            control: 'select',
            options: [
                'large',
                'medium',
                'small'
            ]
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#text */
        buttonText: {
            name: 'Button Text',
            description: 'The button text. The default value is signin_with. There are no visual differences for the text of icon buttons that have different text attributes. The only exception is when the text is read for screen accessibility.',
            control: 'select',
            options: [
                'signin_with',
                'signup_with',
                'continue_with'
            ]
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#shape */
        buttonShape: {
            name: 'Button Shape',
            description: 'The button shape. The default value is rectangular.',
            control: 'select',
            options: [
                'rectangular',
                'pill',
                'circle',
                'square'
            ]
        },
        buttonLogoAlignment: {
            name: 'Button Logo Alignment',
            description: 'The alignment of the Google logo. The default value is left. This attribute only applies to the standard button type.',
            control: 'select',
            options: [
                'left',
                'center'
            ]
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#width */
        buttonWidth: {
            name: 'Button Width',
            description: 'The minimum button width, in pixels. The maximum width is 400 pixels.',
            control: 'number'
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#locale */
        buttonLocale: {
            name: 'Button Locale',
            description: 'Optional. Display button text using the specified locale, otherwise default to the users Google Account or browser settings.',
            control: 'text'
        },
        onToken: {
            action: 'Logged In',
            table: { disable: true }
        }
    }
};

export default meta;

type Story = StoryObj<StoryProps>;

export const ButtonExample: Story = {
    name: 'Button',
    render: (props) => {
        const {
            clientId,
            buttonType,
            buttonTheme,
            buttonSize,
            buttonText,
            buttonShape,
            buttonLogoAlignment,
            buttonWidth,
            buttonLocale,
            onToken
        } = props;

        const configuration: IdConfiguration = {
            client_id: clientId,
            callback: onToken
        };

        const buttonConfiguration: GsiButtonConfiguration = {
            type: buttonType,
            theme: buttonTheme,
            size: buttonSize,
            text: buttonText,
            shape: buttonShape,
            logo_alignment: buttonLogoAlignment,
            width: buttonWidth,
            locale: buttonLocale
        };

        if (clientId === '') {
            return (
                <p>
                    You must provide your own Google API client ID in the
                    Storybook controls menu for this demo.
                </p>
            );
        } else {
            return (
                <SignInWithGoogle loading={LoadingFallback} error={ErrorFallback}>
                    <IdTokenProvider configuration={configuration}>
                        <Button
                            configuration={buttonConfiguration}
                            fallback={<ButtonFallback />}
                        />

                        <TokenDetails />
                    </IdTokenProvider>
                </SignInWithGoogle>
            );
        }
    }
};

function Button(props: GsiButtonProps) {
    const token = useIdToken();
    const signedIn = token !== null;

    if (signedIn) {
        return <h1>Signed in with Google</h1>;
    } else {
        return <GsiButton {...props} />;
    }
}

function LoadingFallback() {
    return <strong>Loading Library&hellip;</strong>;
}

function ErrorFallback(status: ScriptErrorStatus) {
    const { event } = status;

    return (
        <div style={{ width: 600 }}>
            <strong>Error Loading Library</strong>
            <p>
                The following error occurred:
                <pre><code>{JSON.stringify(event)}</code></pre>
            </p>
        </div>
    );
}

function ButtonFallback() {
    return <strong>Loading Button&hellip;</strong>;
}
