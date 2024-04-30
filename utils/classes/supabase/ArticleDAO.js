import {gql, GraphQLClient} from "graphql-request";

const GQL_ENDPOINT = process.env.ENDPOINT;

export class ArticleDAO {
    graphQLClient;

    constructor() {
        this.graphQLClient = new GraphQLClient(GQL_ENDPOINT, {
            headers: {
                Authorization: process.env.GRAPH_CMS_TOKEN,
            }
        });
    }

    async getAllArticleTitles() {
        const query = gql`
        query {
            articles(first: 1000) {
                title
        
            }

            moreArticles: articles(skip: 1000, first: 999) {
                title
            }
        }
        `;

        return await this.graphQLClient.request(query);
    }

    async graphQLQuery(query) {
        return await this.graphQLClient.request(query);
    }

}