import React from "react";
import {StandartImage} from "../../common/styledComponents/baseElements";
import {Td} from "../../common/styledComponents/table";
import {INewUser} from "../../constants/types/interfaces/commonInterfaces";
import {API} from "../../constants/api/api";

const NewUser: React.FC<any> = ({listItem: newUser}: {listItem: INewUser}) => {
    return (
        <tr>
            <Td minWidth="50px" className="text-center">
                <StandartImage src={newUser.avatar_image && newUser.avatar_image.startsWith('data:') ? newUser.avatar_image : API.baseUrl + newUser.avatar_image} />
            </Td>
            <Td minWidth='155px'>
                {newUser.first_name} {newUser.last_name}
            </Td>
            <Td minWidth="135px">
                {newUser.birthday.split('-').reverse().join('.')}
            </Td>
            <Td minWidth="170px">
                {newUser.number}
            </Td>
            <Td>
                {newUser.stage}
            </Td>
            <Td minWidth="190px">
                {newUser.company_name}
            </Td>
            <Td minWidth="190px">
                <a rel="noreferrer" target="_blank" href={API.baseUrl + newUser.passport_image}><u>Photo</u></a>
            </Td>
        </tr>
    )
}

export default NewUser;