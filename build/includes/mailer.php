<?php

  $from = 'brad@binkwaffle.com';
  $to = 'brad.mcalister@gmail.com';
  $subject = 'Contact from Website';
  $body = $_POST;

  function sendMessage($from, $to, $subject, $body) {
    require_once 'Mail.php';


    echo '$body';

    $host = 'ssl://smtp.gmail.com';
    $port = '465';
    $username = 'brad@binkwaffle.com';
    $password = '3U^u2QB8YJBp$JkfYJ38';

    $headers = array ('From' => $from,
          'To' => $to,
          'Subject' => $subject);
    $smtp = Mail::factory('smtp',
        array ('host' => $host,
               'port' => $port,
               'auth' => true,
               'debug' => false,
               'username' => $username,
               'password' => $password));

    $mail = $smtp->send($to, $headers, $body);

    if (PEAR::isError($mail)) {
      return $mail->getMessage();
    } else {
      return 0;
    }
  }

?>