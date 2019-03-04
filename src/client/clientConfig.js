var clientConfig;
var devConfig = {
	env:'dev',
	API_GET_BLOG: '/api/getBlog'
}
var prodConfig = {
	env:'prod',
	API_GET_BLOG: '/api/prod/getBlog'
}
if (JSON.stringify(process.env.ENV) === JSON.stringify("production")) {
	clientConfig = prodConfig
} else {
	clientConfig = devConfig
}

module.exports = clientConfig;