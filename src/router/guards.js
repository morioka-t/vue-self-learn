export const authorizeToken = async (to, from, next) => {
  if (to.path === '/login' && localStorage.getItem('token')) {
    localStorage.removeItem('token')
  }
  if (to.matched.some(page => page.meta.requiresAuth) && (localStorage.getItem('token') === null)) {
    next('/login')
  } else {
    next()
  }
}
