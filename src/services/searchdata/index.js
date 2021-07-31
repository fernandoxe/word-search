import data from '../../data';

const SearchData = {
  getAllArtistsNames: () => data.map(artist => artist.artist),
  includesText: (text, subtext, ignoreCase = true) => {
    if(ignoreCase) {
      return text.toLowerCase().indexOf(subtext.toLowerCase()) > -1;
    } else {
      return text.indexOf(subtext) > -1;
    }
  },
  getArtist: artist => data.find(x => x.artist.toLowerCase() === artist.toLowerCase()),
  songToArrayOfLyrics: (song) => song.lyrics.split('\n'),
  getAllLyricsWithText(text, ignoreCase) {
    return this.getArtistsWithText(text, ignoreCase);
  },
  getArtistsWithText(text, ignoreCase) {
    const artists = data;
    const matchedArtists = [];
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      const matchedAlbums = this.getAlbumsFromArtistWithText(text, artist, ignoreCase);
      matchedAlbums.length && matchedArtists.push({
        artist: artist.artist,
        albums: matchedAlbums,
      });
    }
    return matchedArtists;
  },
  getAlbumsFromArtistWithText(text, artist, ignoreCase) {
    const albums = artist.albums;
    const matchedAlbums = [];
    for (let i = 0; i < albums.length; i++) {
      const album = albums[i];
      const matchedSongs = this.getSongsFromAlbumWithText(text, album, ignoreCase);
      matchedSongs.length && matchedAlbums.push({
        name: album.name,
        year: album.year,
        songs: matchedSongs,
      });
    }
    return matchedAlbums;
  },
  getSongsFromAlbumWithText(text, album, ignoreCase) {
    const songs = album.songs;
    const matchedSongs = [];
    for (let i = 0; i < songs.length; i++) {
      const song = songs[i];
      const matchedLyrics = this.getLyricsFromSongWithText(text, song, ignoreCase);
      matchedLyrics.length && matchedSongs.push({
        title: song.title,
        lyrics: matchedLyrics,
      });
    }
    return matchedSongs;
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
  getAllLyricsFromArtistNameWithText(text, artistName, ignoreCase) {
    const artist = this.getArtist(artistName);
    const matchedArtists = [];
    const matchedAlbums = this.getAlbumsFromArtistWithText(text, artist, ignoreCase);
    matchedAlbums.length && matchedArtists.push({
      artist: artistName,
      albums: matchedAlbums,
    });
    return matchedArtists;
  },
};

export default SearchData;