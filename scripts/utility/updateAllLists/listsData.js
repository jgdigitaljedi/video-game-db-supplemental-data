const path = require('path');

const smallFiles = path.join(__dirname, '../../../finalOutput/smallFiles');
// @TODO: remove 'Test' from output once verified that script works
const consoleLists = path.join(__dirname, '../../../finalOutput/consoleLists');

module.exports.listData = [
  {
    name: 'Famicom Disk System',
    id: 'ccl48',
    prefix: 'fds',
    launchTitles: require(path.resolve(
      smallFiles,
      'launchTitles/famicomDiskSystemLaunchTitles.json'
    )),
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
    prefix: 'amig',
    launchTitles: null,
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/amigaExclusives.json')),
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'Amiga.json')
  },
  {
    name: 'Nintendo Virtual Boy',
    id: 'ccl50',
    prefix: 'nvb',
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
    prefix: 'nes',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/nesLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nesExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/nesMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'multiplayer/nesFourScore.json')),
      require(path.resolve(smallFiles, 'special/nesBlackBoxTitles.json')),
      require(path.resolve(smallFiles, 'special/nesHangtabGames.json'))
    ],
    output: path.resolve(consoleLists, 'NintendoEntertainmentSystem.json')
  },
  {
    name: 'Super Nintendo Entertainment System (SNES)',
    id: 'ccl2',
    prefix: 'snes',
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
    prefix: 'n64',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/n64LaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendoN64Exclusives.json')),
    misprintsAndErrors: null,
    special: [require(path.resolve(smallFiles, 'greatestHits/nintendo64PlayersChoice.json'))],
    output: path.resolve(consoleLists, 'Nintendo64.json')
  },
  {
    name: 'Nintendo GameCube',
    id: 'ccl4',
    prefix: 'ngc',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gamecubeLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/gamecubeExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/gameCubeMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'greatestHits/gamecubeEuropePlayersChoice.json')),
      require(path.resolve(smallFiles, 'greatestHits/gamecubePlayersChoice.json'))
    ],
    output: path.resolve(consoleLists, 'NintendoGameCube.json')
  },
  {
    name: 'Nintendo Wii',
    id: 'ccl5',
    prefix: 'wii',
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
    prefix: 'wiiu',
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
    prefix: 'nsw',
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
    prefix: 'ngb',
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
    prefix: 'ngbc',
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
    prefix: 'ngba',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gameBoyAdvanceLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/nintendoGameBoyAdvanceExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/gbaMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'greatestHits/gbaPlayersChoice.json'))],
    output: path.resolve(consoleLists, 'NintendoGameBoyAdvance.json')
  },
  {
    name: 'Nintendo DS',
    id: 'ccl11',
    prefix: 'nds',
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
    prefix: 'n3ds',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/nintendo3dsLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/nintendo3dsExclusives.json')),
    misprintsAndErrors: null,
    special: [require(path.resolve(smallFiles, 'greatestHits/3dsNintendoSelects.json'))],
    output: path.resolve(consoleLists, 'Nintendo3DS.json')
  },
  {
    name: 'Sega Master System',
    id: 'ccl13',
    prefix: 'sms',
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
    prefix: 'smd',
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
    prefix: 'scd',
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
    prefix: 's32x',
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
    prefix: 'ssat',
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
    prefix: 'sdc',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/dreamcastLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/segaDreamcastExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/dreamcastMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'greatestHits/dreamcastJPAllStars.json')),
      require(path.resolve(smallFiles, 'greatestHits/dreamcastNAAllStars.json'))
    ],
    output: path.resolve(consoleLists, 'SegaDreamcast.json')
  },
  {
    name: 'Sega Game Gear',
    id: 'ccl19',
    prefix: 'sgg',
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
    prefix: 'psx',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/playstationLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/sonyPlaystationExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/psMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'multiplayer/playStationMultitap.json')),
      require(path.resolve(smallFiles, 'greatestHits/sonyPlayStationGreatestHits.json')),
      require(path.resolve(smallFiles, 'special/playstationLongboxGames.json'))
    ],
    output: path.resolve(consoleLists, 'SonyPlaystation.json')
  },
  {
    name: 'Sony Playstation 2',
    id: 'ccl21',
    prefix: 'ps2',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/ps2LaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/sonyPlaystation2Exclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/ps2MisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'greatestHits/sonyPlayStation2GreatestHits.json')),
      require(path.resolve(smallFiles, 'special/bannedInternationally.json'))
    ],
    output: path.resolve(consoleLists, 'SonyPlaystation2.json')
  },
  {
    name: 'Sony Playstation 3',
    id: 'ccl22',
    prefix: 'sps3',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/ps3LaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/sonyPlaystation3Exclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/ps3MisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'regionLock/ps3RegionLockExceptions.json')),
      require(path.resolve(smallFiles, 'special/bannedInternationally.json')),
      require(path.resolve(smallFiles, 'greatestHits/sonyPlayStation3GreatestHits.json'))
    ],
    output: path.resolve(consoleLists, 'SonyPlayStation3.json')
  },
  {
    name: 'Sony Playstation 4',
    id: 'ccl23',
    prefix: 'sps4',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/ps4LaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/sonyPlaystation4Exclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/ps4MisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'greatestHits/sonyPlayStation4GreatestHits.json'))],
    output: path.resolve(consoleLists, 'SonyPlayStation4.json')
  },
  {
    name: 'Sony Playstation Portable',
    id: 'ccl24',
    prefix: 'spsp',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/pspLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/sonyPspExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/pspMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'greatestHits/sonyPlayStationPortableGreatestHits.json'))
    ],
    output: path.resolve(consoleLists, 'SonyPlayStationPortable.json')
  },
  {
    name: 'Microsoft Xbox',
    id: 'ccl25',
    prefix: 'mxb',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/xboxLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/microsoftXboxExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/xboxMisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'backwardCompatibilityLists/XboxToXbox360.json')),
      require(path.resolve(smallFiles, 'backwardCompatibilityLists/XboxToXboxOne.json')),
      require(path.resolve(smallFiles, 'greatestHits/xboxClassicsPal.json')),
      require(path.resolve(smallFiles, 'greatestHits/xboxPlatinumCollectionJP.json')),
      require(path.resolve(smallFiles, 'greatestHits/xboxPlatinumHits.json')),
      require(path.resolve(smallFiles, 'special/bannedInternationally.json'))
    ],
    output: path.resolve(consoleLists, 'MicrosoftXbox.json')
  },
  {
    name: 'Microsoft Xbox 360',
    id: 'ccl26',
    prefix: 'x360',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/xbox360LaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/xbox360Exclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/xbox360MisprintsAndErrors.json'
    )),
    special: [
      require(path.resolve(smallFiles, 'backwardCompatibilityLists/Xbox360ToXboxOne.json')),
      require(path.resolve(smallFiles, 'special/bannedInternationally.json')),
      require(path.resolve(smallFiles, 'greatestHits/xbox360ClassicsPal.json')),
      require(path.resolve(smallFiles, 'greatestHits/xbox360PlatinumCollectionJP.json')),
      require(path.resolve(smallFiles, 'greatestHits/xbox360PlatinumHits.json'))
    ],
    output: path.resolve(consoleLists, 'MicrosoftXbox360.json')
  },
  {
    name: 'Microsoft Xbox One',
    id: 'ccl27',
    prefix: 'xone',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/xboxOneLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/xboxOneExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/xboxOneMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'greatestHits/xboxOneGreatestHits.json'))],
    output: path.resolve(consoleLists, 'MicrosoftXboxOne.json')
  },
  {
    name: 'Atari 2600',
    id: 'ccl28',
    prefix: 'a260',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/atari2600LaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/atari2600Exclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/atari2600misprintsErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'Atari2600.json')
  },
  {
    name: 'Atari 5200',
    id: 'ccl29',
    prefix: 'a520',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/atari5200LaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/atari5200Exclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/atari5200misprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'multiplayer/atari5200FourPlayerGames.json'))],
    output: path.resolve(consoleLists, 'Atari5200.json')
  },
  {
    name: 'Atari 7800',
    id: 'ccl30',
    prefix: 'a780',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/atari7800LaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/atari7800Exclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/atari7800misprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'Atari7800.json')
  },
  {
    name: 'Atari Jaguar',
    id: 'ccl31',
    prefix: 'ajag',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/atariJaguarLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/atariJaguarExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/atariJaguarMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'AtariJaguar.json')
  },
  {
    name: 'Atari Lynx',
    id: 'ccl32',
    prefix: 'alnx',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/atariLynxLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/atariLynxExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/atariLynxMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'AtariLynx.json')
  },
  {
    name: 'NEC TurboGrafx 16',
    id: 'ccl33',
    prefix: 'tg16',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/turbografx16LaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/turbografx16Exclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/turboGrafxMisprintsAndErrors.json'
    )),
    special: [require(path.resolve(smallFiles, 'multiplayer/tg16Multitap.json'))],
    output: path.resolve(consoleLists, 'TurboGrafx16.json')
  },
  {
    name: 'NEC TurboGrafx CD',
    id: 'ccl34',
    prefix: 'tgcd',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/turbografx16CdLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/turbografxCdExclusives.json')),
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'TurboGrafxCD.json')
  },
  {
    name: '3DO Interactive Multiplayer',
    id: 'ccl35',
    prefix: 'r3do',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/3doLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/3doExclusives.json')),
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, '3DOInteractiveMultiplayer.json')
  },
  {
    name: 'Philips CD-i',
    id: 'ccl36',
    prefix: 'pcdi',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/cdiLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/philipsCdiExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/philipsCdiMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'PhilipsCDi.json')
  },
  {
    name: 'Neo Geo Pocket Color',
    id: 'ccl37',
    prefix: 'ngpc',
    launchTitles: require(path.resolve(
      smallFiles,
      'launchTitles/neoGeoPocketColorLaunchTitles.json'
    )),
    exclusives: null,
    misprintsAndErrors: null,
    special: [require(path.resolve(smallFiles, 'backwardCompatibilityLists/ngpcToNgp.json'))],
    output: path.resolve(consoleLists, 'NeoGeoPocketColor.json')
  },
  {
    name: 'Colecovision',
    id: 'ccl38',
    prefix: 'cole',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/colecoVisionLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/colecovisionExclusives.json')),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/colecovisionMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'ColecoVision.json')
  },
  {
    name: 'Nokia N-Gage',
    id: 'ccl39',
    prefix: 'ngag',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/ngageLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/ngageMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'NokiaNGage.json')
  },
  {
    name: 'Gizmondo',
    id: 'ccl41',
    prefix: 'giz',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gizmondoLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/gizmondoMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'Gizmondo.json')
  },
  {
    name: 'Bally Astrocade',
    id: 'ccl42',
    prefix: 'bac',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/astrocadeLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'BallyAstrocade.json')
  },
  {
    name: 'Atari Jaguar CD',
    id: 'ccl43',
    prefix: 'ajcd',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/atariJaguarCdLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'AtariJaguarCD.json')
  },
  {
    name: 'Mattel Intellivision',
    id: 'ccl44',
    prefix: 'miv',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/intellivisionLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/intellivisionExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/intellivisionMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'MattelIntellivision.json')
  },
  {
    name: 'Sony Playstation Vita',
    id: 'ccl45',
    prefix: 'psv',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/psVitaLaunchTitles.json')),
    exclusives: require(path.resolve(
      smallFiles,
      'platformExclusives/sonyPlaystationVitaExclusives.json'
    )),
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/vitaMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'SonyPlaystationVita.json')
  },
  {
    name: 'Game.com',
    id: 'ccl46',
    prefix: 'gdc',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/gameComLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'GameCom.json')
  },
  {
    name: 'Magnavox Odyssey 2',
    id: 'ccl47',
    prefix: 'mod2',
    launchTitles: require(path.resolve(
      smallFiles,
      'launchTitles/magnavoxOdyssey2LaunchTitles.json'
    )),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'MagnavoxOdyssey2.json')
  },
  {
    name: 'Sony PlayStation 5',
    id: 'ccl48',
    prefix: 'sps5',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/ps5LaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/ps5MisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'SonyPlayStation5.json')
  },
  {
    name: 'Xbox Series X|S',
    id: 'ccl49',
    prefix: 'xbs',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/xboxSeriesLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'XboxSeries.json')
  },
  {
    name: 'SNK Neo Geo AES',
    id: 'ccl50',
    prefix: 'ngaes',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/neoGeoAesLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/neoGeoAesMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'NeoGeoAES.json')
  },
  {
    name: 'Nintendo Family Computer (Famicom)',
    id: 'ccl51',
    prefix: 'nfam',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/famicomLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: require(path.resolve(
      smallFiles,
      'misprintsAndErrors/famicomMisprintsAndErrors.json'
    )),
    special: null,
    output: path.resolve(consoleLists, 'NintendoFamicom.json')
  },
  {
    name: 'SNK Neo Geo CD',
    id: 'ccl52',
    prefix: 'ngcd',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/neoGeoCdLaunchTitles.json')),
    exclusives: require(path.resolve(smallFiles, 'platformExclusives/neoGeoCdExclusives.json')),
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'NeoGeoCD.json')
  },
  {
    name: 'Bandai WonderSwan Color',
    id: 'ccl53',
    prefix: 'bwsc',
    launchTitles: require(path.resolve(
      smallFiles,
      'launchTitles/wonderswanColorLaunchTitles.json'
    )),
    exclusives: null,
    misprintsAndErrors: null,
    special: [require(path.resolve(smallFiles, 'backwardCompatibilityLists/ngpcToNgp.json'))],
    output: path.resolve(consoleLists, 'BandaiWonderSwanColor.json')
  },
  {
    name: 'Bandai WonderSwan',
    id: 'ccl54',
    prefix: 'bws',
    launchTitles: require(path.resolve(smallFiles, 'launchTitles/wonderswanLaunchTitles.json')),
    exclusives: null,
    misprintsAndErrors: null,
    special: null,
    output: path.resolve(consoleLists, 'BandaiWonderSwan.json')
  }
];
