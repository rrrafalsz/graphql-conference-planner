import React, {Component} from 'react';
import {compose, gql, graphql} from 'react-apollo';
import {waitForGraphql} from '../../../apollo/index'; import TalkItem from './TalkItem';

class AddTalksOnConference extends Component {
  addTalk = (talkId, conferenceId) => {
    this.props.updateConference({
      variables: {
        talkIds: this.getPlannedTalks(
          this.props.getTalks.talks,
          conferenceId
        )
        .map(talk => talk.id)
        .concat(talkId),
        conferenceId
      }
    })
      .then(_ => {
        this.refetch();
      })
  };

  deleteTalk = (talkId, conferenceId) => {
    this.props.updateConference({
      variables: {
        talkIds: this.getPlannedTalks(
          this.props.getTalks.talks,
          conferenceId
        )
        .map(talk => talk.id)
        .filter(id => id !== talkId),
        conferenceId
      }
    })
      .then(_ => {
        this.refetch();
      })
  };

  refetch = () => {
    this.props.getTalks.refetch();
  };

  getPlannedTalks = (talks, conferenceId) => {
    return talks.filter(talk => {
      return talk.conferences && talk.conferences.some(({id}) => id === conferenceId);
    });
  };

  render() {
    const {
      getTalks: {
        talks
      },
      match: {
        params: {
          id: conferenceId
        }
      }
    } = this.props;

    const plannedTalks = this.getPlannedTalks(talks, conferenceId);

    return <div>
      <div className="section product-header">
        <div className="container">
          <div className="columns">
            <div className="column">
            <span className="title is-3">
              Talks
            </span>
              <span className="title is-3 has-text-muted">&nbsp;|&nbsp;</span>
              <span className="title is-4 has-text-muted">
            Management
            </span>
              <span className="title is-3 has-text-muted">&nbsp;|&nbsp;</span>
              <span className="title is-4 has-text-muted">
            Add or Remove talks on Conference
            </span>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column is-4 ">
              <nav className="panel">
                <p className="panel-heading">
                  Talk List
                </p>
                {
                  talks.map(talk =>
                    <TalkItem
                      key={talk.id}
                      attending={false}
                      talk={talk}
                      onClick={(talkId) =>
                        this.addTalk(talkId, conferenceId)
                      }
                    />
                  )
                }
              </nav>
            </div>
            <div className="column is-4 is-offset-2">
              <nav className="panel">
                <p className="panel-heading">
                  Conference Talks
                </p>
                {
                  plannedTalks.length > 0 ?
                    plannedTalks.map(talk =>
                      <TalkItem
                        key={talk.id}
                        attending={true}
                        talk={talk}
                        onClick={(talkId) => this.deleteTalk(talkId, conferenceId)}
                      />
                    )
                    :
                    <a className="panel-block">
                      No Talks yet on this conference
                    </a>
                }
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  }
}


const getTalks = undefined;

const updateConference = undefined;

const getTalksConfig = {
};

const updateConferenceConfig = {
};


export default AddTalksOnConference;