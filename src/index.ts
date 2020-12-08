import { Request, Response } from "express";

import express from "express";

const app = express();
const port = 3001;

app.get("/_health", (_: Request, res: Response) => {
    res.send(`up and running on port ${port}`);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
