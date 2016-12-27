import React from 'react';
import Navigation from 'public/common/Navigation';

let MainLayout = (props) => {
  return (
    <div className="fluid-container">
      <Navigation />
      {props.children}
    </div> 
  );
};

export default MainLayout;
