$(function(){
    
    //页面明文清除
    $('.clear').on('click',function() {
        $('#rsaOpen').val('');
    })
    

    // var public_key=[],private_key,p,q;
    var publicKey = [],privateKey = [],rsaPKey = [],p,q;
    // //过长的明文分组
    // function group(C, n) {
    //     var M = [];
    //     console.log(C)
    //     for(var i=0,j=0;i<C.length;j++,i=i+n) {
    //         M[j]=[];
    //         for(k=0;k<n&&k+i<C.length;k++) {
    //             M[j][k] = C[k+i];
    //         }
    //     }
    //     return M;
    // }

    // // 生成素数表
    function toPrime(){
        var prime = [2, 3, 5, 7, 11, 13, 17, 19, 23],N = 1000,i = 9,n = 19,j,sqrtn;
        // 循环添加数字；
        while(i < N){
            j = 0;
            sqrtn = Math.sqrt(n);
            while(prime[j] <= sqrtn){
                if(n % prime[j] == 0){
                    break;
                }
                j++;
            }
            if( prime[j] > sqrtn){
                prime[i] = n;
                i++;
            }
                n = n + 2;
        }
        console.log('prime'+prime)
        return prime;
    }

    function toKey(){
        var prime = toPrime();
        p = prime[Math.floor(Math.random()*(800) + 200)];
        q = prime[Math.floor(Math.random()*(800) + 200)];
        var e = prime[Math.floor(Math.random()*(800) + 200)],
            n,d,dealPq;

        n = p * q;
        dealPq = (p - 1) * (q - 1);
        console.log('p+q'+p+'&&'+q)
        while(dealPq % e === 0 || e % dealPq === 0){
            e = prime[Math.floor(Math.random()*(800) + 200)];                 
        }
        for(var i = 1; i < Infinity ;i++){
            if(1 === (e*i) % dealPq){
                console.log('i:%d , 成功',i);
                d = i;
                break;
            }
        }
        // 页面绑定 密钥
        $('#rsaKey').html(
            "<span class='keySpan'>公钥 e 为："+e+'</span><br/>'+
            "<span class='keySpan'>公钥 n 为："+n+'</span><br/>'+
            "<span class='keySpan'>私钥 d 为："+d+'</span>'            
        )
        publicKey=[e,n]
        privateKey=[d,n];
        
    }

    $('#rsaAdd').on('click',function() {
        var C =$('#rsaOpen')[0].value,M = [], result='', keys=[], n=0;
        //初始化公钥跟私钥，并且求出每个分组长度，确保算法不出错
        var a = p*q;
        while(a!=0) {
            n++;
            a = parseInt(a/10);
        }
        //分组后逐个加密
        C = group(C, n-1);
        for(var k=0;k<C.length;k++) {
            M[k] = C[k].join('');
            keys[k] = RSA(parseInt(M[k]));
            result += keys[k];
        }
        rsaPKey = keys;         
        $('#rsaAanswer').html(result);       
    }) 

    $('#rsaRemove').on('click',function(){
        var C = '';
        //对保存的分组密文逐个解密回明文
        for(var i = 0;i<rsaPKey.length;i++) {
            C += reRSA(rsaPKey[i]);
        }
        $('#rsaRemoveA').html(C);       

    }); 

    //过长的明文分组
    function group(C, n) {
        var M = [];
        for(var i=0,j=0;i<C.length;j++,i=i+n) {
            M[j]=[];
            for(k=0;k<n&&k+i<C.length;k++) {
                M[j][k] = C[k+i];
            }
        }
        return M;
    }

    //RSA加密
    function RSA(C) {
        var P, a = C;
        var number = [], n = publicKey[0];
        var i = 0;
        number = n.toString(2).split('');
        console.log(number);
        if(number[number.length-1] == 1) {
            P = a % publicKey[1];
        } else {
            P = 1;
        }
        for(i = number.length-2;i >= 0;i--) {   
            //一定要边乘边模运算，不然会无穷大导致报错      
            a = (a*a) % publicKey[1];       
            if(number[i] == 1) {
                P = (P * a) % publicKey[1];
            }
        }
        console.log(P)
        return P;
    }

    //RSA解密
    function reRSA(P) {
        var C, a = P;
        var number = [],n = privateKey[0];
        var i = 0;
        number = n.toString(2).split('');
        console.log(number);
        if(number[number.length-1] == 1) {
            C = a % privateKey[1];
        } else {
            C = 1;
        }
        for(i = number.length-2;i >= 0;i--) {               
            a = (a*a) % privateKey[1];         
            if(number[i] == 1) {
                C = (C * a) % privateKey[1];
            }
        }
        return C;           
    }





    $('#rsaToKey').on('click',function() {
        toKey();
    })


    
})