import data from '../../data';

const SearchData = {
  getArtists: () => data.map(artist => artist.artist),
  getAllSongs: () => data.map(artist => artist.songs).flat(),
  getSongsWithText(text) {
    const allSongs = this.getAllSongs();
    return allSongs.filter(song => song.lyrics.includes(text));
  }
};

export default SearchData;