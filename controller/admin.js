const { exec, escape } = require('../db/mysql')
const genPassword = require('../utils/cryp')

const loginAdmin = (username, password) => {
  username = escape(username)
  password = genPassword(password)
  password = escape(password) 
  const sql = `
      select username, realname from user where username=${username} and password=${password};
  `     
  // 这个查找到了就是返回有值的数组，没有就是undefine
  return exec(sql).then(rows => {
      return rows[0]
  })
}
module.exports = { loginAdmin }