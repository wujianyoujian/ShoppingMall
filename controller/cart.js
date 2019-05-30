const { exec, escape } = require('../db/mysql')
const genPassword = require('../utils/cryp')
//购物车列表
const cartlist = (username) => {
    let sql =  `
        select * from cart where username='${username} '
    `
    sql += `order by id desc;`
    return exec(sql)
}
//删除某一商品
const delcart = (id, username) => {
    let sql = `
        delete from cart where id=${id} and username='${username}';
    `
    return exec(sql)
}
//增加某一商品的数量
const addcart = (id, username) => {
    let sql = `
        update cart set num=num+1 where id=${id} and username='${username}';
    `
    return exec(sql)
}
//减少某一商品的数量
const reducecart = (id, username) => {
    let sql =  `
        update cart set num=num-1 where id=${id} and username='${username}';
    `
    return exec(sql)
}

const cartcheck = (imgURL, username) => {
    let sql = `
        select * from cart where imgURL='${imgURL}' and username='${username}';
    `
    return exec(sql).then(rows => {
        return rows[0]
    })
}
module.exports = {
    cartlist,
    delcart,
    addcart,
    reducecart,
    cartcheck
}