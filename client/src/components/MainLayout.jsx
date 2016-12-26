import React from 'react';
import Navigation from 'Navigation';

let Main = (props) => {
  return (
    <div className="fluid-container">
      <Navigation />
      {props.children}
    </div>
  );
};

export default Main;
