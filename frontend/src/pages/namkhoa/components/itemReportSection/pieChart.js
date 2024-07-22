import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export function PieChart({ numberOfSoldItems, numberOfAvailableItems }) {

  const data = {
    labels: ['Sold Items', 'Available Items'],
    datasets: [
      {
        label: '# of Votes',
        data: [numberOfSoldItems, numberOfAvailableItems],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return <Pie
    height="248px"
    width="704px"
    options={{ maintainAspectRatio: false }} data={data} />;
}
