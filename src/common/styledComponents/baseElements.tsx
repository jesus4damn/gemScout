import styled from "styled-components";

interface ITitleProps {
    size: string,
    fontWeight?: string,
    marginBottom?: string
}

export const Title = styled.span<ITitleProps>`
    font-weight: ${({fontWeight}) => fontWeight ? fontWeight : '700'};
    font-size: ${({size}) => size};
    margin-bottom: ${({marginBottom}) => marginBottom ? marginBottom : '0'};
`;

export const StandartImage = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`
}))`
    width: 36px;
    height: 36px;
    border-radius: 75px;
    cursor: pointer;
`;

export const AuthSubmitButton = styled.button`
    border-radius: 19px;
    border: none;
    background: #FFFFFF;
    box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.12), 0px 2px 2px rgba(0, 0, 0, 0.24);
    font-weight: bold;
    padding: 10px 14px;
    margin-top: 31px;
`;

export const BaseDarkButton = styled.button<{weight?: string, padding: string, bRadius: string, background?: string}>`
    color: #FFFFFF;
    cursor: pointer;
    background: ${({background}) => background ? background : '#1B1D28'};
    border: none;
    font-size: 16px;
    line-height: 21px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    font-weight: ${({weight}) => weight ? weight : '400'};
    border-radius: ${({bRadius}) => bRadius};
    padding: ${({padding}) => padding};
`;

export const BaseRedButton = styled.button<{weight?: string, padding: string, bRadius: string}>`
    color: #FFFFFF;
    cursor: pointer;
    background: #FE4F4F;
    border: none;
    font-size: 16px;
    line-height: 21px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    font-weight: ${({weight}) => weight ? weight : '400'};
    border-radius: ${({bRadius}) => bRadius};
    padding: ${({padding}) => padding};
`;

export const BaseGreyButton = styled(BaseDarkButton)`
    color: white;
    background: #A9AAC2;
`;