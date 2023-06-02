let topic =[
    "化妝品安全衛生",
    "正確保存化妝品",
    "化妝品 - 洗臉",
    "化妝品 - 防曬",
    "網購化妝品"
];

let playList=[  
    "2pmunh2Kcto",
    "h9H40LaRHfY",
    "cC2yMDmLTlE",
    "JpiOP8ePZj8",
    "SixFCQ8Qyzg"
];

let playTime=[
    [0,45],
    [0,45],
    [0,45],
    [0,45],
    [0,44]
];


let player;
let currentplay = 0;

$(function(){

    //CREATE TABLE 
    $("#courseTable").append("<tr><th>小知識</th><th>主題</th>");
    let topicCount = topic.length;

    let millisecsPerDay=24*60*60*1000;
    for(let x=0;x<topicCount;x++){
        $("#courseTable").append(
            "<tr>"+
            `<td>${x+1}</td>`+
            `<td>${topic[x]}</td>`+
            "</tr>"
        );

    }



});


//youtube
function onYouTubeIframeAPIReady(){
    console.log("hi, I'm ready.");
    player = new YT.Player("player",{
        height:"390",
        width:"640",
        videoId:playList[currentplay],
        playerVars:{
            autoplay:0,
            controls:0,
            start:playTime[currentplay][0],
            end:playTime[currentplay][1],
            iv_load_policy:3
        },
        events:{
            onReady:onPlayerReady,
            onStateChange:onPlayerStateChange
        }
    });
}

//youtube
function onPlayerReady(event){
    $("#playButton").on("click",function(){
        $("h2").text(player.getVideoData().title);
        player.playVideo();
    });
}

//youtube
function onPlayerStateChange(event){
    if(Math.floor(player.getCurrentTime())==playTime[currentplay][1]){
        if(currentplay<playList.length-1){
            console.log("now play num:"+currentplay)
            currentplay++;
            player.loadVideoById({
                videoId:playList[currentplay],
                startSeconds:playTime[currentplay][0],
                endSeconds:playTime[currentplay][1],
                suggestedQuality:"large"
            });
        }else{
            currentplay = 0;
            player.cueVideoById({
                videoId:playList[currentplay],
                startSeconds:playTime[currentplay][0],
                endSeconds:playTime[currentplay][1],
                suggestedQuality:"large"
            });
            //$("h2").text();
        }
    }
    if(event.data == 1){
        $("h2").text(player.getVideoData().title);
         
    }


}


//kenowledge
let knowledge_length=30;
let thisButton = document.getElementById("knowledge_btn");
let showData = document.getElementById("showData");

thisButton.addEventListener("click",loadServerData);

function loadServerData(){
    console.log("Load Server Data!");
    let xmlHttpRequest;
    let past=-1;

    var numberOflistitem = knowledge_length;
        
    // Math.random() : the number between 0~1
    // *3  -> the number between 0~3
    var randomChildnumber = Math.floor(Math.random()*numberOflistitem);
    
    if(past== -1)
        past =randomChildnumber;
    else{
        while(past==randomChildnumber){
            randomChildnumber = Math.floor(Math.random()*numberOflistitem);
        }
        past=randomChildnumber;
    } 

    if(window.XMLHttpRequest){
        xmlHttpRequest = new XMLHttpRequest();
        //console.log(`readystate init:"${xmlHttpRequest.readyState}`);
    }else{ 
        alert("No XMLHttpRequest!");
        return;
    }

    console.log("number:"+randomChildnumber);
    let name = "/data/knowledge";
    name += randomChildnumber;
    name += ".txt";

    console.log("name:"+name);

    xmlHttpRequest.open("GET",name,true);
    //console.log(`readystate send before:"${xmlHttpRequest.readyState}`);
    xmlHttpRequest.send();
    xmlHttpRequest.onreadystatechange = function(){
        //console.log(`readystate after:"${xmlHttpRequest.readyState}`);
        //console.log(`readystatus:"${xmlHttpRequest.status}`);

        //state==4:request&response     status==200:ok
        if( xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            showData.innerHTML = xmlHttpRequest.responseText;
            //thisButton.style.visibility = "hidden";
        }
    }


}