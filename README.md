# HomeyDash (BETA)
HomeyDash is a front-end for Homey, intended to use on (wallmounted) tablets, but will work on other devices as well.

**This is a BETA release, that means you can expect bugs or missing functions!**

The idea of this dashboard is to integrate more then just devices connected to Homey. Later in the development progress i will add some plugins that can be enabled or disabled in the settings. These plugins for example can be pages with some Plex information, a nice RSS-feed or a sabnzbd dashboard to manage your downloads.
You can expand the dashboard with widgets as well, currently the only active and working widget is to control ON/OFF devices. Other widgets to control Homey devices will be added soon, and in the future even other type of widgets are possible. (for example a nice weather widget or for our dutchies "NOS in 60 seconden").

## How to get started
After you have installed the app, open a new tab in your browser and go to http://my.athom.com . There you will have to login and wait until you see the big Homey. Do a right mouseclick on the Homey and chose to copy the link. Now paste the link somewhere readable (like notepad), now you can see your bearer token.

Now go back to your Homey then to Settings and chose HomeyDash in the sidebar. Now copy the previous found bearer token into the right field. Chose if you want to auto-start the dashboard on boot and press start server.

Now you can access the dashboard on http://YOURHOMEYIP:1337

## I found a bug! What should i do?
It would be nice if you are able to contact me on Slack (swttt is my username there) or create an issue on the github page (https://github.com/swttt/com.swttt.homeydash/issues)

## Changelog

**Version 0.0.4**

- Added kwh (meter_power capability) to capable devices
- Added setting to hide kwh on widget cards
- Fixed default page settings for first page in the dropdown
- Fixed issue that when you removed a page, you still where able to add widgets (with an error)
- Fixed route to page that doesn't excists (redirects to the main page or default page)

**Version 0.0.3**

- Fixed getting baseurl as ip (not the best way :) )
- Added setting to set default page on load


**Version 0.0.2**

- Fixed crash when not providing bearertoken on fresh install
- Added link to the app settings page when the dashboard is running
- Added setting to hide sidebar on page reload
- Added app icons (when saved to homescreen etc.)

**Version 0.0.1**

- Initial BETA release





**If you like this app, then consider to buy me a beer :)**

[![](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=TAZANTFTCH3DJ)
