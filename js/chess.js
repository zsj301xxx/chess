$(function () {

    let box = $('.box');
    let black={};
    black.name="黑棋";
    let blank={};
    let  white={};
    white.name='白棋';
    let flag =true;
    for(let i=0;i<15;i++){
        for(let j=0 ; j<15; j++){
            $('<div>').addClass('chess').attr("id", i+'_'+j).appendTo(box);
             blank[i+'_'+j]=true;
        }
    }
    box.on('click','.chess',function () {

        if ($(this).hasClass('black')||$(this).hasClass('white')) {
            return;
        }
        let coords=$(this).attr('id');

        if(true){
            black[coords]=true;
           delete blank[coords];
            $(this).addClass('black');
            flag=0;
            if ( isSuccess(black,coords)>=5){
                alert('黑胜');
                box.off('click','.chess');
            }
        }else{
            white[coords]=true;

            $(this).addClass('white');
            flag=1;
            isSuccess(white,coords);
        }
        if (true){

            let pos=aifn();
            white[pos]=true;
            delete blank[pos];
            $('#'+pos).addClass('white');
            if ( isSuccess(white,pos)>=5){
                alert('白胜');
                box.off('click','.chess');
            }

        }
    })
    function aifn() {
        let blackScore=0,whiteScore=0;
        let pos1='',pos2='';
        for (let i in blank){
            let score=isSuccess(black,i);
            if (score>=blackScore){
                blackScore=score;
                pos1=i;
            }
        }
        for (let i in blank){
            let score=isSuccess(white,i);
            if (score>=whiteScore){
                whiteScore=score;
                pos2=i;
            }
        }
      return   blackScore>=whiteScore ? pos1:pos2
    }
    function isSuccess(obj,coords) {
        let sp=1,cz=1,yx=1,zx=1;
        let [x,y]=coords.split('_');
        let i=x*1;
        let j=y*1;
        //横坐标
        while (obj[i+'_'+(++j)]){
            sp++;
        }
        i=x*1;
        j=y*1;
        while (obj[i+'_'+(--j)]){
            sp++;
        }
        //纵坐标
        i=x*1;
        j=y*1;
        while (obj[++i+'_'+j]){
           cz++;
        }
        i=x*1;
        j=y*1;
        while (obj[--i+'_'+j]){
            cz++;
        }
        i=x*1;
        j=y*1;
        while (obj[++i+'_'+(++j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while (obj[--i+'_'+(--j)]){
            yx++;
        }
        i=x*1;
        j=y*1;
        while (obj[++i+'_'+(--j)]){
           zx++;
        }
        i=x*1;
        j=y*1;
        while (obj[--i+'_'+(++j)]){
            zx++;
        }

        let maxx=Math.max(sp,cz,yx,zx);


        // if(sp>=5||cz>=5||yx>=5||zx>=5){
        //     console.log(sp);
        //     console.log(cz);
        //     console.log(yx);
        //     console.log(zx);
        //     alert(obj.name+'胜');
        //     box.off('click','.chess');
        // }
        return maxx;

    }

});