$(document).ready(function () {
    $('.category').click(function () {
        var lnk = $(this).attr('title');
        var menuBlock = $(".products-checkboxes[title = '" + lnk + "']");
        menuBlock.toggleClass('active');
        $(this).parent().toggleClass('current');
    });

    $.getJSON("data.json", function (data) {
        var checkbox = $('input:checkbox');
        checkbox.removeAttr('checked');

        checkbox.change(function () {
            var result = $('.result');
            result.html('');
            var checked = [];
            $('input:checkbox:checked').each(function () {
                checked.push($(this).val());
            });

            var resArr = [];
            $.each(data, function () {
                if ($.inArray(this.name, checked) != -1) {
                    resArr.push(this);
                }
            });

            var sumProteins = 0;
            var sumFats = 0;
            var sumCarbohydrates = 0;
            var sumCalories = 0;
            $.each(resArr, function () {
                sumProteins = this.proteins + sumProteins;
                sumFats = this.fats + sumFats;
                sumCarbohydrates = this.carbohydrates + sumCarbohydrates;
                sumCalories = this.calories + sumCalories;
                result.append('<tr><td>' + this.name + '</td><td>' + this.proteins + '</td><td>' +
                    this.fats + '</td><td>' + this.carbohydrates + '</td><td>' + this.calories + '</td></tr>');
            });
            result.append('<tr id="sum"><td>' + 'Сумма' + '</td><td>' + sumProteins.toFixed(1) + '</td><td>' +
                sumFats.toFixed(1) + '</td><td>' + sumCarbohydrates.toFixed(1) + '</td><td>' + sumCalories.toFixed() + '</td></tr>');
        });
    });
});