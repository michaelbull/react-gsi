import {
    describe,
    expect,
    it
} from 'vitest';
import {
    isError,
    isIdle,
    isLoaded,
    isLoading,
    ScriptStatus
} from './ScriptStatus';

/**
 * @vitest-environment jsdom
 */

describe('isIdle', () => {
    it('returns true for a ScriptIdleStatus', () => {
        expect(isIdle(IDLE)).toBe(true);
    });

    it('returns false for a ScriptLoadingStatus', () => {
        expect(isIdle(LOADING)).toBe(false);
    });

    it('returns false for a ScriptLoadedStatus', () => {
        expect(isIdle(LOADED)).toBe(false);
    });

    it('returns false for a ScriptErrorStatus', () => {
        expect(isIdle(ERROR)).toBe(false);
    });
});

describe('isLoading', () => {
    it('returns false for a ScriptIdleStatus', () => {
        expect(isLoading(IDLE)).toBe(false);
    });

    it('returns true for a ScriptLoadingStatus', () => {
        expect(isLoading(LOADING)).toBe(true);
    });

    it('returns false for a ScriptLoadedStatus', () => {
        expect(isLoading(LOADED)).toBe(false);
    });

    it('returns false for a ScriptErrorStatus', () => {
        expect(isLoading(ERROR)).toBe(false);
    });
});

describe('isLoaded', () => {
    it('returns false for a ScriptIdleStatus', () => {
        expect(isLoaded(IDLE)).toBe(false);
    });

    it('returns false for a ScriptLoadingStatus', () => {
        expect(isLoaded(LOADING)).toBe(false);
    });

    it('returns true for a ScriptLoadedStatus', () => {
        expect(isLoaded(LOADED)).toBe(true);
    });

    it('returns false for a ScriptErrorStatus', () => {
        expect(isLoaded(ERROR)).toBe(false);
    });
});

describe('isError', () => {
    it('returns false for a ScriptIdleStatus', () => {
        expect(isError(IDLE)).toBe(false);
    });

    it('returns false for a ScriptLoadingStatus', () => {
        expect(isError(LOADING)).toBe(false);
    });

    it('returns false for a ScriptLoadedStatus', () => {
        expect(isError(LOADED)).toBe(false);
    });

    it('returns true for a ScriptErrorStatus', () => {
        expect(isError(ERROR)).toBe(true);
    });
});

const IDLE: ScriptStatus = {
    type: 'idle'
};

const LOADING: ScriptStatus = {
    type: 'loading'
};

const LOADED: ScriptStatus = {
    type: 'loaded',
    event: new CustomEvent('test')
};

const ERROR: ScriptStatus = {
    type: 'error',
    event: new ErrorEvent('test')
};
