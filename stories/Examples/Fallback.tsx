import { ScriptErrorStatus } from '../../src';

export function LoadingFallback() {
    return <strong>Loading Library&hellip;</strong>;
}

export function ErrorFallback(status: ScriptErrorStatus) {
    const { event } = status;

    return (
        <div style={{ width: 600 }}>
            <strong>Error Loading Library</strong>
            <p>The following error occurred:</p>
            <pre><code>{JSON.stringify(event)}</code></pre>
        </div>
    );
}
