import React, { useState } from 'react';

const MainApp = () => {
  const [num, setNum] = useState(0);

  const changeNum = (num: number) => {
    setNum((prevNum) => prevNum + num);
  };

  return (
    <div className="columns-3">
      <button onClick={() => changeNum(-1)}>-</button>
      <h2 className="text-3xl font-bold underline text-cyan-800">{num}</h2>
      <button onClick={() => changeNum(1)}>+</button>
    </div>
  );
};

export default MainApp;
