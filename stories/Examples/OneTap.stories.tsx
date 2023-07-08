import React from 'react';
import {
    Meta,
    StoryObj
} from '@storybook/react';
import {
    GsiClient,
    IdTokenProvider,
    useIdToken,
    useOneTap
} from '../../src';
import { TokenDetails } from './TokenDetails';
import {
    ErrorFallback,
    LoadingFallback
} from './Fallback';

interface StoryProps {
    readonly clientId: IdConfiguration['client_id'];
    readonly show: boolean;
    readonly onToken: IdConfiguration['callback'];
    readonly onNotify: MomentListener;
}

const meta: Meta<StoryProps> = {
    title: 'Examples',
    parameters: {
        layout: 'centered'
    },
    args: {
        clientId: '877333830425-io63kvpe9kq17atc9p5bvuc0ao2egdm4.apps.googleusercontent.com',
        show: true
    },
    argTypes: {
        /* https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id */
        clientId: {
            name: 'Google API client ID',
            description: 'You must have a client ID to configure Sign In With Google and to verify ID tokens on your backend. A client ID looks like the following example: `1234567890-abc123def456.apps.googleusercontent.com`'
        },
        show: {
            name: 'Show One Tap',
            table: {
                defaultValue: { summary: 'true' },
                type: { summary: 'boolean' }
            }
        },
        onToken: {
            action: 'Signed In',
            table: { disable: true }
        },
        onNotify: {
            action: 'Notification',
            table: { disable: true }
        }
    }
};

export default meta;

type Story = StoryObj<StoryProps>;

export const OneTapExample: Story = {
    name: 'One Tap',
    render: (props) => {
        const {
            clientId,
            show,
            onToken,
            onNotify
        } = props;

        const configuration: IdConfiguration = {
            client_id: clientId,
            callback: onToken
        };

        if (clientId === '') {
            return (
                <p>
                    You must provide a Google API client ID in the Storybook
                    controls menu.
                </p>
            );
        } else {
            return (
                <GsiClient loading={LoadingFallback} error={ErrorFallback}>
                    <IdTokenProvider configuration={configuration}>
                        <Button
                            show={show}
                            onNotify={onNotify}
                        />

                        <TokenDetails />
                    </IdTokenProvider>
                </GsiClient>
            );
        }
    }
};

interface ButtonProps {
    readonly show: boolean;
    readonly onNotify?: MomentListener;
}

function Button(props: ButtonProps) {
    const {
        show,
        onNotify
    } = props;

    const {
        prompt,
        cancel
    } = useOneTap({
        show,
        onNotify
    });

    const token = useIdToken();
    const signedIn = token !== null;

    if (signedIn) {
        return <h1>Signed in with Google</h1>;
    } else {
        return (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <button type="button" onClick={prompt} style={{ padding: '0.5em 1em', margin: '1em 0' }}>
                    Start One-Tap
                </button>

                <button type="button" onClick={cancel} style={{ padding: '0.5em 1em', margin: '1em 0' }}>
                    Cancel One-Tap
                </button>
            </div>
        );
    }
}
