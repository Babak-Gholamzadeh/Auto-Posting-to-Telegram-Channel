<?php
/*
*@package Auto-postingToTelegramChannel
*/
function addingTelegramSettingsMenu() {
  // The SVG be used for setting menu icon
  $svgIcon = 'data:image/svg+xml;base64,' . base64_encode( '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 496 512"><path fill="#82878c" d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9l-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"/></svg>' );
  add_menu_page( 'Auto-posting to telegram channel', 'Telegram Settings', 'manage_options', 'telegram_settings', 'telegramSettings', $svgIcon );
}
add_action( 'admin_menu', 'addingTelegramSettingsMenu' );
function telegramSettings() {
  // Load Script when Admin Menu be shown
  wp_enqueue_script ( 'mainSettingsScript' );

  // Checking & Updating Token and ChannelID
  if( isset( $_POST['submitInitialize'] ) ) {
    if( isset( $_POST['botToken'] ) ) {
      ApTchBOT::setToken( $_POST['botToken'] );
    }
    if( isset( $_POST['channelID'] ) ) {
      ApTchBOT::setChannelID( $_POST['channelID'] );
    }
  }
  // Saving Customize Options for Telegram Posts
  if( isset( $_POST['submitCustomize'] ) ) {
    if( isset( $_POST['enabling'] ) ) {
      update_option( 'enablingDB', $_POST['enabling'] );
    }
    if( isset( $_POST['imageType'] ) ) {
      update_option( 'imageTypeDB', $_POST['imageType'] );
    }
    if( isset( $_POST['delayNumber'] ) ) {
      update_option( 'delayNumberDB', $_POST['delayNumber'] );
    }
    if( isset( $_POST['elementItems'] ) ) {
      update_option( 'elementItemsDB', $_POST['elementItems'] );
    }
    if( isset( $_POST['elementButtons'] ) ) {
      update_option( 'elementButtonsDB', $_POST['elementButtons'] );
    }
  }
  // The Content of Page Settings
  include_once plugin_dir_path( __FILE__ ).'ApTchSettingsPage.php';

}
