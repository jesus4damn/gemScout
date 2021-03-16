import React, {useState, useEffect, useRef} from "react";
import styled from "styled-components";
import { IGemstone, IUser, IUserForm } from "../../../constants/types/interfaces/commonInterfaces";
import {API} from "../../../constants/api/api";
import { Td } from "../../../common/styledComponents/table";
import { SettingsIcon } from "../../../assets/svgIcons/settingsIcon";
import {Form, Formik, Field} from "formik";
import FileInput from "../../../common/form_elements/FileInput";
import Input from "../../../common/form_elements/Input";
import InputWithMaskUser from "../../../common/form_elements/InputWithMaskUser";
import SelectWithCheckboxes from "../../../common/form_elements/SelectWithCheckboxes";
import { useDispatch } from "react-redux";
import { blockUserAction, updateUserDataAction } from "../../../store/actions/usersActions";
import Complaint from "./Complaint";
import { LoaderIcon } from "../../../assets/svgIcons/loaderIcon";




const Container = styled.div`
    display:flex;
    align-items:center;
    flex-grow:1;
    flex-shrink:1;
    flex-direction:column;
`;

const UserInner = styled.div`
    position:relative;
    width:561px;
    background: #FFFFFF;
    border-radius: 10px;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.15);
    padding: 21px 32px 31px 24px;
`;

const Text = styled.span<{weight?: string, opacity?: string, lineHeight?: string}>`
    font-style: normal;
    font-weight: ${({weight}) => weight ? weight : "normal"};
    font-size: 16px;
    color: #000000;
    opacity:${({opacity}) => opacity ? opacity : 1};
    line-height:${({lineHeight}) => lineHeight ? lineHeight : '36px'};
`;

const Tbody = styled.tbody`
    font-size: 16px;
    line-height: 20px;
`;

const SettingsButton = styled.div`
    position:absolute;
    top:13px;
    right:13px;
    cursor:pointer;
`;

const SettingsContainer = styled.div<{height?:string}>`
    position:absolute;
    top:34px;
    right:13px;
    width:200px;
    height:${({height}) => height ? height : '80px'};
    box-shadow:0px 0px 12px rgba(0,0,0,0.15);
    background: #FFFFFF;
    border-radius: 10px;
    cursor:pointer;
    overflow:hidden;
`;

const SettingsItem = styled.div`
    width:100%;
    height:40px;
    padding-left:25px;
    &:hover {
        background:#F2F4F8;
    }
`;

const SettingsText = styled.span<{color?: string}>`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    color: ${({color}) => color ? color : "#000"};
    line-height:40px;
`;


export const Avatar = styled.img.attrs(({src}: {src: string}) =>({
    src: `${src}`
}))`
    width: 75px;
    height: 75px;
    border-radius: 75px;
`;

