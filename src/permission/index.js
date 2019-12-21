import router from '../router'

router.beforeEach(function (to, from, next) {
  // console.log(to)
  let res = to.path.startsWith('/home')
  if (res) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

export default router
