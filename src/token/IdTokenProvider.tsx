import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useState
} from 'react';
import { IdTokenContext } from './useIdToken';

export interface IdTokenProviderProps {
    readonly configuration: IdConfiguration;
}

export function IdTokenProvider(props: PropsWithChildren<IdTokenProviderProps>) {
    const {
        configuration,
        children
    } = props;

    const callbackProp = configuration.callback;
    const [idToken, setIdToken] = useState<CredentialResponse | null>(null);

    const onResponse = useCallback((token: CredentialResponse) => {
        setIdToken(token);
        callbackProp?.(token);
    }, [callbackProp]);

    useEffect(() => {
        google.accounts.id.initialize({
            ...configuration,
            callback: onResponse
        });
    }, [configuration, onResponse]);

    return (
        <IdTokenContext.Provider value={idToken}>
            {children}
        </IdTokenContext.Provider>
    );
}
