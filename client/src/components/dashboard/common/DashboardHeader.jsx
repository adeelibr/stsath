import React, {Component} from 'react';

import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';

class Sidebar extends Component {

  render() {
    let {handleToggle} = this.props;
    
    return (
      <div className="row">
        <div className="col-xs-8"></div>
        <div className="col-xs-3">
          <h4 className="text-right user-name-display">Hi, User</h4>
        </div>
        <div className="col-xs-1">
          <IconButton tooltip="SVG Icon" onClick={handleToggle}>
            <MenuIcon />
          </IconButton>
        </div>
        <hr/>
      </div>
    );
  }
}

export default Sidebar;
