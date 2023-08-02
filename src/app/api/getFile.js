import fs from "fs";
import path from "path";
import getConfig from "next/config";

export default async (req, res) => {
  const filePath = req.body;

  try {
    const { serverRuntimeConfig } = getConfig();
    const dir = path.join(
      serverRuntimeConfig.PROJECT_ROOT,
      "./public/audiofiles/OMAHA 22.08.2011 t/aajonus study history"
    );

    const filenames = fs.readdirSync(dir);

    const files = filenames.map((name) => path.join("/", filePath, name));

    res.statusCode = 200;
    res.json(files);
  } catch (error) {
    res.status(500).json({ body: error.message });
  }
};
