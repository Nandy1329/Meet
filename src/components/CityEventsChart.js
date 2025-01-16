import React, { useEffect, useCallback } from 'react';
import { ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const CityEventsChart = ({ events, allLocations }) => {
	const getData = useCallback(() => {
		const data = allLocations.map((location) => {
			const count = events.filter((event) => event.location === location).length;
			const city = location.split(/, | - /)[0];
			return { city, count };
		});
		return data;
	}, [events, allLocations]);

	useEffect(() => {
		getData();
	}, [getData]);

	return (
		<ResponsiveContainer width="99%" height={400}>
			<ScatterChart
				margin={{
					top: 20,
					right: 20,
					bottom: 60,
					left: 20,
				}}
			>
				<CartesianGrid />
				<XAxis
					type="category"
					dataKey="city"
					name="City"
					angle={60}
					interval={0}
					tick={{ dx: 20, dy: 40, fontSize: 14 }}
				/>
				<YAxis type="number" dataKey="count" name="Number of events" />
				<Tooltip cursor={{ strokeDasharray: '3 3' }} />
				<Scatter name="Locations" data={getData()} fill="#9932CC" />
			</ScatterChart>
		</ResponsiveContainer>
	);
};

export default CityEventsChart;