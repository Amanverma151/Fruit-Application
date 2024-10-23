import React from 'react';

interface GroupBySelectorProps {
  groupBy: string;
  onGroupByChange: (groupBy: string) => void;
}

const GroupBySelector: React.FC<GroupBySelectorProps> = ({ groupBy, onGroupByChange }) => {
  return (
    <div className="group-by-selector">
      <label>Group by: </label>
      <select value={groupBy} onChange={(e) => onGroupByChange(e.target.value)}>
        <option value="None">None</option>
        <option value="Family">Family</option>
        <option value="Order">Order</option>
        <option value="Genus">Genus</option>
      </select>
    </div>
  );
};

export default GroupBySelector;
