import React from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";

interface CsvUploaderProps {
    sheetNo: number;
    setCSVData: any
}
const CsvUploader: React.FC<CsvUploaderProps> = ({sheetNo, setCSVData}) => {
    console.log(sheetNo);
    
    const dispatch = useDispatch();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.readAsArrayBuffer(file);

        reader.onload = (e) => {
            const buffer = e.target?.result;
            if (!buffer) return;
            const workbook = XLSX.read(buffer, { type: "array" });
            const sheetName = workbook.SheetNames[sheetNo];
            const sheet = workbook.Sheets[sheetName];

            const jsonData = XLSX.utils.sheet_to_json(sheet);
            //   // Dispatch data to Redux store
            dispatch(setCSVData(jsonData));
        }
    };

    return (
        <div className="p-4 border rounded">
            <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
        </div>
    );
}

export default CsvUploader
