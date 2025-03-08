import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../store/store'

interface RowData {
    storeName: string;
    skuName: string;
    months: Record<string, unknown>;
    [key: string]: any;
  }

const useRowData = () => {

      const storeData = useSelector((state: RootState) => state.stores.data)
      const skuData = useSelector((state: RootState) => state.skuCSV.data)
      const calenderData = useSelector((state: RootState) => state.calenderCSV.data)
      const planningData = useSelector((state: RootState) => state.planningCSV.data)
    
      const planningMap = useMemo(() => {
        const map = new Map();
    
        planningData.forEach((p) => {
          const key = `${p.Store}_${p.SKU}_${p.Week}`;
          map.set(key, p["Sales Units"]);
        });
    
    
        return map;
      }, [planningData]);
    
    
    
    
      const rowsData: RowData[] = useMemo(() => {
        return storeData.flatMap((store) =>
          skuData.map((sku) => {
            const row: any = {
              storeName: store.Label,
              skuName: sku.Label,
              months: {},
            };
    
            calenderData.forEach((week) => {
              const monthLabel = week["Month Label"];
    
              if (!row.months[monthLabel]) {
                row.months[monthLabel] = {};
              }
    
    
              const key = `${store.ID}_${sku.ID}_${week.Week}`;
              const salesUnits = planningMap.get(key) ?? 0;
              const salesDollars = salesUnits * (sku.Price ?? 0);
              const gmDollars = salesDollars - salesUnits * (sku.Cost ?? 0);
              const gmPercent = salesDollars > 0 ? gmDollars / salesDollars : 0;
    
              row[`salesUnits_${week.Week}`] = salesUnits;
              row[`salesDollars_${week.Week}`] = `$ ${salesDollars.toFixed(2)}`;
              row[`gmDollars_${week.Week}`] = `$ ${gmDollars.toFixed(2)}`;
              row[`gmPercent_${week.Week}`] = `${gmPercent.toFixed(2)}`;
    
            });
    
            return row;
          })
        );
      }, [storeData, skuData, calenderData, planningData]);
    
      return [rowsData]
}

export default useRowData
