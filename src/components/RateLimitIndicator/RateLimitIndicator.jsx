import React, { useState, useEffect } from 'react';
import { Info, AlertTriangle, CheckCircle } from 'react-feather';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../services/APIUtils';
import { getAccessToken } from '../../features/getCookieValues';
import './RateLimitIndicator.css';

const RateLimitIndicator = ({ 
  currentRequests: propCurrent, 
  maxRequests: propMax, 
  availableCredits: propAvailable,
  maxResumesPerRequest = 30,
  featureName = "Unified AI Credit System",
  creditLabel = "AI Credits"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [liveWallet, setLiveWallet] = useState(null);

  useEffect(() => {
    // If props are default or not explicitly provided, fetch live backend subscription wallet
    if (propCurrent === undefined || propCurrent === 14) {
      const fetchWallet = async () => {
        try {
          const baseUrl = API_URL.endsWith('/') ? API_URL : `${API_URL}/`;
          const token = getAccessToken();
          const res = await axios.get(`${baseUrl}api/v1/plans/my-subscription`, {
            withCredentials: true,
            headers: {
              accesstoken: token,
              Authorization: token ? `Bearer ${token}` : "",
            },
          });
          if (res.data?.success && res.data?.data?.wallet) {
            const w = res.data.data.wallet;
            const isFree = (w.plan || "free").toLowerCase() === "free";
            setLiveWallet({
              used: w.totalConsumed || 0,
              available: isFree ? 0 : (w.availableCredits !== undefined ? w.availableCredits : 0),
              total: isFree ? 0 : (w.totalPurchased || (w.plan === 'starter' ? 200 : w.plan === 'ultra' ? 1500 : 10000)),
              isFree,
            });
          }
        } catch (err) {
          console.log("RateLimitIndicator live fetch error:", err.message);
        }
      };
      fetchWallet();
    }
  }, [propCurrent]);

  const currentRequests = liveWallet ? liveWallet.used : (propCurrent !== undefined ? propCurrent : 0);
  const totalCapacity = liveWallet ? liveWallet.total : (propMax !== undefined ? propMax : 0);
  const availableBalance = liveWallet
    ? liveWallet.available
    : (propAvailable !== undefined
        ? propAvailable
        : (propMax !== undefined ? Math.max(totalCapacity - currentRequests, 0) : 0));

  const usagePercentage = totalCapacity > 0 ? (currentRequests / totalCapacity) * 100 : 0;
  const isNearLimit = availableBalance < 50;
  const isAtLimit = availableBalance <= 0;

  const getStatusColor = () => {
    if (isAtLimit) return '#ff4444';
    if (isNearLimit) return '#ff8800';
    return '#128381';
  };

  const getStatusIcon = () => {
    if (isAtLimit) return <AlertTriangle size={16} />;
    if (isNearLimit) return <Info size={16} />;
    return <CheckCircle size={16} />;
  };

  const getStatusMessage = () => {
    if (isAtLimit) return 'AI Credits Exhausted';
    if (isNearLimit) return 'AI Credits Low';
    return 'Normal AI Credit Usage';
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
              width: `${Math.min(Math.max((availableBalance / totalCapacity) * 100, 5), 100)}%`,
              backgroundColor: getStatusColor()
            }}
          />
        </div>
        <span className="rate-limit-text">
          {availableBalance} {creditLabel} Remaining
        </span>
      </div>
      
      {isVisible && (
        <div className="rate-limit-tooltip">
          <div className="tooltip-header">
            {getStatusIcon()}
            <span className="tooltip-title">{featureName}</span>
          </div>
          <div className="tooltip-content">
            <div className="tooltip-item">
              <span className="tooltip-label">Credits Used</span>
              <span className="tooltip-value">{currentRequests} credits</span>
            </div>
            <div className="tooltip-item">
              <span className="tooltip-label">Available Balance</span>
              <span className="tooltip-value" style={{ fontWeight: 700, color: '#128381' }}>{availableBalance} AI credits</span>
            </div>
            <div className="tooltip-item">
              <span className="tooltip-label">Batch Processing</span>
              <span className="tooltip-value">Max {maxResumesPerRequest} items/batch</span>
            </div>
            <div className="tooltip-status">
              Status: {getStatusMessage()}
            </div>
            {isNearLimit && !isAtLimit && (
              <div className="tooltip-warning">
                ⚠️ You're low on AI Credits. Consider upgrading your plan.
              </div>
            )}
            {isAtLimit && (
              <div className="tooltip-error">
                🚫 AI Credits exhausted. Upgrade your subscription to continue.
              </div>
            )}
            <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
              <Link to="/pricing" style={{ color: '#7c3aed', fontWeight: 600, fontSize: '0.8125rem', textDecoration: 'underline' }}>
                View Pricing & Upgrade Credits →
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateLimitIndicator;