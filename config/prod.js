'use strict';


'use strict';

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
