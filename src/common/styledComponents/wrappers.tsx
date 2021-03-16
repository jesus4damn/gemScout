import styled from "styled-components";

export const FullScreenWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
`;


export const PageWrapper = styled.div<{padding: string}>`
    width: 100%;
    display: flex;
    position: relative;
    flex-grow: 1;
    box-sizing: border-box;
    max-height: 100vh;
    flex-direction: column;
    overflow-y: auto;
    padding: ${({padding}) => padding}
`;

export const ColWrapper = styled.div<{width: string, marginRight?: string}>`
    flex: none;
    width: ${({width}) => width};
    margin-right: ${({marginRight}) => marginRight ? marginRight : '0'};  
`;

export const Wrapper = styled.div<{padding: string, background?: string}>`
    background-color: ${({background}) => background ? background : '#FFFFFF'};
    padding: ${({padding}) => padding};
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
`;