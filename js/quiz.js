$(function(){
    let score=0;
    let answered=-1;

    $("#startButton").on("click",function(){
        answered++;
        //console.log("now answered question:"+answered);

        if(answered == 0){
            //console.log("start");
            $("#options").empty();
            $("#question").text(questions[0].question);

            //forEach function all parameters: array element, array index, array
            questions[0].answers.forEach(function(element, index, array){
                $("#options").append(
                    `<input name='options' type="radio" value='${index}'>`+
                    `<label>${element[0]}</label><br><br>`
                );
                $("#startButton").attr("value","下一題");

            });

        }
        else{
            $.each($(":radio"),function(index,value){
                //console.log(index+":"+value.checked);
                if(value.checked){

                    //check answer , count score
                    //if correct, plus 10 score
                    if(questions[answered-1].answers[index][1] == 1 ){
                        score += 10; 

                    }

                    //go to result
                    if(answered == 10){
                        console.log("end");
                        
                        //$("#question").text("你的測驗成果:");
                        $("#question").text(finalAnswers[score][0]);

                        $("#options").empty();
                        $("#options").append(
                            `${finalAnswers[score][1]}`+
                            `<br><br>`
                        );
                                        
                        
                        $("#startButton").attr("value","重新開始");
                        score= 0;
                        answered = -1 ;
                        
                    }

                    //next question
                    else{
                        $("#question").text(questions[answered].question);
                        $("#options").empty();
                        questions[answered].answers.forEach(function(element, index, array){
                            $("#options").append(
                                `<input name='options' type="radio" value='${index}'>`+
                                `<label>${element[0]}</label><br><br>`
                            );
                        });
                        
                    }
                    return false;
                }

            });
            

        }


    });


});