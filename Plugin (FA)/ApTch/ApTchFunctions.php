<?php
/*
*@package Auto-postingToTelegramChannel
*/

//Activation
include_once plugin_dir_path( __FILE__ ).'inc/ApTchActivate.php';
register_activation_hook( __FILE__, 'activete' );
//Deactivation
include_once plugin_dir_path( __FILE__ ).'inc/ApTchDeactivate.php';
register_deactivation_hook( __FILE__, 'deactivete' );

//Bot Class
include_once plugin_dir_path( __FILE__ ).'inc/ApTchBOT.class.php';

//Enqueue Styles & Scripts
function apTchAdminEnqueue() {
  //Load CSS
  wp_enqueue_style( 'fontAwesome', plugins_url( '/assets/css/fontawesome-all.min.css', __FILE__ ) );
  wp_enqueue_style( 'mainStyle', plugins_url( '/assets/css/style.css', __FILE__ ) );
  //Load & Register JS
  wp_enqueue_script( 'extraSettingsScript',  plugins_url( '/assets/js/extraSettingsScript.js', __FILE__ ), array( 'jquery' ) );
  wp_register_script( 'mainSettingsScript', plugins_url( '/assets/js/mainSettingsScript.js', __FILE__ ), array( 'jquery' ) );
}
add_action( 'admin_enqueue_scripts', 'apTchAdminEnqueue' );

//Admin Menu & Settings Page
include_once plugin_dir_path( __FILE__ ).'inc/ApTchAdminMenu.php';

//Add Setting link
function addSettingLink($links) {
  $settingLink = '<a href="admin.php?page=telegram_settings">تنظیمات</a>';
  array_push( $links, $settingLink );
  return $links;
}
add_filter( 'plugin_action_links_ApTch/ApTch.php', 'addSettingLink' );

//Send Telegram Post
if( ApTchBOT::isCorrect( 'isAdmin' ) && !empty( esc_attr( get_option( 'elementItemsDB', '' ) ) ) && ( isset( $_POST[ 'enableSending' ] ) ? $_POST[ 'enableSending' ] == 'checked' : true ) ) {
  add_action( 'setSchedule','ApTchBOT::sendPost', 10, 2 );
  function sendPostScheduled( $ID, $post ) {
    wp_schedule_single_event( time() + ( esc_attr( get_option( 'delayNumberDB' ) ) * 60 ), 'setSchedule', array( $ID, $post ) );
  }
  if( !empty( esc_attr( get_option( 'delayNumberDB', '' ) ) ) && esc_attr( get_option( 'delayNumberDB', '' ) ) > 0 ) {
    //To send posts with delay
    add_action( 'publish_post', 'sendPostScheduled', 10, 2);
  }
  else {
    //To send posts immediately
    add_action( 'publish_post', 'ApTchBOT::sendPost', 10, 2);
  }
}

//Adding send button for quick sending post to telegram channel
function addTelegramColumn( $column ) {
  $column['telegramColumn'] = '<center><i class="telegramColumn fab fa-telegram"></i></center>';
  return $column;
}
add_filter( 'manage_posts_columns' , 'addTelegramColumn' );
function addFeatureToColumn( $column, $post_id ) {
  if ($column == 'telegramColumn') {
    echo '<center class="telegramColumnCenter">
            <div class="telegramColumn">
              <span class="telegramLC" title="تعداد کلیک بر روی لینک این پست در کانال"><span class="counterLC">'.( get_post_meta( $post_id, 'telegramLC' ) ? get_post_meta( $post_id, 'telegramLC')[0] : 0 ).'</span><sup>LC</sup></span>
              <i data-post-id="'.$post_id.'" data-url="'.admin_url( 'admin-ajax.php' ).'" class="telegramSend fas fa-paper-plane"></i>
            </div>
            <input type="hidden" class="postSent" value="'.( get_post_meta( $post_id, 'telegramPostID') ? get_post_meta( $post_id, 'telegramPostID')[0] : '' ).'">
          </center>';
  }
}
add_action( 'manage_posts_custom_column', 'addFeatureToColumn', 10, 2 );
function sendPostID() {
  $result = false;
  if( ApTchBOT::isCorrect( 'isAdmin' ) && !empty( esc_attr( get_option( 'elementItemsDB', '' ) ) ) )
    $result = ApTchBOT::sendPost( $_REQUEST[ 'post_id' ], get_post( $_REQUEST[ 'post_id' ] ) );
  wp_send_json_error(array('msg' => $result));
}
add_action('wp_ajax_send_post_id_by_mail', 'sendPostID');

