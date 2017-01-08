import React, {Component} from 'react';

import Report from 'dashboard/components/compare/Report';
import ChoiceForm from 'dashboard/components/compare/ChoiceForm';
import ChoiceQueryAPI from 'ChoiceQueryAPI';
import { RemoveToken } from 'Auth';

class DashboardComparePage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      words: {
        word1: '',
        word2: '',
      },
      info: {},
      show: false,
    };
  }

  processForm = (e) => {
    let {words} = this.state;
    // let {router} = this.props;
    e.preventDefault();

    // console.log(words)
    ChoiceQueryAPI(words)
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
        console.log(res);
      }
    });
  }

  changeInfo = (e) => {
    const field = e.target.name;
    const words = this.state.words;
    words[field] = e.target.value;
    this.setState({ words });
  }

  clearForm = () => {
    this.setState({
      words: { word1: '', word2: '' },
      errors: {},
      show: false,
      info: {},
    })
  }

  render () {
    let { errors, words, info, show } = this.state;

    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <ChoiceForm
              onSubmit={this.processForm}
              onChange={this.changeInfo}
              errors={errors}
              words={words}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 col-sm-6">
            <Report
              show={show}
              data={info}
              section={1}
              clearForm={this.clearForm}
            />
          </div>
          <div className="col-md-6 col-sm-6">
            <Report
              show={show}
              data={info}
              section={2}
              clearForm={this.clearForm}
            />
          </div>
        </div>

      </div>
    );
  }

}

export default DashboardComparePage;
