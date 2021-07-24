import data from '../../data';

const SearchData = {
  getAllArtists: () => data.map(artist => artist.artist),
  getAllSongs: () => data.map(artist => artist.songs).flat(),
  getSongs(text) {
    const allSongs = this.getAllSongs();
    return allSongs.filter(song => song.lyrics.includes(text));
  },
  songToArrayOfLyrics: (song) => song.lyrics.split('\n'),
  getLyrics(text) {
    const songs = this.getSongs(text);
    const allLyrics = [];
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      const splittedSong = this.songToArrayOfLyrics(song);
      const lyrics = [];
      for (let j = 0; j < splittedSong.length; j++) {
        const line = splittedSong[j];
        if(line.includes(text)) {
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