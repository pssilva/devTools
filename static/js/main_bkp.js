/*   Prototyping into Number object
     Formata numero para BRL Real (R$)
    ========================================================================== */
Number.prototype.numberFormat = function(c, d, t){
    var n = this, 
        c = isNaN(c = Math.abs(c)) ? 2 : c, 
        d = d == undefined ? "." : d, 
        t = t == undefined ? "," : t, 
        s = n < 0 ? "-" : "", 
        i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
        j = (j = i.length) > 3 ? j % 3 : 0;
    
    return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

/* ==========================================================================
    Main scripts
   ========================================================================== */

$(document).on('click', '.card-flight-more-info', function(event) {
    event.stopPropagation();
    event.preventDefault();
    $(this).parents('.card-result').toggleClass('more-info');
});


/*  Ordering - Sort
   ========================================================================== */

$('#main-result-sort').on('click', 'button', function (event) {
    event.stopPropagation();
    event.preventDefault();

    var self = this;
    var $sortButton = $(this);

    $sortButton.siblings().removeClass('up down');

    if($sortButton.hasClass('up')) {
        $sortButton.removeClass('up').addClass('down');
        
        outBoundList.sort(self.id, { order: "desc" });
        inBoundList.sort(self.id, { order: "desc" });

        return false;
    } else if($sortButton.hasClass('down')) {
        $sortButton.removeClass('down').addClass('up');

        outBoundList.sort(self.id, { order: "asc" });
        inBoundList.sort(self.id, { order: "asc" });

        return false;
    }else{
        $sortButton.addClass('up');

        outBoundList.sort(self.id, { order: "asc" });
        inBoundList.sort(self.id, { order: "asc" });

        return false
    }

});

$(document).ready(function(){
    $("#flight-origin").focus();
});

$('#main-result-filter').on('click', 'button', function (event){
    event.stopPropagation();
    event.preventDefault();
    $(this).toggleClass('active').siblings().removeClass('active');

    var filterBy = $(this).children('span.label').text()

    if(filterBy == 'Todos'){
        inBoundList.filter();
        outBoundList.filter();
        return false;
    }
    if(filterBy == 'Mais baratos!'){
        inBoundList.sort('price-best', { order: "asc" });
        outBoundList.sort('price-best', { order: "asc" });

        inBoundList.show(1,5);
        outBoundList.show(1,5);

        inBoundList.page = 200;
        outBoundList.page = 200;
        return false;
    }

    inBoundList.filter(function(item) {
        return (item.values().sortCia == filterBy);//return true or false
    });
    outBoundList.filter(function(item) {
        return (item.values().sortCia == filterBy);//return true or false
    });
    return false;
});


/* ==========================================================================
    Modernizr Placeholder
   ========================================================================== */

$(document).ready(function(){

if(!Modernizr.input.placeholder){

    $('[placeholder]').focus(function() {
      var input = $(this);
      if (input.val() == input.attr('placeholder')) {
        input.val('');
        input.removeClass('placeholder');
      }
    }).blur(function() {
      var input = $(this);
      if (input.val() == '' || input.val() == input.attr('placeholder')) {
        input.addClass('placeholder');
        input.val(input.attr('placeholder'));
      }
    }).blur();
    $('[placeholder]').parents('form').submit(function() {
      $(this).find('[placeholder]').each(function() {
        var input = $(this);
        if (input.val() == input.attr('placeholder')) {
          input.val('');
        }
      })
    });

}

});

/*  Toggles
   ========================================================================== */

$('#toggle-shortcuts').on('click', function (event){
    event.stopPropagation();
    event.preventDefault();
    $('#flight-shortcuts, #toggle-shortcuts').toggleClass('active');
});

$('#teste-menu').on('click', function (event){
    event.stopPropagation();
    event.preventDefault();
    $('.submenu').toggleClass('active');
});

$('#flight-toggle-sort').on('click', function (event){
    event.stopPropagation();
    event.preventDefault();
    $('#main-result-sort-holder, #flight-toggle-sort').toggleClass('active');
});


/*  Result - Header
   ========================================================================== */

(function (){
    var $checkoutHeader = $('#checkout-header'),
        $mainSearchContainer = $('#main-search'),
        $escolha = $('#escolha'),
        headerOffset = $escolha.offset().top;

    $(window).scroll(function (event){
        if($(document).scrollTop() >= headerOffset && !$checkoutHeader.hasClass('checkout-active')) {
            $escolha.addClass('fixed');
            return false;
        }
        $escolha.removeClass('fixed');
    });
})(window);


/*  Search - Show/hide one direction
   ========================================================================== */

(function (){
    $('#flight-type-one-direction').on('click', function (event) {
        if($(this)[0].checked) {
            $('#flight-arrival-date-holder').addClass('hide');
        }
    });

    $('#flight-type-normal').on('click', function (event) {
        $('#flight-arrival-date-holder').removeClass('hide');
    });
})(window);

/* Show/Hide Cartão de Crédito */


(function (){
    $(document).on('click', '#select-form-pagamento-boleto', function (event) {
        if($(this)[0].checked) $('#dados-cartao').fadeOut(500);
    });

    $(document).on('click', '#select-form-pagamento-cartao', function (event) {
        $('#dados-cartao').fadeIn('500');
        $("#numcartao").focus();

    });

})(window);
jQuery.validator.addMethod(
    "datenormal",
    function(value, element) {
        var check = false;
        var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
        if( re.test(value)){
            var adata = value.split('/');
            var mm = parseInt(adata[0],10); // was gg (giorno / day)
            var dd = parseInt(adata[1],10); // was mm (mese / month)
            var yyyy = parseInt(adata[2],10); // was aaaa (anno / year)
            var xdata = new Date(yyyy,mm-1,dd);
            if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
                //check = (yyyy < (new Date().getFullYear()+20));
                check = true;
            else
                check = false;
        } else
            check = false;
        return this.optional(element) || check;
    }, 
    "Insira uma data válida"
);


/*  Checkout - Show/hide
   ========================================================================== */
var checkoutForm = undefined;

var step1Callback = function(response){
    // Render JSON from server with handlebars            
    var template = Handlebars.compile(checkoutTemplateCC);
    var html    = template(response);
    $("#step1").html(html);

    //// Validate ////
    jQuery.validator.messages.required = "Favor preencher este campo.";
    jQuery.validator.messages.email = "Este email está incorreto.";
    checkoutForm = $("form#msform");
    checkoutForm.validate({
        focusInvalid: true,
        onkeyup: false,
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

    $("select").change(function() {
        $( "select option:selected" ).each(function() {
            $('.form-parcelas').find("input[type='radio']").prop('checked', false);
        });
    })


    //////// Validação e Formatação de data /////////

    jQuery.validator.addMethod(
        "datevalid",
        function(value, element) {
            var check = false;
            var re = /^\d{1,2}\/\d{4}$/;
            if( re.test(value)){
                var adata = value.split('/');
                var mm = parseInt(adata[0],10); // was gg (giorno / day)
                var yyyy = parseInt(adata[1],10); // was aaaa (anno / year)
                var xdata = new Date(yyyy,mm-1);
                if ((xdata.getFullYear() == yyyy) && (xdata.getMonth() == mm-1))
                    check = (yyyy < (new Date().getFullYear()+20));
                else
                    check = false;
            };
            return this.optional(element) || check;
        }, 
        "Insira uma data válida"
    );
    
    
    ///// Mascaras /////

    $(function($){
        $.mask.definitions['~']='[0-9-]';
        $(".data").mask("99/99/9999");
        $("#cep").mask("99999-999");
        $(".telefone").mask("~~~~-~~~~");
        $(".cpf").mask("~~~.~~~.~~~-~~");
        $(".validade").mask("~~/~~~~");
        $('.celular').focusout(function(){
            var phone, element;
            element = $(this);
            element.unmask();
            phone = element.val().replace(/\D/g, '');
                if(phone.length > 10) {
                    element.mask("99999-999?9");
                } else {
                    element.mask("9999-9999?9");
                }
        }).trigger('focusout');
    });

    $("#numcartao, #codcartao").keypress(function(event) {
        var tecla = (window.event) ? event.keyCode : event.which;
        if ((tecla > 47 && tecla < 58) || tecla == 9) return true;
        else {
            if (tecla != 8) return false;
            else return true;
        }
    });


}
var checkoutTemplateCC = '';
var outBoundID = '';
var inBoundID = '';
$('#checkout-go').click(function (event){
    event.stopPropagation();
    event.preventDefault();
    if(!$(this).hasClass('checkout-go-active')){ // Initiante checkout process
        var outBoundID = $("input[type='radio'][name='card-flight-ida']:checked").val();
        var inBoundID = $("input[type='radio'][name='card-flight-volta']:checked").val();

        $.ajax({
            type: 'POST',
            data: {
                outBoundFlightID: outBoundID,
                inBoundFlightID: inBoundID
            },
            url: 'ajax/checkout_start.json?action=start',
            dataType: 'json'
        }).done(function (response){
            if(checkoutTemplateCC == ''){ // get template on-the-fly only on the first resquest
                $.get('static/js/tpl/checkout.handlebars',function(data){ 
                    checkoutTemplateCC = data;
                    step1Callback(response);
                },'html');
            } else {
                step1Callback(response);
            }
        });
    } else {
        $( "#checkout-steps-holder" ).children().removeAttr("style");
        $('.niceform input[type="radio"]').prop('checked', false);
        $(".card-result .card-active").removeClass('card-active');
        $('#checkout-go').prop('disabled', true).addClass("disabled");
        $('#checkout-departure, #checkout-return').children().addClass('inicio-cia');
        $('#checkout-departure, #checkout-return').find('span.checkout-flight-num').text('');
        $('#checkout-departure, #checkout-return').find('span.checkout-flight-origin').text("milhas: " + '');
        $('#checkout-departure, #checkout-return').find('span.checkout-flight-destination').text("Preço: " + ''); 
    }

    $(this).toggleClass('checkout-go-active');
    $('#checkout-header').toggleClass('checkout-active');
});

$(function () {
    if(!$('#checkout-header').hasClass('checkout-active')){
        $('#checkout-go').prop('disabled', true).addClass("disabled");
    };
});

var step3Callback = function(response){
    // Render JSON from server with handlebars            
    var template = Handlebars.compile(checkoutTemplatePax);
    var html    = template(response);
    $("#step3").html(html);

    if ($('#select-form-pagamento-boleto').is(':checked')) {
        $('.identidade').hide();
        $('.tamanho').css("width", "14.9%");
    } else {
       $('.identidade').show();
       $('.ajuste-campo').css("width", "25%");
       $('.tamanho').css("width", "14%");
    }
    //////// Validação e Formatação de campos /////////
    jQuery(function($){
         $.mask.definitions['~']='[0-9-]';
         $(".data").mask("99/99/9999");
         $("#cep").mask("99999-999");
         $(".telefone").mask("~~~~-~~~~");
         $(".telefone-dados").mask("~~~~-~~~~");
         $(".cpf").mask("~~~.~~~.~~~-~~");
         $('.celular-passageiro').focusout(function(){
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

         $('.celular').focusout(function(){
            var phone, element;
            element = $(this);
            element.unmask();
            phone = element.val().replace(/\D/g, '');
                if(phone.length > 10) {
                    element.mask("99999-999?9");
                } else {
                    element.mask("9999-9999?9");
                }
            }).trigger('focusout');
    });

    jQuery.validator.addMethod(
        "datenormal",
        function(value, element) {
            var check = false;
            var re = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
            if( re.test(value)){
                var adata = value.split('/');
                var mm = parseInt(adata[0],10); // was gg (giorno / day)
                var dd = parseInt(adata[1],10); // was mm (mese / month)
                var yyyy = parseInt(adata[2],10); // was aaaa (anno / year)
                var xdata = new Date(yyyy,mm-1,dd);
                if ( ( xdata.getFullYear() == yyyy ) && ( xdata.getMonth () == mm - 1 ) && ( xdata.getDate() == dd ) )
                    //check = (yyyy < (new Date().getFullYear()+20));
                    check = true;
                else
                    check = false;
            } else
                check = false;
            return this.optional(element) || check;
        }, 
        "Insira uma data válida"
    );

    function verificaNumero(e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            return false;
        }
    }
    $( "#dados-nome, .onfocus" ).focus();
    $(document).ready(function() {
        $(".numero").keypress(verificaNumero);
        $(".ddd").keypress(verificaNumero);
        $(".celular").keypress(verificaNumero);
        $(".telefone").keypress(verificaNumero);
    });
}

var checkoutTemplatePax = '';
$(document).on('click', '#next-step1', function (event){
    console.log('#next-step1');
    outBoundID = $("input[type='radio'][name='card-flight-ida']:checked").val();
    inBoundID = $("input[type='radio'][name='card-flight-volta']:checked").val();

    if(!checkoutForm.valid())
        return false;
    
    $.ajax({
        type: 'POST',
        data: $("form#msform").serialize() + '&' + $.param({outBoundFlightID: outBoundID,inBoundFlightID: inBoundID}),
        url: 'ajax/checkout_step1.json?action=step1',
        dataType: 'json'
    }).done(function (response){
        console.log(response);
        if(checkoutTemplatePax == ''){ // get template on-the-fly only on the first resquest
            $.get('static/js/tpl/checkout2.handlebars',function(data){ 
                checkoutTemplatePax = data;
                step3Callback(response);
            },'html');
        } else {
            step3Callback(response);
        }
    });
});

var checkoutTemplateRevision = '';
$(document).on('click', '#next-step3', function(){
    console.log('#next-step3');
    outBoundID = $("input[type='radio'][name='card-flight-ida']:checked").val();
    inBoundID = $("input[type='radio'][name='card-flight-volta']:checked").val();

    $.ajax({
        type: 'POST',
        data: $("form#msform").serialize() + '&' + $.param({outBoundFlightID: outBoundID,inBoundFlightID: inBoundID}),
        url: 'ajax/checkout_step3.json?action=step3',
        dataType: 'json'
    }).done(function (response){

        if(checkoutTemplateRevision == ''){ // get template on-the-fly only on the first resquest
            $.get('static/js/tpl/checkout3.handlebars',function(data){ 
                checkoutTemplateRevision = data;

                // Render JSON from server with handlebars            
                var template = Handlebars.compile(checkoutTemplateRevision);
                var html    = template(response);
                $("#step5").html(html);
            },'html');
        } else {
            // Render JSON from server with handlebars            
            var template = Handlebars.compile(checkoutTemplateRevision);
            var html    = template(response);
            $("#step5").html(html);
        }
        
    });
});

$(document).on('click', '#next-step5', function(){
    console.log('#next-step5');

    outBoundID = $("input[type='radio'][name='card-flight-ida']:checked").val();
    inBoundID = $("input[type='radio'][name='card-flight-volta']:checked").val();

    $.ajax({
        type: 'POST',
        data: $("form#msform").serialize() + '&' + $.param({outBoundFlightID: outBoundID,inBoundFlightID: inBoundID}),
        url: 'ajax/createOrder.ajx.php?action=step5',
        dataType: 'json'
    }).done(function (response){
        if(response.status==200){
            $("#step6-loading").addClass('hide');
            $("#step6-success").removeClass('hide');
        }else{
            $("#step6-loading").addClass('hide');
            $("#step6-error").html(response.error).removeClass('hide');
        }
    });
});


//// Validate ////

jQuery.validator.messages.required = "Favor preencher este campo.";
jQuery.validator.messages.email = "Este email está incorreto.";
var searchform = $("form#main-form");
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


//////////////////////////////////////////////
// Initiate searchflight templating engine

/*supergloabls for list.js*/
var outBoundList = null;
var inBoundList = null;
var searchFlightTemplate = '';

$('#flight-search').on('click', function (event) {
    event.preventDefault();
    
    
    console.log('searchform.valid()');
    console.log(searchform.valid());
    if(!searchform.valid())
        return false;

    $('body').addClass('modal-active');


    if(searchFlightTemplate == '') // get template on-the-fly only on the first resquest
        $.get('static/js/tpl/searchFlight.handlebars',function(data){ searchFlightTemplate = data},'html');


    $.ajax({
        type: 'POST',
        data: $('form#main-form').serialize(),
        url: 'ajax/search_flight.json',
        dataType: 'json'
    }).done(function (response){
        /*  Render JSON from server with handlebars
        ========================================================================== */

        var template = Handlebars.compile(searchFlightTemplate);
        var html    = template(response.searchData);

        $("#list-flights").html(html).show();
   
    $('body').removeClass('modal-active');

    }).always(function (){
        var options = {
            valueNames: [
                'sortCia',
                'sort-legs',
                'sort-origin',
                'sort-destination',
                'sort-duration',
                'sort-flyer-points',
                'sort-cia-price',
                'sort-milhas-facil-price'
            ],
            listClass: 'listOutbound'
        };

        outBoundList = new List('list-outbound', options);

        options.listClass = 'listInbound';
        inBoundList = new List('list-inbound', options);

        // encerrando o slider
        var api = $.data( $('#slider-id')[0], 'liquidSlider');
        api.stopAutoSlide();
    });

});

/////////////////////////////////////////////////////
//TYPEAHEAD 
var hasValidPnr = {
    origem: false,
    destino: false,
    set: function(key,value){
        this[key] = value;
    }
};

$('.typeahead').typeahead({                              
    name: 'Airport-Iata-Codes', 
    valueKey: 'display_name',
    ttl: 10000,
    limit: 8,                                               
    prefetch: 'static/data/airports_BRA.json',                                             
    template: [                                                                 
        '<p class="airport-iata"><b>{{code}}</b></p>',                              
        '<p class="airport-name">{{name}}</p>',                                      
        '<p class="airport-city">{{city}} - {{state}}</p>'                         
    ].join(''),                                                                 
    engine: Hogan                                                               
});     

$('.typeahead').focus(function (e){
    hasValidPnr.set(e.currentTarget.name,false);
    $("input[name="+e.currentTarget.name+"]").val("");

    if(e.currentTarget.name == 'flight-origin') $('#departure').val("");
    else $('#arrival').val("");
    
});

$('.typeahead').blur(function (e){
    if(!hasValidPnr[e.currentTarget.name]){
        $("input[name="+e.currentTarget.name+"]").val("");

        if(e.currentTarget.name == 'flight-origin') $('#departure').val("");
        else $('#arrival').val("");
    }
});

$('.typeahead').on('typeahead:selected', function (e,datum){
    if(e.currentTarget.name == 'flight-origin')
        $('#departure').val(datum.code);
    else
        $('#arrival').val(datum.code);

    hasValidPnr.set(e.currentTarget.name,true);
});

$('.typeahead').on('typeahead:autocompleted', function (e,datum){
    if(e.currentTarget.name == 'flight-origin')
        $('#departure').val(datum.code);
    else
        $('#arrival').val(datum.code);

    hasValidPnr.set(e.currentTarget.name,true);
});
///////////////////////////////////////////////////////////////////



///////////////////////////////
// DATEPICKER

// SET LOCALES 
;(function($){
    $.fn.datepicker.dates['pt-BR'] = {
        days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
        daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
        daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
        months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: "Hoje",
        clear: "Limpar"
    };
}(jQuery));

// INICIATE BOOTSTRAP-DATEPICKER
var options = {
    format: "dd/mm/yyyy",
    startDate: "d",
    language: "pt-BR",
    orientation: "top auto",
    autoclose: true,
    todayHighlight: true
};

var end = $('#end');
var start = $('#start');

end.datepicker(options);
start.datepicker(options).on('changeDate', function (e){
    var d = new Date();

    end.datepicker('setDate', e.date);
    end.datepicker('setStartDate', e.date);

    if(e.date.toLocaleDateString() == d.toLocaleDateString()){
        $('div#warningSameDay').show();
    }else{
        $('div#warningSameDay').hide();
    }
});

//DATEPICKER FOR DATAUSAGE
var options = {
    format: "dd/mm/yyyy",
    language: "pt-BR",
    orientation: "top auto",
    autoclose: true,
    todayHighlight: true
};

var usageend = $('#usageend');
var usagestart = $('#usagestart');

usageend.datepicker(options);
usagestart.datepicker(options);

//////// Validação e Formatação de campos /////////
jQuery(function($){
     $.mask.definitions['~']='[0-9-]';
     $(".data").mask("99/99/9999");
     $("#cep").mask("99999-999");
     $(".telefone").mask("~~~~-~~~~");
     $(".cpf").mask("~~~.~~~.~~~-~~");
     $('.celular').focusout(function(){
        var phone, element;
        element = $(this);
        element.unmask();
        phone = element.val().replace(/\D/g, '');
            if(phone.length > 10) {
                element.mask("99999-999?9");
            } else {
                element.mask("9999-9999?9");
            }
        }).trigger('focusout');
});



////////// Menu DropDown //////////
var sub = $('.submenu');
var secundary = $('.submenu-secundary');


// Menu superior com engrenagem
sub.hide();
$('.main-config-link').click(function(e){
    e.stopPropagation();
    $(this).parent().find('.submenu').slideToggle(300);
});
$('body').click(function(){
    sub.hide(300);
});

// Submenu do usuário
$('ul.accordion').hide();
$('.submenu li.parent > a').click(function() {
    $('ul.accordion', $(this).parent()).slideToggle('fast', function() {
        $(this).parent().toggleClass('aberto');
    });
    return false;
});

// Menu principal e submenu de markup
secundary.hide();
$('a.secundary-admin').click(function() {
    $(secundary, $(this).parent()).slideToggle('fast', function() {
        $('a.secundary-admin').toggleClass('arrow-secundary');
    });
    return false;
});



////////// Estilo Radio Button ///////

(function($) {

    $.fn.extend({

        // Checkbox radiobutton replace
        styleRadioCheckbox: function(options) {
            // Init
            var $selector = $(this),
                classChecked = options.classChecked,
                classFocus = options.classFocus;

            var check = function($obj) {
                if ($obj.attr("checked")) {
                    $obj.parent().addClass(classChecked);
                } else {
                    $obj.parent().removeClass(classChecked);
                }
            }

            // Estado inicial
            $(document).ready(function() { // Document ready - IE fix
                $selector.each(function() {
                    check($(this));
                });
            });

            // Checkbox

            $selector.filter(".teste").click(function() {
                var name = $(this).attr("name");

                $selector.filter("input[name='"+name+"']").each(function() {
                    check($(this));
                });
            });

            // Radio
            $selector.filter(".radio").click(function() {
                var name = $(this).attr("name");

                $selector.filter("input[name='"+name+"']").each(function() {
                    check($(this));
                });
            });
        }
    });
})(jQuery);
$(".radio").styleRadioCheckbox({
    classChecked:"inputRadioChecked",
});
$(".teste").styleRadioCheckbox({
    classChecked:"inputCheckboxChecked",
});


///////// Sombra no Card e Pegar dados do Voo//////////

$(document).on('click', 'label.cf', function(event) {
    event.stopPropagation();
    event.preventDefault();
    
    if ($(this).hasClass("sovolta")) {
        $(".card-result .card-shadow").removeClass('card-shadow');
        $(this).addClass('card-shadow');
    }else {
        $(".card-result .card-active").removeClass('card-active');
        $(this).addClass('card-active');
    };
        
    $(this).find("input.card-select").attr("checked","checked");

    // controla se tem mínimo 1 escolhido para ativar
    $('#checkout-go').prop('disabled', ($(".card-result input:radio:checked").length < 1)).removeClass('disabled');

    var nVoo = $(this).find('span.card-flight-number').text();
    var cia = $(this).find('span.sortCia').text();
    var origem = $(this).find('span.sort-flyer-points').text();
    var destino = $(this).find('span.milhasfacil').text();
    var inbound = /inbound/g;
    if(inbound.test($(this).attr('for'))){
        $('#checkout-return > div').attr("class","checkout-" + cia.toLowerCase());
        $('#checkout-return').find('span.checkout-flight-num').text(nVoo);
        $('#checkout-return').find('span.checkout-flight-origin').text("milhas: " + origem);
        $('#checkout-return').find('span.checkout-flight-destination').text("Preço: " + destino);
    } else {
        $('#checkout-departure > div').attr("class","checkout-" + cia.toLowerCase());
        $('#checkout-departure').find('span.checkout-flight-num').text(nVoo);
        $('#checkout-departure').find('span.checkout-flight-origin').text("milhas: " + origem);
        $('#checkout-departure').find('span.checkout-flight-destination').text("Preço: " + destino);
    }
});

/////////// Step ///////////

var current_fs, next_fs, previous_fs; 
var left, opacity, scale;
var animating;
$(document).on('click', '.next', function(){
    if(!checkoutForm.valid())
        return false;

    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    if(this.id=='next-step1' && $('#select-form-pagamento-boleto').is(':checked'))
        next_fs = $(this).parent().next().next();

    $("#progressbar dt").eq($(".step-box").index(next_fs)).addClass("active");
    next_fs.show(); 
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        scale = 1 - (1 - now) * 0.2;
        left = (now * 50)+"%";
        opacity = 1 - now;
        current_fs.css({'transform': 'scale('+scale+')'});
        next_fs.css({'left': left, 'opacity': opacity});
      }, 
      duration: 500, 
      complete: function(){
        current_fs.hide();
        animating = false;
      }, 
      easing: 'easeInQuart'

    });
});


$(document).on('click', '.previous', function(){
    if(animating) return false;
    animating = true;

    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    if(this.id=='prev-step1' && $('#select-form-pagamento-boleto').is(':checked'))
        previous_fs = $(this).parent().prev().prev();

    $("#progressbar dt").eq($(".step-box").index(current_fs)).removeClass("active");

    previous_fs.show(); 
    current_fs.animate({opacity: 0}, {
      step: function(now, mx) {
        scale = 0.8 + (1 - now) * 0.2;
        left = ((1-now) * 50)+"%";
        opacity = 1 - now;
        current_fs.css({'left': left});
        previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
      }, 
      duration: 500, 
      complete: function(){
        current_fs.hide();
        animating = false;
      }, 
      easing: 'easeInQuart'
    });
});
$(".submit").click(function(){
    return false;
})

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
            $("#cidade").html(options);
         }
      });
   });
});

