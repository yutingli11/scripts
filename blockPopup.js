let url = $request.url;
let window_open_reg = 'window.open';
let window_open_str = '';
let body = $response.body.replace(window_open_reg, window_open_str);
let headers = $response.headers;
headers['Content-Security-Policy'] = "child-src	'self'";
$done({ headers, body, url });