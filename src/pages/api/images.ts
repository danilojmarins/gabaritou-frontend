import { NextApiRequest, NextApiResponse } from "next";

export default function saveImage(req: NextApiRequest, res: NextApiResponse) {
    if (req.body === null) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
      
    const file = req.body.file;
      
    file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err: any) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
      
        res.json({ fileName: file.name, filePath: `/uploads/${file.name}` });
    });

}