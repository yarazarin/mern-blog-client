import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Analytics.css';

const Analytics = () => {
  const [views, setViews] = useState([]);
  const [countries, setCountries] = useState([]);
  const [total, setTotal] = useState(0);
  const [recent, setRecent] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchAnalytics = useCallback(async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: startDate && endDate ? { start: startDate, end: endDate } : {},
      };

      const [viewsRes, countriesRes, totalRes, recentRes] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/analytics/views`, config),
        axios.get(`${process.env.REACT_APP_API_URL}/analytics/countries`, config),
        axios.get(`${process.env.REACT_APP_API_URL}/analytics/total`, config),
        axios.get(`${process.env.REACT_APP_API_URL}/analytics/recent`, { ...config, params: { ...config.params, limit: 20 } }),
      ]);

      setViews(viewsRes.data);
      setCountries(countriesRes.data);
      setTotal(totalRes.data.total);
      setRecent(recentRes.data);
    } catch (err) {
      setError('Failed to load analytics data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [startDate, endDate]);

  useEffect(() => {
    fetchAnalytics();
  }, [fetchAnalytics]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="analytics">
      <h1>Blog Analytics</h1>

      <div className="filters">
        <label>
          Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>
          End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button onClick={fetchAnalytics}>Filter</button>
      </div>

      <div className="stats">
        <div className="stat">
          <h2>Total Views</h2>
          <p>{total}</p>
        </div>
      </div>

      <div className="charts">
        <div className="chart">
          <h2>Views per Date</h2>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {views.map((view) => (
                <tr key={view._id}>
                  <td>{view._id}</td>
                  <td>{view.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="chart">
          <h2>Views by Country</h2>
          <table>
            <thead>
              <tr>
                <th>Country</th>
                <th>Views</th>
              </tr>
            </thead>
            <tbody>
              {countries.map((country) => (
                <tr key={country._id}>
                  <td>{country._id}</td>
                  <td>{country.count}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="recent-visits">
        <h2>Recent Visits</h2>
        <table>
          <thead>
            <tr>
              <th>IP</th>
              <th>Country</th>
              <th>City</th>
              <th>Date</th>
              <th>Page</th>
            </tr>
          </thead>
          <tbody>
            {recent.map((visit, index) => (
              <tr key={index}>
                <td>{visit.ip}</td>
                <td>{visit.country}</td>
                <td>{visit.city}</td>
                <td>{new Date(visit.date).toLocaleString()}</td>
                <td>{visit.path}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Analytics;
