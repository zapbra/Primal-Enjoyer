import {gql, GraphQLClient} from "graphql-request";
import Render from "./Render";
import {cache} from 'react';
import {graphQLRequestWithDelay, throttledRequest} from "../../../../lib/Fetching";
import {DotNetApi} from "../../../../utils/classes/DotNetApi/DotNetApi";
import {headers} from 'next/headers';

export async function generateMetadata({params, searchParams}, parent) {
    // get page url
    let {slug} = params;
    slug = decodeURIComponent(slug);
    const article = await getArticle(slug);

    return {
        title: slug,
        description: "Aajonus Vonderplanitz raw primal diet blog related to " + slug,
        openGraph: {
            images: [
                {
                    url: article?.coverImage?.url
                }
            ]
        }
    }


}

// Used to remove duplicate calls for the same function
// Not used right not because second function requests additional article fields
const getArticle = cache(async (title) => {
    // fetch data from graphql
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            Authorization: process.env.GRAPH_CMS_TOKEN,
        },
    });

    const query = gql`
    query ($slug: String!) {
      article(where: { title: $slug }) {
        coverImage {
          url
        }
        aajonusCatagory {
          title
        }
        
        tags(first: 10) {
          text
        }
        
      }
      
      }
  `;
    const variables = {
        slug: title,
    };

    const data = await graphQLClient.request(query, variables);
    const article = data.article;

    return article;
});


export async function generateStaticParams() {
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
        header: {
            Authorization: process.env.GRAPH_CMS_TOKEN,
        },
    });
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
    const data = await graphQLClient.request(query);
    const firstArticles = data.articles;
    const secondArticles = data.moreArticles;
    const articlesFetch = [...firstArticles, ...secondArticles];


    return articlesFetch.map((article) => ({
        slug: article.title.toString(),
    }));
}

const Page = async ({params}) => {
    const header = headers();
    const pathname = header.get('next-url');

    let {slug} = params;
    slug = decodeURIComponent(slug);
    const url = process.env.ENDPOINT;
    const graphQLClient = new GraphQLClient(url, {
        headers: {
            Authorization: process.env.GRAPH_CMS_TOKEN,
        },
    });

    const query = gql`
    query ($slug: String!) {
      article(where: { title: $slug }) {
        title
        coverImage {
          url
        }
        aajonusCatagory {
          title
        }
        audio {
          url
        }
        tags(first: 10) {
          text
        }
        content {
          raw
        }
      }
    }
  `;
    const variables = {
        slug,
    };


    const data = await graphQLClient.request(query, variables);
    const article = data?.article;

    // Server logs to see if article fetched properly.
    if (article == null) {
        await DotNetApi.writeLog(pathname, "Article is null. Failed to fetch article");
    } else {
        await DotNetApi.writeLog(pathname, "Successfully visited article.");
    }

    return (
        <div>
            <Render article={article} slug={slug}/>
        </div>
    );
};

export default Page;
