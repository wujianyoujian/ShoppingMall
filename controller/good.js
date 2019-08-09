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

const modify = (goodData) => {
    const name = goodData.shop_name
    const price = goodData.price
    const imgURL = goodData.imgurl
    const type = goodData.type
    const content = goodData.content
    let sql = `update good set `
    if(name) {
        sql += `title = '${name}',` 
    }
    if(content) {
        sql += `content = '${content}',`
    }
    if(type) {
        sql += `type = '${type}',`
    }
    if(price) {
        sql += `newprice = ${price},`
    }
    if(imgURL) {
        sql += `imgURL = '${imgURL}'`
    }
    sql += ` where id = ${goodData.ID};`
    console.log(sql)
    sql = sql.replace(', where', ' where')
    console.log(sql)
    return exec(sql).then(data => {
        return data
    })
}

const Addgood = (goodData) => {
    const name = goodData.shop_name
    const price = goodData.price
    const imgURL = goodData.imgurl
    const type = goodData.type
    const content = goodData.content
    const sql = `
        insert into good(imgURL,oldprice,newprice,title,content,type) values
            ('${imgURL}', 0,${price},'${name}','${content}','${type}');

    `
    return exec(sql).then(data => {
        return data.insertId
    })
}

module.exports = {
    getList,
    getDetail,
    newcart,
    modify,
    Addgood
}