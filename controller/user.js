const { exec, escape } = require('../db/mysql')
const genPassword = require('../utils/cryp')

const logincheck = (username, password) => {
    username = escape(username)
    password = genPassword(password)
    password = escape(password) 
    const sql = `
        select username, realname, power from user where username=${username} and password=${password};
    `     
    // 这个查找到了就是返回有值的数组，没有就是undefine
    return exec(sql).then(rows => {
        return rows[0]
    })
}
const register = (username, password) => {
    username = escape(username)
    password = genPassword(password)
    password = escape(password)
    const sql =`
        insert into user(username, password, realname, power) values(${username},${password},'default', 1);
    `
    return exec(sql).then(insertuser=> {
        if(insertuser.affectedRows > 0) {
            return true
        }
        return false
    })
}

const check = (username, password) => {
    const sql =`
        select username from user where username='${username}';
    `
    return exec(sql).then(rows => {
        return rows[0]
    })
}
const user_list = () => {
    const sql = `
        select username, realname, power from user;
    `
    return exec(sql).then(rows => {
        return rows
    })
}
module.exports = {
    logincheck,
    register,
    check,
    user_list
}