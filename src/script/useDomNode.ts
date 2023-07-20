import { useEffect } from 'react';

export interface UseDomNodeProps<P extends ParentNode, C extends ChildNode> {
    readonly parent: P;
    readonly child: C;
}

export function useDomNode<P extends ParentNode, C extends ChildNode>(props: UseDomNodeProps<P, C>) {
    const {
        parent,
        child
    } = props;

    useEffect(() => {
        parent.append(child);

        return function cleanup() {
            child.remove();
        };
    }, [parent, child]);
}
