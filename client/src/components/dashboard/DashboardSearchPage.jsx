import React, {Component} from 'react';
import { Link } from 'react-router';

import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class DashboardSearchPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      searchQuery: '',
    };
  }

  changeInfo = (e) => {
    const searchQuery = e.target.value;
    this.setState({ searchQuery });
  }

  render () {
    let { errors, searchQuery } = this.state;

    return (
      <div className="">
        <h3><SearchIcon /> Search</h3>
        <form action="/">

          <div className="row">
            <div className="col-md-10 col-sm-8">
              <TextField
                floatingLabelText="Search Tweets & Hashtags"
                name="search"
                onChange={this.changeInfo}
                errorText={errors.searchQuery}
                value={searchQuery}
                fullWidth={true}
              />
            </div>
            <div className="col-md-2 col-sm-4">
              <RaisedButton
                type="submit"
                label="Perform Sentiment"
                className="inline-form-button"
                primary={true}
                fullWidth={true}
              />
            </div>
          </div>

        </form>
      </div>
    );
  }

}

export default DashboardSearchPage;
