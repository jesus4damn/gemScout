/// <reference types="react" />
declare const Popup: ({ isShow, text, closePopup, action }: {
    isShow: number | string | null;
    text: string;
    closePopup: () => void;
    action: () => void;
}) => JSX.Element;
export default Popup;
