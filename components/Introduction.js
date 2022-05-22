import styled from "styled-components";

const Container = styled.div`
  background-color: white;
  box-shadow: 0 2px 5px 2px rgba(1, 1, 1, 0.5);
  border-radius: 0.5rem;
  padding: 20px;

  ul {
    margin-left: 20px;
  }
`;

const ContainWidth = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Article = styled.article`
  margin-bottom: 5rem;

  .content {
    background-color: #fff;
    box-shadow: 0 2px 5px 1px rgba(1, 1, 1, 0.5);
    border-radius: 0.5rem;
    padding: 10px;
    p {
      font-weight: 500;
      font-size: 18px;
      margin-bottom: 1rem;
    }
    .header {
      border-bottom: 1px solid ${(props) => props.colors.darkBlue};
      margin-bottom: 1rem;
    }
    li {
      p {
        margin-bottom: 0.5rem;
      }
    }
  }
`;

const BulletPoint = styled.div`
  h3 {
    padding: 0;
    background: #e9f1fd;
    border: 1px solid black;
    padding: 2px;
    margin-bottom: 1rem;
  }
  p {
    padding-left: 1rem;
  }
`;

const Introduction = (props) => {
  return (
    <Container colors={props.colors}>
      <ContainWidth>
        <div className="main-title">
          <h1>Welcome To The Primal Diet</h1>
        </div>
        <Article colors={props.colors}>
          <div className="title">
            <h1>Introduction</h1>
          </div>
          <div className="content">
            <h3 className="header">What Is This Site?</h3>
            <p>
              This is the unoffical Raw Primal Diet website. Sharing many
              articles with Aajonus's first hand knowledge. Aajonus's
              information is always the best resource, but I will also be
              sharing my experience with the diet and provide some of my
              experimentation.
            </p>
            <h3 className="header">Learn More</h3>
            <p>
              Feel free to browse many of the recent articles, read the pure
              documentation, take the free course (unfinished) or search for any
              health issue/question you have in the search page.
            </p>
          </div>
        </Article>
        <Article colors={props.colors}>
          <div className="title">
            <h1>What Is The Raw Primal Diet</h1>
          </div>
          <div className="content">
            <h4 className="mar-bottom-one">
              It is a diet completely consisting of raw meat (beef, chicken,
              pork), raw dairy, eggs and vegetable juices.
            </h4>
            <h3 className="header">Whats The Logic?</h3>
            <p>
              The logic behind it is when you cook foods the enzymes, proteins,
              fats, and nutrients are damaged or destroyed. Advanced glycation
              end products are formed in the cooking process, which lead to
              rapid aging of the body. Additionally, a high carbohydrate diet of
              fruit or especially grains leads to a buildup of AGES (advanced
              glycation end-products) in the process of using sugar for energy.
            </p>
            <h3 className="header">Bacteria</h3>
            <p>
              Raw uncooked meats, dairy, and eggs are also much higher in
              beneficial bacteria to help your cells function and feed the
              bacteria in your body. An extra benefit of this “good” bacteria is
              that it will make you feel much happier because you are feeding
              your body what it needs.
            </p>
            <h3 className="header">Diet History</h3>
            <p>
              Humans originated on raw meat many “hundreds of thouands” of years
              ago and no other animal eats cooked foods except humans. No tribes
              living on their natural diet experience chronic illness
              whatsoever, even tribes who eat cooked meat live without serious
              disease. They may get a little arthritis or muscle degeneration in
              old age and not function as well, but they do not experience
              severe disease seen in modern society. 1/2 males and 1/3 women
              will get cancer in their lifetime, do you want to take those
              chances on the standard american diet?
            </p>

            <p>
              By eating proteins, and fats in their raw state, you can preserve
              the nutrients
            </p>
            <h3 className="header">Macronutrients</h3>
            <p>
              By eating a diet of 15-20% protein, 75-80%fat, an 5% carbohydrates
              you will reduce the production of advanced glycation end products.
              The body can handle 8% carbohydates without forming advanced
              glycation end products.
            </p>

            <p>
              Raw protein from meats to build the body, raw fats to detox the
              poisons and to use as energy, and sugars from fruit/honey/milk to
              help use the fat for fuel, aid in detox and help digest the
              proteins.
            </p>
            <h3 className="header">Creator</h3>
            <p>
              Officially created by Aajonus Vonderplanitz in 1997 after his
              release of the book, “We Want To Live”. He had already been
              experimenting with raw meat since 1976 and had cured 100s of
              patients at this point.
            </p>
          </div>
        </Article>

        <Article colors={props.colors}>
          <div className="title">
            <h1> How Can You Start?</h1>
          </div>
          <div className="content">
            <BulletPoint>
              <h3>
                (1) Read The Book "We Want To Live", By Aajonus Vonderplanitz.
              </h3>
              <p>
                Linked here is the{" "}
                <a
                  href="https://drive.google.com/drive/u/0/folders/1bvHKfS5LA9aG6yK5yEYMIlnLluZ-riY7"
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                >
                  PDF version of We Want To Live
                </a>
                . You don’t need to read the whole thing, but it is a good
                introduction to what the diet is and how it can help you.
              </p>
            </BulletPoint>

            <BulletPoint>
              <h3>(2) Listen To The Aajonus Workshop.</h3>
              <p>
                This is a{" "}
                <a
                  target="_blank"
                  rel="noreferrer"
                  className="link"
                  href="https://www.youtube.com/watch?v=6eEOgEch3q4&t=6687s&ab_channel=MikaelM%C3%A4ntysalo"
                >
                  video
                </a>{" "}
                of one of the many Aajonus Vonderplanitz workshops. It’s best to
                listen right from the source and he will teach you must more
                than I will be able to. It goes into parasites, cooked vs raw
                foods, bacteria, and how to do the diet correctly.
              </p>
            </BulletPoint>

            <BulletPoint>
              <h3>(3) Listen To Atleast One Q&A. (optional)</h3>

              <p>
                By This point you are ready to eat raw meat{" "}
                <i>(of course you can just eat it)</i>.{" "}
              </p>
              <p>
                For extra credit I have linked all the direct Aajonus content in
                my resources section of the website.
              </p>
              <p>
                Athough, the easiest way to consume these is through the
                Mantysalo channel on youtube linked here.
              </p>
              <p>
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="link"
                  href="https://www.youtube.com/channel/UCdHSzt83x7LjGcdNTJu2LSA?app=desktop"
                >
                  Mantysalo Youtube
                </a>
              </p>
              <p>
                These go into specific questions to teach you a greater
                understanding of the specifics.
              </p>
            </BulletPoint>

            <BulletPoint>
              <h3>(4) Find Farms Near You or a Good Quality Butcher</h3>
              <p>
                Feel free to read this article <b>-insert article-</b> on how to
                find farms near you or this webpage <b>-insert webpage-</b> with
                all the online resources to find farms near you
              </p>
              <h3 className="header">Google</h3>
              <p>
                Just literally look up organic/grass fed farms near me,
                organic/grass fed butcher near me. Worst case scenario, you can
                buy some at the grocery store. Go on messaging boards, contact
                local people in your areas, go on websites like Kijiji, try to
                find the best quality you can. Also, ask your farmer about
                people they know.
              </p>
              <h3 className="header">Ask Questions</h3>
              <p>
                Don't feel bad to ask questions and possibly stop purchasing
                from certain farmers if they don't fit your criteria. Product
                quality is driven by consumer demand.
              </p>
              <h3 className="header">Grocery Store</h3>
              <p>
                The only problem with buying from the grocery store is you can't
                verify the quality. It's often quite old and sprayed with
                various chemicals. The issue with buying from certain farms is
                they freeze the meat which damages the nutrients and bacteria.
                Although, it is still better than nothing.{" "}
              </p>
            </BulletPoint>
          </div>
        </Article>
        <Article colors={props.colors}>
          <div className="title">
            <h1>(5) Finally!! You Can Eat Raw Meat Now</h1>
          </div>
          <div className="content">
            <p>
              I would personally suggest just diving right into your first raw
              meal. Here is a good steak tartare recipe <b>-recipe link -</b>
            </p>
            <p className="border-bottom">
              <h3>
                Some foods which should be easy to get started with include...
              </h3>
            </p>
            <ul>
              <li>
                {" "}
                <p>
                  Milkshakes (raw milk, eggs, fruit, honey){" "}
                  <b>- Recipe Link -</b>
                </p>{" "}
              </li>
              <li>
                <p>
                  Fresh red meat (feel free to put this sauce on it){" "}
                  <b>- recipe link -</b>
                </p>
              </li>
              <li>
                <p>
                  Raw fish (try this recipe) <b>- Recipe link -</b>
                </p>
              </li>
              <li>
                <p>
                  Oysters. Try to buy these by the package. They are often
                  $1.50-$2.00 CAD ea. Compared to $0.65-$1.00 by the package/box
                </p>
              </li>
              <li>
                <p>Raw dairy (raw cheese, butter)</p>
              </li>
              <li>
                <p>Raw Ice Cream</p>
              </li>
            </ul>
            <p className="border-bottom">
              <b>Some advanced foods you may not be ready for...</b>
            </p>
            <ul>
              <li>
                <p>Rotten meat (liver is best)</p>
              </li>
              <li>
                <p>
                  Organs (they taste better than muscle meat and you will crave
                  them
                </p>
              </li>
              <li>
                <p>Raw chicken</p>
              </li>
              <li>
                <p>Raw pork</p>
              </li>
              <li>
                <p>
                  Eggs. You may not be ready for whole eggs, but you can do egg
                  yolks in steak tartare to get adjusted (although whole eggs
                  are recommended!)
                </p>
              </li>
            </ul>
            <br />
            <br />
            <p>
              Eating raw meat can take awhile to get used to. Don't feel bad if
              you aren't quite used to it and end up cheating. Aajonus said, "If
              you only eat one raw food in your whole life, you will be that
              much healthier." So, if you only eat 50% raw, you are still 50%
              more healthy. Over time you will get used to it if you are
              consistent and are able to find out what works for you.
            </p>
            <p className="border-bottom">
              <b>
                So, if you really still aren't up for the whole raw meat thing.
                Feel free to slowly transition and here are some food ideas...
              </b>
            </p>
            <ul>
              <li>
                <p>Rare cooked steak/hamburger</p>
              </li>
              <li>
                <p>Sushi/Sashimi/Poke Bowls</p>
              </li>
              <li>
                <p>
                  Sourdough bread/potatoes/rice with lots of raw butter (Aajonus
                  doesn't recommend grains anymore, but you may find this
                  useful)
                </p>
              </li>
              <li>
                <p>Cheese/honey</p>
              </li>
              <li>
                <p>
                  Anything with butter. Here are some recipes.{" "}
                  <b>-insert recipes -</b>
                </p>
              </li>
            </ul>
          </div>
        </Article>
      </ContainWidth>
    </Container>
  );
};

export default Introduction;
