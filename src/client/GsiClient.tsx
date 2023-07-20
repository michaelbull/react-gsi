import {
    PropsWithChildren,
    ReactNode
} from 'react';
import {
    ScriptErrorStatus,
    ScriptFallback,
    ScriptIdleStatus,
    ScriptLoadingStatus
} from '../script';
import { useGsiClient } from './useGsiClient';

export interface GsiClientProps {
    readonly fallback?: ReactNode;
    readonly idle?: ScriptFallback<ScriptIdleStatus>;
    readonly loading?: ScriptFallback<ScriptLoadingStatus>;
    readonly error?: ScriptFallback<ScriptErrorStatus>;
}

export function GsiClient(props: PropsWithChildren<GsiClientProps>) {
    const {
        fallback,
        idle,
        loading,
        error,
        children
    } = props;

    const { status } = useGsiClient();

    switch (status.type) {
        case 'idle':
            return idle?.(status) ?? fallback;

        case 'loading':
            return loading?.(status) ?? fallback;

        case 'loaded':
            return children;

        case 'error':
            return error?.(status) ?? fallback;
    }
}
