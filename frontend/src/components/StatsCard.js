import axios from 'axios';
import React, { useEffect } from 'react';

const StatItem = ({ title, value }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-lg"> {title}</div>
            <div className="text-3xl font-bold"> {value} </div>
        </div>
    );
};

const StatsCard = () => {
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem('user'))._id);
        axios
            .post('http://localhost:8080/api/fasting/stats', {
                userId: JSON.parse(localStorage.getItem('user'))._id,
            })
            .then(({ data }) => {
                console.log(data);
            });
    }, []);

    return (
        <div className="w-full bg-white h-auto p-10 shadow-md rounded-3xl flex flex-col dark:bg-gray-800">
            <div className="dark:text-white flex justify-around">
                <StatItem title="Total Fast" value={14} />
                <StatItem title="7-Fast Avg." value="16h" />
                <StatItem title="Logest Fast" value="18.4h" />
                <StatItem title="Longest Streak" value={14} />
                <StatItem title="Current Streak" value={14} />
            </div>
        </div>
    );
};

export default StatsCard;
