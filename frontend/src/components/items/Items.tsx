import { useState, useEffect } from 'react';
import { apiClient } from '../../api/client';
import { Item } from '../../types/Item';
import Card from '../common/Card';

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const data = await apiClient.get<Item[]>('/items');
        setItems(data);
      } catch (err) {
        setError('Failed to fetch items');
        console.error('Error fetching items:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  if (loading) {
    return (
      <Card title="Items">
        <div className="text-center py-4">Loading...</div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Items">
        <div className="text-center py-4 text-red-600">{error}</div>
      </Card>
    );
  }

  return (
    <Card title="Items">
      {items.length === 0 ? (
        <div className="text-center py-4 text-gray-500">No items found</div>
      ) : (
        <div className="space-y-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center p-3 bg-gray-50 rounded-md"
            >
              <span className="font-medium">{item.name}</span>
              <span className="text-sm text-gray-500">{item.id}</span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default Items;
