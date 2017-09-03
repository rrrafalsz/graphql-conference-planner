import React, {Component} from "react";
import {gql} from 'react-apollo';
import {waitForGraphql} from '../../apollo';
import SpeakerOverview from '../speaker/SpeakerOverview';
import Company from '../Company';
import Sponsors from '../Sponsors';
import TalkOverview from '../talk/TalkOverview';
import ConferenceOverview from './ConferenceOverview';
import {divideInRows} from '../../utils/index';

class ConferenceDetails extends Component {
  render() {
    const {
      data: {
        conference: {
          name,
          city,
          description,
          _attendeesMeta: {count: attendeesCount},
          _sponsorsMeta: {count: sponsorsCount},
          talks,
          sponsors
        }
      }
    } =  this.props;
    return <div>
      <div className="section product-header">
        <div className="container">
          <div className="columns">
            <div className="column">
            <span className="title is-3">
              {name}
            </span>
              <span className="title is-3 has-text-muted">&nbsp;|&nbsp;</span>
              <span className="title is-4 has-text-muted">
              {city}
            </span>
            </div>
          </div>
        </div>
      </div>
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <nav className="level is-mobile">
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Speakers</p>
                    <p className="title">{
                      talks.reduce((acc, talk) =>
                        acc + (talk.speaker ? 1 : 0)
                      , 0)
                    }</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Attendees</p>
                    <p className="title">{attendeesCount}</p>
                  </div>
                </div>
                <div className="level-item has-text-centered">
                  <div>
                    <p className="heading">Sponsors</p>
                    <p className="title">{sponsorsCount}</p>
                  </div>
                </div>
              </nav>
              <p className="title is-3 has-text-muted">
                {description}
              </p>
              <hr/>
              <p className="title is-4">
                Talks :
              </p>
                {
                  divideInRows(talks, talk =>
                    <div
                      className="column is-6"
                      key={talk.id}
                    >
                      <TalkOverview talk={talk}/>
                    </div>
                  , 2)
                }
              <hr />
              <p className="title is-4">
                Speakers :
              </p>
                {
                  divideInRows(talks, ({speaker}) =>
                    speaker &&
                    <div className="column is-3"
                          key={speaker.id}>
                      <SpeakerOverview
                        speaker={speaker}
                      />
                    </div>
                  )
                }
              <hr/>
              <p className="title is-4 is-spaced">
                Sponsors :
              </p>
              <p className="subtitle is-5">GOLD</p>
              <Sponsors sponsors={sponsors} type="GOLD"/>

              <p className="subtitle is-5">SILVER</p>
              <Sponsors sponsors={sponsors} type="SILVER"/>

              <p className="subtitle is-5">BRONZE</p>
              <Sponsors sponsors={sponsors} type="BRONZE"/>

            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
ConferenceDetails.defaultProps = {
  data: {
    conference: {
      name : '',
      city: '',
      description: '',
      _attendeesMeta: {count: 1},
      _sponsorsMeta: {count: 2},
      talks: [],
      sponsors: []
    }
  }
};

ConferenceDetails.fragments = {
  conferenceDetails: gql`
    fragment ConferenceDetails on Conference {
      ...ConferenceOverview
      description
      endDate
      website
    }

    ${ConferenceOverview.fragments.conference}
  `
};

// TODO write the query to get the details of a conference
// Use the above fragment in you query
//  (the id should be required)
//  alias the query, call it conference
//  You should only use fragments in the query on each Type!
const query = undefined;

//TODO the query needs the variable id
const config = {};

export default ConferenceDetails;