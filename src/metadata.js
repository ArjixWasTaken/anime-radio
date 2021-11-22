const apiLink = "https://r-a-d.io/api";
const djImageApi = "https://r-a-d.io/api/dj-image/";

const updateTrackInfo = async () => {
    const data = await (await fetch(apiLink)).json();
    /*
    {
        "np": "Tomatsu Haruka - Monochrome",
        "listeners": 96,
        "bitrate": 0,
        "isafkstream": true,
        "isstreamdesk": false,
        "current": 1637615251,
        "start_time": 1637615124,
        "end_time": 1637615424,
        "lastset": "2021-11-22 21:07:20",
        "trackid": 186,
        "thread": "https://jinboch.ooo/a/12148431",
        "requesting": true,
        "djname": "Hanyuu-sama",
        "dj": {
            "id": 18,
            "djname": "Hanyuu-sama",
            "djtext": "",
            "djimage": "18-6c09752d.png",
            "djcolor": "51 155 185",
            "visible": true,
            "priority": 8,
            "css": "hanyuu.css",
            "theme_id": 2,
            "role": "dj"
        },
        "queue": [
            {
                "meta": "Hatsune Miku - LIAR DANCE",
                "time": "<time class=\"timeago\" datetime=\"2021-11-22T21:10:23+0000\">21:10:23</time>",
                "type": 0,
                "timestamp": 1637615423
            }
        ],
        "lp": [
            {
                "meta": "Muramatsu Takatsugu - Master Spells",
                "time": "<time class=\"timeago\" datetime=\"2021-11-22T21:05:23+0000\">21:05:23</time>",
                "type": 0,
                "timestamp": 1637615123
            }
        ],
        "tags": [
            "Star",
            "Driver"
        ]
    }
    */
    const albumArtNode = document.querySelector("#album-art");
    const trackArtistNode = document.querySelector("#track-artist");
    const trackTitleNode = document.querySelector("#track-title");
    const progressBarNode = document.querySelector("#songProgress");

    trackTitleNode.innerText = data.main.np;
    trackArtistNode.innerText = "DJ: " + data.main.djname;
    albumArtNode.src = djImageApi + data.main.dj.djimage;

    const totalDuration = data.main.end_time - data.main.start_time;
    const remaining = data.main.end_time - Date.now() / 1000;

    const playedFor = totalDuration - remaining;
    progressBarNode.style.width = `${(playedFor / totalDuration) * 100}%`; //prettier-ignore
};
document.onload = updateTrackInfo;
setInterval(updateTrackInfo, 5 * 1000);
