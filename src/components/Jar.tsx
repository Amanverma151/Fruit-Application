import React from 'react';
import { Fruit } from '../types';
import PieChart from './PieChart';

interface JarProps {
  selectedFruits: Fruit[];
}

const Jar: React.FC<JarProps> = ({ selectedFruits }) => {
  const totalCalories = selectedFruits.reduce((total, fruit) => total + fruit.nutritions.calories, 0);

  return (
    <div className="jar">
      <h3>Jar</h3>
      <ul>
        {selectedFruits.map((fruit, index) => (
          <li key={index}>
            {fruit.name} ({fruit.nutritions.calories} cal)
          </li>
        ))}
      </ul>
      <p>Total Calories: {totalCalories}</p>
      <PieChart fruits={selectedFruits} />
    </div>
  );
};

export default Jar;
