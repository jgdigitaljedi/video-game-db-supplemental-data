import moment from 'moment';

export default {
  sortByName(arr) {
    return arr.sort((a, b) => {
      if (a.name > b.name) return 1;
      if (a.name < b.name) return -1;
      return 0;
    });
  },
  fullDataFormat(igdbData, gbData, platform, name) {
    const igdbBlank = {
      genres: [],
      name: '',
      id: 9999,
      total_rating: null,
      total_rating_count: null,
      first_release_date: '',
      developers: '',
      esrb: null
    };
    const igdbObj = Object.assign(igdbBlank, igdbData);
    igdbObj.esrb =
      igdbData && igdbData.esrb && igdbData.esrb.letterRating ? igdbData.esrb.letterRating : '';

    const gbObj = {
      aliases: gbData.aliases || '',
      guid: gbData.guid || '',
      gbid: gbData.gbid || 9999,
      image: gbData && gbData.image ? gbData.image.medium_url : '',
      deck: gbData.deck || '',
      platforms: gbData.platforms ? gbData.platforms.join(', ') : ''
    };

    const dateFormatted = moment().format('MM/DD/YYYY hh:mm a');

    return {
      igdb: igdbObj,
      gb: gbObj,
      name: name,
      consoleName: platform.name,
      consoleIgdbId: platform.igdbId,
      consoleGbid: platform.gbId,
      consoleGbGuid: platform.gbGuid,
      condition: 'Other',
      case: 'none',
      pricePaid: '',
      physical: false,
      cib: false,
      pirated: false,
      multiplayerNumber: 1,
      datePurchased: null,
      howAcquired: null,
      notes: 'Mega EverDrive',
      createdAt: dateFormatted,
      updatedAt: dateFormatted,
      consoleArr: [{ consoleName: platform.name, consoleId: platform.igdbId }]
    };
  }
};
