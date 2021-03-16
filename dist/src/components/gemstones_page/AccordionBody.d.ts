/// <reference types="react" />
import { IAccordionForm } from "./Gemstone";
declare const AccordionBody: ({ values, dirty, setFieldValue, deleteGemstome }: {
    values: IAccordionForm;
    dirty: boolean;
    deleteGemstome: (id: number) => void;
    setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void;
}) => JSX.Element;
export default AccordionBody;
