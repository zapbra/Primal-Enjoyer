import { GraphQLClient, gql } from "graphql-request";

export default async (req, res) => {
  const val = req.body;
  try {
    const url = process.env.GRAPH_CMS_ENDPOINT_2;
    const graphQLClient = new GraphQLClient(url, {
      header: {
        Authorization: process.env.GRAPH_CMS_TOKEN_2,
      },
    });

    const query = gql`
      mutation myMutation($val: String!) {
        publishWorkshop(where: { title: $val }) {
          title
        }
      }
    `;
    const variables = {
      val,
    };
    const data = await graphQLClient.request(query, variables);
    res.status(200).json({ body: data });
  } catch (error) {
    res.status(500).json({ body: error.message });
  }
};

/*

const query = gql`
      mutation name($val: String!) {
        createTag(data: { text: $val }) {
          text
          id
        }
      }
    `;
    */
/* mutation myMutation($val: String!) {
      createWorkshop(data: { title: $val }) {
        title
      }
    } */
