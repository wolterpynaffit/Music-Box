export async function getPlayListLoader(){
    const res = await fetch('http://localhost:5555/playlists')
    const allPlayLists = await res.json()
    return { allPlayLists }

   
}


// getOnePlaylistLoader()

export async function getOnePlaylistLoader(id) {
    try {
        const res = await fetch(`http://localhost:5555/playlist/${id}`);
        
        if (!res.ok) {
            throw new Error(`Could not fetch playlist with ID ${id}, status: ${res.status}`);
        }

        const playlist = await res.json();
        return playlist ;
    } catch (error) {
        console.error('Error fetching playlist:', error);
        return null;
    }
}

// Example usage:
// getOnePlaylistLoader(1).then(data => {
//     if (data) {
//         console.log('--------------------')
//         console.log(data);
//         console.log(data.description);
//         console.log(data.contributor)
//         console.log(data.playlist_songs)
//     } else {
//         console.log("Failed to fetch playlist.");
//     }
// });
