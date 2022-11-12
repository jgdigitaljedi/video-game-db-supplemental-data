# Adding a list

I am adding this file because, when I go long periods without touching this repo, I sometimes forget the process I've created for adding another list.

## Steps

# How to add a list

1. Create the raw list in the `textFilesToBeConverted` directory.

- This can be done many ways. I have scraper scripts and scripts to turn a string array into an array of objects ready for the frontend. Regardless, a raw list needs to have the following format before it can be used in the frontend:
  ```json
  {
    "name": "",
    "id": "",
    "details": "",
    "igdbId": "",
    "gbId": "",
    "gbGuid": "",
    "tgdbId": ""
  }
  ```

2. Add new ID prefix to `notes/myUsageOfIds.md`
3. Once the list is created, it needs to be added to `server/static/fileInfoList.json` to be picked up by the frontend. Make sure that `complete` is set to `false` so the new file is at the top of the dropdown.
4. Run through the file in the frontend to fill in the API ids for all of the items in the list. `npm start` and go to `http://localhost:3001`
5. Mark the list as complete when finished then stop the server.
6. Copy the file from the subdirectory in `textFilesToBeConverted` to the corresponding subdirectory in `finalOutput/smallFiles`.
7. Add the new file to the correct console object in `scripts/utility/updateAllLists/listsData.js`.
8. Run `npm run updateAll` to add new file data to the console master list it belongs to.
9. Run `npm run stats` to updated the numbers in the readme.
10. git add, commit, and push

# Add a new console/platform

1. go to `scripts/utility/getPlatformInfo/getPlatformInfo.js` and use the search string for the new console/platform name as the value of `pName`.
2. Run `npm run platformInfo`
3. The results for IGDB and GB will be logged. Take the IDs from the logs and add them to `server/static/consoleMasterList.json` and `finalOutput/consoleMasterList.json` matching the object fromat.
4. Add a new console/platform entry to `scripts/utility/updateAllLists/listsData.js`
5. Create you list file using the directions above and start the frontend to start generating data for your new platform.
