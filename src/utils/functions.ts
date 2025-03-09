export const createDeleteHandler = (setRowData: React.Dispatch<React.SetStateAction<any[]>>) => {
    return (params: any) => {
        setRowData((prevData) => prevData.filter((row) => row.ID !== params.data.ID));
    };
};


export function showPassword(id: any) {
    if (id.type === "password") {
      id.type = "text";
    } else {
      id.type = "password";
    }
  }