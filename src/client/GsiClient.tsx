import {
    PropsWithChildren,
    ReactNode
} from 'react';
import {
    ScriptErrorStatus,
    ScriptLoadingStatus
} from '../script';
import { useGsiClient } from './useGsiClient';

export interface GsiClientProps {
    readonly loading?: (status: ScriptLoadingStatus) => ReactNode;
    readonly error?: (status: ScriptErrorStatus) => ReactNode;
}

export function GsiClient(props: PropsWithChildren<GsiClientProps>) {
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
