export const createFormData = (values: any) => {
    const form = new FormData();

    Object.entries(values).forEach(([key, value]) => {
        console.log(key, value);
        form.append(key, value as any);
    })

    return form;
}