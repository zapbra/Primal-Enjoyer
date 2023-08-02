import { GraphQLClient, gql } from "graphql-request";

export default async (req, res) => {
  const val = req.body;
  const newTitle = val.replaceAll("&", "and");

  try {
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
      header: {
        Authorization: process.env.GRAPH_CMS_TOKEN,
      },
    });

    const query = gql`
      mutation name($newTitle: String!) {
        publishArticle(where: { title: $newTitle }) {
          title
        }
      }
    `;
    const variables = {
      val,
      newTitle,
    };
    const data = await graphQLClient.request(query, variables);
    res.status(200).json({ body: JSON.stringify(data) });
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
    mutation name {
        updateArticle(where: { title: $val }, data: { title: $newTitle }) {
          title
          id
        }
      }
      mutation name($newTitle: String!){
  publishArticle(where:{title:$newTitle}){
    title
  }
}

 mutation name($val: String!, $newTitle: String!) {
        updateArticle(where: { title: $val }, data: { title: $newTitle }) {
          title
        }
      }
    */
