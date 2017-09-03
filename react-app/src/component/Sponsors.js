import React from 'react';
import {gql} from 'react-apollo';
import Company from './Company';


const Sponsors = ({sponsors, type: searchType}) => {
return <div>
  {
    sponsors
      .filter(({type}) => type === searchType)
      .map(({company}) => {
        return <Company
          key={company.id}
          company={company}/>
      })
  }
</div>
};

Sponsors.fragments = {
  sponsor: gql`
      ${Company.fragments.company}
      
      fragment SponsorDetails on Sponsor {
          type
          company {
              ...CompanyDetails
          }
      }
  `
};

export default Sponsors;