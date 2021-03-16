import { Formik, Form, Field, FieldProps } from "formik";
import React, {useEffect, useState, ChangeEvent} from "react";
import styled from "styled-components";
import SelectRequest from "../../../common/form_elements/SelectRequest";
import Select from "../../../common/form_elements/Select";
import { BaseDarkButton, BaseRedButton } from "../../../common/styledComponents/baseElements";
import {PlusIcon} from "../../../assets/svgIcons/plusIcon";
import Switch from "../../../common/form_elements/Switch";
import { IGemstone, IOffer, IRequest, IShape } from "../../../constants/types/interfaces/commonInterfaces";
import SelectWithCheckboxes from "../../../common/form_elements/SelectWithCheckboxes";
import { GamestoneFeatures } from "../../../constants/types/types";
import { API } from "../../../constants/api/api";
import { toDataUrl } from "../../../common/functions/toDataUrl";
import { RedCrossIcon } from "../../../assets/svgIcons/CrossIconRed";
import InputWithMaskUser from "../../../common/form_elements/InputWithMaskUser";
import { urltoFile } from "../../../common/functions/urlToFile";


const Container = styled.div`
    width:815px;
    background: #FFFFFF;
    border-radius: 10px;
    padding: 45px 21px 29px 35px;
    margin-right:25px;
    margin-bottom:10px;
`;

const Inner = styled.div`
    width:100%;
    display:flex;
    justify-content:space-between;
`;

const InputLabel = styled.span`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1B1D28;
`;

const CustomInputWrapper = styled.div<{width: string, background: string}>`
  position:relative;
  color: #1B1D28;
  border: none;
  background: ${({background}) => background};  
  font-size: 16px;
  padding: 7px 14px;
  border-radius: 22px;
  width: ${({width}) => width}     
`;

const CustomInput = styled.input`
  width:80%;
  height:100%;
  background:transparent;
  border:none;
`;

const CustomTextarea = styled.textarea`
  width:100%;
  height:140px;
  background:#F2F4F8;
  border:none;
  resize:none;
  border-radius: 22px;
  &: focus{
      outline:none;
  }
  padding: 9px 16px 11px 14px;
`;

const InputRightText = styled.span`
    position:absolute;
    top:0;
    right:14px;
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 37px;
    color: #B9BCCA;
`;

const SelectField = ({name, field, options}:{name:string, field:string, options:string[]}) => {
    return (
        <div style={{marginBottom:"15px"}}>
            <InputLabel>{name}</InputLabel>
            <Field
                name={field}
                component={Select}
                options={options}
                background="#F2F4F8"
                width="275px"
                marginBottom="15px"
            />
        </div>
    )
}

const SelectRequestField = ({name, field, options}:{name:string, field:string, options:IGemstone[]}) => {
    return (
        <div style={{marginBottom:"15px"}}>
            <InputLabel>{name}</InputLabel>
            <Field
                name={field}
                component={SelectRequest}
                options={options}
                background="#F2F4F8"
                width="275px"
                marginBottom="15px"
            />
        </div>
    )
}

interface IInputProps {
    label: string,
    width: string,
    background: string,
    rightText:string
}

const Input = ({field, form, label, rightText, width, background='#FFFFFF', ...props}: FieldProps & IInputProps) => (
    <CustomInputWrapper background={background} width={width}>
        <CustomInput
            id={`${field.name}_${label}_${width}`}
            {...field}
            {...props}
        />
        <InputRightText>{rightText}</InputRightText>
    </CustomInputWrapper>
)

const InputField = ({name, field, right, width}:{name:string, field:string, right:string, width?: string}) => {
    return (
        <div style={{marginBottom:"15px"}}>
            <InputLabel>{name}</InputLabel>
            <Field
                name={field}
                component={Input}
                label={name}
                background="#F2F4F8"
                width={width ? width : "275px"}
                marginBottom="15px"
                rightText={right}
            />
        </div>
    )
}


const ButtonPlus  = styled.label`
    width:80px;
    height:80px;
    background: #F2F4F8;
    border-radius: 22px;
    display:flex;
    justify-content:center;
    align-items:center;
    cursor:pointer;
`;

const CustomFileInput = styled.input`
  opacity: 0;
  visibility: hidden;
  position: absolute;
`;

