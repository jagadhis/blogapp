// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { GraphQLClient, gql } from "graphql";
const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT;
const { name, email, slug, comment } = req.body;
export default function comments(req, res) {
  const graphQLClient = new GraphQLClient(graphqlAPI, {
    header: {
      authorization: `bearer${process.env.GRAPHCMS_TOKEN}`,
    },
  });
  const query = gql`
    mutation createComment(
      $name: String!
      $email: String!
      $comment: String!
      $slug: String!
    ) {
      createComment(
        data: {
          name: $name
          email: $email
          comment: $comment
          post: { connect: { slug: $slug } }
        }
      )
    }
  `;
  const result = await graphQLClient.request(query, req.body);

  return res.status(200).send(result);
}
