# Based off of the MFDLabs Website-Template

# Roblox code
https://github.com/VTIL-LLc/Apollo-Lua

# To first setup, please run following:

```sh
$ npm run build-full
```

* This will setup the ENV path, and build the app, you can then start developing
## .env
```env
# This is the API Key for loading scripts via apollo, Don't leak this!
apiKey=SERVER_API_KEY_HERE

#!! DON'T USE THIS KEY UNLESS YOU ARE UPDATING SOMETHING MANUALLY !!#
# THIS CAN CAUSE DAMAGE TO A VPS/WEBSERVER DUE TO IT CREATING FILES,
# WHICH CAN CAUSE PROBLEMS AS SOMEONE CAN CREATE A FILE WITH A RANDOM NAME
# AND FILL THAT FILE WITH RANDOM DATA WHICH WOULD EASYLY FILL THE DRIVE UP
# AND POSSIBLY CORRUPT/DAMAGE THE DRIVE ITSELF NO-MATTER IF IT'S A VPS/WEBSERVER.
uploadApiKey=SERVER_UPLOAD_API_KEY_HERE

# Whats the app name?
appName=Apollo

## BOOLEANS ##

# No functionality yet | Are we running apollo in debug?
isDebug=true
```
