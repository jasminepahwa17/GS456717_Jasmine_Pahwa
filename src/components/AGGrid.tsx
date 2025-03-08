import { useEffect, useMemo } from "react";
import { AgGridReact, } from "ag-grid-react";
import { AllCommunityModule, ModuleRegistry, ColDef, NumberEditorModule, TextEditorModule, ClientSideRowModelModule, ValidationModule, RowClassParams } from "ag-grid-community";


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
        getRowStyle: (params: RowClassParams) => {
            const rowId = parseInt(params.node.id ?? "0", 10); // Convert ID to a number safely
            return {
              backgroundColor: rowId % 2 === 0 ? "#ffffff" : "#f8f9fa", // Alternating colors
            };
          }

    };


    const defaultColDef = useMemo<ColDef>(() => {
        return {
            editable: true,
            flex: 1,
            minWidth: 100,
            resizable: true,
            headerStyle: { color: 'gray', justifyContent: "center" },

        };
    }, []);

    return (<div className="ag-theme-quartz h-[calc(100%-6%)]" style={{ width: "100%" }}>
        {data.length !== 0 &&
            <AgGridReact rowData={rowData} columnDefs={colDefs}
                gridOptions={gridOptions}
               
                rowBuffer={10} 
                pagination={true} 
                paginationPageSize={50} 
                defaultColDef={defaultColDef}
                
                />
        }
    </div>);
}

export default AGGrid

