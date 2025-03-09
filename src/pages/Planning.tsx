
import AGGrid from "../components/AGGrid"
import { CellClassParams, ColDef, ValueFormatterParams } from "ag-grid-community"
import { useState } from "react"
import useRowData from "../hooks/useRowData";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

type RowData = {
  storeId: string;
  storeLabel: string;
  skuId: string;
  skuLabel: string;
  price: number;
  cost: number;
  [key: string]: string | number;
};




const Planning = () => {
  const [rowData, setRowData] = useState<any[]>([]);
  const [rowsData] = useRowData();
  const calenderData = useSelector((state: RootState) => state.calenderCSV.data)



  const weekColumns: ColDef<RowData>[] = Object.values(
    calenderData.reduce((acc, week) => {
      const monthLabel = week["Month Label"];

      if (!acc[monthLabel]) {
        acc[monthLabel] = {
          headerName: monthLabel,
          headerStyle: { color: 'gray' },
          editable: false,
          children: [],
        };
      }
      acc[monthLabel].children.push({
        headerName: week.Week,
        headerStyle: { color: 'gray' },
        children: [
          {
            field: `salesUnits_${week.Week}`,
            headerName: "Sales Units",
            editable: true,
            flex: 1,
            minWidth: 150,
            cellStyle: { textAlign: "right" },

          },
          {
            field: `salesDollars_${week.Week}`,
            headerName: "Sales Dollars",
            flex: 1,
            editable: false,
            minWidth: 150,
            cellStyle: { textAlign: "right" },
          },
          {
            field: `gmDollars_${week.Week}`,
            headerName: "GM Dollars",
            flex: 1,
            editable: false,
            minWidth: 150,
            cellStyle: { textAlign: "right" },
          },
          {
            field: `gmPercent_${week.Week}`,
            headerName: "GM Percent",
            flex: 1,
            editable: false,
            minWidth: 150,
            cellStyle: (params: CellClassParams) => {
              const value = (params.value as number) ?? 0;

              let backgroundColor = "white";
              if (value >= 0.4) backgroundColor = "#7ac27a";
              else if (value >= 0.1) backgroundColor = "#ffde6b";
              else if (value > 0.05) backgroundColor = "#ffa366";
              else backgroundColor = "#ff6666";

              return {
                textAlign: "right",
                backgroundColor,
              };
            },
            valueFormatter: (params: ValueFormatterParams) =>
              `${((params.value as number) * 100).toFixed(2)}%`,
          }
        ],
      });

      return acc;
    }, {} as Record<string, { headerName: string; children: ColDef<RowData>[] }>)
  );

  const columnDefs: ColDef[] = [
    { field: "storeName", headerName: "Store", rowGroup: true, minWidth: 250, headerStyle: { color: 'gray' }, },
    { field: "skuName", headerName: "SKU", rowGroup: true, minWidth: 250, cellStyle: { borderRight: "2px solid #ccc" }, headerStyle: { color: 'gray' }, },
    ...weekColumns,
  ];


  return (
    <div className="h-full">
      <AGGrid data={rowsData} setRowData={setRowData} rowData={rowData} colDefs={columnDefs}  />

    </div>
  )
}

export default Planning