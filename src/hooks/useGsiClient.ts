import { useCallback } from 'react';
import { useScript } from './useScript';

export const GOOGLE_GSI_CLIENT_URL = 'https://accounts.google.com/gsi/client';

export interface UseGsiClientProps {
    readonly src?: string;
}

export function useGsiClient(props: UseGsiClientProps = {}) {
    const {
        src = GOOGLE_GSI_CLIENT_URL
    } = props;

    const onCreate = useCallback((script: HTMLScriptElement) => {
        script.src = src;
    }, [src]);

    return useScript({
        onCreate
    });
}
