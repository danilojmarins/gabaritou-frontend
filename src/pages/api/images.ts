import { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import nextConnect from "next-connect";

export const config = {
    api: {
        bodyParser: false
    }
};

const readFile = (req: NextApiRequest, saveLocally: boolean, fileName:string): Promise<{fields: formidable.Fields; files: formidable.Files}> => {
    const options: formidable.Options = {};

    if (saveLocally) {
        options.uploadDir = path.join(process.cwd(), "/public/images/bancas");
        options.keepExtensions = true;
        options.maxFileSize = 1 * 1024 * 1024; // 1 MB
        options.filename = (name, ext, path, form) => {
            return fileName + ext;
        }
    }

    const form = formidable(options);
    return new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({fields, files});
        })
    })
}

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

    readFile(req, true, fileName);
    return res.json({ data: 'ok' });
});

export default handler;