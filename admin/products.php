<?php
define('BASE_PATH', '../');
require_once('../logic/products.php');
$products = getProducts();
var_export($products);