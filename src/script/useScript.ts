import {
    useEffect,
    useState
} from 'react';
import { ScriptStatus } from './ScriptStatus';

export type ScriptCreateHandler = (script: HTMLScriptElement) => void;

export interface UseScriptProps {
    readonly parent?: ParentNode;
    readonly onCreate?: ScriptCreateHandler;
}

export interface UseScriptReturn {
    readonly status: ScriptStatus;
}

const INITIAL_STATUS: ScriptStatus = {
    type: 'idle'
};

export function useScript(props: UseScriptProps): UseScriptReturn {
    const {
        parent: parentProp,
        onCreate
    } = props;

    const [status, setStatus] = useState<ScriptStatus>(INITIAL_STATUS);

    useEffect(() => {
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

        const parent = parentProp ?? document.head;
        parent.append(element);

        setStatus({ type: 'loading' });

        return function cleanup() {
            element.remove();
        };
    }, [onCreate, parentProp]);

    return {
        status
    };
}

