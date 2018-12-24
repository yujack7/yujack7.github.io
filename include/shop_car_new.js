var sndf=0;
function addMyCollection(pid,tmp_t){
    var checkLogin = readCookie('zz_userid');
    if(checkLogin){
        var std = UTCTimeDemo();
        $.post('/self_define/ajax_set_info.php', {type:33, user_name:user_name, id:pid,userid:ev_log_userid,std:std}, function (data) {
            if(data==0){
                alert('请先登录，再加入我的收藏！');
                location.href = '/dom/denglu.php?username='+user_name;
            }else if(data==1){
                $('.coll'+pid).removeAttr("onclick").html('已加入我的收藏');
                alert('此商品已收藏过！');
            }else if(data==2){
                alert('此商品不存在');
            }else if(data==3){
                alert('系统繁忙，请稍后再试！');
            }else if(data==4){
                $('.coll'+pid).removeAttr("onclick").html('已加入我的收藏');
                alert('收藏成功！');
            }
        });
    }else{
        alert('您未登录,登录后才可加入我的收藏');
        location.href = '/dom/denglu.php?username='+user_name;
    }
}
var checkedSelect = function(n){
    var c = [],g_j = shop_json.sub;
    for(var g in g_j){
        var p_j = g_j[g].sub;
        for(var p in p_j){
            if(p_j[p].checked){
                if(n == 1){
                     c.push(p_j[p].pid);
                }else if(n == 2){
                     c.push(p);
                }else if(n == 3){
                    var a=p.substring(2);
                    c.push(a);
                }
            }
        }
    }
    return c;
};
var changeCookieNew = function(id,sn,pro_num){
    var gouwuche = readCookie(user_name+'_gouwuche');
    var isUpdate = 0;
    if (gouwuche) {
        var aOrder = JSON.parse(gouwuche);
        var i=0;
        for (key in aOrder) {
            if(key==(id)){
                aOrder[key]={'num':pro_num,'sort':aOrder[key].sort};
                var tmp_str = JSON.stringify(aOrder);
                writeCookie(user_name +'_gouwuche',tmp_str, 3600*7);
                isUpdate = 1;
                i = i+1;
            }else{
                i = i+1;
                continue;
            }
        } // for end
        if (!isUpdate) {
            aOrder[id]={'num':pro_num,'sort':i};
            var tmp_str = JSON.stringify(aOrder);
            //i = i+1;
            //$(".mybutCount").html(i);
            writeCookie(user_name +'_gouwuche',tmp_str, 3600*7);
        }
    }else{
        var arrayObj = {};
        arrayObj[id]={'num':pro_num,'sort':1};
        var tmp_str = JSON.stringify(arrayObj);
        //$(".mybutCount").html(1);
        writeCookie(user_name+'_gouwuche',tmp_str,3600*7);
    }
};
var delete_pro = function(t){
    var pid_ = t.data('pid'),cid = t.data('cid'),
        p_id = pid_.substring(2),
        id = shop_json.sub[cid].sub[pid_].pid,
        sn = shop_json.sub[cid].sub[pid_].sn,
        checkLogin = readCookie('zz_userid'),
        show_empty_fun = function(){
            var cp_i = 0,pp_i = 0;
            for(var cp in shop_json.sub){
                for(var pp in shop_json.sub[cp].sub){
                    pp_i++;
                    if(pp_i > 1){
                        continue;
                    }
                }
            }
            if(pp_i == 0){
                $("#shopWrapperInner").hide();
                $("#shopEmpty").show();
            }
        };
    if(checkLogin){
        var std = UTCTimeDemo();
        $.post('/self_define/ajax_set_info.php', {type:36,user_name:user_name,id_str:pid_, userid:ev_log_userid,std:std}, function (data) {
            // if(data==0){
            //     alert('参数有误！');
            // }else
            if(data==3){
                alert('系统繁忙，请稍后再试！');
            }else{
                SPF.delPro(pid_,cid);
                delCookie(p_id);
                show_empty_fun();
            }
        });
    }
}
$("#selectCollectBtn").click(function(){
    var change_arr = checkedSelect(1);
    if(change_arr.length > 0){
        var p_id_arr = checkedSelect(2);
        var checkLogin = readCookie('zz_userid');
        if(checkLogin){
            var p_ = change_arr.join(',');
            var std = UTCTimeDemo();
            $.post('/self_define/ajax_set_info.php', {type:34, user_name:user_name, id_str:p_,userid:ev_log_userid,std:std}, function (data) {
                for(var i = 0; i < p_id_arr.length; i++){
                    $("#tr_"+p_id_arr[i]).find("td .a_my").data('clicks',1).text("已加入我的收藏");
                }
                alert('成功加入我的收藏');
            });
        }else{
            alert('您未登录,登录后才可加入我的收藏');
            location.href = '/dom/denglu.php?username='+user_name;
        }
    }else{
        alert('请先选择需要收藏的商品！');
    }
});
$(".promotion_div").on({
    mouseover : function(){
        $(this).parent().find('.full_cut_pc').show();
    },
    mouseout : function(){
        $(this).parent().find('.full_cut_pc').hide();
    }
},".promotion");
$(".promotion_div").on({
    mouseover : function(){
        $(this).show();
    },
    mouseout : function(){
        $(this).hide();
    }
},".full_cut_pc");
var show_count_new =function(){
    var nsum = 0,g_j = shop_json.sub;
        for(var g in g_j){
            var p_j = g_j[g].sub;
            for(var p in p_j){
                nsum += parseInt(p_j[p].num);
            }
        }
        if(nsum>0){
            $('#shop_goods_num').text(nsum);
        }else{
            $('#shop_goods_num').text(0);
        }
}
var delCookie =function(tmp_t){
        var gouwuche = readCookie(user_name+'_gouwuche');
        if(gouwuche!=''){
            var aOrder = JSON.parse(gouwuche);
            var i=0,tn=0;
            var ordArr= {};
            var isUpdate=0;
            for (key in aOrder) {
                if(key==tmp_t){
                    isUpdate = 1;
                }else{
                    ordArr[key]={'num':parseInt(aOrder[key].num)};
                    i = i+1;
                    continue;
                }
            }
            var tmp_str = JSON.stringify(ordArr);
            writeCookie(user_name+'_gouwuche',tmp_str,3600);
            show_count_new();
        }
}
var delAllCookie =function(arr_str){
        var gouwuche = readCookie(user_name+'_gouwuche');
        if(gouwuche!=''){
            var aOrder = JSON.parse(gouwuche);
            var i=0,tn=0;
            var ordArr= {};
            var isUpdate=0;
            for (i=0; i < arr_str.length; i++) {
                for (key in aOrder) {
                    if(key==arr_str[i]){
                        delete aOrder[key];
                        isUpdate = 1;
                    }
                }
            }
            var tmp_str = JSON.stringify(aOrder);
            writeCookie(user_name+'_gouwuche',tmp_str,3600);
            show_count_new();
        }
};
var get_limit_amount = function(){
    if(limit_amount > 0){
        var total_money = $("#priceSum").html(); 
        if(limit_amount > total_money){
            $("#need_money").html(nCount.sub(limit_amount,total_money));
            $(".a_go_mony").css('background-color','#959595');
            $("#submit_content1").show();
            $("#submit_content2").hide();
        }else{
            $(".a_go_mony").css('background-color','#ffa312');
            $("#submit_content1").hide();
            $("#submit_content2").show();
        }
    }
}
var SPF = {};
    SPF.sumCount = function(){
        var psum = 0,nsum = 0,g_j = shop_json.sub;
        var full_cut_arr = [];
        for(var g in g_j){
            var p_j = g_j[g].sub;
            for(var p in p_j){
                if(p_j[p].checked){
                    var tmppsum = parseFloat(p_j[p].price) * parseInt(p_j[p].num);
                    psum += tmppsum;
                    //psum += parseFloat(p_j[p].price) * parseInt(p_j[p].num);
                    nsum += parseInt(p_j[p].num);
                    if(p_j[p].full_cut_id){
                        full_cut_arr.push(p_j[p].full_cut_id+'#'+tmppsum);
                    }
                }
            }
        }
        shop_json.sel_num = nsum;
        shop_json.total = psum.toFixed(2);
        if(full_cut_arr){
            shop_json.full_cut_str = full_cut_arr.join('_');
        }
        SPF.sumDome();
    };
    SPF.sumDome = function(){
        var amountSum = $("#amountSum"),priceSum = $("#priceSum");
        if(shop_json.full_cut_str){
            var totalM = $("#totalM"),cutM = $("#cutM");
            $.post(
                '/self_define/ajax_set_info.php', 
                {type:40,user_name:user_name, full_cut_str:shop_json.full_cut_str}, 
                function (data) {
                    var cut_money = parseFloat(data);
                    amountSum.text(shop_json.sel_num);
                    totalM.text(shop_json.total);
                    priceSum.text(nCount.sub(parseFloat(shop_json.total),cut_money));
                    cutM.text(cut_money);
                    priceSum.css('line-height','27px');
                    get_limit_amount();
                }
            );
        }else{
            amountSum.text(shop_json.sel_num);
            priceSum.text(shop_json.total);
            priceSum.css('line-height','60px');
            get_limit_amount();
        }
        
    };

    SPF.selectFun = function(j){
        switch(j.cl){
            case 'p' :
                var cObj = $("#"+j.c_id),
                        tr = $("#tr_" + j.p_id),
                        numInput = tr.find('.number input'),
                        aObj_t = $("#allSelect_t"),
                        aObj_b = $("#allSelect_b"),
                        group_json = shop_json.sub,
                        group_json_cur = group_json[j.c_id],
                        p_json = group_json_cur.sub,
                        pf =  p_json[j.p_id].sndf;
                        cFlag = true,aFlag = true;
                    p_json[j.p_id].checked = j.check;
                    p_json[j.p_id].num = numInput.val();
                    if(pf){
                        if(j.price){
                            for(var pf_ in p_json){
                                if(p_json[pf_].pid==j.id && p_json[pf_].checked){
                                    p_json[pf_].price = j.price;
                                    $("#tr_"+pf_).find('.p-price b').text(j.price);
                                    var pro_total = p_json[pf_].num * p_json[pf_].price;
                                    $("#tr_"+pf_).find('.p-sum b').text(pro_total.toFixed(2));
                                }
                            }
                        }
                    }else{
                        if(j.price){
                            p_json[j.p_id].price = j.price;
                            tr.find('.p-price b').text(j.price);
                        }
                    }
                var pro_total = p_json[j.p_id].num * p_json[j.p_id].price;
                tr.find('.p-sum b').text(pro_total.toFixed(2));
                if(j.check){
                    for(var p in p_json){
                        if(!p_json[p].checked){
                            cFlag = false;
                        }
                    }
                    if(cFlag){
                        group_json_cur.checked = 1;
                        cObj.attr('checked','checked');
                    }
                    for(var c in group_json){
                        if(!group_json[c].checked){
                            aFlag = false;
                        }
                    }
                    if(aFlag){
                        shop_json.checked = 1;
                        aObj_t.attr('checked','checked')
                        aObj_b.attr('checked','checked')
                    }
                }else{
                    if(group_json_cur.checked){
                        group_json_cur.checked = 0;
                        cObj.removeAttr('checked');
                    }
                    if(shop_json.checked){
                        shop_json.checked = 0;
                        aObj_t.removeAttr('checked');
                        aObj_b.removeAttr('checked');
                    }
                }
            break;
            case 'c' :
                var table = $("#table_"+j.c_id),
                        tbody = table.find("tbody"),
                        aObj_t = $("#allSelect_t"),
                        aObj_b = $("#allSelect_b"),
                        group_json = shop_json.sub,
                        group_json_cur = group_json[j.c_id];
                        var p_json = group_json_cur.sub,
                        cFlag = true,aFlag = true;
                    group_json_cur.checked = j.check;
                    if(j.check){
                        for(var p in p_json){
                            p_json[p].checked = j.check;
                                tbody.find('input[type="checkbox"]').attr('checked','checked');
                        }
                        for(var c in group_json){
                        if(!group_json[c].checked){
                            aFlag = false;
                        }
                    }
                    if(aFlag){
                        shop_json.checked = 1;
                        aObj_t.attr('checked','checked');
                        aObj_b.attr('checked','checked');
                    }
                    }else{
                        for(var p in p_json){
                            p_json[p].checked = j.check;
                                tbody.find('input[type="checkbox"]').removeAttr('checked');
                        }
                        tbody.find('input[type="checkbox"]').removeAttr('checked','checked');
                        if(shop_json.checked){
                            shop_json.checked = 0;
                        aObj_t.removeAttr('checked');
                        aObj_b.removeAttr('checked');
                        }
                    }
            break;
            case 'a' :
                var proArea = $("#proArea"),
                        table = proArea.find("table"),
                        aObj_t = $("#allSelect_t"),
                        aObj_b = $("#allSelect_b"),
                        group_json = shop_json.sub;
                shop_json.checked = j.check;
                for(var c in group_json){
                    group_json[c].checked = j.check;
                    for(var p in group_json[c].sub){
                        group_json[c].sub[p].checked = j.check;
                    }
                }
                if(j.check){
                    table.find('input[type="checkbox"]').attr('checked','checked');
                    j.a_id == 'allSelect_t' ? aObj_b.attr('checked','checked') : aObj_t.attr('checked','checked');
                }else{
                    table.find('input[type="checkbox"]').removeAttr('checked');
                    j.a_id == 'allSelect_t' ? aObj_b.removeAttr('checked') : aObj_t.removeAttr('checked');
                }
            break;
        }
    };
    SPF.numJudge = function(obj, defaults, mins, maxs,restrict) {
        $('#gotobuy').hide();
          var that = obj,
            a = parseInt(that.val()),
            mins = mins || 0,
            maxs = maxs || 999;
        if(sndf>1){
            var sndf_all = nCount.add(sndf_num, a);
            if (sndf_all < mins) {
                a = mins - sndf_num;
            }
            if (a == 0) {
                a = 1;
            }
        }else{
          if (!isNaN(restrict)){
            if(restrict < maxs){
                if(restrict == 0){
                    alert('当前商品已超过限购数量，不能继续购买！')
                    delete_pro(that.parents('tr').find('.a_del'));
                }else{
                    maxs = restrict;
                }
                
            }
          }
          if (isNaN(a)) {
            a = defaults;
          } else if (a < mins) {
            a = mins;
          } else if (a > maxs) {
            a = maxs;
          }
        }
          that.val(a);
          return a;
    };
    SPF.numParse = function(obj, defaults) {
          var that = obj,
            a = parseInt(that.val());
          if (isNaN(a)) {
            a = defaults;
          }
          that.val(a);
          return a;
    };
    SPF.numCount =function(p_id,pid,torf){
        var nsum = 0,g_j = shop_json.sub;
        for(var g in g_j){
            var p_j = g_j[g].sub;
            for(var p in p_j){
                if(p==p_id){
                    continue;
                }
                if(torf){
                    if(parseInt(p_j[p].pid)==pid && p_j[p].checked){
                        nsum += parseInt(p_j[p].num);
                    }
                }else{
                    if( p_j[p].pid==pid && p_j[p].checked==0){
                        nsum += parseInt(p_j[p].num);
                    }
                }
            }
        }
        return nsum ;
    };
    SPF.changeSndf = function(j){
        var p_j = shop_json.sub[j.c_id].sub;
        for(var p in p_j){
            if(p_j[p].pid == j.pid && j.check == p_j[p].checked){
                var cObj = $("#"+j.c_id),
                        tr = $("#tr_" + p),
                        numInput = tr.find('.number input'),
                        aObj_t = $("#allSelect_t"),
                        aObj_b = $("#allSelect_b"),
                        group_json = shop_json.sub,
                        group_json_cur = group_json[j.c_id],
                        p_json = group_json_cur.sub;
                    p_json[p].checked = j.check;
                    p_json[p].num = numInput.val();
                    if(j.price){
                        p_json[p].price = j.price;
                        tr.find('.p-price b').text(j.price);
                    }
                    var pro_total = p_json[p].num * p_json[p].price;
                    tr.find('.p-sum b').text( pro_total.toFixed(2));
            }
        }
    }
    SPF.changeNum = function(obj){
        //异步查最大值与最小值--
        var std = UTCTimeDemo(),
            p_id = obj.data('pid'),
            tr = $("#tr_" + p_id),
            p = tr.find('input[type="checkbox"]'),
            c_id = p.data('cid'),
            sndf2 = p.data('sndf'),
            protype = p.data('type'),
            id = shop_json.sub[c_id].sub[p_id].pid,
            sn = shop_json.sub[c_id].sub[p_id].sn,
            a_ = SPF.numParse(obj,obj.data('min'));
        var sndfObj = $("#table_"+c_id+" .sndf_"+id);
        sndf =sndfObj.length;
        var check = p.attr('checked') ? 1 : 0;
        window.sndf_num =0;
        if(sndf>1){
            //if(sndf>1){
                var shop_num = 0;
                if(check){
                    shop_num = SPF.numCount(p_id,id,1);
                }else{
                    shop_num = SPF.numCount(p_id,id,0);
                }
                SPF.numParse(obj, obj.data('min'));
                a_ += shop_num;
                sndf_num = a_ - obj.val();
           //}
        }
        if($("#restrict_"+id).length > 0){
            protype = 11;
        }
        $.post('/self_define/ajax_set_info.php', {type:30,username:user_name, id:id,sn:sn,pro_num:a_,class_type:protype, userid:ev_log_userid,std:std}, function (data) {
        if (data.indexOf('|') == -1) { return false; }
            var aVal = data.split('|');
            if(aVal[2]>0 && protype != 11){
                var pro_price = aVal[2];
            }else{
                var pro_price = false;
            } 

            var a = SPF.numJudge(obj,parseInt(aVal[1]),parseInt(aVal[1]),parseInt(aVal[0]),parseInt(aVal[2]));
            if(sndf>1){
                    SPF.changeSndf({
                        pid : id,
                        c_id : c_id,
                        check : check,
                        price : pro_price,
                    });
            }else{
                    SPF.selectFun({
                        cl : 'p',
                        p_id : p_id,
                        c_id : c_id,
                        check : check,
                        price : pro_price,
                    });
            }
            //修改COOKIE 与库数量
            var f_ = function(){
                var pid = p_id.substring(2);
                changeCookieNew(pid,sn,a);
                show_gouwuche(user_name);
                $('#gotobuy').show();
                show_count_new();
            }
            var checkLogin = readCookie('zz_userid');
            if(checkLogin){
                var pid=p_id.substring(2);
                $.post('/self_define/ajax_set_info.php', {type:31, user_name:user_name, id_str:pid, pro_num:a,sn:sn,userid:ev_log_userid,std:std}, function (data) {
                    f_();
                });
            }else{
                f_();
            }
        SPF.sumCount();
        });
    };
    SPF.autoLoad = function(){
        var g_j = shop_json.sub;
        for(var g in g_j){
            var p_j = g_j[g].sub;
            if(g_j[g].checked){
                $("#" + g).attr('checked','checked');
            }
            for(var p in p_j){
                if(p_j[p].checked){
                    $("#"+p).attr('checked','checked');
                }
            }
        }
        if(shop_json.checked){
            $("#allSelect_t,#allSelect_b").attr('checked','checked');
        }
        SPF.sumCount();
    };
    SPF.delPro = function(pid,cid){
        var group = shop_json.sub[cid],
            p_json = group.sub,pro = false,i = 0;
        for(var p in p_json){
            if(p == pid){
                pro = true;
            }
            i++;
        }
        if(pro){
            $("#tr_" + pid).hide(500);
                delete p_json[pid];
                SPF.sumCount();
                if(i == 1){
                    $("#table_" + cid).hide(100);
                    delete group;
                }
        }
    };
