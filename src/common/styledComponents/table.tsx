import styled from "styled-components";

export const Thead = styled.thead`
    color: #A6ACBE;
    font-weight: 600;
    font-size: 13px;
    line-height: 16px;
`;

export const Td = styled.td<{minWidth?: string, pointer?: boolean}>`
    min-width: ${({minWidth}) => minWidth};
    cursor: ${({pointer}) => pointer ? 'pointer' : 'default'}
`;