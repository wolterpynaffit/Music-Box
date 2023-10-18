export async function getPlayListLoader(){
    const res = await fetch('http://localhost:5555/playlists')
    const allPlayLists = await res.json()
    return { allPlayLists }
}