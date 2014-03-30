<?php
header('Content-Type:application/json');
$url = $_GET['url'];
$contents = substr(str_replace('__jqjsp(','',file_get_contents($url)), 0, -2);
//$contents = file_get_contents($url);
echo $contents;