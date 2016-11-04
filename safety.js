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
    $('.clear').on('click',function(e) {
        for(var i=0;i<12;i++){
            if(e.target===$('.clear')[i]) {
                $('.open-password')[i].value = '';                
            }
        }
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
    $('#caesarAdd').on('click',function(){
        if($('#caesarAddKey')[0].value!='' && $('#caesarOpen')[0].value!='') {
            var n = parseInt($('#caesarAddKey')[0].value);
            var code = $('#caesarOpen')[0].value;
            var answer = CaesarAdd(n,code);
            $('#caesarAnswer').text(answer);
        }else {
            alert('密钥或者明文还没输入');
        }
    });
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
                    if((j-n)<0) {
                        key = j-n+26;
                    }else {
                        key= j-n;
                    }
                    console.log(key)
                    answer.push(allChars[key%26]);
                }
            }
        }
        for(var i=0;i<answer.length;i++){
            answerString+= answer[i];
        }
        return answerString;
    }
    $('#caesarRemove').on('click',function(){
        if($('#caesarKey')[0].value!='' && $('#caesarPassword')[0].value!='') {
            var n = parseInt($('#caesarKey')[0].value);
            var code = $('#caesarPassword')[0].value;
            var answer = CaesarRemove(n,code);
            $('#caesarCode').text(answer);
        }else {
            alert('密钥或者密文还没输入');
        }
    });

    // Playfair 密码

    //生成密码表
    function createKey(keychars){
        //字母顺序数组
        var allChars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y'];
        keychars = keychars.toLocaleUpperCase( );
        //变量keychars获取字母在字母顺序表中位置，删除该字母
        for(var i = 0 ;i<keychars.length;i++){
            var index = allChars.indexOf(keychars[i]);
            if (index > -1) {
                allChars.splice(index, 1);
            }
        }
        //将keychar中的字母插入到字母表中
        for(var i = keychars.length-1;i>=0;i--){
            if(keychars[i] == ' '|| keychars[i] == 'Z') {
                continue;
            }
            allChars.unshift(keychars[i]);
        }
        //从第一列将keychars插入至密码表
        var key = new Array();
        for(var i = 0 ; i<5 ; i++){
            key[i] = new Array();
        }
        for(var i = 0; i<5 ; i++) {
            for(var j = 0; j<5 ;j++){
                key[j][i] = allChars[5*i+j];
            }
        }
        console.log(key)
        return key;
    } 
    //整理明文
    function deal_message(mes) {
        var afterDeal = new Array();
        mes = mes.toLocaleUpperCase( );
        for(var i = mes.length-1;i>=0;i--){
            if(mes[i] == ' ') {
                continue;
            }
        }
        for(var i = 0,j = 0;i < mes.length-1;i+=2,j++) {
            if(!mes[i+1]) {
                afterDeal[j] = mes[i] + 'X';
            }else if(mes[i]!=mes[i+1]) {
                afterDeal[j] = mes[i] + mes[i+1];
            }else if(mes[i]==mes[i+1]) {
                afterDeal[j] = mes[i] + 'X';
                i--;
            }
        }
        console.log(afterDeal)
        return afterDeal;
    }
    //输入密钥跟明文输出密文 
    function PlayfairAdd(keyWord,mes) {
        var key = createKey(keyWord);
        var afterDeal = deal_message(mes);
        var codePosition = function(code) {
            for(var i = 0;i < 5;i++) {
                for(var j = 0;j < 5;j++) {
                    if(code == key[i][j]) {
                        return {
                            x : i,
                            y : j
                        };
                    }
                }
            }
        }
        var code1,code2;
        var encodeMes = new Array();
        for(var i = 0,j = 0;i < afterDeal.length; i++,j++) {
            code1 = codePosition(afterDeal[i].split('')[0]);
            code2 = codePosition(afterDeal[i].split('')[1]);
            if(code1.x == code2.x) {
                code1.y++;
                code2.y++;
                encodeMes[j] = key[code1.x][code1.y] + key[code2.x][code2.y];
            }else if(code1.y == code2.y) {
                code1.x++;
                code2.x++;
                encodeMes[j] = key[code1.x][code1.y] + key[code2.x][code2.y];
            }else {
                var flag = code1.y;
                code1.y = code2.y;
                code2.y = flag;
                encodeMes[j] = key[code1.x][code1.y] + key[code2.x][code2.y];
            }
        }
        console.log(encodeMes);
        return encodeMes;
    }
    //传入密钥和密文输出明文
    function PlayfairRemove(keyWord,mes) {
        var key = createKey(keyWord);
        var codePosition = function(code) {
            for(var i = 0;i < 5;i++) {
                for(var j = 0;j < 5;j++) {
                    if(code == key[i][j]) {
                        return {
                            x : i,
                            y : j
                        };
                    }
                }
            }
        }
        var code1,code2;
        var message = new Array();
        for(var i = 0,j = 0;i < mes.length; i++,j++) {
            code1 = codePosition(mes[i].split('')[0]);
            code2 = codePosition(mes[i].split('')[1]);
            if(code1.x == code2.x) {
                code1.y--;
                code2.y--;
                message[j] = key[code1.x][code1.y] + key[code2.x][code2.y];
            }else if(code1.y == code2.y) {
                code1.x--;
                code2.x--;
                message[j] = key[code1.x][code1.y] + key[code2.x][code2.y];
            }else {
                var flag = code1.y;
                code1.y = code2.y;
                code2.y = flag;
                message[j] = key[code1.x][code1.y] + key[code2.x][code2.y];
            }
        }
        console.log(message)
    }
    // 页面绑定 Playfair 加密
    $('#playfairAdd').on('click',function() {
        if($('#playfairOpen')[0].value!='' && $('#playfairKey')[0].value!='') {
            var key = $('#playfairKey')[0].value;
            var code = $('#playfairOpen')[0].value;
            var answer = PlayfairAdd(key,code);
            $('#playfairAanswer').text(answer);
        }else {
            alert('密钥或者明文还没输入');
        }
    });
    
})