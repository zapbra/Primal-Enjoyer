import styled from "styled-components";
import COLORS from "../Data/colors";
import { gql, GraphQLClient } from "graphql-request";
import Resources from "../components/resources/Aajonus";
import FoodFinder from "../components/resources/FoodFinder";
import FoodForm from "../components/resources/FoodForm";
const Title = styled.div`
  padding: 5px 20px;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  background-color: ${(props) => props.colors.ultraLightBlue};
  margin-bottom: 2rem;
  display: inline-block;
  width: 100%;
`;

const Section = styled.div`
  max-width: 500px;
  table,
  th,
  td {
    border: 1px solid black;
  }
  td {
    padding-left: 5px;
  }
  table {
    width: 100%;
  }
  th {
    background-color: ${(props) => props.colors.ultraLightBlue};
  }
`;

export const getStaticProps = async () => {
  const url = process.env.ENDPOINT;
  const graphQLClient = new GraphQLClient(url, {
    header: {
      Authorization: process.env.GRAPH_CMS_TOKEN,
    },
  });

  const query = gql`
    query {
      foodLocations {
        title
        address
        website
        description
        hours
        subLocations {
          title
          address
        }
        country {
          title
        }
        state {
          title
        }
        city {
          title
        }
      }
    }
  `;
  const data = await graphQLClient.request(query);
  const foodLocations = data.foodLocations;
  return {
    props: {
      foodLocations,
    },
  };
};

const resources = ({ foodLocations }) => {
  console.log(foodLocations);
  return (
    <div className="container">
      <div className="main-title">
        <h1>Resources</h1>
      </div>
      <Resources colors={COLORS} />
      <div className="flex-break">
        <FoodFinder colors={COLORS} foodLocations={foodLocations} />
        <FoodForm colors={COLORS} />
      </div>
    </div>
  );
};

export default resources;
