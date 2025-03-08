import { ComposedChart, Bar, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
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
    const dataMap: Record<string, { week: string; totalGMDollars: number; totalSalesDollars: number }> = {};
  
    filteredRowData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key.startsWith("gmDollars_") || key.startsWith("salesDollars_")) {
          const week = key.split("_")[1];
  
          if (!dataMap[week]) {
            dataMap[week] = { week, totalGMDollars: 0, totalSalesDollars: 0 };
          }
  
          if (key.startsWith("gmDollars_")) {
            dataMap[week].totalGMDollars += parseFloat(row[key].replace("$", "")) || 0;
          }
          if (key.startsWith("salesDollars_")) {
            dataMap[week].totalSalesDollars += parseFloat(row[key].replace("$", "")) || 0;
          }
        }
      });
    });
  
    return Object.values(dataMap).map(({ week, totalGMDollars, totalSalesDollars }) => ({
      week,
      gmDollars: totalGMDollars,
      gmPercent: totalSalesDollars > 0 ? (totalGMDollars / totalSalesDollars) * 100 : 0,
    }));
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

  <ResponsiveContainer width="80%" style={{  padding: "5px",  background: "radial-gradient(circle, #595959 1%, #222 80%)",  border: "2px solid black"}} height={500}>
      <ComposedChart data={chartData}>
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

