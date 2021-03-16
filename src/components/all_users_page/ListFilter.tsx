import React, {useState, ChangeEvent, useEffect} from "react";
import styled from "styled-components";
import {FilterBarsIcon} from "../../assets/svgIcons/filterBarsIcon";
import {SearchIcon} from "../../assets/svgIcons/searchIcon";
import Filter from "./FIlter";
import {connect, ConnectedProps, useDispatch} from "react-redux";
import {Dispatch} from "redux";
import {IFilterData, IFilterForm} from "../../constants/types/interfaces/commonInterfaces";
import {filterAllUsersListAction, getAllUsersListAction} from "../../store/actions/usersActions";
import {Form, Formik, Field} from "formik";
import Input from "../../common/form_elements/Input";

const ListFilterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-bottom: 20px;
`;

const FieldWrapper = styled.div`
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border-radius: 10px 6px 6px 10px;
    padding-left: 9px;
`;

const SearchInput = styled(Input)`
     width: 190px;
     border-radius: 10px;
     font-size: 14px;
     padding: 10px 9px 10px 11px; 
`;

const FilterButton = styled.button`
    border: none;
    border-radius: 6px;
    background: #1B1D28;
    padding: 13px 11px;
`;





const ListFilter = ({functionLoading}: {functionLoading:((bool:boolean) => void) | null}) => {
    const [isOpen, toggleFilter] = useState(false);
    const dispatch = useDispatch();


    return (
        <ListFilterWrapper>
            <Formik
                initialValues={{
                    name: '',
                    application_from: '',
                    application_to: '',
                    offer_from: '',
                    offer_to: '',
                    messages_from: '',
                    messages_to: ''
                }}
                onSubmit={(values: IFilterForm) => {
                    functionLoading && functionLoading(true);
                    dispatch(filterAllUsersListAction(functionLoading ? () => functionLoading(false) : null, values));
                    if (isOpen) toggleFilter(false);
                }}
            >
                { ({submitForm, setFieldValue}) =>
                    <Form>
                        <FieldWrapper>
                            <SearchIcon/>
                            <Field
                                name="name"
                                placeholder="User search"
                                width="190px"
                                component={SearchInput}
                                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                                    setFieldValue('name', event.target.value);
                                    submitForm();
                                }}
                            />
                            <FilterButton type="button" onClick={() => toggleFilter(!isOpen)}>
                                <FilterBarsIcon/>
                            </FilterButton>
                        </FieldWrapper>
                        <Filter isOpen={isOpen}/>
                    </Form>
                }
                    </Formik>
        </ListFilterWrapper>
    )
}

export default ListFilter;