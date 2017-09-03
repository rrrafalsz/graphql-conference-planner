import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {errorPropsConfig, validateRegisterForm} from '../../utils/index';
import {gql, graphql} from 'react-apollo';
import { Form, Text, Textarea } from 'react-form';

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      validation: {},
      data: {},
    };
  }

  submitRegistration = (values) => {
      const {passwordConfirmation, ...newUser} = values;
      this.props.mutate({
        variables: newUser
      })
      .then(() => {
          this.props.history.push('/authentication/login');
      })
  };

  render() {
    return <div className="section">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-4 is-offset-4">
            <h1 className="title">
              Register an Account
            </h1>
            <Form
              onSubmit={this.submitRegistration}
              validate={validateRegisterForm}
              className="box">
              {
                ({submitForm}) =>
                  <form
                    noValidate
                    onSubmit={submitForm}
                  >
                    <div className="box">
                      <label className="label">Username*</label>
                      <div className="control">
                        <Text
                          className="input"
                          field="username"
                          placeholder="jsmith"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                      <label className="label">Tweet handle*</label>
                      <div className="field has-addons">
                        <p className="control">
                          <a className="button is-static">
                            @
                          </a>
                        </p>
                        <div className="control">
                          <Text
                            className="input"
                            field="publicName"
                            placeholder="jsm"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <label className="label">Picture*</label>
                      <div className="control">
                        <Text
                          className="input"
                          field="picture"
                          type="text"
                          placeholder="https://graphql.org/image/lee-byron.jpg"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                      <label className="label">Email*</label>
                      <div className="control">
                        <Text
                          className="input"
                          type="email"
                          placeholder="jsmith@example.org"
                          field="email"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                      <hr/>
                      <label className="label">Password*</label>
                      <div className="control">
                        <Text
                          className="input"
                          type="password"
                          placeholder="●●●●●●●"
                          field="password"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                      <label className="label">Confirm Password*</label>
                      <div className="control">
                        <Text
                          className="input"
                          type="password"
                          placeholder="●●●●●●●"
                          field="passwordConfirmation"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                      <hr/>
                      <label className="label">Bio*</label>
                      <div className="control">
                        <Textarea
                          className="textarea"
                          placeholder="Say HI"
                          field="bio"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                      <hr/>
                      <div className="control">
                        <button
                          className="button is-outlined is-large is-fullwidth is-info"
                          type="submit"
                        >Register</button>
                      </div>
                    </div>
                  </form>
              }
            </Form>
            <div className="section forgot-password">
              <p className="has-text-centered">
                <Link to="/authentication/login">Login</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
Register.defaultProps = {
  mutate: () => alert('NOT THERE YET')
};

// TODO write a mutation to register a user
const mutation = undefined;

// TODO enhance the component with the mutation by using the graphql HoC
export default Register;