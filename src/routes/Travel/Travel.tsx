import React, { useState } from "react";
import styled from "styled-components";
import { Query } from "react-apollo";
import { CITYS } from "./TravelQuery";

const TravelContainer = styled.section`
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

interface NavProps {
  city: string;
}

const TravelNav = styled("nav")<NavProps>`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ city }) => {
    if (city === "tokyo") {
      return "linear-gradient(45deg, #c1d4ff, #ff83e9)";
    } else if (city === "hokkaido") {
      return "linear-gradient(45deg, #ffffff, #73b2ff)";
    }
  }};
`;

const TravelPhotoContainer = styled.main`
  height: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 3.5vw;
`;

const GridWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(3, 1fr);
`;

const PhotoContainer = styled.figure`
  width: 300px;
  height: 300px;

  & img {
    width: 100%;
    height: 100%;
  }
`;

function Travel() {
  const [cityName, setCityName] = useState("tokyo");
  return (
    <Query
      query={CITYS}
      notifyOnNetworkStatusChange={true}
      fetchPolicy={"cache-and-network"}
    >
      {({ loading, error, data }: any) => {
        if (loading) {
          return <div>loading...</div>;
        }
        if (error) {
          return <div>error</div>;
        }
        console.log(data);
        return (
          <div style={{ width: "200px", height: "200px" }}>
            {data.citys[0].photo[0].url}
          </div>
        );
      }}
    </Query>
  );
}

{
  // <TravelContainer>
  //         <TravelNav city={cityName}>
  //           <button
  //             onClick={() => setCityName("hokkaido")}
  //             style={{ width: "50px", height: "50px", background: "black" }}
  //           >
  //             도시선택
  //           </button>
  //         </TravelNav>
  //         <TravelPhotoContainer>
  //           <GridWrapper></GridWrapper>
  //         </TravelPhotoContainer>
  //       </TravelContainer>
}

export default Travel;