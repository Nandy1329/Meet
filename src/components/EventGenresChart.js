// src/components/EventGenresChart.js

import { useState, useEffect } from 'react';
import {
	PieChart,
	Pie,
	Sector,
	Legend,
	Cell,
	ResponsiveContainer,
} from 'recharts';

const EventGenresChart = ({ events }) => {
	const [data, setData] = useState([]);
	const genres = ['React', 'JavaScript', 'Node', 'jQuery', 'Angular'];

	useEffect(() => {
		setData(getData());
	}, [`${events}`]);

	const getData = () => {
		const data = genres.map((genre) => {
			const filteredEvents = events.filter((event) =>
				event.summary.includes(genre)
			);
			return {
				name: genre,
				value: filteredEvents.length,
			};
		});
		return data;
	};

	const renderCustomizedLabel = ({
		cx,
		cy,
		midAngle,
		outerRadius,
		innerRadius,
		percent,
		index,
	}) => {
		const RADIAN = Math.PI / 180;
		const radius = innerRadius + (outerRadius - innerRadius) * 0.7;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
		return percent ? (
			<text
				x={x}
				y={y}
				fill="#fff"
				textAnchor={x > cx ? 'start' : 'end'}
				dominantBaseline="central"
			>
				{`${(percent * 100).toFixed(0)}%`}
			</text>
		) : null;
	};

	const colors = ['#5F9EA0', '#66CCCC', '#9B59B6', '#DA70D6', '#3e40d6'];

	return (
		<ResponsiveContainer width="99%" height={400}>
			<PieChart
				margin={{
					top: 40,
					bottom: 80,
				}}
			>
				<Pie
					data={data}
					dataKey="value"
					fill="#8884d8"
					labelLine={false}
					label={renderCustomizedLabel}
					outerRadius={130}
				>
					{data.map((entry, index) => (
						<Cell key={`cell-${index}`} fill={colors[index]} />
					))}
				</Pie>
				<Legend
					align="center"
					verticalAlign="bottom"
					layout="horizontal"
					height={2}
				/>
			</PieChart>
		</ResponsiveContainer>
	);
};

export default EventGenresChart;