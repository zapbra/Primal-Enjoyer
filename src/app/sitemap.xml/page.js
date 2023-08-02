import { gql, GraphQLClient } from "graphql-request";
import supabase from "../utils/supabaseClient";
//pages/sitemap.xml.js

function generateSiteMap(articles, categories, posts) {
  return `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   
    <url>
      <loc>https://www.primalenjoyer.com/</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
    </url>
    <url>
      <loc>https://www.primalenjoyer.com/search</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/encyclopedia</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/polls</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/contact</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
   <url>
      <loc>https://www.primalenjoyer.com/createPost</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/categories</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/account</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/editAccount</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/signup</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>
  <url>
      <loc>https://www.primalenjoyer.com/login</loc>
      <priority>1.00 </priority>
      <changefreq>weekly</changefreq>
  </url>

  ${posts.map((post) => {
    return `
    <url>
    <loc> https://www.primalenjoyer.com/encyclopedia/${post.title.replaceAll(
      "&",
      "&amp;"
    )}</loc>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
    </url>
    `;
  })}
  ${categories.map((category) => {
    return `
    <url>
    <loc>https://www.primalenjoyer.com/Category/${category.title.replaceAll(
      "&",
      "&amp;"
    )} </loc>
    <priority>0.7</priority>
    <changefreq>weekly</changefreq>
    </url>
    `;
  })}

      ${articles
        .map((article) => {
          return `
    <url>
          <loc>https://www.primalenjoyer.com/article/${article.title.replaceAll(
            "&",
            "&amp;"
          )}</loc>
          <priority>0.7</priority>
          <changefreq>yearly</changefreq>
      </url>
    `;
        })
        .join("")}
  </urlset>
`;
}

export async function GET() {
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
      aajonusCatagories(first: 1000) {
        title
      }
    }
  `;

  const data = await graphQLClient.request(query);
  const firstArticles = data.articles;
  const secondArticles = data.moreArticles;
  const articlesFetch = [...firstArticles, ...secondArticles];
  const categories = data.aajonusCatagories;

  const { data: posts, error } = await supabase.from("post").select("title");
  const body = generateSiteMap(articlesFetch, categories, posts);

  return new Response(body, {
    status: 200,
    headers: {
      "Cache-control": "public, s-maxage=86400, stale-while-revalidate",
      "content-type": "application/xml",
    },
  });
}
