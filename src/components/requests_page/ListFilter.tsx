import React, {useState} from "react";
import styled from "styled-components";
import {FilterBarsIcon} from "../../assets/svgIcons/filterBarsIcon";
import {IGemstone, IShape} from "../../constants/types/interfaces/commonInterfaces";
import {Form, Formik} from "formik";
import Input from "../../common/form_elements/Input";
import Filter from "./Filter";
import { useDispatch } from "react-redux";

const ListFilterWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
    position: relative;
    margin-bottom: 25px;
`;

const FieldWrapper = styled.div`
    display: flex;
    align-items: center;
    background: #FFFFFF;
    border-radius: 10px 6px 6px 10px;
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





const ListFilter = ({setRequests, gems, shapes, active, loadDataRequest, setCurrentPage}: {setRequests:any,gems:IGemstone[], shapes: IShape[], active: boolean, loadDataRequest:any, setCurrentPage:(number:number) => void}) => {
    const [isOpen, toggleFilter] = useState(false);
    const dispatch = useDispatch();
    const [shapesState, setShapesState] = useState<{id: number, name:string, bool:boolean}[]>(shapes.map((item: IShape) => {
        return {id:item.id,name:item.name,bool:false}
    }));
    const [gemsState, setGemsState] = useState<{id: number, name:string, bool:boolean}[]>(gems.map((item: IShape) => {
        return {id:item.id,name:item.name,bool:false}
    }));

    return (
        <ListFilterWrapper>
            <Formik
                initialValues={{
                    gemstoneFilter:gemsState,
                    shapesFilter:shapesState,
                    weigth_from: '',
                    weigth_to: '',
                    price_from: '',
                    price_to: '',
                    carat_from: '',
                    carat_to: '',
                    origin: ''
                }}
                onSubmit={(values: any) => {
                    let shapes = '';
                    for(let i = 0; i < values.shapesFilter.length; i++){
                        if(values.shapesFilter[i].bool){
                            shapes += values.shapesFilter[i].id.toString() + ',';
                        }
                    }
                    shapes = shapes.slice(0,shapes.length-1);

                    let gemstones = '';
                    for(let i = 0; i < values.gemstoneFilter.length; i++){
                        if(values.gemstoneFilter[i].bool){
                            gemstones += values.gemstoneFilter[i].id.toString() + ',';
                        }
                    }
                    gemstones = gemstones.slice(0,gemstones.length-1);
                    setRequests([]);
                    setCurrentPage(1);
                    loadDataRequest(values.weigth_from,values.weigth_to, values.price_from, values.price_to, values.carat_from, values.carat_to, values.origin, shapes, gemstones);
                    toggleFilter(false);
                }}
            >
                { ({submitForm, setFieldValue, resetForm}) =>
                    <Form>
                        <FieldWrapper>
                            <FilterButton type="button" onClick={() => toggleFilter(!isOpen)}>
                                <FilterBarsIcon/>
                            </FilterButton>
                        </FieldWrapper>
                        <Filter setRequests={setRequests} setCurrentPage={setCurrentPage} toggleFilter={toggleFilter} resetForm={resetForm} loadDataRequest={loadDataRequest} setFieldValue={setFieldValue} gemsState={gemsState} shapesState={shapesState} gems={gems} shapes={shapes} isOpen={isOpen}/>
                    </Form>
                }
                    </Formik>
        </ListFilterWrapper>
    )
}

export default ListFilter;