const fetch = require('node-fetch');

const translation = async (keyword) => {
    try {
        const response = await fetch('https://fanyi.baidu.com/sug', {
            method: 'post',
            body: JSON.stringify({kw: keyword}),
            headers: {'Content-Type': 'application/json'}
        });
        const allDescribe = await response.json();
        if (allDescribe.errno !== 0) {
            return false;
        }
        return allDescribe.data;
    } catch (error) {
        console.log(error)
        return false;
    }
}

module.exports = {
    translation
}
