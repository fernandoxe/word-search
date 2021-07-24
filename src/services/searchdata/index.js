import data from '../../data';

const SearchData = {
  getAllArtists: () => data.map(artist => artist.artist),
  getAllSongs: () => data.map(artist => artist.songs).flat(),
  includesText: (text, subtext, ignoreCase = true) => {
    if(ignoreCase) {
      return text.toLowerCase().indexOf(subtext.toLowerCase()) > -1;
    } else {
      return text.indexOf(subtext) > -1;
    }
  },
  getSongs(text, ignoreCase) {
    const allSongs = this.getAllSongs();
    return allSongs.filter(song => this.includesText(song.lyrics, text, ignoreCase));
  },
  songToArrayOfLyrics: (song) => song.lyrics.split('\n'),
  getLyrics(text, ignoreCase) {
    const songs = this.getSongs(text, ignoreCase);
    const allLyrics = [];
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      const splittedSong = this.songToArrayOfLyrics(song);
      const lyrics = [];
      for (let j = 0; j < splittedSong.length; j++) {
        const line = splittedSong[j];
        if(this.includesText(line, text, ignoreCase)) {
          lyrics.push([
            splittedSong[j - 1],
            splittedSong[j],
            splittedSong[j + 1],
          ]);
        }
      }
      allLyrics.push({
        title: song.title,
        lyrics,
      });
    }
    return allLyrics;
  },
};

export default SearchData;