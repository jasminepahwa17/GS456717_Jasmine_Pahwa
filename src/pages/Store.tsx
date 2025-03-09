import { useSelector } from "react-redux"
import CsvUploader from "../components/CsvUploader"
import { RootState } from "../store/store"
import AGGrid from "../components/AGGrid"
import { useState } from "react";
import bin from "../assets/bin.svg"
import { createDeleteHandler } from "../utils/functions";
import { ColDef } from "ag-grid-community";


const Store = () => {
  const storeData = useSelector((state: RootState) => state.stores.data)
  const [rowData, setRowData] = useState<any[]>([]);
  const handleDelete = createDeleteHandler(setRowData)

  const colDefs: ColDef[] = [
    {
      field: "actions",
      headerName: "",
      cellRenderer: (params: any) => (
        <button
          onClick={() => handleDelete(params)}
          style={{
            backgroundColor: "transparent",
            border: "none",
            cursor: "pointer",
          }}
        >
          <img src={bin} className="w-5" />
        </button>
      ),
      maxWidth: 100
    },
    { field: "Seq No.", headerName: "S.No", valueGetter: (params) => params.data['Seq No.'], rowDrag: true, maxWidth: 100 },
    { field: "Label", headerName: "Store", width: 100, cellStyle: { borderRight: "2px solid #ccc"  }, editable: true, },
    { field: "City", width: 100, editable: true },
    { field: "State", width: 100 , editable:true},

  ];

  const handleAddRow = () => {
    const newRow = {
      ID: `ST${Math.floor(Math.random() * 1000)}`, 
      "Seq No.": rowData.length + 1, 
      Label: "",
      City: "",
      State: "",
    };

    setRowData((prevData) => [...prevData, newRow]); 
  };

  return (
    <div className="h-full">
      {!storeData || storeData.length === 0 ?
        <CsvUploader /> : <>
          <AGGrid  data={storeData} setRowData={setRowData} rowData={rowData} colDefs={colDefs} />
          <button onClick={handleAddRow} className="text-black px-6 py-2 shadow-2xl my-2 " style={{   backgroundColor: "#ffab91"  }}>
             New Store
          </button></>}
    </div>
  )
}

export default Store
