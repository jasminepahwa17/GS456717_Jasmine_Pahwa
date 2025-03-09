import { render, screen } from "@testing-library/react";
import AGGrid from "../AGGrid";
import { ColDef } from "ag-grid-community";
import { describe, it, expect } from "vitest";
import "@testing-library/jest-dom";



describe("AGGrid Component", () => {
  const mockData = [
    { ID: 1, Label: "Store A", City: "New York", State: "NY" },
    { ID: 2, Label: "Store B", City: "Los Angeles", State: "CA" },
  ];

  const mockSetRowData = jest.fn();
  
  const mockColDefs: ColDef[] = [
    { field: "Label", headerName: "Store" },
    { field: "City", headerName: "City" },
    { field: "State", headerName: "State" },
  ];

  it("renders AGGrid and displays data", () => {
    render(<AGGrid data={mockData} rowData={mockData} setRowData={mockSetRowData} colDefs={mockColDefs} />);

    expect(screen.getByText("Store A")).toBeInTheDocument();
    expect(screen.getByText("New York")).toBeInTheDocument();
    expect(screen.getByText("Store B")).toBeInTheDocument();
    expect(screen.getByText("Los Angeles")).toBeInTheDocument();
  });
});

