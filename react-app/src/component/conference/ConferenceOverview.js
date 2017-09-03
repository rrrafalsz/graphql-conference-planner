import React from 'react';
import {Link} from 'react-router-dom';
import {gql} from 'react-apollo';
import {propType} from 'graphql-anywhere';

const ConferenceOverview = (
  {
    conference: {id, startDate, name, logo, _attendeesMeta: {count}, city, country}
  }) => {
 return <Link to={`/conference/${id}`} className="card">
   <header className="card-header">
     <p className="card-header-title">
       <img src={`https://restcountries.eu/data/${country && country.toLowerCase()}.svg`} className="avatar" alt="Conference country"/>
       {name}
     </p>
     <span className="card-header-icon timestamp">
       {city}
      </span>
   </header>
   <div className="card-image">
     <figure className="image is-4by3">
       <img src={logo} alt="Conference logo"/>
     </figure>
   </div>
   <div className="card-content">
     <div className="panel-block-item">
      <span className="likes">
        <span className="icon">
          <i className="fa fa-calendar" />
        </span>
       {new Date(startDate).toLocaleDateString()}
      </span>
       <span className="comments">
          <span className="icon">
            <i className="fa  fa-users" />
          </span>
          {count} attendees
        </span>
     </div>
   </div>
 </Link>
};


ConferenceOverview.fragments = {
  conference: gql`
    fragment ConferenceOverview on Conference {
        id
        name
        city
        startDate
        logo
        country
        _attendeesMeta {
            count
        }
    }
  `
};

// TODO add propTypes with the above fragment
// Hint use propType from graphql-anywhere
ConferenceOverview.propTypes = {
};

export default ConferenceOverview;
