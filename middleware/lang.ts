export default defineNuxtRouteMiddleware((to, from) => {
  const lang = to.params.lang as string;
  const availableLangs = ['uz', 'en', 'ru'];

  if (!availableLangs.includes(lang)) {
    return navigateTo('/uz' + to.fullPath);
  }
});
