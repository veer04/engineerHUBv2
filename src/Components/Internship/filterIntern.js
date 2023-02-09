import React, { useState } from 'react';

const FilterBar = () => {
  const [selectedOption, setSelectedOption] = useState('');

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div>
      <form>
        <div>
          <label>
            <input
              type="radio"
              value="all"
              checked={selectedOption === 'all'}
              onChange={handleOptionChange}
            />
            All
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="location"
              checked={selectedOption === 'location'}
              onChange={handleOptionChange}
            />
            Location
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="duration"
              checked={selectedOption === 'duration'}
              onChange={handleOptionChange}
            />
            Duration
          </label>
        </div>
        <div>
          <label>
            <input
              type="radio"
              value="stipend"
              checked={selectedOption === 'stipend'}
              onChange={handleOptionChange}
            />
            Stipend
          </label>
        </div>
      </form>
      <p>Selected option: {selectedOption}</p>
    </div>
  );
};

export default FilterBar;
