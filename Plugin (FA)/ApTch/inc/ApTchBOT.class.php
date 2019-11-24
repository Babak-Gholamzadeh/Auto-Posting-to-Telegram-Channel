<?php
/*
*@package Auto-postingToTelegramChannel
*/
class ApTchBOT {
  const API_URL = 'https://api.telegram.org/bot';
  const GET_ME = '/getMe';                                            // For checking if the bot exist
  const GET_CHAT = '/getChat?chat_id=@';                              // For checking if the channel exist
  const GET_CHAT_ADMINS = '/getChatAdministrators?chat_id=@';         // For checking if the bot is admin
  const SEND_MSG = '/sendMessage?chat_id=@';                          // For sending normal text post (& showing the image at the bottom of the post)
  const SEND_PHOTO = '/sendPhoto?chat_id=@';                          // For sending post if the image is at the top the post
  const EDIT_MSG_TEXT = '/editMessageText?chat_id=@';                 // For editing normal text post
  const EDIT_MSG_CAPTION = '/editMessageCaption?chat_id=@';           // For editing the posts that the image be shown at the top of it
  const EDIT_MSG_REPLY_MARKUP = '/editMessageReplyMarkup?chat_id=@';  // For editing just buttons of the post (but editMessageText also can be used for that)
  const PIN_MSG = '/pinChatMessage?chat_id=@';                        // For pinning the post in channel
  const UNPIN_MSG = '/unpinChatMessage?chat_id=@';                    // For unpinning the post in channel
  const PARSE_MODE = '&parse_mode=HTML';                              // For be able to use a few html tag in telegram post

  private static $token;
  private static $ID;
  private static $msgID;
  private static $text;
  private static $buttons;

  private static $title;
  private static $excerpt;
  private static $content;
  private static $tags;
  private static $permalink;
  private static $photo;

