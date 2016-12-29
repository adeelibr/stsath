import React from 'react';
import Navigation from 'public/common/Navigation';

let MainLayout = (props) => {
  return (
    <div>
      <Navigation />
      <div  className="container-fluid no-padding">
        {props.children}
      </div>
    </div>
  );
};

export default MainLayout;
