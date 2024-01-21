/* eslint-disable react/prop-types */

const CredentialsBar = ({ onLogout }) => {
  return (
    <div style={{ textAlign: 'right' }}>
        <button onClick={onLogout}>Log out</button>
    </div>
  );
};

export default CredentialsBar;
