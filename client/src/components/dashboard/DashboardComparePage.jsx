import React, {Component} from 'react';

import ChoiceForm from 'dashboard/components/ChoiceForm';
import ChoiceQueryAPI from 'ChoiceQueryAPI';

class DashboardComparePage extends Component {

  constructor (props) {
    super(props);
    this.state = {
      errors: {},
      words: {
        word1: '',
        word2: '',
      },
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

  render () {
    let { errors, words } = this.state;

    return (
      <div className="">
        <ChoiceForm
          onSubmit={this.processForm}
          onChange={this.changeInfo}
          errors={errors}
          words={words}
        />
      </div>
    );
  }

}

export default DashboardComparePage;
