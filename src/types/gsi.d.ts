declare module google.accounts.id {
    export function renderButton(parent: HTMLElement, options: GsiButtonConfiguration): void;

    export function prompt(listener?: MomentListener): void;
}
