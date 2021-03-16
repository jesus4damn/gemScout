import React from "react";
import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {NewUserIcon} from "../assets/svgIcons/newUserIcon";
import {AllUsersIcon} from "../assets/svgIcons/allUsersIcon";
import {AddPageIcon} from "../assets/svgIcons/addPageIcon";
import {GemIcon} from "../assets/svgIcons/gemIcon";
import {MessageIcon} from "../assets/svgIcons/messageIcon";
import {QuestionIcon} from "../assets/svgIcons/questionIcon";
import {RequestIcon} from "../assets/svgIcons/requestIcon";

const MenuWrapper = styled.div`
    width: 276px;
    height: 100vh;
    background-color: #FFFFFF;
    box-shadow: 0px 0px 38px rgba(0, 0, 0, 0.25);
`;

const MenuBrand = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 0px 38px rgba(0, 0, 0, 0.25);
    border-bottom-left-radius: 20px;
    border-bottom-right-radius: 20px;
    font-weight: bold;
    height: 65px;
    font-size: 30px;
    line-height: 37px;
    text-align: center;
    width: inherit;
    padding: 11px 0 17px;
    margin-bottom: 75px;
`;

const MenuItem = styled.li`
    font-size: 16px;
    margin-left: 14px;
    list-style-type: none;
    margin: 0;
    font-weight: 400;
    align-items: center;
    &:hover {
        background: #F2F4F8;
        font-weight: 600;
    };
    a {
        color: #1B1D28;
        display: block;
        padding: 12px 0 14px 16px;
        span {
            margin-left: 14px;
            line-height: 19px;
        }
    };
`;

const Menu: React.FC = () => {

    const activeStyle = {background: '#F2F4F8', fontWeight: 600};

    const links = [
        {to: '/new_users', text: 'New user', icon: <NewUserIcon />},
        {to: '/all_users', text: 'All users', icon: <AllUsersIcon />},
        {to: '/requests', text: 'Requests', icon: <RequestIcon />},
        {to: '/gems', text: 'Gemstones list', icon: <GemIcon />},
        {to: '/about', text: 'About the system', icon: <QuestionIcon />},
        {to: '/add_page', text: 'Add a page', icon: <AddPageIcon />},
        {to: '/feedback', text: 'Feedback', icon: <MessageIcon />},
    ];

    return (
        <MenuWrapper>
            <MenuBrand>GemScout</MenuBrand>
            <ul style={{paddingLeft: 0}}>
                {
                    links.map(link => (
                        <MenuItem key={link.to}>
                            <NavLink to={link.to} activeStyle={activeStyle}>
                                {link.icon}
                                <span>{link.text}</span>
                            </NavLink>
                        </MenuItem>
                    ))
                }
            </ul>
        </MenuWrapper>
    )
}

export default Menu;