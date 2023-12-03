
export default defineEventHandler(async (event) => {
  sendRedirect(event, "http://localhost:3000/sandbox01")
  return {}
});
