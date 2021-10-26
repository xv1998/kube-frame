import React, { useContext } from 'react';
import GlobalContext from "../constants/GlobalContext";

const SubTitle = () => {
  const {title} = useContext(GlobalContext);
  return (
    <p>{title}</p>
  );
}

export default SubTitle;
