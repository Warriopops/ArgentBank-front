import React, { useState } from 'react';

const EditUsernameForm = ({ currentUsername, onCancel, onSave }) => {
    const [newUsername, setNewUsername] = useState(currentUsername);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (newUsername.trim().length < 2) {
            setError('Le nom doit contenir au moins 2 caractères.');
            return;
        }

        setLoading(true);
        try {
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userName: newUsername }),
            });

            if (!response.ok) {
                let errorMessage = 'Erreur lors de la mise à jour';
                try {
                    const errData = await response.json();
                    errorMessage = errData.message || errorMessage;
                } catch {
                }
                throw new Error(errorMessage);
            }

            const contentType = response.headers.get('content-type');
            let data = null;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = null;
            }

            console.log('Update success:', data);

            onSave(newUsername);
            
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="edit-name-form">
            <input
                type="text"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
                disabled={loading}
                aria-label="Nouveau nom d'utilisateur"
                autoFocus
            />
            <button type="submit" disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={onCancel} disabled={loading}>
                Cancel
            </button>
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default EditUsernameForm;
