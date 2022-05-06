'use strict';
const { translation } = require('../../helpers/tools');

module.exports = async function (request, h) {
    let allData = await this.mysql('dictionary')
        .select('id', 'keyword')
        .where('type', '=', 1)
        .where('describe', '=', '');

    if (!allData.length) return 'All OK';

    allData.forEach(async data => {
        const allDescribe = await translation(data.keyword);
        if (allDescribe) {
            await this.mysql('dictionary')
                .where('id', '=', data.id)
                .update({
                    all_describe: JSON.stringify(allDescribe),
                    describe: allDescribe[0].v,
                    video: `https://fanyi.baidu.com/gettts?lan=en&text=${data.keyword}&spd=3&source=web`
                });
        }
    });

    return 'OK';
}