var upCookie_ = function(id,sn,a){
    changeCookieNew(id,sn,a);
    show_gouwuche(user_name);
    show_count_new();
    SPF.delPro(pid,cid);
    $('#gotobuy').show();
}

    $(function(){
        var proArea = $("#proArea");
        /*给每一条产品绑定选择事件*/
        proArea.on({
            click : function(){
                var p = $(this),
                        p_id = p.data('pid'),
                        c_id = p.data('cid'),
                        sndf = p.data('sndf'),
                        check = p.attr('checked') ? 1 : 0;
                if(sndf){
                    var id = sndf.substring(5),
                        sn = shop_json.sub[c_id].sub[p_id].sn,
                        shop_num = SPF.numCount(p_id,id,1),
                        std = UTCTimeDemo();
                    if(check){
                        shop_num =  shop_num + parseInt(shop_json.sub[c_id].sub[p_id].num);
                    }
                    $.post('/self_define/ajax_set_info.php', {type:30, id:id,username:user_name,sn:sn,pro_num:shop_num, userid:ev_log_userid,std:std}, function (data) {
                        if (data.indexOf('|') == -1) { return false; }
                        var aVal = data.split('|');
                        if(aVal[2]>0){
                            var pro_price = aVal[2];
                        }else{
                            var pro_price = false;
                        }
                        SPF.selectFun({
                            cl : 'p',
                            p_id : p_id,
                            c_id : c_id,
                            check : check,
                            price: pro_price,
                            id :id
                        });
                        SPF.sumCount();
                    });
                }else{
                    SPF.selectFun({
                        cl : 'p',
                        p_id : p_id,
                        c_id : c_id,
                        check : check
                    });
                    SPF.sumCount();
                }
            }
        },'tbody input[type="checkbox"]');
        /*给每一租全选绑定选择事件*/
        proArea.on({
            click : function(){
                var c = $(this),
                        c_id = c.attr('id'),
                        check = c.attr('checked') ? 1 : 0;
                SPF.selectFun({
                    cl : 'c',
                    c_id : c_id,
                    check : check
                })
                SPF.sumCount();
            }
        },'thead input[type="checkbox"]');
        /*给全选绑定选择事件*/
        proArea.find('.shop-pro-list-head').on({
            click : function(){
                var a = $(this),
                        a_id = a.attr('id'),
                        check = a.attr('checked') ? 1 : 0;
                SPF.selectFun({
                    cl : 'a',
                    a_id : a_id,
                    check : check
                })
                SPF.sumCount();
            }
        },'#allSelect_t');
        proArea.find('.go_mony').on({
            click : function(){
                var a = $(this),
                        a_id = a.attr('id'),
                        check = a.attr('checked') ? 1 : 0;
                SPF.selectFun({
                    cl : 'a',
                    a_id : a_id,
                    check : check
                })
                SPF.sumCount();
            }
        },'#allSelect_b');
        /*给产品列表的加减绑定事件*/
        proArea.on({
            click : function(){
                var t = $(this),p = t.parent(),action = t.data('action'),inputs = p.find('input[type="text"]'),v = parseInt(inputs.val());
                if(action == 'plus'){
                    v = v + 1;
                }else if(action = 'reduce'){
                    v = v - 1;
                }
                inputs.val(v);
                SPF.changeNum(inputs);
            }
        },'.number a');
        /*给输入框绑定事件*/
        proArea.on({
            change : function(){
                var t = $(this);
                SPF.changeNum(t)
            }
        },'.number input');
        $("#gotobuy").click(function(){
            var checkLogin = readCookie('zz_userid');
            if(checkLogin){
                var change_arr = checkedSelect(2);
                if(change_arr.length > 0){
                    if($("#submit_content1").is(":visible")){
                        alert("还需要购买"+currencyType+$("#need_money").html()+"才可以提交订单");
                        return false;
                    }else{
                        $("#jie_form").submit();
                    }
                    
                }else{
                    alert('请先选择商品，再结算！');
                }
            }else{
                alert('请先登录，再后去结算！');
                location.href = '/dom/denglu.php?username='+user_name;
            }
        });
        proArea.on({
            click : function(){
            if(confirm('确定要将此商品从购物车中移除吗？')){
                var t = $(this),pid_ = t.data('pid'),cid = t.data('cid'),
                    p_id = pid_.substring(2),
                    id = shop_json.sub[cid].sub[pid_].pid,
                    sn = shop_json.sub[cid].sub[pid_].sn,
                    checkLogin = readCookie('zz_userid'),
                    show_empty_fun = function(){
                    	var cp_i = 0,pp_i = 0;
                    	for(var cp in shop_json.sub){
                    		for(var pp in shop_json.sub[cp].sub){
                    			pp_i++;
                    			if(pp_i > 1){
                    				continue;
                    			}
                    		}
                    	}
                    	if(pp_i == 0){
                    		$("#shopWrapperInner").hide();
                    		$("#shopEmpty").show();
                    	}
                    };
                if(checkLogin){
                    var std = UTCTimeDemo();
                    $.post('/self_define/ajax_set_info.php', {type:36,user_name:user_name,id_str:pid_, userid:ev_log_userid,std:std}, function (data) {
                        // if(data==0){
                        //     alert('参数有误！');
                        // }else
                        if(data==3){
                            alert('系统繁忙，请稍后再试！');
                        }else{
                            SPF.delPro(pid_,cid);
                            delCookie(p_id);
                            show_empty_fun();
                        }
                    });
                }else{
                    SPF.delPro(pid_,cid);
                    delCookie(p_id);
                    show_empty_fun();
                }
            }
            }
        },'tr.tab_con .a_del');
        /*收藏*/
         proArea.on({
            click : function(){
                var t = $(this);
                if(t.data('clicks') != 1){
                    var pid = t.data('pid'),pd = t.data('pd');
                    addMyCollection(pid,pd);
                }
            }
        },'tr.tab_con .a_my');
        proArea.on({
            click : function(){
                var change_arr = checkedSelect(2);
                if(change_arr.length > 0){
                    if(confirm('确定要将选中的商品从购物车中移除吗？')){
                        var checkLogin = readCookie('zz_userid');
                        var up_ = function(){
                            var g_json = shop_json.sub;
                            for(var g in g_json){
                                var p_json = g_json[g].sub;
                                for(var p in p_json){
                                    if(p_json[p].checked){
                                        // setTimeOut(function(){
                                        SPF.delPro(p,g);
                                        // },1000);
                                    }
                                }
                            }
                            if(shop_json.checked == 1){
                            	$("#shopWrapperInner").hide();
                            	$("#shopEmpty").show();
                            }
                        }
                        if(checkLogin){
                            var p_ = change_arr.join(',');
                            var std = UTCTimeDemo();
                            $.post('/self_define/ajax_set_info.php', {type:37, user_name:user_name, id_str:p_,userid:ev_log_userid,std:std}, function (data) {
                                up_();
                                if(data){
                                    if(data.length>1){
                                        var gouwuche = readCookie(user_name+'_gouwuche');
                                        if(gouwuche!=''){
                                            var aOrder = JSON.parse(gouwuche);
                                            var i=0,tn=0;
                                            var arr =data.split(",");
                                            for (i = 0; i < arr.length; i++) {
                                                for (key in aOrder) {
                                                    if(key==$.trim(arr[i])){
                                                       delete aOrder[key];
                                                    }
                                                }
                                            }
                                            var tmp_str = JSON.stringify(aOrder);
                                            writeCookie(user_name+'_gouwuche',tmp_str,3600);
                                            show_count_new();
                                        }
                                    }
                                }
                            });
                        }else{
                            var p_id_arr = checkedSelect(3);
                            delAllCookie(p_id_arr);
                            up_();
                        }
                    }
                }else{
                    alert('请先选择需要删除的商品！');
                }
            }
        },'#selectDelBtn');
        SPF.autoLoad();
    });
