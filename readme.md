# video-game-db-supplemental-data

The idea here was to create something that can be referenced and used alongside various video game APIs to supplement that data available. As a collector, I like to know which games might not be fully backward compatible with systems that say they are fully backward compatible. In the case of the Xbox generations, I also like to know which games are backward compatible with which Xbox generation because those lists are limited. This project is intended to create JSON files that contain that data and is setup in such a way that it can be used with Giantbomb, IGDB, and TGDB. It's a WIP right now. Also, note that I just dumped in an old UI I built for something similar and have yet to update it to be applicable for the current project. I'm still focused on setup and data collection ATM.

## Usage

Really and truthfully, the value of this project will live in the "finalOutput" directory and all else can be ignored. If you want to tinker around with this the run `npm i` and checkout the package.json folder for the npm scripts that can be used.

If you want to contribute, feel free to submit a PR or contact me. If you know of more data you would like to see added I am definitely open to suggestions!

## Organization

- "finalOutput" contains JSON files for the results of my work so far. This is where you can find useable data. Once I feel like I am done collecting data and getting the API references, I will create a single JSON file containing all of the data with a consitent data format that can be used.
- "notes" contains markdown files with general notes about consoles. Use this info however you see fit, but the nature of this data is so braod specturm that it doesn't really need JSON files created for it.
- "server" contains my Express.js server for the UI that I've built to help me speed up the process of generating this data.
- "textFilesToBeConverted" contains markdown files with raw data that I've collected. This data gets turned into JSON files and this is just the directory I'm using for the initial data colelction via research.
- "src" contains the Vue.js app that I'm using to to speed up this process.
- "scripts" contains some Node.js scripts I'm using to parse or merge data.

## Tasks

```
npm start
```

Starts server and Vue UI for matching API data to JSON data sets.
