const fetch = require('node-fetch');

/**
 * 语法词
 */
const programHash = {
    "about": true,
    "after": true,
    "ago": true,
    "all": true,
    "also": true,
    "an": true,
    "and": true,
    "any": true,
    "are": true,
    "as": true,
    "at": true,
    "be": true,
    "been": true,
    "before": true,
    "both": true,
    "but": true,
    "by": true,
    "can": true,
    "did": true,
    "do": true,
    "does": true,
    "done": true,
    "edit": true,
    "even": true,
    "every": true,
    "for": true,
    "from": true,
    "had": true,
    "has": true,
    "have": true,
    "he": true,
    "here": true,
    "him": true,
    "his": true,
    "however": true,
    "if": true,
    "in": true,
    "into": true,
    "is": true,
    "it": true,
    "its": true,
    "less": true,
    "many": true,
    "may": true,
    "more": true,
    "most": true,
    "much": true,
    "my": true,
    "no": true,
    "not": true,
    "often": true,
    "quote": true,
    "of": true,
    "on": true,
    "one": true,
    "only": true,
    "or": true,
    "other": true,
    "our": true,
    "out": true,
    "re": true,
    "says": true,
    "she": true,
    "so": true,
    "some": true,
    "soon": true,
    "such": true,
    "than": true,
    "that": true,
    "the": true,
    "their": true,
    "them": true,
    "then": true,
    "there": true,
    "these": true,
    "they": true,
    "this": true,
    "those": true,
    "though": true,
    "through": true,
    "to": true,
    "under": true,
    "use": true,
    "using": true,
    "ve": true,
    "was": true,
    "we": true,
    "were": true,
    "what": true,
    "where": true,
    "when": true,
    "whether": true,
    "which": true,
    "while": true,
    "who": true,
    "whom": true,
    "with": true,
    "within": true,
    "you": true,
    "your": true
}

/**
 * 获取 前 limit 个高频词
 * @param {*} text
 * @param {*} limit
 */
const getHightWords = (words, limit = 100) => {
    const textHash = {}
    words.forEach(word => {
        if(!programHash[word]){
            if(textHash[word]){
                textHash[word] += 1;
            }else{
                textHash[word] = 1;
            }
        }
    })

    keysSorted = Object.keys(textHash).sort((a, b) => textHash[b] - textHash[a]);
    return keysSorted.splice(0, limit);
}

const getUrlHtmlString = async (url) => {
    try {
        const response = await fetch(url)
        const html = await response.text();
        return html;
    } catch (e) {
        return '';
    }
}


const getUrlWord = (html) => {
    try {
        const wordsMath = [...html.matchAll(/ ([a-zA-Z]{3,}) /g)];
        const words = wordsMath.map(word => word[1].toLowerCase())
        if (!words.length) {
            return false;
        }
        return getHightWords(words);
    } catch (e) {
        return false;
    }
}

const translation = async (keyword) => {
    try {
        const response = await fetch('https://fanyi.baidu.com/sug', {
            method: 'post',
            body: JSON.stringify({kw: keyword}),
            headers: {'Content-Type': 'application/json'}
        });
        const allDescribe = await response.json();
        if (allDescribe.data.length === 0) {
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
    getUrlHtmlString,
    getUrlWord,
    scoreToLevel
}
