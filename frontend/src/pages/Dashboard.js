import React from 'react';
import RecentCard from '../components/RecentsCard';
import StatsCard from '../components/StatsCard';
import TimerCard from '../components/TimerCard';
import TotalFastingCard from '../components/TotalFastingCard';

function Dashboard() {
    return (
        <div className="w-full space-y-3">
            <div className="w-full flex space-x-8">
                <TimerCard />
                <RecentCard />
            </div>
            <div className="w-full flex space-x-8">
                <StatsCard />
            </div>
            <div className="w-full flex space-x-8">
                <TotalFastingCard />
            </div>
        </div>
    );
}

export default Dashboard;
