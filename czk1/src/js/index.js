$(function(){
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function (res) {
            console.log(res)
        },
        error: function (error) {
            console.warn(error)
        }
    })
})