export const ACTIVITY_TAGS = {
  'SEVA': { label: 'Seva', color: '#FF6B6B' },
  'BHAJAN': { label: 'Bhajan', color: '#4ECDC4' },
  'MEDITATION': { label: 'Meditation', color: '#9B59B6' },
  'STUDY_CIRCLE': { label: 'Study Circle', color: '#F1C40F' },
  'SERVICE': { label: 'Service', color: '#2ECC71' },
  'WORKSHOP': { label: 'Workshop', color: '#3498DB' },
  'YOUTH': { label: 'Youth Program', color: '#E67E22' },
  'SPECIAL': { label: 'Special Event', color: '#1ABC9C' }
};

export const getTagColor = (tag) => ACTIVITY_TAGS[tag]?.color || '#4CAF50';
