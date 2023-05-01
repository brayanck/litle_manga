import { useState } from "react";

const useCount = (cant) => {
  const [count, setCount] = useState(1);

  function handleAdd() {
    if (count < cant) setCount(count+1);
  }

  function handleSubstract() {
    if(count>1)
    setCount(count-1 )
  }

  return {
    count,
    handleAdd,
    handleSubstract,
  };
};

export default useCount;