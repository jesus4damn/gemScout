export interface INewUser {
    avatar_image: string,
    birthday: string,
    city: string,
    company_name: string,
    country: string,
    email: string,
    first_name: string,
    is_public: boolean,
    last_name: string,
    mobile_id: number
    office_address: string,
    passport_image: string,
    stage: number,
    number: string
}

export interface IUser {
    applications: number,
    avatar_image: string,
    birthday: string,
    city: string,
    company_name: string,
    country: string,
    email: string,
    first_name: string,
    gemstones: any,
    is_public: boolean,
    last_name: string,
    mobile: number,
    number: string,
    office_address: string,
    passport_image: string,
    stage: number,
    status: string | null | number,
    suggestions: number,
    reports: number,
    restrictions:number[],
    messages: 0
}

export interface IRequest {
    id:number,
    suggestions: number[],
    user: number,
    color: string,
    weight_from: number,
    weight_to: number,
    dimension_from: number,
    dimension_to: number,
    origin: string,
    quantity: number,
    clarity: string,
    visible: boolean,
    price_from: number,
    price_to:number,
    price_in_carats_from: number,
    price_in_carats_to: number,
    active_until: string,
    created_on: string,
    buyer_description: string,
    city: string,
    gemstone: {
        id: number,
        name: string,
        image: string,
        is_important: boolean,
        features: {
            id:number,
            meanings:string[],
            field:number,
            type:number
        }[]
    },
    shapes: {
        id: number,
        name: string,
        image: string
    }[],
    photos:{
        id?:number,
        photo: any
    }[],
    profile:{
        id:number,
        first_name: string,
        last_name: string
    },
    treatment: string,
    inclusions: string
};

export interface IOffer {
    id:number,
    active_until:string,
    application:IRequest,
    buyer_description: string | null,
    certificate: string | null,
    city: string | null,
    clarity: string,
    color: string | null,
    created_on: string,
    dimension: number | null,
    message:string,
    origin: string | null,
    photos:{
        id:number,
        photo: string
    }[],
    price: number,
    price_in_carats: number | null,
    quantity: number | null,
    shapes: {
        id: number,
        name: string,
        image: string
    }[],
    user:number,
    visible: boolean,
    weigth: number,
    inclusions:string,
    treatment: string,
    weight?: string,
    is_mine?: boolean,
    name?:string,
    gemstone?:{
        name:string
    }
};

export interface IUserForm {
    readonly id: number,
    image: any,
    _image: string,
    first_name: string,
    last_name: string,
    company_name: string,
    number: string,
    gemstones?:{id:number,name:string,bool:boolean}[] | null
}

export interface IFilterData {
    application_from?: string,
    application_to?: string,
    offer_from?: string,
    offer_to?: string,
    messages_from?: string,
    messages_to?: string,
    name?: string,
    id?:string
}

export interface IShape {
    readonly id: number,
    name: string,
    image: string,
    _image?: string
}

interface IFeature {
    readonly id: number,
    meanings: string[],
    field: number,
    type: number
}

export interface IGemstone {
    readonly id: number,
    name: string,
    image: string
    _image?: string,
    is_important: boolean,
    features: IFeature[],
    types: string[],
    meanings: string[]
}

export interface IFilterForm {
    name: string,
    application_from: string,
    application_to: string,
    offer_from: string,
    offer_to: string,
    messages_from: string,
    messages_to: string
}

export interface IChats {
    id: number,
    uri: string,
    members: {
        id: number,
        create_date: string,
        update_date: string,
        chat_session: number,
        user: number,
        profile?:{
            first_name: string,
            last_name: string,
            avatar_image: string
        }
    }[],
    receiver_id: number,
    last_message: {
        id: number,
        create_date: string,
        update_date: string,
        message: string,
        file: string | null,
        user: number,
        chat_session: string,
        is_mine: boolean,
        is_read: boolean
    },
    is_not_read: number
}

export interface IMessage {
    chat_session: string,
    create_date: string,
    id: number,
    message: string,
    update_date: string,
    user: number,
    file: string | null,
    is_read: boolean,
    is_mine: boolean,
    suggestion: IOffer | null
}