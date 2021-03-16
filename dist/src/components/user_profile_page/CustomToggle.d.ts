import React from "react";
interface IAccordionProperty {
    isOpen: boolean;
    shapeAnimation: any;
}
interface ICustomToggleProps {
    eventKey: string;
    children: React.ReactNode;
    accordion: IAccordionProperty;
    toggleAccordion: (toggle: IAccordionProperty) => void;
}
declare const CustomToggle: ({ children, eventKey, accordion, toggleAccordion }: ICustomToggleProps) => JSX.Element;
export default CustomToggle;
