import React from 'react';
import { connect } from "react-redux";

const SubTitle = (props) => {
  const { title } = props;
  return (
    <p>{title}</p>
  );
}

export default connect((state) => ({
  ...state.basic
}))(SubTitle);