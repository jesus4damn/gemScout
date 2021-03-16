import React from "react";
import styled from "styled-components";
import {Field} from "formik";
import Input from "../../common/form_elements/Input";
import {BaseDarkButton} from "../../common/styledComponents/baseElements";
import {Wrapper} from "../../common/styledComponents/wrappers";

const FilterWrapper = styled(Wrapper)<{isOpen: boolean}>`
    position: absolute;
    right: 0;
    display: ${({isOpen}) => isOpen ? 'block' : 'none'};
    transform: translateY(10px);
    z-index: 5;
    font-size: 16px;
    line-height: 20px;
    background: #F2F4F8;
`;

const Row = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    div:first-of-type {
        margin-right: 10px;
    };
`;

const Filter = ({isOpen}: {isOpen: boolean}) => (
    <FilterWrapper padding="30px 26px" isOpen={isOpen}>
        <Row>
            <Field name="application_from" width="170px" label="Request number from" component={Input}/>
            <Field name="application_to" width="170px" label="To" component={Input}/>
        </Row>
        <Row>
            <Field name="offer_from" width="170px" label="Offer number from" component={Input}/>
            <Field name="offer_to" width="170px" label="To" component={Input}/>
        </Row>
        <Row>
            <Field name="messages_from" width="170px" label="Message number from" component={Input}/>
            <Field name="messages_to" width="170px" label="To" component={Input}/>
        </Row>
        <div className="text-right">
            <BaseDarkButton type="submit" bRadius="21px" padding="8px 35px">Apply</BaseDarkButton>
        </div>
    </FilterWrapper>
)

export default Filter;