import styled, {keyframes} from "styled-components";

export const rotate = keyframes`
    from {
        transform: rotate(0);
    }
    to {
        transform: rotate(-180deg);
    }
`;


export const AnimatedElement = styled.div<{animation: any}>`
    display: inline-block;
    animation: ${({animation}) => animation};
    animation-fill-mode: forwards;
`;