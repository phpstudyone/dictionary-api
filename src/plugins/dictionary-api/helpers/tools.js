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

const scoreToLevel = (score) => {
    if (score < 20) return 1;
    if (score > 20 && score <= 40) return 2;
    if (score > 40 && score <= 60) return 3;
    if (score > 60 && score <= 80) return 4;
    if (score > 80) return 5;
}

module.exports = {
    translation,
    scoreToLevel
}
