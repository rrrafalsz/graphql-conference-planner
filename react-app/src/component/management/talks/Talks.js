import React, {Component} from 'react';

import {gql, compose, graphql} from 'react-apollo';
import {waitForGraphql} from '../../../apollo/index';
import Navigation from '../../table/navigation';
import Header from '../Header';
import Table from '../../table/Table';
import TalkOverview from '../../talk/TalkOverview';
import TalkRow from './TalkRow';


class Talks extends Component {
  render() {
    const {
      amountPerPage,
      pageNumber,
      navigateToPage,
      deleteItem,
      getTalks,
      deleteTalk
    } = this.props;

    const labels = ['ID', 'title', 'Room', 'Starts At'];

    const {
      talks,
      _allTalksMeta: {
        count: total
      }
    } = getTalks;

    return <div>
      <Header
        title="Talks"
        addLink="/secure/talk"
      />
      <div className="section">
        <div className="container">
          <div className="columns">
            <div className="column">
              <Table
                labels={labels}
              >
                {
                  talks.map(talk =>
                    <TalkRow
                      key={talk.id}
                      talk={talk}
                      deleteTalk={(talkId) =>
                        deleteItem(talkId, deleteTalk, getTalks)}
                    />
                  )
                }
              </Table>
              <Navigation
                total={total}
                amountPerPage={amountPerPage}
                pageNumber={pageNumber}
                page={(pageNumber) => navigateToPage(pageNumber, getTalks)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>;
  }
}

Talks.defaultProps = {
  amountPerPage: 1,
  pageNumber: 1,
  navigateToPage: 1,
  deleteItem: () => {},
  getTalks: {
    talks : [],
    _allTalksMeta: {
      count: 1
    }
  },
  deleteTalk: () => {}
};

// TODO
const getTalks = undefined;
// TODO
const deleteTalk = undefined;

// TODO
const getTalksConfig = {};

// TODO
const deleteTalkConfig = {};

// TODO
export default Talks;