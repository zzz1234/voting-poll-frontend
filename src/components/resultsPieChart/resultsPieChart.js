import { PieChart, Pie, Tooltip } from 'recharts';
import React from 'react';

import { getGameResults } from '../../services/gameService';

export default function ResultsPieChart({game_id}) {
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
        <PieChart width={400} height={400}>
            <Pie dataKey="value" isAnimationActive={false} data={data} cx={200} cy={200} outerRadius={80} fill="#8884d8" label />
            <Tooltip />
        </PieChart>
    );
}
