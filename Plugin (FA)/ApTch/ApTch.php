<?php
/*
*@package Auto-postingToTelegramChannel
Plugin Name: ارسال خودکار پست ها به کانال تگلرام
Plugin URI:
Description: این پلاگین به شما  کمک می کند تا پست های وب سایت خود را به صورت خودکار در کانال تلگرام خود منتشر کنید.
This plugin helps you to publish your website posts (with extra customization) on your telegram channel automatically
Author: Bawbak
Author URI:
Version: 1.0
*/

if ( !defined('ABSPATH')) {
  die;
}
if ( !function_exists('add_action')) {
  exit;
}
// Load the Whole Functions (every controls are in ApTchFunctions.php)
include_once plugin_dir_path( __FILE__ ).'ApTchFunctions.php';
