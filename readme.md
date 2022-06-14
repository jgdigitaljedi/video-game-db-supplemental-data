# video-game-db-supplemental-data

The idea here was to create something that can be referenced and used alongside various video game APIs to supplement that data available. As a collector, I like to know which games might not be fully backward compatible with systems that say they are fully backward compatible. In the case of the Xbox generations, I also like to know which games are backward compatible with which Xbox generation because those lists are limited. This is an example of the type of thing I am looking to generate data for with this project and is intended to create JSON files that contain that data and is setup in such a way that it can be used with Giantbomb, IGDB, and TGDB. It's a WIP right now. I'm still focused on setup and data collection ATM.

Data is being collected via Wikipedia and other sites so it might not be 100% accurate all the time. Essentially, I create JSON files with some details from various website data; add unique IDs to each entry in the files for my own use; then search Giantbomb, IGDB, and TheGamesDB for their IDs and add those as well. The end result I have in mind is a data set that can be searched using the ID from whatever video game API you choose to use to get some supplemental data. Matching the various API IDs is a lot more solid way to search since I have noticed that each of the APIs has different ways of storing names (different use of capitalization, punctuation, sub-titles, etc).

For now, I'm focused mainly on North American data with some exceptions. I might go back and get the European and Japanese data at some point, but then my data structure is going to have to change. Not a huge deal, but selfishly I want to use this so the NA data is my primary focus right now.

Also, since the app isn't the focus here (the JSON files are the focus), there will be console logs, missing error handling, etc. I only need to have this working well enough to get me through all of the json data lists and keep me sane. Features are added only when I am going crazy trying to deal with a particular issue.

### RECENT DEVELOPMENT

NOTE: As of 11/7/2019, I have decided to abondon The Games DB. I've had too many problems with their API keys and that API was also getting the last amount of results so, at this point, it doesn't make sense to keep wrestling with it and just move on. I am freezing it in the UI, will eventually remove it from stats, etc. I'll leave the data I've collected for The Games DB API in there for now.

---

## Usage

Really and truthfully, the value of this project will live in the "finalOutput" directory and all else can be ignored. If you want to tinker around with this the run `npm i` and checkout the package.json folder for the npm scripts that can be used.

If you want to contribute, feel free to contact me. If you know of more data you would like to see added I am definitely open to suggestions!

---

## Organization

- "finalOutput" contains JSON files for the results of my work so far. This is where you can find useable data. Once I feel like I am done collecting data and getting the API references, I will create various combinations of the data to be used in different ways (collection of small files that are quickly searchable, single files with as much of the data combined as possible, etc).
- "notes" contains markdown files with general notes about consoles. Use this info however you see fit, but the nature of this data is so braod specturm that it doesn't really need JSON files created for it.
- "server" contains my Express.js server for the UI that I've built to help me speed up the process of generating this data.
- "textFilesToBeConverted" contains markdown files with raw data that I've collected. This data gets turned into JSON files and this is just the directory I'm using for the initial data collection via research.
- "src" contains the Vue.js app that I'm using to to speed up this process.
- "scripts" contains some Node.js scripts I'm using to parse data, merge data, scrape sites for data, add ids, etc.

Just a note here, the "EverDrives" folder is not really meant to be a part of this. I intend to remove it when I'm done generating this data. Basically, this is me generating json files with full game info for the games I have on my EverDrives so that another video game app I created for myself can use this data (basically its an app to help me decide what to play).

---

## Tasks

```
npm start
```

Starts server and Vue UI for matching API data to JSON data sets.

```
npm run ids
```

First, put in a file path and prefix. Then run this. It will assign IDs to each item in the list using the prefix and index. This is used to make quick work of generating JSON files from data gathered since all items need to have a unique ID.

```
npm run scrape:gematsu
```

First, change the url to scrape and the filePath to write to. This is meant to scrape lists from gematsu.com. This generates a basic JSON list that should then have `npm run ids` ran against it to fill in the ids.

```
npm run scrape:wiki
```

First, change the url to scrape and the filePath to write to. This is meant to scrape lists from wikipedia. This generates a basic JSON list that should then have `npm run ids` ran against it to fill in the ids. Because Wikipedia tends to break up their lists into multiple pages, I've been running it against a URL, adding a number to the file name, changing to the next url for the next data set, and continuing until I have all of the data. Then I combine the data into 1 list and run `npm run ids` against that list.

```
npm run stats
```

Looks at all completed files in fileInfoList.json and console logs stats for how many each API is missing. I'm using this to get an overall feel for which API is the most complete.

---

## Plans

