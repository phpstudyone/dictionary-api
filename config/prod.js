'use strict';


'use strict';

module.exports = {
    port: process.env.dictionary_api_port || 80,
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