const ImageContainer = styled.div`
    position:relative;
    width: 80px;
    height: 80px;
    margin-right:10px;
    margin-bottom:10px;
    border-radius: 22px;
`;
const Image = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`,
}))`
    width: 100%;
    height: 100%;
    border-radius: 22px;
    object-fit: cover;
`;

const textarea = ({value, onChange}:{value:string, onChange:(value:string) => void}) => <CustomTextarea value={value} onChange={(e) => onChange(e.target.value)} />


const OfferBodyEdit: React.FC<any> = ({offer, shapes, gems, setEdit, deleteOffer, changeOffer}:{offer: IOffer, shapes: IShape[], gems:IGemstone[], setEdit: () => void, deleteOffer:(id:number) => void, changeOffer:(id:number, request:IRequest) => void}) => {
    const [shapesState, setShapesState] = useState<{id: number, name:string, bool:boolean}[]>(shapes.map((item: IShape) => {
        return {id:item.id,name:item.name,bool:offer.shapes.findIndex((itemFind: any) => item.id === itemFind.id) !== -1 ? true : false}
    }));
    const [certificate, setCertificate] = useState('');
    const dateFromISO = (date:string) => {
        return date.slice(8,10) + date.slice(5,7) + date.slice(0,4) + date.slice(11,13) + date.slice(14,16);
    }
    useEffect(() => {
        for(let i = 0; i < offer.photos.length; i++){
            if(!offer.photos[i].photo.startsWith('data:')){
                toDataUrl(API.baseUrl + offer.photos[i].photo, (base64: string) => {
                    offer.photos[i].photo = base64;
                })
            }
        }
        if(offer.certificate){
            toDataUrl(API.baseUrl + offer.certificate, (base64: string) => {
                setCertificate(base64);
            })
        }
    },[]);
    return (
        <Container>
            <Formik
                initialValues={{
                    offer_duration:dateFromISO(offer.active_until),
                    gem:gems.find((item) => item.id === offer.application.gemstone.id)!,
                    description:offer.message || "",
                    certificate:certificate || "",
                    gem_location:offer.city || "",
                    clarity:offer.clarity || "",
                    color:offer.color || "",
                    treatment:offer.treatment || "",
                    dimension:offer.dimension,
                    origin:offer.origin || "",
                    price:offer.price || "",
                    price_in_carats:offer.price_in_carats || "",
                    quantity:offer.quantity || "",
                    weight:offer.weight || "",
                    hideProfile:offer.visible || false,
                    shapes:shapesState,
                    photos:offer.photos || [],
                    is_mine:offer.is_mine || false
                }}
                enableReinitialize={true}
                onSubmit={async (values : any) => {
                    for(let i = 0; i < values.photos.length; i++){
                        values.photos[i].photo = await urltoFile(values.photos[i].photo, `image${i}.png`,'image/png');
                    }
                    const myForm = new FormData();
                    if(values.certificate){
                        let cer = await urltoFile(values.certificate, `certificate.png`,'image/png');
                        myForm.append('certificate', cer);
                    } else {
                        myForm.append('certificate', '');
                    }
                    for(let i = 0; i < values.photos.length; i++){
                        myForm.append('photos', values.photos[i].photo);
                    }
                    let date = '';
                    if(values.offer_duration.includes('.')){
                        date = values.offer_duration.slice(6,10) + "-" + values.offer_duration.slice(3,5) + "-" + values.offer_duration.slice(0,2) + "T" + values.offer_duration.slice(11,16);
                    } else {
                        date = values.offer_duration.slice(4,8) + "-" + values.offer_duration.slice(2,4) + "-" + values.offer_duration.slice(0,2) + "T" + values.offer_duration.slice(8,10) + ":" + values.offer_duration.slice(10,12);
                    }
                    myForm.append('active_until', date);
                    myForm.append('price', values.price);
                    myForm.append('city', values.gem_location);
                    myForm.append('weight', values.weight);
                    if(values.hideProfile){
                        myForm.append('visible', "True");
                    } else {
                        myForm.append('visible', "False");
                    }
                    let shapes = '';
                    for(let i = 0; i < values.shapes.length; i++){
                        if(values.shapes[i].bool){
                            shapes += values.shapes[i].id.toString() + ',';
                        }
                    }
                    shapes = shapes.slice(0,shapes.length-1);
                    console.log('shapes', shapes);
                    myForm.append('shapes', shapes);
                    myForm.append('quantity', values.quantity);
                    myForm.append('price_in_carats', values.price_in_carats);
                    myForm.append('origin', values.origin);
                    myForm.append('message', values.description);
                    if(values.is_mine){
                        myForm.append('is_mine', "True");
                    } else {
                        myForm.append('is_mine', "False");
                    }
                    myForm.append('dimension', values.dimension);
                    myForm.append('color', values.color);
                    myForm.append('clarity', values.clarity);

                    try{
                        const result = await API.put(`/admin/suggestion/${offer.id}/change/`, myForm, true);
                        console.log(result.data);
                        changeOffer(offer.id, result.data);
                        setEdit();
                    } catch(e){
                        console.log(e);
                    }
                }}
            >
                { ({dirty, values, setFieldValue, submitForm}) =>
                    <Form encType="multipart/form-data">
                        <div style={{paddingRight:"111px"}}>
                            <Inner>
                                <div>
                                    <div style={{marginBottom:"15px"}}>
                                        <InputLabel>Gemstone</InputLabel>
                                        <CustomInputWrapper background={"#F2F4F8"} width={"274px"}>{values.gem.name}</CustomInputWrapper>
                                    </div>
                                    <div style={{marginBottom:"15px"}}>
                                        <Field
                                            name={`shapes`}
                                            label={"Shapes"}
                                            component={SelectWithCheckboxes}
                                            change={(name: string) => {
                                                const index = shapesState!.findIndex((item) => name === item.name);
                                                if(index !== -1){
                                                    shapesState![index] = {...shapesState![index], bool: !shapesState![index].bool};
                                                    setFieldValue('shapes', [...shapesState!,{name:'',bool:false}]);
                                                }
                                            }}
                                            gems={shapesState}
                                            background="#F2F4F8"
                                            width="275px"
                                            marginBottom="15px"
                                        />
                                    </div>
                                    {values.gem.features.find((item) => item.field === GamestoneFeatures['Color']) &&
                                    <>
                                        {values.gem.features.find((item) => item.field === GamestoneFeatures['Color'])!.type === 1 ?
                                        <InputField name={"Color"} field={"color"} right={""}/> :
                                        <SelectField name={"Color"} field={"color"} options={values.gem.features.find((item) => item.field === GamestoneFeatures['Color'])!.meanings}/>}
                                    </>}
                                    {values.gem.features.find((item) => item.field === GamestoneFeatures['Clarity']) &&
                                    <>
                                        {values.gem.features.find((item) => item.field === GamestoneFeatures['Clarity'])!.type === 1 ?
                                        <InputField name={"Clarity"} field={"clarity"} right={""}/> :
                                        <SelectField name={"Clarity"} field={"clarity"} options={values.gem.features.find((item) => item.field === GamestoneFeatures['Clarity'])!.meanings}/>}
                                    </>}
                                    {values.gem.features.find((item) => item.field === GamestoneFeatures['Treatment']) &&
                                    <>
                                        {values.gem.features.find((item) => item.field === GamestoneFeatures['Treatment'])!.type === 1 ?
                                        <InputField name={"Treatment"} field={"treatment"} right={""}/> :
                                        <SelectField name={"Treatment"} field={"treatment"} options={values.gem.features.find((item) => item.field === GamestoneFeatures['Treatment'])!.meanings}/>}
                                    </>}
                                    {values.gem.features.find((item) => item.field === GamestoneFeatures['Origin']) &&
                                    <>
                                        {values.gem.features.find((item) => item.field === GamestoneFeatures['Origin'])!.type === 1 ?
                                        <InputField name={"Origin"} field={"origin"} right={""}/> :
                                        <SelectField name={"Origin"} field={"origin"} options={values.gem.features.find((item) => item.field === GamestoneFeatures['Origin'])!.meanings}/>}
                                    </>}
                                </div>
                                <div>
                                    <InputField name={"Weight"} width={"275px"} field={"weight"} right={"ct"} />
                                    <InputField name={"Dimension"} width={"275px"} field={"dimension"} right={"mm"} />
                                    <InputField name={"Price"} width={"275px"} field={"price"} right={"$"} />
                                    <InputField name={"Price in carats"} width={"275px"} field={"price_in_carats"} right={"$"} />
                                    <InputField name={"Quantity"} field={"quantity"} right={""}/>
                                    <InputField name={"Gem location"} field={"gem_location"} right={""}/>
                                    <Field name="offer_duration" background="#F2F4F8" value={values.offer_duration} mask="99.99.9999 99:99" width={"100%"} label="Close date" component={InputWithMaskUser}/>
                                </div>
                            </Inner>
                            <Field
                                name={"description"}
                                field={"description"}
                                component={textarea}
                                value={values.description}
                                onChange={(value:string) => setFieldValue("description", value)}
                            />
                            <div className={"d-flex"}>
                                <div style={{marginRight:"50px"}}>
                                    <InputLabel>Certificate</InputLabel>
                                    <div className="d-flex flex-wrap w-100">
                                        {values.certificate &&
                                        <ImageContainer>
                                            <div style={{position:"absolute", top:0, right:0, cursor:"pointer"}} onClick={() => {
                                                setFieldValue('certificate', "");
                                            }}>
                                                <RedCrossIcon />
                                            </div>
                                            <Image src={typeof values.certificate === 'string' && !values.certificate.startsWith('data:') ? API.baseUrl + values.certificate : values.certificate}/>
                                        </ImageContainer>}
                                        <ButtonPlus htmlFor={`${offer.id}certificate_photos`}>
                                            <PlusIcon />
                                        </ButtonPlus>
                                        <CustomFileInput 
                                            id={`${offer.id}certificate_photos`}
                                            type="file"
                                            onChange={(e: ChangeEvent<HTMLInputElement> | any) => {
                                                let reader = new FileReader();
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = function (e) {
                                                    setFieldValue('certificate', e.target!.result);
                                                }
                                            }}/> 
                                    </div>
                                </div>
                                <div>
                                    <InputLabel>Gem photos</InputLabel>
                                    <div className="d-flex flex-wrap w-100">
                                        {values.photos.map((item, index) => (
                                        <ImageContainer key={index}>
                                            <div style={{position:"absolute", top:0, right:0, cursor:"pointer"}} onClick={() => {
                                                setFieldValue('photos', [...values.photos.slice(0,index),...values.photos.slice(index+1,values.photos.length)]);
                                            }}>
                                                <RedCrossIcon />
                                            </div>
                                            <Image key={index} src={typeof item.photo === 'string' && !item.photo.startsWith('data:') ? API.baseUrl + item.photo : item.photo}/>
                                        </ImageContainer>))}
                                        <ButtonPlus htmlFor={`${offer.id}request_photos`}>
                                            <PlusIcon />
                                        </ButtonPlus>
                                        <CustomFileInput 
                                            id={`${offer.id}request_photos`}
                                            type="file"
                                            onChange={(e: ChangeEvent<HTMLInputElement> | any) => {
                                                let reader = new FileReader();
                                                reader.readAsDataURL(e.target.files[0]);
                                                reader.onload = function (e) {
                                                    let photos = [...values.photos,{photo:e.target!.result}];
                                                    setFieldValue('photos', photos);
                                                }
                                            }}/>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex justify-content-between w-100">
                                <Switch
                                    width={"275px"}
                                    text={"Hide buer profile"}
                                    value={values.hideProfile}
                                    onChange={() => {
                                        setFieldValue('hideProfile',!values.hideProfile);
                                    }} />
                                {/* <Switch
                                    width={"275px"}
                                    text={"Is mine"}
                                    value={values.is_mine}
                                    onChange={() => {
                                        setFieldValue('is_mine',!values.is_mine);
                                    }} /> */}
                            </div>
                        </div>
                        <div className="d-flex justify-content-between w-100" style={{marginTop:"40px"}}>
                            <div className="text-left">
                                <BaseRedButton onClick={() => deleteOffer(offer.id)} type="button" bRadius="21px" padding="8px 39px">Delete</BaseRedButton>
                            </div>
                            <div className="text-right">
                                {dirty ? 
                                <BaseDarkButton type="submit" bRadius="21px" padding="8px 39px">Save</BaseDarkButton>:
                                <BaseDarkButton background={"#B9BCCA"} onClick={() => setEdit()} type="button" bRadius="21px" padding="8px 39px">Cancel</BaseDarkButton>}
                            </div>
                        </div>
                    </Form>
                }
            </Formik>
        </Container>
    )   
}

export default OfferBodyEdit;