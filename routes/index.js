const router = require('express').Router(),
  sysUserController = require('../controllers/sys_user')
authController = require('../controllers/auth')
menuController = require('../controllers/menu')
roleController = require('../controllers/role')
dictController = require('../controllers/dict')


//加载认证路由
router.post('/login', authController.login.bind(authController))
router.post('/logout', authController.logout.bind(authController))
router.get('/auth/permissions', authController.getPermissions.bind(authController))

//系统用户
router.get('/auth/info', sysUserController.getAuthInfo.bind(sysUserController))
router.get('/sysUsers', sysUserController.getSysUsers.bind(sysUserController))

//菜单
router.get('/menus', menuController.getMenus.bind(menuController))
//角色
router.get('/roles', roleController.getRoles.bind(roleController))
//字典
router.get('/dicts', dictController.getDicts.bind(dictController))
router.get('/dictDatas', dictController.getDictDatas.bind(dictController))


module.exports = router;
