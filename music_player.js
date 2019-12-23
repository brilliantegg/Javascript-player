var player_main = document.getElementById("player_main");
var play = document.getElementById("play");
var stop = document.getElementById("stop");
var fast_backward = document.getElementById("fast_backward");
var fast_forward = document.getElementById("fast_forward");
var loop = document.getElementById("loop");
var song = document.getElementById("song");
var music_list = document.getElementById("music_list");
var prev_song = document.getElementById("prev_song");
var next_song = document.getElementById("next_song");
var song_title = document.getElementById("song_title");
var song_status = document.getElementById("song_status");
var audio = document.getElementById("audio");
var random_song = document.getElementById("random_song");
var all_loop_song = document.getElementById("all_loop_song");
var loop_status=document.getElementById("loop_status");
var time_track = document.getElementById("time_track");
var progress_bar = document.getElementById("progress_bar");
var book = document.getElementById("book");
var sbook = document.getElementById("sbook");
var tbook = document.getElementById("tbook");
var btn_update_list = document.getElementById("btn_update_list");
var display_list = document.getElementById("display_list");


default_song();

play.addEventListener("click", play_audio);
stop.addEventListener("click", stop_audio);
audio.addEventListener("ended", auto_play);
fast_backward.addEventListener("click", function () {
    backward_forward(true)
});
fast_forward.addEventListener("click", function () {
    backward_forward(false)
})
loop.addEventListener("click", loop_this_song);
random_song.addEventListener("click", random_select);
all_loop_song.addEventListener("click",all_loop);
music_list.addEventListener("change", change_song);
prev_song.addEventListener("click", previous_audio);
next_song.addEventListener("click", next_audio);
progress_bar.addEventListener("click", time_choose);
sbook.addEventListener("dragstart", drag);
tbook.addEventListener("dragover", allowDrop);
tbook.addEventListener("drop", function () {
    drop(event, this)
});

tbook.addEventListener("dragstart", drag);
sbook.addEventListener("dragover", allowDrop);
sbook.addEventListener("drop", function () {
    drop(event, this)
});
btn_update_list.addEventListener("click", update_list);
display_list.addEventListener("click", show_list);

audio.ontimeupdate = function () {
    time_update()
};


//read sbook list's song into option's list
function default_song() {
    for (i = 0; i < sbook.children.length; i++) {
        var option = document.createElement("option");
        snode = sbook.children[i];
        option.value = sbook.children[i].title;
        option.innerText = sbook.children[i].innerText;
        music_list.appendChild(option);
        sbook.children[i].draggable = true;
        sbook.children[i].id = 'song' + (i + 1);
    }
    change_song(0);
}

function drag(evt) {
    evt.dataTransfer.setData("text", evt.target.id);
    console.log(evt.target.id);
}
//處理允許丟入div的功能
function allowDrop(evt) {
    evt.preventDefault();
}
//處理丟入div的歌
function drop(evt, obj) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("text");
    obj.appendChild(document.getElementById(data));
}

function play_audio() {
    if (audio.paused) {
        audio.play();
        play.innerText = "";
        play.innerText = "\u2161";
        song_status.innerText = "Playing:";
    } else {
        audio.pause();
        play.innerText = "";
        play.innerText = "\u2bc8";
        song_status.innerText = "Paused:";
    }
}

function stop_audio() {
    audio.pause();
    audio.currentTime = 0;
    play.innerText = "\u2bc8";
}

function backward_forward(flag) {
    (flag) ? audio.currentTime -= 5: audio.currentTime += 5;
}

function loop_this_song() {
    if (loop.innerText != "stop loop") {
        audio.loop = true;
        loop.innerText = "stop loop";
        loop.style.backgroundColor = "#708090";
    } else {
        audio.loop = false;
        loop.innerText = "start loop \u2B6F‬"
        loop.style.backgroundColor = "#a9a9a9";
    }
}

function setVolume(volume) {
    audio.volume = volume;
}

function song_load() {
    song.src = music_list[index].value;
    music_list.options[index].selected = true;
    audio.load();
    console.log(song.src);
    now_playing();
}

function change_song() {
    index = music_list.selectedIndex;
    song_load();
    play.innerText = "\u2bc8";
}
function auto_play() {
    index = music_list.selectedIndex;
    if(loop_status.innerText !="全曲循環" && index==music_list.length-1){
        if(audio.onended){
            stop_audio();
            }
    }
    else{
        next_audio();
        }
}
function all_loop(){
    if(loop_status.innerText!="全曲循環"){
        document.getElementById("loop_status").innerText="全曲循環";}
    else{
        loop_status.innerText="無循環";
    }
}


function random_select() {
    index = Math.floor(Math.random() * music_list.options.length);
    console.log(index);
    song_load();
}
//上/下曲切換功能
function previous_audio() {
    index = music_list.selectedIndex - 1;
    if (index < 0) {
        index = music_list.length - 1;
    }
    console.log(index);
    song.src = document.getElementsByTagName("option")[index].value;
    song_load();
    audio.play();
}

function next_audio() {
    index = music_list.selectedIndex + 1;
    if (index == music_list.length) {
        index = 0;
    }
    console.log(index);
    song.src = document.getElementsByTagName("option")[index].value;
    song_load();
    audio.play();
}
//下面這個功能感覺很雞肋
function now_playing() {
    index = music_list.selectedIndex;
    var x = music_list[index].innerText;
    song_title.innerText = x;
}

function time_update() {
    progress_convert = Math.floor(audio.currentTime / 60) + ":" + Math.floor(audio.currentTime % 60);
    duration_convert = Math.floor(audio.duration / 60) + ":" + Math.floor(audio.duration % 60);
    x = progress_convert + " / " + duration_convert;
    document.getElementById("time_progress").innerText = x;
    time_track.style.width = (audio.currentTime / audio.duration) * 100 + "%";
    console.log(time_track.style.width);
}
//拖曳到指定時間
function time_choose(event) {
    audio.currentTime = (event.offsetX / player_main.clientWidth) * audio.duration;
}
//mute***

function update_list() {
    for (i = music_list.children.length - 1; i >= 0; i--) {
        music_list.removeChild(music_list.children[i]);
    }
    for (i = 0; i < tbook.children.length; i++) {
        var option = document.createElement("option");
        tnode = tbook.children[i];
        option.value = tbook.children[i].title;
        option.innerText = tbook.children[i].innerText;
        music_list.appendChild(option);
    }
    change_song(0);
}

function show_list() {
    if (book.className == "hidden"){
        book.className = "";
        document.getElementById("mainblock").style.height="500px";
    }
    else{
        book.className = "hidden";
        document.getElementById("mainblock").style.height="350px";
    }
}
