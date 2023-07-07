import { useEffect } from 'react';

export interface UsePromptProps {
    readonly onNotify?: MomentListener;
}

export function usePrompt(props: UsePromptProps) {
    const { onNotify } = props;

    useEffect(() => {
        google.accounts.id.prompt(onNotify);
    }, [onNotify]);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace google.accounts.id {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function prompt(listener?: MomentListener): void;
}
