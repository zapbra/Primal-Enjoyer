import React, { useState } from "react";
import styled from "styled-components";
import { nanoid } from "nanoid";
import SectionIcon from "./SectionIcon";
import ArticleTitle from "./ArticleTitle";
import Youtube from "react-youtube";
import COLORS from "../../../data/colors";

const Container = styled.div`
  p {
    margin-bottom: 1rem;
  }
  li {
    margin-bottom: 0.5rem;
    list-style: none;
  }
  li::before {
    content: "•";
    color: ${(props) => props.colors.green};
    display: inline-block;
    width: 1em;
    margin-left: 1rem;
  }
`;
const Header = styled.div`
  background-color: ${(props) => props.colors.ultraLightBlue};
  padding: 2rem 0;
  position: relative;
`;

const SelectCont = styled.div`
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2rem;
`;

const ArticlesCont = styled.div`
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
  .text-content {
    border: 1px solid ${(props) => props.colors.darkBlue};
  }
`;

const Article = styled.article`
  .article-text {
    width: 100%;
    background-color: ${(props) => props.colors.veryLightBlue};
    padding: 1rem;
    border: 1px solid ${(props) => props.colors.darkBlue};
  }
  .flex-column {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const Cont = styled.div``;

const Index = ({ data }) => {
  const sections = [
    { title: 'Read "We Want To Live"', index: "1", link: "#one" },
    { title: "Listen To The Workshop", index: "2", link: "#two" },
    { title: "Listen To One Q&A (Optional)", index: "3", link: "#three" },
    { title: "Find Farms or Butchers Near You", index: "4", link: "#four" },
    { title: "Time To Eat Raw Meat", index: "5", link: "#five" },
  ];
  const SectionElems = sections.map((section) => {
    return (
      <SectionIcon
        key={nanoid()}
        title={section.title}
        index={section.index}
        link={section.link}
      />
    );
  });

  const [ytElems, setYtElems] = useState(() => {
    return data.items.map((item, index) => {
      const { id, snippet = {} } = item;
      const { title, thumbnails = {}, resourceId } = snippet;
      const { medium = {} } = thumbnails;
      return (
        <div key={id} className="video-preview">
          <a
            target="_blank"
            rel="noreferrer noopener"
            href={`https://www.youtube.com/watch?v=${resourceId.videoId}`}
          >
            <img width={medium.width} height={medium.height} src={medium.url} />
          </a>
          <h3>
            {title} #{index + 1}
          </h3>
        </div>
      );
    });
  });

  return (
    <Container className="section" colors={COLORS}>
      <Header colors={COLORS} className="sm-spacer">
        <h2>How Can You Start?</h2>
      </Header>
      <SelectCont className="md-spacer">{SectionElems}</SelectCont>
      <ArticlesCont colors={COLORS}>
        <Article id="one" className="sm-spacer" colors={COLORS}>
          <ArticleTitle
            title='Read "We Want To Live" '
            index="1"
          ></ArticleTitle>
          <div className="article-text">
            <p>
              Read The Full Book “We Want To Live” By Aajonus Vonderplanitz. I’m
              not providing it here, but feel free to buy it in hardcopy, online
              pdf or I’m sure you can find it online for free.
            </p>
          </div>
        </Article>
        {/* End of Article #1*/}

        <Article id="two" className="sm-spacer" colors={COLORS}>
          <ArticleTitle title="Listen To The Workshop" index="2" />
          <div className="article-text mar-bottom-one">
            <p>
              Listen to one of the workshops providing by Aajonus and listed
              here. It provides the basic introduction to the diet. It clarifies
              the theory behind raw meat, bacteria, and viruses.
            </p>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.youtube.com/watch?v=ZJbgJmXIxAo&list=PLA4-m0Jyxx3mHBv5fxOwmyWYton1z_4qk"
              className="link"
            >
              Aajonus School of Life On Youtube
            </a>
          </div>
          <div className="sm-spacer flex flex-column">{ytElems}</div>
        </Article>

        {/* End of Article #2*/}

        <Article id="three" colors={COLORS} className="sm-spacer">
          <ArticleTitle title="Listen To One Q&A" index="3" />
          <div className="article-text mar-bottom-one">
            <p>
              The question & answers go into more in depth questions, so it is
              optional for beginners. It is live recordings of Aajonus talking
              about specific health conditions and how to reverse them with diet
              alone and specific formulas.
            </p>
            <a
              rel="noreferrer"
              target="_blank"
              href="https://www.youtube.com/channel/UCdHSzt83x7LjGcdNTJu2LSA/videos"
              className="link"
            >
              Q&As On Youtube
            </a>
          </div>
          <div className="yt-holder">
            <Youtube
              videoId="6eEOgEch3q4"
              opts={{
                height: "390",
                width: "640",
                playerVars: { autoplay: 0 },
              }}
            />
          </div>
        </Article>
        {/* End of Article #3*/}

        <Article id="four" className="sm-spacer" colors={COLORS}>
          <ArticleTitle title="Find Farms or Butchers Near You" index="4" />
          <div className="article-text">
            <p>
              Depending on your country there are most likely some sort of
              online tool to find high quality grass fed farms or butchers. The
              only problem with buying from farms is it typically frozen. You
              may need to buy from butchers, or specific buying clubs to get
              fresh. You can still get high quality dairy from these farms.{" "}
            </p>
            <h5 className="mar-one">Questions You Should Ask Include</h5>
            <ul className="mar-one">
              <li>Is This Grass Fed/Organic?</li>
              <li>Was This Chicken Fed Soy?</li>
              <li>Do your animals recieve hormones/vaccines/dewormers?</li>
              <li>Do you have organs & bone marrow?</li>
            </ul>

            <h5 className="mar-one">Here Are Some Online Tools For The US</h5>
            <ul>
              <li>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.realmilk.com/raw-milk-finder/"
                  className="link"
                >
                  https://www.realmilk.com/raw-milk-finder/
                </a>
              </li>
              <li>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.eatwild.com/"
                  className="link"
                >
                  https://www.eatwild.com/
                </a>
              </li>
            </ul>
          </div>
        </Article>
        {/* End of Article #4*/}

        <Article id="five" colors={COLORS}>
          <ArticleTitle title="Time To Eat Raw Meat" index="5" />
          <div className="article-text">
            <p>
              I would personally suggest just diving right into your first raw
              meal. Here is a good steak tartare recipe{" "}
              <a rel="noreferrer" href="#" className="link">
                Dead Link
              </a>
              .
            </p>
            <h5 className="mar-one">
              Some foods which should be easy to get started with include...
            </h5>
            <ul className="mar-one">
              <li>
                Milkshakes (raw milk, eggs, honey, fruit (optional)){" "}
                <a rel="noreferrer" href="#" className="link">
                  Dead Link
                </a>
              </li>
              <li>
                Fresh red meat (feel free to put this sauce on it){" "}
                <a rel="noreferrer" href="#" className="link">
                  Dead Link
                </a>
              </li>
              <li>
                Raw Fish (try this recipe){" "}
                <a rel="noreferrer" href="#" className="link">
                  Dead Link
                </a>
              </li>
              <li> Oysters</li>
              <li>Raw Dairy (raw cheese, butter</li>
              <li>
                Ice Cream (try this recipe){" "}
                <a rel="noreferrer" href="#" className="link">
                  Dead Link
                </a>
              </li>
            </ul>
            <h5 className="mar-one">
              Some advanced foods you may not be ready for...
            </h5>
            <ul>
              <li>
                Rotten meat (liver is best, but may cause detox){" "}
                <a
                  rel="noreferrer"
                  target="_blank"
                  href="https://www.youtube.com/watch?v=fmMN3ZdPXXc&t=9s"
                  className="link"
                >
                  How To Make High Meat by Sv3rige
                </a>
              </li>
              <li>
                Organs (liver, brain, pancreas), which are good for repairing
                your own organs
              </li>
              <li>Raw Chicken</li>
              <li>Raw Pork (I was grossed out by this for awhile)</li>
              <li>
                Raw Eggs. Some people are grossed out by eggs for some reason,
                so you can start with egg yolks in your steak tartar, but whole
                eggs are recommended
              </li>
            </ul>
            <p>
              Eating raw meat can take awhile to get used to. Don’t feel bad if
              you aren’t quite used to it and end up cheating. Aajonus said,{" "}
              <em>
                ‘If you only eat one raw food in your whole life, you will be
                that much healthier”
              </em>
              . So, if you only eat 50% raw, you are still 50% more healthy.{" "}
            </p>
            <h5 className="mar-one">
              So, if you really still aren’t up for the whole raw meat thing.
              Feel free to slowly transition and here are some food ideas...
            </h5>
            <ul>
              <li>
                Rare cooked steak/hamburger (if you are used to eating it rare,
                raw isn't much different)
              </li>
              <li>Sushi/Sashimi</li>
              <li>
                Sourdough bread/potatoes/rice with lots of raw butter (Aajonus
                doesn't recommend grains anymore, but you may find this useful)
              </li>
              <li>Cheese/honey</li>
              <li>Anything with butter. I'll put three recipes below</li>
              <li>
                <a href="#" target="_blank" rel="noreferrer" className="link">
                  Dead Link
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noreferrer" className="link">
                  Dead Link
                </a>
              </li>
              <li>
                <a href="#" target="_blank" rel="noreferrer" className="link">
                  Dead Link
                </a>
              </li>
            </ul>
          </div>
        </Article>
        {/* End of Article #5*/}
      </ArticlesCont>
    </Container>
  );
};

export default Index;
