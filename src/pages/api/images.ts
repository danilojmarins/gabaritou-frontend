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
    
    options.uploadDir = path.join(process.cwd(), "/public/images/bancas");
    options.keepExtensions = true;
    options.maxFileSize = 1 * 1024 * 1024; // 1 MB
    options.filename = (name, ext, path, form) => {
        return fileName + ext;
    };
    options.maxFiles = 1;
    options.filter = ({mimetype}) => {
        if (mimetype && mimetype.includes("image")) {
            return true;
        } else {
            return false
        }
    }
    

    const isFileValid = (mimetype: string | null) => {
        const type = mimetype?.split("/").pop();
        const validTypes = ["jpg", "jpeg", "png"];
        if (type && validTypes.indexOf(type) === -1) {
          return false;
        }
        return true;
    };

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
    form.onPart = function (part) {
        if (!isFileValid(part.mimetype)) {
            return res.status(400).json({
              status: "Fail",
              message: "The file type is not a valid type",
            });
        }
    }
});

export default handler;