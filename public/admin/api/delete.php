<?php
session_start();
require_once "../config.php";
if (!isset($_SESSION['auth'])) { http_response_code(403); exit("Forbidden"); }

$data = json_decode(file_get_contents('php://input'), true);
$file = DATA_PATH . basename($data['file']);
$list = json_decode(file_get_contents($file), true);
array_splice($list, intval($data['index']), 1);
file_put_contents($file, json_encode($list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "DELETED";
