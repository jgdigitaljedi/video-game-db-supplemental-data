// @TODO: remove 'Test' from output once verified that script works

module.exports.listData = [
  {
    name: 'Magnavox Odyssey 2',
    id: 'ccl47',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/magnavoxOdyssey2LaunchTitles.json'),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: '../../../finalOutput/consoleListsTest/MagnovoxOdysee2.json'
  },
  {
    name: 'Famicom Disk System',
    id: 'ccl48',
    launchTitles: null,
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/famicomDiskSystemExclusives.json'),
    misprintsAndErrors: null,
    special: null,
    output: '../../../finalOutput/consoleListsTest/FamicomDiskSystem.json'
  },
  {
    name: 'Amiga',
    id: 'ccl49',
    launchTitles: null,
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/amigaExclusives.json'),
    misprintsAndErrors: null,
    special: null,
    output: '../../../finalOutput/consoleListsTest/Amiga.json'
  },
  {
    name: 'Nintendo Virtual Boy',
    id: 'ccl50',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/virtualBoyLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/virtualBoyExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/virtualBoyMisprintsAndErrors.json'),
    special: null,
    output: '../../../finalOutput/consoleListsTest/VirtualBoy.json'
  },
  {
    name: 'Nintendo Entertainment System (NES)',
    id: 'ccl1',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/nesLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nesExclusives.json'),
    misprintsAndErrors: null,
    special: [
      require('../../../finalOutput/smallFiles/multiplayer/nesFourScore.json'),
      require('../../../finalOutput/smallFiles/special/nesBlackBoxTitles.json'),
      require('../../../finalOutput/smallFiles/special/nesHangtabGames.json')
    ],
    output: '../../../finalOutput/consoleListsTest/nintendoEntertainmentSystem.json'
  },
  {
    name: 'Super Nintendo Entertainment System (SNES)',
    id: 'ccl2',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/snesLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoSnesExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/snesMisprintsAndErrors.json'),
    special: [
      require('../../../finalOutput/smallFiles/multiplayer/snesSuperMultitap.json'),
      require('../../../finalOutput/smallFiles/greatestHits/snesPlayersChoice.json')
    ],
    output: '../../../finalOutput/consoleListsTest/SuperNintendoEntertainmentSystem.json'
  },
  {
    name: 'Nintendo 64',
    id: 'ccl3',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/n64LaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoN64Exclusives.json'),
    misprintsAndErrors: null,
    special: [require('../../../finalOutput/smallFiles/greatestHits/nintendo64PlayersChoice.json')],
    output: '../../../finalOutput/consoleListsTest/Nintendo64.json'
  },
  {
    name: 'Nintendo GameCube',
    id: 'ccl4',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/gamecubeLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/gamecubeExclusives.json'),
    misprintsAndErrors: null,
    special: [
      require('../../../finalOutput/smallFiles/greatestHits/gamecubeEuropePlayersChoice.json'),
      require('../../../finalOutput/smallFiles/greatestHits/gamecubePlayersChoice.json')
    ],
    output: '../../../finalOutput/consoleListsTest/NintendoGameCube.json'
  },
  {
    name: 'Nintendo Wii',
    id: 'ccl5',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/wiiLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoWiiExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/wiiMisprintsAndErrors.json'),
    special: [require('../../../finalOutput/smallFiles/greatestHits/wiiNintendoSelects.json')],
    output: '../../../finalOutput/consoleListsTest/NintendoWii.json'
  },
  {
    name: 'Nintendo Wii U',
    id: 'ccl6',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/wiiULaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoWiiUExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/wiiUMisprintsAndErrors.json'),
    special: [require('../../../finalOutput/smallFiles/greatestHits/wiiUNintendoSelects.json')],
    output: '../../../finalOutput/consoleListsTest/NintendoWiiU.json'
  },
  {
    name: 'Nintendo Switch',
    id: 'ccl7',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/switchLaunchTitles.json'),
    exclusives: null,
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/switchMisprintsAndErrors.json'),
    special: null,
    output: '../../../finalOutput/consoleListsTest/NintendoSwitch.json'
  },
  {
    name: 'Nintendo Game Boy',
    id: 'ccl8',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/gameBoyLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoGameBoyExclusives.json'),
    misprintsAndErrors: null,
    special: null,
    output: '../../../finalOutput/consoleListsTest/NintendoGameBoy.json'
  },
  {
    name: 'Nintendo Game Boy Color',
    id: 'ccl9',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/gameBoyColorLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoGameBoyColorExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/gbcMisprintsAndErrors.json'),
    special: null,
    output: '../../../finalOutput/consoleListsTest/NintendoGameBoyColor.json'
  },
  {
    name: 'Nintendo Game Boy Advance',
    id: 'ccl10',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/gameBoyAdvanceLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoGameBoyAdvanceExclusives.json'),
    misprintsAndErrors: null,
    special: [require('../../../finalOutput/smallFiles/greatestHits/gbaPlayersChoice.json')],
    output: '../../../finalOutput/consoleLists/NintendoGameBoyAdvance.json'
  },
  {
    name: 'Nintendo DS',
    id: 'ccl11',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/dsLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendoDsExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/nintendoDsMisprintsAndErrors.json'),
    special: null,
    output: '../../../finalOutput/consoleListsTest/NintendoDS.json'
  },
  {
    name: 'Nintendo 3DS',
    id: 'ccl12',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/nintendo3dsLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/nintendo3dsExclusives.json'),
    misprintsAndErrors: null,
    special: [require('../../../finalOutput/smallFiles/greatestHits/3dsNintendoSelects.json')],
    output: '../../../finalOutput/consoleListsTest/Nintendo3DS.json'
  },
  {
    name: 'Sega Master System',
    id: 'ccl13',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/segaMasterSystemLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/segaMasterSystemExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/masterSystemMisprintsAndErrors.json'),
    special: null,
    output: '../../../finalOutput/consoleListsTest/SegaMasterSystem.json'
  },
  {
    name: 'Sega Mega Drive/Genesis',
    id: 'ccl14',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/genesisLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/segaGenesisExclusives.json'),
    misprintsAndErrors: null,
    special: [
      require('../../../finalOutput/smallFiles/special/blackBoxGridGenesisGames.json'),
      require('../../../finalOutput/smallFiles/multiplayer/segaGenesisTeamPlayer.json')
    ],
    output: '../../../finalOutput/consoleListsTest/SegaGenesis.json'
  },
  {
    name: 'Sega CD',
    id: 'ccl15',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/segaCdLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/segaCdExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/segaCdMisprintsAndErrors.json'),
    special: [require('../../../finalOutput/smallFiles/multiplayer/segaCdTeamPlayer.json')],
    output: '../../../finalOutput/consoleListsTest/SegaCD.json'
  },
  {
    name: 'Sega 32X',
    id: 'ccl16',
    launchTitles: require('../../../finalOutput/smallFiles/launchTitles/sega32xLaunchTitles.json'),
    exclusives: require('../../../finalOutput/smallFiles/platformExclusives/sega32xExclusives.json'),
    misprintsAndErrors: require('../../../finalOutput/smallFiles/misprintsAndErrors/sega32xMisprintsAndErrors.json'),
    special: [require('../../../finalOutput/smallFiles/multiplayer/sega32xTeamPlayer.json')],
    output: '../../../finalOutput/consoleListsTest/Sega32X.json'
  }
];
