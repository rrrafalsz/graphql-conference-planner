import React from 'react';
import {propType} from 'graphql-anywhere';
import ConferenceOverview from '../../conference/ConferenceOverview';
import {Link} from 'react-router-dom';

const ConferenceRow = ({
  deleteConference,
  conference: {
    id,
    name,
    city,
    country,
    startDate,
    website
  }
}) => <tr>
  <th>{id}</th>
  <td>
    <a href={website || 'https://www.hackages.io/'} title="GraphQL Europe">
      {name}
    </a>
  </td>
  <td>{city}</td>
  <td>{country}</td>
  <td>{new Date(startDate).toLocaleDateString()}</td>
  <td>
    <Link
      className="button is-info is-outlined"
      to={`/secure/conference/${id}/talks`}
    >Manage talks</Link>
  </td>
  <td>
    <Link
      to={`/secure/conference/${id}`}
      className="button is-primary is-outlined"
    >Edit</Link>
  </td>
  <td>
    <a
      className="button is-danger is-outlined"
      onClick={() => deleteConference(id)}
    >Delete</a>
  </td>
</tr>;

ConferenceRow.propTypes = {
  conference: propType(ConferenceOverview.fragments.conference)
};


export default ConferenceRow;