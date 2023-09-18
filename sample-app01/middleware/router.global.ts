export default defineNuxtRouteMiddleware((to, from) => {
  // ここがうまいこと動かない

  const auth = useAuthentication();
  console.log(to.path, auth.authenticated)
  if (auth.authenticated) {
    // 認証済
    if (to.path === "/login") {
      return navigateTo("/");
    }
  } else {
    // 未認証
    if (to.path !== "/login") {
      return navigateTo("/login");
    }
  }
});
