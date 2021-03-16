import React, {useState} from "react";
import {Accordion} from "react-bootstrap";
import styled from "styled-components";
import {ShapeIcon} from "../../assets/svgIcons/shapeIcon";
import {AnimatedElement} from "../../common/styledComponents/animations";
import AccordionBody from "./AccordionBody";
import {Form, Formik, Field} from "formik";
import Input from "../../common/form_elements/Input";
import CustomToggle from "./CustomToggle";
import {connect, ConnectedProps} from "react-redux";
import {Dispatch} from "redux";
import {updateGemstoneAction} from "../../store/actions/gemstonesActions";
import {IGemstone} from "../../constants/types/interfaces/commonInterfaces";
import {createFormData} from "../../common/functions/createFormData";
import { GamestoneFeatures, GamestoneTypes } from "../../constants/types/types";

const CardBodyWrapper = styled.div`
    width: 100%;
    background: #FFFFFF;
    padding: 0 20px 19px 26px;
    border-radius: 0 0 10px 10px;
    table {
       border: none;
       border-top: 1px solid #A6ACBE;
       th {
          border: none;
       }
       td {
          border: none;
          vertical-align: top;
       }
   };
`;

const StoneName = styled(Input)`
    width: 200px;
    border: none;
    font-weight: 600;
    font-size: 16px;
    line-height: 19px;
    background: inherit;
    padding: 0;
`;

export interface IFeature {
    readonly id: number,
    meanings: string[],
    field: number,
    type: number
}


export interface IAccordionForm {
    readonly id: number,
    name: string,
    is_important: boolean,
    image: File | string,
    _image: string,
    features: string[],
    types: string[],
    meanings: string[][],
    change: string
}



const connector = connect(
    null,
    (dispatch: Dispatch) => ({
       updateGemstone(gemstone: FormData) {
           dispatch(updateGemstoneAction(gemstone))
       }
    })
)


const Gemstone = ({gem, updateGemstone, deleteGemstome}: {gem: IGemstone,deleteGemstome:(id:number) => void} & ConnectedProps<typeof connector>) => {
    const [accordion, toggleAccordion] = useState<any>({
        isOpen: false,
        shapeAnimation: ''
    });

    return (
       <Accordion style={{marginBottom: '10px'}}>
           <Formik
               initialValues={{
                   id: gem.id,
                   name: gem.name || 'Stone',
                   is_important: gem.is_important || false,
                   image: gem.image || '',
                   // Этот костыль я пока не знаю, как исправить, т.к. при попытке установить значение в input типа file,
                   // браузер выдаёт ошибку, что так делать нельзя + formik не поддерживает тип File
                   _image: '',
                   features: gem.features && gem.features.length > 0 ? gem.features.map((item: any) => GamestoneFeatures[item.field]) : [],
                   types: gem.features && gem.features.length > 0 ? gem.features.map((item: any) => GamestoneTypes[item.type]) : [],
                   meanings: gem.features && gem.features.length > 0 ? gem.features.map((item: any) => item.meanings) : [],
                   //Добавил для того чтобы менять dirty, не знаю почему он не меняется в некоторых местах
                   change: ""
               }}
               enableReinitialize={true}
               onSubmit={(values: IAccordionForm, {resetForm}) => {
                   const {image, ...form} = values;
                   const submittedForm = image ? {...form, image: image} : {...form};
                   let newFeatures : string = '';
                   for(let i = 0; i < submittedForm.features.length; i++){
                        newFeatures += `field=${GamestoneFeatures[submittedForm.features[i]]}&type=${GamestoneTypes[submittedForm.types[i]]}`;
                        if(submittedForm.types[i] === 'list' && submittedForm.meanings[i].length > 0){
                            newFeatures += `&meanings=`;
                            for(let j = 0; j < submittedForm.meanings[i].length; j++){
                                if(j === submittedForm.meanings[i].length -1) {
                                    newFeatures += `${submittedForm.meanings[i][j]};`;
                                } else {
                                    newFeatures += `${submittedForm.meanings[i][j]},`;
                                }
                            }
                        } else {
                            newFeatures += `;`;
                        }
                   }
                   newFeatures = newFeatures.slice(0,newFeatures.length-1);
                   const myForm = new FormData();
                   myForm.append('id',submittedForm.id.toString());
                   myForm.append('name',submittedForm.name);
                   if(typeof image !== 'string'){
                    myForm.append('image',image);
                   }
                   console.log(newFeatures);
                   console.log(submittedForm.id.toString());
                   console.log(submittedForm.name);
                   myForm.append('features',newFeatures);
                   myForm.append('is_important',submittedForm.is_important.toString());
                   resetForm({values});
                   updateGemstone(myForm);
               }}
           >
               {
                   ({dirty, values, setFieldValue}) => (
                       <Form encType="multipart/form-data">
                           <CustomToggle accordion={accordion} toggleAccordion={toggleAccordion} eventKey="0">
                               <Field name="name" component={StoneName} />
                               <AnimatedElement animation={accordion.shapeAnimation}>
                                   <ShapeIcon/>
                               </AnimatedElement>
                           </CustomToggle>
                           <Accordion.Collapse eventKey="0">
                               <CardBodyWrapper>
                                   <AccordionBody 
                                        values={values} 
                                        dirty={dirty} 
                                        setFieldValue={setFieldValue} 
                                        deleteGemstome={deleteGemstome}
                                    />
                               </CardBodyWrapper>
                           </Accordion.Collapse>
                       </Form>
                   )
               }
           </Formik>
       </Accordion>
    )
}

export default connector(Gemstone);