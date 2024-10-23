import React from 'react';
import { Fruit } from '../types';

interface FruitListProps {
  fruits: Fruit[];
  groupBy: string;
  onAddToJar: (fruit: Fruit) => void;
}

const FruitList: React.FC<FruitListProps> = ({ fruits, groupBy, onAddToJar }) => {
  const groupedFruits = groupBy !== 'None' ? groupFruits(fruits, groupBy) : { None: fruits };

  // Helper function to group fruits by the selected key
  function groupFruits(fruits: Fruit[], key: string) {
    return fruits.reduce((acc: { [key: string]: Fruit[] }, fruit) => {
      const group = fruit[key as keyof Fruit] as string || 'Other';
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(fruit);
      return acc;
    }, {});
  }

  return (
    <div className="fruit-list">
      {Object.keys(groupedFruits).map((group) => (
        <div key={group} className="fruit-group">
          {group !== 'None' && (
            <div className="group-header">
              <span>{group}</span>
              <button onClick={() => groupedFruits[group].forEach(onAddToJar)}>Add All</button>
            </div>
          )}
          <ul>
            {groupedFruits[group].map((fruit: Fruit) => (
              <li key={fruit.name}>
                {fruit.name} ({fruit.nutritions.calories} cal)
                <button onClick={() => onAddToJar(fruit)}>Add</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default FruitList;
