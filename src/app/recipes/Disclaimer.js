import React from "react";
import styled from "styled-components";
import COLORS from "../../../data/colors";

const Cont = styled.div`
  padding: 32px;
`;

const Disclaimer = () => {
  return (
    <Cont colors={COLORS}>
      <h3 className="text-shadow mar-bottom-8">Disclaimer</h3>

      <div className="blue-line mar-bottom-8"></div>
      <p className="mar-bottom-32">
        There is still lots of work to be done, so please be patient.
      </p>
      <h4 className="mar-bottom-8">Photos</h4>
      <div className="grey-line mar-bottom-8"></div>
      <p className="mar-bottom-8">
        Many or nearly all of the photos are currently taken from the internet.
      </p>
      <p className="mar-bottom-8">
        I will actually have to make all of these recipes and take photos of
        them and update them as I go.
      </p>
      <p className="mar-bottom-8">
        So, I apologize for the non-specific photos, but they will be better
        soon. I promise.
      </p>

      <div className="mar-bottom-16"></div>
      <h4 className="mar-bottom-8">Algorithm</h4>
      <div className="grey-line mar-bottom-8"></div>

      <p className="mar-bottom-8">
        The search algorithm currently takes the search and splits it into
        seperate keywords.
      </p>
      <p className="mar-bottom-8">
        So, if you search "coconut cream", it turns into "coconut" and "cream".{" "}
      </p>
      <p className="mar-bottom-8">
        These two terms are completely seperate, so I suggest search "coconut".
      </p>
      <p className="mar-bottom-8">
        All of the recipes are searched for keywords in the titles and
        ingredients that include part of your search term.
      </p>
      <p className="mar-bottom-8">
        So, if you search "chick", every recipe that has "chicken" will become a
        match.
      </p>
      <p className="mar-bottom-8">
        But, if you search "chickens", it will not match "chicken".
      </p>
      <p className="mar-bottom-8">
        Additionally, the algorithm is currently reverse specific.
      </p>
      <p className="mar-bottom-8">
        What this means is every term you search increases the likelihood of a
        match
      </p>
      <p className="mar-bottom-8">
        If you have three search terms "beef" "meat" "sauce" ("beef meat
        sauce"), if any of those match, the recipe becomes a match and the more
        terms, the more matches.
      </p>
      <p>
        I know this seems backwards and I will probably change it. It would take
        only 1 minute.
      </p>
    </Cont>
  );
};

export default Disclaimer;
