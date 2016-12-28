import React, {Component} from 'react';
import {Paper} from 'material-ui';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';

import IconLocationOn from 'material-ui/svg-icons/communication/location-on';
const nearbyIcon = <IconLocationOn />;

class Footer extends Component {

  state = {
    selectedIndex: 0,
  };

  select = (index) => this.setState({ selectedIndex: index });

  componentDidMount () {
    const height = document.getElementById('app').clientHeight;
    this.setState({ height });
  }

  render() {
    return (
      <Paper zDepth={1} style={{ marginTop: (((this.state.height)*2)-10) }}>
        <BottomNavigation selectedIndex={this.state.selectedIndex}>
          <BottomNavigationItem
            label="Recents"
            icon={nearbyIcon}
            onTouchTap={() => this.select(0)}
          />
          <BottomNavigationItem
            label="Favorites"
            icon={nearbyIcon}
            onTouchTap={() => this.select(1)}
          />
          <BottomNavigationItem
            label="Nearby"
            icon={nearbyIcon}
            onTouchTap={() => this.select(2)}
          />
        </BottomNavigation>
      </Paper>
    );
  }
}

export default Footer;
