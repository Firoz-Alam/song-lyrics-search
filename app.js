const searchResult = async ()=>{

    const searchItem = document.getElementById('searchItem').value;
    const url = `https://api.lyrics.ovh/suggest/${searchItem}`;
    // load Data
    try{
        const res = await fetch(url);
        const data = await res.json();
        displaySongs(data.data);
    }catch(error){
        displayError("Something Went Wrong!! Please try again later!");
    }
    
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';

    songs.forEach(song => {
        const songDiv = document.createElement('div');
        songDiv.className = 'single-container row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="song-title">${song.title}</h3>
                <p class="song-author">Published By <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src = "${song.preview}" type="audio/mpeg">
                </audio>
            </div>
            <div class="col-md-3">
                <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;
        songContainer.appendChild(songDiv);
    });


}

const getLyrics =async (artist,title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    try{
        const res = await fetch(url);
        const data = await res.json();
        displayLyrics(data.lyrics);
    }catch (error){
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }
    
}

const displayLyrics = lyrics => {
    const songLyrics = document.getElementById('song-lyrics');
    songLyrics.innerText = lyrics;
}
const displayError = error => {
    const errorTag = document.getElementById('error-message');
    errorTag.innerText = error;
}