$(function(){
    $('#slider-id').liquidSlider({
        autoSlide:true,
        autoeight:false,
        dynamicArrows: false,
    });
});



  $(function() {
     $( "#select-flight" ).autocomplete({
          source: function( request, response ) {
            console.log("request");
            console.log(request);
            console.log("response");
            console.log(response);

            $.ajax({
              url: "static/data/airports_BRA.json",
              dataType: "json",
              data: {
                q: request.term
              },
              success: function( data ) {
               var result=[];
                $.each(data, function(k,obj){
                 var regex = new RegExp("(?=" + request.term.toLowerCase() + ")");
                    if(regex.test(obj.code.toLowerCase()) 
                            || regex.test(obj.name.toLowerCase()) 
                                || regex.test(obj.tokens.toString().toLowerCase())){
                        result.push(obj);
                    }
                });
                response(result);
                //console.log("data");
                //console.log(data);
              }
            });
          },
          minLength: 2,
          select: function( event, ui ) {
      //        console.log("ui");
            // console.log(ui);
            $( "#select-flight" ).val( ui.item.city + " ("+ui.item.code+")");
            // log( ui.item ?
            //   "Selected: " + ui.item.value + " aka " + ui.item.id :
            //   "Nothing selected, input was " + this.value );
            //console.log("Selected: " + ui.item.name);
            return false;
          }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
          return $( "<li>" )
            .append( "<a>" + item.city + " (" + item.code + ")</a>" )
            .appendTo( ul );
        };
    

        $( "#flight-destination" ).autocomplete({
          source: function( request, response ) {
            console.log("request");
            console.log(request);
            console.log("response");
            console.log(response);

            $.ajax({
              url: "static/data/airports_BRA.json",
              dataType: "json",
              data: {
                q: request.term
              },
              success: function( data ) {
               var result=[];
                $.each(data, function(k,obj){
                 var regex = new RegExp("(?=" + request.term.toLowerCase() + ")");
                    if(regex.test(obj.code.toLowerCase()) 
                            || regex.test(obj.name.toLowerCase()) 
                                || regex.test(obj.tokens.toString().toLowerCase())){
                        result.push(obj);
                    }
                });
                response(result);
                //console.log("data");
                //console.log(data);
              }
            });
          },
          minLength: 2,
          select: function( event, ui ) {
            //console.log("ui");
            // console.log(ui);
            $( "#flight-destination" ).val( ui.item.city + " ("+ui.item.code+")");
            // log( ui.item ?
            //   "Selected: " + ui.item.value + " aka " + ui.item.id :
            //   "Nothing selected, input was " + this.value );
            //console.log("Selected: " + ui.item.name);
            return false;
          }
        })
        .autocomplete( "instance" )._renderItem = function( ul, item ) {
          return $( "<li>" )
            .append( "<a>" + item.city + " (" + item.code + ")</a>" )
            .appendTo( ul );
        };

        $( "#flight-departure-date" ).datepicker({
          defaultDate: "+1w",
         // changeMonth: true,
          showButtonPanel: true,
          numberOfMonths: 2,
          onClose: function( selectedDate ) {
            $( "#flight-arrival-date" ).datepicker( "option", "minDate", selectedDate );
          }
        });
        
        $( "#flight-arrival-date" ).datepicker({
          defaultDate: "+1w",
          //changeMonth: true,
          showButtonPanel: true,
          numberOfMonths: 2,
          onClose: function( selectedDate ) {
            $( "#flight-departure-date" ).datepicker( "option", "maxDate", selectedDate );
          }
        });
      });