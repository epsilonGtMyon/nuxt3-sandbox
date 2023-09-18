export default defineEventHandler(async (event) => {
  const body = await readBody<{ value01: string }>(event);
  console.info(body);
  return {
    hello: "world",
  };
});
