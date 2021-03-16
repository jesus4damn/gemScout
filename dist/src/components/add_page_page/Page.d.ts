/// <reference types="react" />
declare const Page: ({ name, text, setDeletePage, id }: {
    name: string;
    text: string;
    setDeletePage: (id: number) => void;
    id: number;
}) => JSX.Element;
export default Page;
