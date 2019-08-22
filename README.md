# xfe-api-shell
command line tool in node for xfe api queries

# installation
`npm install -g xfe-api-shell`

Yn first usage you will be asked to enter your api key and password and optionaly to set the api url.

Your api key and password will be saved into a file called config.json in the module folder. Make sure not to send this file to anyone you do not intent to since it contains your credentials.

to obtain an api key and password follow these instructions: https://api.xforce.ibmcloud.com/doc/#auth

# usage
`xfe -h` get help

`xfe whois example.com` query whois data of a domain

`xfe url` get a report of malicious url's from different categories in a specified time frame

`xfe early` get a feed of malicious doains discovered by early warning analytics, this service is paid, you must set your account for this to work

`xfe dns example.com` get dns resolutions and passive dns inspection for a domain

you can use -h on each of the sub commands to get details and help on the command and its options.
