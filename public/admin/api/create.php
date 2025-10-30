<?php
session_start();
require_once "../config.php";
if (!isset($_SESSION['auth'])) { http_response_code(403); exit("Forbidden"); }

$data = json_decode(file_get_contents('php://input'), true);
$file = DATA_PATH . basename($data['file']);
$list = file_exists($file) ? json_decode(file_get_contents($file), true) : [];
$list[] = ["id" => time()];
file_put_contents($file, json_encode($list, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
echo "CREATED";
