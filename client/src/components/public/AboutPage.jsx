import React from 'react';

import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';

class AboutPage extends React.Component {

  state = {
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    if (stepIndex < 2) {
      this.setState({stepIndex: stepIndex + 1});
    }
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  renderStepActions(step) {
    return (
      <div style={{margin: '12px 0'}}>
        {(step !== 2) && (<RaisedButton
          label="Next"
          disableTouchRipple={true}
          disableFocusRipple={true}
          primary={true}
          onTouchTap={this.handleNext}
          style={{marginRight: 12}}
        />)}
        {step > 0 && (
          <FlatButton
            label="Back"
            disableTouchRipple={true}
            disableFocusRipple={true}
            onTouchTap={this.handlePrev}
          />
        )}
      </div>
    );
  }

  render() {
    const {stepIndex} = this.state;

    return (
      <div className="row">
        <div className="col-md-2 col-sm-1"></div>

        <div className="col-md-4 col-sm-5">
          <Stepper
            activeStep={stepIndex}
            linear={false}
            orientation="vertical"
          >
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 0})}>
                About Us
              </StepButton>
              <StepContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                {this.renderStepActions(0)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 1})}>
                Motivation
              </StepButton>
              <StepContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                {this.renderStepActions(1)}
              </StepContent>
            </Step>
            <Step>
              <StepButton onTouchTap={() => this.setState({stepIndex: 2})}>
                Reason Behind STSATH
              </StepButton>
              <StepContent>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam, quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                  nulla pariatur. Excepteur sint occaecat cupidatat non proident,
                  sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                {this.renderStepActions(2)}
              </StepContent>
            </Step>
          </Stepper>
        </div>

        <div className="col-md-4 col-sm-5">
          <div className="author about-founder-info">
            <div className="">
              <img
                src="https://pbs.twimg.com/profile_images/799840359031459840/MOM03REc.jpg"
                className="img-responsive author-img"
              />
              <span className="author-title"><b>Adeel Imran</b></span>
            </div>
            <div className="content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
          <div className="author about-founder-info">
            <div className="">
              <img
                src="https://3.bp.blogspot.com/-WW-3QHLw2ZQ/WL_tdNPfjzI/AAAAAAAABFw/zHFjJeWTyeQV0jwjhJIMwcGvgq1Q-CcgwCLcB/s1600/15181309_1137270699674630_7944531667179951999_n.jpg"
                className="img-responsive author-img"
              />
            <span className="author-title"><b>Zaryab Feroz</b></span>
            </div>
            <div className="content">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                unknown printer took a galley of type and scrambled it to make a type specimen book.
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-2 col-sm-1"></div>
      </div>
    );
  }
}
export default AboutPage;
