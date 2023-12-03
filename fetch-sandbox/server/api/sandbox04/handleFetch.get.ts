type Request = {
  status: string
}
export default defineEventHandler(async (event) => {
  const query = getQuery<Request>(event)

  setResponseStatus(event, Number(query.status))
  setHeader(event, "x-app", "sandbox04")

  return {
    sandbox04Result: {
      hello: "hello"
    }
  };
});
