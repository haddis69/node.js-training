const db = require('../db/index')
const bcrypt = require('bcryptjs')
// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 接收表单数据
    const userinfo = req.body;
    // 判断数据是否合法
    if (!userinfo.username || !userinfo.password) {
        return res.send({ status: 1, message: '用户名或密码不能为空！' })
    }
    //定义 SQL 语句
    const sql = `select * from ev_users where username=?`;
    db.query(sql, [userinfo.username], function (err, results) {
        // 执行 SQL 语句失败
        if (err) {
            return res.send({ status: 1, message: err.message })
        }
        // 用户名被占用
        if (results.length > 0) {
            return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' })
        }
        // 对用户的密码,进行 bcrype 加密，返回值是加密之后的密码字符串
        userinfo.password = bcrypt.hashSync(userinfo.password, 10)
        //插入用户的 SQL 语句
        const sql = 'insert into ev_users set ?'
        db.query(sql, { username: userinfo.username, password: userinfo.password }, function (err, results) {
            // 执行 SQL 语句失败
            if (err) return res.send({ status: 1, message: err.message })
            // SQL 语句执行成功，但影响行数不为 1
            if (results.affectedRows !== 1) {
              return res.send({ status: 1, message: '注册用户失败，请稍后再试！' })
            }
            // 注册成功
            res.send({ status: 0, message: '注册成功！' })
        })
    })
}

// 登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}