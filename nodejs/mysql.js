var mysql = require('mysql');

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'qwer',
  port: '3306',
  database: 'test',
});

connection.connect();

var addSql =
  'INSERT INTO websites(Id,name,url,alexa,country) VALUES(0,?,?,?,?)';
var addSqlParams = ['菜鸟工具', 'https://c.runoob.com', '23453', 'CN'];
//增
connection.query(addSql, addSqlParams, function (err, result) {
  if (err) {
    console.log('[INSERT ERROR] - ', err.message);
    return;
  }

  console.log('--------------------------INSERT----------------------------');
  //console.log('INSERT ID:',result.insertId);
  console.log('INSERT ID:', result);
  console.log(
    '-----------------------------------------------------------------\n\n'
  );
});

connection.end();
