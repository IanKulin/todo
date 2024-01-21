/* eslint-disable react/prop-types */
import pb from "../services/pocketbase.js";

const CredentialsBar = ({ onLogout }) => {
  return (
    <div style={{ textAlign: 'right' }}>
        <button onClick={onLogout}>Log out</button>
    </div>
  );
};

export default CredentialsBar;
