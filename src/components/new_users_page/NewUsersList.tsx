import React, {useEffect} from "react";
import {PageWrapper} from "../../common/styledComponents/wrappers";
import NewUser from "./NewUser";
import BaseTable from "../../common/components/BaseTable";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {RootState} from "../../store/reducers/rootReducer";
import {Dispatch} from "redux";
import {addNewUsersListAction, getNewUsersListAction} from "../../store/actions/usersActions";

const connector = connect(
    (state: RootState) => ({
        newUsers: state.users.newUsers,
        currentPage: state.users.currentPageNewUsers
    }),
    (dispatch: Dispatch) => ({
        getNewUsersList(loadingFalse:() => void) {
            dispatch(getNewUsersListAction(loadingFalse))
        }
    })
)

const NewUsersList: React.FC<any> = ({getNewUsersList, newUsers, currentPage}: ConnectedProps<typeof connector>) => {
    const dispatch = useDispatch();

    const addUsers = (loadingFalse:() => void, loadingTrue:() => void) => {
        currentPage !== null && loadingTrue();
        currentPage !== null && dispatch(addNewUsersListAction(currentPage!+1, loadingFalse));
    }

    return (
        <PageWrapper padding="32px 36px 57px 29px">
            <BaseTable 
                list={newUsers} 
                listItem={NewUser} 
                action={addUsers}
                onMount={getNewUsersList}
                currentPage={currentPage}>
                <th></th>
                <th>Name</th>
                <th>Date of Birth</th>
                <th>Phone</th>
                <th>Business experience</th>
                <th>Company</th>
                <th>Passport</th>
            </BaseTable>
        </PageWrapper>
    )
}

export default connector(NewUsersList);