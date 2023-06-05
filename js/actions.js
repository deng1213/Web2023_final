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
const apiUrl = "http://web-final.azurewebsites.net/knowledges";

let thisButton = document.getElementById("knowledge_btn");
let showData = document.getElementById("showData");

thisButton.addEventListener("click",loadServerData);

/*function loadServerData(){
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
        console.log(`readystate init:"${xmlHttpRequest.readyState}`);
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
    console.log(`readystate send before:"${xmlHttpRequest.readyState}`);
    xmlHttpRequest.send();
    xmlHttpRequest.onreadystatechange = function(){
        console.log(`readystate after:"${xmlHttpRequest.readyState}`);
        console.log(`readystatus:"${xmlHttpRequest.status}`);

        //state==4:request&response     status==200:ok
        if( xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == 200){
            showData.innerHTML = xmlHttpRequest.responseText;
            //thisButton.style.visibility = "hidden";
        }
    }

}*/

const knowledges = [
    "化妝品是指施於人體外部、牙齒或口腔黏膜，用以潤澤髮膚、刺激嗅覺、改善體味、修飾容貌或清潔身體之製劑(依其他法令認屬藥物者除外)",
    "在國外買的產品，以為是化妝品，實際上可能會是藥品、醫療器材或是一般商品。",
    "一般的牙膏跟漱口水是化妝品喔。",
    "已開封的不同品牌的洗髮精不建議倒在一起繼續用(沐浴乳也是)。",
    "快用完的洗髮精不建議加水稀釋繼續用(沐浴乳也是)。",
    "化妝品再塑形，可能造成細菌滋生的風險，忽冷忽熱加速產品質變。",
    "化妝品是私人用品，不和人共享，衛生安全才更有保障。",
    "透過化妝品「促進肌膚神經醯胺合成」很困難。",
    "靠化妝品「促進(刺激)膠原蛋白合成或增生」太難了。",
    "預防(消除)肥胖紋、橘皮組織都已涉及人體結構外觀改變，化妝品辦不到。",
    "肥胖紋:脂肪快速增加時，皮膚組織過度伸展、彈性受到破壞，形成條狀紋路。",
    "橘皮:脂肪堆積過剩，造成表面凹凸不平。",
    "細胞老化死亡就回不去了，不要指望化妝品「讓皮膚細胞重生」。",
    "洗臉劑泡泡多≠清潔夠。",
    "只用清水洗臉是帶不走臉上油溶性髒污的。",
    "乾洗髮不能代替洗髮精。",
    "即使夏天肌膚易出油，還是需要保濕。",
    "反覆使用噴霧式化妝水保濕，反而可能越噴越乾。",
    "爆水霜不一定更保濕。",
    "防曬無法完全防止紫外線傷害，還是要搭配物理性遮蔽及減少曝曬，才能較有效的防止曬傷、曬黑。",
    "防曬劑上UVA常見標示方式「PA+」、「★」、「broad spectrum」，避免UVA可以預防肌膚老化、變黑、產生皺紋。",
    "防曬劑上UVB常見標示方式「SPF」，避免UVB可以預防肌膚曬傷、變紅、暗沉。",
    "一般日常生活，選擇SPF15-30就足夠。",
    "面對電腦，室內燈光下不需要刻意使用防曬劑。",
    "用火燒化粧品無法證明時劑添加成分的含量。",
    "讓紙起皺或透光，不是測試化粧品的保濕力或是否含礦物油。",
    "銀飾物無法證明化粧品中含鉛或汞。",
    "化粧品讓碘酒便無色，不代表能美白。",
    "有人說將精華液滴在化粧眠上，越容易往下滲透，表示越容易吸收。實際上，皮膚的構造跟化粧棉不一樣，一張化粧眠是無法判斷化粧品在肌膚上的吸收力的。",
    "馬克筆/原子筆無法測出洗面乳的清潔力。",
  ];

function loadServerData(){
    const randomIndex = Math.floor(Math.random() * knowledges.length);
    const knowledge = knowledges[randomIndex];

    document.getElementById("show_knowledge").textContent = knowledge;

}