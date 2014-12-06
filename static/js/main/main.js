(function($) {

/**
*===========================================
*   Isolating functions within namespaces: mainBuscaFacil
*===========================================
*/

function mainBuscaFacil() {
    this._flightDepartureDate=null;
    this._flightArrivalDate=null;
}

$.mainBuscaFacil = { 
    flag:0,     
    outBoundList: null,
    inBoundList: null,
    checkoutForm:null,
    objIda:null,
    objVolta:null,
    searchData:null,
    clickFilter:false,
    templatePassengerAdl:null,
    templatePassengerChd:null,
    clickMenuUser:false,
    rotateSlider:null,

    //Salvando dados de limites
    ccdLimits: null,
    monthlySpend: 0,

    __construction: function(){return new mainBuscaFacil();},    
    init: function(){
      var $flightDepartureDate = $("#flight-departure-date");
      var $flightArrivalDate = $("#flight-arrival-date");
      var flag = 0;

      function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = (inputFormat==undefined)? new Date():new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/');
      }
    },
    autocomplete: function(){ 
        var mainBuscaFacil = this;
        var dataAirports_BRA;
        var cache = {};
        $.getJSON("static/data/airports_BRA.json", function(data,status,xhr) {
            dataAirports_BRA = data;
        });

        $('#select-flight').autocomplete({ 
            source: function( request, response ) {                    
                var term = request.term;
                if ( term in cache ) {
                    response( cache[ term ] );
                    return;
                }
                var result=[]; 
                $.each(dataAirports_BRA, function(k,obj){ 
                    var regex = new RegExp("(?=" + mainBuscaFacil.tratarAlias(request.term.toLowerCase()) + ")"); 
                    if(regex.test(mainBuscaFacil.tratarAlias(obj.code.toLowerCase())) 
                    // || regex.test(mainBuscaFacil.tratarAlias(obj.name.toLowerCase())) 
                    || regex.test(mainBuscaFacil.tratarAlias(obj.tokens.toString().toLowerCase()))
                    || regex.test(mainBuscaFacil.tratarAlias(obj.display_name.toString().toLowerCase()))){ 
                        result.push(obj); 
                    } 
                }); 

                cache[ term ] = result;
                response(result); 
            }, 
            minLength: 3, 
            select: function( event, ui ) { 
                $('#departure').val(ui.item.code);
                this.value = ui.item.display_name; 
                return false; 
            },
            change: function( event, ui ) {
                // Caso o usuario tenha digitado um aeroporto invalido, limpar o campo
                if(ui.item == null){
                    $('#departure').val('');
                    this.value = ''; 
                }
            }
        }).autocomplete( "instance" )._renderItem = function( ul, item ) { 
          return $( "<li>" ) 
            .append( "<a>" + item.display_name + "</a>" ) 
            .appendTo( ul ); 
        }; 

        $('#flight-destination').autocomplete({ 
            source: function( request, response ) {                     
                var term = request.term;
                if ( term in cache ) {
                    response( cache[ term ] );
                    return;
                }
                var result=[]; 
                $.each(dataAirports_BRA, function(k,obj){ 
                    var regex = new RegExp("(?=" + mainBuscaFacil.tratarAlias(request.term.toLowerCase()) + ")"); 
                    if(regex.test(mainBuscaFacil.tratarAlias(obj.code.toLowerCase())) 
                    //|| regex.test(mainBuscaFacil.tratarAlias(obj.name.toLowerCase())) 
                    || regex.test(mainBuscaFacil.tratarAlias(obj.tokens.toString().toLowerCase()))
                    || regex.test(mainBuscaFacil.tratarAlias(obj.display_name.toString().toLowerCase()))){ 
                        result.push(obj); 
                    } 
                }); 
                cache[ term ] = result;
                response(result); 
            }, 
            minLength: 3, 
            select: function( event, ui ) { 
                $('#arrival').val(ui.item.code);
                this.value = ui.item.display_name; 
                return false; 
            },
            change: function( event, ui ) {
                // Caso o usuario tenha digitado um aeroporto invalido, limpar o campo
                if(ui.item == null){
                    $('#arrival').val('');
                    this.value = ''; 
                }
            }
        }).autocomplete( "instance" )._renderItem = function( ul, item ) { 
          return $( "<li>" ) 
            .append( "<a>" + item.display_name + "</a>" ) 
            .appendTo( ul ); 
        }; 

    }, 
    datepicker: function(){ 
        var mainBuscaFacil = this;
        $( "#flight-departure-date" ).datepicker({ 
            defaultDate: "1", 
            minDate: "0D", 
            showButtonPanel: true, 
            numberOfMonths: 2, 
            onClose: function( selectedDate ) {
                $( "#flight-arrival-date" ).datepicker( "option", "defaultDate", selectedDate );
                $( "#flight-arrival-date" ).datepicker( "option", "minDate", selectedDate );
                $( "#flight-arrival-date" ).val(selectedDate);
            },
            onSelect: function( dateText, inst ){
                if(!mainBuscaFacil.validGol(dateText)){
                    var labelGol = $('#flag-company > label:nth-child(3)');
                    // Desmarcarca o checkbox da gol, o desabilita e add class no label parent
                    labelGol.find('input').attr({checked: false,disabled: 'disabled'}).parent().addClass('disabled-radio');
                    labelGol.find('img').attr('src','static/img/flag-gol-gray.gif'); // troca imagem da log da gol
                    $('#searchWarning').slideDown(300);
                }else{
                    var labelGol = $('#flag-company > label:nth-child(3)');
                    // Retira o disabled do checkbox da gol e remove a class do label parent
                    labelGol.find('input').removeAttr('disabled').parent().removeClass('disabled-radio');
                    labelGol.find('img').attr('src','static/img/flag-gol.gif'); // Volta log da gol para sua original
                    $('#searchWarning').slideUp(300);
                }
            }
        });
        
        $( "#flight-arrival-date" ).datepicker({
          showButtonPanel: true,
          numberOfMonths: 2,
          onClose: function( selectedDate ) {
           // $( "#flight-departure-date" ).datepicker( "option", "maxDate", selectedDate );
            $( "#flight-departure-date" ).datepicker( "option", "defaultDate", selectedDate );
          }
        });
    },
    checkSearchDirectionFlight: function(){
        $("input[name='trip']").change(function() {
            if ($("input[name='trip']:checked").val() == 'RoundTrip'){
                //$('#flight-arrival-date').parent().css("display","inline-block");
                $('#flight-arrival-date').parent().removeClass("hide");
                $('#checkout-return').find('span').removeClass("hidden");
                $('#date-flight-inbound').removeClass("hide"); 
                $('.filter-options-inbound').removeClass("hide");
           } else if ($("input[name='trip']:checked").val() == 'OneWay') {
                //$('#flight-arrival-date').parent().css("display","none");
                $('#flight-arrival-date').parent().addClass("hide");
                $('#checkout-return').find('span').addClass("hidden");
                $('#date-flight-inbound').addClass("hide");
                $('.filter-options-inbound').addClass("hide");
          } else{
                $("output").text("c changed");
          }

        });
    },
    checkoutModal: function(){
        // ## Abrindo Modal
        var mainBuscaFacil = this;
        $('#checkout-go').on('click', function ( event ){ 
            event.preventDefault();            
            $('#count > li:nth-child(1) > span:nth-child(1)').addClass("active-step");
            $('#count > li:nth-child(1)').attr("step","next-step1");
            $("#checkout-steps-holder > div:nth-child(1)").addClass("ativo");
            $('#md-block').show();
            $('#md-block, #content-modal').addClass('md-show');
            $('#md-overlay').addClass('visible');
            $('body').addClass('overflow');

            // Reseta o processo de checkout sem apagar os dados (pois sao todos dinamicos)
            $('#checkout-steps-holder > div.step-box').hide();  
            $('#checkout-steps-holder > div.step-box:first').show();
            // Reseta mensagens de finalizacao da OP
            $('#checkout-steps-holder > div.step-box div#success').addClass('hide');
            $('#checkout-steps-holder > div.step-box div#error').addClass('hide');
            $('#checkout-steps-holder > div.step-box div#processing').removeClass('hide');
            $('#step2 > p').html($('#heade-summary > h2').html());            

            mainBuscaFacil.changeradioParcelas();
        });
        // ## Abrindo Modal Pagamentos
        $('#bt-opt-pay').on('click', function ( event ){ 
            event.preventDefault();
            $('#md-block-pagamento, #content-modal-pagamento').addClass('md-show');
            $('#md-overlay-pagamento').addClass('visible');
            $('body').addClass('overflow');
        });

        // ## Fechando Modal
        $('.md-close, .bt-cancel').on('click', function ( event ){
            event.preventDefault();
            $("#count li span").removeClass("active-step");
            $('#md-block').hide();
            $('#md-block, #content-modal, #md-block-pagamento, #content-modal-pagamento').removeClass('md-show');
            $('#md-overlay, #md-overlay-pagamento').removeClass('visible');
            $('body').removeClass('overflow');       

            $(".content-card-show, #step3-dados-cartao").find("input[type='text']").val(""); 
            $(".content-card-show, #step3-dados-cartao").find("input[type='radio']").prop("checked",false);   
            $("#select-form-parcela03").prop("checked",true);   
            $("#select-radio-payment-billet").prop("checked",true);  
            $('.content-value-card').fadeOut(300);               
            $("#parcelas").val('0');          

            $("#estados").val('UF').change();
            mainBuscaFacil.changeradioParcelas();
        });
    },
    Search: function(){
        //bt-search
        //////////////////////////////////////////////
        // Initiate searchflight templating engine
        var searchFlightTemplate = '';
        var mainBuscaFacil = this;

        $('#bt-search').on('click', function (event) {
            event.preventDefault();

            if(!$("#main-search").valid()){
                console.log("!$(\"#main-search\").valid()");
                return false;
              }

            var dataMainSearch = $('form#main-search').serializeArray();

            $('body').addClass('modal-active');            
            mainBuscaFacil.frasesLoading();

            $.ajax({
                type: 'POST',
                data: $('form#main-search').serializeArray(),
                url: 'ajax/search_flight.ajx.php',
                dataType: 'json'
            }).done(function (response){
                if(response.status == 200){
                    if(searchFlightTemplate == '') // get template on-the-fly only on the first resquest
                        $.get('static/js/tpl/searchFlight.handlebars',function(data){ 
                            searchFlightTemplate = data;
                            mainBuscaFacil.searchCallback(searchFlightTemplate,response);
                            mainBuscaFacil.sevenDaysSearch();
                        },'html');
                    else
                        mainBuscaFacil.searchCallback(searchFlightTemplate,response);
                }else{
                    if(response.status == 502) // Usuario nao esta autenticado
                        document.location.reload(true);
                    else
                        alert(response.error);
                }
            });
        });

        /////////////////////////////////////////////////////
        $("#checkbox-direct-flight").on('click',function(event){         
            if(mainBuscaFacil.inBoundList != null &&  $(this).is(':checked')){ 

                mainBuscaFacil.outBoundList.filter(function(item) { 
                    return (item.values().legs == 0); 
                }); 

                mainBuscaFacil.inBoundList.filter(function(item) { 
                    return (item.values().legs == 0); 
                }); 

                return true; 
            } else if (mainBuscaFacil.inBoundList != null) { 
                mainBuscaFacil.outBoundList.filter(); 
                mainBuscaFacil.inBoundList.filter(); 
                return true; 
            } 
        });

    },
    searchCallback: function(template,data){
        var mainBuscaFacil = this;

        /*  Render JSON from server with handlebars
        ========================================================================== */
        var template = Handlebars.compile(template);
        var html = template(data.searchData);

        $("#list-flights").html(html).show(500, function(){
            $('body').removeClass('modal-active');
            mainBuscaFacil.frasesLoading("clearInterval");

            mainBuscaFacil.checkoutModal();
            mainBuscaFacil.labelCf();
            mainBuscaFacil.resultFix();
            mainBuscaFacil.filtroFix();
            mainBuscaFacil.menuSort();
            mainBuscaFacil.clickManuSort();
            mainBuscaFacil.triggerResult();
            
            // Salvando alguns dados sobre limite 
            mainBuscaFacil.ccdLimits = data.searchData.CCD_LIMITS;
            mainBuscaFacil.monthlySpend = data.searchData.MONTHLY_SPEND;

            // Criando e salvando filtros
            var options = {
                valueNames: [
                    'flight-cia',
                    'legs',
                    'origin',
                    'destination',
                    'duration',
                    'flyer-points',
                    'cia-price',
                    'price-milhasfacil',
                    'earn-money',
                    'has-promo',
                    'departure-time',
                    'arrival-time'
                ],
                listClass: 'listOutbound'
            };

            mainBuscaFacil.outBoundList = new List('list-outbound', options);
            
            options.listClass = 'listInbound';
            mainBuscaFacil.inBoundList = new List('list-inbound', options);

            var $checkboxDirectFlight = $("#checkbox-direct-flight");

            if(mainBuscaFacil.inBoundList != null &&  $checkboxDirectFlight.is(':checked')){
                mainBuscaFacil.outBoundList.filter(function(item) { 
                    return (item.values().legs == 0);
                }); 

                mainBuscaFacil.inBoundList.filter(function(item) { 
                    return (item.values().legs == 0);
                });                   
                return true;
            }

            // Remove a class done da listagem de passageiros para forçar o sistem
            // a refazer a listagem
            $('#dados-passageiros').removeClass('done');

            // Limpando todos os voos previamente selecionados que estavam no step2
            $('#step2-card-chd-outbound').addClass('hide').find('.cloned-element').html('');
            $('#step2-card-adl-outbound').addClass('hide').find('.cloned-element').html('');
            $('#step2-card-chd-inbound').addClass('hide').find('.cloned-element').html('');
            $('#step2-card-adl-inbound').addClass('hide').find('.cloned-element').html('');
        });
    },
    validSearch: function(aValue,idForm){
      var $form = $("#"+idForm);
      return $form.valid();
    },    
    toggleRadio:function (){
      $("#radio-direct-flight").click(function(){ 
         if( $('#radio-direct-flight').prop( "checked")) { 
            $('#radio-direct-flight').prop( "checked", true ); 
         } 

         if( !$('#radio-direct-flight').prop( "checked")){ 
            $('#radio-direct-flight').prop( "checked", false ); 
         } 
      }); 
    },
    labelCf:function(){
        ///////// Sombra no Card e Pegar dados do Voo//////////            
        var mainBuscaFacil = this;

        var result = true;
        if($('#passengers-adl-template > div:nth-child(1)').length > 0){
            mainBuscaFacil.templatePassengerAdl = $('#passengers-adl-template > div:nth-child(1)');
            mainBuscaFacil.templatePassengerChd = $('#passengers-chd-template > div:nth-child(1)');
        }

        $(".cf").on('click', function(event){
            event.preventDefault(); // evita dupla chamada do label e do input

            var parent = $(this).parent(); 

            var self = this; // Nunca esqueca de quem vc realmente eh!

            var paymentObj = parent.data('calculated-fares');
            var card = (parent.hasClass('card-going')) ? '#checkout-departure' : '#checkout-return'; // Descobre se clicou na ida ou na volta
            var active = false; // True se o usuario marcou o card, false se ele desmarcou
            var hasChd = paymentObj.PAX.QTD_PAX_CHD > 0;
            var ccdPaymentObj = {
                installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
                totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
            };
            
            var listOutbound = $('#list-outbound');
            var listInbound = $('#list-inbound');

            ///////////////////////////////////////////////////
            // CALLBACK PARA QUANDO UM VOO EH SELECIONADO

            var selectFlightCallback = function() {
                // No caso do voo nao ter valor, nao deve permitir o usuario iniciar emissao
                if(paymentObj.INV.PRICE_SUM > 0){

                    var promo = (parent.hasClass('card-promo')) ? 'card-promo' : '';
                    var cardExpensive = (parent.hasClass('card-expensive')) ? 'card-expensive' : '';
                    var cardExpensivechd = (parent.hasClass('card-expensive-chd')) ? 'card-expensive-chd' : '';
                    var cardExpensiveadl = (parent.hasClass('card-expensive-adl')) ? 'card-expensive-adl' : '';
                    var cardPromochd = (parent.hasClass('card-promo-chd')) ? 'card-promo-chd' : '';
                    var cardPromoadl = (parent.hasClass('card-promo-adl')) ? 'card-promo-adl' : '';
                    var allClass = '',allClassAdl = '', allClasshd = '';
                    
                    if(hasChd){
                      allClassChd = promo + ' ' + cardExpensive + ' ' + cardExpensivechd  + ' ' + cardPromochd;
                    }else{
                      allClassAdl = promo + ' ' + cardExpensive + ' ' + cardExpensiveadl + ' ' + cardPromoadl;
                    }

                    allClass = promo + ' ' + cardExpensive + ' ' + cardExpensiveadl + ' ' + cardPromoadl + ' ' + cardExpensivechd  + ' ' + cardPromochd;


                    // Preenchendo os cards do topo
                    var cia = ($(this).parent().find('.flight-cia').text()).toLowerCase();
                    var flightNumber = $(this).find('.card-flight-number').text();
                    var milhasSum = paymentObj.MILES.MILES_ADL + paymentObj.MILES.MILES_CHD;
                    var priceSum = paymentObj.INV.PRICE_SUM;
                    var earnMoney = (paymentObj.EARN_MONEY_ADL * paymentObj.PAX.QTD_PAX_ADL) + (paymentObj.EARN_MONEY_CHD * paymentObj.PAX.QTD_PAX_CHD);

                    $(card+' > div:nth-child(2) > div').attr('class','cia-'+cia + ' ' +promo + ' ' + cardExpensive + ' ' + cardExpensiveadl + ' ' + cardPromoadl);//qual a cia aerea
                    $(card+' .checkout-flight-num-resumo').html(flightNumber);//numero do voo
                    $(card+' .milhas').html(milhasSum.format(0, '', '.'));//numero de milhas
                    $(card+' .price-milhasfacil').html('R$ ' + priceSum.format(2, ',', '.'));//preco milhas facil
                    $(card+' .earn-money').html('R$ '+earnMoney.format(2, ',', '.'));//economize

                    for(i=0;i<12;i++){ // Soma os valores de chd + adl + taxa de embarque vezes num de pax chd / num de pax adl
                        ccdPaymentObj.installments[i] += ((paymentObj.CCD.INSTALLMENTS_ADL[i].parcel) * paymentObj.PAX.QTD_PAX_ADL);
                        ccdPaymentObj.totals[i] += ((paymentObj.CCD.INSTALLMENTS_ADL[i].total) * paymentObj.PAX.QTD_PAX_ADL);

                        if(hasChd){  // se tiver crianca, soma as chd tbm
                            ccdPaymentObj.installments[i] += ((paymentObj.CCD.INSTALLMENTS_CHD[i].parcel) * paymentObj.PAX.QTD_PAX_CHD);
                            ccdPaymentObj.totals[i] += ((paymentObj.CCD.INSTALLMENTS_CHD[i].total) * paymentObj.PAX.QTD_PAX_CHD);
                        }
                    }

                    
                    if(card == '#checkout-departure'){
                        listOutbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
                        listOutbound.data('ccd-oncash',(paymentObj.CCD.ONCASH > 0) ? paymentObj.CCD.ONCASH : 0); // salvando dados da entrada
                        listOutbound.data('inv',priceSum); // salvando dados de boleto

                        //$('.card-going .div-card-details').hide(200); // fecha todas as outras div de detalhe que estejam abertas                                 
                        listOutbound.find(".td1").css('background-color','#f8f8f7');
                        $(this).find(".td1").css('background-color','#fff');

                        // PASSO 2 - Preenchendo checkout passo 2 - cards do topo
                        var step2CardChdOutbound = $('#step2-card-chd-outbound').addClass('hide');
                        var step2CardAdlOutbound = $('#step2-card-adl-outbound').addClass('hide');

                        var mainStep2Card = (hasChd) ? step2CardChdOutbound : step2CardAdlOutbound; 
                        var mainStep2Card_clonedElement = mainStep2Card.find('.cloned-element');

                        mainStep2Card_clonedElement.html(''); // limpando dados para colocar novos
                        mainStep2Card.find('#date').text($('#date-flight-outbound > div.flag-voo > p:nth-child(2)').text());
                        mainStep2Card.attr("class",'cia-'+cia + ' ' + allClass);
                       
                        
                    }else{
                        listInbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
                        listInbound.data('ccd-oncash',(paymentObj.CCD.ONCASH > 0) ? paymentObj.CCD.ONCASH : 0); // salvando dados da entrada
                        listInbound.data('inv',priceSum); // salvando dados de boleto

                        //$('.card-going-back .div-card-details').hide(200); // fecha todas as outras div de detalhe que estejam abertas                                 
                        listInbound.find(".td1").css('background-color','#f8f8f7');
                        $(this).find(".td1").css('background-color','#fff');

                        // PASSO 2 - Preenchendo checkout passo 2 - cards do topo
                        var step2CardChdInbound = $('#step2-card-chd-inbound').addClass('hide');
                        var step2CardAdlInbound = $('#step2-card-adl-inbound').addClass('hide');

                        var mainStep2Card = (hasChd) ? step2CardChdInbound : step2CardAdlInbound; 
                        var mainStep2Card_clonedElement = mainStep2Card.find('.cloned-element');

                        mainStep2Card_clonedElement.html(''); // limpando dados para colocar novos
                        mainStep2Card.find('#date').text($('#date-flight-inbound > div.flag-voo > p:nth-child(2)').text());
                        
                        mainStep2Card.attr("class",'cia-'+cia + ' ' + allClass);
                       // mainStep2Card_clonedElement.attr("class", "card-result-header" + ' ' + promo + ' ' + cardExpensive);
                    }

                    ///////////////////////////////////////////////////
                    // PASSO 2 - Preenchendo checkout passo 2 - cards do topo
                    $(this).find('.td2').clone().appendTo(mainStep2Card_clonedElement);
                    $(this).find('.td3').clone().appendTo(mainStep2Card_clonedElement);

                    mainStep2Card.find('#miles').text(milhasSum.format(0, '', '.'));
                    mainStep2Card.find('#boarding-tax').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
                    mainStep2Card.find('#price').text(priceSum.format(2, ',', '.'));
                    mainStep2Card.find('#earn').text(earnMoney.format(2, ',', '.'));

                    if(paymentObj.PAX.QTD_PAX_CHD > 0){

                      mainStep2Card.find('#miles-chd').text(paymentObj.MILES.MILES_CHD.format(0, '', '.'));
                      mainStep2Card.find('#boarding-tax-chd').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
                      mainStep2Card.find('#price-chd').text(paymentObj.INV.PRICE_CHD.format(2, ',', '.'));
                      mainStep2Card.find('#earn-chd').text(paymentObj.EARN_MONEY_CHD.format(2, ',', '.'));

                      mainStep2Card.find('#miles').text(paymentObj.MILES.MILES_ADL.format(0, '', '.'));
                      mainStep2Card.find('#boarding-tax').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
                      mainStep2Card.find('#price').text(paymentObj.INV.PRICE_ADL.format(2, ',', '.'));
                      mainStep2Card.find('#earn').text(paymentObj.EARN_MONEY_ADL.format(2, ',', '.'));

                    } else {
                      mainStep2Card.find('#miles').text(milhasSum.format(0, '', '.'));
                      mainStep2Card.find('#boarding-tax').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
                      mainStep2Card.find('#price').text(priceSum.format(2, ',', '.'));
                      mainStep2Card.find('#earn').text(earnMoney.format(2, ',', '.'));
                    }
                    
                    mainStep2Card.children().removeClass('card-tam card-gol card-azul').addClass('card-'+cia).removeClass('hidden');

                    // remove div cinza do card do topo
                    $(card+' > div:nth-child(2)').addClass("md-show"); 
                    $(card).children().first().hide(500); 

                }else{
                    $(card).children().first().show(500); // poe div cinza por cima do card do topo

                    if(card == '#checkout-departure'){
                        listOutbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
                        listOutbound.data('ccd-oncash', 0); // apagando dados da entrada
                        listOutbound.data('inv',0); // salvando dados de boleto       
                        $(this).find(".td1").css('background-color','#f8f8f7'); // alterando background do "selecionar"

                        // PASSO 2
                        // Removendo item des-selecionados do checkout passo 2 - Passageiros
                        $('#step2-card-chd-outbound').children().addClass('hidden');
                        $('#step2-card-adl-outbound').children().addClass('hidden');
                    }else{
                        listInbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
                        listInbound.data('ccd-oncash', 0); // apagando dados da entrada
                        listInbound.data('inv',0); // salvando dados de boleto
                        $(this).find(".td1").css('background-color','#f8f8f7');// alterando background do "selecionar"

                        // PASSO 2
                        // Removendo item des-selecionados do checkout passo 2 - Passageiros
                        $('#step2-card-chd-inbound').children().addClass('hidden');
                        $('#step2-card-adl-inbound').children().addClass('hidden');
                    }
                }

                return clickFlightCallback.call(this);
            }

            ///////////////////////////////////////////////////
            // CALLBACK PARA QUANDO UM VOO EH DES-SELECIONADO

            var deselectFlightCallback = function() {
                if(card == '#checkout-departure'){
                    listOutbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
                    listOutbound.data('ccd-oncash', 0); // apagando dados da entrada
                    listOutbound.data('inv',0); // salvando dados de boleto       
                    $(this).find(".td1").css('background-color','#f8f8f7'); // alterando background do "selecionar"

                    // PASSO 2
                    // Removendo item des-selecionados do checkout passo 2 - Passageiros
                    $('#step2-card-chd-outbound').children().addClass('hidden');
                    $('#step2-card-adl-outbound').children().addClass('hidden');
                }else{
                    listInbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
                    listInbound.data('ccd-oncash', 0); // apagando dados da entrada
                    listInbound.data('inv',0); // salvando dados de boleto
                    $(this).find(".td1").css('background-color','#f8f8f7');// alterando background do "selecionar"

                    // PASSO 2
                    // Removendo item des-selecionados do checkout passo 2 - Passageiros
                    $('#step2-card-chd-inbound').children().addClass('hidden');
                    $('#step2-card-adl-inbound').children().addClass('hidden');
                }


                $(card+' > div:nth-child(2)').removeClass("md-show"); 
                $(card).children().first().show(500); // poe div cinza por cima do card do topo

                return clickFlightCallback.call(this);
            }

            ///////////////////////////////////////////////////
            // CALLBACK CHAMADO EM TODOS OS CLIQUES

            var clickFlightCallback = function() {
               //////////////////////////////////////////////////////////
                // Atualiza valores de cartao na box da home
                // Soma os valores de parcela do cartao e mostra no box
                var ccdPaymentObjOutbound = (listOutbound.data('ccd') == 0) ? {
                    installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
                    totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
                } : listOutbound.data('ccd');
                if(listInbound.length > 0){
                    var ccdPaymentObjInbound  = (listInbound.data('ccd') == 0) ? {
                        installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
                        totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
                    } : listInbound.data('ccd');
                }else{
                    var ccdPaymentObjInbound = {
                        installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
                        totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
                    };
                }

                // Gera corretamente os valores de entrada a vista e invoice
                var onCash = listOutbound.data('ccd-oncash');
                var invPaymentOutbound = listOutbound.data('inv');
                var invPaymentInbound = 0;
                if(listInbound.length > 0){
                    invPaymentInbound = listInbound.data('inv');
                    onCash += listInbound.data('ccd-oncash');
                }

                // Atualiza valores de cartao da box da home
                $('#pag-cartao li').each(function (index){
                    $(this).text(index+1 + 'x: R$ ' + (ccdPaymentObjOutbound.installments[index] + ccdPaymentObjInbound.installments[index]).format(2, ',', '.'))
                });
                $('#pag-cartao > p:nth-child(2) > span').text('R$ ' + onCash.format(2, ',', '.'));

                // Atualiza valores de invoice da box da home
                $('#pag-boleto > p:nth-child(3)').text('R$ ' + (invPaymentOutbound + invPaymentInbound).format(2, ',', '.'))

                // Verifica se tem algum voo marcado para liberar o nao o botao
                if(
                    (($('#search-results input:checked')).length == 1 && (invPaymentOutbound > 0 || invPaymentInbound > 0)) ||
                    (($('#search-results input:checked')).length == 2 && (invPaymentOutbound > 0 && invPaymentInbound > 0)) 
                )
                    $('#checkout-go').removeClass('disabled').removeAttr('disabled');
                else
                    $('#checkout-go').addClass('disabled').attr('disabled',true);

                /////////////////////////////////////////////////////////////////
                // PASSO 2 - Criando campos para os passageiros se ainda não tiver criado
                if(!$('#dados-passageiros').hasClass('done') && (invPaymentOutbound > 0 || invPaymentInbound > 0)){

                    $('#passengers-block').html('');
                    $('#passengers-chd-block').html('');

                    for(i=0;i < paymentObj.PAX.QTD_PAX_ADL;i++) // passageiros ADL
                        mainBuscaFacil.templatePassengerAdl.clone().removeClass('hide').html(
                            (mainBuscaFacil.templatePassengerAdl.html()).replace(/{{@index}}/g, i)
                        ).appendTo('#passengers-block');

                    for(i=0;i < paymentObj.PAX.QTD_PAX_CHD;i++) // passageiros CHD
                        mainBuscaFacil.templatePassengerChd.clone().removeClass('hide').html(
                            (mainBuscaFacil.templatePassengerChd.html()).replace(/{{@index}}/g, i)
                        ).appendTo('#passengers-chd-block');

                    $('#passengers-adl-template').remove();
                    $('#passengers-chd-template').remove();
                    // Marcando passageiros como preenchidos
                    $('#dados-passageiros').addClass('done');
                }

                ///////////////////////////////////////////////
                // PASSO 3 - Preenchendo valores de inv e card 
                $('#payment-billet-option > div.content-payment span:nth-child(2)').text( // dado do valor a vista
                    (invPaymentOutbound + invPaymentInbound).format(2, ',', '.')
                );

                $('#differential-price > p:nth-child(2) > span:nth-child(2)').text( // dado do valor card
                    (ccdPaymentObjOutbound.installments[11] + ccdPaymentObjInbound.installments[11]).format(2, ',', '.')
                );

                if(onCash > 0){ // valor da entrada no ccd
                    $('#container-entrada > div > p').removeClass('hide').find('span:nth-child(2)').text(onCash.format(2, ',', '.'));
                }else{
                    $('#container-entrada > div > p').addClass('hide');
                }
                
                // PASSO 3 - Preenchendo todos os dados de parcelas do cartao
                // Alterando parcelas expostas
                $('div.content-value-card label.select-form-parcela01 span.value').text(
                    (ccdPaymentObjOutbound.installments[2] + ccdPaymentObjInbound.installments[2]).format(2, ',', '.')
                );
                $('div.content-value-card label.select-form-parcela02 span.value').text(
                    (ccdPaymentObjOutbound.installments[5] + ccdPaymentObjInbound.installments[5]).format(2, ',', '.')
                );
                $('div.content-value-card label.select-form-parcela03 span.value').text(
                    (ccdPaymentObjOutbound.installments[11] + ccdPaymentObjInbound.installments[11]).format(2, ',', '.')
                );

                $('#parcelas option').each(function (index){
                    if(index>0) // pular a primeira opcao
                        $(this).text(index + 'x de R$ ' + (ccdPaymentObjOutbound.installments[index-1] + ccdPaymentObjInbound.installments[index-1]).format(2, ',', '.'))
                });

                mainBuscaFacil.editDadosCheckout();
                mainBuscaFacil.validate();
                mainBuscaFacil.mask();

                // Validando se pode exibir opcoes ccd
                var mustRemove = false;
                var transactionSpend = ccdPaymentObjOutbound.totals[11] + ccdPaymentObjInbound.totals[11]
                var totalSpend = mainBuscaFacil.monthlySpend + transactionSpend;
                mustRemove = (
                    (totalSpend > mainBuscaFacil.ccdLimits.CCD_LIMIT_PERMISSION) ||
                    (transactionSpend > mainBuscaFacil.ccdLimits.CCD_LIMIT_TRANSACTION) ||
                    (
                        mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'A' &&
                        mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'B' &&
                        mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'C' &&
                        mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'D'
                    )
                );

                console.log(mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP);

                if(mustRemove){ //503px
                    $('#pag-cartao').addClass('hide').prev().css('width','503px');// remove link com visualizacao das opcoes de pagamento
                    $('#payment-card-option').addClass('hide').prev().addClass('hide'); // Remove box com opcoes de ccd
                }else{
                    $('#pag-cartao').removeClass('hide').prev().css('width','171px'); // add link com visualizacao das opcoes de pagamento
                    $('#payment-card-option').removeClass('hide').prev().removeClass('hide'); // add box com opcoes de ccd
                } 
            }


            //////////////////////////////////
            // MAIN CODE

            // Verifica o que rolou
            if(this.getElementsByTagName('input')[0].checked){ // ele desclicou
                this.getElementsByTagName('input')[0].checked = false; // remove check do radio

                //////////////////////
                // Fecha detalhes/////
                $(this).next().slideUp(300, function(){
                    this.classList.remove('show');

                    // Chama callback para spread de processamento
                    return deselectFlightCallback.call(self);
                }); // esconde div com detalhes
                
            }else{ // ele clicou
                this.getElementsByTagName('input')[0].checked = true; // adiciona check no radio
                active = true; // Usuario marcou o card

                mainBuscaFacil.editDadosCheckout();
                mainBuscaFacil.saveDadosCheckout();


                // fecha todas as outras div de detalhe que estejam abertas
                if(card == '#checkout-departure')
                    listOutbound.find('.div-card-details.show').slideUp(300, function(){
                        this.classList.remove('show');
                    });
                else
                    listInbound.find('.div-card-details.show').slideUp(300, function(){
                        this.classList.remove('show');
                    });

                /////////////////////////////////////////////
                // Abre detalhes/////////////////////////////
                $(this).next().slideDown(300, function(){
                    this.classList.add('show'); // Adiciona class para sistema saber quem esta aberto

                    // Chama callback para spread de processamento
                    return selectFlightCallback.call(self);
                }); // mostra div com detalhes
            }

        });
    },
    checkout: function(){
        var mainBuscaFacil = this;
        var doCheckout = function (event){
            outBoundID = $('#list-outbound input:checked').val();
            inBoundID = $('#list-inbound input:checked').val();
            
            $.ajax({
                type: 'POST',
                data: $("form#msform").serialize() + '&' + $.param({outBoundFlightID: outBoundID,inBoundFlightID: inBoundID}),
                url: 'ajax/checkout.ajx.php?action=step1',
                dataType: 'json'
            }).done(function (response){
                $.get('static/js/tpl/checkout.handlebars',function(template){ 
                    // Render JSON from server with handlebars            
                    var template = Handlebars.compile(template);
                    var html    = template(response);
                    $("#step4").html(html);
                      mainBuscaFacil.editDadosCheckout();
                      mainBuscaFacil.saveDadosCheckout();
                      mainBuscaFacil.validate();
                      mainBuscaFacil.mask();
                },'html');
            });

            return true
        }

        // Se escolheu boleto, mandar para checkout direto
        $(document).on('click', '#next-step-3-1', function (event){
            if($('input[name=select-form-pagamento]:checked').val() == 'boleto')
                return doCheckout(event);
        });
        
        // Preencheu todos os dados de cartao, entao iniciar checkout
        $(document).on('click', '#next-step4', doCheckout);
    },
    createOrder: function(){
        $(document).on('click', '#next-final', function(){

            var $parent =  $(".salve-dados").parents(".field-passanger");//.field-passanger
              if(!$parent.find("input").valid()){
                    //$parent.find("input").attr("readonly","readonly");
                    return true;
                }else{
                    $parent.find("input").attr("readonly","readonly");

                }

            outBoundID = $('#list-outbound input:checked').val();
            inBoundID = $('#list-inbound input:checked').val();

            $.ajax({
                type: 'POST',
                data: $("form#msform").serialize() + '&' + $.param({outBoundFlightID: outBoundID,inBoundFlightID: inBoundID}),
                url: 'ajax/createOrder.ajx.php?action=step5',
                dataType: 'json'
            }).done(function (response){
                if(response.status==200){
                    $("#step5 > div#processing").addClass('hide');
                    $("#step5 > div#success").removeClass('hide');
                }else{
                    $("#step5 > div#processing").addClass('hide');
                    $("#step5 > div#error").removeClass('hide').find('#msg').text(response.error);
                }
            });
        });

        $(document).on('click', '#nova-pesquisa', function(){
          document.location.reload(true);
         });
    },
    resultFix: function(){
      $(document).scrollTop(0);
      var $checkoutHeader = $('#search-results'),
          $escolha = $('#summary-purchase');
          if($escolha.length > 0)
              headerOffset = $escolha.offset().top;

      $(window).scroll(function (event){
          if($escolha.length > 0 && $(document).scrollTop() >= headerOffset && !$checkoutHeader.hasClass('checkout-active')) {
              $escolha.addClass('fix-resumo');
              return true;
          }

          $escolha.removeClass('fix-resumo');
      });
    },
    filtroFix: function(){   

        var $summaryPurchase = $('#summary-purchase');
        var $filterOptions = $(".filter-options-outbound"); 
        var $filterOptionsIn = $(".filter-options-inbound");
        
        var filterOptionsTop = $filterOptions.offset().top; 
        var summaryPurchaseHeight = $summaryPurchase.height() + parseInt($summaryPurchase.css('padding-top').replace('px','')) + 2;

        var listInbound = $('#list-inbound');
        var listInboundTop = (listInbound.length > 0) ? listInbound.offset().top : 0;

        $(window).scroll(function (eventData){ 
            summaryPurchaseHeight = $summaryPurchase.height() + parseInt($summaryPurchase.css('padding-top').replace('px','')) + 2;
            var ultimoFilho = $('#list-outbound > div > div:last-child');
            var newTop = $(document).scrollTop() + summaryPurchaseHeight; 
            var ultimoFilhoHeight =  ultimoFilho.height() + ultimoFilho.offset().top;

            if(newTop >= filterOptionsTop && newTop <= (ultimoFilhoHeight - 3)){ 
                $filterOptions.addClass('fix-filter').fadeIn("slow"); 
                return true; 
            } else {  
                $filterOptions.removeClass('fix-filter');             
            }

            if(listInboundTop > 0){
              listInboundTop = listInbound.offset().top;
                if(newTop >= listInboundTop) { 
                    $filterOptionsIn.addClass('fix-filter');
                    return true;
                } else{
                    $filterOptionsIn.removeClass('fix-filter'); 
                }
            }
            return true; 
        });
    },
    menuSort: function(){
      var mainBuscaFacil = this;
      $(document).on('click', function (event) {
        var $allMenuFilter = $(".menu-filter");

        if(mainBuscaFacil.clickFilter == true){
          $allMenuFilter.attr("active","false");
          $allMenuFilter.css("display","none");
        }
      });
      $('.click-filter').on('click', function (event) { 
        event.stopPropagation();

        var $allMenuFilter = $(".menu-filter");
        $allMenuFilter.attr("active","false");
        $allMenuFilter.css("display","none");
        var $parent = $(this).parent();
        var $menuFilter = $parent.find(".menu-filter");
        var vAttrActive = $menuFilter.attr("active");  
        if(vAttrActive == "false"){ 
          $menuFilter.css("display","block");
          $menuFilter.attr("active","true");                
          mainBuscaFacil.clickFilter=true;
        }else{ 
          $menuFilter.css("display","none");
          $menuFilter.removeAttr("active");          
          mainBuscaFacil.clickFilter=false;
        } 
      });
    },
    clickManuSort: function(){
        var mainBuscaFacil = this;

        $('.menu-filter li a').on('click', function (event) {

            // Define se deve filtrar a ida ou a volta, retorna (filter-options-outbound || filter-options-inbound)
            var sortTrip = ($(this).parents('div')[1]).className;
            var sortOptions = $(this).data(); // Retorna as config da ordenacao (Object {sort: "cia-price", sortOrder: "asc"} )

            var doSort = function (sortTrip,sortOptions){ // faz uma ordenacao com os dados especificados

                if(sortTrip == 'filter-options-inbound'){
                    mainBuscaFacil.inBoundList.sort(sortOptions.sort, { order: sortOptions.sortOrder });
                    $('#checkout-return > div.cia-not-defined  > span').trigger('click');
                }else{
                    mainBuscaFacil.outBoundList.sort(sortOptions.sort, { order: sortOptions.sortOrder });
                    $('#checkout-departure > div.cia-not-defined  > span').trigger('click');
                }

                mainBuscaFacil.filtroFix();
                $(".menu-filter").css("display","none");
                return true;
            };

            var doFilter = function (sortTrip,sortOptions){ // faz um filtro com os dados especificados
                mainBuscaFacil.filtroFix();
                $(".menu-filter").css("display","none");

                if(sortTrip == 'filter-options-inbound'){
                    $('#checkout-return > div.cia-not-defined > span').trigger('click');

                    if(sortOptions.sortOrder == "all"){ // remover o filtro / mostrar todas as opcoes
                        return mainBuscaFacil.inBoundList.filter(); 
                    } 
                    
                    mainBuscaFacil.inBoundList.filter(function(item) { // filtrar um item por um valor
                        return (item.values()[sortOptions.sort] == sortOptions.sortOrder);
                    }); 
                }else{
                    $('#checkout-departure > div.cia-not-defined > span').trigger('click');

                    if(sortOptions.sortOrder == "all"){ // remover o filtro / mostrar todas as opcoes
                        return mainBuscaFacil.outBoundList.filter(); 
                    }   
                    
                    mainBuscaFacil.outBoundList.filter(function(item) { // filtrar um item por um valor
                        return (item.values()[sortOptions.sort] == sortOptions.sortOrder);
                    }); 
                }
            };

            // Verifica se eh filtro ou ordenacao e o executa
            if(sortOptions.sortMethod == undefined || sortOptions.sortMethod == 'sort')
                return doSort(sortTrip,sortOptions);
            else if(sortOptions.sortMethod == 'filter')
                return doFilter(sortTrip,sortOptions);
        });// return true;
    },
    steps: function(){

       /////////// Steps do checkout///////////
      var mainBuscaFacil = this;

      /////////// Bt Avançar entre os steps ///////////
      $(document).on('click', '.bt-next', function(){

        if(!mainBuscaFacil.checkoutForm.valid())
        return false;
          
        var current_fs, next_fs, previous_fs;

        current_fs = $(this).parent();
        next_fs = $(this).parent().next();

        if(this.id=='next-step-3-1' && $('#select-radio-payment-billet').is(':checked')){
          $("#count li span").eq($(".step-box").index(next_fs)).children().addClass("active-step");
          next_fs = $(this).parent().next().next();
        }
        
          $("#count li").eq($(".step-box").index(current_fs)).children().addClass("active-step");
          $("#count li").eq($(".step-box").index(next_fs)).children().first().addClass("active-step");

        current_fs.removeClass("ativo").css("display", "none"); //remove class ativo do step atual
        next_fs.fadeIn().addClass("ativo"); // adiciona class ativo no próximo passo

        mainBuscaFacil.mask();
       });

      /////////// Bt Voltar entre os steps ///////////
      $(document).on('click', '.bt-prev', function(){

        current_fs = $(this).parent();        
        previous_fs = $(this).parent().prev();
        
        if(this.id=='previous-step3' && $('#select-radio-payment-billet').is(':checked')){          
          $("#count li").eq($(".step-box").index(previous_fs)).children().first().removeClass("active-step");
          previous_fs = $(this).parent().prev().prev();
        }

          $("#count li").eq($(".step-box").index(current_fs)).children().removeClass("active-step");
          $("#count li").eq($(".step-box").index(previous_fs)).children().last().removeClass("active-step");

        previous_fs.fadeIn().addClass("ativo"); //adiciona class ativo do step anterior
        current_fs.removeClass("ativo").css("display", "none"); //remove class ativo do step atual
        mainBuscaFacil.mask();
      });
    },

    mask: function() {
      //////// Formatação de campos /////////
        $.mask.definitions['~']='[0-9-]';
        $(".nascimento").mask("99/99/9999");
        $("#cep1").mask("99999");
        $("#cep2").mask("999");
        $(".cep1").mask("99999");
        $(".cep2").mask("999");
        $(".ddd").mask("?99");
        $("#cc").mask("9999 9999 9999 ?9999");
        $(".telefone").mask("9999-9999");
        $('#dados-celular').mask("9999-9999?9");
        $(".cpf").mask("~~~.~~~.~~~-~~");
        $(".numbersLogrado").mask("999999");
        $(".datevalid").mask("99/9999");
        $('.celular').focusout(function(){
          var phone, element;
          element = $(this);
          element.unmask();
          phone = element.val().replace(/\D/g, '');
              if(phone.length < 10 && element.attr("id") == "dados-celular") {
                  element.mask("99999-999?9");
              } else {
                  element.mask("(99) 9999-9999?9");
              }
          }).trigger('focusout');
        $('.celular-passanger').focusout(function(){
        var phone, element;
            element = $(this);
            element.unmask();
            phone = element.val().replace(/\D/g, '');
            if(phone.length > 10) {
                element.mask("(99) 99999-999?9");
            } else {
                element.mask("(99) 9999-9999?9");
            }
        }).trigger('focusout');
    },
    validate: function() {
      //// Validate ////
      var mainBuscaFacil = this;
      jQuery.validator.messages.required = "Favor preencher este campo.";
      jQuery.validator.messages.email = "Este email está incorreto.";
      mainBuscaFacil.checkoutForm = $("form#msform");

      mainBuscaFacil.checkoutForm.validate({
          focusInvalid: true,
          onkeyup: false,
          errorClass: "has-error",
          errorElement: "em",
          highlight: function(element, errorClass, validClass) {
              $(element).parent().addClass(errorClass).removeClass(validClass);
          },
          unhighlight: function(element, errorClass, validClass) {
              $(element).parent().removeClass(errorClass).addClass(validClass);
          },
            rules: {
                "select-cartoes": {
                    required: true
                }
            }
      });
      jQuery.validator.messages.required = "Favor preencher este campo.";
      jQuery.validator.messages.email = "Este email está incorreto.";
      var searchform = $("form#main-search");
      searchform.validate({
          focusInvalid: true,
          onkeyup: false,
          noValidate: false,
          errorClass: "has-error",
          validClass: "has-success",
          errorElement: "em",
          highlight: function(element, errorClass, validClass) {
              $(element).parent().addClass(errorClass).removeClass(validClass);
          },
          unhighlight: function(element, errorClass, validClass) {
              $(element).parent().removeClass(errorClass).addClass(validClass);
          }
      });
          /// Data validade de cartão ///
          jQuery.validator.addMethod(
            "datevalid",
            function(value, element) {
                var check = false;
                var re = /^\d{1,2}\/\d{4}$/;
                if( re.test(value)){
                    var adata = value.split('/');
                    var mm = parseInt(adata[0],10); // was gg (giorno / day)
                    var yyyy = parseInt(adata[1],10); // was aaaa (anno / year)
                    var  nowMonth = new Date();
                    var xdata = new Date(yyyy,mm-1);
                    if (yyyy >= (new Date().getFullYear()) //maior e igual ao ano atual
                                && (yyyy < (new Date().getFullYear()+20)) ) {// menor que daqui a 20 anos                                  
                        if(yyyy == (new Date().getFullYear()))//se for o ano corrente verificar o mês
                            check = (                                    
                                        (mm-1 >= nowMonth.getMonth())//O mês informado é maior que o mês corrente?
                                    );
                        else
                            check = true;
                    }
                    else
                        check = false;
                };
                return this.optional(element) || check;
            }, 
            "Insira uma data válida"
          );

        ///// Validação da data para nascimento /////
        jQuery.validator.addMethod(
            "datebirthday",
            function(value, element) {
                var check = false;
                var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                if( re.test(value)){
                    var adata = value.split('/');
                    var dd = parseInt(adata[0],10); // was gg (giorno / day)
                    var mm = parseInt(adata[1],10); // was mm (mese / month)
                    var yyyy = parseInt(adata[2],10); // was aaaa (anno / year)
                    var xdata = new Date(yyyy,mm-1,dd);
                    if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
                        check = (yyyy <= (new Date().getFullYear()-12));
                    else
                        check = false;
                } else
                    check = false;
                return this.optional(element) || check;
            }, 
            "Insira uma data válida"
        );
        ///// Validação da data para nascimento /////
        jQuery.validator.addMethod(
            "datebirthday-chd",
            function(value, element) {
                var check = false;
                var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                if( re.test(value)){
                    var adata = value.split('/');
                    var dd = parseInt(adata[0],10); // was gg (giorno / day)
                    var mm = parseInt(adata[1],10); // was mm (mese / month)
                    var yyyy = parseInt(adata[2],10); // was aaaa (anno / year)
                    var xdata = new Date(yyyy,mm-1,dd);
                    if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
                        check = ( ( yyyy <= (new Date().getFullYear()-2) ) && (yyyy >= (new Date().getFullYear()-11)) ) ;
                    else
                        check = false;
                } else
                    check = false;
                return this.optional(element) || check;
            }, 
            "Insira uma data válida"
        );
        ///// Validação da data para nascimento dados cartão de credito /////    
        jQuery.validator.addMethod(
            "datecard",
            function(value, element) {
                var check = false;
                var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
                if( re.test(value)){
                    var adata = value.split('/');
                    var dd = parseInt(adata[0],10); // was gg (giorno / day)
                    var mm = parseInt(adata[1],10); // was mm (mese / month)
                    var yyyy = parseInt(adata[2],10); // was aaaa (anno / year)
                    var xdata = new Date(yyyy,mm-1,dd);
                    if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
                        check = (yyyy <= (new Date().getFullYear()-18));
                    else
                        check = false;
                } else
                    check = false;
                return this.optional(element) || check;
            }, 
            "Insira uma data válida"
        );

      /// Regra apenas números ///
      $(".numbers").keypress(function(event) {
        var tecla = (window.event) ? event.keyCode : event.which;
        if ((tecla > 47 && tecla < 58) || tecla == 9) return true;
        else {
          if (tecla != 8) return false;
          else return true;
        }
      });

    },

    radiocard: function() {
      $(document).on('click', '#select-radio-payment-billet', function (event) {
        if($(this)[0].checked) $('.content-value-card').fadeOut(300);
      });

      $(document).on('click', '#select-radio-payment-card', function (event) {
        $('.content-value-card').fadeIn(500);
        $("#numcartao").focus();

      });
    }, 
    helpers: function (){

        // Formata numeros de acordo com qualquer especificacao
        // c =  casas decimais / d = dividor de decimal (, ou .) / divisor de milhar (, ou .)
        Number.prototype.format = function(c, d, t){
        var n = this, c = isNaN(c = Math.abs(c)) ? 2 : c, 
            d = d == undefined ? "." : d,t = t == undefined ? "," : t,s = n < 0 ? "-" : "", i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
            j = (j = i.length) > 3 ? j % 3 : 0;
           return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
        };

        this.object_keys = function (obj) {
            var r = [];
            for (var k in obj) {
                if (!obj.hasOwnProperty(k)) 
                    continue
                r.push(k)
            }
            return r
        }

        // Helper que valida se pode ser pesquisado um voo na gol. Um voo pode ser
        // pesquisado na gol quando a data de embarque é maior que o Hoje + 1(dia)
        this.validGol = function (dateText){
            var arrDate = dateText.split('/');
            var dateNow = new Date();
            // TimeStamp para D+1
            var dateTomorrow = Date.parse(new Date(
                dateNow.getFullYear(),
                dateNow.getMonth(),
                dateNow.getDate()
            ))+(172800*1000); // D + 2

            // TimeStamp para Data de partida
            var dateDeparture = Date.parse(new Date(
                arrDate[2], // ano 
                arrDate[1]-1, // mes
                arrDate[0] // dia
            ));

            return dateDeparture > dateTomorrow;
        }

        /**
         * Função para substituir caractesres especiais.
         * @param {str} string
         * @return String
         * @reference: <http://snipplr.com/view.php?codeview&id=15532>
         */
        this.replaceSpecialChars = function(str) {
            var specialChars = [
                {value:'a',lets:'áàãâä'},
                {value:'e',lets:'éèêë'},
                {value:'i',lets:'íìîï'},
                {value:'o',lets:'óòõôö'},
                {value:'u',lets:'úùûü'},
                {value:'c',lets:'ç'},
                {value:'A',lets:'ÁÀÃÂÄ'},
                {value:'E',lets:'ÉÈÊË'},
                {value:'I',lets:'ÍÌÎÏ'},
                {value:'O',lets:'ÓÒÕÔÖ'},
                {value:'U',lets:'ÚÙÛÜ'},
                {value:'C',lets:'Ç'},
                {value:'',lets:'?!()[]{}'},
                {value:'',lets:'?'},
                {value:'',lets:'!'},
                {value:'',lets:'('},
                {value:'',lets:')'},
                {value:'',lets:'['},
                {value:'',lets:']'},
                {value:'',lets:'{'},
                {value:'',lets:'}'}
            ];

            var $spaceSymbol = '_';
            var regex;
            var returnString = str;
            var len = specialChars.length;
            for (i = 0; i < len; i++) {
                regex = new RegExp("["+specialChars[i].lets+"]", "g");
                returnString = returnString.replace(regex, specialChars[i].value);
                regex = null;
            }
            return returnString.replace(/\s/g,$spaceSymbol);
        };
        /*###################################################*/
        /*###################################################*/
         

        this.tratarAlias = function (name){
            var alias;
            return alias = this.replaceSpecialChars(name).toLowerCase();
        };
    },
    ontop: function (){
      $(document).ready(function() {
         $('.subir').click(function(){ 
            $('html, body').animate({scrollTop:0}, 'slow');
            return false;
           });
       });
    },
    estados: function (){
      /* Combo select */
      $(document).ready(function(){
         $("#estados").change(function(){
            $.ajax({
               type: "POST",
               url: "static/data/cidades.ajx.php",
               data: {montadora: $("#estados").val()},
               dataType: "json",
               success: function(json){
                  var options = "";
                  $.each(json, function(key, value){
                     options += '<option value="'+ value +'">' + value + '</option>';
                  });
                  $("#cidades").html(options);
               }
            });
         });
      });
    },
    // checkoutResult:function(){
    //   //checkout-departure
    //   var mainBuscaFacil = this;
    //   $("#checkout-departure").hover(mainBuscaFacil.checkoutResultIn,mainBuscaFacil.checkoutResultOut);

    // },
    // checkoutResultIn:function(eventIn){
    //   //checkout-departure
    //   console.log("eventIn");
    //   console.log(eventIn);
    // },
    // checkoutResultOut:function(eventOut){
    //   //checkout-departure
    //   console.log("eventOut");
    //   console.log(eventOut);
    // },
    triggerResult:function(){

      var mainBuscaFacil = this,
          $summaryPurchase = $('#summary-purchase'),
          summaryPurchaseHeight = $summaryPurchase.height() + parseInt($summaryPurchase.css('padding-top').replace('px','')) + 2;

      $("#remover-voo-outbound").on( "click", function(event) {
        $('#list-outbound input:checked').trigger( "click" );
        return true;
      });

      $("#remover-voo-inbound").on( "click", function(event) {
        $('#list-inbound input:checked').trigger( "click" );        
        return true;
      });

      $('#checkout-departure div a.info-ver').on( "click", function(event) {                
        //$(document).scrollTop($('#list-outbound input:checked').offset().top-175);
        $('html, body').animate({scrollTop: $('#list-outbound input:checked').offset().top-175 }, 1000);     
        mainBuscaFacil.filtroFix();
        return true;
      });

      $('#checkout-return div a.info-ver').on( "click", function(event) {                
        $('html, body').animate({scrollTop: $('#list-inbound input:checked').offset().top-175 }, 1000);             
        mainBuscaFacil.filtroFix();
        return true;
      });

      $('#checkout-departure > div.cia-not-defined  > span').on('click', function(event){             
        var $searchResults =$("#search-results");
        $('html, body').animate({scrollTop: $searchResults.offset().top+40}, 1000);
        mainBuscaFacil.filtroFix();
        return true;
      });

      $('#checkout-return > div.cia-not-defined  > span').on('click', function(event){
        var $dateFlightInbound =$("#date-flight-inbound");
        $('html, body').animate({scrollTop: $dateFlightInbound.offset().top-150}, 1000);
        mainBuscaFacil.filtroFix();
        return true;
      });

    },
    menuUser:function(){
      var mainBuscaFacil = this;
      $(document).on('click', function(){
        /*Retira o menu no caso de ter sido clicado!*/
        if(mainBuscaFacil.clickMenuUser){
          $("#menu-user").slideUp('fast', function(event){
            mainBuscaFacil.clickMenuUser=false;
          });
        }
      });

      $( "#bt-menu-user" ).on('click', function(event){
        event.stopPropagation();
          if(mainBuscaFacil.clickMenuUser){
            $("#menu-user").slideUp('fast', function(event){
              mainBuscaFacil.clickMenuUser=false;
            });
          }else{
            $("#menu-user").slideDown('fast', function(event){
              mainBuscaFacil.clickMenuUser=true;
            });
          }
      });
    },

    changeradioParcelas:function(){
        $("#parcelas").change(function() {
            $( "#parcelas option:selected" ).each(function() {
                $('.option-card-value').find("input[type='radio']").prop('checked', false);
            });
        });

        $("input[name='select-form-parcela']").on('click',function(event){
            var $selectFormParcela = $(this);
            $("#parcelas").val('0');
            $selectFormParcela.attr('checked', true);
        });

    },
    editDadosCheckout:function(){ 
      var mainBuscaFacil = this;     
      $(".edit-dados").on('click', function(){       
       
        var $parent = $(this).parents(".field-passanger");//.field-passanger
          if($parent.hasClass("passager") || $parent.length == 0){
              $('textarea[name="passenger-observation_rev"]').removeAttr("readonly");
              $parent = $(this).parents(".passager");
            }else{
              $parent.find("input").removeAttr("readonly");
            }
        $(this).addClass("hidden");
        $parent.find("a.salve-dados").removeClass("hidden");
        mainBuscaFacil.mask();
      });
    },
    saveDadosCheckout:function(){  
     var mainBuscaFacil = this;
      var $parent =  $(".salve-dados").parents(".field-passanger");//.field-passanger
      $(".salve-dados").on('click', function(){
            $parent =  $(this).parents(".field-passanger");//.field-passanger
          if($parent.hasClass("passager") || $parent.length == 0){
              $('textarea[name="passenger-observation_rev"]').attr("readonly","readonly");
              $parent = $(this).parents(".passager");
            }else{
              if($parent.find("input").valid()){
                    $parent.find("input").attr("readonly","readonly");
                }else{
                    $parent.find("input").removeAttr("readonly","readonly");                    
                    return true;
                }
            }
        $(this).addClass("hidden");
        $parent.find("a.edit-dados").removeClass("hidden");
      });    

      $parent.find("input").change(function(event){
        event.preventDefault(); 
        if(!$(this).valid()){
            console.log("$(this)");
            console.log($(this));
        }
        mainBuscaFacil.mask();
      });  
    },
    frasesLoading:function(status){ 
        var mainBuscaFacil = this;
        var liWidth = $("#frases ul li").outerWidth(),
           speed   = 7000;

        mainBuscaFacil.rotateSlider  = (mainBuscaFacil.rotateSlider==null)?setInterval(auto, speed):mainBuscaFacil.rotateSlider;
        status = (status==undefined)?'':"clearInterval";

        if(status == "clearInterval"){
            clearInterval(mainBuscaFacil.rotateSlider);
            return false;
        }
        
        $("#frases").hover(function() {
            clearInterval(mainBuscaFacil.rotateSlider);
        }, function() {
            mainBuscaFacil.rotateSlider = setInterval(auto, speed);
        });

        // Próximo slide
        function auto() {
            $("#frases ul").css({'width':'99999%'}).animate({left:-liWidth}, function(){
                $("#frases ul li").last().after($("#frases ul li").first());
                $(this).css({'left':'0', 'width' : 'auto'});
            });
        }
    
    },
    sevenDaysSearch: function(){
        var searchFlightTemplate = '';
        var mainBuscaFacil = this;

        $('.sevenDays').on('click', function (event) {
            event.preventDefault();

            $('body').addClass('modal-active');            
            mainBuscaFacil.frasesLoading();
            
            var resultLi = $(this).data();
            console.log(resultLi);

            $.ajax({
                type: 'POST',
                data: $('form#main-search').serializeArray(),
                url: 'ajax/search_flight.ajx.php',
                dataType: 'json'
            }).done(function (response){
                if(response.status == 200){
                    if(searchFlightTemplate == '') // get template on-the-fly only on the first resquest
                        $.get('static/js/tpl/searchFlight.handlebars',function(data){ 
                            searchFlightTemplate = data;
                            mainBuscaFacil.searchCallback(searchFlightTemplate,response);
                        },'html');
                    else
                        mainBuscaFacil.searchCallback(searchFlightTemplate,response);
                }else{
                    if(response.status == 502) // Usuario nao esta autenticado
                        document.location.reload(true);
                    else
                        alert(response.error);
                }
            });
        });

    },
};
})(jQuery);

$(document).ready(function() { 
    var mainBuscaFacil = $.mainBuscaFacil;
    mainBuscaFacil.init();
    mainBuscaFacil.helpers();
    mainBuscaFacil.autocomplete();
    mainBuscaFacil.datepicker();
    mainBuscaFacil.checkSearchDirectionFlight();
    mainBuscaFacil.toggleRadio();
    mainBuscaFacil.radiocard();  
    mainBuscaFacil.ontop();
    mainBuscaFacil.estados();     
    mainBuscaFacil.Search();
    mainBuscaFacil.steps();
    mainBuscaFacil.validate();
    mainBuscaFacil.mask();
    mainBuscaFacil.checkout();
    mainBuscaFacil.createOrder();
    mainBuscaFacil.menuUser();
    


    //alert
    console.log("%cEssa é uma ferramenta para desenvolvedores. Não copie ou cole dados aqui, isso poderá comprometer a segurança da sua conta e dos seus dados!%c ©Copyright 2014 | Milhas Fácil", "color: red; font-size: x-large","color: #6fb020; font-size: large");
});


