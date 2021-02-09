const searchSongs = () => {
    const searchText = document.getElementById("search-field").value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`
        // load data
    fetch(url)
        .then(res => res.json())
        // data.data karon data namok object er vitore ekta property ache jar nam data.
        .then(data => displaySongs(data.data))
}

const displaySongs = songs => {
    const songContainer = document.getElementById("song-container");
    songContainer.innerHTML = "";
    // prottek ta song k alada alada dekhanor jonne forEach loop run korbo
    // songs.forEach(song => console.log(song))
    // prottekta song k ekta array'r vitor dekhabe ei console.lg
    // console.log(songs);
    songs.forEach(song => {
        const songDiv = document.createElement("div");
        songDiv.className = "single-result row align-items-center my-3 p-3";
        songDiv.innerHTML = `
        <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                               <source src="${song.preview}" type="audio/ogg">
                        </audio>
                        
        </div>
        <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyric('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
        </div>
        `
        songContainer.appendChild(songDiv);
    })
}

const getLyric = (artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`
    fetch(url)
        .then(res => res.json())
        .then(data => displaySongLyrics(data.lyrics))
}

const displaySongLyrics = lyrics => {
    const lyricsDiv = document.getElementById("song-lyrics");
    lyricsDiv.innerText = lyrics;
}