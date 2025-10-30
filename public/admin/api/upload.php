<?php
session_start();
require_once "../config.php";
if (!isset($_SESSION['auth'])) { http_response_code(403); exit("Forbidden"); }

if (!empty($_FILES['file'])) {
  $file = $_FILES['file'];
  $filename = time() . "_" . basename($file['name']);
  $path = GALLERY_PATH . $filename;
  move_uploaded_file($file['tmp_name'], $path);

  $jsonPath = DATA_PATH . "gallery.json";
  $gallery = file_exists($jsonPath) ? json_decode(file_get_contents($jsonPath), true) : [];
  $gallery[] = ["src" => "/assets/gallery/$filename", "uploaded" => date("Y-m-d H:i:s")];
  file_put_contents($jsonPath, json_encode($gallery, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE));
  echo json_encode(["success" => true, "file" => $filename]);
}
