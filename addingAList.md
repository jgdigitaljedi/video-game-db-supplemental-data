# Adding a list

I am adding this file because, when I go long periods without touching this repo, I sometimes forget the process I've created for adding another list.

## Steps

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
2. Once the list is created, it needs to be added to `server/static/fileInfoList.json` to be picked up by the frontend. Make sure that `complete` is set to `false` so the new file is at the top of the dropdown.
3. Run through the file in the frontend to fill in the API ids for all of the items in the list. `npm start` and go to `http://localhost:3001`
4. Mark the list as complete when finished then stop the server.
5. Copy the file from the subdirectory in `textFilesToBeConverted` to the corresponding subdirectory in `finalOutput/smallFiles`.
6. Add the new file to the correct console object in `scripts/utility/updateAllLists/listsData.js`.
7. Run `npm run updateAll` to add new file data to the console master list it belongs to.
8. Run `npm run stats` to updated the numbers in the readme.
9. git add, commit, and push
