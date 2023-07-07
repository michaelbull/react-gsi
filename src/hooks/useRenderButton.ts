import { useEffect } from 'react';

export interface UseRenderButtonProps {
    readonly parent: HTMLElement;
    readonly configuration: GsiButtonConfiguration;
    readonly onRender?: () => void;
}

export function useRenderButton(props: UseRenderButtonProps) {
    const {
        parent,
        configuration,
        onRender
    } = props;

    useEffect(() => {
        google.accounts.id.renderButton(parent, configuration);
        onRender?.();
    }, [parent, configuration, onRender]);
}

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace google.accounts.id {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    function renderButton(parent: HTMLElement, options: GsiButtonConfiguration): void;
}
