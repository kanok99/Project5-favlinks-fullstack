import React, { useEffect, useState } from 'react';

const emptyForm = {
  name: '',
  url: '',
  description: ''
};

function FavLinksForm({ initialData, onCreate, onUpdate, onCancelEdit }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        url: initialData.url || '',
        description: initialData.description || ''
      });
    } else {
      setForm(emptyForm);
    }
  }, [initialData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.url.trim()) {
      alert('Name and URL are required.');
      return;
    }

    // Simple URL normalization
    let normalizedUrl = form.url.trim();
    if (!normalizedUrl.startsWith('http://') && !normalizedUrl.startsWith('https://')) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const payload = {
      ...form,
      url: normalizedUrl
    };

    if (initialData && initialData.id) {
      onUpdate(initialData.id, payload);
    } else {
      onCreate(payload);
      setForm(emptyForm);
    }
  };

  const handleCancel = () => {
    setForm(emptyForm);
    if (onCancelEdit) {
      onCancelEdit();
    }
  };

  return (
    <form className="favlinks-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="name">Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Google"
          value={form.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="url">URL *</label>
        <input
          id="url"
          name="url"
          type="text"
          placeholder="e.g. https://www.google.com"
          value={form.url}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description (optional)</label>
        <textarea
          id="description"
          name="description"
          placeholder="Short note about this link..."
          value={form.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="button-row">
        <button type="submit" className="btn btn-primary">
          {initialData ? 'Save Changes' : 'Add Link'}
        </button>
        {initialData && (
          <button type="button" className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default FavLinksForm;
