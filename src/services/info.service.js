export default {
  consoleInfo: () => {
    return [
      { name: 'PlayStation', igdbId: null, gbId: null, gbGuid: null },
      { name: 'PlayStation 2', igdbId: null, gbId: null, gbGuid: null },
      { name: 'NES', igdbId: null, gbId: null, gbGuid: null },
      { name: 'SNES', igdbId: null, gbId: null, gbGuid: null },
      { name: 'PlayStation 3', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Game Boy', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Game Boy Advance', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Sega Genesis', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Xbox', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Xbox 360', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Xbox One', igdbId: null, gbId: null, gbGuid: null },
      { name: 'PlayStation 4', igdbId: null, gbId: null, gbGuid: null },
      { name: '3do', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Vita', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Philips CD-i', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Neo Geo Pocket', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Nintendo DS', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Atari 5200', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Atari Jaguar', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Atari Lynx', igdbId: null, gbId: null, gbGuid: null },
      { name: 'PSP', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Game Boy Color', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Sega Saturn', igdbId: null, gbId: null, gbGuid: null },
      { name: 'GameCube', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Wii', igdbId: null, gbId: null, gbGuid: null },
      { name: 'Wii U', igdbId: null, gbId: null, gbGuid: null }
    ];
  },
  fileInfo: () => {
    // path is relative to inside server folder since file operations happen from there
    return [
      {
        title: 'Game Boy to GBA BC',
        filePath: '../textFilesToBeConverted/backwardCompatibility/gbToGbaBc.json'
      },
      {
        title: 'PS to PS2 BC',
        filePath: '../textFilesToBeConverted/backwardCompatibility/ps1ToPs2Bc.json'
      },
      {
        title: 'PS3 Region Exceptions',
        filePath: '../textFilesToBeConverted/regionLock/ps3RegionLockExceptions.json'
      },
      {
        title: 'Genesis Black Box Grid Games',
        filePath: '../textFilesToBeConverted/special/blackBoxGridGenesisGames.json'
      }
    ];
  }
};
