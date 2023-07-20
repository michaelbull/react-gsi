import {
    ScriptErrorStatus,
    ScriptFallback,
    ScriptIdleStatus,
    ScriptLoadingStatus
} from '../../src';

export const IdleFallback: ScriptFallback<ScriptIdleStatus> = () => {
    return <strong>Waiting For Library&hellip;</strong>;
};

export const LoadingFallback: ScriptFallback<ScriptLoadingStatus> = () => {
    return <strong>Loading Library&hellip;</strong>;
};

export const ErrorFallback: ScriptFallback<ScriptErrorStatus> = (status) => {
    const { event } = status;

    return (
        <div style={{ width: 600 }}>
            <strong>Error Loading Library</strong>
            <p>The following error occurred:</p>
            <pre><code>{JSON.stringify(event)}</code></pre>
        </div>
    );
};
