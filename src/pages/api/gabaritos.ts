import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import path from "path";
import nextConnect from "next-connect";

export const config = {
    api: {
        bodyParser: false
    }
};

const handler = nextConnect();

handler.post((req: NextApiRequest, res: NextApiResponse) =>  {
    const { cargo_id, file_name } = req.query;

    const fileName = file_name?.toString();

    if (!fileName) {
        return res.status(400);
    }

    if (!req.cookies) {
        return res.status(403);
    }

    if (cargo_id !== '3') {
        return res.status(403);
    }

    const options: formidable.Options = {};
    
    options.uploadDir = path.join(process.cwd(), "/public/gabaritos");
    options.keepExtensions = true;
    options.maxFileSize = 0.5 * 1024 * 1024; // 500 KB
    options.filename = (name, ext, path, form) => {
        return fileName + ext;
    };
    options.maxFiles = 1;
    options.filter = ({mimetype}) => {
        if (mimetype && mimetype.includes("pdf")) {
            return true;
        } else {
            return false
        }
    }

    const form = formidable(options);
    form.parse(req, (err, fields, file) => {
        if (err) {
          console.log("Error parsing the files");
          return res.status(400).json({
            status: "Fail",
            message: "There was an error parsing the files",
            error: err,
          });
        }

        return res.json({ data: 'ok' });
    })
});

export default handler;