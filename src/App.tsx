import React, { useState } from 'react';
import { fruitsData } from './fruitsData'; 
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const FruitApp: React.FC = () => {
  const [view, setView] = useState<'list' | 'table'>('list');
  const [groupBy, setGroupBy] = useState<'none' | 'family' | 'order' | 'genus'>('none');
  const [jar, setJar] = useState<{ fruit: any, quantity: number }[]>([]);
  const [showPie, setShowPie] = useState(false);

  const addFruitToJar = (fruit: any) => {
    const existingFruit = jar.find(item => item.fruit.name === fruit.name);

    if (existingFruit) {
      // Increment the quantity if the fruit is already in the jar
      setJar(jar.map(item =>
        item.fruit.name === fruit.name ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      // Add the fruit with a quantity of 1 if it's not in the jar
      setJar([...jar, { fruit, quantity: 1 }]);
    }
  };

  const addGroupToJar = (group: any[]) => {
    group.forEach(fruit => addFruitToJar(fruit));
  };

  const groupedFruits = () => {
    if (groupBy === 'none') return { '': fruitsData };
    return fruitsData.reduce((acc: any, fruit) => {
      const key = fruit[groupBy];
      if (!acc[key]) acc[key] = [];
      acc[key].push(fruit);
      return acc;
    }, {});
  };

  const calculateTotalCalories = () =>
    jar.reduce((acc, item) => acc + item.fruit.nutritions.calories * item.quantity, 0);

  const pieData = {
    labels: jar.map(item => item.fruit.name),
    datasets: [
      {
        data: jar.map(item => item.fruit.nutritions.calories * item.quantity),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div style={{ display: 'flex' }}>
      {/* Left Section: Fruits List */}
      <div style={{ flex: 1 }}>
        <h2>Fruits</h2>
        <div>
          <label htmlFor="groupBy">Group by:</label>
          <select id="groupBy" value={groupBy} onChange={(e) => setGroupBy(e.target.value as any)}>
            <option value="none">None</option>
            <option value="family">Family</option>
            <option value="order">Order</option>
            <option value="genus">Genus</option>
          </select>
        </div>
        <div>
          <button onClick={() => setView('list')}>List View</button>
          <button onClick={() => setView('table')}>Table View</button>
        </div>

        {/* Fruits Display */}
        {Object.entries(groupedFruits()).map(([group, fruits]: any[]) => (
          <div key={group}>
            {group && <h3>{group} <button onClick={() => addGroupToJar(fruits)}>Add All</button></h3>}
            {view === 'list' ? (
              <ul>
                {fruits.map((fruit: any) => (
                  <li key={fruit.id}>
                    {fruit.name} ({fruit.nutritions.calories} cal)
                    <button onClick={() => addFruitToJar(fruit)}>Add</button>
                  </li>
                ))}
              </ul>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Family</th>
                    <th>Order</th>
                    <th>Genus</th>
                    <th>Calories</th>
                    <th>Add</th>
                  </tr>
                </thead>
                <tbody>
                  {fruits.map((fruit: any) => (
                    <tr key={fruit.id}>
                      <td>{fruit.name}</td>
                      <td>{fruit.family}</td>
                      <td>{fruit.order}</td>
                      <td>{fruit.genus}</td>
                      <td>{fruit.nutritions.calories}</td>
                      <td><button onClick={() => addFruitToJar(fruit)}>Add</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ))}
      </div>

      {/* Right Section: Jar */}
      <div style={{ flex: 1 }}>
        <h2>Jar</h2>
        <ul>
          {jar.map((item, index) => (
            <li key={index}>
              {item.fruit.name} ({item.fruit.nutritions.calories * item.quantity} cal) x {item.quantity}
            </li>
          ))}
        </ul>
        <p>Total Calories: {calculateTotalCalories()}</p>
        <button onClick={() => setShowPie(!showPie)}>
          {showPie ? 'Hide' : 'Show'} Pie Chart
        </button>
        {showPie && <Pie data={pieData} />}
      </div>
    </div>
  );
};

export default FruitApp;