//Save the number of Link Click in telegram
if( isset( $_GET[ 'telegramChannel' ] ) ) {
  if( is_numeric( $_GET[ 'telegramChannel' ] ) ) {
	$currNuber = get_post_meta( $_GET[ 'telegramChannel' ], 'telegramLC')[0];
	update_post_meta( $_GET[ 'telegramChannel' ], 'telegramLC', ( $currNuber + 1 ) );
  }
}

//Add MetaBox for some options (Send-Update post & Pin post)
function addMetaBox() {
  add_meta_box( "telegramMetaBox", "<i class='fas fa-paper-plane' style='color: #08c;'></i> تنظیمات پست تلگرام", "metaBoxOptions", "post", "side", "high" );
}
add_action('admin_init', 'addMetaBox');
//MetaBox Options
function metaBoxOptions() {
  global $post;
  ?>
  <div class='telegramMetaBox'>

    <div class='sending'>
      <label class='SendingPost'>
        <span class='bull'></span>
        <?php
          $enableValue = 'checked';
          if( ApTchBOT::isCorrect( 'isAdmin' ) )
            $enableValue = ( get_post_meta( $post->ID, 'telegramSending') ? ( get_post_meta( $post->ID, 'telegramSending')[0] != 'disable' ? get_post_meta( $post->ID, 'telegramSending')[0] : esc_attr( get_option( 'enablingDB' ) ) ) : esc_attr( get_option( 'enablingDB' ) ) );
          else
            $enableValue = 'disable';
          echo "<input type='hidden' name='enableSending' value='$enableValue'>";
        ?>
      </label>
      <span class='enableCaption'>
        <?php
        echo get_post_meta( $post->ID, 'telegramPostID') ? 'بروز رسانی پست' : 'ارسال پست';
        ?>
      </span>
    </div>

    <div class='pinMSG'>
      <label class='pinningPost'>
        <span class='bull'></span>
        <input type='hidden' name='enablePinning' value='<?php echo get_post_meta( $post->ID, 'telegramPinning') ? get_post_meta( $post->ID, 'telegramPinning' )[0] : 'unchecked'; ?>'>
      </label>
      <span class='enableCaption'>سنجاق کردن پست</span>
    </div>

  </div>
  <?php
}
//Save MetaBox Options
function savePostMeta($postid)
{
  if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE )
    return;
  if ( !current_user_can( 'edit_page', $postid ) )
    return;
  if( empty( $postid ) || isset( $_POST[ 'post_type' ] ) )
    if( $_POST[ 'post_type' ] != 'post')
      return;
  if( isset( $_POST[ 'enableSending' ] ) ) {
    update_post_meta( $postid, 'telegramSending', $_POST[ 'enableSending' ] );
  }
  if( isset( $_POST[ 'enablePinning' ] ) ) {
    if( get_post_meta( $postid, 'telegramPostPin') ) {
      if( get_post_meta( $postid, 'telegramPostPin')[0] == 'pinned' ) {
        update_post_meta( $postid, 'telegramPinning', 'unchecked' );
      }
    }
    else {
      update_post_meta( $postid, 'telegramPinning', $_POST[ 'enablePinning' ] );
    }
  }
}
add_action( 'save_post', 'savePostMeta');
