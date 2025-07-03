import React, { useState } from 'react';
import './User.css';
import EditUsernameForm from '../../components/EditUsername/EditUsername';

const User = () => {
  const userName = localStorage.getItem("userName");
  const [username, setUsername] = useState(userName ? userName : "");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveUsername = (newUsername) => {
    setUsername(newUsername);
    setIsEditing(false);
  };

  return (
    <>
      <main className="main bg-dark">
        <div className="header">
          {!isEditing ? (
            <>
              <h1>
                Welcome back
                <br />
                {username}!
              </h1>
              <button className="edit-button" onClick={handleEditClick}>
                Edit Name
              </button>
            </>
          ) : (
            <EditUsernameForm
              currentUsername={username}
              onCancel={handleCancelEdit}
              onSave={handleSaveUsername}
            />
          )}
        </div>

        <h2 className="sr-only">Accounts</h2>
        {[
          {
            title: 'Argent Bank Checking (x8349)',
            amount: '$2,082.79',
            description: 'Available Balance'
          },
          {
            title: 'Argent Bank Savings (x6712)',
            amount: '$10,928.42',
            description: 'Available Balance'
          },
          {
            title: 'Argent Bank Credit Card (x8349)',
            amount: '$184.30',
            description: 'Current Balance'
          }
        ].map((account, index) => (
          <section className="account" key={index}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button">View transactions</button>
            </div>
          </section>
        ))}
      </main>
    </>
  );
};

export default User;