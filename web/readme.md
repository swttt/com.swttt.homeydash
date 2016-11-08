# HomeyDash v2

## About
Since i was missing a more "central" way of controlling my Homey, i thought it was a nice idea to create a dashboard.
First time coding in Angular gave a few problems, thats why i started on the V2. Some parts of the first version are still available since it uses a different way to connect to the homey.

My idea is to have multiple dashboards. One in every room.
Thats why you have to set the default zone on first start, every dashboard shows only the devices available in that zone.

## Config
The dashboard is written to run of a webserver.
Most people who have a synology NAS or RPI should google on how to install and enable a webserver.
For testing this on windows/osx/linux is XAMPP a nice way to go. (www.apachefriends.org)

When you have set up your webserver you can clone the dashboard in your servers's root folder. (most of the time named htdocs or www)

Now edit the config.json with your homey's cloud id(the cloud id can be found in your homey's settings) and bearer token.
You can get your bearer token in a few steps:
  1. Go to http://my.athom.com .
  2. Login with your account.
  3. Right click on your homey and copy the link
  4. Paste the link in notepad or a new tab.
  5. Get the bearer token out of your link.
  6. Add it to the config.json.
  7. DONE!

Open a browser and go to your webserver.
On first start you need to select a default zone, this is saved to the local memory. So on page refresh you still are in the same zone.

To run the app in fullscreen you can add it to your homescreen. (currently only working for android).

## Known bugs / Issues / General answers
HomeyDash is developed in Chrome, but is tested on the side in Safari as well.
Athom can change the api, and this might break the dashboard.
Since this is a work in progress, some functies may change, dissapear or not work after commits.

Feel free to use this code as a base for your own dashboard. I am curious what you can make out of it...it ain't that hard ;)
