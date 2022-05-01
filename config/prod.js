'use strict';


'use strict';
console.log(process.env.mysql_host, 1111);
console.log(process.env.mysql_password, 2222);
module.exports = {
    'dictionary-api': {
        mysql: {
            client: 'mysql',
            connection: {
              host : process.env.mysql_host,
              port : 3306,
              user : 'root',
              password : process.env.mysql_password,
              database : 'dictionary'
            }
        }
    }
};
