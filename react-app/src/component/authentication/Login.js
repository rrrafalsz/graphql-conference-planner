import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {errorPropsConfig, validateLoginForm} from '../../utils/index';
import {gql, graphql} from 'react-apollo';
import { Form, Text } from 'react-form';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userNotFound: false,
    };
  }

  onSubmit = (values) => {
    this.props.mutate({
      variables: values
    })
      .then((re) => {
        this.setState({
          userNotFound: false,
        });
        localStorage.setItem('userName', values.email);
        this.props.history.push('/');
      })
      .catch(err => {
        this.setState({
          userNotFound: true
        });
      })
  };

  render() {
    return <div className="section">
      <div className="container">
        <div className="columns is-vcentered">
          <div className="column is-4 is-offset-4">
            <h1 className="title">
              Sign in
            </h1>
            <Form
              onSubmit={this.onSubmit}
              validate={validateLoginForm}
              className="box"
            >
              {
                ({submitForm}) =>
                  <form
                    onSubmit={submitForm}
                    noValidate
                  >
                    <label className="label">Email*</label>
                    <div className="control">
                      <Text
                        field="email"
                        type="email"
                        placeholder="jsmith@example.org"
                        className="input"
                        errorProps={errorPropsConfig}
                      />
                    </div>
                    <label className="label">Password*</label>
                    <div className="control">
                      <Text
                        field="password"
                        className="input"
                        type="password"
                        placeholder="●●●●●●●"
                        errorProps={errorPropsConfig}
                      />
                    </div>
                    {
                      this.state.userNotFound && <p>
                        User not found
                      </p>
                    }

                    <hr/>

                    <p className="control">
                      <button
                        className="button is-outlined is-large is-fullwidth is-info"
                        type="submit"
                      >Login</button>
                    </p>
                  </form>
              }
            </Form>
            <p className="has-text-centered">
              <Link to="/authentication/register">Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>;
  }
}
Login.defaultProps ={
  mutate: () => alert('You are not logged in')
};

// TODO write a mutation to log the user
const mutation = undefined;

//use graphql HoC
export default Login;