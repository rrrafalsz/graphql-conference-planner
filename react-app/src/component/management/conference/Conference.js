import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {dateToInput, errorPropsConfig, validateConferenceForm} from '../../../utils/index';
import {SuccessModal} from '../../modal/index';
import {gql, graphql, compose} from 'react-apollo';
import ConferenceDetails from '../../conference/ConferenceDetails';
import {waitForGraphql} from '../../../apollo/index';
import { Form, Text } from 'react-form';

const hasNoIdParam = ({match: {params: {id}}}) => !id;


class Conference extends Component{
  constructor(props) {
    super(props);
    this.state = {
      defaultValues: hasNoIdParam(this.props) ? {} : {
        ...this.props.data.conference,
        website: this.props.data.conference.website || '',
        startDate: dateToInput(this.props.data.conference.startDate),
        endDate: dateToInput(this.props.data.conference.endDate)
      },
      showSuccessModel: false,
    };
  }

  dateInputToDate(dateInput) {
    return dateInput ? new Date(dateInput.slice(-4), dateInput.slice(3, 5), dateInput.slice(0, 2)) : '';
  }

  submitConference = (values) => {
    const method = hasNoIdParam(this.props) ? 'addConference' : 'updateConference';
      this.props[method]({
      variables: {
        ...values,
        startDate: this.dateInputToDate(values.startDate),
        endDate: this.dateInputToDate(values.endDate)
      }
    })
      .then(() => {
        if(hasNoIdParam(this.props)) {
          this.props.history.push('/secure/conferences');
        } else {
          this.setState({
            showSuccessModel: true,
          });
        }
      })
  };

  render() {
    return <div>
      <SuccessModal
        isVisible={this.state.showSuccessModel}
        hide={() => this.setState({
          showSuccessModel : false
        })}
        title="Success"
        text={`Your conference has successfully been ${hasNoIdParam(this.props) ? 'added' : 'updated'}`}
      />
      <div className="section product-header">
        <div className="container">
          <div className="columns">
            <div className="column">
            <span className="title is-3">
              Conferences
            </span>
              <span className="title is-3 has-text-muted">&nbsp;|&nbsp;</span>
              <span className="title is-4 has-text-muted">
              Management
            </span>
            </div>
          </div>
        </div>
      </div>
      <Form
        onSubmit={this.submitConference}
        validate={validateConferenceForm}
        defaultValues={this.state.defaultValues}
        className="box"
      >
        {
          ({submitForm}) =>
            <form
              noValidate
              onSubmit={submitForm}
            >
              <div className="section">
                <div className="container">
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">City*</label>
                        <div className="control">
                          <Text
                            className="input"
                            placeholder="Text input"
                            field="city"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Country iso-code*</label>
                        <span>Please choose a alpha-3 from : https://fr.wikipedia.org/wiki/ISO_3166-1</span>
                        <div className="control">
                          <Text
                            className="input"
                            type="text"
                            placeholder="Text input"
                            field="country"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Description*</label>
                        <div className="control">
                          <Text
                            className="input"
                            type="text"
                            placeholder="A cool description"
                            field="description"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Start date*</label>
                        <div className="control">
                          <Text
                            className="input"
                            type="text"
                            placeholder="01/01/2017"
                            field="startDate"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">End date*</label>
                        <div className="control">
                          <Text
                            className="input"
                            type="text"
                            placeholder="01/01/2017"
                            field="endDate"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Logo*</label>
                        <div className="control">
                          <Text
                            className="input"
                            type="text"
                            placeholder="http://image-google.png"
                            field="logo"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Name*</label>
                        <div className="control">
                          <Text
                            className="input"
                            type="text"
                            placeholder="My Conference"
                            field="name"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>
                      <div className="field">
                        <label className="label">Website</label>
                        <div className="control">
                          <Text
                            className="input"
                            type="text"
                            placeholder="http://my-website.com"
                            field="website"
                            errorProps={errorPropsConfig}
                          />
                        </div>
                      </div>

                      <div className="field is-grouped">
                        <p className="control">
                          <button
                            className="button is-primary"
                            type="submit"
                          >{
                            hasNoIdParam(this.props) ? <span>Add</span> : <span>Update</span>
                          }</button>
                        </p>
                        <p className="control">
                          <Link to="/secure/conferences" className="button is-link">Cancel</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
        }
      </Form>
    </div>;
  }
}

const addConference = gql`
  mutation addConference(
    $city: String!
    $country: String!
    $description: String!
    $endDate: DateTime!
    $logo: String!
    $name: String!
    $startDate: DateTime!
    $website: String
  ) {
      createConference(
          city: $city,
          country: $country,
          description: $description,
          endDate: $endDate,
          logo: $logo,
          name: $name,
          startDate: $startDate,
          website: $website
      ) {
          id
      }
  }
`;

const addConferenceConfig = {
};

const updateConference = undefined;
const updateConferenceConfig = {
};

const getConference = undefined;



const getConferenceConfig = undefined;


export default Conference;