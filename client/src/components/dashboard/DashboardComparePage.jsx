import React, {Component} from 'react';

import SearchIcon from 'material-ui/svg-icons/action/youtube-searched-for';

import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

class DashboardComparePage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      choice: {
        choice1: '',
        choice2: '',
      },
    };
  }

  changeInfo = (e) => {
    const field = e.target.name;
    const choice = this.state.choice;
    choice[field] = e.target.value;
    this.setState({ choice });
  }

  render () {
    let { errors, choice } = this.state;

    return (
      <div className="">
        <h3><SearchIcon /> Perfom Sentiment On Two Choices</h3>
        <form action="/">

          <div className="row">
            <div className="col-md-5 col-sm-4">
              <TextField
                floatingLabelText="Choice #2"
                name="choice1"
                onChange={this.changeInfo}
                errorText={errors.choice1}
                value={choice.choice1}
                fullWidth={true}
              />
            </div>

            <div className="col-md-5 col-sm-4">
              <TextField
                floatingLabelText="Choice #2"
                name="choice2"
                onChange={this.changeInfo}
                errorText={errors.choice2}
                value={choice.choice2}
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

export default DashboardComparePage;
