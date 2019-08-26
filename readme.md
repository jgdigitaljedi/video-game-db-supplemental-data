# video-game-db-supplemental-data

The idea here was to create something that can be referenced and used alongside various video game APIs to supplement that data available. As a collector, I like to know which games might not be fully backward compatible with systems that say they are fully backward compatible. In the case of the Xbox generations, I also like to know which games are backward compatible with which Xbox generation because those lists are limited. This is an example of the type of thing I am looking to generate data for with this project and is intended to create JSON files that contain that data and is setup in such a way that it can be used with Giantbomb, IGDB, and TGDB. It's a WIP right now. Also, note that I just dumped in an old UI I built for something similar and have yet to update it to be applicable for the current project. I'm still focused on setup and data collection ATM.

For now, I'm focused mainly on North American data with some exceptions. I might go back and get the European and Japanese data at some point, but then my data structure is going to have to change. Not a huge deal, but selfishly I want to use this so the NA data is my primary focus right now.

---

## Usage

Really and truthfully, the value of this project will live in the "finalOutput" directory and all else can be ignored. If you want to tinker around with this the run `npm i` and checkout the package.json folder for the npm scripts that can be used.

If you want to contribute, feel free to submit a PR or contact me. If you know of more data you would like to see added I am definitely open to suggestions!

---

## Organization

- "finalOutput" contains JSON files for the results of my work so far. This is where you can find useable data. Once I feel like I am done collecting data and getting the API references, I will create various combinations of the data to be used in different ways (collection of small files that are quickly searchable, single files with as much of the data combined as possible, etc).
- "notes" contains markdown files with general notes about consoles. Use this info however you see fit, but the nature of this data is so braod specturm that it doesn't really need JSON files created for it.
- "server" contains my Express.js server for the UI that I've built to help me speed up the process of generating this data.
- "textFilesToBeConverted" contains markdown files with raw data that I've collected. This data gets turned into JSON files and this is just the directory I'm using for the initial data collection via research.
- "src" contains the Vue.js app that I'm using to to speed up this process.
- "scripts" contains some Node.js scripts I'm using to parse or merge data.

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

---

## Plans

I'm still gathering data and working out the data structures. To build this out, I will follow this general idea:

1. Finish gathering data into JSON files (I want to have a lot and I can come back later and add more, but would like to start with a TON)
2. Combine as many JSON files as makes sense via scripts to create master lists
3. Possibly grab a domain and a server and chunk this up somewhere as a fully built out API. That or make it into a npm module or something. I can figure this out later as it will be usable even as just a public GitHub repo.
4. Integrate into my existing video game projects (most of which are private for now).
