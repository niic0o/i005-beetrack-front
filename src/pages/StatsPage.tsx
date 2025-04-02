import React from 'react';

interface StatsPageProps {
  title?: string;
}

const StatsPage: React.FC<StatsPageProps> = ({ title = 'Statistics' }) => {
  return (
    <div className="stats-page">
      <h1>{title}</h1>
      <div className="stats-content">
        <p>Welcome to the statistics page</p>
      </div>
    </div>
  );
};

export default StatsPage;
