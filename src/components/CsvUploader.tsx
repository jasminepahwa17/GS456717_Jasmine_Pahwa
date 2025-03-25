import React from "react";
import { useDispatch } from "react-redux";
import * as XLSX from "xlsx";
import { setCSVStoreData } from "../store/slices/storesCSV";
import { setCSVSKUData } from "../store/slices/skuCSV";
import { setCSVCalenderData } from "../store/slices/calenderCSV"
import { setCSVPlanningData } from "../store/slices/planningCSV"
import DownloadFileButton from "./DownloadFileButton";

const CsvUploader = () => {

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

            const sheetActions = [
                setCSVStoreData,
                setCSVSKUData,
                setCSVCalenderData,
                setCSVPlanningData,
            ];

            workbook.SheetNames.forEach((sheetName, index) => {
                const sheet = workbook.Sheets[sheetName];
                const jsonData = XLSX.utils.sheet_to_json(sheet);
                dispatch(sheetActions[index](jsonData));
            });
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <div className="p-4 border rounded">
                <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />
            </div>
            <DownloadFileButton />
        </div>

    );
}

export default CsvUploader
