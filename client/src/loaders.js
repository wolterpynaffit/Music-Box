export async function getPlayListLoader(){
    const res = await fetch('/playlists')
    const allPlayLists = await res.json()

    console.log(allPlayLists)
    return { allPlayLists }
}

