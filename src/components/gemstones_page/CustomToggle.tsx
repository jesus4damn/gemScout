import React, {MouseEvent} from "react";
import {useAccordionToggle} from "react-bootstrap";
import styled, {css} from "styled-components";
import {rotate} from "../../common/styledComponents/animations";

interface IAccordionProperty {
    isOpen: boolean,
    shapeAnimation: any
}

interface ICustomToggleProps {
    eventKey: string,
    children: React.ReactNode,
    accordion: IAccordionProperty,
    toggleAccordion: (toggle: IAccordionProperty) => void
}

const CardHeader = styled.div<{isOpen: boolean}>`
   width: 100%;
   background: #FFFFFF;
   border: none;
   cursor: pointer;
   box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
   border-radius: 10px 10px ${({isOpen}) => isOpen ? '0 0' : '10px 10px'} !important; 
   display: flex;
   justify-content: space-between;
   align-items: center;
   padding: 19px 27px 19px 30px; 
`;

const CustomToggle = ({children, eventKey, accordion, toggleAccordion}: ICustomToggleProps) => {
    const click = useAccordionToggle(eventKey, () =>
        accordion.isOpen
            ? setTimeout(() => toggleAccordion({isOpen: false, shapeAnimation: css`${rotate} 0.15s linear reverse`}), 300)
            : toggleAccordion({isOpen: true, shapeAnimation: css`${rotate} 0.3s linear`})
    );

    return (
        <CardHeader
            isOpen={accordion.isOpen}
            onClick={(event: MouseEvent<HTMLElement>): boolean | void => {
                if ((event.target as HTMLElement).tagName === 'INPUT') return false;
                click(event as React.SyntheticEvent<Element, Event>)
            }}
        >
            {children}
        </CardHeader>
    )
}

export default CustomToggle;