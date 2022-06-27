import React, { useEffect, useState } from "react";

const Counter = (props: any) => {
  const { countProps, setCountProps } = props;

  useEffect(() => {
    console.log("mounted and updated");
  }, []);

  const all = countProps + countProps * 2;

  const disabled = (count: number) => {
    if (count === 0) return true;
  };
  return (
    <div>
      <p>Total: {countProps}</p>
      <p>Total x2: {countProps * 2}</p>
      <p>Total All: {all}</p>
      <button
        onClick={() => setCountProps(countProps - 1)}
        disabled={disabled(countProps)}
      >
        -
      </button>
      <button onClick={() => setCountProps(countProps + 1)}>+</button>
    </div>
  );
};
export default Counter;
