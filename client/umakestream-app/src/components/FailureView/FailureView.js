import React from 'react';


const FailureView = ({ width, height,tryAgain }) => {
    const tryagain = ()=>{
        tryAgain()

    }
  return (
    <div
      style={{
        width,
        height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button onClick={tryagain}>Try Again</button>
    </div>
  );
};

export default FailureView;
