import React from 'react';
import {gql} from 'react-apollo';
import {waitForGraphql} from '../../apollo/index';
import TalkOverview from './TalkOverview';
import Speaker from '../speaker/SpeakerOverview';

const TalkDetails = ({data: {
  Talk: {
    title,
    room,
    startsAt,
    description,
    speaker
  }
}
}) => {
  const hour = `${new Date(startsAt).getHours()}:${new Date(startsAt).getMinutes()}`;
 return <div>
   <div className="section product-header">
     <div className="container">
       <div className="columns">
         <div className="column">
            <span className="title is-3">
              {title}
            </span>
         </div>
       </div>
       <div className="columns">
         <div className="column">
           <span className="subtitle is-6">Room: {room}</span>
           <span className="subtitle is-6 has-text-muted">&nbsp;|&nbsp;</span>
           <span className="subtitle is-6">Start at: {hour}</span>
         </div>
       </div>
     </div>
   </div>

   <div className="section">
     <div className="container">
       <div className="columns">
         <div className="column">
           <p className="title is-4 has-text-muted">
             {description}
           </p>
           <hr/>
           <p className="title is-4">
             Speaker :
           </p>
           <div className="columns">
             <div className="column is-3">
               {
                speaker && <Speaker speaker={speaker}/>
               }
             </div>
           </div>
         </div>
       </div>
     </div>
   </div>
 </div>;
};

const query = gql`
  query getTalkById($id: ID!) {
      Talk(id: $id) {
          ...TalkOverview
          speaker{
              ...Speaker
          }
          
      }
  }
  
  ${TalkOverview.fragments.talk}
  ${Speaker.fragments.speaker}
`;

const config = {
  options: ({match: {params: {id}}}) => ({
    variables: {
      id
    },
    fetchPolicy: 'cache-and-network'
  })
};
const TalkDetailsData = waitForGraphql(query, config)(TalkDetails);

export default TalkDetailsData;