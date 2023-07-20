import {
    Meta,
    StoryObj
} from '@storybook/react';
import {
    GsiButton,
    GsiButtonProps,
    GsiClient,
    IdTokenProvider,
    useIdToken
} from '../../src';
import { TokenDetails } from './TokenDetails';
import {
    ErrorFallback,
    IdleFallback,
    LoadingFallback
} from './Fallback';

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
        clientId: '877333830425-io63kvpe9kq17atc9p5bvuc0ao2egdm4.apps.googleusercontent.com',
        buttonType: 'standard',
        buttonTheme: 'outline',
        buttonSize: 'large',
        buttonText: 'signin_with',
        buttonShape: 'rectangular',
        buttonLogoAlignment: 'left',
        buttonWidth: undefined,
        buttonLocale: undefined
    },
    argTypes: {
        /* https://developers.google.com/identity/gsi/web/guides/get-google-api-clientid#get_your_google_api_client_id */
        clientId: {
            name: 'Google API client ID',
            description: 'You must have a client ID to configure Sign In With Google and to verify ID tokens on your backend. A client ID looks like the following example: `1234567890-abc123def456.apps.googleusercontent.com`'
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#type */
        buttonType: {
            name: 'Type',
            control: 'select',
            options: [
                'standard',
                'icon'
            ],
            table: {
                category: 'Button',
                defaultValue: { summary: 'standard' },
                type: { summary: `GsiButtonConfiguration['type']` }
            }
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#theme */
        buttonTheme: {
            name: 'Theme',
            control: 'select',
            defaultValue: 'outline',
            options: [
                'outline',
                'filled_blue',
                'filled_black'
            ],
            table: {
                category: 'Button',
                defaultValue: { summary: 'outline' },
                type: { summary: `GsiButtonConfiguration['theme']` }
            }
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#size */
        buttonSize: {
            name: 'Size',
            control: 'select',
            defaultValue: 'large',
            options: [
                'large',
                'medium',
                'small'
            ],
            table: {
                category: 'Button',
                defaultValue: { summary: 'large' },
                type: { summary: `GsiButtonConfiguration['size']` }
            }
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#text */
        buttonText: {
            name: 'Text',
            description: 'There are no visual differences for the text of icon buttons that have different text attributes. The only exception is when the text is read for screen accessibility.',
            control: 'select',
            defaultValue: 'signin_with',
            options: [
                'signin_with',
                'signup_with',
                'continue_with'
            ],
            table: {
                category: 'Button',
                defaultValue: { summary: 'signin_with' },
                type: { summary: `GsiButtonConfiguration['text']` }
            }
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#shape */
        buttonShape: {
            name: 'Shape',
            control: 'select',
            defaultValue: 'rectangular',
            options: [
                'rectangular',
                'pill',
                'circle',
                'square'
            ],
            table: {
                category: 'Button',
                defaultValue: { summary: 'rectangular' },
                type: { summary: `GsiButtonConfiguration['shape']` }
            }
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#logo_alignment */
        buttonLogoAlignment: {
            name: 'Logo Alignment',
            description: 'The alignment of the Google logo. This attribute only applies to the standard button type.',
            control: 'select',
            defaultValue: 'left',
            options: [
                'left',
                'center'
            ],
            table: {
                category: 'Button',
                defaultValue: { summary: 'left' },
                type: { summary: `GsiButtonConfiguration['logo_alignment']` }
            }
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#width */
        buttonWidth: {
            name: 'Width',
            description: 'The minimum button width, in pixels. The maximum width is 400 pixels.',
            control: {
                type: 'number',
                min: 0,
                max: 400
            },
            table: {
                category: 'Button',
                type: { summary: `GsiButtonConfiguration['width']` }
            }
        },
        /* https://developers.google.com/identity/gsi/web/reference/js-reference#locale */
        buttonLocale: {
            name: 'Locale',
            description: 'Optional. Display button text using the specified locale, otherwise default to the users Google Account or browser settings.',
            control: 'text',
            table: {
                category: 'Button',
                type: { summary: `GsiButtonConfiguration['locale']` }
            }
        },
        onToken: {
            action: 'Signed In',
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
                    You must provide a Google API client ID in the Storybook
                    controls menu.
                </p>
            );
        } else {
            return (
                <GsiClient idle={IdleFallback} loading={LoadingFallback} error={ErrorFallback}>
                    <IdTokenProvider configuration={configuration}>
                        <Button
                            configuration={buttonConfiguration}
                            fallback={<ButtonFallback />}
                        />

                        <TokenDetails />
                    </IdTokenProvider>
                </GsiClient>
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

function ButtonFallback() {
    return <strong>Loading Button&hellip;</strong>;
}
