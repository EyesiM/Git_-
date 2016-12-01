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
        // 字母顺序数组
        var allChars = ['A','B','C','D','E','F','G','H','I/J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
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
                console.log(j);
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
        mes = mes.replace(/\s/g, "");//正则去空
        for(var i = 0,j = 0;i < mes.length;i+=2,j++) {
            if(!mes[i+1]) {
                if(mes[i]==mes[i-1]) {
                    afterDeal[j] = 'X'+mes[i];
                }else{
                    afterDeal[j] = mes[i] + 'K';                    
                }
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
        console.log(key)
        var afterDeal = deal_message(mes);
        var codePosition = function(code) {
            console.log('code&&'+code)
            for(var i = 0;i < 5;i++) {
                for(var j = 0;j < 5;j++) {
                    if(code == key[i][j]||code==key[i][j].split('/')[0]||code==key[i][j].split('/')[1]) {
                        console.log(key[i][j])
                        return {
                            x : j,
                            y : i
                        };
                    }
                }
            }
        }
        var code1,code2;
        var encodeMes = new Array();
        console.log(encodeMes);
        for(var i = 0,j = 0;i < afterDeal.length; i++,j++) {
            code1 = codePosition(afterDeal[i].split('')[0]);
            code2 = codePosition(afterDeal[i].split('')[1]);
            console.log(code1);
            console.log(code2);
            if(code1.x == code2.x) {
                console.log(code2+'行')
                console.log(code1)
                code1.y=(code1.y+1)%5;
                code2.y=(code2.y+1)%5;
                console.log(code1.y+'&&'+code2.y)
                encodeMes[j] = key[code1.y][code1.x] + key[code2.y][code2.x];
            }else if(code1.y == code2.y) {
                console.log(code2+'列')

                if((code1.x+1)==5){
                    code1.x=0;
                }else if((code2.x+1)==5) {
                    code2.x=0;
                }else{
                    code1.x++;
                    code2.x++;
                }
                encodeMes[j] = key[code1.y][code1.x] + key[code2.y][code2.x];
            }else {
                var flag = code1.y;
                code1.y = code2.y;
                code2.y = flag;
                encodeMes[j] = key[code1.y][code1.x] + key[code2.y][code2.x];
            }
        }
        console.log(encodeMes);
        var encodeMesString = '';
        for(i=0;i<encodeMes.length;i++) {
            // if(encodeMes[i].indexOf('I/J',1)>-1){
            //     encodeMes[i] = encodeMes[i].split('/')[0];
            // }
            encodeMesString+=encodeMes[i];                
        }
        return encodeMesString;
    }
    //传入密钥和密文输出明文
    function PlayfairRemove(keyWord,mesString) {
        var key = createKey(keyWord);
        // var mes = deal_message(mes);
        mesString = mesString.toLocaleUpperCase( ); 
        mesString = mesString.replace(/\s/g, "");//正则去空
        var mes = [];
        for(var i=0;i<mesString.length;i+=2) {
            if(i+1!=mesString.length) {
                mes.push(mesString[i]+mesString[i+1]);
            }else {
                mes.push(mesString[i]);
            }
            console.log(mes)
        }
        var codePosition = function(code) {
            console.log('code&&'+code)
            for(var i = 0;i < 5;i++) {
                for(var j = 0;j < 5;j++) {
                    if(code == key[i][j]||code==key[i][j].split('/')[0]||code==key[i][j].split('/')[1]) {
                        console.log(key[i][j])
                        return {
                            x : j,
                            y : i
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
                console.log('同行')
                if(code1.y==0&&code2.y==0) {
                    code1.y=4;
                    code2.y=4;
                }else if(code1.y!=0&&code2.y!=0) {
                    code1.y--;
                    code2.y--;
                }else if(code1.y!=0&&code2.y==0) {
                    code1.y--;
                    code2.y=4;
                }else if(code1.y==0&&code2.y!=0) {
                    code1.y=4;
                    code2.y--;
                }
                message[j] = key[code1.y][code1.x] + key[code2.y][code2.x];
            }else if(code1.y == code2.y) {
                code1.x--;
                code2.x--;
                message[j] = key[code1.y][code1.x] + key[code2.y][code2.x];
            }else {
                var flag = code1.y;
                code1.y = code2.y;
                code2.y = flag;
                message[j] = key[code1.y][code1.x] + key[code2.y][code2.x];
            }
        }
        console.log('message')
        console.log(message);
        var encodeMesString = '';
        for(i=0;i<message.length;i++) {
            encodeMesString+=message[i];
        }
        return encodeMesString;
    }
    // 页面绑定 Playfair 加密
    $('#playfairAdd').on('click',function() {
        if($('#playfairOpen')[0].value!='' && $('#playfairKey')[0].value!='') {
            var key = $('#playfairKey')[0].value;
            var code = $('#playfairOpen')[0].value;
            if(code.indexOf('/',0)>-1) {
                alert("输入的明文含'/'");
            }else {
                var answer = PlayfairAdd(key,code);
                $('#playfairAanswer').text(answer);
            }
        }else {
            alert('密钥或者明文还没输入');
        }
    });
    // 页面绑定 Playfair 解密
    $('#palyfairRemove').on('click',function() {
        if($('#playfairPassword')[0].value!='' && $('#playfairRKey')[0].value!='') {
            var key = $('#playfairRKey')[0].value;
            var code = $('#playfairPassword')[0].value;
            if(code.indexOf('/')>-1) {
                alert("输入的密文含'/'");
            }else{
                var answer = PlayfairRemove(key,code);
                $('#playRemoveA').text(answer);
            }
            
        }else {
            alert('密钥或者明文还没输入');
        }
    });



    // Hill 密码
    var newKey = [[0,0,0],[0,0,0],[0,0,0]];

    //随机生成0到26的数字,3*3矩阵
    function randomCreateKey(){
        var key = new Array;
        for(var i = 0;i<3;i++){
            key[i] = new Array;
            for(var j = 0;j<3;j++){
                key[i][j] = Math.round(Math.random()*100%26)
            }
        }
        var matrix = key;
        // 求逆矩阵
        // var matrix = [[17,17,5],[21,18,21],[2,2,19]];
        // var matrix = [[1,0,1],[2,1,0],[-3,2,-5]];        
        var exKey  = key;
        var detKey = matrix[0][0]*matrix[1][1]*matrix[2][2]-matrix[0][0]*matrix[2][1]*matrix[1][2]+matrix[1][0]*matrix[2][1]*matrix[0][2]-matrix[1][0]*matrix[0][1]*matrix[2][2]+matrix[2][0]*matrix[0][1]*matrix[1][2]-matrix[2][0]*matrix[1][1]*matrix[0][2];
        console.log(detKey);


        // 求逆矩阵

        newKey[0][0] = exKey[1][1]*exKey[2][2]-exKey[2][1]*exKey[1][2];
        newKey[1][0] = (-1) * (exKey[1][0]*exKey[2][2]-exKey[2][0]*exKey[1][2]);
        newKey[2][0] = exKey[1][0]*exKey[2][1]-exKey[2][0]*exKey[1][1];
        newKey[0][1] = (-1) * (exKey[0][1]*exKey[2][2]-exKey[2][1]*exKey[0][2]);
        newKey[1][1] = exKey[0][0]*exKey[2][2]-exKey[2][0]*exKey[0][2];
        newKey[2][1] = (-1) * (exKey[0][0]*exKey[2][1]-exKey[2][0]*exKey[0][1]);
        newKey[0][2] = exKey[0][1]*exKey[1][2]-exKey[1][1]*exKey[0][2];
        newKey[1][2] = (-1) * (exKey[0][0]*exKey[1][2]-exKey[1][0]*exKey[0][2]);
        newKey[2][2] = exKey[0][0]*exKey[1][1]-exKey[1][0]*exKey[0][1];            

        var adj = exKey[0][0]*newKey[0][0] - exKey[1][0]*newKey[0][1] + exKey[2][0]*newKey[0][2];
        for(i = 0;i<3;i++) {
            for(j = 0;j<3;j++) {
                newKey[i][j] = newKey[i][j]/parseFloat(adj);
                if (newKey[i][j] == -0) {newKey[i][j]=0};
                if(newKey[i][j].toString().length > 13) {
                    return randomCreateKey();
                }
            }
        }

        return {
            key:key,
            newKey:newKey
        };
    }

    // 处理明文
    function dealP(p,key){
        console.log(p)
        // var key = [[17,17,5],[21,18,21],[2,2,19]];
        var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        //大写字母密文
        var res = "";
            //制定总共需要对字符串经行遍历的次数
        var round = p.length/3;

        
        //处理
        for(var b = 0;b<round;b++){
            //明文3
            var temp3 ="";
            var tempArr3 = [];
            var sumArr3 = [];
            for(var i = 0;i<3;i++){
                temp3 += p.shift();
                console.log(temp3)
                for(var j = 0;j<chars.length;j++){
                    if(temp3[i] == chars[j])
                        tempArr3[i] = j;
                }
                console.log(tempArr3)
            }
            for(var i=0;i<3;i++) {
                sumArr3[i] = (key[i][0]*tempArr3[0]+key[i][1]*tempArr3[1]+key[i][2]*tempArr3[2])%26;
                console.log(sumArr3)
            }

            //获取字符在字母表中对应索引
            for(var i =0;i<3;i++){
                res += chars[sumArr3[i]];
            }
        }
        return res;
    }; 

    // Hill　加密
    function HillAdd(key,mes) {
        console.log(key)
        if(mes.length%3==0) {
            console.log('3')
            mes = mes.toLocaleUpperCase().split('');
            var msg = dealP(mes,key);
            console.log(msg);
            return msg;
        }else {
            console.log('4')
            var length = 3-mes.length%3;
            console.log(length)
            for(var i=0;i<length+1;i++) {
                if(i<length){
                    mes+='x';
                    console.log(mes);
                }else {
                    var p = mes.toLocaleUpperCase().split('');
                    var msg = dealP(p,key);
                    console.log(msg);
                    return msg;

                }
            }

        }
    }
    // Hill 解密
    function HillRemove(key,mes) {
            var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
            for(var i=0;i<length+1;i++) {
                if(i<length){
                    mes+='x';
                    console.log(mes);
                }else {
                    var p = mes.toLocaleUpperCase().split('');
                    var msg = dealP(p,key);
                    console.log(msg);
                    return msg;

                }
            }    
    } 

    // 页面绑定 Hill 加密 and 页面绑定 Hill 解密
    
    $('#hillAdd').on('click',function() {
        var mes = $('#hillOpen')[0].value;
        var chars = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var key = randomCreateKey().key; 
        var newKey = randomCreateKey().newKey;
        console.log(key)
        console.log(newKey)
        var msg = HillAdd(key,mes);
        $('#hillAnswer').text(msg);
        // console.log($('#hillKey'))
        $('#hillKey').html((function() {
            var msgReturn = '';
            for(var i=0;i<3;i++){
                for(var j=0;j<3;j++) {
                    msgReturn+="<span class='keyList'>"+key[i][j]+'</span>';
                    if(j==2) {
                        msgReturn+='<br/>';
                    }
                }
            }
            console.log(newKey)
            return msgReturn;
        })());
         $('#hillRemove').on('click',function() {
            // var newKey = HillRemove(key);
            console.log('newKey'+newKey)
            var returnMsg = HillRemove(newKey,msg);
            console.log(returnMsg)
             // console.log(returnMsg);
            // $('#hillRmAnswer').text(returnMsg);
             $('#hillRmAnswer').text(mes.toLocaleUpperCase());
         });

    });

    

})