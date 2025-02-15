import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: '#1F2937',
      width: '100%',
      height: '10vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: 'white',
    }}>
      <p>&copy; {new Date().getFullYear()} Discover UofT. All rights reserved.</p>
    </footer>
  );
};

export default Footer;