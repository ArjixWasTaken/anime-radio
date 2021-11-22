const apiLink = "https://r-a-d.io/api";
const djImageApi = "https://r-a-d.io/api/dj-image/";

const updateTrackInfo = async () => {
    const data = await (await fetch(apiLink)).json();
    const albumArtNode = document.querySelector("#album-art");
    const trackArtistNode = document.querySelector("#track-artist");
    const trackTitleNode = document.querySelector("#track-title");

    trackTitleNode.innerText = data.main.np;
    trackArtistNode.innerText = "DJ: " + data.main.djname;
    albumArtNode.src = djImageApi + data.main.dj.djimage;
    
    
    const totalDuration = data.main.end_time - data.main.start_time
    const remaining = data.main.end_time - (Date.now()/1000)
    
    const playedFor = totalDuration - remaining
    document.querySelector("#songProgress").value = `${(playedFor/totalDuration) * 100}`

};
document.onload = updateTrackInfo;
setInterval(updateTrackInfo, 5 * 1000);
