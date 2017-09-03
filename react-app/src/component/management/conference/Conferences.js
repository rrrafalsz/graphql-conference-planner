import React, {Component} from 'react';

import ConferenceRow from './ConferenceRow';
import {gql, compose, graphql} from 'react-apollo';
import ConferenceOverview from '../../conference/ConferenceOverview';
import {waitForGraphql} from '../../../apollo/index';
import Navigation from '../../table/navigation';
import Header from '../Header';
import Table from '../../table/Table';


class Conferences extends Component {
  render() {
    const {
      getConferences,
      deleteConference,
      amountPerPage,
      pageNumber,
      navigateToPage,
      deleteItem
    } = this.props;

    const labels = ['ID', 'Name', 'City', 'Country', 'Start Date'];
    const {
      conferences,
      _allConferencesMeta: {
        count: total
      }
    } = getConferences;
    return <div>
      <Header
        title="Conferences"
        addLink="/secure/conference"
      />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Table
                labels={labels}
              >
                {
                  conferences.map(conference =>
                    <ConferenceRow
                      key={conference.id}
                      conference={conference}
                      deleteConference={(conferenceId) =>
                        deleteItem(conferenceId, deleteConference, getConferences)}
                    />
                  )
                }
              </Table>
              <Navigation
                total={total}
                amountPerPage={amountPerPage}
                pageNumber={pageNumber}
                page={(pageNumber) => navigateToPage(pageNumber, getConferences)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}
Conferences.defaultProps = {
  getConferences: {
    conferences: [],
    _allConferencesMeta: {
      count: 1
    }
  },
  deleteConference: () => {},
  amountPerPage: 1,
  pageNumber: 1,
  navigateToPage: () => {},
  deleteItem: () =>  {}
};

const getConferences = undefined;

const deleteConference = undefined;


const getConferencesConfig = {
};

const deleteConferenceConfig = { };


export default Conferences;