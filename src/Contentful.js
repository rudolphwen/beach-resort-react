// const contentful = require("contentful");
// const client = contentful.createClient({
//   // This is the space ID. A space is like a project folder in Contentful terms
//   space: "developer_bookshelf",
//   // This is the access token for this space. Normally you get both ID and the token in the Contentful web app
//   accessToken: "0b7f6x59a0"
// });

import { createClient } from 'contentful';

// console.log(process.env);

const client = createClient({
    space: process.env.REACT_APP_API_SPACE,
    accessToken: process.env.REACT_APP_ACCESS_TOKEN
});

export default client;