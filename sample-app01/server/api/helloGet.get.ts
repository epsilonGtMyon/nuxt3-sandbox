export default defineEventHandler((event) => {

  const query = getQuery<{ value01: string }>(event);
  console.info(query);
  return {
    hello: "world",
  };
});
