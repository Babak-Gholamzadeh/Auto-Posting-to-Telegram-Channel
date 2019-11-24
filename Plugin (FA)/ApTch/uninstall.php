<?php
/*
*@package Auto-postingToTelegramChannel
*/

// Clear database stored data
delete_option( 'enablingDB' );
delete_option( 'imageTypeDB' );
delete_option( 'delayNumberDB' );
delete_option( 'elementItemsDB' );
delete_option( 'elementButtonsDB' );
delete_option( 'isTokenDB' );
delete_option( 'isChannelDB' );
delete_option( 'isAdminDB' );
delete_option( 'botTokenDB' );
delete_option( 'channelIDDB' );
delete_option( 'channelNameDB' );

global $wpdb;
$wpdb->query( "DELETE FROM {$wpdb->prefix}postmeta WHERE meta_key LIKE 'telegram%'" );