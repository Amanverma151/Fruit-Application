import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Fruit } from '../types';

interface PieChartProps {
  fruits: Fruit[];
}

const PieChart: React.FC<PieChartProps> = ({ fruits }) => {
  const data = {
    labels: fruits.map((fruit) => fruit.name),
    datasets: [
      {
        data: fruits.map((fruit) => fruit.nutritions.calories),
        backgroundColor: fruits.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`),
      },
    ],
  };

  return <Pie data={data} />;
};

export default PieChart;
