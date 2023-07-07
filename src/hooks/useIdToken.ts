import {
    createContext,
    useContext
} from 'react';

export const IdTokenContext = createContext<CredentialResponse | null>(null);

export function useIdToken() {
    return useContext(IdTokenContext);
}
