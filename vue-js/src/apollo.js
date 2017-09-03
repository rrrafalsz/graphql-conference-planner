import Vue from 'vue'
import {ApolloClient, createNetworkInterface} from 'apollo-client'
import VueApollo from 'vue-apollo';

// Create the apollo client
// uri to user : 'https://api.graph.cool/simple/v1/cj1ufizxi5lgy0109064uyi7i'
const client = new ApolloClient();

const messageClient = new ApolloClient();

export function provideClients() {
  return {
    defaultClient: client,
    messageClient
  };
}
