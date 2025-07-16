import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Healthcheck as HealthcheckType } from '../../types/Healthcheck';
import Card from '../common/Card';

const Healthcheck = () => {
  const [healthcheck, setHealthcheck] = useState<HealthcheckType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHealthcheck = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get<HealthcheckType>('/healthcheck');
        setHealthcheck(data);
      } catch (err) {
        setError('Failed to fetch healthcheck');
        console.error('Error fetching healthcheck:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHealthcheck();
  }, []);

  const formatUptime = (uptime: number) => {
    const hours = Math.floor(uptime / 3600);
    const minutes = Math.floor((uptime % 3600) / 60);
    const seconds = Math.floor(uptime % 60);
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatTimestamp = (timestamp: number) => {
    return new Date(timestamp).toLocaleString();
  };

  if (loading) {
    return (
      <Card title="Server Health">
        <div className="text-center py-4">Loading...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Server Health">
        <div className="text-center py-4 text-red-600">{error}</div>
      </Card>
    );
  }

  if (!healthcheck) {
    return (
      <Card title="Server Health">
        <div className="text-center py-4 text-gray-500">No data available</div>
      </Card>
    );
  }

  const isHealthy = healthcheck.message === 'OK';

  return (
    <Card title="Server Health">
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="font-medium">Status:</span>
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium ${
              isHealthy
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {healthcheck.message}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Uptime:</span>
          <span className="text-gray-600">
            {formatUptime(healthcheck.uptime)}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-medium">Last Check:</span>
          <span className="text-gray-600">
            {formatTimestamp(healthcheck.timestamp)}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default Healthcheck;
