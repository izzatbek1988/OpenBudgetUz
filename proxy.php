<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

$endpoints = [
    'budget' => 'https://openbudget.uz/api/v2/info/statistics/board-budget-sum/53?regionId=12&districtId=160',
    'board'  => 'https://openbudget.uz/api/v2/info/board/53?regionId=12&districtId=160&page=0&size=12&stage=PASSED&quality=',
];

$type = isset($_GET['type']) ? $_GET['type'] : '';

if (!isset($endpoints[$type])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid type. Use ?type=budget or ?type=board']);
    exit;
}

$url = $endpoints[$type];

$ch = curl_init();
curl_setopt_array($ch, [
    CURLOPT_URL            => $url,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_TIMEOUT        => 15,
    CURLOPT_FOLLOWLOCATION => true,
    CURLOPT_HTTPHEADER     => [
        'User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept: application/json, text/plain, */*',
        'Accept-Language: uz,ru;q=0.9,en;q=0.8',
        'Referer: https://openbudget.uz/',
        'Origin: https://openbudget.uz',
    ],
    CURLOPT_SSL_VERIFYPEER => true,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    http_response_code(502);
    echo json_encode(['error' => 'Proxy error: ' . $error]);
    exit;
}

if ($httpCode !== 200) {
    http_response_code(502);
    echo json_encode(['error' => 'Upstream returned HTTP ' . $httpCode]);
    exit;
}

echo $response;
