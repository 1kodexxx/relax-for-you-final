<?php
// Стартуем сессию только если её ещё нет
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

require_once "auth.php";

if (!empty($_SESSION["admin"])) {
    header("Location: dashboard.php");
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Админка — Relax For You</title>
  <link rel="stylesheet" href="styles/base.css" />
  <link rel="stylesheet" href="styles/layout.css" />
  <style>
    body {
      display: grid;
      place-items: center;
      height: 100vh;
      background: radial-gradient(80% 80% at 50% 20%, rgba(255,43,106,0.15), transparent),
                  var(--bg);
      color: var(--text-primary);
    }
    .login-box {
      background: var(--surface);
      padding: 36px;
      border-radius: var(--radius-xl);
      box-shadow: var(--shadow-soft);
      width: min(360px, 90%);
      text-align: center;
    }
    .login-box h1 {
      margin-bottom: 20px;
      font-size: 1.6rem;
    }
    .login-box form {
      display: grid;
      gap: 14px;
    }
    .login-box input {
      padding: 12px 16px;
      border-radius: var(--radius-md);
      border: 1px solid rgba(255,255,255,0.15);
      background: rgba(255,255,255,0.05);
      color: var(--text-primary);
    }
    .login-box button {
      padding: 12px 18px;
      border-radius: 999px;
      background: var(--g-accent);
      color: #fff;
      font-weight: 600;
      letter-spacing: 0.1em;
      transition: 0.3s ease;
    }
    .login-box button:hover {
      filter: brightness(1.15);
      box-shadow: var(--shadow-accent);
    }
    .error {
      color: var(--error);
      margin-top: 10px;
      font-size: 0.9rem;
    }
  </style>
</head>
<body>
  <div class="login-box">
    <h1>Вход в панель</h1>
    <form method="post" action="">
      <input type="text" name="login" placeholder="Логин" required />
      <input type="password" name="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
    <?php if (!empty($error)) echo "<p class='error'>$error</p>"; ?>
  </div>
</body>
</html>
