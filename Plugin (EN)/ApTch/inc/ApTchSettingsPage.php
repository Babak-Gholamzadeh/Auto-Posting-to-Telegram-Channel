<?php
/*
*@package Auto-postingToTelegramChannel
*/
// Remind Open Tab For Saving Changes
$firstTab = '';
$secondTab = '';
if( isset( $_POST['tabSelected'] ) ) {
  switch ( $_POST['tabSelected'] ) {
    case '1':
      $firstTab = 'selected';
      break;
    case '2':
      $secondTab = 'selected';
      break;
  }
}
else {
  if( ApTchBOT::isCorrect( 'isAdmin' ) )
    $secondTab = 'selected';
  else
    $firstTab = 'selected';
}
?>

<div class="wrap">

  <!-- The Title of Settings page -->
  <i class="fab fa-telegram"></i>
  <h1 class="maintitle">Telegram Settings</h1>

  <!-- Tab Menus -->
  <nav class='tabMenu'>
    <ul>
      <li class="<?php echo $firstTab; ?>">Initialize</li>
      <li class="<?php echo $secondTab; ?>">Customize</li>
    </ul>
  </nav>

  <div class="panels">

    <!-- First Tab Panel "Initialize" -->
    <div class='tabContent' id="initial">
      <form method="post">

        <input type='hidden' name='tabSelected' value='1'>

        <h2 class="explanation">Enter your bot token and channel ID here to initialize the plugin</h2>
        <table class="form-table">
          <tbody>
            <!-- Getting & Checking the bot token -->
            <tr scope="row">
              <th>
                <label for="botToken">Bot Token</label>
              </th>
              <td>
                <input type="text" id="botToken" class="regular-text ltr" name="botToken" value="<?php echo ApTchBOT::getToken(); ?>">
                <?php
                $testToken = ApTchBOT::isCorrect( 'isToken' );
                if( $testToken ) {
                  echo "<p class='fas fa-check correct'><i>The token is valid.</i></p>";
                }
                elseif( !$testToken && !empty( ApTchBOT::getToken() ) ) {
                  echo "<p class='fas fa-times error'><i>This token doesn't exist!</i></p>";
                  echo "<p class='fas fa-info info'><i>Put the <strong>token</strong> of your telegram <strong>bot</strong> here. If you don't have any, go to <a href='https://telegram.me/BotFather' target='_blank' rel='nofollow noopener'>@BotFather</a> and create one.</i></p>";
                }
                ?>
              </td>
            </tr>
            <!-- Getting & Checking the channel ID -->
            <tr scope="row">
              <th>
                <label for="channelID">Channel ID (Without @)</label>
              </th>
              <td>
                <input type="text" id="channelID" class="regular-text ltr" name="channelID" value="<?php echo ApTchBOT::getChannelID(); ?>">
                <?php
                $testToken = ApTchBOT::isCorrect( 'isToken' );
                $testChannel = ApTchBOT::isCorrect( 'isChannel' );
                $testAdmin = ApTchBOT::isCorrect( 'isAdmin' );
                if( $testToken ) {
                  if( $testChannel ) {
                    echo "<p class='fas fa-check correct'><i>The channel ID is valid.</i></p>";
                    if( $testAdmin ) {
                      echo "<p class='fas fa-check correct'><i>And the bot is admin there!</i></p>";
                    }
                    else {
                      echo "<p class='fas fa-times error'><i>But the bot <strong>isn't admin</strong> in this channel yet, or it <strong>doesn't have enough permissions</strong> <br>(just '<u>Post messages</u>' and '<u>Edit messages of others</u>' are enough).</i></p>";
                      echo "<p class='fas fa-info info'><i>Now you should add the bot in the channel <strong>as an admin</strong>, and <strong>set engough permissions</strong> for that.</i></p>";
                    }
                  }
                  elseif ( !$testChannel && !empty( ApTchBOT::getChannelID() ) ) {
                    echo "<p class='fas fa-times error'><i>This channel doesn't exist!</i></p>";
                    echo "<p class='fas fa-info info'><i>Put <strong>the ID of your telegram channel</strong> here. If you don't have any, now you should create one.</i></p>";
                  }
                }
                elseif( !$testToken && !empty( ApTchBOT::getChannelID() ) ) {
                  echo "<p class='fas fa-info info'><i>First you should put a valid <strong>token</strong>. Because After that the plugin will be able to check the <strong>channel ID</strong>.</i></p>";
                }
                ?>
              </td>
            </tr>
          </tbody>
        </table>
        <br>
        <p>
          <input type="submit" class="button button-primary" name="submitInitialize" id="submit" value="Check & Save">
          <spen class='description'><i>Checking may take a few seconds, depends on your internet connection speed.</i></span>
          </p>
        </form>
      </div>

    <!-- Second Tab Panel "Customize" -->
    <div class='tabContent' id="customize">
      <form method="post">

        <input type='hidden' name='tabSelected' value='2'>
        <input type="hidden" class="countItems" name='countItems' value="0">
        <input type="hidden" class="elementItems" name='elementItems' value="<?php echo esc_attr( get_option( 'elementItemsDB', '' ) ); ?>">
        <input type="hidden" class="imageType" name='imageType' value="<?php echo esc_attr( get_option( 'imageTypeDB', '' ) ); ?>">

        <h2 class="explanation">Add the items that you desire to be shown on the channel posts</h2>
        <!-- Enabling Auto-Posting -->
        <div class='enabling'>
          <label class='enableSendingPost'>
            <span class='bull'></span>
            <?php
              $enableValue = 'checked';
              if( ApTchBOT::isCorrect( 'isAdmin' ) )
                $enableValue = esc_attr( get_option( 'enablingDB', 'checked' ) );
              else
                $enableValue = 'disable';
              echo "<input type='hidden' name='enabling' value='$enableValue'>"
            ?>
          </label>
          <span class='enableCaption'>Enable Auto-Posting</span>
        </div>

        <!-- Area for simulating telegram post style -->
        <div class="postCustomization">

          <!-- popUp of selecting image type -->
          <div class='popUpBg'>
            <div class='popUpFg'>
              <div class='imgType' id='imgBottom'>
                <div class='charCountBottom'>
                  <div class='numberChar'>
                    <div class='number'>4096</div>
                    <div class='char'>Char</div>
                  </div>
                  <div class='bracket'>{</div>
                </div>
                <div class='showImg bottom'>
                  <div class='txt'>
                    <span></span>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                    <i></i>
                  </div>
                  <div class='img'>
                    <i class="far fa-image"></i>
                  </div>
                </div>
                <p class='description'>If the image be put <b>below</b> the text, the post can contain up to <b>4096</b> characters.</p>
              </div>
              <div class='imgType' id='imgTop'>
                <div class='charCountTop'>
                  <div class='bracket'>}</div>
                  <div class='numberChar'>
                    <div class='number'>200</div>
                    <div class='char'>Char</div>
                  </div>
                </div>
                <div class='showImg top'>
                  <div class='img'>
                    <i class="far fa-image"></i>
                  </div>
                  <div class='txt'>
                    <i></i>
                    <i></i>
                    <span></span>
                  </div>
                </div>
                <p class='description'>If the image be put <b>above</b> the text, the post can contain only <b>200</b> characters.</p>
              </div>
            </div>
          </div>

          <!-- The content of post be shown here -->
          <section>

            <header class='beginOfPost'>
              <!-- The name of the channel -->
              <p class="chName"><?php echo ApTchBOT::getChannelName(); ?></p>
              <!-- Setting delay for sending post to channel -->
              <div class='delay' title='Set Delay to send the posts after publishing on the website'>
                <i class="fas fa-stopwatch"></i>
                <span class='inputDelay'>
                  <input type='number' name='delayNumber' placeholder='0' min='0' value='<?php echo esc_attr( get_option( 'delayNumberDB', '' ) ); ?>'>
                  <span class='min'>min</span>
                </span>
              </div>

            </header>

            <!-- The top image -->
            <div class='imgFeatured imgTop'>
              <!-- Show the SVG Image -->
              <div class='imgBox'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M 464 448 L -0.6845706105232239 448.06756591796875 L -0.6098955827364989 63.130760192871094 L 512.6831665039062 63.736061096191406 L 512 400 C 512 426.51 490.51 448 464 448 Z M 112 120 C 81.072 120 56 145.072 56 176 C 56 206.928 81.072 232 112 232 C 142.928 232 168 206.928 168 176 C 168 145.072 142.928 120 112 120 Z M 64 384 L 448 384 L 448 272 L 360.485 184.485 C 355.79900000000004 179.799 348.201 179.799 343.514 184.485 L 208 320 L 152.485 264.485 C 147.799 259.79900000000004 140.20100000000002 259.79900000000004 135.514 264.485 L 64 336 L 64 384 Z" transform="matrix(1 0 0 1 0 0)"></path><rect transform="matrix(1 0 0 1 458.615 394.416)" width="53.0413" height="53.0413" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" opacity="1" rx="0" y="0" x="0"></rect></svg>
              </div>
              <!-- Options for Remove image & Moving image position -->
              <div class='imgOption'>
                <div class='imgRemove'>
                  <i class='fas fa-trash-alt'></i>
                </div>
                <div class='imgMove'>
                  <i class="fas fa-arrow-circle-down"></i>
                </div>
              </div>
              <!-- Adding items after the image -->
              <div class='add after img' title='Add new item here!'>
                <ul class='addItem'>
                  <li class='Title'>Title</li>
                  <li class='Excerpt'>Excerpt</li>
                  <li class='Content'>Content</li>
                  <li class='Tags'>Tags</li>
                  <li class='More'>Read More</li>
                  <li class='Custom'>Custom Text</li>
                </ul>
                <i class='fas fa-plus-circle'></i>
              </div>
            </div>

            <!-- Put new element here (element equals item)-->
            <div class='element'>
              <!-- Adding the other items before this item -->
              <div class='add before' title='Add new item here!'>
                <ul class='addItem'>
                  <li class='Custom'>Custom Text</li>
                  <li class='Title'>Title</li>
                  <li class='Excerpt'>Excerpt</li>
                  <li class='Content'>Content</li>
                  <li class='Tags'>Tags</li>
                  <li class='More'>Read More</li>
                  <li class='Image'>Featured Image</li>
                </ul>
                <i class='fas fa-plus-circle'></i>
              </div>
              <!-- Remove this item -->
              <div class='side remove' title='Remove the item'>
                <i class='fas fa-trash-alt'></i>
              </div>
              <!-- Item Content (name, style and options) -->
              <div class='item' title='Click to tweak'>
                <div class='header'>
                  <span class='name'>
                    <!-- the name of each item will be shown here -->
                  </span>
                  <i class='fas fa-ellipsis-v'></i>
                  <!-- the number of New Lines -->
                  <span class='dashicons dashicons-editor-break' title='The number of new lines after this item'>
                    <span class='minus'>-</span>
                    <span class='counter'>1</span>
                  </span>
                  <!-- Style of the item -->
                  <span class='style fas fa-link'></span>
                </div>
                <div class='options'>
                  <!-- the options of each item will be shown here -->
                </div>
              </div>
              <!-- Adding New Line after this item -->
              <div class='side nl' title='Add new line after this item'>
                <i class='dashicons dashicons-editor-break'></i>
              </div>
              <!-- Adding the other items after this item -->
              <div class='add after' title='Add new element here!'>
                <i class='fas fa-plus-circle'></i>
                <ul class='addItem'>
                  <li class='Image'>Featured Image</li>
                  <li class='More'>Read More</li>
                  <li class='Tags'>Tags</li>
                  <li class='Content'>Content</li>
                  <li class='Excerpt'>Excerpt</li>
                  <li class='Title'>Title</li>
                  <li class='Custom'>Custom Text</li>
                </ul>
              </div>
            </div>

            <!-- The First Add Button -->
            <div class='add after first' title='Add new item here!'>
              <ul class='addItem'>
                <li class='Image'>Featured Image</li>
                <li class='Title'>Title</li>
                <li class='Excerpt'>Excerpt</li>
                <li class='Content'>Content</li>
                <li class='Tags'>Tags</li>
                <li class='More'>Read More</li>
                <li class='Custom'>Custom Text</li>
              </ul>
              <i class='fas fa-plus-circle'></i>
            </div>

            <!-- The bottom image -->
            <div class='imgFeatured imgBottom'>
              <!-- Adding items before the image -->
              <div class='add before img' title='Add new item here!'>
                <ul class='addItem'>
                  <li class='Custom'>Custom Text</li>
                  <li class='Title'>Title</li>
                  <li class='Excerpt'>Excerpt</li>
                  <li class='Content'>Content</li>
                  <li class='Tags'>Tags</li>
                  <li class='More'>Read More</li>
                </ul>
                <i class='fas fa-plus-circle'></i>
              </div>
              <!-- Options for Remove image & Moving image position -->
              <div class='imgOption'>
                <div class='imgRemove'>
                  <i class='fas fa-trash-alt'></i>
                </div>
                <div class='imgMove'>
                  <i class="fas fa-arrow-circle-up"></i>
                </div>
              </div>
              <!-- Show the SVG Image -->
              <div class='imgBox'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M 464 448 L -0.6845706105232239 448.06756591796875 L -0.6098955827364989 63.130760192871094 L 512.6831665039062 63.736061096191406 L 512 400 C 512 426.51 490.51 448 464 448 Z M 112 120 C 81.072 120 56 145.072 56 176 C 56 206.928 81.072 232 112 232 C 142.928 232 168 206.928 168 176 C 168 145.072 142.928 120 112 120 Z M 64 384 L 448 384 L 448 272 L 360.485 184.485 C 355.79900000000004 179.799 348.201 179.799 343.514 184.485 L 208 320 L 152.485 264.485 C 147.799 259.79900000000004 140.20100000000002 259.79900000000004 135.514 264.485 L 64 336 L 64 384 Z" transform="matrix(1 0 0 1 0 0)"></path><rect transform="matrix(1 0 0 1 458.615 394.416)" width="53.0413" height="53.0413" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" opacity="1" rx="0" y="0" x="0"></rect></svg>
              </div>
            </div>

            <!-- Just for showing better sumilating of telegram post -->
            <footer class="endOfPost">
              <span>
                <i class="fas fa-eye"></i>
                <span>6493 </span>
                <span>10:22 AM</span>
              </span>
            </footer>

          </section>

          <!-- Buttons section for telegram -->
          <div class='urlButton'>
            <input type='hidden' class='countBtnRow' name='countBtnRow' value=0>
            <input type='hidden' class='elementButtons' name='elementButtons' value="<?php echo esc_attr( get_option( 'elementButtonsDB', '' ) ); ?>">

            <!-- The row for buttons -->
            <div class='btnElement'>
              <!-- Adding new row before this row -->
              <div class='btnAdd before'>
                <i class="link fas fa-arrow-up"></i>
                <i class='add fas fa-plus-circle'></i>
              </div>
              <!-- Remove this row -->
              <div class='btnRemove' title="Remove this row of buttons">
                <i class='fas fa-trash-alt'></i>
              </div>
              <!-- Each buttons in the row -->
              <div class='btnItem'>
                <div class='btn'>
                  <i class="link fas fa-arrow-up"></i>
                  <!-- Caption for button -->
                  <span class='btnCaption'>
                    Link
                  </span>
                  <!-- Inputs for saving options of each button -->
                  <input type='hidden' name='linkType' value='customLink'>
                  <input type='hidden' name='btnLink' value=''>
                </div>
              </div>
              <!-- Adding new button in this row -->
              <div class='btnAddCell'>
                <i class="link fas fa-arrow-up"></i>
                <i class='add fas fa-plus-circle'></i>
              </div>
              <!-- Options for each button (caption & link) -->
              <div class='btnOptions'>
                <label class='radioStyle btn' id='postLink' title='The button be linked to the website post'>Post Link</label>
                <label class='radioStyle btn' id='customLink' title='Enter custom address'>Custom Link</label>
                <label class='captionLabel' title='Enter the caption'>Caption <input type='text' name='btnCaption' class='btnCaption' value=''></label>
                <label class='addressLabel' title='Enter your custom link'>Link <input type='text' name='btnLink' class='btnLink' value=''></label>
              </div>
            </div>
            <!-- Adding new row after this row -->
            <div class='btnAdd after'>
              <i class="link fas fa-arrow-up"></i>
              <i class='add fas fa-plus-circle'></i>
            </div>

          </div>
          <!-- End Of Buttons section (.urlButton) -->

        </div>
        <!-- End Of Post Area (.postCustomization) -->

        <br>
        <p>
          <input type="submit" class="button button-primary" name="submitCustomize" id="submit" value="Save As Default">
        </p>

      </form>
    </div>

  </div>

</div>
