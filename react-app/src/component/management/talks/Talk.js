import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {errorPropsConfig, timeToInput, validateTalkForm} from '../../../utils/index';
import {SuccessModal} from '../../modal/index';
import {gql, graphql, compose} from 'react-apollo';
import {waitForGraphql} from '../../../apollo/index';
import TalkOverview from '../../talk/TalkOverview';
import { Form, Text } from 'react-form';

const hasNoIdParam = ({match: {params: {id}}}) => !id;

class Talk extends Component{
  constructor(props) {
    super(props);

    this.state = {
      defaultValues: hasNoIdParam(this.props) ? {} : {
        ...this.props.getTalk.talk,
        room: this.props.getTalk.talk.room || '',
        startsAt: timeToInput(this.props.getTalk.talk.startsAt)
      },
      showSuccessModel: false
    };
  }

  submitTalk = (values) => {
    const method = hasNoIdParam(this.props) ? 'addTalk' : 'updateTalk';
    this.props[method]({
      variables: {
        ...values,
        room: values.room || '',
        startsAt: new Date(1990, 1, 1,  values.startsAt.slice(0, values.startsAt.indexOf(':')),
          values.startsAt.slice(values.startsAt.indexOf(':') + 1))
      }
    })
    .then(() => {
      this.setState({
        showSuccessModel: true,
      });
      if(hasNoIdParam(this.props)) {
        this.props.history.push('/secure/talks');
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
        text={`Your talk has successfully been ${hasNoIdParam(this.props) ? 'added' : 'updated'}`}
      />
      <div className="section product-header">
        <div className="container">
          <div className="columns">
            <div className="column">
            <span className="title is-3">
              Talk
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
        onSubmit={this.submitTalk}
        validate={validateTalkForm}
        defaultValues={this.state.defaultValues}
        className="section"
      >
        {
          ({submitForm}) =>
            <form
              onSubmit={submitForm}
              noValidate
            >
              <div className="container">
                <div className="columns">
                  <div className="column">

                    <div className="field">
                      <label className="label">Title*</label>
                      <div className="control">
                        <Text
                          className="input"
                          type="text"
                          placeholder="Super talk"
                          field="title"
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
                          placeholder="I will do this and that"
                          field="description"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Room</label>
                      <div className="control">
                        <Text
                          className="input"
                          type="text"
                          placeholder="12A"
                          field="room"
                          errorProps={errorPropsConfig}
                        />
                      </div>
                    </div>

                    <div className="field">
                      <label className="label">Starts at*</label>
                      <div className="control">
                        <Text
                          className="input"
                          type="text"
                          placeholder="12:00"
                          field="startsAt"
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
                        <Link to="/secure/talks" className="button is-link">Cancel</Link>
                      </p>
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

// TODO
const addTalk = undefined;

// TODO
const addTalkConfig = {}

// TODO
const updateTalk = undefined;

// TODO
const updateTalkConfig = {}

// TODO
const getTalk = undefined;

// TODO
const getTalkConfig = {};

// TODO
export default Talk;