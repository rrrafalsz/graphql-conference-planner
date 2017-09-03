import React from 'react';
import {gql} from 'react-apollo';
import {propType} from 'graphql-anywhere';

const Company = ({company: {
  description,
  logo,
  name
}}) => <div className="box">
  <article className="media">
    <div className="media-left">
      <figure className="image is-64x64">
        <img src={logo}
             alt={name}/>
      </figure>
    </div>
    <div className="media-content">
      <div className="content">
        <p>
          <strong>{name}</strong>
          <br/>
          {description}
        </p>
      </div>
    </div>
  </article>
</div>;

Company.fragments = {
  company: gql`
    fragment CompanyDetails on Company {
        id
        description
        logo
        name
    }
  `
};

Company.propTypes = {
  company: propType(Company.fragments.company)
};

export default Company;