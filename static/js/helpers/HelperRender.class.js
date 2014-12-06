/**
* #####################################################
* #####################################################
* @description Class para ajudar na manipulação de elementos/componetes.
* @name    HelperRender
* @author  Paulo Sérgio <pss1suporte@gmail.com>;
* 
*  */
//Classe HelperRender
// include("funcs.js");


document.write("<script type='text/javascript' src='models/funcs.js'></script>");

function HelperRender(){
    this.selectComponent;
    this.radioComponent;
    this.textareaComponent;
    this.labelComponent;
    this.divComponent;
    this.inputComponent;
    this.nodeTextComponent;
    this.checkboxComponent;
    this.formComponent;
    this.default_values;
    this.register = new Register();

    this.setInput = function(objAttr){
        this.inputComponent = $("<input>",objAttr);
    };

    this.getInput = function(){
        return this.inputComponent;
    };

    this.setSelectComponent = function(objAttr,objOption){
        var keys;
        var option;
        
        this.selectComponent = $('<select>',{
            name : objAttr.name,
            id : objAttr.id,
            class : objAttr.class
        });
        option = $("<option>", {
            value:"",
            text:"Selecione ..."
        });        
        this.selectComponent.append(option);
        
        for(var i = 0; i < objOption.length;i++){
            keys = this.object_keys(objOption[i]);
            option = $("<option>", {
                value:keys,
                text:objOption[i][keys]
            });
            this.selectComponent.append(option);
        }
    };
    
    
     this.getCloneInputHidden = function(idElement,newNameId){
        var elementOriginal = $("#"+idElement);
        var elementClone;
        
        if(elementOriginal.prop('tagName') == "INPUT"){
            elementClone = elementOriginal.clone(true);
            //elementClone.attr("id",newNameId);
            elementClone.attr("name",newNameId);
            elementClone.attr("type",'hidden');
        } else {
            var objAttr = {
              //  id:newNameId,
                name:newNameId,
                value:elementOriginal.val(),
                type:"hidden"
            }
            elementClone = $("<input>",objAttr);
        }     
        
        return elementClone;
    };
    
    this.setDivComponent = function(objAttr){        
        this.divComponent = $('<div>',objAttr);
    };
    
    this.getDivComponent = function(){
        return this.divComponent;
    };
    
    this.setLabelComponent = function(objAttr){
        var keys;        
        this.labelComponent = $('<label>',{
                for : objAttr.for,
                text : objAttr.text
            });
    };
    
    this.getLabelComponent = function(){
        return this.labelComponent;
    };
    
    this.setRadioComponent = function(objAttr,objOption){
        var keys;
        var div;
        
        this.setDivComponent({id:"radio_"+objAttr.name,class:objAttr.class});
        div = this.getDivComponent();
        
        for(var i = 0; i < objOption.length;i++){
            keys = this.object_keys(objOption[i]);
            this.radioComponent = $('<input>',{
                type : objAttr.type,
                name : objAttr.name,
                value : keys,
                id : objAttr.id,
                class : objAttr.class
            });
            
            if(i < objOption.length){
                div.append(this.getRadioComponent());
                div.append(objOption[i][keys]+"<br />");
            }else if(i == objOption.length-1){
                div.append(this.getRadioComponent());
                div.append(objOption[i][keys]);
            }
        }        
        this.radioComponent = div;        
    };
    
    this.setCheckboxComponent = function(objAttr,objOption){
        var keys;
        var div;
        
        this.setDivComponent({id:"checkbox_"+objAttr.name,class:objAttr.class});
        div = this.getDivComponent();
        
        for(var i = 0; i < objOption.length;i++){
            keys = this.object_keys(objOption[i]);
            this.checkboxComponent = $('<input>',{
                type : objAttr.type,
                name : objAttr.name+"[]",
                value : keys,
                id : objAttr.id,
                class : objAttr.class
            });
            
            if(i < objOption.length){
                div.append(this.getCheckboxComponent());
                div.append(objOption[i][keys]+"<br />");
            }else if(i == objOption.length-1){
                div.append(this.getCheckboxComponent());
                div.append(objOption[i][keys]);
            }
        }
        this.checkboxComponent = div;
        console.log(div);
    };
    
    this.getCheckboxComponent = function(){
       return this.checkboxComponent;
    };
    
    this.getSelectComponent = function(){
        return this.selectComponent;
    };
    
    this.getRadioComponent = function(){
        return this.radioComponent;
    };


    /*###################################################*/
    /*@reference: <http://stackoverflow.com/questions/3068534/getting-javascript-object-key-list>*/
    /*###################################################*/
    this.object_keys = function(obj)  {
        var r = [];
        for (var k in obj) {
            if (!obj.hasOwnProperty(k)) 
                continue;
            r.push(k);
        }
        return r;
    }
    /*###################################################*/
    /*###################################################*/
    
    /*###################################################*/
    /*###################################################*/
    this.object_values = function(obj) {
        var v = [];
        for (var k in obj) {
            if (!obj.hasOwnProperty(k)) 
                continue;
            var key = this.object_keys(obj[k]);
            v.push(obj[k][key]);
        }
        return v;
    }
    /*###################################################*/
    /*###################################################*/    
    
    /*###################################################*/
    /*###################################################*/
    this.getDefault_values = function(obj) {
         var strReturn = "";
         //strReturn += (this.getDefault_values()===undefined)?"":this.getDefault_values();
        for (var k in obj) {
            if (!obj.hasOwnProperty(k))
                continue;
            
            if(obj.length === undefined){
                strReturn += k + "; ";
            }else{
                strReturn += this.getDefault_values(obj[k]);
            }
        }
        return strReturn;
    }
    /*###################################################*/
    /*###################################################*/
    
    
    /*###################################################*/
    /*###################################################*/
    this.verificarDefault_values = function(valueDefault,obj) {
         var result = false;
         
         var strValues = this.getDefault_values(obj);
         var aValues = strValues.split("; ");
         console.log(aValues);
        for (var k in aValues) {
            if (!aValues.hasOwnProperty(k))
                continue;
            console.log((aValues[k] === valueDefault));
            if(aValues[k] === valueDefault){
                console.log(k);
                result = true;
                break;
            }
        }
        return result;
    }
    /*###################################################*/
    /*###################################################*/
    
    
     /*###################################################*/
    /*###################################################*/
    this.getFieldsNamesOfForm = function(idForm) {
         var form = $(idForm);
         var field = [];
         var serialize = form.serialize();
         var aSerialize = serialize.split("&");
         
        for (var k in aSerialize) {
            if (!aSerialize.hasOwnProperty(k))
                continue;
            
            var aField = aSerialize[k].split("=");
            aField[0] = aField[0].replace("%5B", "[");
            aField[0] = aField[0].replace("%5D%5B%5D", "][]");
            field.push(aField[0]);
            
        }
        return field;
    }
    /*###################################################*/
    /*###################################################*/
    
    /*###################################################*/
    /*###################################################*/
    this.getFieldsTypesOfForm = function(idForm) {
         var form = $(idForm);
         var fields = form.serializeArray();         
         $.each(fields, function(k, field){             
            var objField = $('[name="'+field.name+'"]');
            field.type = objField.attr('type');
            field.tagName = objField.prop('tagName');
            field.id = objField.prop('id');
            fields[k] = field;
         });         
        return fields;
    }
    /*###################################################*/
    /*###################################################*/
    
    
    this.lengthObject = function(obj){
        return length = $.map(obj, function(n, i) { return i; }).length;
    };
    
    this.getElementInList = function(list, idElement){
        var returnElement = null;        
        $.each(list, function(i, element){
            element = $(element);            
            if(element.attr("id") == idElement){
                returnElement = element;
                console.log('element.attr("id")');
                console.log(element.attr("id"));
              return  false;
            }
        });
        return returnElement;
    };    
    
    this.getLabelToTHeader = function(key,aInLabel){
        var resultLabel = "";
        var aLocalLabel = [
            {k:"a",lLabel:"áàãâä"},
            {k:"",lLabel:""}
        ];        
        aInLabel = (isNull(aInLabel))?aLocalLabel:aInLabel;        
        $.each(aInLabel, function(k, lLabel){
            if(aInLabel[k] == key){
                resultLabel = lLabel;
                console.log('lLabel');
                console.log(lLabel);
              return  false;
            }
        });
        resultLabel =  (isNull(resultLabel))?key:resultLabel;        
        return resultLabel;
    };
    
}

var helperRender = new HelperRender();

