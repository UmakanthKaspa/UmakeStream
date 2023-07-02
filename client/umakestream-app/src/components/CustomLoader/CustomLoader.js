import React from 'react';
import { TailSpin } from 'react-loader-spinner';
import './CustomLoader.css';

const CustomLoader = ({ width, height }) => {
  return (
    <div className="loader-container" style={{ width, height }}>
      <TailSpin
        color="#ff5722"
        height={80}
        width={80}
      />
    </div>
  );
};

export default CustomLoader;
