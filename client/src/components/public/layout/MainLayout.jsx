import React from 'react';
import Navigation from 'public/common/Navigation';

let MainLayout = (props) => {
  return (
    <div>
      <Navigation />
      <div className="container-fluid">
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
