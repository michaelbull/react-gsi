import {
    describe,
    expect,
    it
} from 'vitest';
import {
    isError,
    isLoaded,
    isLoading,
    ScriptStatus
} from './ScriptStatus';

/**
 * @vitest-environment jsdom
 */

describe('isLoading', () => {
    it('returns true for a ScriptLoadingStatus', () => {
        const status: ScriptStatus = {
            type: 'loading'
        };

        expect(isLoading(status)).toBe(true);
    });

    it('returns false for a ScriptLoadedStatus', () => {
        const status: ScriptStatus = {
            type: 'loaded',
            event: new CustomEvent('test')
        };

        expect(isLoading(status)).toBe(false);
    });

    it('returns false for a ScriptErrorStatus', () => {
        const status: ScriptStatus = {
            type: 'error',
            event: new ErrorEvent('test')
        };

        expect(isLoading(status)).toBe(false);
    });
});

describe('isLoaded', () => {
    it('returns false for a ScriptLoadingStatus', () => {
        const status: ScriptStatus = {
            type: 'loading'
        };

        expect(isLoaded(status)).toBe(false);
    });

    it('returns true for a ScriptLoadedStatus', () => {
        const status: ScriptStatus = {
            type: 'loaded',
            event: new CustomEvent('test')
        };

        expect(isLoaded(status)).toBe(true);
    });

    it('returns false for a ScriptErrorStatus', () => {
        const status: ScriptStatus = {
            type: 'error',
            event: new ErrorEvent('test')
        };

        expect(isLoaded(status)).toBe(false);
    });
});

describe('isError', () => {
    it('returns false for a ScriptLoadingStatus', () => {
        const status: ScriptStatus = {
            type: 'loading'
        };

        expect(isError(status)).toBe(false);
    });

    it('returns false for a ScriptLoadedStatus', () => {
        const status: ScriptStatus = {
            type: 'loaded',
            event: new CustomEvent('test')
        };

        expect(isError(status)).toBe(false);
    });

    it('returns true for a ScriptErrorStatus', () => {
        const status: ScriptStatus = {
            type: 'error',
            event: new ErrorEvent('test')
        };

        expect(isError(status)).toBe(true);
    });
});
