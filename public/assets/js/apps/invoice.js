$(function () {
    $(".search-invoice").on("keyup", function () {
        var value = $(this).val().toLowerCase();
        $(".invoice-users li").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
    });
});

$("#custom-invoice > #printableArea:first").show();

// Print
$(".print-page").click(function () {
    var mode = "iframe"; //popup
    var close = mode == "popup";
    var options = {
        mode: mode,
        popClose: close,
    };
    $("div#printableArea:first").printArea(options);
});

var $btns = $(".listing-user").click(function () {
    var getDataInvoiceAttr = $(this).attr("data-invoice-id");
    var getParentDiv = $(this).parents(".invoice-application");
    var getParentInvListContainer = $(this).parents(".app-invoice");

    var $el = $("." + this.id).show();
    $("#custom-invoice > div").not($el).hide();
    var setInvoiceNumber = getParentDiv
        .find(".invoice-inner-part .invoice-number")
        .text("#" + getDataInvoiceAttr);

    var hideTheNonSelectedContent = $(this)
        .parents(".invoice-application")
        .find(".chat-not-selected")
        .hide()
        .siblings(".invoiceing-box")
        .show();
    var showInvContentSection = getParentDiv
        .find(".invoice-inner-part #custom-invoice")
        .css("display", "block");
    $btns.removeClass("bg-light");
    $(this).addClass("bg-light");

    if ($(".invoiceing-box").css("display") == "block") {
        $(".right-part.invoice-box").css("height", "100%");
    }

    // Print
    $(".print-page").click(function () {
        var mode = "iframe"; //popup
        var close = mode == "popup";
        var options = {
            mode: mode,
            popClose: close,
        };
        $("div#printableArea").printArea(options);
    });

    var myDiv = document.getElementsByClassName("invoice-inner-part")[0];
    myDiv.scrollTop = 0;


});