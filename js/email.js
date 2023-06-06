var initSubject='',initBody='';
 
    //按下傳送按鈕後執行
    function submitHandler(){
        var to = "snilia520@gmail.com";//寫死的傳送對象 就是公司的信箱 不會顯示在網頁上
        var name = nameText.value;//讀取ID為 nameTextuser 物件中的值
        var email = emailText.value;
        var tel = telText.value;
        var subject = subText.value;
//把user填的資料都塞到 mail body 中
        var body = ""+bodyText.value+'%0A%0A%0A';//%0A是換行 換了三行
            body += "From："+nameText.value+'%0A';
            body += "Email："+emailText.value+'%0A';
            body += "Tel："+telText.value;
//傳送的主要程式碼
        mailTo.href="mailto:"+to+"?subject="+subject+"&body="+body;
        mailTo.click();
    }
//在body onload
    function init(){
        subText.value=initSubject;
        toText.value=initTo;
        bodyText.value=initBody;
    }