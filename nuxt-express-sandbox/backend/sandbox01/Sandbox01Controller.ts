import { RequestHandler } from "express";

const executeGet: RequestHandler = (req, resp) => {
  const value01 = req.query.value01;

  resp.send({
    value01: "executeGet!! " + value01,
  });
};

const executePost: RequestHandler = (req, resp) => {
  const value01 = req.body.value01;

  resp.send({
    value01: "executePost!! " + value01,
  });
};

export { executeGet, executePost };
