/// <reference types="react" />
interface Switch {
    width: string;
    text: string;
    value: boolean;
    onChange: () => void;
}
declare const Switch: ({ width, text, value, onChange }: Switch) => JSX.Element;
export default Switch;
