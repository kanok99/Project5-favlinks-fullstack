import React from 'react';

function FavLinksTable({ links, onEdit, onDelete }) {
  if (!links || links.length === 0) {
    return <p>No links saved yet. Add your first favorite link!</p>;
  }

  return (
    <table className="favlinks-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>URL</th>
          <th>Description</th>
          <th>Created At</th>
          <th style={{ width: '140px' }}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.map((link, index) => (
          <tr key={link.id}>
            <td>{index + 1}</td>
            <td>{link.name}</td>
            <td>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.url}
              </a>
            </td>
            <td>{link.description || '-'}</td>
            <td>
              {link.created_at
                ? new Date(link.created_at).toLocaleString()
                : '-'}
            </td>
            <td>
              <button
                type="button"
                className="btn btn-small"
                onClick={() => onEdit(link)}
              >
                Edit
              </button>
              <button
                type="button"
                className="btn btn-small btn-danger"
                onClick={() => onDelete(link.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default FavLinksTable;
