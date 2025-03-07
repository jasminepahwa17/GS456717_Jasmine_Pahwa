import { useSelector } from "react-redux"
import CsvUploader from "../components/CsvUploader"
import { RootState } from "../store/store"
import AGGrid from "../components/AGGrid"
import { setCSVData } from "../store/slices/skuCSV"
import { useState } from "react"
import { createDeleteHandler } from "../utils/functions"
import { ColDef } from "ag-grid-community"
import bin from "../assets/bin.svg"


const SKU = () => {
  const skuData = useSelector((state: RootState) => state.skuCSV.data)
  const [rowData, setRowData] = useState<any[]>([]);
  const handleDelete = createDeleteHandler(setRowData)

  const colDefs: ColDef[] = [
    {
      field: "actions",
      headerName: "",
      cellRenderer: (params: any) => (
        <button onClick={() => handleDelete(params)} style={{ backgroundColor: "transparent", border: "none", cursor: "pointer" }}>
          <img src={bin} className="w-5" />
        </button>
      ),
      maxWidth: 100
    },
    { field: "Label", headerName: "SKU", width: 50, cellStyle: { borderRight: "2px solid #ccc" } },
    { field: "Price", headerName: "Price", valueFormatter: params => `$${params.value?.toLocaleString() || 0}`},
    { field: "Cost", valueFormatter: params => `$${params.value?.toLocaleString() || 0}` },
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
      {!skuData || skuData.length === 0 ?
        <CsvUploader sheetNo={1} setCSVData={setCSVData} /> : <>

          <AGGrid data={skuData} setRowData={setRowData} rowData={rowData} colDefs={colDefs} />
          <button onClick={handleAddRow} className="text-black px-6 py-2 shadow-2xl my-2 " style={{   backgroundColor: "#ffab91"  }}>
            New SKU
          </button></>}
    </div>
  )
}

export default SKU
