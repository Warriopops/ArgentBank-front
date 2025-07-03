import { useState } from 'react';
import './User.css';
import EditUsernameForm from '../../components/EditUsername/EditUsername';
import { useSelector } from 'react-redux';
import accountsData from '../../data/account.json';

const User = () => {
  const userName = useSelector(state => state.userReducer.userName);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="main bg-dark">
      <div className="header">
        {!isEditing ? (
          <>
            <h1>
              Welcome back<br />
              {userName}
            </h1>
            <button className="edit-button" onClick={() => setIsEditing(true)}>
              Edit Name
            </button>
          </>
        ) : (
          <EditUsernameForm
            currentUsername={userName}
            onCancel={() => setIsEditing(false)}
            onSave={() => setIsEditing(false)}
          />
        )}
      </div>
      <h2 className="sr-only">Accounts</h2>
      {accountsData.map((account, index) => (
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
  );
};

export default User;