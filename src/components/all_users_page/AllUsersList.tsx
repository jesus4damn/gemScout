import React, {useEffect, useRef, useState} from "react";
import {PageWrapper} from "../../common/styledComponents/wrappers";
import User from "./User";
import BaseTable from "../../common/components/BaseTable";
import ListFilter from "./ListFilter";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Dispatch} from "redux";
import {addAllUsersListAction, getAllUsersListAction} from "../../store/actions/usersActions";
import UserProfilePage from "../user_profile_page/UserProfilePage";
import {IUser} from "../../constants/types/interfaces/commonInterfaces";

const connector = connect(
    (state: RootState) => ({
        allUsers: state.users.allUsers,
        currentPage: state.users.currentPageAllUsers,
        params: state.users.params
    }),
    (dispatch: Dispatch) => ({
        getAllUsersList(loadingFalse:() => void) {
            dispatch(getAllUsersListAction(loadingFalse))
        }
    })
)

const AllUsersList: React.FC<any> = ({getAllUsersList, currentPage, allUsers, params}: ConnectedProps<typeof connector>) => {
    const [userPage, setUserPage] = useState(false);
    const [userId, setUserId] = useState<number>(0);
    const [functionLoading, setFunctionLoading] = useState<((bool: boolean) => void) | null>(null);
    const dispatch = useDispatch();

    
    const addUsers = (loadingFalse:() => void, loadingTrue:() => void) => {
        currentPage !== null && loadingTrue();
        currentPage !== null && dispatch(addAllUsersListAction(currentPage!+1, loadingFalse, params));
    }
    const functionLoadingSet = (func:(bool:boolean) => void) => {
        setFunctionLoading(() => (bool:boolean) => func(bool));
    }


    return (
        <>
            {userPage ?
            <UserProfilePage user={allUsers[allUsers.findIndex((item) => item.mobile === userId)]} toUsers={() => setUserPage(false)} /> :
            <PageWrapper padding="29px 36px 57px 29px">
                <ListFilter functionLoading={functionLoading} />
                <BaseTable 
                    toUser={() => setUserPage(true)} 
                    setUser={(value:number) => setUserId(value)} 
                    list={allUsers} 
                    listItem={User}
                    action={addUsers}
                    onMount={getAllUsersList}
                    currentPage={currentPage}
                    functionLoadingSet={functionLoadingSet}>
                    <th></th>
                    <th>Name</th>
                    <th>User confirmed</th>
                    <th>Open requests list</th>
                    <th>Offers/Requests</th>
                    <th>Reports</th>
                    <th>Messages</th>
                    <th>Settings</th>
                </BaseTable>
            </PageWrapper>}
        </>
    )
}

export default connector(AllUsersList);