
#React 

## Before you get started

```bash
yarn
yarn start
```
your app will be running on port `3000

**Read the schema documentation hosted on graph.cool**:

```bash
cd schema/
yarn  
yarn start
```

### TODO
- You first have to create the apolloClient in apollo/index.js
- And enhance your app with ApolloProvider and give him the client


### 1. Basic queries: Get all conferences
- File: src/component/conference/Conferences.js
- What you will learn:
  - How the write a GraphQL query
  - Enhance a component with query data
  - Understand how data are passed in a component
- TODO
  - Write a query to fetch all conferences. 
  - Enhance the component with the waitForGraphql HoC

 ### 2. Basic queries: Conference details
- File: src/component/conference/ConferenceDetails.js
- What you will learn
  - Write a GraphQL query
  - Add variables to a query
  - GraphQL Fragments
- TODO
  - Write a GraphQL query that takes an id as param and uses fragments
  - Write a config that adds the conference id
  - Add the PropTypes to the ConferenceOverView component
  

 ### 3. Basic mutations : Authentication
- Directory: src/component/authentication
- What yo will learn
  - GraphQL mutation
  - Understand how variables are passed in mutations
  - Understand how the mutation is available in your component
- TODO
  - Fix the Registration and login components
  - Write a basic mutation

 ### 4. Advanced queries PART 1
- Directory: src/component/management/talks
- What you will learn
  - Mixin mutations and queries in one component
  - Understand how you pass variables
  - Understand how apollo passes data in component
  - Understand pagination
  - Apollo caching
  - Apollo configuration in depth
- TODO
  - In the table 
    - Write a query to get the list of talks on a particular page
    - Write a mutation to delete a talk
  - In the update/add form
    - Write a mutation to update
    - Write a mutation to add
  - In the manage Talks
    - Manage the talks on a conference

 ### 4. Advanced queries PART 2
- Directory: src/component/management/conference
- What you will learn
  - Mixin mutations and queries in one component
  - Understand how you pass variables
  - Understand how apollo passes data in component
  - Understand pagination
  - Apollo caching
  - Apollo configuration in depth
- TODO
  - In the table 
    - Write a query to get the list of conferences on a particular page
    - Write a mutation to delete a conference
  - In the update/add form
    - Write a mutation to update
    - Write a mutation to add
  - In the manage Talks
    - Manage the speaker of the talk



## Backend

- Want to see how a schema is written in nodeJS?
- Add another apolloClient to your application with the schema you will create.
- This graphQL editor enables you to create your schema and use it in your app :
- https://launchpad.graphql.com/

- The uri of your schema will be visible in the black bottom part, once you save your project.

- The only thing you have to write now, it a chat application in each conference detail.

Good luck