const Settings: React.FC<any> = ({setEdit, user_block, id, status, settings}:{setEdit:() => void, user_block: boolean, id: number, status: number, settings: number[]}) => {
    const [open, setOpen] = useState(false);
    const wrapperRef = useRef<HTMLInputElement>(null);
    const dispatch = useDispatch();

    const blockAction = () => {
        const indexRestr = settings.findIndex((item: number) => item === 6);
        let newSettings = [...settings];
        if(indexRestr !== -1){
            if(user_block){
                newSettings.splice(indexRestr,1);
            }
        } else {
            if(!user_block){
                newSettings.push(6);
            }
        }
        dispatch(blockUserAction(id,status,newSettings,!user_block));
        setOpen(false);
    }

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            const target = event.target as HTMLElement;
            if (wrapperRef.current && !wrapperRef.current!.contains(target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [wrapperRef]);

    return (
        <>
            <SettingsButton onClick={() => setOpen(true)}>
                <SettingsIcon />
            </SettingsButton>
            {open &&
            <>
                {status === 3 ? 
                <SettingsContainer ref={wrapperRef} height={"40px"}>
                    <SettingsItem onClick={() => setEdit()}>
                        <SettingsText>Edit</SettingsText>
                    </SettingsItem>
                </SettingsContainer> :
                <SettingsContainer ref={wrapperRef}>
                    <SettingsItem onClick={() => setEdit()}>
                        <SettingsText>Edit</SettingsText>
                    </SettingsItem>
                    <SettingsItem onClick={() => blockAction()}>
                        <SettingsText color={"#CC261B"}>{user_block ? "Unblock" : "Block"}</SettingsText>
                    </SettingsItem>
                </SettingsContainer>}
            </>}
        </>
    );
}


const UserNotEdit: React.FC<any> = ({user, setEdit}:{user:IUser, setEdit:() => void}) => {
    const [image, setImage] = useState(user.avatar_image || '');
    useEffect(() => {
        setImage(user.avatar_image);
    },[user]);
    return (
        <>
            <Avatar src={image && image.startsWith('data:') ? image : API.baseUrl + image} />
            <table style={{marginTop:"25px", marginLeft:"3px"}}>
                <Tbody>
                    <tr>
                        <Td minWidth="103px">
                            <Text weight={"bold"}>First name:</Text>
                        </Td>
                        <Td minWidth="357px">
                            <Text opacity={"0.8"}>{user.first_name}</Text>
                        </Td>
                    </tr>
                    <tr>
                        <Td minWidth="103px">
                            <Text weight={"bold"}>Last name:</Text>
                        </Td>
                        <Td minWidth="357px">
                            <Text opacity={"0.8"}>{user.last_name}</Text>
                        </Td>
                    </tr>
                    <tr>
                        <Td minWidth="103px">
                            <Text weight={"bold"}>Company:</Text>
                        </Td>
                        <Td minWidth="357px">
                            <Text opacity={"0.8"}>{user.company_name}</Text>
                        </Td>
                    </tr>
                    <tr>
                        <Td minWidth="103px">
                            <Text weight={"bold"}>Phone:</Text>
                        </Td>
                        <Td minWidth="357px">
                            <Text opacity={"0.8"}>{user.number}</Text>
                        </Td>
                    </tr>
                    <tr>
                        <Td minWidth="103px">
                            <Text weight={"bold"}>Gems list:</Text>
                        </Td>
                        <Td minWidth="357px">
                            <Text opacity={"0.8"}>{user.gemstones && user.gemstones.length > 0 ? user.gemstones.map((item:any) => item.name).join(", ") : "-"}</Text>
                        </Td>
                    </tr>
                    {/* <tr>
                        <Td minWidth="103px">
                            <Text weight={"bold"}>Note:</Text>
                        </Td>
                        <Td minWidth="357px">
                            <Text opacity={"0.8"}>Requires prepayment</Text>
                        </Td>
                    </tr> */}
                </Tbody>
            </table>
            <Settings setEdit={setEdit} status={user.status} settings={user.restrictions} user_block={user.restrictions.includes(6)} id={user.mobile} />
        </>
    );
}



const LabelContainer = styled.label`
    width:75px;
    text-align:center;
    cursor:pointer;
`;
const LabelInner = styled.label`
    display: inline-block;
    position: relative;
    cursor: pointer;
    color: #FFFFFF;
    text-align: center;
    margin-bottom: 0;
    font-weight: 500;
    font-size: 20px;
    line-height:75px;
    border: none;
    width: 75px;
    height: 75px;
    background: #1B1D28;
    border-radius: 75px;
    margin-bottom:7px;
    & > img {
        margin-top:-2.5px;
    }
`;

const LabelText = styled.span`
    font-style: Semibold;
    font-weight: 600;
    font-size: 14px;
    color: #000000;
    line-height:0px;
`;

const InputLabel = styled.span`
    font-style: regular;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #1B1D28;
`;



const Label: React.FC<any> = ({children, htmlFor, image}:{children: React.ReactNode, htmlFor: string, image: boolean}) => {
    return (
        <LabelContainer htmlFor={htmlFor}>
            <LabelInner htmlFor={htmlFor}>
                {children}
            </LabelInner>
            <LabelText >Change</LabelText>
        </LabelContainer>
    );
}

const Button = styled.button<{background?:string, float?: string}>`
    width:114px;
    height:38px;
    background: ${({background}) => background ? background : "#B9BCCA"};
    border-radius: 21px;
    display:flex;
    justify-content:center;
    align-items:center;
    font-size: 16px;
    color: #FFFFFF;
    float:${({float}) => float ? float : "left"};
    margin-top:20px;
    cursor:pointer;
    padding:0;
    border:none;
`;


const UserEdit: React.FC<any> = ({user, setEdit}:{user:IUser, setEdit:() => void}) => {
    const [gems, setGems] = useState<{id: number, name:string, bool:boolean}[] | null>(null);
    const dispatch = useDispatch();
    const InputField = ({name, field}:{name:string, field:string}) => {
        return (
            <div style={{marginBottom:"15px"}}>
                <InputLabel>{name}</InputLabel>
                <Field
                    name={field}
                    component={Input}
                    background="#F2F4F8"
                    width="100%"
                />
            </div>
        )
    }

    useEffect(() => {
        async function loadData() {
            try{
                const response = await API.get(`/gems/list/`);
                let newGems = response.data.map((item : IGemstone) => {return {id:item.id,name:item.name,bool:user.gemstones.findIndex((itemFind: any) => item.id === itemFind.id) !== -1 ? true : false}});
                setGems(newGems);
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
    },[]);
    return (
        <Formik
            initialValues={{
                id: user.mobile,
                _image: '',
                image: user.avatar_image || '',
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                company_name: user.company_name || '',
                number: user.number || '',
                gemstones: gems
                // gemstones: {
                //     opal:user.gemstones.includes('Opal'),
                //     saphire:user.gemstones.includes('Saphire'),
                //     moon:user.gemstones.includes('Moon'),
                //     garnet:user.gemstones.includes('Garnet'),
                // }
            }}
            enableReinitialize={true}
            onSubmit={(values : IUserForm) => {
                const myForm = new FormData();
                myForm.append('id',values.id.toString());
                myForm.append('first_name',values.first_name);
                myForm.append('last_name',values.last_name);
                myForm.append('company_name',values.company_name);
                myForm.append('number','+' + values.number.match(/\d/g)?.join(''));
                let gemst = values.gemstones!.filter((item) => item.bool).map((item) => item.id).join(',');
                if(gemst) myForm.append('gemstones', gemst);
                if(typeof values.image !== 'string'){
                    myForm.append('avatar_image',values.image);
                }
                dispatch(updateUserDataAction(myForm, values));
                setEdit();
            }}
        >
            { ({dirty, values, setFieldValue, submitForm}) =>
                 <Form encType="multipart/form-data">
                    <Field
                        name="_image"
                        myName="image"
                        currentValue={values.image}
                        loadedImageStyle={{width: '75px', height: '75px', borderRadius: '75px'}}
                        label="Icon"
                        labelComponent={Label}
                        component={FileInput}
                    />
                    <div className={"d-flex flex-row w-100"} style={{marginTop:"23px", paddingLeft:"3px"}}>
                        <div className={"flex-grow-1"} style={{paddingRight:"6px"}}>
                            <InputField name={"First Name"} field={"first_name"}/>
                            <InputField name={"Company"} field={"company_name"}/>
                            {values.gemstones === null ? 
                            <LoaderIcon width={"50px"} height={"50px"} /> :
                            <Field
                                name={`gemstones`}
                                label={"Gems"}
                                component={SelectWithCheckboxes}
                                gems={gems}
                                change={(name: string) => {
                                    const index = gems!.findIndex((item) => name === item.name);
                                    if(index !== -1){
                                        gems![index] = {...gems![index], bool: !gems![index].bool};
                                        setFieldValue('gemstones', [...gems!,{name:'',bool:false}]);
                                    }
                                }}
                                background="#F2F4F8"
                                width="100%"
                                marginBottom="15px"
                            />}
                            <Button type="button" onClick={() => setEdit()}>Cancel</Button>
                        </div>
                        <div className={"flex-grow-1"} style={{paddingLeft:"6px"}}>
                            <InputField name={"Last Name"} field={"last_name"}/>
                            <Field name="number" background="#F2F4F8" value={values.number} mask="+9 (999) 999-99-99" width={"100%"} label="Phone" component={InputWithMaskUser}/>
                            {dirty && <Button type="submit" disabled={!dirty} float={"right"} background={"#1B1D28"}>Save</Button>}
                        </div>
                    </div>
                </Form>
            }
        </Formik>
    );
}

interface IComplaint {
    id:number,
    message: string,
    created_on:string,
    from_user: number,
    to_user: number,
    from_user_profile: IUser,
    confirmed: boolean
}


const Profile: React.FC<any> = ({user}:{user:IUser}) => {
    const [edit, setEdit] = useState(false);
    const [complaints, setComplaints] = useState<IComplaint[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function loadData() {
            try{
                setLoading(true);
                const response = await API.get(`/admin/user/${user.mobile}/complaints/`);
                console.log(response);
                setComplaints(response.data);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        }
        loadData();
    },[]);

    const changeComplaint = (bool:boolean, id: number) => {
        const index = complaints.findIndex((item) => item.id === id);
        if(index !== -1){
            complaints[index].confirmed = bool;
            complaints[index] = {...complaints[index]};
            setComplaints([...complaints]);
        }
    }
    return (
        <Container>
            <UserInner>
                {edit ?
                <UserEdit user={user} setEdit={() => setEdit(false)}/> :
                <UserNotEdit user={user} setEdit={() => setEdit(true)} />}
            </UserInner>
            {loading ?
            <LoaderIcon width={"50px"} height={"50px"} /> :
            complaints.map((item) => <Complaint key={item.id} changeComplaint={changeComplaint} id={item.id} confirmed={item.confirmed} message={item.message} date={new Date(item.created_on)} first_name={item.from_user_profile.first_name} last_name={item.from_user_profile.last_name} />)}
        </Container>
    )
}

export default Profile;