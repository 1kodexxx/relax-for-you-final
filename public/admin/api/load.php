<?php
session_start();
require_once "../config.php";
if (!isset($_SESSION['auth'])) { http_response_code(403); exit("Forbidden"); }

$file = basename($_GET['file']);
$path = DATA_PATH . $file;
if (file_exists($path)) {
  header("Content-Type: application/json; charset=utf-8");
  echo file_get_contents($path);
} else {
  echo json_encode([]);
}
