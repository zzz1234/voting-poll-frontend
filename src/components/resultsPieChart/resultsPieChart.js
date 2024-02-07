import { PieChart, Pie, Tooltip, Cell } from 'recharts';
import React from 'react';

import { getGameResults, getGameSummary } from '../../services/gameService';
import './resultsPieChart.css';

export default function ResultsPieChart({game_id}) {
    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042']; // Add more colors as needed
    const [data, setData] = React.useState([]);
    const [summary, setSummay] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

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

    const getGameSummaryOnClick = () => {
        setLoading(true);
        getGameSummary(game_id)
        .then(data => {
            console.log('Success:', data);
            setSummay(data);
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
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
            <div>
                <button onClick={getGameSummaryOnClick} disabled={loading}> 
                    Generate Summary 
                </button>
                {loading && <div className="loader"></div>}
                {summary && <div dangerouslySetInnerHTML={{ __html: summary.summary }} />}
            </div>
        </div>
    );
}
