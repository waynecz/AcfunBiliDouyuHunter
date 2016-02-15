var cheerio = require('cheerio');
var fs = require('fs');
var url = require('url');
var request = require('request');
var eventproxy = require('eventproxy');

var ep = new eventproxy();
var codes = ['60', '70', '68', '69', '59'];
var dictionary = {
	'60': '娱乐区',
	'70': '科技区',
	'68': '影视区',
	'69': '体育区',
	'59': '游戏区',
	'60_': 'entertainment',
	'70_': 'science',
	'68_': 'movie',
	'69_': 'sport',
	'59_': 'game'
};

ep.after('fetch_html', codes.length, function(responses) {
	responses.map(function(response) {
		var code = response[0];
		var body = response[1];
		var address = 'http://www.acfun.tv';
		var topics = [];
		var $ = cheerio.load(body);
		$('#area-b .r .page.active .unit').each(function(i, e) {
			var $e = $(e);
			var rst = {};
			var link = $e.find('.r a').attr('href');
			var authorLink = $e.find('.r>.author>a').attr('href');

			rst.href = url.resolve(address, link);
			rst.title = $e.find('.r>a').text();
			rst.img = $e.find('.l img')[0].attribs['data-src'];
			rst.authorLink = url.resolve(address, authorLink);
			rst.authorText = $e.find('.r>.author>a').text();
			rst.info = $e.find('.r>.info-extra').text().split('\n')[0];
			rst.index = i + 1;

			topics.push(rst);
			// var fileName = parseUrlForFileName(o.img);
			// downloadImg(o.img, fileName);
		})
		var last = JSON.stringify(topics);

		fs.writeFile('../myNode/public/crawlerData/acfun-' + dictionary[code + '_'] + '.json', last, function(err) {
			if (err) throw err;
			console.log('AC ' + dictionary[code] + '榜单获取成功了 ( ゜- ゜)つロ');
		});
	})
})

var Acfun = function() {
	codes.map(function(code) {
		request({
				url: 'http://www.acfun.tv/v/list' + code + '/index.htm',
				headers: {
					'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 Safari/537.36'
				},
				gzip: true
			},
			function(error, res, body) {
				if (!error && res.statusCode == 200) {
					// var thisUrl =  'http://www.acfun.tv/v/list' + code + '/index.htm';
					console.log('飞船对接 AC ' + dictionary[code] + ' 成功！');
					ep.emit('fetch_html', [code, body]);
				} else {
					console.log('飞船与 AC ' + dictionary[code] + '撞毁啦！错误代码：' + res.statusCode)
				}
			})
	});
}

module.exports = {Acfun : Acfun}

function parseUrlForFileName(address) {
	var fileName = path.basename(address);
	return fileName;
}

function downloadImg(uri, filename) {
	request.head(uri, function(err, res, body) {
		if (err) {
			console.log('err:' + err);
			return false;
		}
		request(uri).pipe(fs.createWriteStream('../myNode/public/images/' + filename)).on('close', function() {
			console.log(filename + ' done!')
		})
	})
}