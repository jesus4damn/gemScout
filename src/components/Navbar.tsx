import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {LogoutIcon} from "../assets/svgIcons/logoutIcon";
import {StandartImage, Title} from "../common/styledComponents/baseElements";
import {connect, ConnectedProps} from "react-redux";
import {logoutAction} from "../store/actions/loginActions";
import {RootState} from "../store/reducers/rootReducer";
import {API} from "../constants/api/api";

const NavbarWrapper = styled.div`
    position: relative;
    width: 100%;
    padding: 14px 36px 15px 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    background: #1B1D28;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const NavbarUserCard = styled.div.attrs({
    id: 'navbarCard'
})<{isShow: boolean}>`
    position: absolute;
    z-index: 100;
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
    display: ${({isShow}) => isShow ? 'block' : 'none'};
    right: 0;
    top: 0;
    background: #F2F4F8;
    width: 290px;
    border-bottom-left-radius: 4px;
`;

const NavbarUserCardBlock = styled.div<{background: string, divMargin: string, cursor?: string}>`
    background: ${({background}) => background};
    padding: 15px 0 15px 20px;
    display: flex;
    border-bottom-left-radius: 4px;
    color: #3D404E;
    cursor: ${({cursor}) => cursor ? cursor : 'default'};
    align-items: center;
    min-height: 66px;
    div {
        margin-left: ${({divMargin}) => divMargin};
    } 
`;

const connector = connect(
    (state: RootState) => ({
        avatar: state.userProfile.avatar,
        name: state.userProfile.name
    }),
    (dispatch: any) => ({
        logout() {
            dispatch(logoutAction())
        }
    })
)

const Navbar: React.FC<any> = ({logout, name, avatar}: ConnectedProps<typeof connector>) => {
    const [isShow, toggleUserCard] = useState(false);

    useEffect(() => {
        const closeNavbarCard = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (isShow && !target.closest('#navbarCard') && target.tagName !== 'IMG') {
                toggleUserCard(false);
            }
            return false;
        }

        document.addEventListener('click', (e) => closeNavbarCard(e));
        return () => {
            document.removeEventListener('click', (e) => closeNavbarCard(e))
        }
    }, [isShow])

    return (
        <NavbarWrapper>
            <StandartImage src={API.baseUrl + avatar} onClick={() => toggleUserCard(true)}/>
            <NavbarUserCard isShow={isShow}>
                <NavbarUserCardBlock background="inherit" divMargin="20px">
                    <StandartImage src={API.baseUrl + avatar}/>
                    <div className="d-flex flex-column">
                        <Title size="18px">{name}</Title>
                        <Title size="14px">Admin</Title>
                    </div>
                </NavbarUserCardBlock>
                <NavbarUserCardBlock
                    background="#FFFFFF"
                    divMargin="28px"
                    cursor="pointer"
                    onClick={() => logout()}
                >
                    <LogoutIcon style={{marginLeft: '4px'}}/>
                    <div>
                        <Title size="14px">Exit</Title>
                    </div>
                </NavbarUserCardBlock>
            </NavbarUserCard>
        </NavbarWrapper>
    )
}

export default connector(Navbar);