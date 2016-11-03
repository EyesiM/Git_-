$(function(){
    // FE 切换密码体制
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
    // Caesar 密码
    function CaesarAdd(n,code) {
        var allChars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var answer = [];
        var answerString = '';
        // 遍历 code
        code = code.toUpperCase();
        for(var i=0;i<code.length;i++) {
            for(var j=0;j<26;j++){
                if(code[i]===allChars[j]){
                    answer.push(allChars[(j+n)%26]);
                }
            }
        }
        for(var i=0;i<answer.length;i++){
            answerString+= answer[i];
        }
        return answerString;
    }
    // 给页面绑定 Caesar 密码加密
    $('#caesarOpen').on('change',function(){
        var code = $('#caesarOpen')[0].value;
        var answer = CaesarAdd(1,code);
        $('#caesarAnswer').text(answer);
    })
    // 给页面绑定 Caesar 密码解密
    function CaesarRemove(n,code) {
        var allChars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var answer = [];
        var answerString = '';
        // 遍历 code
        code = code.toUpperCase();
        for(var i=0;i<code.length;i++) {
            for(var j=0;j<26;j++){
                if(code[i]===allChars[j]){
                    answer.push(allChars[(j-n)%26]);
                }
            }
        }
        for(var i=0;i<answer.length;i++){
            answerString+= answer[i];
        }
        return answerString;
    }
    $('#caesarPassword').on('change',function(){
        var code = $('#caesarPassword')[0].value;
        var answer = CaesarRemove(1,code);
        $('#caesarCode').text(answer);
    })
    // Playfair 密码

    
})