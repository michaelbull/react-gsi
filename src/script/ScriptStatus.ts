export type ScriptStatus =
    | ScriptIdleStatus
    | ScriptLoadingStatus
    | ScriptLoadedStatus
    | ScriptErrorStatus;

export interface ScriptIdleStatus {
    readonly type: 'idle';
}

export interface ScriptLoadingStatus {
    readonly type: 'loading';
}

export interface ScriptLoadedStatus {
    readonly type: 'loaded';
    readonly event: Event;
}

export interface ScriptErrorStatus {
    readonly type: 'error';
    readonly event: ErrorEvent;
}

export function isIdle(status: ScriptStatus): status is ScriptIdleStatus {
    return status.type === 'idle';
}

export function isLoading(status: ScriptStatus): status is ScriptLoadingStatus {
    return status.type === 'loading';
}

export function isLoaded(status: ScriptStatus): status is ScriptLoadedStatus {
    return status.type === 'loaded';
}

export function isError(status: ScriptStatus): status is ScriptErrorStatus {
    return status.type === 'error';
}
