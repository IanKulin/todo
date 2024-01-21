/* eslint-disable react/prop-types */
import "./styles.css";

const CredentialsBar = ({ onLogout, user }) => {
  return (
    <div style={{ textAlign: 'right' }}>
        {user} <button onClick={onLogout}>Log out</button>
    </div>
  );
};

export default CredentialsBar;
