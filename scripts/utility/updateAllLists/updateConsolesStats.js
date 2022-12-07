let platformStats = {
  allGamesExclusives: 0,
  gameBackupDevices: 0,
  regionFreeConsoles: 0,
  consoleAdapters: 0,
  rgbOutput: 0,
  multiplayerAdapters: 0,
  burnedDiscs: 0,
  lightGuns: 0,
  flashCarts: 0,
  hardwareClones: 0,
  softwareClones: 0,
  opticalDriveEmulators: 0,
  specialVideoOutputs: 0,
  officialLicensedAccessories: 0
};

module.exports.getCounts = function() {
  return platformStats;
};

module.exports.addStats = function(
  allEx,
  backup,
  region,
  adapter,
  rgb,
  multi,
  burned,
  lg,
  fc,
  hc,
  sc,
  ode,
  vid,
  ola
) {
  if (allEx) {
    platformStats.allGamesExclusives++;
  }
  if (backup) {
    platformStats.gameBackupDevices += backup.length;
  }
  if (region) {
    platformStats.regionFreeConsoles++;
  }
  if (adapter) {
    platformStats.consoleAdapters += adapter.length;
  }
  if (rgb) {
    platformStats.rgbOutput++;
  }
  if (multi) {
    platformStats.multiplayerAdapters += multi.length;
  }
  if (burned) {
    platformStats.burnedDiscs++;
  }
  if (lg) {
    platformStats.lightGuns += lg.length;
  }
  if (fc) {
    platformStats.flashCarts += fc.length;
  }
  if (hc) {
    platformStats.hardwareClones += hc.length;
  }
  if (sc) {
    platformStats.softwareClones += sc.length;
  }
  if (ode) {
    platformStats.opticalDriveEmulators += ode.length;
  }
  if (vid) {
    platformStats.specialVideoOutputs += vid.details.length
  }
  if (ola) {
    platformStats.specialVideoOutputs += ola.length
  }
};
