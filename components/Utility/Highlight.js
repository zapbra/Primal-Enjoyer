const Highlight = ({ children, text = "" }) => {
  let ch = children;
  let terms = text.split(" ").map((term) => term.toLowerCase());

  // map over each word of the element text
  if (!text.length == 0) {
    children = children
      .split(" ")
      .map((textChild) => {
        // map over each search term to find a match
        let foundIndex = terms.findIndex((term) => {
          return textChild.toLowerCase().includes(term);
        });
        if (ch == "Hollandaise Meat Sauce") {
        }
        if (foundIndex == -1) {
          // return text as if is if nothing found

          return textChild;
        } else {
          // return text with styling

          return "<span class = 'highlight'>" + textChild + "</span>";
        }
      })
      .join(" ");
  }

  /*   let indexes = text.split(" ").map((textTerm) => {
    return children.toLowerCase().indexOf(textTerm);
  });
  let innerHTML;
  console.log("indexes");
  console.log(indexes);
  indexes.forEach((index) => {
    if (index >= 0) {
      innerHTML =
        children.substring(0, index) +
        "<span class = 'highlight'>" +
        children.substring(index, index + text.length) +
        "</span>" +
        children.substring(index + text.length);
      children = innerHTML;
    } 
  });*/

  return <span dangerouslySetInnerHTML={{ __html: children }}></span>;
};

export default Highlight;
