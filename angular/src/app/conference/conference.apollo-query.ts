// We use the gql tag to parse our query string into a query document
import gql from 'graphql-tag';

export const AllConferencesQuery = gql`
query AllConferencesQuery {
  allConferences {
    id
    startDate
    country
    name
    city
    logo
    _attendeesMeta {
      count
    }
  }
}`;

export interface AllConferencesQueryResponse {
  allConferences;
  loading;
}


export const DetailedConferenceQuery = gql`
query DetailedConferenceQuery($conferenceId: ID!) {
  conference: Conference(id: $conferenceId) {
    id
    name
    city
    description
    attendeesCount: _attendeesMeta {
      count
    }
    sponsorsCount: _sponsorsMeta {
      count
    }
    talks {
      id
      description
      title
      room
      startsAt
      speaker {
        id
        picture
      }
    }
  }
}`;

export interface DetailedConferenceQueryResponse {
  conference;
  loading;
}