I'm still gathering data and working out the data structures. To build this out, I will follow this general idea:

1. Finish gathering data into JSON files (I want to have a lot and I can come back later and add more, but would like to start with a TON).
2. Make calls for lists like "bannedInternationally.json" to get platforms list for each entry then write script to add that data to the various final output files.
3. Combine as many JSON files as makes sense via scripts to create master lists
4. Possibly grab a domain and a server and chunk this up somewhere as a fully built out API. That or make it into a npm module or something. I can figure this out later as it will be usable even as just a public GitHub repo.
5. Integrate into my existing video game projects (most of which are private for now).

---

## TODOs

- Strip out tgdb from stats and fix missing scripts.
- Reconfigure console list script to not use TGDB.
- Create script to strip results with nulls in all data from final output files.
- Get through the rest of the lists.
- Create an API using collected data.
- Get more data!

## Data Being Collected

NOTE: I've added "totalGames" to the consoleMasterList.json. The idea here is to have the total number of games released for each console in each region, but the problem has quickly become finding good data for this. Some consoles had a limited number of games released and I can find consistent numbers for the total. Others, like the NES, seem to be widely debated and have added complexity like unlicensed games. I'm working to find the most accurate totals possible, but just know that if you use these counts, they might not be 100% correct all of the time.

I've been scouring the web for unique data points and will continue to do so. Here's the data I've scraped thus far:

### Console/Platform launch titles

- Atari 2600
- Atari 5200
- Atari 7800
- Atari Jaguar
- Atari Jaguar CD
- Atari Lynx
- Bally Astrocade
- ColecoVision
- Game.com
- Gizmondo
- Mattel Intellivision
- Microsoft Xbox
- Microsoft Xbox 360
- Microsoft Xbox One
- NEC Turbografx 16
- NEC Turbografx CD
- Neo Geo Pocket Color
- Nintendo 64
- Nintendo 3DS
- Nintendo DS
- Nintendo Entertainment System
- Nintendo Game Boy
- Nintendo Game Boy Advance
- Nintendo Game Boy Color
- Nintendo GameCube
- Nintendo Switch
- Nintendo Virtual Boy
- Nintendo Wii
- Nintendo Wii U
- Nokia N-Gage
- Philips CD-i
- REAL 3DO
- Sega 32x
- Sega CD
- Sega Dreamcast
- Sega Game Gear
- Sega Genesis
- Sega Master System
- Sega Saturn
- Sony PlayStation
- Sony PlayStation 2
- Sony PlayStation 3
- Sony PlayStation 4
- Sony PlayStation Portable
- Sony PlayStation Vita
- Super Nintendo Entertainment System

### Console/Platform Exclusives

