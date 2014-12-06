/**
* #####################################################
* #####################################################
* @description Class para ajudar na manipulação de elementos/componetes.
* @name    Questions
* @author  Paulo Sérgio <pss1suporte@gmail.com>;
* 
*  */
//Classe Questions
function Questions(){
    this.table;   
    this.register = new Register();
    this.helperRender = new HelperRender();
    this.resultResponse = null;
        
  this.sendDateQuestions = function(url,formData){
      var ownObject = this; //Representa a própria Classe Questions
      $.ajax({
        type:"POST",
        url: url,
        data:formData,
        success: function(response) {
          ownObject.resultResponse = response;
          console.log("response");
          console.log(response);
          var form = $("#form-questionario"); 

          if(response.status==200 && response.datas.step_current==0){ 
            //getMessageAlerts(response.successes[0], "success", form, "before"); 
          }

        }, 
        dataType:"json" 
      });

      return ownObject.resultResponse;
  };
    
  this.clickInputButton = function(aValue){ 
      var ownObject = this; //Representa a própria Classe Questions (questions.class.js) 
      $( "input[type='button']" ).click(function() { 
        var inputButton = $(this); 
        var form = $("#form-questionario"); 
        var name = form.attr("name"); 
        var step = inputButton.attr("step"); 
        if(ownObject.resultResponse!=null){ 
          aValue.action='update'; 
        } 
        var url = "questions/index.php" ;
        var formData = {step:step, action:aValue.action, name:name, data:form.serializeArray()};
        ownObject.sendDateQuestions(url,formData);
      });
  };

  this.setValuesForm = function(nameForm,questionnaires_answers){
      var form = $("form[name='"+nameForm+"']");
      var ownObject = this; //Representa a própria Classe Questions
      if(!isNull(questionnaires_answers)){
        $.each(questionnaires_answers,function(k,objInput){          
              var inputs = $("input[name='"+objInput.name+"']");
            $.each(inputs,function(kInp,input){
              input = $(input);
              if((input.attr("type") == "radio" || input.attr("type") == "checkbox") && input.val()==objInput.value){
                input.attr('checked', true);
              } else {
                 input.val(objInput.value);
              }
           });
        });
      }
  };

  this.showNextFs = function(step){
    var next_fs = $('.step').addClass("divhide");
    var inputButton = $("input[step='"+step+"']");
    current_fs = inputButton.parent().parent();
    next_fs = inputButton.parent().parent().next();

    current_fs.hide(500);
    next_fs.fadeIn(500);
  };

}
  var questionsForm = new Questions();
  //questionsForm.sendDateQuestions("questions/index.php");
  