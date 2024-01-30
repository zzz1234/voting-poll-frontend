import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import React from 'react';

import { getGameResults } from '../../services/gameService';
import './resultsPieChart.css';

export default function ResultsPieChart({game_id}) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Add more colors as needed
    const [data, setData] = React.useState([]);
    React.useEffect(() => {
        getGameResults(game_id)
        .then(data => {
            console.log('Success:', data);
            setData(data);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }, [game_id]);
    console.log(data);
    return (
        <div className='pie-chart-results'>
        <PieChart width={400} height={400}>
            <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} label >
            {
                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
            }
            </Pie>
            <Tooltip />
        </PieChart>
        </div>
    );
}
