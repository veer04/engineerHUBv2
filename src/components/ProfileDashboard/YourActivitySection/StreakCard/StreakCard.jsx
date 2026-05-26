


// StreakCard.jsx
import React, { useState, useEffect } from "react";
import "./streakcard.css";
import StreakDayBox from "./StreakDayBox";
import axios from "axios";
import { API_URL } from "../../../../services/APIUtils";
import { getAccessToken } from "../../../../features/getCookieValues";

const StreakCard = ({ streakData, userId = null }) => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [contributionData, setContributionData] = useState({});
  const [statistics, setStatistics] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [hasLoggedOldFormatWarning, setHasLoggedOldFormatWarning] = useState(false);
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Fetch streak data from API
  useEffect(() => {
    const fetchStreakData = async () => {
      try {
        setLoading(true);
        setIsRefreshing(true);
        
        // Use different API endpoint based on whether we're viewing own profile or another user's
        const apiEndpoint = userId 
          ? `${API_URL}api/v1/streak/public/${userId}`
          : `${API_URL}api/v1/streak/data`;
          
        const response = await axios.get(apiEndpoint, {
          headers: {
            'accesstoken': getAccessToken()
          }
        });

        if (response.data.success) {
          // Only log in development
          if (process.env.NODE_ENV === 'development') {
            console.log('API Response:', response.data.data);
            console.log('Contribution Data Sample:', Object.keys(response.data.data.contributionData || {}).slice(0, 5).map(key => ({ [key]: response.data.data.contributionData[key] })));
          }
          setContributionData(response.data.data.contributionData || {});
          setStatistics(response.data.data.statistics || {});
        } else {
          setError('Failed to fetch streak data');
        }
      } catch (err) {
        console.error('Error fetching streak data:', err);
        console.error('Error details:', {
          message: err.message,
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
        setError('Error loading streak data');
        // Fallback to mock data for development (using new format)
        const mockData = {};
        for (let i = 0; i < 365; i++) {
          const mockTokens = Math.floor(Math.random() * 12); // 0-11 tokens
          const mockActivityLevel = mockTokens === 0 ? 0 : 
            mockTokens < 3 ? 1 : 
            mockTokens <= 6 ? 2 : 
            mockTokens <= 9 ? 3 : 4;
          mockData[i] = { tokens: mockTokens, activityLevel: mockActivityLevel };
        }
        // Add some activity for today (index 364)
        mockData[364] = { tokens: 4, activityLevel: 2 };
        setContributionData(mockData);
      } finally {
        setLoading(false);
        setIsRefreshing(false);
      }
    };

    fetchStreakData();
  }, [userId, refreshKey]);

  // Handle window resize for responsive sizing
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  // Visual constants (match your CSS) - responsive sizing
  const getResponsiveSizing = (width = windowWidth) => {
    if (width <= 360) {
      // Extra small screens
      return { BOX_SIZE: 7, GAP: 2, COL_WIDTH: 9 };
    } else if (width <= 480) {
      // Small screens
      return { BOX_SIZE: 8, GAP: 2, COL_WIDTH: 10 };
    } else if (width <= 768) {
      // Medium screens (tablets)
      return { BOX_SIZE: 10, GAP: 2, COL_WIDTH: 12 };
    } else {
      // Desktop screens
      return { BOX_SIZE: 11, GAP: 2, COL_WIDTH: 13 };
    }
  };

  const { BOX_SIZE, GAP, COL_WIDTH } = getResponsiveSizing();

  // Choose week start: 0 = Sunday, 1 = Monday
  const WEEK_START = 1;

  // Convert old format data to new format (optimized)
  const convertContributionData = (data) => {
    let hasOldFormat = false;
    const convertedData = {};
    
    for (let i = 0; i < 365; i++) {
      if (typeof data[i] === 'number') {
        // Old format: just activity level - convert to new format
        const oldActivityLevel = data[i];
        const estimatedTokens = oldActivityLevel === 0 ? 0 :
          oldActivityLevel === 1 ? 1 :
          oldActivityLevel === 2 ? 4 :
          oldActivityLevel === 3 ? 7 : 10;
        convertedData[i] = { tokens: estimatedTokens, activityLevel: oldActivityLevel };
        hasOldFormat = true;
      } else {
        // New format: object with tokens and activityLevel
        convertedData[i] = data[i] || { tokens: 0, activityLevel: 0 };
      }
    }
    
    // Only log warning once per session to avoid console spam (only in development)
    if (hasOldFormat && !hasLoggedOldFormatWarning && process.env.NODE_ENV === 'development') {
      console.warn('Old data format detected. Converting to new format. This warning will only show once per session.');
      setHasLoggedOldFormatWarning(true);
    }
    
    return convertedData;
  };

  // Generate aligned date range (start backed up to WEEK_START)
  const generateAlignedYearDates = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Convert data format once
    const convertedData = convertContributionData(contributionData);

    // Generate 365 days of data matching backend logic
    const dates = [];
    for (let i = 0; i < 365; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (364 - i));
      date.setHours(0, 0, 0, 0);
      
      const dayData = convertedData[i] || { tokens: 0, activityLevel: 0 };
      const tokens = dayData.tokens || 0;
      const activityLevel = dayData.activityLevel || 0;

      // Debug: Log today's date and activity (only in development)
      if (date.getTime() === today.getTime() && process.env.NODE_ENV === 'development') {
        console.log(`Today's date (IST): ${date.toDateString()}, Tokens: ${tokens}, Activity level: ${activityLevel}, Index: ${i}`);
      }

      dates.push({
        date: new Date(date),
        isToday: date.getTime() === today.getTime(),
        isPast: date < today,
        isFuture: date > today,
        hasActivity: tokens > 0,
        tokens: tokens,
        activityLevel: activityLevel
      });
    }

    return dates;
  };

  const yearDates = generateAlignedYearDates();

  // Build weeks: columns of 7 days
  const weeks = [];
  for (let i = 0; i < yearDates.length; i += 7) {
    const week = yearDates.slice(i, i + 7);
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  // Grid rows (7 rows representing week days)
  const createGrid = () => {
    const grid = [];
    for (let dow = 0; dow < 7; dow++) {
      const row = [];
      for (let w = 0; w < weeks.length; w++) {
        row.push(weeks[w][dow] || null);
      }
      grid.push(row);
    }
    return grid;
  };
  const grid = createGrid();

  // Total contributions
  const totalContributions = statistics.totalTokens || yearDates.reduce((s, d) => s + (d?.tokens || 0), 0);

  // MONTH LABELS — simple, robust placement:
  // Find the first day-of-month present in yearDates for each month, compute weekIndex,
  // and position left = weekIndex * COL_WIDTH.
  const getMonthLabels = () => {
    const monthNames = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const months = [];

    for (let m = 0; m < 12; m++) {
      // find the first-of-month
      let idx = yearDates.findIndex(d => d && d.date.getMonth() === m && d.date.getDate() === 1);

      if (idx === -1) {
        // fallback: any day in this month
        idx = yearDates.findIndex(d => d && d.date.getMonth() === m);
      }

      if (idx !== -1) {
        months.push({
          month: monthNames[m],
          weekIndex: Math.floor(idx / 7)
        });
      }
    }

    // sort by weekIndex to ensure chronological left-to-right order
    return months.sort((a, b) => a.weekIndex - b.weekIndex);
  };

  const monthLabels = getMonthLabels();

  if (loading) {
    return (
      <div className="github-streak-container">
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div>Loading streak data...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="github-streak-container">
        <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
          <div>{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="github-streak-container">
      <div className="streak-header">
        <div className="contribution-info">
          <span className="contribution-count">{totalContributions} actions in the last year</span>
          {statistics.currentStreak > 0 && (
  <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>
    Current streak: {statistics.currentStreak} days
    {statistics.longestStreak > 0 && (
      <> | Longest streak: {statistics.longestStreak} days</>
    )}
  </div>
)}

        </div>
        <div className="year-selector" style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button 
            onClick={() => setRefreshKey(prev => prev + 1)}
            disabled={isRefreshing}
            className={`refresh-button ${isRefreshing ? 'refreshing' : ''}`}
            style={{ 
              padding: '8px 12px', 
              fontSize: '12px', 
              backgroundColor: isRefreshing ? '#6c757d' : '#28a745', 
              color: 'white', 
              border: 'none', 
              borderRadius: '4px',
              cursor: isRefreshing ? 'not-allowed' : 'pointer',
              minHeight: '32px',
              minWidth: '60px',
              transition: 'all 0.2s ease',
              opacity: isRefreshing ? 0.7 : 1,
              transform: isRefreshing ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            {isRefreshing ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span className="spinner"></span>
                Refreshing...
              </span>
            ) : (
              'Refresh'
            )}
          </button>
          {/*
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="year-dropdown"
          >
            <option value={2025}>2025</option>
            <option value={2024}>2024</option>
            <option value={2023}>2023</option>
            <option value={2022}>2022</option>
            <option value={2021}>2021</option>
          </select>
          */}
        </div>
      </div>

      <div className="contribution-graph">
         <div className="month-labels" style={{ position: "relative", height: 24 }}>
           {monthLabels.map((lbl, i) => {
             // Calculate responsive day labels offset based on screen size
             const dayLabelsWidth = windowWidth <= 360 ? 16 : 
                                   windowWidth <= 480 ? 18 : 
                                   windowWidth <= 768 ? 22 : 24;
             const dayLabelsMargin = 8; // margin-right
             const totalOffset = dayLabelsWidth + dayLabelsMargin;
             
             // Position month label based on responsive column width
             const left = (lbl.weekIndex * COL_WIDTH) + totalOffset + COL_WIDTH;
             return (
               <div
                 key={i}
                 className="month-label"
                 style={{
                   position: "absolute",
                   left: `${left}px`,
                   top: 0,
                   whiteSpace: "nowrap",
                   zIndex: 10
                 }}
               >
                 {lbl.month}
               </div>
             );
           })}
         </div>

        <div className="graph-container">
          <div className="day-labels">
            <div className="day-label">Mon</div>
            <div className="day-label">Tue</div>
            <div className="day-label">Wed</div>
            <div className="day-label">Thu</div>
            <div className="day-label">Fri</div>
            <div className="day-label">Sat</div>
            <div className="day-label">Sun</div>
          </div>

          <div className="contribution-grid">
            {grid.map((weekRow, dayOfWeek) => (
              <div key={dayOfWeek} className="week-row">
                {weekRow.map((dateObj, weekIndex) => (
                  <StreakDayBox 
                    key={`${dayOfWeek}-${weekIndex}`} 
                    dateObj={dateObj} 
                    boxSize={BOX_SIZE}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="contribution-legend">
        <span className="legend-text">Less</span>
        <div className="legend-squares">
          <div 
            className="legend-square level-0"
            style={{
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`
            }}
          ></div>
          <div 
            className="legend-square level-1"
            style={{
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`
            }}
          ></div>
          <div 
            className="legend-square level-2"
            style={{
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`
            }}
          ></div>
          <div 
            className="legend-square level-3"
            style={{
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`
            }}
          ></div>
          <div 
            className="legend-square level-4"
            style={{
              width: `${BOX_SIZE}px`,
              height: `${BOX_SIZE}px`
            }}
          ></div>
        </div>
        <span className="legend-text">More</span>
      </div>

      <div className="streak-info-note">
        <div className="note-item">
          <span className="note-bullet">•</span>
          <span className="note-text">Login/signup, active cookie sessions, profile updates, opportunity applications, referral session selection, and digital product purchases are counted as actions.</span>
        </div>
        <div className="note-item">
          <span className="note-bullet">•</span>
          <span className="note-text">Maintaining a streak of 30+ days will earn you Resume guidance from our mentor, a free referral to leading MNCs, top startups, or even MAANG companies.</span>
        </div>
        <div className="note-item">
          <span className="note-bullet">•</span>
          <span className="note-text">Profiles of top streak holders will be featured on the community page and celebrated across our social media platforms.</span>
        </div>
      </div>
    </div>
  );
};

export default StreakCard;




