import React from 'react';

const Spinner = () => {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div className="relative w-16 h-16">
        {/* Outer ring - using foreground color with opacity */}
        <div 
          className="absolute w-16 h-16 rounded-full animate-spin"
          style={{
            border: '4px solid transparent',
            borderTopColor: 'var(--foreground)',
            borderRightColor: 'var(--foreground)',
            opacity: '0.8'
          }}
        />
        
        {/* Inner ring - using foreground color with lower opacity */}
        <div 
          className="absolute w-10 h-10 m-3 rounded-full animate-spin-reverse"
          style={{
            border: '4px solid transparent',
            borderTopColor: 'var(--foreground)',
            borderRightColor: 'var(--foreground)',
            opacity: '0.5'
          }}
        />
        
        {/* Center dot - using foreground color */}
        <div 
          className="absolute w-4 h-4 rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            backgroundColor: 'var(--foreground)',
            opacity: '0.9'
          }}
        />
      </div>
      
      {/* Loading text - inherits theme text color automatically */}
      <span className="ml-3 text-lg font-medium">Loading...</span>
    </div>
  );
};

// Add keyframes for reverse spin if not already in your CSS
const styles = `
@keyframes spin-reverse {
  from {
    transform: rotate(360deg);
  }
  to {
    transform: rotate(0deg);
  }
}

.animate-spin-reverse {
  animation: spin-reverse 1s linear infinite;
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
}

export default Spinner;