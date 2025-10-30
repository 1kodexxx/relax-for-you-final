<?php
session_start();
require_once "../config.php";
if (!isset($_SESSION['auth'])) { http_response_code(403); exit("Forbidden"); }

$data = json_decode(file_get_contents('php://input'), true);
$file = basename($data['file']);
file_put_contents(DATA_PATH . $file, json_encode($data['data'], JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "OK";
