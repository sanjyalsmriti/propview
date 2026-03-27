import { useState, useEffect, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api/axios';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import LoadingSpinner from '../components/LoadingSpinner';
import './Dashboard.css';

const PROPERTIES = [
  {
    id: 'p1',
    title: '2BR Apartment Near Park',
    location: 'Toronto, ON',
    price: 589000,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=450&fit=crop'
  },
  {
    id: 'p2',
    title: 'Cozy Townhouse',
    location: 'Mississauga, ON',
    price: 725000,
    image: 'https://images.unsplash.com/photo-1580587771525-2b1e5e5469b7?w=600&h=450&fit=crop'
  },
  {
    id: 'p3',
    title: 'Studio Downtown',
    location: 'Toronto, ON',
    price: 412000,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=450&fit=crop'
  },
  {
    id: 'p4',
    title: 'Family Home With Yard',
    location: 'Oakville, ON',
    price: 925000,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&h=450&fit=crop'
  },
  {
    id: 'p5',
    title: 'Waterfront Condo',
    location: 'Etobicoke, ON',
    price: 678000,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&h=450&fit=crop'
  },
  {
    id: 'p6',
    title: 'Bungalow With Garage',
    location: 'Brampton, ON',
    price: 798000,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=450&fit=crop'
  }
];

function Dashboard() {
  const { user } = useContext(AuthContext);
  const [tab, setTab] = useState('all');
  const [favourites, setFavourites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busyId, setBusyId] = useState(null);

  const loadFavourites = useCallback(async () => {
    setError('');
    try {
      const { data } = await api.get('/favourites');
      setFavourites(data);
    } catch (e) {
      const msg = e.response?.data?.msg;
      setError(
        msg ||
          (e.code === 'ERR_NETWORK' ? 'Cannot reach server' : 'Could not load favourites')
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFavourites();
  }, [loadFavourites]);

  const favByPropertyId = {};
  favourites.forEach((f) => {
    favByPropertyId[f.propertyId] = f;
  });

  const visibleProps =
    tab === 'all'
      ? PROPERTIES
      : PROPERTIES.filter((p) => favByPropertyId[p.id]);

  const onToggle = async (property) => {
    const existing = favByPropertyId[property.id];
    setBusyId(property.id);
    setError('');
    try {
      if (existing) {
        await api.delete(`/favourites/${existing._id}`);
      } else {
        await api.post('/favourites', {
          propertyId: property.id,
          title: property.title,
          location: property.location,
          price: property.price
        });
      }
      await loadFavourites();
    } catch (e) {
      const msg = e.response?.data?.msg;
      setError(
        msg || (e.code === 'ERR_NETWORK' ? 'Cannot reach server' : 'Something went wrong')
      );
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="dashboard-page">
      <Navbar />
      <main className="dashboard-main">
        <h1 className="dashboard-welcome">Hi {user?.name}</h1>
        <p className="dashboard-sub">You are logged in as {user?.role}</p>

        <div className="dashboard-tabs">
          <button
            type="button"
            className={tab === 'all' ? 'dashboard-tab dashboard-tab--active' : 'dashboard-tab'}
            onClick={() => setTab('all')}
            disabled={loading || !!busyId}
          >
            All Properties
          </button>
          <button
            type="button"
            className={
              tab === 'favs' ? 'dashboard-tab dashboard-tab--active' : 'dashboard-tab'
            }
            onClick={() => setTab('favs')}
            disabled={loading || !!busyId}
          >
            My Favourites
          </button>
        </div>

        {error && <p className="dashboard-error">{error}</p>}

        {loading ? (
          <LoadingSpinner label="Loading favourites..." />
        ) : tab === 'favs' && visibleProps.length === 0 ? (
          <p className="dashboard-empty">No favourites yet</p>
        ) : (
          <div className={`dashboard-grid-wrap${busyId ? ' dashboard-grid-wrap--busy' : ''}`}>
            {busyId && <p className="dashboard-saving">Saving...</p>}
            <div className="dashboard-grid">
              {visibleProps.map((p) => (
                <PropertyCard
                  key={p.id}
                  property={p}
                  isFav={!!favByPropertyId[p.id]}
                  busy={busyId === p.id}
                  onToggle={onToggle}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Dashboard;
