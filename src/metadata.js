const apiLink = "http://r-a-d.io/api";
const djImageApi = "http://r-a-d.io/api/dj-image/";

const updateTrackInfo = async () => {
    const data = await (await fetch(apiLink)).json();
    const albumArtNode = document.querySelector("#album-art");
    const trackArtistNode = document.querySelector("#track-artist");
    const trackTitleNode = document.querySelector("#track-title");

    trackTitleNode.innerText = data.main.np;
    trackArtistNode.innerText = "DJ: " + data.main.djname;
    albumArtNode.src = djImageApi + data.main.dj.djimage;
};
document.onload = updateTrackInfo;
setInterval(updateTrackInfo, 5 * 1000);
