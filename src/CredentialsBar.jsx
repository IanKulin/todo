/* eslint-disable react/prop-types */
import "./styles.css";

const CredentialsBar = ({ onLogout }) => {
  return (
    <div style={{ textAlign: 'right' }}>
        <button onClick={onLogout}>Log out</button>
    </div>
  );
};

export default CredentialsBar;
