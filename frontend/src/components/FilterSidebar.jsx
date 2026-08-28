import { useState } from 'react';

const GROUPS = [
  { key: 'jobType', label: 'Job Type' },
  { key: 'program', label: 'Program' },
  { key: 'category', label: 'Job Category' },
  { key: 'location', label: 'Location' },
];

export default function FilterSidebar({ filters, selected, onToggle, onClear }) {
  const [collapsed, setCollapsed] = useState({});

  const toggleGroup = (key) =>
    setCollapsed((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <aside className="filters">
      <div className="filters-head">
        <span>Filter</span>
        <button className="clear-btn" onClick={onClear}>Clear</button>
      </div>
      {GROUPS.map((group) => {
        const isCollapsed = !!collapsed[group.key];
        return (
          <div className="filter-group" key={group.key}>
            <button
              type="button"
              className="filter-group-head"
              aria-expanded={!isCollapsed}
              onClick={() => toggleGroup(group.key)}
            >
              <h4>{group.label}</h4>
              <span className="filter-toggle-icon">{isCollapsed ? '+' : '−'}</span>
            </button>
            {!isCollapsed && (
              <ul>
                {(filters[group.key] || []).map((option) => {
                  const checked = (selected[group.key] || []).includes(option);
                  return (
                    <li key={option}>
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onToggle(group.key, option)}
                        />
                        <span>{option}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        );
      })}
    </aside>
  );
}
