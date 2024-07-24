export class TextParser {
    /**
     *
     * @param rawText Rich text object to be parsed
     * @returns {string} The download url for the created text file
     */
    static getBlobUrlFromRawText(rawText) {
        // Parse every child of text to be used for the blob, each one with a new line
        let text = "";
        let line = "";
        for (const child of rawText) {
            // Each child has multiple text sections in it, but they make up one line
            for (const innerChild of child.children) {
                line += innerChild.text;
            }
            // add line to text file
            text += line + "\n";
            // reset line
            line = "";
        }

        const blob = new Blob([text], {type: "text/plain"});

        return URL.createObjectURL(blob);
    }
}