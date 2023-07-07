import {
    PropsWithChildren,
    ReactNode
} from 'react';
import { useGsiClient } from '../hooks';
import {
    ScriptErrorStatus,
    ScriptLoadingStatus
} from '../models';

export interface SignInWithGoogleProps {
    readonly loading?: (status: ScriptLoadingStatus) => ReactNode;
    readonly error?: (status: ScriptErrorStatus) => ReactNode;
}

export function SignInWithGoogle(props: PropsWithChildren<SignInWithGoogleProps>) {
    const {
        loading,
        error,
        children
    } = props;

    const { status } = useGsiClient();

    switch (status.type) {
        case 'loading':
            return loading?.(status) ?? null;

        case 'loaded':
            return children;

        case 'error':
            return error?.(status) ?? null;
    }
}
