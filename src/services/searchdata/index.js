import data from '../../data';

const SearchData = {
  getAllArtistsNames: () => data.map(artist => artist.artist),
  getAllSongs: () => data.map(artist => artist.albums).flat().map(album => album.songs).flat(),
  includesText: (text, subtext, ignoreCase = true) => {
    if(ignoreCase) {
      return text.toLowerCase().indexOf(subtext.toLowerCase()) > -1;
    } else {
      return text.indexOf(subtext) > -1;
    }
  },
  getArtist: artist => data.find(x => x.artist.toLowerCase() === artist.toLowerCase()),
  getAlbumFromArtist(album, artist) {
    return this.getArtist(artist)?.albums.find(x => x.name.toLowerCase() === album.toLowerCase());
  },
  getAlbumsFromArtist(artist) {
    return this.getArtist(artist).albums;
  },
  getSongsFromArtistAlbum(artist, album) {
    return this.getAlbumFromArtist(album, artist).songs;
  },
  getSongs(text, ignoreCase) {
    const allSongs = this.getAllSongs();
    return allSongs.filter(song => this.includesText(song.lyrics, text, ignoreCase));
  },
  songToArrayOfLyrics: (song) => song.lyrics.split('\n'),
  getAllLyricsWithText(text, ignoreCase) {
    const artists = this.getAllArtistsNames().map(artist => this.getArtist(artist));
    const matchedArtists = [];
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i].artist;
      const albums = this.getAlbumsFromArtist(artist);
      const matchedAlbums = [];
      for (let j = 0; j < albums.length; j++) {
        const album = albums[j].name;
        const songs = this.getSongsFromArtistAlbum(artist, album);
        const matchedSongs = [];
        for (let k = 0; k < songs.length; k++) {
          const song = songs[k];
          const matchedLyrics = this.getLyricsFromSongWithText(text, song, ignoreCase);
          matchedLyrics.length && matchedSongs.push({
            title: song.title,
            lyrics: matchedLyrics,
          });
        }
        matchedAlbums.push({
          name: album,
          year: albums[j].year,
          songs: matchedSongs,
        });
      }
      matchedArtists.push({
        artist: artist,
        albums: matchedAlbums,
      });
    }
    return matchedArtists;
  },
  getLyricsFromSongWithText(text, song, ignoreCase) {
    const splittedSong = this.songToArrayOfLyrics(song);
    const matchedLyrics = [];
    for (let i = 0; i < splittedSong.length; i++) {
      const line = splittedSong[i];
      if(this.includesText(line, text, ignoreCase)) {
        matchedLyrics.push([
          splittedSong[i - 1],
          splittedSong[i],
          splittedSong[i + 1],
        ]);
      }
    }
    return matchedLyrics;
  },
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