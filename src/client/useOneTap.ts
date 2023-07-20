import {
    useCallback,
    useEffect
} from 'react';

export interface UseOneTapProps {
    readonly show?: boolean;
    readonly onNotify?: MomentListener;
}

const defaultProps: UseOneTapProps = {
    show: true
};

export interface UseOneTapReturn {
    readonly prompt: () => void;
    readonly cancel: () => void;
}

export function useOneTap(props: UseOneTapProps = defaultProps): UseOneTapReturn {
    const {
        show = true,
        onNotify
    } = props;

    const prompt = useCallback(() => {
        google.accounts.id.prompt(onNotify);
    }, [onNotify]);

    const cancel = useCallback(() => {
        google.accounts.id.cancel();
    }, []);

    useEffect(() => {
        if (show) {
            prompt();
        }

        return function cleanup() {
            cancel();
        };
    }, [show, prompt, cancel]);

    return {
        prompt,
        cancel
    };
}
