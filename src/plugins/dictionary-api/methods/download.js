'use strict';
const fetch = require('node-fetch');
const { createWriteStream } = require('fs')
const { pipeline } = require('stream')
const { promisify } = require('util')

module.exports = async function (request, h) {

    const keywords = await this.mysql('dictionary')
        .select('id', 'keyword')
        .where('video', '=', '');

    if (!keywords.length) {
        return "OK"
    }
    const streamPipeline = promisify(pipeline);
    keywords.forEach(async word => {
        const videoUrl = `https://fanyi.baidu.com/gettts?lan=en&text=${word.keyword}&spd=3&source=web`
        const videoStream = await fetch(videoUrl);
        streamPipeline(videoStream.body, createWriteStream(`${word.keyword}.mp3`));
    });

    return 'OK';
}
