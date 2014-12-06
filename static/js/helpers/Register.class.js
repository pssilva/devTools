/**
* #####################################################
* #####################################################
* @description Class para ajudar na manipulação de elementos/componetes. 
*               E aplicar os conceitos de designer pattern. Assim temos como 
*               ganhar produtividade com a reutilização de soluções genérica! 
* @name    HelperRender
* @author  Paulo Sérgio <pss1suporte@gmail.com>;
* 
*  */
function Register(){
    
    this.register = {};
    this.observer = {};
    
 this.add = function(){
     console.log(this.register);
 };
 
 this.set = function(key,value){     
     this.register[key] = value;
 };
 
 this.get = function(key){
     return this.register[key];
 };
 
 this.setObserver = function(key, value){
     this.observer[key] = value;
 };
 
 this.getObserver = function(key){
     return this.observer[key];
 }; 
 
 this.verifiedRegister = function(key){     
     if(this.get(key)===undefined 
             || this.get(key) === null 
                || this.get(key) ==="") {return false;}
         else return true;
 };
 
 this.verifiedObserver = function(key){
     if(this.getObserver(key) === undefined 
             || this.getObserver(key) === null
                || this.getObserver(key) === ""){return false;}
        else return true;
 }
 
 this.resetRegister = function(){
     this.register = {};
 };
 
 this.resetObserver = function(){
     this.observer = {};
 };
 
 this.resetAll = function(){
     this.resetObserver();
     this.resetRegister();
 };
}
register = new Register();