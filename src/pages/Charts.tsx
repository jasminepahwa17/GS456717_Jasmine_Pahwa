import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from "recharts";
import { useMemo, useState } from "react";
import useRowData from "../hooks/useRowData";



interface ChartData {
  week: string;
  gmDollars: number;
  gmPercent: number;
}

const Charts = () => {
  const [rowData] = useRowData();
  const [selectedStore, setSelectedStore] = useState<string>("");

  const storeNames = useMemo(() => {
    return Array.from(new Set(rowData.map(row => row.storeName)));
  }, [rowData]);

  const filteredRowData = useMemo(() => {
    return selectedStore ? rowData.filter(row => row.storeName === selectedStore) : rowData;
  }, [rowData, selectedStore]);

  const chartData: ChartData[] = useMemo(() => {
    const dataMap: Record<string, ChartData> = {};
  
    filteredRowData.forEach((row) => {
      Object.keys(row)?.forEach((key) => {
        if (key.startsWith("gmDollars_") || key.startsWith("gmPercent_")) {
          const week = key.split("_")[1];
  
          if (!dataMap[week]) {
            dataMap[week] = { week, gmDollars: 0, gmPercent: 0 };
          }
  
          if (key.startsWith("gmDollars_")) {
            dataMap[week].gmDollars = parseFloat(row[key].replace("$", "")) || 0;
          }
          if (key.startsWith("gmPercent_")) {
            dataMap[week].gmPercent = parseFloat(row[key].replace("%", "")) || 0;
          }
        }
      });
    });
  
    return Object.values(dataMap);
  }, [filteredRowData]);
  


  return (
    <>
     <div>
    <label>Select Store: </label>
    <select value={selectedStore} onChange={(e) => setSelectedStore(e.target.value)}>
      <option value="">All Stores</option>
      {storeNames.map((store) => (
        <option key={store} value={store}>
          {store}
        </option>
      ))}
    </select>
  </div>

  <ResponsiveContainer width="100%" height={400}>
      <ComposedChart data={chartData}>
        <CartesianGrid  />
        <XAxis dataKey="week" />
        <YAxis yAxisId="left" label={{ value: "GM Dollars ($)", angle: -90, position: "insideLeft" }} />
        <YAxis yAxisId="right" orientation="right" label={{ value: "GM %", angle: -90, position: "insideRight" }} />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="gmDollars" fill="#8884d8" name="GM Dollars" />
        <Line yAxisId="right" dataKey="gmPercent" stroke="#ff7300" name="GM %" dot={{ r: 3 }} />
      </ComposedChart>
    </ResponsiveContainer>
    </>

  );
};

export default Charts;

