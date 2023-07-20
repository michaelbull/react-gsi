import {
    useMemo,
    useState
} from 'react';
import { useDomNode } from './useDomNode';
import { ScriptStatus } from './ScriptStatus';

export type ScriptCreateHandler = (script: HTMLScriptElement) => void;

export interface UseScriptProps {
    readonly parent?: ParentNode;
    readonly onCreate?: ScriptCreateHandler;
}

export interface UseScriptReturn {
    readonly status: ScriptStatus;
}

const DEFAULT_STATUS: ScriptStatus = {
    type: 'loading'
};

export function useScript(props: UseScriptProps): UseScriptReturn {
    const {
        parent = document.head,
        onCreate
    } = props;

    const [status, setStatus] = useState<ScriptStatus>(DEFAULT_STATUS);

    const script = useMemo(() => {
        const element = document.createElement('script');

        element.addEventListener('load', event => {
            setStatus({
                type: 'loaded',
                event
            });
        });

        element.addEventListener('error', event => {
            setStatus({
                type: 'error',
                event
            });
        });

        onCreate?.(element);

        return element;
    }, [onCreate]);

    useDomNode({
        parent,
        child: script
    });

    return {
        status
    };
}