  // Getting the Properties of website post
  private static function getPostProperties( $ID, $post ) {
    self::$title = $post->post_title;
    self::$excerpt = $post->post_excerpt;
    self::$content = strip_tags( $post->post_content );
    self::$tags = get_the_tags($ID); // Array
    self::$permalink = get_permalink( $ID ).'?telegramChannel='.$ID;
    self::$photo = get_the_post_thumbnail_url( $ID, 'full');
  }
  // Setting the style that user set in Settings menu page
  private static function setStyleToProperties() {
    $elementItems = esc_attr( get_option( 'elementItemsDB', '' ) );
    foreach( explode( "|]{[6", $elementItems ) as $elements) {
      if( !empty( $elements ) ) {
        $element = explode( "|5[[}|", $elements );
        switch ( $element[0] ) {
          case 'Title':
            self::$title = urlencode( self::$title );
            switch( $element[2] ) {
              case 'bold':
                self::$text .= '<b>'.self::$title.'</b> ';
                break;
              case 'italic':
                self::$text .= '<i>'.self::$title.'</i> ';
                break;
              case 'link':
                self::$text .= '<a href="'.self::$permalink.'">'.self::$title.'</a> ';
                break;
              default:
                self::$text .= self::$title.' ';
                break;
            }
            for( $i = 0; $i < $element[1]; $i++ )
              self::$text .= "%0A";
            break;
          case 'Excerpt':
            self::$excerpt = urlencode( self::$excerpt );
            switch( $element[2] ) {
              case 'bold':
                self::$text .= '<b>'.self::$excerpt.'</b> ';
                break;
              case 'italic':
                self::$text .= '<i>'.self::$excerpt.'</i> ';
                break;
              case 'link':
                self::$text .= '<a href="'.self::$permalink.'">'.self::$excerpt.'</a> ';
                break;
              default:
                self::$text .= self::$excerpt.' ';
                break;
            }
            for( $i = 0; $i < $element[1]; $i++ )
              self::$text .= "%0A";
            break;
          case 'Content':
            if( empty( $element[3] ) || $element[3] == '0')
              $element[3] = '400';
            if( strlen( self::$content ) > $element[3] ) {
              $findNL = strrpos( substr( self::$content, 0, $element[3] + 2 ), "\n" );
              $findSpc = strrpos( substr( self::$content, 0, $element[3] + 2 ), " " );
              self::$content = substr( self::$content, 0, ($findNL > $findSpc ? ($findNL - 2) : $findSpc)) .'...';
            }
            self::$content = urlencode( self::$content );
            switch( $element[2] ) {
              case 'bold':
                self::$text .= '<b>'.self::$content.'</b> ';
                break;
              case 'italic':
                self::$text .= '<i>'.self::$content.'</i> ';
                break;
              default:
                self::$text .= self::$content.' ';
                break;
            }
            for( $i = 0; $i < $element[1]; $i++ )
              self::$text .= "%0A";
            break;
          case 'Tags':
            switch( $element[2] ) {
              case 'hashtag':
                foreach(self::$tags as $tag) {
                  self::$text .= urlencode( '#'.str_replace(" ", "_", $tag->name).' ' );
                }
                break;
              case 'link':
                foreach(self::$tags as $tag) {
                  self::$text .= '<a href="'.get_site_url().'/tag/'.$tag->slug.'/">'.urlencode( '#'.str_replace(" ", "_", $tag->name) ).'</a> ';
                }
                break;
            }
            for( $i = 0; $i < $element[1]; $i++ )
              self::$text .= "%0A";
            break;
          case 'More':
            if( empty( $element[2] ) )
              $element[2] = 'ادامه مطلب';
            self::$text .= '<a href="'.self::$permalink.'">'.urlencode( $element[2] ).'</a> ';
            for( $i = 0; $i < $element[1]; $i++ )
              self::$text .= "%0A";
            break;
          default:
            switch( $element[2] ) {
              case 'bold':
                self::$text .= '<b>'.urlencode( $element[3] ).'</b> ';
              break;
              case 'italic':
                self::$text .= '<i>'.urlencode( $element[3] ).'</i> ';
              break;
              case 'link':
                if( !empty( $element[4] ) ) {
                  if( !empty( $element[3] ) )
                    self::$text .= '<a href="'.$element[4].'">'.urlencode( $element[3] ).'</a> ';
                  else
                    self::$text .= $element[4].' ';
                }
              break;
              default:
                self::$text .= urlencode( $element[3] ).' ';
              break;
            }
            for( $i = 0; $i < $element[1]; $i++ )
              self::$text .= "%0A";
            break;
        }
      }
    }
    self::$text = str_replace( "%26nbsp%3B", '', self::$text );
  }
  // Setting Buttons for telegram post
  private static function setButtons() {
    self::$buttons = '';
    $elementButtons = esc_attr( get_option( 'elementButtonsDB', '' ) );
    if( !empty( $elementButtons ) ) {
      $arrayElements = array();
      foreach( explode( "[{7|[]", $elementButtons ) as $rowButtons) {
        if( !empty( $rowButtons ) ) {
          $arrayRow = array();
          foreach( explode( "|]{[6", $rowButtons ) as $cellButtons) {
            if( !empty( $cellButtons ) ) {
              $btn = explode( "|5[[}|", $cellButtons );
              if( $btn[0] == 'postLink')
                $arrayRow[] = array('text' => $btn[1], 'url' => self::$permalink);
              else
                $arrayRow[] = array('text' => $btn[1], 'url' => $btn[2]);
            }
          }
          $arrayElements[] = $arrayRow;
        }
      }
      self::$buttons = '&reply_markup='.json_encode( array( 'inline_keyboard' => $arrayElements ) );
    }
  }
  // Sending post to telegram channel
  private static function sendMSG( $ID ) {
    $method = self::SEND_MSG;
    $textMSG = '';
    self::$msgID = '';
    if( esc_attr( get_option( 'imageTypeDB', '' ) ) == 'imgTop' && !empty( self::$photo ) ) {
      $method = self::SEND_PHOTO;
      // if the post has been sent before, then just edit update that
      if( get_post_meta( $ID, 'telegramPostID') ) {
        if( get_post_meta( $ID, 'telegramPostType' )[0] == "imgTop") {
          $method = self::EDIT_MSG_CAPTION;
          self::$msgID = '&message_id='.get_post_meta( $ID, 'telegramPostID')[0];
        }
      }
      $textMSG = '&photo='.self::$photo.'&caption='.self::$text;
    }
    elseif( esc_attr( get_option( 'imageTypeDB', '' ) ) == 'imgBottom' && !empty( self::$photo ) ) {
      // if the post has been sent before, then just edit update that
      if( get_post_meta( $ID, 'telegramPostID') ) {
        if( get_post_meta( $ID, 'telegramPostType')[0] != 'imgTop') {
          $method = self::EDIT_MSG_TEXT;
          self::$msgID = '&message_id='.get_post_meta( $ID, 'telegramPostID')[0];
        }
      }
      $textMSG = '&text=<a href="'.self::$photo.'">‌</a>'.self::$text;
    }
    else {
      // if the post has been sent before, then just edit update that
      if( get_post_meta( $ID, 'telegramPostID') ) {
        if( get_post_meta( $ID, 'telegramPostType')[0] != 'imgTop') {
          $method = self::EDIT_MSG_TEXT;
          self::$msgID = '&message_id='.get_post_meta( $ID, 'telegramPostID')[0];
        }
      }
      $textMSG = '&text='.self::$text;
    }
    $url = self::API_URL
    .ApTchBOT::getToken()
    .$method
    .ApTchBOT::getChannelID()
    .self::$msgID
    .$textMSG
    .self::$buttons
    .self::PARSE_MODE;
    $cURL = curl_init();
    curl_setopt( $cURL, CURLOPT_URL, $url );
    curl_setopt( $cURL, CURLOPT_RETURNTRANSFER, 1 );
    $result = json_decode( urldecode( curl_exec( $cURL ) ) );
    if( $result->ok ) {
      update_post_meta( $ID, 'telegramPostID', $result->result->message_id );
      if( empty( self::$msgID ) ) {
        update_post_meta( $ID, 'telegramLC', '0' );
      }
      if( !empty( self::$photo ) )
        update_post_meta( $ID, 'telegramPostType', esc_attr( get_option( 'imageTypeDB', '' ) ) );
      else
        update_post_meta( $ID, 'telegramPostType', '' );
      return $result->result->message_id;
    }
    // if the channel post has been removed, then send it again
    elseif( $result->description == 'Bad Request: message to edit not found' || $result->description == 'Bad Request: MESSAGE_ID_INVALID' ) {
      delete_post_meta( $ID, 'telegramPostID');
      return self::sendMSG( $ID );
    }
    return false;
  }
  // Pinning the post in channel
  public static function pinMSG( $ID ) {
    if( get_post_meta( $ID, 'telegramPostID') ) {
      if( isset( $_POST[ 'enablePinning' ] ) ) {
        if( $_POST[ 'enablePinning' ] == 'checked' ) {
          $pinUrl = self::API_URL
          .ApTchBOT::getToken()
          .self::PIN_MSG
          .ApTchBOT::getChannelID()
          .'&message_id='.get_post_meta( $ID, 'telegramPostID')[0];
          $cPinURL = curl_init();
          curl_setopt( $cPinURL, CURLOPT_URL, $pinUrl );
          curl_setopt( $cPinURL, CURLOPT_RETURNTRANSFER, 1 );
          $pinResult = json_decode( urldecode( curl_exec( $cPinURL ) ) );
          if( $pinResult->ok )
            update_post_meta( $ID, 'telegramPostPin', 'pinned' );
        }
      }
    }
  }
  // Main Sending post function
  public static function sendPost( $ID, $post ) {

    ApTchBOT::getPostProperties( $ID, $post );
    ApTchBOT::setStyleToProperties();
    ApTchBOT::setButtons();
    $resutlSendMSG = ApTchBOT::sendMSG( $ID );
    ApTchBOT::pinMSG( $ID );
    return $resutlSendMSG;

  }
  // Checking & Saving the bot token
  public static function setToken( $botToken ) {
    self::$token = $botToken;
    update_option('botTokenDB', self::$token );
    self::testing('isToken');
  }
  // Getting the bot token
  public static function getToken() {
    self::$token = esc_attr( get_option( 'botTokenDB', '' ) );
    return self::$token;
  }
  // Checking & Saving the channel ID
  public static function setChannelID( $channelID ) {
    self::$ID = $channelID;
    update_option( 'channelIDDB', self::$ID );
    self::testing( 'isChannel' );
    self::testing( 'isAdmin' );
  }
  // Getting the channel ID
  public static function getChannelID() {
    self::$ID = esc_attr( get_option( 'channelIDDB', '' ) );
    return self::$ID;
  }
  // Getting the channel Name
  public static function getChannelName() {
    return esc_attr( get_option( 'channelNameDB', '[Channel Name]' ) );
  }
  // Checking & Saving Token - Channel ID - Channel Name - the token be Admin
  private static function testing( $forWhat ) {
    $url = self::API_URL.self::$token;
    switch ( $forWhat ) {
      case 'isToken':
        $url .= self::GET_ME;
        break;
      case 'isChannel':
        $url .= self::GET_CHAT.self::$ID;
        break;
      case 'isAdmin':
        $url .= self::GET_CHAT_ADMINS.self::$ID;
        break;
    }
    $cURL = curl_init();
    curl_setopt( $cURL, CURLOPT_URL, $url );
    curl_setopt( $cURL, CURLOPT_RETURNTRANSFER, 1 );
    $result = json_decode( urldecode( curl_exec( $cURL ) ) );
    if( $forWhat == 'isChannel' && $result->ok ) {
      $channelName = $result->result->title;
      update_option( 'channelNameDB', $channelName );
    }
    if( $forWhat == 'isAdmin' && $result->ok ) {
      $admins = $result->result;
      foreach( $admins as $key => $value ) {
        if( $value->user->is_bot ) {
          if( $value->can_post_messages && $value->can_edit_messages )
            update_option( $forWhat.'DB', true );
          else
            update_option( $forWhat.'DB', false );
        }
      }
    }
    else {
      update_option( $forWhat.'DB', $result->ok );
    }
  }
  // Just for checking the Token - the channel ID - the token be Admin
  public static function isCorrect( $what ) {
    return esc_attr( get_option( $what.'DB', false ) );
  }
}
