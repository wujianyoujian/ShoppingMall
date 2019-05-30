const { exec } = require('../db/mysql')
const xss = require('xss')
// 从这里获取数据
const getList = (keyword) => {
    let sql = `select * from good where 1=1 `
    if(keyword) {
        sql += `and title like '%${keyword}%' or content like '%${keyword}%'`
    }
    sql += `order by id;`
    return exec(sql)
}

const getDetail = (id) => {
    const sql = `select * from good where id=${id};`
    return exec(sql).then(rows => {
        return rows[0]
    })
}


const newcart = (goodData, username) => {
    //从客户端拿到的数据进行处理
    const title = goodData.title
    const content = goodData.content
    const imgURL = goodData.imgURL
    const oldprice = goodData.oldprice || 0
    const newprice = goodData.newprice || 0
    const num = 1
    const sql = `
        insert into cart(title,content,imgURL,oldprice,newprice,username,num) values(
            '${title}','${content}','${imgURL}','${oldprice}','${newprice}','${username}','${num}'
        );
    `
    return exec(sql).then((insertData)=> {
        console.log(insertData)
        return {
            id: insertData.insertId
        }
    })
}

module.exports = {
    getList,
    getDetail,
    newcart
}