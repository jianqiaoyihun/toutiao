import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'

router.beforeEach(function (to, from, next) {
  // console.log(to)
  // let res = to.path.startsWith('/home')
  progress.start()
  if (to.path.startsWith('/home')) {
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
router.afterEach(() => {
  progress.done()
})
export default router
