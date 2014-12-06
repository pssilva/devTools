/**
* #####################################################
* #####################################################
* @description Class para ajudar na manipulação de elementos/componetes.
* @name    TableRender
* @author  Paulo Sérgio <pss1suporte@gmail.com>;
* 
*  */
//Classe TableRender
function TableRender(){
    this.table;
    this.tbody;
    this.caption;
    this.tfoot;
    this.thead;
    this.countRows;    
    this.register = new Register();
    this.helperRender = new HelperRender();
        
  this.createTable = function(objAttr,thead, tbody, relativeElement, renderLocation){      
      
      this.table = $("<table>", objAttr);
      if(!this.isNull(thead)) this.table.append(thead);
       if(!this.isNull(tbody)) this.table.append(tbody);
      /**
        * Referência: <http://www.w3schools.com/jquery/jquery_dom_add.asp>
        * append() - Inserts content at the end of the selected elements
        * prepend() - Inserts content at the beginning of the selected elements
        * after() - Inserts content after the selected elements
        * before() - Inserts content before the selected elements 
        */
         switch(renderLocation){
             case "append":            
                     relativeElement.append(this.table);
                 break;
             case "prepend":            
                     relativeElement.prepend(this.table);
                 break;            
             case "after":            
                     relativeElement.after(this.table);
                 break;            
             case "before":            
                     relativeElement.before(this.table);
                 break;            
             default:         
                     relativeElement.before(this.table);
         }
      this.register.set("table."+objAttr.id,this.table);
      this.register.set("table."+objAttr.name, this.table);
  };
  
  this.getTable = function(name_or_id){
    if(!isNull(this.register.get("table."+name_or_id))){
        this.table = this.register.get("table."+name_or_id);
    }else{
        this.table = $("#"+name_or_id);
        
        if(isNull(this.table)){
            this.table = $('table[name='+name_or_id+']');
        }
    }    
      this.register.set("table."+name_or_id,this.table);
      return this.table;
  };
    
  this.createThead = function (objAttr,objTr,nameTable_or_idTable){
      
     // console.log(objTr);
      var th;
      var keys;
      var value;
      
      this.thead = $("<thead>",objAttr);
      var tr = $("<tr>",objTr.attr);
      this.thead.append(tr);
      
      for(var i = 0; i < objTr.tr.length; i++){
          keys = this.object_keys(objTr.tr[i]);
          value = objTr.tr[i][keys];
          th = $("<th>",objAttr);     
          th.attr("data-sort",keys);
          th[0].textContent = value;
          tr.append(th);
      }
      
      if(!this.isNull(nameTable_or_idTable)){
        this.table = this.register.get("table."+nameTable_or_idTable);
        this.table.append(this.thead);
        this.register.set("table."+nameTable_or_idTable,this.table);
      }
      
  };
  /**
    * #####################################################
    * #####################################################
    * @description Função que faz .....
    * @name    createTbody(objTbody,dataTd,nameTable_or_idTable)
    * @author  Paulo Sérgio <pss1suporte@gmail.com>;
    * 
    * @param String text
    * @example "Fomulário preenchido com sucesso!"
    *  
    * @param Object dataTd (Object JSON)
    * @example dataTd = {
                    data:[
                            {value:"Valor1",c_label:"Label1",action:"E,X"},
                            {value:"Valor2",c_label:"Label2",action:"E,X"},
                            {value:"Valor3",c_label:"Label3",action:"E,X"},
                            {value:"Valor4",c_label:"Label4",action:"E,X"},
                            {value:"Valor5",c_label:"Label5",action:"E,X"},
                            {value:"Valor6",c_label:"Label6",action:"E,X"},
                            {value:"Valor7",c_label:"Label7",action:"E,X"}
                        ],
                    attrTd:{id:"id_td",class:"class1 class2"},
                    attrTr:{id:"id_tr",class:"classA classB"}
                };
    * 
    * @param String renderLocation
    * @example "append", ou "prepend", ou "after", ou "before".
    * 
    * @return String tag div
    * 
    *  */
  this.createTbody = function (objTbody,dataTd,nameTable_or_idTable){
      var td;
      var tr;
      var keys;
      var objKey;
      var value;
      
      this.tbody = $("<tbody>",objTbody);
      for(var i = 0; i < dataTd.data.length; i++){
          tr = $("<tr>",dataTd.attrTr);
          this.tbody.append(tr);
          objKey = this.object_keys(dataTd.data[i]);
        
        for(var k = 0; k < objKey.length; k++){
            keys = objKey[k];
            td = $("<td>",dataTd.attr);            
            if(objKey[k]=== "action"){
               td.append(dataTd.data[i][objKey[k]]);
            }else{
                td[0].textContent = dataTd.data[i][objKey[k]];
            }
                  td.attr("class",objKey[k]);
                  td.attr("id",objKey[k]);
                  tr.append(td);
                  tr.attr("index",i);
        }
      }
      
      if(!this.isNull(nameTable_or_idTable)){
        this.table = this.register.get("table."+nameTable_or_idTable);
        this.table.append(this.tbody);        
        this.register.set("table."+nameTable_or_idTable,this.table);
      }  
  };
  
  this.getThead = function (){
      return this.thead;
  };
  
  this.getTbody = function (){
      return this.tbody;
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
    
    this.isNull = function(x)
    {
        if((x == 'undefined') || (x == null) || (x == "")){return true;}
        else{return false;}
    };
    
    /**
    * #####################################################
    * #####################################################
    * @description Função que faz altera uma tabela para colocar os eventos de 
    * classificação das colunas e adiciona uma coluna de index.
    * @name    applyListTable(tableName_or_Id)
    * @author  Paulo Sérgio <pss1suporte@gmail.com>;
    * 
    * @param String text
    * @example "Fomulário preenchido com sucesso!"
    *  
    * @param String relativeElement (Object jQuery)
    * @example $("#id_your_form"), ou $("#id_your_element").
    * 
    * @param String renderLocation
    * @example "append", ou "prepend", ou "after", ou "before".
    * 
    * @return String tag div
    * 
    *  */
    this.applyListTable = function(tableName_or_Id, relativeElement, renderLocation){
    /**
     * Ainda não implementada!
     * */
        
        /**
        * Referência: <http://www.w3schools.com/jquery/jquery_dom_add.asp>
        * append() - Inserts content at the end of the selected elements
        * prepend() - Inserts content at the beginning of the selected elements
        * after() - Inserts content after the selected elements
        * before() - Inserts content before the selected elements 
        */
         switch(renderLocation){
             case "append":            
                     relativeElement.append(this.table);
                 break;
             case "prepend":            
                     relativeElement.prepend(this.table);
                 break;            
             case "after":            
                     relativeElement.after(this.table);
                 break;            
             case "before":
                     relativeElement.before(this.table);
                 break;            
             default:         
                     relativeElement.before(this.table);
         }
        this.register.set("table."+tableName_or_Id,this.table);
    };
    
    
     /**
    * #####################################################
    * #####################################################
    * @description Função que .....
    * @name    addTrData(tableName_or_Id,objTrData)
    * @author  Paulo Sérgio <pss1suporte@gmail.com>;
    * 
    * @param String tableName_or_Id
    *  
    * @param JSON objTrData (Object JSON)
    * @example var dataTd = {
                    data:[objTrData],
                    attrTd:{},
                    attrTr:{}
                };
    * 
    *  */
    this.addTrData = function(tableName_or_Id,objTrData){
      var td;
      var tr
      var keys;
      var objKey;     
      var value;
      
      this.table = this.getTable(tableName_or_Id);
      this.tbody = this.table.find("tbody");     
      
      if(this.tbody.length === 0){
            this.createTbody({},objTrData,tableName_or_Id);
            this.tbody = this.getTbody();
            this.table.append(this.tbody);
        }else{            
            for(var i = 0; i < objTrData.data.length; i++){
             tr = $("<tr>",objTrData.attrTr);
             //console.log(tr);
                this.tbody.append(tr);          
                objKey = this.object_keys(objTrData.data[i]);                   
                for(var k = 0; k < objKey.length; k++){
                  keys = objKey[k];
                  td = $("<td>",objTrData.attr);
                  if(objKey[k]=== "action"){
                        td.append(objTrData.data[i][objKey[k]]);
                  }else{                    
                        td[0].textContent = objTrData.data[i][objKey[k]];
                  }
                  
                  td.attr("class",objKey[k]);
                  td.attr("id",objKey[k]);
                  tr.append(td);
                  tr.attr("index",this.getCountRows (tableName_or_Id));
              }              
            }
        }
        this.register.set("table."+tableName_or_Id,this.table);
        return tr;
    };
    
     /**
    * #####################################################
    * #####################################################
    * @description Função que .....
    * @name    editTrData(tableName_or_Id,objTrData)
    * @author  Paulo Sérgio <pss1suporte@gmail.com>;
    * 
    * @param String tableName_or_Id
    *  
    * @param JSON objTrData (Object JSON)
    * @example var dataTd = {
                    data:[objTrData],
                    attrTd:{},
                    attrTr:{}
                };
    * 
    *  */
    this.editTrData = function(tableName_or_Id,objTrData,objTr){
      var td;
      var tr
      var keys;
      var objKey;     
      var value;
      
      this.table = this.getTable(tableName_or_Id);
      this.tbody = this.table.find("tbody");     
                        
             tr = objTr;
                tr.each(function(i, item){
                    var td = tr.find("td");            
                    td.each(function(g, itemTd){
                        if(value === itemTd.innerHTML){
                            result = true;
                            return false;//sai do loop do td
                        }
                    });            
                    if(result) return false;//sai do loop do tr
                });
        
        this.register.set("table."+tableName_or_Id,this.table);
    };
    
    this.verificarTable = function(name_or_id){
        if(this.register.verifiedRegister("table."+name_or_id)){return true;}
        else return false;
    };
    
    this.registerTable = function(name_or_id){
        this.table = $("#"+name_or_id);
        this.register.set("table."+name_or_id,this.table);
        return this.table;
    };
    
    this.checkValueCell = function(value,colIndex,tableName_or_Id){
        var result = false;
      this.table = $("#"+tableName_or_Id);
      this.tbody = this.table.find("tbody");
        var tr = this.tbody.find('tr');
        tr.each(function(i, item){
            var td = tr.find("td");
            td.each(function(g, itemTd){
                itemTd = $(itemTd);
                if(value === itemTd.text()){
                    result = true;
                    return false;//sai do loop do td
                }
            });
            if(result) return false;//sai do loop do tr
        });
      return result;
    };
    
    this.getRowByAttrValue = function(tableName_or_Id, objAttr){
        this.table = this.getTable(tableName_or_Id);
        this.tbody = this.table.find("tbody");
        var key = this.object_keys(objAttr);
        var vAttr = objAttr[key[0]];
        var tr = this.tbody.find('tr['+key[0]+'="'+vAttr+'"]');
        return tr;
    };
    
    this.getObjJSONByTh = function(objTr,aColIndex){
        var objJSON = {};
        var tableRender = this;
        objTr.each(function(i, item){
            var th = $(item)
            th.each(function(g, itemTh){
               if(tableRender.arraySearch(aColIndex,g) == g){
                itemTh = $(itemTh);
                objJSON[itemTh.attr("data-sort")] = itemTh.text();
               }
            });
        });
        return objJSON;
    };
    
    
    this.getObjJSONByTr = function(objTr,aColIndex){
        var objJSON = {};
        var tableRender = this;        
        objTr.each(function(i, item){
            var td = objTr.find("td");
            td.each(function(g, itemTd){
               if(tableRender.arraySearch(aColIndex,g) == g){
                itemTd = $(itemTd);
                objJSON[itemTd.attr("id")] = itemTd.text();
               }
            });
        });
        return objJSON;
    };
    
    this.getJSONFromTable = function(sTableId, aColIndex){
        var objJSON = {};
        var tbodyJSON;
        var table = $("#"+sTableId);
        var tbodys = table.find("tbody");
        var thead = table.find("thead");
        var tableRender = this;
        
        thead = tableRender.getJSONFromThead(thead, aColIndex);
        
        objJSON["thead"] = thead;
                
        tbodys.each(function(k,tbody) {
            tbody = $(tbody);
            tbodyJSON =  tableRender.getJSONFromTbody(tbody, aColIndex);
            objJSON["tbody_"+k] = tbodyJSON;
        })
        return objJSON;
    };
    
    
    this.getJSONFromThead = function(objThead, aColIndex){
        var objJSONTbody = {};
        var objJSONTd = {};
        var objJSONTr = {};
        var tableRender = this;
         var ths = objThead.find('th');      
        ths.each(function(h, th){
            th = $(th);
            objJSONTr["th_"+h] = tableRender.getObjJSONByTh(th,aColIndex);
        });
        return objJSONTr;
    };
    
    this.getJSONFromTbody = function(objTbody, aColIndex){
        var objJSONTbody = {};
        var objJSONTd = {};
        var objJSONTr = {};
        var tableRender = this;
         var trs = objTbody.find('tr');  
        trs.each(function(h, tr){
            tr = $(tr);
            objJSONTr["tr_"+h] = tableRender.getObjJSONByTr(tr,aColIndex);
        });
        return objJSONTr;
    };
    
    this.getTableFromJSON = function(objTable, data){
            var tbl_body = "<tbody>";
            var indexRt = 0;
            $.each(data, function() {
                var tbl_row = "";
                $.each(this, function(k , v) {
                    tbl_row += "<td id = '"+k+"'>"+v+"</td>";
                })
                tbl_body += "<tr indexRt='"+indexRt+"'>"+tbl_row+"</tr>";  
                indexRt++;
            })
            tbl_body += "</tbody>";
            objTable.append(tbl_body);
        return objTable;
    };
    
    
    
    this.removeClass = function(elemento,nameClass){
        elemento.removeClass(nameClass);
    };
    
    
    this.editRowByJSON = function(objTr,objJSON, aColIndex){
        var tableRender = this;
        var aTd = [];
        var key = this.object_keys(objJSON);
            var td = objTr.find("td");
            td.each(function(g, itemTd){
               if(tableRender.arraySearch(aColIndex,g) == g){
                    itemTd = $(itemTd);
                    aTd.push(itemTd);
               }
            });
            
            for(var i = 0; i<aTd.length;i++){
                var td = aTd[i];
                td.text(objJSON[key[i]]);
            }
        return objTr;
    };
    
    this.arraySearch = function(arr,val) {
        for (var i=0; i<arr.length; i++)
            if (arr[i] == val)
            return arr[i];
        return false;
    };
    
    
    this.getCountRows = function(tableName_or_Id){
        var rowCount = $("#"+tableName_or_Id+" >tbody").children().length;
       // rowCount += 1;
      
        return rowCount;
    };      
}
var tableRender = new TableRender();

