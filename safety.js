$(function(){
    // 切换密码体制
    $('.safety ul').on('click',function(e) {
        console.log(e.target);
        var caesar = document.getElementsByTagName('li')[0];
        var playfair = document.getElementsByTagName('li')[1];
        var hill = document.getElementsByTagName('li')[2];
        if(e.target===caesar){
            caesar.className = 'current';
            playfair.className = '';
            hill.className = '';
            $('.caesar').css('display','block');
            $('.playfair').css('display','none');
            $('.hill').css('display','none');            
        }else if(e.target===playfair){
            playfair.className = 'current';
            caesar.className = '';
            hill.className = '';
            $('.caesar').css('display','none');
            $('.playfair').css('display','block');
            $('.hill').css('display','none');            
        }else if(e.target===hill){
            hill.className = 'current';
            playfair.className = '';
            caesar.className = '';
            $('.caesar').css('display','none');
            $('.playfair').css('display','none');
            $('.hill').css('display','block');            
        };    
    });
    // 清除input框的内容
    $('.clear').on('click',function() {
        $('#caesarOpen')[0].value = '';
    });
})