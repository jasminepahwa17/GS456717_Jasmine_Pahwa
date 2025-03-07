import { useEffect, useMemo } from "react";
import { AgGridReact, } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry,ColDef, NumberEditorModule, TextEditorModule, ClientSideRowModelModule, ValidationModule } from "ag-grid-community";


interface AGGridProps {
    data: any[];
    rowData: any[];
    setRowData: React.Dispatch<React.SetStateAction<any[]>>;
    colDefs: ColDef[];
}
ModuleRegistry.registerModules([AllCommunityModule, NumberEditorModule,
    TextEditorModule,
    ClientSideRowModelModule,
    ValidationModule]);

const AGGrid: React.FC<AGGridProps> = ({ data, rowData, setRowData, colDefs, }) => {
    useEffect(() => {
        if (data && data.length > 0) {
            setRowData(data);
        }
    }, []);

    const gridOptions = {
        rowDragManaged: true, 
        rowDragEntireRow: true, 
        animateRows: true,
    };

    const defaultColDef = useMemo<ColDef>(() => {
        return {
          editable: true,
          flex: 1, 
          minWidth: 100,
          resizable: true,
        };
      }, []);

    console.log(rowData);
    



    return (<div className="ag-theme-quartz h-[calc(100%-6%)]" style={{ width: "100%" }}>
        {data.length !== 0 &&
            <AgGridReact rowData={rowData} columnDefs={colDefs}
                gridOptions={gridOptions}
                defaultColDef={defaultColDef} />
        }
    </div>);
}

export default AGGrid

