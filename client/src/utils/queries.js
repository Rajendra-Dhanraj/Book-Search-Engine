import gql from "graphql-tag";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      bookCount
      savedBooks {
        bookId
        title
        authors
        description
        image
        link
      }
    }
  }
`;

