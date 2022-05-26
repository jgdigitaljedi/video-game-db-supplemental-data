const path = require('path');

const smallFiles = path.join(__dirname, '../../../finalOutput/smallFiles');
// @TODO: remove 'Test' from output once verified that script works
const consoleLists = path.join(__dirname, '../../../finalOutput/consoleListsTest');

module.exports.listData = [
  {
    name: 'Magnavox Odyssey 2',
    id: 'ccl47',
    launchTitles: require(path.resolve(
      smallFiles,
      'launchTitles/magnavoxOdyssey2LaunchTitles.json'
    )),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'MagnovoxOdysee2.json')
  },
  {
    name: 'Famicom Disk System',
    id: 'ccl48',
    launchTitles: null,
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/famicomDiskSystemExclusives.json'
    )),
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'FamicomDiskSystem.json')
  },
  {
    name: 'Amiga',
    id: 'ccl49',
    launchTitles: null,
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/amigaExclusives.json')),
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'Amiga.json')
  },
  {
    name: 'Nintendo Virtual Boy',
    id: 'ccl50',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/virtualBoyLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/virtualBoyExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/virtualBoyMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'VirtualBoy.json')
  },
  {
    name: 'Nintendo Entertainment System (NES)',
    id: 'ccl1',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/nesLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nesExclusives.json')),
    misprintsAndErrors: null,
    special: [
      require(path.resolve(smallFiles, 'multiplayer/nesFourScore.json')),
      require(path.resolve(smallFiles, 'special/nesBlackBoxTitles.json')),
      require(path.resolve(smallFiles, 'special/nesHangtabGames.json'))
    ],
    output: path.resolve(consoleLists, 'nintendoEntertainmentSystem.json')
  },
  {
    name: 'Super Nintendo Entertainment System (SNES)',
    id: 'ccl2',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/snesLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendoSnesExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/snesMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'multiplayer/snesSuperMultitap.json')),
      require(path.resolve(smallFiles, 'greatestHits/snesPlayersChoice.json'))
    ],
    output: path.resolve(consoleLists, 'SuperNintendoEntertainmentSystem.json')
  },
  {
    name: 'Nintendo 64',
    id: 'ccl3',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/n64LaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendoN64Exclusives.json')),
    misprintsAndErrors: null,
    special: [require(path.resolve(smallFiles, 'greatestHits/nintendo64PlayersChoice.json'))],
    output: path.resolve(consoleLists, 'Nintendo64.json')
  },
  {
    name: 'Nintendo GameCube',
    id: 'ccl4',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gamecubeLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/gamecubeExclusives.json')),
    misprintsAndErrors: null,
    special: [
      require(path.resolve(smallFiles, 'greatestHits/gamecubeEuropePlayersChoice.json')),
      require(path.resolve(smallFiles, 'greatestHits/gamecubePlayersChoice.json'))
    ],
    output: path.resolve(consoleLists, 'NintendoGameCube.json')
  },
  {
    name: 'Nintendo Wii',
    id: 'ccl5',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/wiiLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendoWiiExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/wiiMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'greatestHits/wiiNintendoSelects.json'))],
    output: path.resolve(consoleLists, 'NintendoWii.json')
  },
  {
    name: 'Nintendo Wii U',
    id: 'ccl6',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/wiiULaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendoWiiUExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/wiiUMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'greatestHits/wiiUNintendoSelects.json'))],
    output: path.resolve(consoleLists, 'NintendoWiiU.json')
  },
  {
    name: 'Nintendo Switch',
    id: 'ccl7',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/switchLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/switchMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'NintendoSwitch.json')
  },
  {
    name: 'Nintendo Game Boy',
    id: 'ccl8',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gameBoyLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/nintendoGameBoyExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/gbMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'NintendoGameBoy.json')
  },
  {
    name: 'Nintendo Game Boy Color',
    id: 'ccl9',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gameBoyColorLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/nintendoGameBoyColorExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/gbcMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'NintendoGameBoyColor.json')
  },
  {
    name: 'Nintendo Game Boy Advance',
    id: 'ccl10',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gameBoyAdvanceLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/nintendoGameBoyAdvanceExclusives.json'
    )),
    misprintsAndErrors: null,
    special: [require(path.resolve(smallFiles, 'greatestHits/gbaPlayersChoice.json'))],
    output: path.resolve(consoleLists, 'NintendoGameBoyAdvance.json')
  },
  {
    name: 'Nintendo DS',
    id: 'ccl11',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/dsLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendoDsExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/nintendoDsMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'NintendoDS.json')
  },
  {
    name: 'Nintendo 3DS',
    id: 'ccl12',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/nintendo3dsLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendo3dsExclusives.json')),
    misprintsAndErrors: null,
    special: [require(path.resolve(smallFiles, 'greatestHits/3dsNintendoSelects.json'))],
    output: path.resolve(consoleLists, 'Nintendo3DS.json')
  },
  {
    name: 'Sega Master System',
    id: 'ccl13',
    launchTitles: require(path.resolve(
      smallFiles,
      'launchTitles/segaMasterSystemLaunchTitles.json'
    )),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/segaMasterSystemExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/masterSystemMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'SegaMasterSystem.json')
  },
  {
    name: 'Sega Mega Drive/Genesis',
    id: 'ccl14',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/genesisLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/segaGenesisExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/genesisMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'special/blackBoxGridGenesisGames.json')),
      require(path.resolve(smallFiles, 'multiplayer/segaGenesisTeamPlayer.json'))
    ],
    output: path.resolve(consoleLists, 'SegaGenesis.json')
  },
  {
    name: 'Sega CD',
    id: 'ccl15',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/segaCdLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/segaCdExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/segaCdMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'multiplayer/segaCdTeamPlayer.json'))],
    output: path.resolve(consoleLists, 'SegaCD.json')
  },
  {
    name: 'Sega 32X',
    id: 'ccl16',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/sega32xLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/sega32xExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/sega32xMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'multiplayer/sega32xTeamPlayer.json'))],
    output: path.resolve(consoleLists, 'Sega32X.json')
  },
  {
    name: 'Sega Saturn',
    id: 'ccl17',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/segaSaturnLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/segaSaturnExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/saturnMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'multiplayer/saturnMultiplayerAdapter.json'))],
    output: path.resolve(consoleLists, 'SegaSaturn.json')
  },
  {
    name: 'Sega Dreamcast',
    id: 'ccl18',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/dreamcastLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/segaDreamcastExclusives.json'
    )),
    misprintsAndErrors: null,
    special: [
      require(path.resolve(smallFiles, 'greatestHits/dreamcastJPAllStars.json')),
      require(path.resolve(smallFiles, 'greatestHits/dreamcastNAAllStars.json'))
    ],
    output: path.resolve(consoleLists, 'SegaDreamcast.json')
  },
  {
    name: 'Sega Game Gear',
    id: 'ccl19',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gameGearLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/segaGameGearExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/gameGearMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'SegaGameGear.json')
  },
  {
    name: 'Sony PlayStation',
    id: 'ccl20',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/playstationLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/sonyPlaystationExclusives.json'
    )),
    misprintsAndErrors: null,
    special: [
      require(path.resolve(smallFiles, 'multiplayer/playStationMultitap.json')),
      require(path.resolve(smallFiles, 'greatestHits/sonyPlayStationGreatestHits.json'))
    ],
    output: path.resolve(consoleLists, 'SonyPlaystation.json')
  },
  {
    name: 'Sony Playstation 2',
    id: 'ccl21',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/ps2LaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/sonyPlaystation2Exclusives.json'
    )),
    misprintsAndErrors: null,
    special: [
      require(path.resolve(smallFiles, 'greatestHits/sonyPlayStation2GreatestHits.json')),
      require(path.resolve(smallFiles, 'special/bannedInternationally.json'))
    ],
    output: path.resolve(consoleLists, 'SonyPlaystation2.json')
  }
];
