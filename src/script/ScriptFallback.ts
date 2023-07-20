import { ReactNode } from 'react';
import { ScriptStatus } from './ScriptStatus';

export type ScriptFallback<T extends ScriptStatus> = (status: T) => ReactNode;
