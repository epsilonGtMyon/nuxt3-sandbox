type Request = {
  status: string
}

export default defineEventHandler(async (event) => {
  const body = await readBody<Request>(event);

  setResponseStatus(event, Number(body.status))
  setHeader(event, "x-app", "sandbox02")

  return {
    sandbox02Result: {
      hello: "hello"
    }
  };
});
