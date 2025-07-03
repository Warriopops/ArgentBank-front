import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateProfile } from '../../actions/user.action';

const EditUsernameForm = ({ currentUsername, onCancel, onSave }) => {
    const [newUsername, setNewUsername] = useState(currentUsername);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const dispatch = useDispatch();

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
            const resultAction = await dispatch(updateProfile({ token, userName: newUsername }));
            if (updateProfile.fulfilled.match(resultAction)) {
                onSave(newUsername);
            } else {
                const errorMsg = resultAction.payload || resultAction.error.message || 'Erreur lors de la mise à jour';
                setError(errorMsg);
            }
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
