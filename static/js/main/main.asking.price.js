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
    countSteps:null,
    sectionActionsNext:{},
    sectionActionsPrev:{},
    objStepCss:{},
    listOutboundTour:null,
    listInboundTour:null,
    aIdsElementTour:[],

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
            $('body').css({'overflow':'hidden'});

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
            $('body').css({'overflow':'hidden'});
        });

        // ## Fechando Modal
        $('.md-close, .bt-cancel').on('click', function ( event ){
            event.preventDefault();
            $("#count li span").removeClass("active-step");
            $('#md-block').hide();
            $('#md-block, #content-modal, #md-block-pagamento, #content-modal-pagamento').removeClass('md-show');
            $('#md-overlay, #md-overlay-pagamento').removeClass('visible');
            $('body').removeAttr('style');       

            $(".content-card-show, #step3-dados-cartao").find("input[type='text'], input[type='email']").val(""); 
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
                ////console.log("!$(\"#main-search\").valid()");
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
                
                //console.log(">> response Pesquisa voo <<"); 
                //console.log(response); 

                if(response.status == 200){ 
                    if(searchFlightTemplate == '') // get template on-the-fly only on the first resquest 
                        $.get('static/js/tpl/searchFlight-asking.handlebars',function(data){ 
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
            mainBuscaFacil.sendModalCallback();
            mainBuscaFacil.sendModal();
            
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

                mainBuscaFacil.listOutboundTour = $('#list-outbound');
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

        // $(".cf").on('click', function(event){
        //     event.preventDefault(); // evita dupla chamada do label e do input

        //     var parent = $(this).parent(); 

        //     var self = this; // Nunca esqueca de quem vc realmente eh!

        //     var paymentObj = parent.data('calculated-fares');
        //     var card = (parent.hasClass('card-going')) ? '#checkout-departure' : '#checkout-return'; // Descobre se clicou na ida ou na volta
        //     var active = false; // True se o usuario marcou o card, false se ele desmarcou
        //     var hasChd = paymentObj.PAX.QTD_PAX_CHD > 0;
        //     var ccdPaymentObj = {
        //         installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
        //         totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
        //     };
            
        //     var listOutbound = $('#list-outbound');
        //     var listInbound = $('#list-inbound');

        //     ///////////////////////////////////////////////////
        //     // CALLBACK PARA QUANDO UM VOO EH SELECIONADO

        //     var selectFlightCallback = function() {
        //         // No caso do voo nao ter valor, nao deve permitir o usuario iniciar emissao
        //         if(paymentObj.INV.PRICE_SUM > 0){

        //             var promo = (parent.hasClass('card-promo')) ? 'card-promo' : '';
        //             var cardExpensive = (parent.hasClass('card-expensive')) ? 'card-expensive' : '';
        //             var cardExpensivechd = (parent.hasClass('card-expensive-chd')) ? 'card-expensive-chd' : '';
        //             var cardExpensiveadl = (parent.hasClass('card-expensive-adl')) ? 'card-expensive-adl' : '';
        //             var cardPromochd = (parent.hasClass('card-promo-chd')) ? 'card-promo-chd' : '';
        //             var cardPromoadl = (parent.hasClass('card-promo-adl')) ? 'card-promo-adl' : '';
        //             var allClass = '',allClassAdl = '', allClasshd = '';
                    
        //             if(hasChd){
        //               allClassChd = promo + ' ' + cardExpensive + ' ' + cardExpensivechd  + ' ' + cardPromochd;
        //             }else{
        //               allClassAdl = promo + ' ' + cardExpensive + ' ' + cardExpensiveadl + ' ' + cardPromoadl;
        //             }

        //             allClass = promo + ' ' + cardExpensive + ' ' + cardExpensiveadl + ' ' + cardPromoadl + ' ' + cardExpensivechd  + ' ' + cardPromochd;


        //             // Preenchendo os cards do topo
        //             var cia = ($(this).parent().find('.flight-cia').text()).toLowerCase();
        //             var flightNumber = $(this).find('.card-flight-number').text();
        //             var milhasSum = paymentObj.MILES.MILES_ADL + paymentObj.MILES.MILES_CHD;
        //             var priceSum = paymentObj.INV.PRICE_SUM;
        //             var earnMoney = (paymentObj.EARN_MONEY_ADL * paymentObj.PAX.QTD_PAX_ADL) + (paymentObj.EARN_MONEY_CHD * paymentObj.PAX.QTD_PAX_CHD);

        //             $(card+' > div:nth-child(2) > div').attr('class','cia-'+cia + ' ' + allClass);//qual a cia aerea
        //             $(card+' .checkout-flight-num-resumo').html(flightNumber);//numero do voo
        //             $(card+' .milhas').html(milhasSum.format(0, '', '.'));//numero de milhas
        //             $(card+' .price-milhasfacil').html('R$ ' + priceSum.format(2, ',', '.'));//preco milhas facil
        //             $(card+' .earn-money').html('R$ '+earnMoney.format(2, ',', '.'));//economize

        //             for(i=0;i<12;i++){ // Soma os valores de chd + adl + taxa de embarque vezes num de pax chd / num de pax adl
        //                 ccdPaymentObj.installments[i] += ((paymentObj.CCD.INSTALLMENTS_ADL[i].parcel) * paymentObj.PAX.QTD_PAX_ADL);
        //                 ccdPaymentObj.totals[i] += ((paymentObj.CCD.INSTALLMENTS_ADL[i].total) * paymentObj.PAX.QTD_PAX_ADL);

        //                 if(hasChd){  // se tiver crianca, soma as chd tbm
        //                     ccdPaymentObj.installments[i] += ((paymentObj.CCD.INSTALLMENTS_CHD[i].parcel) * paymentObj.PAX.QTD_PAX_CHD);
        //                     ccdPaymentObj.totals[i] += ((paymentObj.CCD.INSTALLMENTS_CHD[i].total) * paymentObj.PAX.QTD_PAX_CHD);
        //                 }
        //             }

                    
        //             if(card == '#checkout-departure'){
        //                 listOutbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
        //                 listOutbound.data('ccd-oncash',(paymentObj.CCD.ONCASH > 0) ? paymentObj.CCD.ONCASH : 0); // salvando dados da entrada
        //                 listOutbound.data('inv',priceSum); // salvando dados de boleto

        //                 //$('.card-going .div-card-details').hide(200); // fecha todas as outras div de detalhe que estejam abertas                                 
        //                 listOutbound.find(".td1").css('background-color','#f8f8f7');
        //                 $(this).find(".td1").css('background-color','#fff');

        //                 // PASSO 2 - Preenchendo checkout passo 2 - cards do topo
        //                 var step2CardChdOutbound = $('#step2-card-chd-outbound').addClass('hide');
        //                 var step2CardAdlOutbound = $('#step2-card-adl-outbound').addClass('hide');

        //                 var mainStep2Card = (hasChd) ? step2CardChdOutbound : step2CardAdlOutbound; 
        //                 var mainStep2Card_clonedElement = mainStep2Card.find('.cloned-element');

        //                 mainStep2Card_clonedElement.html(''); // limpando dados para colocar novos
        //                 mainStep2Card.find('#date').text($('#date-flight-outbound > div.flag-voo > p:nth-child(2)').text());
        //                 mainStep2Card.attr("class",'cia-'+cia + ' ' + allClass);
                       
                        
        //             }else{
        //                 listInbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
        //                 listInbound.data('ccd-oncash',(paymentObj.CCD.ONCASH > 0) ? paymentObj.CCD.ONCASH : 0); // salvando dados da entrada
        //                 listInbound.data('inv',priceSum); // salvando dados de boleto

        //                 //$('.card-going-back .div-card-details').hide(200); // fecha todas as outras div de detalhe que estejam abertas                                 
        //                 listInbound.find(".td1").css('background-color','#f8f8f7');
        //                 $(this).find(".td1").css('background-color','#fff');

        //                 // PASSO 2 - Preenchendo checkout passo 2 - cards do topo
        //                 var step2CardChdInbound = $('#step2-card-chd-inbound').addClass('hide');
        //                 var step2CardAdlInbound = $('#step2-card-adl-inbound').addClass('hide');

        //                 var mainStep2Card = (hasChd) ? step2CardChdInbound : step2CardAdlInbound; 
        //                 var mainStep2Card_clonedElement = mainStep2Card.find('.cloned-element');

        //                 mainStep2Card_clonedElement.html(''); // limpando dados para colocar novos
        //                 mainStep2Card.find('#date').text($('#date-flight-inbound > div.flag-voo > p:nth-child(2)').text());
                        
        //                 mainStep2Card.attr("class",'cia-'+cia + ' ' + allClass);
        //                // mainStep2Card_clonedElement.attr("class", "card-result-header" + ' ' + promo + ' ' + cardExpensive);
        //             }

        //             ///////////////////////////////////////////////////
        //             // PASSO 2 - Preenchendo checkout passo 2 - cards do topo
        //             $(this).find('.td2').clone().appendTo(mainStep2Card_clonedElement);
        //             $(this).find('.td3').clone().appendTo(mainStep2Card_clonedElement);

        //             mainStep2Card.find('#miles').text(milhasSum.format(0, '', '.'));
        //             mainStep2Card.find('#boarding-tax').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
        //             mainStep2Card.find('#price').text(priceSum.format(2, ',', '.'));
        //             mainStep2Card.find('#earn').text(earnMoney.format(2, ',', '.'));

        //             if(paymentObj.PAX.QTD_PAX_CHD > 0){

        //               mainStep2Card.find('#miles-chd').text(paymentObj.MILES.MILES_CHD.format(0, '', '.'));
        //               mainStep2Card.find('#boarding-tax-chd').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
        //               mainStep2Card.find('#price-chd').text(paymentObj.INV.PRICE_CHD.format(2, ',', '.'));
        //               mainStep2Card.find('#earn-chd').text(paymentObj.EARN_MONEY_CHD.format(2, ',', '.'));

        //               mainStep2Card.find('#miles').text(paymentObj.MILES.MILES_ADL.format(0, '', '.'));
        //               mainStep2Card.find('#boarding-tax').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
        //               mainStep2Card.find('#price').text(paymentObj.INV.PRICE_ADL.format(2, ',', '.'));
        //               mainStep2Card.find('#earn').text(paymentObj.EARN_MONEY_ADL.format(2, ',', '.'));

        //             } else {
        //               mainStep2Card.find('#miles').text(milhasSum.format(0, '', '.'));
        //               mainStep2Card.find('#boarding-tax').text(paymentObj.BOARDING_TAX.format(2, ',', '.'));
        //               mainStep2Card.find('#price').text(priceSum.format(2, ',', '.'));
        //               mainStep2Card.find('#earn').text(earnMoney.format(2, ',', '.'));
        //             }
                    
        //             mainStep2Card.children().removeClass('card-tam card-gol card-azul').addClass('card-'+cia).removeClass('hidden'); 

        //             // Faz o efeito de transição entre um voo selecionado e outro durante o resumo do pedido
        //             $(card+' > div:nth-child(2)').animate({
        //                 opacity: 0, // tirando a opacidade do objeto
        //                 marginLeft: "-100px" // retirando o card selecionado e desaparendo para a esquerda
        //             }, {
        //                duration: 500, 
        //                complete: function() {
        //                 $(this).animate({
        //                     opacity: 1, // colocando a opacidade no objeto
        //                     marginLeft: "0px" // colocando o card selecionado e movendo para a direita
        //                 })
        //                }
        //             });


        //             $(card).children().first().hide(500); // remove o selecionar voo

        //         }else{ 
        //             $(card).children().first().show(500); // poe div cinza por cima do card do topo

        //             if(card == '#checkout-departure'){
        //                 listOutbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
        //                 listOutbound.data('ccd-oncash', 0); // apagando dados da entrada
        //                 listOutbound.data('inv',0); // salvando dados de boleto       
        //                 $(this).find(".td1").css('background-color','#f8f8f7'); // alterando background do "selecionar"

        //                 // PASSO 2
        //                 // Removendo item des-selecionados do checkout passo 2 - Passageiros
        //                 $('#step2-card-chd-outbound').children().addClass('hidden');
        //                 $('#step2-card-adl-outbound').children().addClass('hidden');
        //             }else{
        //                 listInbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
        //                 listInbound.data('ccd-oncash', 0); // apagando dados da entrada
        //                 listInbound.data('inv',0); // salvando dados de boleto
        //                 $(this).find(".td1").css('background-color','#f8f8f7');// alterando background do "selecionar"

        //                 // PASSO 2
        //                 // Removendo item des-selecionados do checkout passo 2 - Passageiros
        //                 $('#step2-card-chd-inbound').children().addClass('hidden');
        //                 $('#step2-card-adl-inbound').children().addClass('hidden');
        //             }
        //         }

        //         return clickFlightCallback.call(this);
        //     }

        //     ///////////////////////////////////////////////////
        //     // CALLBACK PARA QUANDO UM VOO EH DES-SELECIONADO

        //     var deselectFlightCallback = function() {
        //         if(card == '#checkout-departure'){
        //             listOutbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
        //             listOutbound.data('ccd-oncash', 0); // apagando dados da entrada
        //             listOutbound.data('inv',0); // salvando dados de boleto       
        //             $(this).find(".td1").css('background-color','#f8f8f7'); // alterando background do "selecionar"

        //             // PASSO 2
        //             // Removendo item des-selecionados do checkout passo 2 - Passageiros
        //             $('#step2-card-chd-outbound').children().addClass('hidden');
        //             $('#step2-card-adl-outbound').children().addClass('hidden');
        //         }else{
        //             listInbound.data('ccd',ccdPaymentObj); // salvando dados de cartao
        //             listInbound.data('ccd-oncash', 0); // apagando dados da entrada
        //             listInbound.data('inv',0); // salvando dados de boleto
        //             $(this).find(".td1").css('background-color','#f8f8f7');// alterando background do "selecionar"

        //             // PASSO 2
        //             // Removendo item des-selecionados do checkout passo 2 - Passageiros
        //             $('#step2-card-chd-inbound').children().addClass('hidden');
        //             $('#step2-card-adl-inbound').children().addClass('hidden');
        //         }

        //         // Faz o efeito de transição entre um voo selecionado e outro durante o resumo do pedido
        //         $(card+' > div:nth-child(2)').animate({
        //             opacity: 0, // tirando a opacidade do objeto
        //             marginLeft: "-100px" // retirando o card selecionado e desaparendo para a esquerda
        //         }, {
        //            duration: 500, 
        //            complete: function() {
        //             $(card).children().first().show(300); // poe div selecionar voo
        //            }
        //         });

                

        //         return clickFlightCallback.call(this);
        //     }

        //     ///////////////////////////////////////////////////
        //     // CALLBACK CHAMADO EM TODOS OS CLIQUES

        //     var clickFlightCallback = function() {
        //        //////////////////////////////////////////////////////////
        //         // Atualiza valores de cartao na box da home
        //         // Soma os valores de parcela do cartao e mostra no box
        //         var ccdPaymentObjOutbound = (listOutbound.data('ccd') == 0) ? {
        //             installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
        //             totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
        //         } : listOutbound.data('ccd');
        //         if(listInbound.length > 0){
        //             var ccdPaymentObjInbound  = (listInbound.data('ccd') == 0) ? {
        //                 installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
        //                 totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
        //             } : listInbound.data('ccd');
        //         }else{
        //             var ccdPaymentObjInbound = {
        //                 installments : Array(0,0,0,0,0,0,0,0,0,0,0,0),
        //                 totals : Array(0,0,0,0,0,0,0,0,0,0,0,0)
        //             };
        //         }

        //         // Gera corretamente os valores de entrada a vista e invoice
        //         var onCash = listOutbound.data('ccd-oncash');
        //         var invPaymentOutbound = listOutbound.data('inv');
        //         var invPaymentInbound = 0;
        //         if(listInbound.length > 0){
        //             invPaymentInbound = listInbound.data('inv');
        //             onCash += listInbound.data('ccd-oncash');
        //         }

        //         // Atualiza valores de cartao da box da home
        //         $('#pag-cartao li').each(function (index){
        //             $(this).text(index+1 + 'x: R$ ' + (ccdPaymentObjOutbound.installments[index] + ccdPaymentObjInbound.installments[index]).format(2, ',', '.'))
        //         });
        //         $('#pag-cartao > p:nth-child(2) > span').text('R$ ' + onCash.format(2, ',', '.'));

        //         // Atualiza valores de invoice da box da home
        //         $('#pag-boleto > p:nth-child(3)').text('R$ ' + (invPaymentOutbound + invPaymentInbound).format(2, ',', '.'))

        //         // Verifica se tem algum voo marcado para liberar o nao o botao
        //         if(
        //             (($('#search-results input:checked')).length == 1 && (invPaymentOutbound > 0 || invPaymentInbound > 0)) ||
        //             (($('#search-results input:checked')).length == 2 && (invPaymentOutbound > 0 && invPaymentInbound > 0)) 
        //         )
        //             $('#checkout-go').removeClass('disabled').removeAttr('disabled');
        //         else
        //             $('#checkout-go').addClass('disabled').attr('disabled',true);

        //         /////////////////////////////////////////////////////////////////
        //         // PASSO 2 - Criando campos para os passageiros se ainda não tiver criado
        //         if(!$('#dados-passageiros').hasClass('done') && (invPaymentOutbound > 0 || invPaymentInbound > 0)){

        //             $('#passengers-block').html('');
        //             $('#passengers-chd-block').html('');

        //             for(i=0;i < paymentObj.PAX.QTD_PAX_ADL;i++) // passageiros ADL
        //                 if(mainBuscaFacil.templatePassengerAdl != null)
        //                     mainBuscaFacil.templatePassengerAdl.clone().removeClass('hide').html(
        //                         (mainBuscaFacil.templatePassengerAdl.html()).replace(/{{@index}}/g, i)
        //                     ).appendTo('#passengers-block');

        //             for(i=0;i < paymentObj.PAX.QTD_PAX_CHD;i++) // passageiros CHD
        //                 if(mainBuscaFacil.templatePassengerChd != null)
        //                     mainBuscaFacil.templatePassengerChd.clone().removeClass('hide').html(
        //                         (mainBuscaFacil.templatePassengerChd.html()).replace(/{{@index}}/g, i)
        //                     ).appendTo('#passengers-chd-block');

        //             $('#passengers-adl-template').remove();
        //             $('#passengers-chd-template').remove();
        //             // Marcando passageiros como preenchidos
        //             $('#dados-passageiros').addClass('done');
        //         }

        //         ///////////////////////////////////////////////
        //         // PASSO 3 - Preenchendo valores de inv e card 
        //         $('#payment-billet-option > div.content-payment span:nth-child(2)').text( // dado do valor a vista
        //             (invPaymentOutbound + invPaymentInbound).format(2, ',', '.')
        //         );

        //         $('#differential-price > p:nth-child(2) > span:nth-child(2)').text( // dado do valor card
        //             (ccdPaymentObjOutbound.installments[11] + ccdPaymentObjInbound.installments[11]).format(2, ',', '.')
        //         );

        //         if(onCash > 0){ // valor da entrada no ccd
        //             $('#container-entrada > div > p').removeClass('hide').find('span:nth-child(2)').text(onCash.format(2, ',', '.'));
        //         }else{
        //             $('#container-entrada > div > p').addClass('hide');
        //         }
                
        //         // PASSO 3 - Preenchendo todos os dados de parcelas do cartao
        //         // Alterando parcelas expostas
        //         $('div.content-value-card label.select-form-parcela01 span.value').text(
        //             (ccdPaymentObjOutbound.installments[2] + ccdPaymentObjInbound.installments[2]).format(2, ',', '.')
        //         );
        //         $('div.content-value-card label.select-form-parcela02 span.value').text(
        //             (ccdPaymentObjOutbound.installments[5] + ccdPaymentObjInbound.installments[5]).format(2, ',', '.')
        //         );
        //         $('div.content-value-card label.select-form-parcela03 span.value').text(
        //             (ccdPaymentObjOutbound.installments[11] + ccdPaymentObjInbound.installments[11]).format(2, ',', '.')
        //         );

        //         $('#parcelas option').each(function (index){
        //             if(index>0) // pular a primeira opcao
        //                 $(this).text(index + 'x de R$ ' + (ccdPaymentObjOutbound.installments[index-1] + ccdPaymentObjInbound.installments[index-1]).format(2, ',', '.'))
        //         });

        //         mainBuscaFacil.editDadosCheckout();
        //         mainBuscaFacil.validate();
        //         mainBuscaFacil.mask();

        //         // Validando se pode exibir opcoes ccd
        //         var mustRemove = false;
        //         var transactionSpend = ccdPaymentObjOutbound.totals[11] + ccdPaymentObjInbound.totals[11]
        //         var totalSpend = mainBuscaFacil.monthlySpend + transactionSpend;
        //         mustRemove = (
        //             (totalSpend > mainBuscaFacil.ccdLimits.CCD_LIMIT_PERMISSION) ||
        //             (transactionSpend > mainBuscaFacil.ccdLimits.CCD_LIMIT_TRANSACTION) ||
        //             (
        //                 mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'A' &&
        //                 mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'B' &&
        //                 mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'C' &&
        //                 mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP != 'D'
        //             )
        //         );

        //         //console.log(mainBuscaFacil.ccdLimits.CCD_LIMIT_FRAUD_GROUP);

        //         if(mustRemove){ //503px
        //             $('#pag-cartao').addClass('hide').prev().css('width','503px');// remove link com visualizacao das opcoes de pagamento
        //             $('#payment-card-option').addClass('hide').prev().addClass('hide'); // Remove box com opcoes de ccd
        //         }else{
        //             $('#pag-cartao').removeClass('hide').prev().css('width','171px'); // add link com visualizacao das opcoes de pagamento
        //             $('#payment-card-option').removeClass('hide').prev().removeClass('hide'); // add box com opcoes de ccd
        //         } 
        //     }


        //     //////////////////////////////////
        //     // MAIN CODE

        //     // Verifica o que rolou
        //     if(this.getElementsByTagName('input')[0].checked){ // ele desclicou
        //         this.getElementsByTagName('input')[0].checked = false; // remove check do radio

        //         //////////////////////
        //         // Fecha detalhes/////
        //         $(this).next().slideUp(300, function(){
        //             this.classList.remove('show');

        //             // Chama callback para spread de processamento
        //             return deselectFlightCallback.call(self);
        //         }); // esconde div com detalhes
                
        //     }else{ // ele clicou
        //         this.getElementsByTagName('input')[0].checked = true; // adiciona check no radio
        //         active = true; // Usuario marcou o card

        //         mainBuscaFacil.editDadosCheckout();
        //         mainBuscaFacil.saveDadosCheckout();


        //         // fecha todas as outras div de detalhe que estejam abertas
        //         if(card == '#checkout-departure')
        //             listOutbound.find('.div-card-details.show').slideUp(300, function(){
        //                 this.classList.remove('show');
        //             });
        //         else
        //             listInbound.find('.div-card-details.show').slideUp(300, function(){
        //                 this.classList.remove('show');
        //             });

        //         /////////////////////////////////////////////
        //         // Abre detalhes/////////////////////////////
        //         $(this).next().slideDown(300, function(){
        //             this.classList.add('show'); // Adiciona class para sistema saber quem esta aberto

        //             $(card+' > div:nth-child(2)').removeClass('md-show');

        //             // Chama callback para spread de processamento
        //             return selectFlightCallback.call(self);
        //         }); // mostra div com detalhes
        //     }

        // });


        /** 
            @doc: Aqui manipulamos os eventos click do card da tela: asking_price.php 
        */ 
        $(".cq").on('click', function(event){ 
           //event.preventDefault(); // evita dupla chamada do label e do input 
            var parent = $(this).parent();             
            var whoAmI = ($(this).parent().hasClass("card-children"))?"chd":"adl";// quem sou eu?? 
            var $cardResultElementParent = $(this).parents(".card-result");//
            var self = this; // Nunca esqueca de quem vc realmente eh! 
            var $labelCardElement = $(this).find("div.td5.left.price-economy.view.view-first > div.mask > a"); 
            var card = ($cardResultElementParent.hasClass('card-going')) ? '#checkout-departure' : '#checkout-return'; // Descobre se clicou na ida ou na volta
            var $viewMarkup = parent.find(".view-markup, .view-markup-chd");//aqui fecha os que tiverem abertos!! 


            //console.log("$labelCardElement"); 
            //console.log($labelCardElement); 

            //console.log(".cq > a: $(event.target).attr('class')"); 
            //console.log($(event.target).attr('class')); 


            /**@doc: Aqui colocamos o atributo cheched no input e a class [card-select-asking"] no card!!*/
            if($(this).find("input[type='checkbox']").prop("checked")){ 
                $(this).find("input[type='checkbox']").prop("checked",""); 
                parent.removeClass("card-select-asking"); 
                $viewMarkup.find("input[type='radio'],input[type='text']").attr("disabled","disabled"); 
            }else{ 
                $(this).find("input[type='checkbox']").prop("checked","checked"); 
                parent.addClass("card-select-asking");                 
                $viewMarkup.find("input[type='radio'],input[type='text']").removeAttr("disabled"); 
            } 

            var popUpMarckup = function($labelCardElement){ 

            }; 

            var closePopUpMarckup = function(event){ 

            }; 

            if(card == "#checkout-departure"){
                //console.log("#checkout-departure");
                //console.log("card = " + card);
                $('#checkout-departure > div.cia-not-defined-asking').hide();
                $('#checkout-departure > #group-selected > p').html("<p>Voos de Ida selecionados: "+$('.listOutbound .td1 input:checked').length+ "</p>");
            } else {                
                //console.log("#checkout-return");
                //console.log("card = " + card);
                $('#checkout-return > div.cia-not-defined-asking').hide();
                $('#checkout-return > #group-selected > p').html("<p>Voos de volta selecionados: "+$('.listInbound .td1 input:checked').length+ "</p>");
            }

            // //console.log("$('.listInbound .td1 input:checked')");
            // //console.log($('.listInbound .td1 input:checked'));

            if($('.listOutbound .td1 input:checked').length ==0 && $('.listInbound .td1 input:checked').length ==0){
                $("#checkout-go").attr("disabled","disabled");
                $("#checkout-go").addClass("disabled");
            }else{
                $("#checkout-go").removeAttr("disabled");
                $("#checkout-go").removeClass("disabled");
            }
        }); 

         /**@doc: Aqui incluimos o Markup (abrimos o Popup do Markup)*/ 
         $("div.mask > a").on('click', function(event){ 
            event.preventDefault(); // evita dupla chamada do label e do input!! 
            //event.stopPropagation();// aqui neste caso evita marcar o checkbox do card! 
            $(".view-markup, .view-markup-chd").css("display","none");//aqui fecha os que tiverem abertos!! 
            var $cardResultParent = $(this).parents(".card-result"); 
            var $priceChildren = $(this).parents(".price-children"); //aqui pegamos no caso de criança. 
            var $parentCq = $(this).parents(".cq"); 
            var $viewMarkup; 

            if($cardResultParent.hasClass("card-children")){ 

                /*aqui dentro tenho que verificar se estou clicando no criança ou no adulto!!*/ 
                if($priceChildren.index() == 0){ 
                    $viewMarkup = $cardResultParent.find(".view-markup"); 
                    $viewMarkup.find("input").removeAttr("disabled");
                    $viewMarkup.css("display","block");
                }else{ 
                    $viewMarkup = $cardResultParent.find(".view-markup-chd");
                    $viewMarkup.find("input").removeAttr("disabled"); 
                    $viewMarkup.css("display","block"); 
                } 

            } else { 
                $viewMarkup = $cardResultParent.find(".view-markup"); 
                $viewMarkup.find("input").removeAttr("disabled"); 
                $viewMarkup.css("display","block"); 
            } 

            /** @doc: Aqui pegamos o input que será preenchido o markup para aplicar a mascara de moeda! */ 
            var $priceMarkup = $cardResultParent.find('div.view-markup label.price-markup > input[type="text"],div.view-markup-chd label.price-markup > input[type="text"]'); 
            $priceMarkup.maskMoney({prefix:'', allowNegative: true, thousands:'.', decimal:',', affixesStay: false,precision:2});
            
        });

        
         /**@doc: Aqui fechamos o Popup do Markup*/ 
        $("a[class*='bt-close-markup'] > img").on('click', function(event){ 
            event.preventDefault(); // evita dupla chamada do label e do input 
            $(".view-markup, .view-markup-chd").css("display","none");            
        }); 

         /**@doc: Aqui clicamos no Botão Salvar do Markup!*/
        $("button.save-markup").on("click",function(event){ 
            event.preventDefault(); 
            var whoAmI = ($(this).parent().hasClass("view-markup-chd"))?"chd":"adl";// quem sou eu??
            var $cardResultParent = $(this).parents(".card-result"); 
            var $priceChildren = $(this).parents(".price-children"); //aqui pegamos no caso de criança. 
            /** 
                @doc: Os dados contidos no objeto: dataCalcFares não serão alterados apenas colocaremos o valor do markup e a operação a ser realizada.
                O objeto: dataCalcFares será usado como referência para remover o markup e resetar os valores.
            */
            var dataCalcFares = $cardResultParent.data(); 

                //console.log(">> dataCalcFares Dados do carde! <<"); 
                //console.log(dataCalcFares); 

            /**
                @doc: No caso de uma pesquisa de voo com criança: Para pegar os valores consideramos os seguintes prefixos de seletor: 
                    adulto: div.td5 > div:nth-child(1); 
                    criança: div.td5 > div:nth-child(2); 
            */
            var $priceMilhasFacilHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #price_milhasfacil > span:nth-child(2)'); 
            var $priceMilhasFacil = $cardResultParent.find("div.td5 > div:nth-child(1) #price_milhasfacil > span:nth-child(2)"); 
            var vPriceMilhasFacil = tratarValues($priceMilhasFacil.text()); 

            var $priceMilhasFacilHiddenChd = $cardResultParent.find("div.td5 > div:nth-child(2) #price_milhasfacil > span.price-milhasfacil.hidden"); 
            var $priceMilhasFacilChd = $cardResultParent.find("div.td5 > div:nth-child(2) #price_milhasfacil > span:nth-child(2)"); 
            var vPriceMilhasFacilChd = tratarValues($priceMilhasFacilChd.text()); 

            var $earnMoneyHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #earn-money > span.earn-money.hidden'); 
            var $earnMoney = $cardResultParent.find('div.td5 > div:nth-child(1) #earn-money > span:nth-child(2)'); 
            var vEarnMoney = tratarValues($earnMoney.text()); 

            var $earnMoneyHiddenChd = $cardResultParent.find('div.td5 > div:nth-child(1) #earn-money > span.earn-money.hidden'); 
            var $earnMoneyChd = $cardResultParent.find('div.td5 > div:nth-child(2) #earn-money > span:nth-child(2)'); 
            var vEarnMoneyChd = tratarValues($earnMoney.text()); 

            var $inputOperation = $cardResultParent.find('div.view-markup input:checked'); 
                if($inputOperation.length==0){ 
                    $inputOperation =  $(this).parents(".view-markup").find("[id*='[operation]-a']"); 
                    $inputOperation.prop("checked","checked");
                }

            var $inputOperationChd = $cardResultParent.find('div.view-markup-chd input:checked'); 
                if($inputOperationChd.length==0){ 
                    $inputOperationChd =  $(this).parents(".view-markup-chd").find("[id*='[operation_chd]-a']"); 
                    $inputOperationChd.prop("checked","checked");
                }

            var $priceMarkup = $cardResultParent.find('div.view-markup label.price-markup > input[type="text"]'); 
            var vPriceMarkup = tratarValues($priceMarkup.val()); 

            var $priceMarkupChd = $cardResultParent.find('div.view-markup-chd label.price-markup > input[type="text"]'); 
            var vPriceMarkupChd = tratarValues($priceMarkupChd.val()); 

            $(".view-markup, .view-markup-chd").css("display","none");//aqui fecha os que tiverem abertos!! 


            /**@doc: Aqui testamos se o card é de uma consulta com criança!*/
            if($cardResultParent.hasClass("card-children")){ 
                
                /**@doc: Aqui dentro tenho que verificar se estou clicando na criança ou no adulto!!*/ 
                if(whoAmI == "chd"){ 
                    //console.log("Sou criança!!"); 
                    if($priceMarkupChd.val()=="" || $priceMarkupChd.val()== null || $priceMarkupChd.val()==undefined) 
                        return true; 

                    if($inputOperationChd.val() == "1"){ 
                        vPriceMilhasFacilChd = vPriceMilhasFacilChd + vPriceMarkupChd;   
                        vEarnMoneyChd = vEarnMoneyChd - vPriceMarkupChd;   
                    }else{ 
                        vPriceMilhasFacilChd = vPriceMilhasFacilChd - vPriceMarkupChd;   
                        vEarnMoneyChd = vEarnMoneyChd + vPriceMarkupChd;   
                    } 



                     if(tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT) > vPriceMilhasFacilChd){
                        vEarnMoneyChd = tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT); 
                        vPriceMilhasFacilChd = tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT); 

                        $priceMilhasFacilChd.text(vPriceMilhasFacilChd.format(2, ',', '.')); 
                        $priceMilhasFacilHiddenChd.text(vPriceMilhasFacilChd); 

                        $earnMoneyChd.text(vEarnMoneyChd.format(2, ',', '.')); 
                        $earnMoneyHiddenChd.text(vEarnMoneyChd); 
                         return true;
                    } 

                    $priceMilhasFacilChd.text(vPriceMilhasFacilChd.format(2, ',', '.')); 
                    $priceMilhasFacilHiddenChd.text(vPriceMilhasFacilChd); 

                    $earnMoneyChd.text(vEarnMoneyChd.format(2, ',', '.')); 
                    $earnMoneyHiddenChd.text(vEarnMoneyChd); 

                    dataCalcFares.calculatedFares.PRICE_MARKUP = $priceMarkup.val(); 
                    dataCalcFares.calculatedFares.PRICE_MARKUP_OPERATION = $inputOperation.val();                    
                    
                    $cardResultParent.attr("data-calculated-fares",JSON.stringify(dataCalcFares)); 
                    $priceMilhasFacilChd.parents(".price-children").addClass("active-markup"); 
                    $viewMarkup = $cardResultParent.find(".view-markup-chd"); 
                    $viewMarkup.find("input").removeAttr("disabled");
                }else{ 
                    //console.log("Sou Adulto!!"); 
                    if($priceMarkup.val()=="" || $priceMarkup.val()== null || $priceMarkup.val()==undefined) 
                        return true; 
                                               
                    if($inputOperation.val() == "1"){ 
                        vPriceMilhasFacil = vPriceMilhasFacil + vPriceMarkup;   
                        vEarnMoney = vEarnMoney - vPriceMarkup; 
                    }else{ 
                        vPriceMilhasFacil = vPriceMilhasFacil - vPriceMarkup; 
                        vEarnMoney = vEarnMoney + vPriceMarkup; 
                    } 


                    if(tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT) > vPriceMilhasFacil){
                        vEarnMoney = tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT); 
                        vPriceMilhasFacil = tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT); 

                        $priceMilhasFacil.text(vPriceMilhasFacil.format(2, ',', '.')); 
                        $priceMilhasFacilHidden.text(vPriceMilhasFacil); 

                        $earnMoney.text(vEarnMoney.format(2, ',', '.')); 
                        $earnMoneyHidden.text(vEarnMoney); 
                         return true;
                    }


                    //console.log("vPriceMilhasFacilChd");
                    //console.log(vPriceMilhasFacilChd);
                    
                    //console.log("vPriceMilhasFacilChd.format(2, ',', '.')");
                    //console.log(vPriceMilhasFacilChd.format(2, ',', '.'));

                    $priceMilhasFacil.text(vPriceMilhasFacil.format(2, ',', '.')); 
                    $priceMilhasFacilHidden.text(vPriceMilhasFacil); 

                    $earnMoney.text(vEarnMoney.format(2, ',', '.'));  
                    $earnMoneyHidden.text(vEarnMoney); 

                    dataCalcFares.calculatedFares.PRICE_MARKUP = $priceMarkup.val(); 
                    dataCalcFares.calculatedFares.PRICE_MARKUP_OPERATION = $inputOperation.val(); 
                    
                    $cardResultParent.attr("data-calculated-fares",JSON.stringify(dataCalcFares)); 
                    $priceMilhasFacil.parents(".price-children").addClass("active-markup"); 

                    
                } 

            } else { 
                console.log("Sou definitivamente adulto!!"); 
                if($priceMarkup.val()=="" || $priceMarkup.val()== null || $priceMarkup.val()==undefined) 
                    return true; 

                $priceMilhasFacilHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #price_milhasfacil > span.price-milhasfacil.hidden'); 
                $priceMilhasFacil = $cardResultParent.find("div.td5 > div:nth-child(1) #price_milhasfacil > span:nth-child(2)"); 

                vPriceMilhasFacil = tratarValues($priceMilhasFacil.text()); 
                
                $earnMoneyHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #earn-money > span.earn-money.hidden'); 
                $earnMoney = $cardResultParent.find('div.td5 > div.price-milhas-facil-save #earn-money > span:nth-child(2)'); 
                vEarnMoney = tratarValues($earnMoney.text()); 
                
                $inputOperation = $cardResultParent.find('div.view-markup input:checked'); 
                    if($inputOperation.length==0){ 
                        $inputOperation =  $(this).parents(".view-markup").find("[id*='[operation]-a']"); 
                        $inputOperation.prop("checked","checked"); 
                    } 
                
                $priceMarkup = $cardResultParent.find('div.view-markup label.price-markup > input[type="text"]'); 
                vPriceMarkup = tratarValues($priceMarkup.val()); 

                if($inputOperation.val() == "1"){ 
                    vPriceMilhasFacil = vPriceMilhasFacil + vPriceMarkup;   
                    vEarnMoney = vEarnMoney - vPriceMarkup;  
                }else{ 
                    vPriceMilhasFacil = vPriceMilhasFacil - vPriceMarkup; 
                    vEarnMoney = vEarnMoney + vPriceMarkup; 
                } 

                 if(tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT) > vPriceMilhasFacil){
                    vEarnMoney = tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT); 
                    vPriceMilhasFacil = tratarValues(dataCalcFares.calculatedFares.INV.PRICE_MILHASFACIL_DEFAULT); 

                    $priceMilhasFacil.text(vPriceMilhasFacil.format(2, ',', '.')); 
                    $priceMilhasFacilHidden.text(vPriceMilhasFacil); 

                    $earnMoney.text(vEarnMoney.format(2, ',', '.')); 
                    $earnMoneyHidden.text(vEarnMoney); 
                     return true;
                } 

                $priceMilhasFacil.text(vPriceMilhasFacil.format(2, ',', '.')); 
                $priceMilhasFacilHidden.text(vPriceMilhasFacil); 

                $earnMoney.text(vEarnMoney.format(2, ',', '.')); 
                $earnMoneyHidden.text(vEarnMoney); 

                dataCalcFares.calculatedFares.PRICE_MARKUP = $priceMarkup.val(); 
                dataCalcFares.calculatedFares.PRICE_MARKUP_OPERATION = $inputOperation.val(); 
                            
                $cardResultParent.attr("data-calculated-fares",JSON.stringify(dataCalcFares));                 
                $priceMilhasFacil.parents(".td5").addClass("active-markup");
            } 

            function calcMarkupAdl(){}

            function tratarValues(value){ 
                valueReturn = 0; 
                
                if(value=="" || value== null || value==undefined) 
                    return parseFloat(valueReturn); 
                
                valueReturn = parseFloat(value.replace(".","").replace(",",".")); 
                    return valueReturn; 
            } 


            $(".view-markup, .view-markup-chd").css("display","none");//aqui fecha os que tiverem abertos!! 
        }); 
        
        /**@doc: Aqui clicamos no Botão Remover do Markup!*/
        $("button.remove-markup").on("click",function(event){  
            event.preventDefault(); 
            var whoAmI = ($(this).parent().hasClass("view-markup-chd"))?"chd":"adl";// quem sou eu??
            var $cardResultParent = $(this).parents(".card-result"); 
            var $priceChildren = $(this).parents(".price-children"); //aqui pegamos no caso de criança.             
            /** 
                @doc: Os dados contidos no objeto: dataCalcFares não serão alterados apenas colocaremos o valor do markup e a operação a ser realizada.
                O objeto: dataCalcFares será usado como referência para remover o markup e resetar os valores.
            */
            var dataCalcFares = $cardResultParent.data(); 
            //console.log("dataCalcFares");
            //console.log(dataCalcFares);

            /**
                @doc: Para pegar os valores consideramos os seguintes prefixos de seletor: 
                    adulto: div.td5 > div:nth-child(1); 
                    criança: div.td5 > div:nth-child(2); 
            */
            var $priceMilhasFacilHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #price_milhasfacil > span:nth-child(2)'); 
            var $priceMilhasFacil = $cardResultParent.find("div.td5 > div:nth-child(1) #price_milhasfacil > span:nth-child(2)"); 
            var vPriceMilhasFacil = tratarValues($priceMilhasFacil.text()); 

            var $priceMilhasFacilHiddenChd = $cardResultParent.find("div.td5 > div:nth-child(2) #price_milhasfacil > span.price-milhasfacil.hidden"); 
            var $priceMilhasFacilChd = $cardResultParent.find("div.td5 > div:nth-child(2) #price_milhasfacil > span:nth-child(2)"); 
            var vPriceMilhasFacilChd = tratarValues($priceMilhasFacilChd.text()); 

            var $earnMoneyHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #earn-money > span.earn-money.hidden'); 
            var $earnMoney = $cardResultParent.find('div.td5 > div:nth-child(1) #earn-money > span:nth-child(2)'); 
            var vEarnMoney = tratarValues($earnMoney.text()); 

            var $earnMoneyHiddenChd = $cardResultParent.find('div.td5 > div:nth-child(2) #earn-money > span.earn-money.hidden'); 
            var $earnMoneyChd = $cardResultParent.find('div.td5 > div:nth-child(2) #earn-money > span:nth-child(2)'); 
            var vEarnMoneyChd = tratarValues($earnMoney.text()); 

            var $inputOperation = $cardResultParent.find('div.view-markup input:checked'); 
                if($inputOperation.length==0){ 
                    $inputOperation =  $(this).parents(".view-markup").find("[id*='[operation]-a']"); 
                    $inputOperation.prop("checked","checked");
                }

            var $inputOperationChd = $cardResultParent.find('div.view-markup-chd input:checked'); 
                if($inputOperationChd.length==0){ 
                    $inputOperationChd =  $(this).parents(".view-markup-chd").find("[id*='[operation_chd]-a']"); 
                    $inputOperationChd.prop("checked","checked"); 
                } 

            var $priceMarkup = $cardResultParent.find('div.view-markup label.price-markup > input[type="text"]'); 
            var vPriceMarkup = tratarValues($priceMarkup.val()); 

            var $priceMarkupChd = $cardResultParent.find('div.view-markup-chd label.price-markup > input[type="text"]'); 
            var vPriceMarkupChd = tratarValues($priceMarkupChd.val()); 


            /**@doc: Aqui testamos se o card é de uma consulta com criança!*/ 
            if($cardResultParent.hasClass("card-children")){ 
                
                /*aqui dentro tenho que verificar se estou clicando na criança ou no adulto!!*/ 
                if(whoAmI == "chd"){ 
                    //console.log("Sou criança!!"); 
                    if($priceMarkupChd.val()=="" || $priceMarkupChd.val()== null || $priceMarkupChd.val()==undefined) 
                        return true; 

                    $priceMilhasFacilChd.text(dataCalcFares.calculatedFares.INV.PRICE_BASE_CHD.format(2, ',', '.')); 
                    $priceMilhasFacilHiddenChd.text(dataCalcFares.calculatedFares.INV.PRICE_BASE_CHD); 

                    $earnMoneyChd.text(dataCalcFares.calculatedFares.EARN_MONEY_CHD.format(2, ',', '.')); 
                    $earnMoneyHiddenChd.text(dataCalcFares.calculatedFares.EARN_MONEY_CHD); 

                    dataCalcFares.calculatedFares.PRICE_MARKUP = 0; 
                    $priceMarkupChd.val("");
                    dataCalcFares.calculatedFares.PRICE_MARKUP_OPERATION = 0; 
                    $inputOperationChd.val("1");
                    
                    $cardResultParent.attr("data-calculated-fares",JSON.stringify(dataCalcFares));  
                    $priceMilhasFacilChd.parents(".price-children").removeClass("active-markup"); 

                    $viewMarkup = $cardResultParent.find(".view-markup-chd"); 
                    //$viewMarkup.find("input").attr("disabled","disabled");

                }else{ 
                    //console.log("Sou Adulto!!"); 
                    if($priceMarkup.val()=="" || $priceMarkup.val()== null || $priceMarkup.val()==undefined) 
                        return true; 
                                               
                   
                    $priceMilhasFacil.text(dataCalcFares.calculatedFares.INV.PRICE_BASE_ADL.format(2, ',', '.')); 
                    $priceMilhasFacilHidden.text(dataCalcFares.calculatedFares.INV.PRICE_BASE_ADL); 

                    $earnMoney.text(dataCalcFares.calculatedFares.EARN_MONEY_ADL.format(2, ',', '.')); 
                    $earnMoneyHidden.text(dataCalcFares.calculatedFares.EARN_MONEY_ADL); 

                    dataCalcFares.calculatedFares.PRICE_MARKUP = 0; 
                    $priceMarkup.val("");
                    dataCalcFares.calculatedFares.PRICE_MARKUP_OPERATION = 0; 
                    $inputOperation.val("1");
                    
                    $cardResultParent.attr("data-calculated-fares",JSON.stringify(dataCalcFares)); 
                    $priceMilhasFacil.parents(".price-children").removeClass("active-markup"); 

                    $viewMarkup = $cardResultParent.find(".view-markup"); 
                    //$viewMarkup.find("input").attr("disabled","disabled");
                } 

            } else { 
                console.log("Sou definitivamente adulto!!"); 
                if($priceMarkup.val()=="" || $priceMarkup.val()== null || $priceMarkup.val()==undefined) 
                    return true; 

                $priceMilhasFacilHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #price_milhasfacil > span.price-milhasfacil.hidden'); 
                $priceMilhasFacil = $cardResultParent.find("div.td5 > div:nth-child(1) #price_milhasfacil > span:nth-child(2)"); 

                vPriceMilhasFacil = tratarValues($priceMilhasFacil.text()); 
                
                $earnMoneyHidden = $cardResultParent.find('div.td5 > div:nth-child(1) #earn-money > span.earn-money.hidden'); 
                $earnMoney = $cardResultParent.find('div.td5 > div.price-milhas-facil-save #earn-money > span:nth-child(2)'); 
                vEarnMoney = tratarValues($earnMoney.text()); 
                
                $inputOperation = $cardResultParent.find('div.view-markup input:checked'); 
                    if($inputOperation.length==0){ 
                        $inputOperation =  $(this).parents(".view-markup").find("[id*='[operation]-a']"); 
                        $inputOperation.prop("checked","checked"); 
                    } 
                
                $priceMarkup = $cardResultParent.find('div.view-markup label.price-markup > input[type="text"]'); 
                vPriceMarkup = tratarValues($priceMarkup.val()); 

                $priceMilhasFacil.text(dataCalcFares.calculatedFares.INV.PRICE_BASE_ADL.format(2, ',', '.')); 
                $priceMilhasFacilHidden.text(dataCalcFares.calculatedFares.INV.PRICE_BASE_ADL); 

                $earnMoney.text(dataCalcFares.calculatedFares.EARN_MONEY_ADL.format(2, ',', '.')); 
                $earnMoneyHidden.text(dataCalcFares.calculatedFares.EARN_MONEY_ADL); 

                dataCalcFares.calculatedFares.PRICE_MARKUP = 0; 
                $priceMarkup.val("");
                dataCalcFares.calculatedFares.PRICE_MARKUP_OPERATION = 0; 
                            
                $cardResultParent.attr("data-calculated-fares",JSON.stringify(dataCalcFares));                 
                $priceMilhasFacil.parents(".td5").removeClass("active-markup");

                $viewMarkup = $cardResultParent.find(".view-markup"); 
                //$viewMarkup.find("input").attr("disabled","disabled"); 
            } 

            function calcMarkupAdl(){}

            function tratarValues(value){ 
                valueReturn = 0; 
                
                if(value=="" || value== null || value==undefined) 
                    return parseFloat(valueReturn); 
                
                valueReturn = parseFloat(value.replace(".","").replace(",",".")); 
                    return valueReturn; 
            } 
            $(".view-markup, .view-markup-chd").css("display","none");//aqui fecha os que tiverem abertos!! 
        }); 
    
         $("label > #allchecked-outbound").on("click", function(event){ 

            /**
                @docRule: Ao Selecionar os Mais baratos tem que apenas selecionar, isto é, dar um checked no checkbox dos cards que 
                NÃO tenha a class [card-expensive].
            */


            /**@doc: Aqui colocamos o atributo cheched no input e a class [card-select-asking"] no card!!*/            
            if($(this).is(':checked')){ 
                $('#list-outbound').find('input[type="checkbox"]').prop("checked",true);             
                $('#list-outbound .card-result').addClass("card-select-asking");
                 $('#checkout-departure > div.cia-not-defined-asking').hide();
            }else{ 
                $('#list-outbound').find('input[type="checkbox"]').prop("checked",false);             
                $('#list-outbound .card-result').removeClass("card-select-asking");                
                $('#checkout-departure > div.cia-not-defined-asking').show();
            } 

            $('#checkout-departure > #group-selected > p').html("<p>Voos de Ida selecionados: "+$('.listOutbound .td1 input:checked').length+ "</p>");            
            
            if($('.listOutbound .td1 input:checked').length ==0 && $('.listInbound .td1 input:checked').length ==0){ 
                $("#checkout-go").attr("disabled","disabled");
                $("#checkout-go").addClass("disabled");
            }
        });

        $("label > #allchecked-inbound").on("click", function(event){ 

            /**@doc: Aqui colocamos o atributo cheched no input e a class [card-select-asking"] no card!!*/            
            if($(this).is(':checked')){ 
                $('#list-inbound').find('input[type="checkbox"]').prop("checked",true);             
                $('#list-inbound .card-result').addClass("card-select-asking");
                $('#checkout-return > div.cia-not-defined-asking').hide();
            }else{ 
                $('#list-inbound').find('input[type="checkbox"]').prop("checked",false);             
                $('#list-inbound .card-result').removeClass("card-select-asking");                
                $('#checkout-return > div.cia-not-defined-asking').show();
            } 

            $('#checkout-return > #group-selected > p').html("<p>Voos de volta selecionados: "+$('.listInbound .td1 input:checked').length+ "</p>");
            
            if($('.listOutbound .td1 input:checked').length ==0 && $('.listInbound .td1 input:checked').length ==0){
                $("#checkout-go").attr("disabled","disabled");
                $("#checkout-go").addClass("disabled");
            }
        });

        /**
            @doc: Aqui manipulamos os eventos click para abrir os detalhes do card da tela: asking_price.php
        */    
        $("div.td1.left.select-card > div > div > a").on('click', function(event){ 
            event.preventDefault(); // evita dupla chamada do label e do input
            event.stopPropagation(); 
            var $cardResultElementParent = $(this).parents(".card-result");//
            var $divCardDetails = $cardResultElementParent.find(".div-card-details");
            var $viewMarkup = $cardResultElementParent.find(".view-markup");
            var $viewMarkupChd = $cardResultElementParent.find(".view-markup-chd");            

            var self = this; // Nunca esqueca de quem vc realmente eh!
            var card = ($cardResultElementParent.hasClass('card-going')) ? '#checkout-departure' : '#checkout-return'; // Descobre se clicou na ida ou na volta

            var listOutbound = $('#list-outbound'); 
            var listInbound = $('#list-inbound'); 
            var selectFlightCallback = function() { 
               return true;
            }; 

            /////////////////////////////////////////////
            // Abre detalhes/////////////////////////////
            $divCardDetails.slideDown(300, function(){ 
                
//console.log("card");
//console.log(card);

                // fecha todas as outras div de detalhe que estejam abertas
                if(card == '#checkout-departure') {
                    listOutbound.find('.div-card-details.show').slideUp(300, function(){
                        this.classList.remove('show');  
                        /**@doc: Aqui tratamos o style do markup porque temos que retirar o botton*/   
                        if($viewMarkup.css("display") == "block"){
                            //sei que é adulto
                            $viewMarkup.attr("style","display: block;");
                        }

                        /**@doc: Aqui tratamos o style do markup porque temos que retirar o botton*/   
                        if($viewMarkupChd.css("display") == "block"){ 
                            //sei que é criança
                            $viewMarkupChd.attr("style","display: block;");
                        }                    
                    });
                } else {
                    listInbound.find('.div-card-details.show').slideUp(300, function(){
                        this.classList.remove('show'); 
                        /**@doc: Aqui tratamos o style do markup porque temos que retirar o botton*/   
                        if($viewMarkup.css("display") == "block"){
                            //sei que é adulto
                            $viewMarkup.attr("style","display: block;");
                        }
                        
                        /**@doc: Aqui tratamos o style do markup porque temos que retirar o botton*/   
                        if($viewMarkupChd.css("display") == "block"){ 
                            //sei que é criança
                            $viewMarkupChd.attr("style","display: block;");
                        } 
                    });
                }

                $(this).addClass("show"); 
                $(card+' > div:nth-child(2)').removeClass('md-show'); 

                //
                if($viewMarkup.css("display") == "block"){
                    //sei que é adulto
                    $viewMarkup.css("bottom","265px");
                    $viewMarkupChd.css("bottom","63px");
                }

                //
                if($viewMarkupChd.css("display") == "block"){
                    //sei que é criança
                    $viewMarkup.css("bottom","95px");
                    $viewMarkupChd.css("bottom","215px");
                }

                // Chama callback para spread de processamento
                return selectFlightCallback.call(self);

            }); // mostra div com detalhes 
        });

        //select-terms
        $("#select-terms").on('click', function(event){

            $("#send-modal").removeProp("disabled");
            $("#send-modal").removeClass("disabled");
            
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
            
            if(ultimoFilho.length == 0)
                return false;
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
            ))+(86400*1000); // D + 1

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

        this.in_array = function(needle, haystack) {
            for(var i in haystack) {
                if(haystack[i] == needle) return true;
            }
            return false;
        };

        /**
            @doc: Esta função pega o css path do elemento
            @reference: <http://stackoverflow.com/posts/2068381/revisions>
            @adapted: Paulo Sérgio. Retirei o espaço em branco do final da varipavel selector. E deve retornar toLowerCase().
        */
        $.fn.getPath = function () {
            var current = $(this);
            var path = new Array();
            var realpath = "BODY";
            while ($(current).prop("tagName") != "BODY") {
                var index = $(current).parent().find($(current).prop("tagName")).index($(current));
                var name = $(current).prop("tagName");
                var selector = " " + name + ":eq(" + index + ")";
                path.push(selector);
                current = $(current).parent();
            }
            while (path.length != 0) {
                realpath += path.pop();
            }
            return realpath.toString().toLowerCase();
        };

        /**
            @doc: Esta função criar um Cookie
            @reference: <http://stackoverflow.com/posts/1599291/revisions>. Acesso em 06 Nov. 2014.
            @adapted: Paulo Sérgio. Retirei o espaço em branco do final da varipavel selector. E deve retornar toLowerCase().
        */
        this.createCookie = function(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            }
            else var expires = "";

            var fixedName = '';
            name = fixedName + name;

            document.cookie = name + "=" + value + expires + "; path=/";
        };
        /**
            @doc: Esta função lê um Cookie
            @reference: <http://stackoverflow.com/posts/1599291/revisions>. Acesso em 06 Nov. 2014.
            @adapted: Paulo Sérgio. Retirei o espaço em branco do final da varipavel selector. E deve retornar toLowerCase().
        */
        this.readCookie = function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        };
        /**
            @doc: Esta função apaga um Cookie
            @reference: <http://stackoverflow.com/posts/1599291/revisions>. Acesso em 06 Nov. 2014.
            @adapted: Paulo Sérgio. Retirei o espaço em branco do final da varipavel selector. E deve retornar toLowerCase().
        */
        this.eraseCookie = function(name) {
            this.createCookie(name, "", -1);
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
        /**
            @doc: Aqui fazemos a validação dos campos e aplicamos a mascar!
        */
        if(!$(this).valid()){}
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
    helpeTour:function(){
        var mainBuscaFacil = this;

        if(!mainBuscaFacil.initQuickTour())
            return false;

        $('#bt-group > button').on("click", function(){ 
            var $quicktour = $(this).parents("div#quicktour");
            var $transbox = $("#transbox");  
            var $btNext = $("#bt-next");
            var $btPrev = $("#bt-prev");  
            var $btStart = $("#bt-start");      
            var strCss = mainBuscaFacil.quickTourGetCss($('#select-flight'));
            $(".transbox").animate(strCss);
            var optionCase = parseInt($(this).attr("optionCase"));
            //var aSteps = ['tour1','tour2','tour3'];
            $transbox.css("display","block");
            
            switch(optionCase){ 
                case 0://start
                    $(this).siblings().removeClass("hide");
                    $(this).addClass("hide");
                    var step = parseInt($(this).attr("step"));//pega o step atual
                    var $section = $quicktour.find("section[step='"+step+"']");
                    $section.hide();//esconde o sectin atual
                    /**Executa a ação do PASSO!*/
                    var sectionId = $section.attr('id');
                    mainBuscaFacil.sectionActionsNext[sectionId]();
                    mainBuscaFacil.sectionActionsPrev[sectionId]();

                    var nextStep = step+1;

                    $section = $quicktour.find("section[step='"+nextStep+"']");
                    var idElement_ref = $section.attr("element_ref");//pega o elemento de referência do passo
                    var $element_ref = $(idElement_ref);

                    var $nextSection = $quicktour.find("section[step='"+nextStep+"']");//pega o próximo passo!
                    $nextSection.show();//mostrar o próximo section

                    $btNext.attr("step",nextStep); 
                    $btPrev.attr("step",nextStep); 
                    $(this).attr("step",nextStep);
                    
                    mainBuscaFacil.quickTourAnime($element_ref,sectionId,$quicktour,null);

                break;
                case 1://Próximo
                    var step = parseInt($(this).attr("step"));//pega o step atual 
                    var $section = $quicktour.find("section[step='"+step+"']"); 

                    $section.hide();//esconde o sectin atual 
                    var sectionId = $section.attr('id'); 
                    var nextStep = step+1; 

                    if(nextStep >= mainBuscaFacil.countSteps){ 
                        nextStep = 0; 
                        $btStart.siblings().addClass("hide"); 
                        $btStart.removeClass("hide"); 
                        $transbox.css("display","none"); 
                    } 

                    /** Executa a ação do PASSO! */ 
                    mainBuscaFacil.sectionActionsNext[sectionId](); 

                    var $nextSection = $quicktour.find("section[step='"+nextStep+"']");//pega o próximo passo! 
                    var idElement_ref = $nextSection.attr("element_ref");//pega o elemento de referência do passo 
                    var $element_ref = $(idElement_ref); 

                    $nextSection.show();//mostrar o próximo section 

                    $(this).attr("step",nextStep); 
                    $btPrev.attr("step",nextStep); 
                    $btStart.attr("step",nextStep); 
                    
                    if(nextStep==2){ 
                        /**@doc: Aqui verificamos se existe a lista de ida e caso não tenha, escondemos os elementos!*/
                        if($('#list-outbound').length == 0) { 
                            $(this).attr("step",1); 
                            $nextSection.hide(); 
                            $transbox.css("display","none");
                            $quicktour.addClass("hide");
                        } else { 
                            $transbox.css("display","block");
                            $quicktour.removeClass("hide");
                        } 
                        
                        $element_ref = $('#list-outbound').find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                        mainBuscaFacil.listOutboundTour = $element_ref;

                    } else if(nextStep==3){ 
                        $element_ref = $('#list-outbound').find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                        mainBuscaFacil.listOutboundTour = $element_ref;
                    } else if(nextStep==4){ 
                        $card = $('#list-outbound').find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                        $element_ref = $card.find(".div-card-details"); 
                     } else if(nextStep==5){ 
                        $("#summary-purchase").removeClass("fix-resumo");
                        $element_ref = $("#checkout-departure > div.slide-caixa");
                        $element_ref.css("height","51px");
                     } 
                     else if(nextStep==6){ 
                        $("#summary-purchase").removeClass("fix-resumo"); 
                        var $transboxClone = $transbox.clone(); 
                        $transboxClone.attr("idTour","transboxClone"); 
                        $transboxClone.attr("id","transboxClone"); 
                        if($("#transboxClone").length==0){ 
                            $transbox.after($transboxClone); 
                        } 

                        var $element_refClone = $element_ref; 
                        $element_ref = $('#checkout-departure > div.slide-caixa'); 
                        $transbox.css("left",$element_refClone.offset().left);
                        $transbox.css("display","none");

                        $element_refClone.css("height","51px");
                        var strCssCloce = mainBuscaFacil.quickTourGetCss($element_refClone);
                        $transboxClone.animate(strCssCloce,500);
                        $element_ref.css("height","51px");
                     } 
                     else if(nextStep==7){ 
                       var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first();
                       $element_ref = $card;                       
                        $("div[idTour='transboxClone']").remove();
                     }  else if(nextStep==8){ 
                        $("#summary-purchase").removeClass("fix-resumo"); 
                        $element_ref = $("#checkout-departure > div.slide-caixa"); 
                        $element_ref.css("z-index",8); 

                        var $transboxClone = $transbox.clone(); 
                        $transboxClone.attr("idTour","transboxClone"); 
                        $transboxClone.attr("id","transboxClone"); 
                        if($("#transboxClone").length==0){ 
                            $transbox.after($transboxClone); 
                        } 

                        var $element_refClone = $('#checkout-return > div.cia-not-defined'); 
                        $transbox.css("left",$element_refClone.offset().left); 

                        $element_refClone.css("height","51px"); 
                        var strCssCloce = mainBuscaFacil.quickTourGetCss($element_refClone); 
                        $transboxClone.animate(strCssCloce,500); 
                        
                     } else if(nextStep==9){ 
                        $("div[idTour='transboxClone']").remove(); 
                        $element_ref = $("#checkout-departure > div.slide-caixa > div > div"); 

                        $element_ref.css("z-index",8); 
                        $element_ref.css("height","57px"); 
                        $element_ref.css("left","355px"); 
                        $("#checkout-departure > div.slide-caixa").css("position","absolute"); 
                        $transbox.css("display","block"); 
                     } else if(nextStep==10){                         
                        
                        $transbox.css("display","none");  
                        $("#checkout-departure > div.slide-caixa").css("z-index",0);
                        $("#checkout-return > div.slide-caixa").css("z-index",0);                           
                        $("#checkout-departure > div.slide-caixa").css("position","relative");  

                        $("#checkout-departure > div.slide-caixa").css("z-index",0);
                        $("#checkout-return > div.slide-caixa").css("z-index",0);     
                     } 
                   
                   mainBuscaFacil.quickTourAnime($element_ref,sectionId,$quicktour,null); 
                break; 
                case 2://Voltar
                    var step = parseInt($(this).attr("step"));//pega o step atual 
                    var $section = $quicktour.find("section[step='"+step+"']"); 
                    var $prevSection; 
                    $section.hide();//esconde o sectin atual 
                    /**Executa a ação do PASSO!*/ 
                    var sectionId = $section.attr('id'); 

                    var prevStep = step-1; 
                    if(prevStep == 0){ 
                        $btStart.siblings().addClass("hide"); 
                        $btStart.removeClass("hide"); 
                        $quicktour.animate({top:5,left:5},2000); 
                        $prevSection = $quicktour.find("section[step='"+prevStep+"']");//pega o próximo passo! 
                        $prevSection.show();//mostrar o próximo section 
                        $transbox.css("display","none"); 

                        $(this).attr("step",prevStep); 
                        $btNext.attr("step",prevStep); 
                        $btStart.attr("step",prevStep); 

                        return true; 
                    } 

                   // mainBuscaFacil.sectionActionsNext[sectionId](); 
                    mainBuscaFacil.sectionActionsPrev[sectionId](); 

                    $prevSection = $quicktour.find("section[step='"+prevStep+"']");//pega o próximo passo! 

                    var idElement_ref = $prevSection.attr("element_ref");//pega o elemento de referência do passo 
                    var $element_ref = $(idElement_ref); 

                    $prevSection.show();//mostrar o próximo section 

                    $(this).attr("step",prevStep); 
                    $btNext.attr("step",prevStep); 
                    $btStart.attr("step",prevStep); 
                    if(prevStep==2){ 
                         /**@doc: Aqui verificamos se existe a lista de ida e caso não tenha, escondemos os elementos!*/
                          if($('#list-outbound').length == 0) { 
                            $(this).attr("step",1); 
                            $nextSection.hide(); 
                            $transbox.css("display","none");
                            $quicktour.addClass("hide"); 
                         } else{ 
                            $transbox.css("display","block"); 
                            $quicktour.removeClass("hide"); 
                         } 
                        $element_ref = $('#list-outbound').find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                        mainBuscaFacil.listOutboundTour = $element_ref;

                     } else if(prevStep==3){ 
                        $element_ref = $('#list-outbound').find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                        $element_ref.css("height","80px"); 
                        mainBuscaFacil.listOutboundTour = $element_ref; 
                    } else if(prevStep==4){ 
                        $card = $('#list-outbound').find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                        $element_ref = $card.find(".div-card-details"); 
                        $("div[idTour='transboxClone']").remove();
                     } else if(prevStep==5){ 
                        $("#summary-purchase").removeClass("fix-resumo");
                        $element_ref = $("#checkout-departure > div.slide-caixa");
                        $element_ref.css("height","51px");
                     }else if(prevStep==6){ 
                       $("#summary-purchase").removeClass("fix-resumo"); 
                        var $transboxClone = $transbox.clone(); 
                        $transboxClone.attr("idTour","transboxClone"); 
                        $transboxClone.attr("id","transboxClone"); 
                        if($("#transboxClone").length==0){ 
                            $transbox.after($transboxClone); 
                        } 

                        var $element_refClone = $element_ref; 
                        $element_ref = $('#checkout-departure > div.slide-caixa'); 
                        $transbox.css("left",$element_refClone.offset().left);
                        $transbox.css("display","none");

                        $element_refClone.css("height","51px");
                        var strCssCloce = mainBuscaFacil.quickTourGetCss($element_refClone);
                        $transboxClone.animate(strCssCloce,500);
                        $element_ref.css("height","51px");
                     } else if(prevStep==7){ 
                       var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first();
                       $element_ref = $card;                       
                        $("div[idTour='transboxClone']").remove();
                     }  else if(prevStep==8){ 
                        $("#summary-purchase").removeClass("fix-resumo");
                        $element_ref = $('#checkout-departure > div.slide-caixa');
                        $element_ref = ($element_ref.length==1)?$element_ref:$('#checkout-return > div.div.cia-not-defined');
                     } else if(prevStep==9){ 
                        $("div[idTour='transboxClone']").remove();
                        $element_ref = $("#checkout-departure > div.slide-caixa");

                        $element_ref.css("z-index",8);
                        $element_ref.css("height","57px");
                        $element_ref.css("left","355px");
                        $("#checkout-departure > div.slide-caixa").css("position","absolute"); 
                        $transbox.css("display","block");                        
                     } else if(prevStep==10){ 
                        $transbox.css("display","none");  
                        $("#checkout-departure > div.slide-caixa").css("z-index",0);
                        $("#checkout-return > div.slide-caixa").css("z-index",0);                           
                        $("#checkout-departure > div.slide-caixa").css("position","relative");  

                        $("#checkout-departure > div.slide-caixa").css("z-index",0);
                        $("#checkout-return > div.slide-caixa").css("z-index",0);                                        
                     }

                     mainBuscaFacil.quickTourAnime($element_ref,prevStep,$quicktour,null);                    

                break;
                default:;
            }
        });

        $('#bt-close > span').on("click", function(){            
            /**
                @doc: Aqui definimos que o usuário ao fechar o turorial significa que ele já teve um acesso então será quickTour = true;
            */
            mainBuscaFacil.createCookie("quickTour","true",30);
            document.location.reload(true);

        });

        $("#menu-quick-tour").on("click", function(event){ 
            var $quicktour = $(document).find("div#quicktour"); 
            var $transbox = $("#transbox"); 
           
            if($('#list-flights > div[class="wrapper"]').length == 0){ 
                var $listFlightsWrapper = $('<div class="wrapper" style="padding: 50px 0; position:relative; height: 1655px;"><img src="/static/img/bem-vindo-interface.png" alt=""></div>');

                $("#list-flights").html(""); 
                $("#list-flights").append($listFlightsWrapper);
            } 

            $quicktour.show(); 
            var strCssQuicktour = mainBuscaFacil.quickTourGetCss($quicktour,1);  
            $('html, body').animate({scrollTop:strCssQuicktour.top-100}, 3000); 
            
            mainBuscaFacil.createCookie("quickTour","false",30); 
            mainBuscaFacil.monitorElementQuickTour(event); 
        });

    } ,
    quickTourGetCss:function($element,option){
        var mainBuscaFacil = this;
        var trCss={};

        option = (option==undefined)?0:option; 
        if($element != undefined && $element.length > 0){ 
            var paddingTop = parseInt($element.css("padding-top").replace("px")); 
            var paddingBottom = parseInt($element.css("padding-bottom").replace("px")); 
            switch(option){ 
                case 0: 
                    trCss.width = parseInt(($element.width())); 
                    trCss.height = parseInt(($element.height())); 
                    trCss.left = parseInt($element.offset().left-8); 
                    trCss.top = parseInt($element.offset().top-8); 
                    trCss.padding = mainBuscaFacil.trataCss($element.css("padding"),5); 
                    trCss.margin = $element.css("margin"); 
                break; 
                case 1://O elemtno é o $quicktour; 
                    trCss.left = parseInt($element.offset().left); 
                    trCss.top = parseInt($element.offset().top+paddingTop+paddingBottom); 
                break; 
                default:;
            }
        }else{ 
            trCss.width = 2; 
            trCss.height = 2; 
            trCss.left = 0; 
            trCss.top = 0; 
            trCss.margin = "10px"; 
        } 
        return trCss;
    },
    quickTourAnime:function($element_ref,sectionId,$quicktour,option){
        var mainBuscaFacil = this;
        //var $quicktour = $bt_section.parents("div#quicktour");
        var $transbox = $("#transbox"); 
        /**Pega os atributos do elemento a ser explicado pelo passa!*/
        var strCss = mainBuscaFacil.quickTourGetCss($element_ref);
        /**Pega os atributos do elemento do quicktour!*/
        var strCssParent = mainBuscaFacil.quickTourGetCss($quicktour,1);  

        if(!jQuery.isEmptyObject(mainBuscaFacil.objStepCss[sectionId])){
            strCssParent = mainBuscaFacil.objStepCss[sectionId]; 
            strCssParent.top = strCss.top+strCss.height+11; 
            strCssParent.left = strCss.left; 
        }else{ 
            strCssParent.top = strCss.top+strCss.height+11; 
            strCssParent.left = strCss.left;  
        } 
        
        $quicktour.animate(strCssParent,500);
        $transbox.animate(strCss,500);
        $('html, body').animate({scrollTop:strCss.top-200}, 500);
    },
    trataCss:function(strCss,iNumber){
        var strCssReturn = '';
        var aStrCss = strCss.split(" ");

        $.each(aStrCss,function(k,value){
            value = parseFloat(value.replace("px",''));
            value += iNumber;
            strCssReturn += value+'px ';
        });

        return strCssReturn;
    },
    initQuickTour:function(dataTourJSON){
        var mainBuscaFacil = this; 
        var result = false; 
        var $body = $("body"); 
        var $quicktour = $("#quicktour"); 
        var $transbox = $("#transbox"); 
        var locationLink = window.location.href.split("/"); 
        var page = locationLink[(locationLink.length-1)];
        var useTour;
         var aIdsElementTour = [
                "bt-next",
                "bt-prev",
                "bt-start",
                "bt-menu-user",
                "menu-quick-tour",
                "quicktour",
                "transbox",
                "body div:eq(1) button:eq(0) span:eq(0)"
            ]; 

        if(mainBuscaFacil.readCookie("quickTour") == null){
            mainBuscaFacil.createCookie("quickTour","false",30);
        }


        /**
            @doc: A variável [mainBuscaFacil.aIdsElementTour] com tem um array que reune os id's e seletores do elementos que são
            monitorados pelo sistema de turorial. O usuário só poderá clicar nos elementos contidos no array, caso contrário o sistema
            mostrará um alert de confirmação para o usuário sair do tour ou pemancer.
        */
        mainBuscaFacil.aIdsElementTour = (mainBuscaFacil.aIdsElementTour == undefined 
                                            || mainBuscaFacil.aIdsElementTour == null
                                            || mainBuscaFacil.aIdsElementTour.length==0
                                         )
                                            ? aIdsElementTour
                                            : mainBuscaFacil.aIdsElementTour;

        var dataTourJSONDefault = [{
            "TOUR_01":[
                {"LINK":"index.html"},
                {"SETTING":{
                    "ELEMENT":{
                        "STEPS":{"element":"<h2>","attr":{"class":"h2Tour"}},
                        "TEXT_BODY":{"element":"<div>","attr":{}},
                        "STEPS_BODY":{"element":"<section>","attr":{}},
                        "TRANSBOX":{
                                        "ELEMENT":"<div id='transbox'>",
                                        "STYLE":""
                                    },
                        "QUICKTOUR":{
                                        "ELEMENT":"<div id='quicktour'>"+
                                                        "<button id='bt-close' class='right' optioncase='0' step='0'><span>X</span></button>"+
                                                        "<section id='bt-group' class='clearfix'>"+
                                                            "<button id='bt-next' class='nextTour right hide' optioncase='1' step='0'></button>"+
                                                            "<button id='bt-prev' class='prev2 right hide' optioncase='2' step='0'></button>"+
                                                            "<button id='bt-start' class='nextStart right' optioncase='0' step='0'>Iniciar</button>"+
                                                        "</section>"+
                                                    "</div>",
                                        "STYLE":""
                    }},
                    "STYLE":"",
                    "MENU":"#menu-user"
                }},
                {"TYPE":"tour"},//Podendo ser Tour, Tutorial, Fluxo
                {"STEPS":[
                    {                        
                        /** Passo Start */
                        "attrs":{"id":"tourStep0","class":"tourStep inicio-tour"},
                        "title":"Bem vindo ao tutorial de uso da Interface Milhas Fácil!",
                        "body":"<p>Siga os passos indicados em nosso tutorial e aprenda os novos recursos da interface. Você pode fechar o processo em qualquer passo.</p>",
                        "element_ref":"#body",
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){ },
                        "actionPrev":function(){ }
                    },
                    {                           
                        /** Passo 1 */
                        "attrs":{"id":"tourStep1","class":"hide clearfix tourStep1"},
                        "title":"Área de busca de voos",
                        "body":'<p>Aqui você poderá definir os critérios de sua busca. Escolha:</p>' +
                                '<ul class="left li-tour" style="margin:0 238px 0 15px">' + 
                                   '<li>A origem do seu voo;</li>' + 
                                   '<li>O destino;</li>' + 
                                   '<li>A data de ida e volta;</li>' +
                               '</ul>' + 
                               '<ul class="left li-tour">' + 
                                   '<li>A origem do seu voo;</li>' + 
                                   '<li>O destino;</li>' + 
                                   '<li>A data de ida e volta;</li>' +
                               '</ul>',
                        "element_ref":"#wrapper",
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){
                            /**
                                @doc: Aqui no comportamento do passo 1 ida (actionNext), o sistema tem que preencher os dados de pesquisa
                                e clicar no botão [buscar voo].
                            */
                            var speed = 1000;
                            var numInterval;

                            if(mainBuscaFacil.listOutboundTour==null){ 

                                $("#flag-company").find("input[type='checkbox']").prop("checked",true);
                                var now = new Date();
                                var nextWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate()+5);

                                $("#flight-type-normal").prop("checked",true);

                                $("#select-flight").val("São Paulo - Todos Aeroportos - (SAO)");
                                $("#flight-destination").val("Brasília - (BSB)");

                                $("#arrival").val("SAO");
                                $("#departure").val("Recife - (BSB)");

                                $("#flight-departure-date").val(now.getDate()+"/"+now.getMonth()+"/"+now.getFullYear());
                                $("#flight-arrival-date").val(nextWeek.getDate()+"/"+nextWeek.getMonth()+"/"+nextWeek.getFullYear());

                                $("#flight-adults").val(1); 
                                $("#flight-children").val(0);
                                /**
                                    @doc: adiciona temporariamente o id do botão buscar voo na lista de ID's do tutorial 
                                    Assim o click realizado pelo trigger não é percebido
                                */
                                mainBuscaFacil.aIdsElementTour.push($("#bt-search").attr("id"));
                                $("#bt-search").trigger("click"); 
                                /**
                                    @doc: Aqui, usamos a função setTimeout() para verificar se a pesquisa foi realizada.
                                */
                                numInterval = setTimeout(verificarList,speed); 

                                /**
                                    @doc: remove o último elemento do array (.splice()).
                                    Deixando o botão buscar voo fora da lista de lementos clicaveis do turorial.
                                */
                                mainBuscaFacil.aIdsElementTour.splice(mainBuscaFacil.aIdsElementTour.length-1, 1, "bt-search");

                            }else{ 
                                mainBuscaFacil.listOutboundTour=$("#list-outbound"); 
                            } 

                            function verificarList(){ 
                                /**
                                    @doc: Aqui, testamos para verificar se a pesquisa foi realizada e para isso usamos a class [modal-active].
                                    O intuito é ficar testando com a função setTimeout() até a pesquisa terminar.
                                */ 
                                if($('body').hasClass('modal-active')){ 
                                    numInterval = setTimeout(verificarList,speed); 
                                }else{ 
                                    $("#bt-next").click(); 
                                    mainBuscaFacil.listOutboundTour=$("#list-outbound"); 
                                } 
                            } 
                        }, 
                        "actionPrev":function(){ } 
                    },
                    {   
                        /** Passo 2 */
                        "attrs":{"id":"tourStep2","class":"clearfix hide tourStep2"},
                        "title":"Card do voo",
                        "body":'<p>Esta área apresenta o voo e suas principais características. Tais quais:</p>' +
                                '<ul class="left li-tour" style="margin:0 238px 0 15px">' + 
                                   '<li>Companhia aérea;</li>' + 
                                   '<li>Número do voo;</li>' + 
                                   '<li>Local e horário de partida;</li>' +
                                   '<li>Duração do voo</li>' +
                               '</ul>' + 
                               '<ul class="left li-tour">' + 
                                   '<li>Local e horário de chegada;</li>' + 
                                   '<li>Número de paradas;</li>' + 
                                   '<li>Preço da Companhia;</li>' +
                                   '<li>Preço do Milhas Fácil;</li>' +
                                   '<li>Economia pela diferença do preço da Cia. para o do Milhas Fácil.</li>' +
                               '</ul>',
                        "element_ref":"#list-outbound",
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){
                            /**
                                @doc: Aqui no comportamento do passo 2 ida (actionNext), o sistema tem que apenas preparar algumas funções 
                                para o passo 3. Deixando prontas para serem usadas no passo 3.
                            */
                            var speed = 2000;
                            var numInterval;                         
                            $transbox.css("display","none");
                            var $card = mainBuscaFacil.listOutboundTour;

                            /**
                                @doc: Aqui instânciamos as funções necessárias para o passo 3.
                                Veja bem, serão usadas no passo 3. Sendo vincular ao um evento e disparada quando o card for clicado.
                            */
                            function getDivCardDetailsP3($card){ 
                                var $element_ref = $card.find(".div-card-details"); 
                                    var sectionId = 3; 
                                    $transbox.css("display","block"); 
                                    $element_ref.css("height","145px"); 
                                    /**
                                        @doc: Aqui, definimos um atributo [directClick] como true para sabermos que o card foi clicado diretamente nele.
                                        Assim temos um flag para monitorar o click no elemento e caso o usuário clicar no botão próximo e card tem que mostrar 
                                        os detalhes também.
                                    */
                                    $card.find("label[class='cf']").attr("directClick",true); 
                                    $("#bt-next").click();
                                    mainBuscaFacil.quickTourAnime($element_ref,sectionId,$quicktour,null); 
                            } 
                            /**
                                @doc: Aqui instância um evento [clickTour] necessárias para o passo 3. 
                                Veja bem, será usadas no passo 3. 
                                O objetivo de fazer com o .on() é que assim temos como retirar o evento do elemento com o .unbind();  
                                Com isso não poluimos o evento click do elemento $(".cf"). 
                            */
                            $card.on("clickTour", function(){ 
                                getDivCardDetailsP3($card); 
                            }); 

                           $card.click(function(){ 
                              $card.trigger("clickTour"); 
                           }); 
                        } ,
                        "actionPrev":function(){ }
                    },
                    {   
                        /** Passo 3 Ida*/
                        "attrs":{"id":"tourStep3","class":"tourStep hide tourStep2"},
                        "title":"Card do voo",
                        "body":"<p>AGORA CLIQUE NESTE VOO PARA SELECIONÁ-LO.</p>", 
                        "element_ref":"#direct-flight", 
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){ 
                            var speed = 2000; 
                            var numInterval; 
                            var $card = mainBuscaFacil.listOutboundTour;                            
                            var $cf = $card.find("label[class='cf']"); 
                            /**
                                @doc: Aqui testamos o atributo [directClick] para verificar se o click foi disparado pelo próprio card.
                                Caso o usuário clicou no card o 
                            */
                            if($cf.attr("directClick")==false || $cf.attr("directClick") == undefined){ 
                                $card.find("label[class='cf']").trigger("click"); 
                            }

                            var $element_ref = $card.find(".div-card-details");
                            $element_ref.css("height","145px");  
                            var sectionId=4; 
                            mainBuscaFacil.quickTourAnime($element_ref,sectionId,$quicktour,null); 



                        },
                        "actionPrev":function(){
                            /** Passo 3 Volta */ 
                            $transbox.css("display","none");  
                        }
                    },
                    {   
                        /** Passo 4 */
                        "attrs":{"id":"tourStep4","class":"hide tourStep2"},
                        "title":"Área de descrição completa do Card do voo",
                        "body":'<p>Sempre que você clicar em um voo, aparecerá automaticamente a sua descrição completa com os seguintes dados:</p>' +
                                '<ul class="left li-tour" style="margin:0 238px 0 15px">' + 
                                   '<li>Companhia aérea;</li>' + 
                                   '<li>Número do voo;</li>' + 
                                   '<li>Número e tipo de paradas;</li>' +
                                   '<li>Taxa de embarque;</li>' +
                               '</ul>' + 
                               '<ul class="left li-tour">' + 
                                   '<li>Quantidade de milhas;</li>' + 
                                   '<li>Descritivo do trajeto do voo;</li>' + 
                                   '<li>Horários;</li>' +
                                   '<li>Conexões;</li>' +
                                   '<li>Esperas.</li>' +
                               '</ul>',
                        "element_ref":".slide-caixa",                        
                        "objStepCss":{
                            /**
                                @doc: Neste caso não foi definido um seletor padrão porque será pego dinâmicamente!
                            */
                        },//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){ },
                        "actionPrev":function(){ 
                            var speed = 2000; 
                            var numInterval; 

                            var $card = mainBuscaFacil.listOutboundTour;//.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first();  
                            function getDivCardDetailsP4($card){ 
                                $card.find("label[class='cf']").trigger("click"); 

                                var $element_ref = $card; 
                                if($element_ref.length==1){ 
                                    var sectionId=3; 
                                    $transbox.css("display","none"); 
                                    var newTopElementRef = $element_ref.offset().top+parseInt($element_ref.css("height").replace("px", " ")); 
                                    $quicktour.css("top",newTopElementRef+"px"); 
                                    $("#bt-next[step='"+sectionId+"']").click(); 
                                    mainBuscaFacil.quickTourAnime($element_ref,sectionId,$quicktour,null); 
                                } 
                            } 
                            var $cf = $card.find("label[class='cf']"); 
                            /**
                                @doc: Aqui testamos o atributo [directClick] para verificar se o click foi disparado pelo próprio card.
                                Caso o usuário clicou no card o 
                            */
                            if($cf.attr("directClick")==false || $cf.attr("directClick") == undefined){ 
                                getDivCardDetailsP4($card); 
                            }
                        } 
                    }, 
                    { 
                        /** Passo 5 */
                        "attrs":{"id":"tourStep5","class":"hide tourStep3"},
                        "title":"Resumo do pedido, sua Seleção",
                        "body":"<p>Esta área separa os voo que você escolheu para ida e para volta. Ao selecionar um voo da tabela, o “slot” respectivo será preenchido. </p>" +
                               "<p>Assim depois de fazer suas escolhas, você poderá:</p>" + 
                               '<ul class="left li-tour">' + 
                                   '<li>Iniciar emissão;</li>' + 
                                   '<li>Conferir valores totais;</li>' + 
                                   '<li>Ir para o card selecionado;</li>' +
                                   '<li>Excluir voo selecionado;</li>' +
                               '</ul>',
                        "element_ref":"#summary-purchase > #checkout-departure",
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){
                            var $checkoutciaNotDefined = $("#checkout-return > div.cia-not-defined");
                            $checkoutciaNotDefined.css("z-index",7);

                            if($("#flight-type-normal").prop("checked")){ 
                                mainBuscaFacil.listInboundTour = $('#list-inbound'); 
                                var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                                
                                $('#checkout-return > div.cia-not-defined > span').bind("clickTour_p6",function(){ 
                                    /** 
                                        @doc: Aqui temos que fazer com que o quicktour vá para o primeiro card de volta que compense! 
                                    */  
                                    var $element_ref = $card; 
                                    if($element_ref.length==1){ 
                                        var sectionId = 6; 
                                        $("#bt-next[step='"+sectionId+"']").click(); 
                                        mainBuscaFacil.quickTourAnime($element_ref,sectionId,$quicktour,null); 
                                        $transbox.css("display","none"); 
                                    } 
                                }); 

                                var indElem = mainBuscaFacil.aIdsElementTour.indexOf("body main:eq(0) section:eq(0) div:eq(0) div:eq(6) div:eq(0) div:eq(9) div:eq(0) span:eq(0)"); 
                                if(indElem < 0){ 
                                    mainBuscaFacil.aIdsElementTour.push("body main:eq(0) section:eq(0) div:eq(0) div:eq(6) div:eq(0) div:eq(9) div:eq(0) span:eq(0)"); 
                                    $('#checkout-return > div.cia-not-defined > span').attr("id","body main:eq(0) section:eq(0) div:eq(0) div:eq(6) div:eq(0) div:eq(9) div:eq(0) span:eq(0)" ); 

                                    mainBuscaFacil.aIdsElementTour.push("body main:eq(0) section:eq(0) div:eq(0) div:eq(6) div:eq(0) div:eq(9) div:eq(0)"); 
                                    $('#checkout-return > div.cia-not-defined').attr("id","body main:eq(0) section:eq(0) div:eq(0) div:eq(6) div:eq(0) div:eq(9) div:eq(0)" ); 

                                    mainBuscaFacil.aIdsElementTour.push("checkout-return"); 
                                } 

                                $('#checkout-return > div.cia-not-defined > span').bind("click", function(){ 
                                   $('#checkout-return > div.cia-not-defined > span').trigger("clickTour_p6"); 
                                }); 



                            /**
                                @doc: Aqui retiramos o evento [clickTour] do elemento com o .unbind();
                                O intuito é que o trecho de código relativo a este evento seja descartado.
                            */
                            $card.unbind("clickTour"); 
                            } 
                        }, 
                        "actionPrev":function(){ 
                            var $checkoutciaNotDefined = $("#checkout-return > div.cia-not-defined");
                            $checkoutciaNotDefined.css("z-index",0);
                        }
                    },
                    { 
                        /** Passo 6 */ 
                        "attrs":{"id":"tourStep6","class":"tourStep hide tourStep6"}, 
                        "title":"Resumo do pedido, selecionar voo da volta", 
                        "body":"<p>AGORA SELECIONE O VOO DA VOLTA CLICANDO NO BOTÃO:  “Selecione o voo de volta” e depois clique em um voo da tabela</p>", 
                        "element_ref":"#checkout-return > div.cia-not-defined", 
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo! 
                        "actionNext":function(){ 
                            var $checkoutciaNotDefined = $("#checkout-return > div.cia-not-defined"); 
                            $checkoutciaNotDefined.css("z-index",0); 
                            $transbox.css("display","none"); 
                            mainBuscaFacil.listInboundTour = $('#list-inbound'); 

                            var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first();
                            $card.on("clickTour_p7",function(){ 
                                var sectionId = 7; 
                                $transbox.css("display","block"); 
                                /**
                                    @doc: Aqui, definimos um atributo [directClick] como true para sabermos que o card foi clicado diretamente nele.
                                    Assim temos um flag para monitorar o click no elemento e caso o usuário clicar no botão próximo e card tem que mostrar 
                                    os detalhes também.
                                */
                                $card.find("label[class='cf']").attr("directClick",true); 
                                $("#bt-next[step='"+sectionId+"']").click();                                 
                            }); 

                            $card.click(function(){ 
                                $card.trigger("clickTour_p7"); 
                            });                            
                        },
                        "actionPrev":function(){   
                            $transbox.css("display","none"); 
                            mainBuscaFacil.listInboundTour = $('#list-inbound'); 
                            var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                            /** 
                                @doc: Aqui preparamos as funções que serão usadas no passo 7, veja bem, será usada no passo 7. 
                            */ 
                            $card.on("clickTour_p7",function(){ 
                                var sectionId = 7; 
                                $transbox.css("display","block"); 
                                /** 
                                    @doc: Aqui, definimos um atributo [directClick] como true para sabermos que o card foi clicado diretamente nele. 
                                    Assim temos um flag para monitorar o click no elemento e caso o usuário clicar no botão próximo e card tem que mostrar 
                                    os detalhes também. 
                                */ 
                                $card.find("label[class='cf']").attr("directClick",true); 
                                $("#bt-next[step='"+sectionId+"']").click(); 
                            }); 

                            $card.click(function(){ 
                                $card.trigger("clickTour_p7"); 
                            }); 
                        }
                    },
                    {   
                        /** Passo 7 */
                        "attrs":{"id":"tourStep7","class":"tourStep hide tourStep2", "style":"padding-bottom: 20px;"},
                        "title":"Card do voo",
                        "body":"<p>AGORA CLIQUE NESTE VOO PARA SELECIONÁ-LO.</p>",
                        "element_ref":"#summary-purchase > #checkout-retrun",
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){  
                            var $checkoutciaNotDefined = $("#checkout-return > div.cia-not-defined"); 
                            $checkoutciaNotDefined.css("z-index",8); 

                            var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                             $card.unbind("clickTour_p7"); 

                            $("#summary-purchase").removeClass("fix-resumo");
                            $element_ref = $("#checkout-departure > div.slide-caixa");

                            $element_ref.css("z-index",8);

                            $("#summary-purchase").removeClass("fix-resumo"); 
                            var $transboxClone = $transbox.clone(); 
                            $transboxClone.attr("idTour","transboxClone"); 
                            $transboxClone.attr("id","transboxClone"); 
                            if($("#transboxClone").length==0){
                                $transbox.after($transboxClone); 
                            }

                            var $element_refClone = $('#checkout-return > div.cia-not-defined');
                            $transbox.css("left",$element_refClone.offset().left);

                            $element_refClone.css("height","51px");
                            var strCssCloce = mainBuscaFacil.quickTourGetCss($element_refClone);
                            $transboxClone.animate(strCssCloce,500);

                            /**
                                @doc: remove os últimos elemento do array (.splice()).
                                Deixando o botão selecionar voo de volta fora da lista de lementos clicaveis do turorial.
                            */ 

                            var $cf = $card.find("label[class='cf']"); 
                            /**
                                @doc: Aqui testamos o atributo [directClick] para verificar se o click foi disparado pelo próprio card.
                                Caso o usuário clicou no card.
                            */
                            if($cf.attr("directClick")==false || $cf.attr("directClick") == undefined){  
                               $cf.click(); 
                            } 

                        
                        },
                        "actionPrev":function(){ 

                            $("#summary-purchase").removeClass("fix-resumo");
                            $element_ref = $("#checkout-departure > div.slide-caixa");

                            $element_ref.css("z-index",8);
                            $element_ref.hover();

                            $("#summary-purchase").removeClass("fix-resumo");
                            var $transboxClone = $transbox.clone();
                            $transboxClone.attr("idTour","transboxClone");
                            $transboxClone.attr("id","transboxClone");
                            if($("#transboxClone").length==0){
                                $transbox.after($transboxClone);
                            }

                            var $element_refClone = $('#checkout-return > div.cia-not-defined');
                            $transbox.css("left",$element_refClone.offset().left);

                            $element_refClone.css("height","51px");
                            var strCssCloce = mainBuscaFacil.quickTourGetCss($element_refClone);
                            $transboxClone.animate(strCssCloce,500); 
                        }
                    },
                    {   
                        /** Passo 8 */
                        "attrs":{"id":"tourStep8","class":"tourStep hide tourStep8"}, 
                        "title":"Resumo do pedido, Opções de pagamento", 
                        "body":"<p>Após selecionados os voos de ida e volta, você poderá conferir o valor total do seu pedido já ajustado pelo número de passageiros e taxas, clicando em: Ver opções de pagamento</p>" + 
                               "<p style='margin-top:20px'>AGORA CLIQUE NO BOTÃO OPÇÃO DE PAGAMENTO.</p>", 
                        "element_ref":"#summary-purchase > #checkout-retrun", 
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo! 
                        "actionNext":function(){ 
                            /** 
                                @doc: Aqui adcionamos o botão [bt-opt-pay] a lista de elementos clicáveis. 
                                E os elementos de fechar o modal de opções de Pagamento. 
                            */ 
                            var indElem = mainBuscaFacil.aIdsElementTour.indexOf("bt-opt-pay"); 
                            if(indElem < 0 ){ 
                                mainBuscaFacil.aIdsElementTour.push("bt-opt-pay"); 
                                mainBuscaFacil.aIdsElementTour.push("md-block-pagamento > div.md-title > a"); 
                                $("#md-block-pagamento > div.md-title > a").attr("id","md-block-pagamento > div.md-title > a"); 
                                mainBuscaFacil.aIdsElementTour.push("md-block-pagamento > div.md-title"); 
                                $("#md-block-pagamento > div.md-title").attr("id","md-block-pagamento > div.md-title"); 
                                mainBuscaFacil.aIdsElementTour.push("md-block-pagamento"); 
                            } 
                            $("#bt-opt-pay").click(); 
                            /**
                                @doc: Aqui retiramos o evento [clickTour] do elemento com o .unbind();
                                O intuito é que o trecho de código relativo a este evento seja descartado.
                            */
                            var $card = mainBuscaFacil.listOutboundTour;;//.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first();
                            $card.unbind("clickTour"); 
                        },
                        "actionPrev":function(){  
                            var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                            $("#transboxClone").remove(); 
                            var $cf = $card.find("label[class='cf']"); 

                            $card.unbind("clickTour_p7"); 

                            function getDivCardDetailsP9($card){ 
                                $card.find("label[class='cf']").trigger("click"); 

                                var $element_ref = $card; 
                                if($element_ref.length==1){ 
                                    var sectionId=7; 
                                    $transbox.css("display","none"); 
                                    $element_ref.css("height","80px"); 
                                    var newTopElementRef = $element_ref.offset().top+parseInt($element_ref.css("height").replace("px", " ")); 
                                    $quicktour.css("top",newTopElementRef+"px"); 
                                    $("#bt-next[step='"+sectionId+"']").click(); 
                                    mainBuscaFacil.quickTourAnime($element_ref,sectionId,$quicktour,null); 
                                }else{ 
                                   setTimeout(getDivCardDetailsP9($card),speed); 
                                } 
                            } 
                            getDivCardDetailsP9($card); 
                        }
                    },
                    {   
                        
                        /** Passo 9 */
                        "attrs":{"id":"tourStep9","class":"tourStep hide tourStep8 "},
                        "title":"Resumo do pedido, Ver novamente a ficha ou excluir voo",
                        "body":"<p>Se você tiver a necessidade de rever o Card do seu voo na tabela, você poderá acessa-lo rapidamente clicando no botão: <br /> Ver voo. Você poderá também desmarcar um voo indesejado clicando no botão: Excluir</p>",
                        "element_ref":"",
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){ },
                        "actionPrev":function(){ 
                            var $card = mainBuscaFacil.listInboundTour.find(".card-result-header > div").filter(":not(.card-expensive-adl)").first(); 
                             $card.unbind("clickTour_p7"); 

                            $("#summary-purchase").removeClass("fix-resumo");
                            $element_ref = $("#checkout-departure > div.slide-caixa");

                            $element_ref.css("z-index",8);

                            $("#summary-purchase").removeClass("fix-resumo"); 
                            var $transboxClone = $transbox.clone(); 
                            $transboxClone.attr("idTour","transboxClone"); 
                            $transboxClone.attr("id","transboxClone"); 
                            if($("#transboxClone").length==0){
                                $transbox.after($transboxClone); 
                            }

                            var $element_refClone = $('#checkout-return > div.slide-caixa');
                            $transbox.css("left",$element_refClone.offset().left);

                            $element_refClone.css("height","51px");
                            var strCssCloce = mainBuscaFacil.quickTourGetCss($element_refClone);
                            $transboxClone.animate(strCssCloce,500);
                        }
                    },
                    {                           
                        /** Passo 10 */
                        "attrs":{"id":"tourStep10","class":"tourStep hide tourStep8"},
                        "title":"Parabéns, você acabou de concluir nosso tutorial",
                        "body":"<p>Você poderá revê-lo clicando no botão reiniciar</p>",
                        "element_ref":"#wrapper",
                        "objStepCss":{},//Objeto para inicio padrão da animação do passo!
                        "actionNext":function(){
                            $('#bt-close > span').click();                            
                            //$transbox.css("display","none");
                        },
                        "actionPrev":function(){ }
                    }
                ]}
            ],
            "TOUR_02":{},
            "TOUR_03":{}
        }];

        /**
            @doc: a variável [dataTourJSON] contém os dados do tutorial. Caso não seja definida ou nula, o sistema deve usar a variável [dataTourJSONDefault].
        */
        dataTourJSON = (dataTourJSON == undefined || dataTourJSON == null || dataTourJSON == "")? dataTourJSONDefault : dataTourJSON;

        $.each(dataTourJSON,function(k,objTour){            
            $.each(objTour,function(kT,objTourProps){
                $.each(objTourProps,function(kTP,objProp){        
                    var key = mainBuscaFacil.object_keys(objProp); 
                    if(key[0]=="LINK"){
                        if(objProp.LINK==page){
                            useTour = objTourProps;
                            result = true;//significa que achou o tutorial para o link da página;
                        }
                    }

                    if(result && key[0]=="SETTING"){
                        //Cria os elementos: $quicktour e $transbox
                        if($quicktour.length == 0){
                            $quicktour = $(objProp.SETTING.ELEMENT.QUICKTOUR.ELEMENT);
                            $quicktour.attr("style",objProp.SETTING.ELEMENT.QUICKTOUR.STYLE);
                            $quicktour.attr("class",useTour[2].TYPE);
                            $body.prepend($quicktour);
                            $transbox = $(objProp.SETTING.ELEMENT.TRANSBOX.ELEMENT);
                            $transbox.attr("style",objProp.SETTING.ELEMENT.TRANSBOX.STYLE);

                            $body.prepend($transbox);
                            /**
                                @doc: Aqui testamos se o usuário já acessou o tutorial e não mostramos os elementos.
                                [mainBuscaFacil.readCookie("quickTour") == "true"]: Significa que o tutotial já foi acessado uma vez pelo usuário!
                                Então, não é para monitorar os elementos clicáveis e não mostrar o tutorial ao carregar a página.
                            */
                            if(mainBuscaFacil.readCookie("quickTour") == "true"){
                                $transbox.css("display","none");
                                $quicktour.css("display","none");
                            }
                        }
                        var menu = $(objProp.SETTING.MENU);
                        menu.prepend("<li><a id='menu-quick-tour'>Quick Tour</a></li>");
                    }                    

                    /** @doc: Colocar os passos no elemento: $quicktour */
                    if(result && key[0]=="STEPS"){ 
                        mainBuscaFacil.countSteps = objProp.STEPS.length;

                        $.each(objProp.STEPS,function(kOP,oStep){

                            oStep.attrs.step=kOP;
                            oStep.attrs.id= oStep.attrs.id + "_" +kOP;
                            oStep.attrs.element_ref=oStep.element_ref;
                            mainBuscaFacil.aIdsElementTour.push(oStep.attrs.id);
                            var $section = $(useTour[1].SETTING.ELEMENT.STEPS_BODY.element, oStep.attrs);
                            var sectionId = oStep.attrs.id;
                            mainBuscaFacil.sectionActionsNext[sectionId]  = oStep.actionNext;
                            mainBuscaFacil.sectionActionsPrev[sectionId]  = oStep.actionPrev;
                            mainBuscaFacil.objStepCss[sectionId]  = oStep.objStepCss;

                            $section.html(oStep.body);
                            $quicktour.find("#bt-close").after($section);

                            var $title = $(useTour[1].SETTING.ELEMENT.STEPS.element, useTour[1].SETTING.ELEMENT.STEPS.attr);
                            $title.html(oStep.title);
                            $section.prepend($title);

                        });
                    }
                    //if(result) return false;//para o loop
                });                
                if(result) return false;//para o loop
            });            
            if(result) return false;//para o loop
        });
           

        $(document).on("click",function(event){
            /** @doc: Aqui testamos se tem a necessidade de monitorar os elementos da página em questão. */
            if(result)
                mainBuscaFacil.monitorElementQuickTour(event);

            
        });

        return result;
    },
    viewMarkup:function() {
        $('.info-ver').on('click', function (){
            //console.log('clicou'); 
            $(this).parent().find('.view-markup').css({'display':'block'});
            // $('html, body').animate({scrollTop: $('.view-markup').offset().top-175 }, 1000);  
        });    
    },

    monitorElementQuickTour:function(event){         
        var mainBuscaFacil = this;
        
        /**
            @doc: Aqui testamos se o usuário já acessou o tutorial e não mostramos os elementos (cookei).
            Neste caso só será monitorado os elemento clicáveis no caso de o usuário quiser refazer o
            tour ou se ele não tenha feito ao menos uma primeira vez.
        */

        if(mainBuscaFacil.readCookie("quickTour") == "true" || mainBuscaFacil.readCookie("quickTour") == null)
            return true;

        /**
            @doc:A função abaixo monitora os cliques e filtra os elementos com um array que reune os id's e seletores do elementos que são
            monitorados pelo sistema de turorial. O usuário só poderá clicar nos elementos contidos no array, caso contrário o sistema
            mostrará um alert de confirmação para o usuário sair do tour ou permancer.
        */
            var $element = $(event.target);
            var $cardOut;
            var $cardIn;
            var indElem;            
            /**
                @doc:Este if faz as seguintes verificações:
                1) Se existe a lista de ida: (mainBuscaFacil.listOutboundTour != null);
                2) Se já existe o id no array de id's [mainBuscaFacil.aIdsElementTour.indexOf($cardOut.attr("id"))];
                3) Se o elemento clicado é um filho do card de ida [$(event.target).parents("label[id='"+$cardOut.attr("id")+"']")];
            */
            if(mainBuscaFacil.listOutboundTour != null){ 
                $cardOut = mainBuscaFacil.listOutboundTour.find("label");   
                var indCard = mainBuscaFacil.aIdsElementTour.indexOf($cardOut.attr("id")); 
                if($cardOut.attr("id") != undefined && indCard < 0)
                    mainBuscaFacil.aIdsElementTour.push($cardOut.attr("id"));

                var parent = $(event.target).parents("label[id='"+$cardOut.attr("id")+"']");//representa o elemento [class='cf']
                if(parent.length>0){ 
                    $element.attr("id",$cardOut.attr("id")+" > "+$element.get(0).tagName); 
                    var indElem = mainBuscaFacil.aIdsElementTour.indexOf($element.attr("id")); 
                    if(indElem<0){ 
                        mainBuscaFacil.aIdsElementTour.push($element.attr("id")); 
                    } 
                }else{ 
                    $cardOut.children(".cf").unbind("click");
                    $cardOut.children(".cf").click(function(){
                        return true;
                    });
                } 
            } 

            /**
                @doc:São as mesmas verificações feitas na Ida, mas agora na lista de volta.
            */
            if(mainBuscaFacil.listInboundTour != null){ 
                $cardIn = mainBuscaFacil.listInboundTour.find("label"); 
                var indCard = mainBuscaFacil.aIdsElementTour.indexOf($cardIn.attr("id")); 
                if($cardIn.attr("id") != undefined && indCard < 0) 
                    mainBuscaFacil.aIdsElementTour.push($cardIn.attr("id")); 

                var parent = $(event.target).parents("label[id='"+$cardIn.attr("id")+"']");//representa o elemento [class='cf']
                if(parent.length>0){ 
                    $element.attr("id",$cardIn.attr("id")+" > "+$element.get(0).tagName); 
                    var indElem = mainBuscaFacil.aIdsElementTour.indexOf($element.attr("id")); 
                    if(indElem<0){ 
                        mainBuscaFacil.aIdsElementTour.push($element.attr("id")); 
                    } 
                }else{ 
                    parent.click();
                }
            } 

            /**
                @doc: Aqui são tratados os casos ao qual apenas o id do elemento não é suficiênte para alcançar os elementos!
            */
           var idCase = $element.getPath();
           switch(idCase){
            case 'body div:eq(1) button:eq(0) span:eq(0)'://É o span filho do botão [bt-close].
                indElem = mainBuscaFacil.aIdsElementTour.indexOf(idCase);               
                $element.attr("id",idCase);
                if(indElem<0){ 
                    mainBuscaFacil.aIdsElementTour.push(idCase); 
                }
            break; 
            /**@doc: É o botão Ver Voo de Ida*/
            case 'body main:eq(0) section:eq(0) div:eq(0) div:eq(6) div:eq(0) div:eq(2) div:eq(1) div:eq(0) div:eq(0) div:eq(1) a:eq(0)'://É o <a> Ver voo.
                indElem = mainBuscaFacil.aIdsElementTour.indexOf(idCase);               
                $element.attr("id",idCase);
                if(indElem<0){ 
                    mainBuscaFacil.aIdsElementTour.push(idCase); 
                }
            break;
            /**@doc: É o botão Excluir Voo de Ida*/
            case 'body main:eq(0) section:eq(0) div:eq(0) div:eq(6) div:eq(0) div:eq(2) div:eq(1) div:eq(0) div:eq(0) div:eq(1) a:eq(1)'://É o span filho do botão [bt-close].
                indElem = mainBuscaFacil.aIdsElementTour.indexOf(idCase);               
                $element.attr("id",idCase);
                if(indElem<0){ 
                    mainBuscaFacil.aIdsElementTour.push(idCase); 
                }
            break;
            default:;
           }

            if(!mainBuscaFacil.in_array($element.attr("id"), mainBuscaFacil.aIdsElementTour)){ 
                var sairTour = confirm("Você clicou numa área fora do Tutorial! \n Deseja sair? \n ");
                if(sairTour == true){
                    document.location.reload(true);
                }else{
                    /**@doc: Remove o evento do elemento porque ele não consta como um elemento do turorial!*/
                    $element.unbind("click").undelegate();
                    event.stopPropagation();
                    event.stopImmediatePropagation();
                }
            }
    },
    sendModal:function(){ 
        var searchFlightTemplate = ''; 
        var mainBuscaFacil = this; 
        $(document).on('click', '#send-modal', function(event){ 
            event.preventDefault(); 
            var dataFormGenerateQuote = $("form#form-generate-quote").serializeArray(); 

            $.ajax({ 
                type: 'POST', 
                data: dataFormGenerateQuote, 
                url: 'ajax/asking_price.ajx.php?', 
                dataType: 'json', 
            }).done(function (response){ 
                if(response.status==200){ 
                   mainBuscaFacil.sendModalCallback(); 
                }else{ 
                    /**@doc: Tratar os eventos aqui! */ 
                } 
            }); 

            return false;
        });
    },
    sendModalCallback: function(searchFlightTemplate,response){},
    calcFaresMarkup: function(vPriceMilhasFacilDefault,vPriceMilhasFacil,vPriceMarkup,operation){ 
    
       
    }
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
    mainBuscaFacil.viewMarkup();




    //alert
    //console.log("%cEssa é uma ferramenta para desenvolvedores. Não copie ou cole dados aqui, isso poderá comprometer a segurança da sua conta e dos seus dados!%c ©Copyright 2014 | Milhas Fácil", "color: red; font-size: x-large","color: #6fb020; font-size: large");
});


