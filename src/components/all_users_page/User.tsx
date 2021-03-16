import React from "react";
import {StandartImage} from "../../common/styledComponents/baseElements";
import {Td} from "../../common/styledComponents/table";
import {ConfirmIcon} from "../../assets/svgIcons/confirmIcon";
import {NoConfirmIcon} from "../../assets/svgIcons/noConfirmIcon";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {Component} from "../../constants/types/types";
import {openModalAction} from "../../store/actions/modalWindowActions";
import Settings from "./Settings";
import {IUser} from "../../constants/types/interfaces/commonInterfaces";
import {API} from "../../constants/api/api";
import { AdminIcon } from "../../assets/svgIcons/adminIcon";
import { ModeratorIcon } from "../../assets/svgIcons/moderatorIcon";

const connector = connect(
    null,
    (dispatch: Dispatch) => ({
        openModal(body: Component, width: string, parameters: any) {
            dispatch(openModalAction(body, width, parameters))
        }
    })
);

const User: React.FC<any> = ({openModal, listItem: user, toUser, setUser}: ConnectedProps<typeof connector> & {listItem: IUser} & {toUser:() => void} & {setUser:(value: number) => void}) => {
    return (
        <tr>
            <Td minWidth="50px" className="text-center">
                <StandartImage src={user.avatar_image && user.avatar_image.startsWith('data:') ? user.avatar_image : API.baseUrl + user.avatar_image} />
            </Td>
            <Td minWidth='155px'>
                {user.first_name} {user.last_name}
            </Td>
            <Td minWidth="180px">
                {user.status === 1 && <ConfirmIcon/>}
                {user.status === 2 && <NoConfirmIcon/>}
                {user.status === 3 && <AdminIcon />}
                {user.status === 4 && <ModeratorIcon />}
            </Td>
            <Td 
                minWidth="210px"
                pointer={true}
                onClick={() => {
                    setUser(user.mobile);
                    toUser();
                }}
            >
                <u>Open</u>
            </Td>
            <Td minWidth="120px">
                {user.suggestions}/{user.applications}
            </Td>
            <Td minWidth="105px">
                {user.reports}
            </Td>
            <Td minWidth="105px">
                {user.messages}
            </Td>
            <Td
                minWidth="145px"
                pointer={true}
                onClick={() => {
                    openModal(Settings, '403px', {restrictions:user.restrictions, status: user.status, id: user.mobile})
                }}
            >
                <u>Set</u>
            </Td>
        </tr>
    )
}

export default connector(User);