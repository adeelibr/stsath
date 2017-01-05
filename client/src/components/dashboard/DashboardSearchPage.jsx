import React, {Component} from 'react';
// import { Link } from 'react-router';
//
// import RaisedButton from 'material-ui/RaisedButton';
// import TextField from 'material-ui/TextField';

import SearchForm from 'dashboard/components/SearchForm';
import Report from 'dashboard/components/Report';
import SearchQueryAPI from 'SearchQueryAPI';

import { RemoveToken } from 'Auth';

class DashboardSearchPage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      word: '',
      errors: {},
      show: false,
      info: {},
    };
  }

  changeInfo = (e) => {
    const word = e.target.value;
    this.setState({ word });
  }

  processForm = (e) => {
    let {word} = this.state;
    let {router} = this.props;
    e.preventDefault();

    SearchQueryAPI(word)
    .then((res) =>{
      if (!res.success) {

        if (res.errors.token) {
          RemoveToken();
          router.push('/login');
        }

        const errors = res.errors ? res.errors : {};
        errors.summary = res.message;
        this.setState({ errors });
      } else {
        this.setState({
          show: res.success,
          info: res,
          errors: {},
        });
        // console.log('Form is valid', res);
      }
    });
  }

  clearForm = () => {
    this.setState({
      word: '',
      errors: {},
      show: false,
      info: {},
    })
  }

  render () {
    let { word, errors } = this.state;
    let { show, info } = this.state;

    return (
      <div>
        <SearchForm
          onSubmit={this.processForm}
          onChange={this.changeInfo}
          errors={errors}
          word={word}
        />
      <Report
        show={show}
        data={info}
        clearForm={this.clearForm}
        generateReportPDF={this.generateReportPDF}
      />
      </div>
    );
  }

}

export default DashboardSearchPage;
