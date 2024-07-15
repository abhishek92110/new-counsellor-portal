import React, { useState } from 'react';
import LoadingBar from 'react-top-loading-bar';
import { HashLoader } from "react-spinners";

const BarLoading = () => {
  const [status, setStatus] = useState(false);

  return (
    
      <div className='pos-center'>
        <HashLoader color="#3c84b1" />
      </div>
    
  );
}

export default BarLoading;
