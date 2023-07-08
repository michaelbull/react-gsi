/* eslint @typescript-eslint/no-unused-vars: "off" */

declare namespace google.accounts.id {
    function renderButton(parent: HTMLElement, options: GsiButtonConfiguration): void;

    function prompt(listener?: MomentListener): void;
}
