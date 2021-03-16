import React from "react";
import styled from "styled-components";
import {Field} from "formik";
import Input from "../../common/form_elements/Input";
import {BaseDarkButton, BaseGreyButton} from "../../common/styledComponents/baseElements";
import {Wrapper} from "../../common/styledComponents/wrappers";
import { IGemstone, IShape } from "../../constants/types/interfaces/commonInterfaces";
import SelectWithCheckboxes from "../../common/form_elements/SelectWithCheckboxes";
import Select from "../../common/form_elements/Select";

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

const Row = styled.div<{margin?: string}>`
    display: flex;
    justify-content: space-between;
    margin-bottom:${({margin}) => margin ? margin : ''};
    div:first-of-type {
        margin-right: 10px;
    };
`;

const InputLabel = styled.span`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1B1D28;
`;

const SelectField = ({name, field, options}:{name:string, field:string, options:string[]}) => {
    return (
        <div style={{marginBottom:"15px", width:"170px"}}>
            <InputLabel>{name}</InputLabel>
            <Field
                name={field}
                component={Select}
                options={options}
                background="#FFF"
                width="170px"
                marginBottom="15px"
            />
        </div>
    )
}

const InputField = ({name, field, right, width}:{name:string, field:string, right:string, width?: string}) => {
    return (
        <div style={{marginBottom:"15px"}}>
            <InputLabel>{name}</InputLabel>
            <Field
                name={field}
                component={Input}
                background="#FFFFFF"
                width={width ? width : "170px"}
                marginBottom="15px"
                rightText={right}
            />
        </div>
    )
}

const Filter = ({setRequests, setFieldValue, resetForm, shapesState,gemsState, gems, shapes, isOpen,loadDataRequest,toggleFilter, setCurrentPage}: {setRequests:any,toggleFilter:any,setCurrentPage:any,resetForm:any,setFieldValue:(str:string,val:any) => void,shapesState:{id: number, name:string, bool:boolean}[],loadDataRequest:any,gemsState:{id: number, name:string, bool:boolean}[], gems:IGemstone[], shapes: IShape[], isOpen: boolean}) => (
    <FilterWrapper padding="30px 26px" isOpen={isOpen}>
        <Row margin={"15px"}>
            <Field
                name={`gemstoneFilter`}
                label={"Gemstone"}
                padding={"5px 14px"}
                component={SelectWithCheckboxes}
                change={(name: string) => {
                    const index = gemsState!.findIndex((item) => name === item.name);
                    if(index !== -1){
                        gemsState![index] = {...gemsState![index], bool: !gemsState![index].bool};
                        setFieldValue('gemstoneFilter', [...gemsState!,{name:'',bool:false}]);
                    }
                }}
                gems={gemsState}
                background="#FFF"
                width="170px"
                marginBottom="15px"
            />
            <Field
                name={`shapesFilter`}
                label={"Shapes"}
                padding={"5px 14px"}
                component={SelectWithCheckboxes}
                change={(name: string) => {
                    const index = shapesState!.findIndex((item) => name === item.name);
                    if(index !== -1){
                        shapesState![index] = {...shapesState![index], bool: !shapesState![index].bool};
                        setFieldValue('shapesFilter', [...shapesState!,{name:'',bool:false}]);
                    }
                }}
                gems={shapesState}
                background="#FFF"
                width="170px"
                marginBottom="15px"
            />
        </Row>
        <Row>
            <InputField name={"Weigth from"} field={"weigth_from"} right={""}/>
            <InputField name={"Weigth to"} field={"weigth_to"} right={""}/>
        </Row>
        <Row>
            <InputField name={"Price from"} field={"price_from"} right={""}/>
            <InputField name={"Price to"} field={"price_to"} right={""}/>
        </Row>
        <Row>
            <InputField name={"Carat from"} field={"carat_from"} right={""}/>
            <InputField name={"Carat to"} field={"carat_to"} right={""}/>
        </Row>
        <Row>
            <InputField name={"Origin"} field={"origin"} right={""}/>
        </Row>
        <div className="d-flex justify-content-between">
            <BaseGreyButton type="button" onClick={() => {
                setRequests([]);
                setCurrentPage(1);
                loadDataRequest();
                resetForm({});
                toggleFilter(false);
            }} bRadius="21px" padding="8px 35px">Clear</BaseGreyButton>
            <BaseDarkButton type="submit" bRadius="21px" padding="8px 35px">Apply</BaseDarkButton>
        </div>
    </FilterWrapper>
)

export default Filter;