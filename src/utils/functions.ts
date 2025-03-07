export const createDeleteHandler = (setRowData: React.Dispatch<React.SetStateAction<any[]>>) => {
    return (params: any) => {
        setRowData((prevData) => prevData.filter((row) => row.ID !== params.data.ID));
    };
};
