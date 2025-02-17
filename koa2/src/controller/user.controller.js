const { onRegister } = require('../service/user.service');

const userController = () => {
  // 注册
  const register = (ctx, next) => {
    const { name, password } = ctx.request.body;
    const res = onRegister({
      name,
      password,
    });
    ctx.body = res ? '用户注册成功' : '用户注册失败';
  };
  // 登录
  const login = (ctx, next) => {
    ctx.body = '登录成功';
  };
  return {
    register,
    login,
  };
};
module.exports = userController();