- 3do Interactive Multiplayer
- Amiga
- Atari 2600
- Atari 7800
- Atari Jaguar
- Atari Lynx
- ColecoVision
- Mattel Intellivision
- Microsoft Xbox
- Microsoft Xbox 360
- Microsoft Xbox One
- NEC Turbografx 16
- NEC Turbografx CD
- Nintendo 3DS
- Nintendo 64
- Nintendo DS
- Nintendo Entertainment System
- Nintendo Famicom Disk System
- Nintendo Game Boy
- Nintendo Game Boy Advance
- Nintendo Game Boy Color
- Nintendo GameCube
- Nintendo Switch
- Nintendo Virtual Boy
- Nintendo Wii
- Nintendo Wii U
- Philips CD-i (I can't find info for this so I started a list with what I know to be exclusives)
- Sega 32x
- Sega CD
- Sega Dreamcast
- Sega Game Gear
- Sega Genesis
- Sega Master System
- Sega Saturn
- Sony PlayStation
- Sony PlayStation 2
- Sony PlayStation 3
- Sony PlayStation 4
- Sony PlayStation Portable
- Sony PlayStation Vita
- Super Nintendo Entertainment System

### Console/Platform Region Lock Info

- platforms/consoles that are region free
- PS3 games that aren't region free (the PS3 games are region free with a couple of exceptions)

### Multiplayer hardware

- NES Four Score games
- SNES Super Multitap games
- Sega Genesis Team Player games
- Sega Saturn Multiplayer Adapter games
- TurboGrafx-16 Multitap games
- Sony PlayStation Multitap games

### Special

- Sega Genesis Black Box Grid games
- NES Black Box games
- NES hang tab games
- games banned in various countries with the reason for the ban
- platforms/consoles that play burned disks without modification
- PlayStation long box games

### Backward Compatibility

- PS1 games that don't work properly on the various PS2 models
- Game Boy and Game Boy Color games that don't work properly on the Game Boy Advance
- Xbox games that work on the Xbox 360
- Xbox games that work on the Xbox One
- Xbox 360 games that work on the Xbox One

### Greatest Hits/Player's Choice/Selects/etc

- Microsoft Xbox Platinum Hits
- Microsoft Xbox Platinum Collection (Japan)
- Microsoft Xbox Classics (PAL)
- Microsoft Xbox 360 Platinum Hits
- Microsoft Xbox 360 Platinum Collection (Japan)
- Microsoft Xbox One Greatest Hits
- Nintendo 3DS Nintendo Selects
- Nintendo 64 Player's Choice
- Nintendo Game Boy Player's Choice
- Nintendo Game Boy Advance Player's Choice
- Nintendo Game Boy Color Nintendo Selects
- Nintendo GameCube Player's Choice (Europe)
- Nintendo GameCube Player's Choice
- Nintendo SNES Player's Choice
- Nintendo Wii Nintendo Selects
- Nintendo Wii U Nintendo Selects
- Sega Dreamcast All-Stars (Japan)
- Sega Dreamcast All-Stars (North America)
- Sony PlayStation Greatest Hits
- Sony PlayStation 2 Greatest Hits
- Sony PlayStation 3 Greatest Hits
- Sony PlayStation 4 Greatest Hits
- Sony PlayStation Portable Greatest Hits

### Misprints and Errors (from iamerror.gamehacking.org/)

#### Games

- Atari 2600
- Atari 5200
- Atari 7800
- Atari Jaguar
- Atari Lynx
- Colecovision
- Gizmondo
- Mattel Intellivision
- Microsoft Xbox
- Microsoft Xbox 360
- Microsoft Xbox One
- NEC TurboGrafx-16
- Nintendo 64
- Nintendo DS
- Nintendo Entertainment System
- Nintendo Game Boy
- Nintendo Game Boy Advance
- Nintendo Game Boy Color
- Nintendo GameCube
- Nintendo SNES
- Nintendo Switch
- Nintendo Virtual Boy
- Nintendo Wii
- Nintendo Wii U
- Nokia N-Gage
- Philips CD-i
- Sega 32X
- Sega CD
- Sega Dreamcast
- Sega Game Gear
- Sega Genesis
- Sega Master System
- Sega Saturn
- SNK Neo Geo AES
- Sony PlayStation
- Sony PlayStation 2
- Sony PlayStation 3
- Sony PlayStation 4
- Sony PlayStation 5
- Sony PlayStation Portable
- Sony PlayStation Vita

---

### Things I've learned about these APIs

Since I have been using these APIs to try and build out my JSON data matching their IDs with the names of various games and console, I've learned a few things that you might find helpful if you ever work with these APIs.

- If you use IGDB, know that searching games specific to a platform doesn't always return a result but when you remove the platform you almost always get what you were looking for. It's best to do the platform specific search first because multiple different games with the same title are sometimes released for the various consoles, but if you don't get a result then remove the platform from the search. Also, searches for digital only games on IGDB seem to often have their own platform so, for example, if you search for a Xbox Live Arcade game using the ID from Xbox 360, you don't get a result. IGDB seems to be the fastest to return results most of the time and is definitely the best at returning results for digital only and independent titles. Conversely, IGDB is the worst at getting results for Japanese titles.
- If you use Giantbomb, know that you should remove punctuation from your search string (mainly the punctuation in the title of games). When the punctuation is left in, sometimes you don't get a result and sometimes it just throws an error. Most of the time when you leave it out, you have better results. As a general rule of thumb, leave it in first and search, then if there are no results remove the punctuation and try again. Also, searches for digital only games on GB seem to often have their own platform so, for example, if you search for a Xbox Live Arcade game using the ID from Xbox 360, you don't get a result. Giantbomb is definitely the slowest to return results and seems to be missing a lot of data as well.
- If you use TheGamesDB, know that it seems to ignore numbers in your search string and returns more results than the other 2. An example would be searching "FIFA 2006" and it will return basically any game with FIFA in the title. Also, it seems as if TheGamesDB seems focused mostly on physical games as many of my digital-only searches have come back without any results that match. TheGamesDB seems like a solid API as long as your are searching for physical release games. It lacks a lot of data for digital only games. It does, however, return the best results for Japanese titles.

---

### Stats

Before deciding to end support for TheGames DB, I had collected 7812 data points and TheGames DB was missing 1106 or 14% of those results.

Out of 15188 data points collected so far, the APIs are missing data the following number of items:

- Missing from all APIs: 1473 (10%)
- IGDB: 1625 (11%)
- Giantbomb: 2597 (17%)
