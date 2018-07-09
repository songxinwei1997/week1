$(function(){
    $.ajax({
        url: '/api/list',
        dataType: 'json',
        success: function (res) {
            console.log(res)
            if (res.code === 0) {
                var str ='';
                res.data.list.forEach(function (file) {
                    str+=`<li>${file.title}</li>`;
                })
                console.log(str)
            }
        },
        error: function (error) {
            console.warn(error)
        }
    })
})