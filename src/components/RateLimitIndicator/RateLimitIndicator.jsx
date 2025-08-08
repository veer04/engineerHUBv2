import React, { useState, useEffect } from 'react';
import { Info, AlertTriangle, CheckCircle } from 'react-feather';
import './RateLimitIndicator.css';

const RateLimitIndicator = ({ currentRequests = 0, maxRequests = 50, maxResumesPerRequest = 10 }) => {
  const [isVisible, setIsVisible] = useState(false);

  const usagePercentage = (currentRequests / maxRequests) * 100;
  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = usagePercentage >= 100;

  const getStatusColor = () => {
    if (isAtLimit) return '#ff4444';
    if (isNearLimit) return '#ff8800';
    return '#00aa00';
  };

  const getStatusIcon = () => {
    if (isAtLimit) return <AlertTriangle size={16} />;
    if (isNearLimit) return <Info size={16} />;
    return <CheckCircle size={16} />;
  };

  const getStatusMessage = () => {
    if (isAtLimit) return 'Rate limit reached';
    if (isNearLimit) return 'Approaching limit';
    return 'Normal usage';
  };

  return (
    <div className="rate-limit-indicator">
      <div 
        className="rate-limit-trigger"
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <div className="rate-limit-bar">
          <div 
            className="rate-limit-progress" 
            style={{ 
              width: `${Math.min(usagePercentage, 100)}%`,
              backgroundColor: getStatusColor()
            }}
          />
        </div>
        <span className="rate-limit-text">
          {currentRequests}/{maxRequests}
        </span>
      </div>
      
      {isVisible && (
        <div className="rate-limit-tooltip">
          <div className="tooltip-header">
            {getStatusIcon()}
            <span className="tooltip-title">AI Sorting Rate Limit</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <strong>Current Usage:</strong> {currentRequests} requests
            </div>
            <div className="tooltip-item">
              <strong>Hourly Limit:</strong> {maxRequests} requests
            </div>
            <div className="tooltip-item">
              <strong>Per Request Limit:</strong> {maxResumesPerRequest} resumes
            </div>
            <div className="tooltip-status">
              Status: {getStatusMessage()}
            </div>
            {isNearLimit && (
              <div className="tooltip-warning">
                ⚠️ You're approaching the hourly limit. Consider waiting before making more requests.
              </div>
            )}
            {isAtLimit && (
              <div className="tooltip-error">
                🚫 Rate limit reached. Please wait before making more requests.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default RateLimitIndicator; 