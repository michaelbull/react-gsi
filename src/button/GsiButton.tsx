import {
    ReactNode,
    useState
} from 'react';
import {
    useRenderButton,
    UseRenderButtonProps
} from './useRenderButton';

export const GSI_BUTTON_DEFAULT_CONFIGURATION: GsiButtonConfiguration = {
    type: 'standard'
};

export interface GsiButtonProps {
    readonly configuration?: GsiButtonConfiguration;
    readonly fallback?: ReactNode;
}

export function GsiButton(props: GsiButtonProps) {
    const {
        configuration = GSI_BUTTON_DEFAULT_CONFIGURATION,
        fallback
    } = props;

    const [ref, setRef] = useState<HTMLDivElement | null>(null);
    const [rendered, setRendered] = useState(false);

    function onRender() {
        setRendered(true);
    }

    return (
        <>
            {!rendered && fallback}

            <div ref={setRef}>
                {ref &&
                    <Inner
                        parent={ref}
                        configuration={configuration}
                        onRender={onRender}
                    />
                }
            </div>
        </>
    );
}

function Inner(props: UseRenderButtonProps) {
    useRenderButton(props);
    return null;
}
