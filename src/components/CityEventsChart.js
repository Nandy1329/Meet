// src/components/CityEventsChart.js
import { useState, useEffect, useCallback } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CityEventsChart = ({ allLocations, events }) => {
  const [data, setData] = useState([]);

  // Memoize the getData function to avoid recreating it on each render
  const getData = useCallback(() => {
    const data = allLocations.map((location) => {
      const count = events.filter((event) => event.location === location).length;
      const city = location.split((/, | - /))[0]
      return { city, count };
    });
    return data;
  }, [allLocations, events]);

  useEffect(() => {
    setData(getData());
  }, [getData]); // Correct dependency array

  return (
    <div className="scatter-chart">
    <ResponsiveContainer width="99%" height={400}>
      <ScatterChart
        margin={{
          top: 60,
          right: 20,
          bottom: 60,
        }}
      >
        <CartesianGrid />
        <XAxis
          type="category" dataKey="city" name="City"
          angle={60} interval={0} tick={{ dx: 20, dy: 40, fontSize: 14 }}
        />
        <YAxis type="number" dataKey="count" name="Number of events" />
        <Tooltip cursor={{ strokeDasharray: '3 3' }} />
        <Scatter name="Events" data={data} fill="#8884d8" />
      </ScatterChart>
    </ResponsiveContainer>
    </div>
  );
};

export default CityEventsChart;