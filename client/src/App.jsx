import React, { useEffect, useState } from 'react';
import FavLinksForm from './components/FavLinksForm.jsx';
import FavLinksTable from './components/FavLinksTable.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

function App() {
  const [links, setLinks] = useState([]);
  const [editingLink, setEditingLink] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch all links from backend
  const fetchLinks = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/links`);
      if (!response.ok) {
        throw new Error('Failed to fetch links');
      }
      const data = await response.json();
      setLinks(data);
    } catch (err) {
      console.error(err);
      setError('Could not load links. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  // Create a new link
  const handleCreate = async (formData) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/links`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to create link');
      }

      const created = await response.json();
      setLinks((prev) => [...prev, created]);
    } catch (err) {
      console.error(err);
      setError('Could not create link.');
    } finally {
      setLoading(false);
    }
  };

  // Update an existing link
  const handleUpdate = async (id, formData) => {
    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/links/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Failed to update link');
      }

      const updated = await response.json();
      setLinks((prev) => prev.map((link) => (link.id === id ? updated : link)));
      setEditingLink(null);
    } catch (err) {
      console.error(err);
      setError('Could not update link.');
    } finally {
      setLoading(false);
    }
  };

  // Delete a link
  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this link?');
    if (!confirmed) return;

    try {
      setLoading(true);
      setError('');
      const response = await fetch(`${API_BASE_URL}/links/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok && response.status !== 204) {
        throw new Error('Failed to delete link');
      }

      setLinks((prev) => prev.filter((link) => link.id !== id));
    } catch (err) {
      console.error(err);
      setError('Could not delete link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header>
        <h1>FavLinks – Project 5</h1>
        <p className="subtitle">
          Full Stack CRUD app using React, Express, and PostgreSQL.
        </p>
      </header>

      {error && <div className="alert alert-error">{error}</div>}
      {loading && <div className="alert alert-info">Loading...</div>}

      <section className="layout">
        <div className="panel">
          <h2>{editingLink ? 'Edit Link' : 'Add New Link'}</h2>
          <FavLinksForm
            key={editingLink ? editingLink.id : 'new'}
            initialData={editingLink}
            onCreate={handleCreate}
            onUpdate={handleUpdate}
            onCancelEdit={() => setEditingLink(null)}
          />
        </div>

        <div className="panel">
          <h2>Saved Links</h2>
          <FavLinksTable
            links={links}
            onEdit={(link) => setEditingLink(link)}
            onDelete={handleDelete}
          />
        </div>
      </section>

      <footer>
        <small>
          React hooks used: <code>useState</code>, <code>useEffect</code>. Data flows via props
          between parent (<code>App</code>) and child components.
        </small>
      </footer>
    </div>
  );
}

export default App;
