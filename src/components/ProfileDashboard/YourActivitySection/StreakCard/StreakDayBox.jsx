import React from "react";

const StreakDayBox = ({ dateObj }) => {
  if (!dateObj) {
    // Empty cell for padding
    return <div className="contribution-day empty"></div>;
  }

  const { date, isToday, isPast, isFuture, hasActivity, tokens, activityLevel } = dateObj;

  const getActivityLevel = () => {
    if (!hasActivity) return 'level-0';
    
    // Map activity level to GitHub-style levels (0-4)
    if (activityLevel === 0) return 'level-0';
    if (activityLevel === 1) return 'level-1';
    if (activityLevel === 2) return 'level-2';
    if (activityLevel === 3) return 'level-3';
    return 'level-4';
  };

  const getClassName = () => {
    let className = 'contribution-day';
    
    if (isToday) className += ' today';
    if (isPast) className += ' past';
    if (isFuture) className += ' future';
    
    className += ` ${getActivityLevel()}`;
    
    return className;
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTooltipText = () => {
    const dateStr = formatDate(date);
    if (tokens === 0) {
      return `No action on ${dateStr}`;
    }
    
    // Show 10+ for high activity counts (10 or more)
    const displayCount = tokens > 10 ? '10+' : tokens.toString();
    const contributionText = tokens === 1 ? 'action' : 'actions';
    return `${displayCount} ${contributionText} on ${dateStr}`;
  };

  return (
    <div 
      className={getClassName()}
      title={getTooltipText()}
      data-level={tokens}
    />
  );
};

export default StreakDayBox;
