import {ApolloClient, createNetworkInterface} from 'apollo-client';


// by default, this client will send queries to `/graphql` (relative to the URL of your app)
const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: 'https://api.graph.cool/simple/v1/cj1ufizxi5lgy0109064uyi7i'
  }),
});


const messageClient = new ApolloClient();


export function provideClients() {
  return {
    default: client,
    messageClient
  };
}


