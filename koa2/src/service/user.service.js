const userService = () => {
  // 注册
  const onRegister = ({ name, password }) => {
    // 写入数据库
    return name && password ? true : false;
  };
  // 登录
  const login = () => {};
  return {
    onRegister,
    login,
  };
};

module.exports = userService();
