import {gql, GraphQLClient} from "graphql-request";
import supabase from "../../utils/supabaseClient";
import {ArticleDAO} from "../../utils/classes/supabase/ArticleDAO";

export default async function sitemap() {
    // data object to fetch gql article
    const articleDAO = new ArticleDAO();

    const query = gql`
    query {
      articles(first: 1000) {
        title
      }
      moreArticles: articles(skip: 1000, first: 999) {
        title
      }
      aajonusCatagories(first: 1000) {
        title
      }
    }
  `;

    const data = await articleDAO.graphQLQuery(query);
    const firstArticles = data.articles;
    const secondArticles = data.moreArticles;
    const articlesFetch = [...firstArticles, ...secondArticles];
    const {data: postsFetch, error} = await supabase
        .from("post")
        .select("title");


    const posts = postsFetch.map((post) => {
        return {
            url: `https://www.primalenjoyer.com/blogs/${decodeURIComponent(post.title)}`,
            priority: 0.5,
            changeFrequency: 'never'
        };
    });
    const articles = articlesFetch.map((article) => {
        return {
            url: `https://www.primalenjoyer.com/article/${decodeURIComponent(article.title)}`,
            priority: 0.4,
            changeFrequency: 'never'
        };
    });
    const hardCodedRoutes = [
        {
            url: "https://www.primalenjoyer.com",
            priority: 1,
            changeFrequency: 'monthly',
        },
        {
            url: "https://www.primalenjoyer.com/search",
            priority: .8,
            changeFrequency: 'monthly',
        },
        {
            url: "https://www.primalenjoyer.com/articles",
            priority: .8,
            changeFrequency: 'monthly',
        },
        {
            url: "https://www.primalenjoyer.com/recipes",
            priority: .8,
            changeFrequency: 'monthly',
        },
        {
            url: "https://www.primalenjoyer.com/blogs",
            priority: .8,
            changeFrequency: 'monthly',
        },

        {
            url: "https://www.primalenjoyer.com/contact",
            priority: .8,
            changeFrequency: 'monthly',
        },

    ];

    return [...hardCodedRoutes, ...posts, ...articles];
}
