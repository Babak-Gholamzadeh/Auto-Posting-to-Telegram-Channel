<?php
/*
*@package Auto-postingToTelegramChannel
Plugin Name: Auto-Posting To Telegram Channel
Plugin URI:
Description: This plugin helps you to publish your website posts (with extra customization) on your telegram channel automatically
Author: Logan Baker
Author URI: mailto:Logan9Backer@gmail.com
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
