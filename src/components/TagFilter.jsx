import React from 'react';
import { ACTIVITY_TAGS } from '../utils/tagsConfig';

const TagFilter = ({ selectedTags = [], onTagChange }) => {
  const handleTagClick = (tagKey) => {
    if (selectedTags.includes(tagKey)) {
      onTagChange(selectedTags.filter(tag => tag !== tagKey));
    } else {
      onTagChange([...selectedTags, tagKey]);
    }
  };

  return (
    <div className="mb-4">
      <div className="flex flex-wrap gap-2">
        <button
          className={`px-3 py-1 rounded-full border text-sm transition-all ${
            selectedTags.length === 0 ? 'bg-blue-500 text-white' : 'border-blue-500 text-blue-500'
          }`}
          onClick={() => onTagChange([])}
        >
          All Activities
        </button>
        {Object.entries(ACTIVITY_TAGS).map(([key, tag]) => (
          <button
            key={key}
            className={`px-3 py-1 rounded-full text-sm transition-all ${
              selectedTags.includes(key)
                ? 'text-white'
                : 'border'
            }`}
            style={{
              backgroundColor: selectedTags.includes(key) ? tag.color : 'transparent',
              borderColor: tag.color,
              color: selectedTags.includes(key) ? 'white' : tag.color
            }}
            onClick={() => handleTagClick(key)}
          >
            {tag.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TagFilter;
