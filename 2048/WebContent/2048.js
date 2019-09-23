var score=0;
var best=0;
var game={
date:null,//二维数组
    RN:4,   //行
    CN:4,   //列
    state:1,
    Running:1,
    GameOver:0,
    start:function(){
        //启动方法
        score=0;
        if(this.getCookie("best")){
         best= this.getCookie("best");
            document.getElementById("best").innerText=best;
        }

        //声明data数组，根据RN,CN的值初始化二维数组
        this.state=this.Running;
        //外层循环控制行（R)
        this.data=[];
        //外层循环控制行（R)
        for(var r=0;r<this.RN;r++){
            //向Data中压入一个空数组
            this.data.push([]);
            //内层控制列（C）
            for(var c=0;c<this.CN;c++){
                //设置data中r行是值为0
                this.data[r][c]=0;
            }

        }
        //生成随机数
        this.randomNum();
        this.randomNum();
        //渲染到界面
        this.upDataView();
        var that=this;
        //注入键盘事件
        document.onkeydown=function(e){
            var e=window.eval()||arguments[0];
            if(this.state==this.Running){
              //上下左右移动
                switch (e.keyCode){
                    case 37:
                    case 65:
                        that.moveLeft();
                        document.getElementById("score").innerText=score;
                        if(best<score){
                            document.getElementById("best").innerText=score;
                            }
                        if(that.isGameOver()){
                            document.getElementById("gameOver").style.display="block";
                            this.state=this.GameOver;
                            if(best<score){
                            document.cookie="best="+score;
                            }
                        }
                        break;
                    case 38:
                    case 87:
                        that.moveUp();
                        document.getElementById("score").innerText=score;
                        if(best<score){
                            document.getElementById("best").innerText=score;
                            }
                        if(that.isGameOver()){
                            document.getElementById("gameOver").style.display="block";
                            this.state=this.GameOver;
                            if(best<score){
                                document.cookie="best="+score; 
                            }
                        }
                        break;
                    case 39:
                    case 68:
                        that.moveRight();
                        document.getElementById("score").innerText=score;
                        if(best<score){
                            document.getElementById("best").innerText=score;
                            }
                        if(that.isGameOver()){
                            document.getElementById("gameOver").style.display="block";
                            this.state=this.GameOver;
                            if(best<score){
                                document.cookie="best="+score;
                            }
                        }
                        break;
                    case 40:
                    case 83:
                        that.moveDowm();
                        document.getElementById("score").innerText=score;
                        if(best<score){
                            document.getElementById("best").innerText=score;
                            }
                        if(that.isGameOver()){
                        	
                            document.getElementById("gameOver").style.display="block";
                            this.state=this.GameOver;
                            
                            if(best<score){
                                document.cookie="best="+score;
                            }
                        }
                        break;
                }
            }
        }
        console.log(this.data.join("\n"));

    },
    getCookie: function(name)
{
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
},
    isGameOver:function(){
        //判断游戏是否死亡
        //遍历Data数组
        for(var r=0;r<this.RN;r++){
            for(var c=0;c<this.CN ;c++){
                //如果存在为0的元素返回false
                if(this.data[r][c]==0){
                return false;
                } //否则如果C<CN-1且当前元素与下一个列的相同返回false
                else if(c<this.CN-1&&this.data[r][c]==this.data[r][c+1]){
                    return false;
                    }//否则如果R<RN-1且当前元素与下一行的相同返回false
                else if(r<this.RN-1&&this.data[r][c]==this.data[r+1][c]){
                    return false;
                }

            }
        }
       
        return true;
    },

    randomNum:function(){//随机生成一个2或者4
        for(;;){
            var r=parseInt(Math.random()*this.RN);
            var c=parseInt(Math.random()*this.CN);

            if(this.data[r][c] == 0){
                this.data[r][c]=Math.random()<0.5?2:4;
                break;
            }

        }

    },
    upDataView:function(){//将Data中的数据渲染到页面上
        //遍历二维数组
        //外层循环控制行（R)
        for(var r=0;r<this.RN;r++) {
            //内层控制列（C）
            for (var c = 0; c < this.CN; c++) {
                //找到页面中id"cell+r+c的元素
                var div = document.getElementById("cell_" + r + c);

                if (this.data[r][c]) {
                    //设置div的innerHTML为data中r行c列的值
                    div.innerHTML = this.data[r][c];
                    //  设置div的className，cell n+"值"
                    div.className = "cell n" + this.data[r][c];
                } else {
                    //否则//设置div的innerHTML为null
                    div.innerHTML = "";
                    //设置div的classname为cell
                    div.className = "cell";
                }
            }

        }
    },
    moveLeft: function(){
        //遍历data中的所有行
        var before=String(this.data);
        //调用moveLeftInRow方法并传入r行号作为参数
    for (var r=0;r<this.RN;r++){
        this.moveLeftInRow(r);
    }
        var after=String(this.data);

        if(before!=after){
            //调用randomNum
            this.randomNum();
            //调用updataview
            this.upDataView();
        }

},
    moveLeftInRow: function(r){
        //从0 开始遍历data中r 行中所有的div到cn-1结束，c++
    var nextc=-1;
    for(var c=0;c<this.CN-1;c++){
        //查找下一个不为0的数的位置nextc=this.getLeftNextc(r,c)
        nextc = this.getLeftNextc(r,c);
        //如果没有找到退出循环break  nextc=-1
        if(nextc==-1){
            break;
        } // 如果找到且当前位置等于0
        else if(this.data[r][c]==0){
            //当前div为下一个不为0的div的值this.data[r][nextc]
            this.data[r][c]=this.data[r][nextc];
            //下一个的值设置为0
            this.data[r][nextc]=0;
            score+=4;
            //让c留在原地c--
            c--;
        } else if(this.data[r][c]==this.data[r][nextc]){
            //如果找到切当前位置的值等于下一个不为0 的位置的值当前位置的元素*=2
            this.data[r][c]*=2;
            // 下一个不为0 的位置的值设置为0
            this.data[r][nextc]=0;
            score+=4;
        }
    }
},
    getLeftNextc: function(r,c){
        //查找下一个不为0的数
        //nextc从c+1开始到CN-1结束
    for(var nextc=c+1;nextc<this.CN;nextc++){
        if(this.data[r][nextc]!=0){
            //如果nextc 的值不为0 返回nextc
            return nextc;
        }
    }
        //如果没有找到返回-1
    return -1;
},
    moveRight: function(){
        //遍历data中的所有行
        var before=String(this.data);
        //调用moveLeftInRow方法并传入r行号作为参数
        for (var r=0;r<this.RN;r++){
            this.moveRightInRow(r);
        }
        var after=String(this.data);


        if(before!=after){
            //调用randomNum
            this.randomNum();
            //调用updataview
            this.upDataView();
        }

    },
    moveRightInRow: function(r){
        //从CN-1 开始遍历data中r 行中所有的div到0结束，c--
        var prec=-1;
        for(var c=this.CN-1;c>=0;c--){
            //查找前一个不为0的数的位置prec=this.getLeftPrec(r,c)
            prec = this.getRightPrivec(r,c)  ;
            //如果没有找到退出循环breakprec=-1
            if(prec==-1){
                break;
            } // 如果找到且当前位置等于0
            else if(this.data[r][c]==0){
                //当前div为上一个不为0的div的值this.data[r][prec]
                this.data[r][c]=this.data[r][prec];
                //上一个的值设置为0
                this.data[r][prec]=0;
                score+=4;
                //让c留在原地c++
                c++;
            } else if(this.data[r][c]==this.data[r][prec]){
                //如果找到切当前位置的值等于上一个不为0 的位置的值当前位置的元素*=2
                this.data[r][c]*=2;
                // 上一个不为0 的位置的值设置为0
                this.data[r][prec]=0;
                score+=4;
            }
        }
    },
    getRightPrivec: function(r,c){
        //查找上一个不为0的数
        // prec从c+1开始到CN-1结束
        for(var prec=c-1;prec>=0;prec--){
            if(this.data[r][prec]!=0){
                //如果prec 的值不为0 返回prec
                return prec;
            }
        }
        //如果没有找到返回-1
        return -1;
    },
    moveDowm: function(){
        var before=String(this.data);
        //遍历data中的所有列
        for (var c=0;c<this.CN;c++){
            //调用moveDownInCol方法并传入c列号作为参数
            this.moveDownInCol(c);
        }
        var after=String(this.data);
        if(before!=after){

            //调用randomNum
            this.randomNum();
            //调用updataview
            this.upDataView();
        }
    },
    moveDownInCol: function(c){
        //从RN-1 开始遍历data中c列中所有的div到0结束，c++
        var upr=-1;
        for(var r= this.RN-1;r>0;r--){
            //查找前一个不为0的数的位置upc=this.getDownUpc(r,c)
            upr = this.getDownUpr(r,c)  ;
            //如果没有找到退出循环breakupc=-1
            if(upr==-1){
                break;
            }  // 如果找到且当前位置等于0
            else if(this.data[r][c]==0){
                //当前div为上一个不为0的div的值this.data[upr][c]
                this.data[r][c]=this.data[upr][c];
                //上一个的值设置为0
                this.data[upr][c]=0;
                score+=4;
                //让r留在原地r++
                r++;
            } else if(this.data[r][c]==this.data[upr][c]){
                //如果找到且当前位置的值等于上一个不为0 的位置的值当前位置的元素*=2
                this.data[r][c]*=2;
                // 上一个不为0 的位置的值设置为0
                this.data[upr][c]=0;
                score+=4;
            }
        }
    },
    getDownUpr: function(r,c){
        //查找上一个不为0的数
        // upc从r-1开始到0结束
        for(var upr=r-1;upr>=0;upr--){
            if(this.data[upr][c]!=0){
                //如果upr 的值不为0 返回upc
                return upr;
            }
        }
        //如果没有找到返回-1
        return -1;
    },
    moveUp: function(){
        var before=String(this.data);
        //遍历data中的所有列
        for (var c=0;c<this.CN;c++){
            //调用moveDownInCol方法并传入c列号作为参数
            this.moveUpCol(c);
        }
        var after=String(this.data);


        if(before!=after){
            //调用randomNum
            this.randomNum();
            //调用updataview
            this.upDataView();
        }

    },
    moveUpCol: function(c){
        //从0 开始遍历data中c列中所有的div到0结束，c++
        var downr=-1;
        for(var r= 0;r<this.RN;r++){
            //查找下一个不为0的数的位置downr=this.getUpDownr(r,c)
            downr= this.getUpDownr(r,c)  ;
            //如果没有找到退出循环break downr=-1
            if(downr==-1){
                break;
            } // 如果找到且当前位置等于0
            else if(this.data[r][c]==0){
                //当前div为下一个不为0的div的值this.data[downr][c]
                this.data[r][c]=this.data[downr][c];
                //下一个的值设置为0
                this.data[downr][c]=0;
                score+=4;
                //让r留在原地r--
                r--;
            } else if(this.data[r][c]==this.data[downr][c]){
                //如果找到切当前位置的值等于下一个不为0 的位置的值当前位置的元素*=2
                this.data[r][c]*=2;
                // 下一个不为0 的位置的值设置为0
                this.data[downr][c]=0;
                score+=4;
            }
        }
    },
    getUpDownr: function(r,c){
        //查找下一个不为0的数
        // downer从r+1开始到RN-1结束
        for(var downr=r+1;downr<this.RN;downr++){
            if(this.data[downr][c]!=0){
                //如果upr 的值不为0 返回upc
                return downr;
            }
        }
        ///如果没有找到返回-1
        return -1;
    }

}


window.onload=function(){
    game.start();
}
