var parent_host=window.parent.location.host;
//��ǩ�۽���ʽ
function show_border(tag){
	if(tag=='Container'){
		var tmp_obj=$('.frameContainer');
	}else{
		var tmp_obj=$('#'+tag);
	}
	var height=get_qu_height(tmp_obj);
	var width=get_qu_width(tmp_obj);

	$('#'+tag+'_edit').height(height-4);
	$('#'+tag+'_edit').width(width-4);
	$('#'+tag+'_edit').css('border','2px dashed #ff6600');
}

//��ǩ�뿪��ʽ
function hide_border(tag,is_qu){
	//��ҳ�༭
	if(tag=='Container'){
		$('#'+tag+'_edit').height(30);
		$('#'+tag+'_edit').width(195);
	}else{
		if(is_qu==2){
			$('#'+tag+'_edit').height(30);
			$('#'+tag+'_edit').width('100%');
		}
		if(is_qu==1){
			$('#'+tag+'_edit').height(30);
			$('#'+tag+'_edit').width(60);
		}
	}
	$('#'+tag+'_edit').css('border','0px');
}

//�༭��������
function show_botton(tag){

	$.ajaxSetup({
		async: false
	});
	var url='http://'+parent_host+'/';
	var tmp_url='';
	var edit_id=0;
	//�ǵ�ǰģ�岻��������
	if(ev123_no_edit==1){
		window.parent.v_msg(1,18,0,1,'');
	}else{
		$.post('/self_define/ajax_set_info.php',{type:12,qu_name:tag,u:UTCTimeDemo()},
			function(data){
				var tmp_arr2=data.split('###');
				if(tmp_arr2[3]==20 || tmp_arr2[3]==21 || tmp_arr2[3]==22){
					//������ǩ
					tmp_url='own_set_form.php';
				}else if(tmp_arr2[3]==12){
					//����ǩ��
					tmp_url='own_set_index_tag.php';
				}else{
					if(tmp_arr2[0]==1){//���л����µ�
						if(tmp_arr2[1]==1){//�����Ѿ���������
							tmp_url='own_qiehuan_list.php';
						}else{
							tmp_url='own_set_qiehuan.php';
						}
					}else{
						if(tmp_arr2[1]==1){//�����Ѿ���������
							if(tmp_arr2[2]>0){
								tmp_url='own_index_edit.php';
								edit_id=tmp_arr2[2];
							}else{
								tmp_url='own_index_list.php';
							}
						}else{
							tmp_url='own_set_index.php';
						}
					}
				}
			}
		)
		var tmp_width = 650;
		var tmp_height = 400;
		if(edit_id){
			to_url=url+tmp_url+'?id='+edit_id+'&is_frame=2&qu_name='+tag+'&u='+UTCTimeDemo();
		}else{
			to_url=url+tmp_url+'?is_frame=2&qu_name='+tag+'&u='+UTCTimeDemo();
		}
		window.parent.get_url_window(to_url,'�༭ģ��',tmp_width,tmp_height);
	}
}

//�༭ϵͳ����
function show_system(tag,id){
	var url='http://'+parent_host+'/';
	var tmp_url,title,tmp_width,tmp_height,tmp_param;
	tmp_width = 650;
	tmp_height = 400;
	tmp_param ='is_frame=2';
	if(tag=='top'){
		tmp_url='own_set_top.php';
		title='ͷ����Ϣ';
	}
	if(tag=='foot_doc'){
		tmp_url='own_add_foot_doc.php';
		title='�ײ�����';
		tmp_height = 450;
	}
	if(tag=='linksite'){
		tmp_url='add_link_site.php';
		title='��������';
	}
	if(tag=='foot'){
		tmp_url='add_foot.php';
		title='�ײ���Ϣ';
	}
	if(tag=='banner'){
		tmp_url='own_add_banner.php';
		title='�༭ģ��';
		tmp_param+='&channel_id='+channel_id;
	}
	if(tag=='bbs'){
		tmp_url='add_bbs_class.php';
		title='�༭ģ��';
		tmp_param='is_frame=4&channel_id='+channel_id;
	}
	if(tag=='add_module'){
		tmp_url='own_add_module.php';
		title='�༭ģ��';
		tmp_param+='&channel_id='+channel_id+'&id='+id;
	}
	if(tag=='Container'){
		tmp_url='own_channel_style.php';
		title='���ð�ʽ';
		tmp_param+='&channel_id='+channel_id;
		tmp_width = 640;
		tmp_height = 320;
	}
	if(tag=='logo'){
		tmp_url='own_top_set.php';
		title='ͷ������';
	}
	if(tag=='navi'){
		tmp_url='own_navi_set.php';
		title='��Ŀ��������';
	}
	if(tag=='qu_banner'){
		tmp_url='own_banner_set.php';
		title='����ͼ����';
	}
	var to_url=url+tmp_url+'?'+tmp_param+'&u='+UTCTimeDemo();
	window.parent.get_url_window(to_url,title,tmp_width,tmp_height);
}



//ʱ���
function UTCTimeDemo(){
	   var now = new Date().getTime();
	   var datestr=escape(now*1000+Math.round(Math.random()*1000));
	   return datestr;
}

//�������ɱ༭
function set_qu_edit(){
	$("[id*=qu_]").each(function(){
		var id_str=$(this).attr('id');
		var id_str2=id_str.replace('qu_','');
		var height=get_qu_height(this);
		var width=get_qu_width(this);
		var height2=height;
		var width2=width;
		var hide_tag=3;
		if(id_str2=='banner')$(this).show();
		$(this).css('position','relative');
		var hide_str='';
		var hide_style='';
		var is_hide=in_array(id_str2,hide_qu_ids);//�Ƿ������
		var is_hide_ed=in_array(id_str2,hide_qu_ids_seted);//�Ƿ�������
		if(is_hide_ed){
			hide_str='<a id="'+id_str+'_hide" href="javascript:show_hide_qu(\''+id_str+'\')"><img src="http://img.ev123.com/pic/editBtnAb3.jpg?ee" style="margin:0px;padding:0px;"></a>';
			hide_style="width:"+width+"px;height:"+height+"px;background-color:#ffffff;filter:alpha(opacity=75);opacity:0.75;"
		}else if(is_hide){
			hide_style="width:"+width+"px;height:"+height+"px;background-color:#ffffff;filter:alpha(opacity=0);opacity:0;"
			hide_str='<a id="'+id_str+'_hide" href="javascript:hide_hide_qu(\''+id_str+'\')"  style="margin:0px;padding:0px;"><img src="http://img.ev123.com/pic/editBtnAb4.jpg?ee" ></a>';
		}else{
			hide_style="width:0px;height:0px;background-color:#ffffff;filter:alpha(opacity=0);opacity:0;";
			width2=60;
			height2=30;
			hide_tag=1;
		}

		//��ͷ������ȥ��relative
		var set_str='';
		if(new_top==1 && id_str2=='search_tag')$(this).css('position','absolute');
		if(new_top==1 && id_str2=='logo'){
			var set_str='<a href="javascript:show_system(\''+id_str2+'\')"  style="margin:0px;padding:0px;"><img src="http://img.ev123.com/pic/editBtnSZ.jpg?ee" ></a>';
			width2=300;
			hide_tag=2;
		}else if(id_str2=='banner'){
			var is_set=$(this).attr('rel');
			if(is_set=='can_set'){
				var set_str='<a href="javascript:show_system(\''+id_str+'\')"  style="margin:0px;padding:0px;"><img src="http://img.ev123.com/pic/editBtnSZ.jpg?ee" ></a>';
				width2=300;
				hide_tag=2;
			}
		}
		if(set_str && id_str2=='banner'){
			var tmp_str="<div style='width:100%;height:"+height2+"px;position:absolute;top:0px;left:0px;z-index:1000;text-align:left;' onmouseover=\"show_border('"+id_str+"')\" onmouseout=\"hide_border('"+id_str+"',"+hide_tag+")\" id='"+id_str+"_edit'><div style='width:960px;margin:0 auto;'>"+set_str+" <a href=\"javascript:show_botton('"+id_str2+"');\" title='��ʾ������༭�����������ɱ༭���趨���������ݣ�'  style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnAb.jpg?ee'  style='margin:0px;padding:0px;float:none;'></a> "+hide_str+"</div></div><div style='position:absolute;top:0px;left:0px;z-index:900;"+hide_style+"' id='"+id_str+"_edit2'> </div>";
		}else{
			var tmp_str="<div style='width:"+width2+"px;height:"+height2+"px;position:absolute;top:0px;left:0px;z-index:1000;text-align:left;' onmouseover=\"show_border('"+id_str+"')\" onmouseout=\"hide_border('"+id_str+"',"+hide_tag+")\" id='"+id_str+"_edit'>"+set_str+" <a href=\"javascript:show_botton('"+id_str2+"');\" title='��ʾ������༭�����������ɱ༭���趨���������ݣ�'  style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnAb.jpg?ee'  style='margin:0px;padding:0px;float:none;'></a> "+hide_str+"</div><div style='position:absolute;top:0px;left:0px;z-index:900;"+hide_style+"' id='"+id_str+"_edit2'> </div>";
		}
		$(this).append(tmp_str);

	});
	$("[id*=system_]").each(function(){
		var id_str=$(this).attr('id');
		var id_str2=id_str.replace('system_','');
		$(this).show();
		$(this).css('position','relative');
		if(ev123_no_edit==1){
			var tmp_link="javascript:window.parent.v_msg(1,18,0,1,'')";
		}else{
			var tmp_link="http://"+parent_host+"/user_make_navi.php";
		}
		if(id_str2=='navi'){
			set_str='';
			if(new_navi==1){
				var set_str='<a href="javascript:show_system(\''+id_str2+'\')" title="�Զ��嵼������������ͨ������ʽ��"  style="margin:0px;padding:0px;"><img src="http://img.ev123.com/pic/editBtnSZ.jpg?ee" ></a> ';
			}
			var tmp_str="<div style='width:430px;height:30px;position:absolute;top:0px;z-index:1000;left:0px;text-align:left' onmouseover=\"show_border('"+id_str+"')\" onmouseout=\"hide_border('"+id_str+"',2)\" id='"+id_str+"_edit'>"+set_str+"<a href='###' onclick='operationNav(1)'  title='��ʾ���������������������Ŀ��' style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnAb0.jpg?ss' style='margin:0px;padding:0px;float:none;'></a> <a href='###' onclick='operationNav(2)'  title='��ʾ���������������ɾ�����޸�������Ŀ��' style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnAb2.jpg?ss' style='margin:0px;padding:0px;float:none;'></a> <a href='###' onclick='operationNav(3)' title='��ʾ����������������Ŀ���ݣ�' style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnAb5.gif' style='margin:0px;padding:0px;float:none;'></a></div>";
		}else if(id_str2=='top'){
			if(navi_hide==1){
				hide_str='<a id="'+id_str+'_hide" href="javascript:show_hide_qu(\''+id_str+'\')"><img src="http://img.ev123.com/pic/editBtnAb3.jpg?ee"  style="margin:0px;padding:0px;float:none;"></a>';
				hide_style="background-color:#ffffff;filter:alpha(opacity=75);opacity:0.75;";
			}else{
				hide_style="background-color:#ffffff;filter:alpha(opacity=0);opacity:0;";
				hide_str='<a id="'+id_str+'_hide" href="javascript:hide_hide_qu(\''+id_str+'\')"  style="margin:0px;padding:0px;float:none;"><img src="http://img.ev123.com/pic/editBtnAb4.jpg?ee"  style="margin:0px;padding:0px;float:none;"></a>';
			}
			var tmp_str="<div style='width:100%;height:100%;position:absolute;top:0px;z-index:1000;left:0px;text-align:left' onmouseover=\"show_border('"+id_str+"')\" onmouseout=\"hide_border('"+id_str+"')\" id='"+id_str+"_edit'><div style='width:960px;margin:0 auto;'><a href=\"javascript:show_system('"+id_str2+"');\" style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnAb.jpg?ee' style='margin:0px;padding:0px;float:none;'></a> "+hide_str+"</div></div><div style='position:absolute;top:0px;left:0px;width:100%;height:100%;z-index:900;"+hide_style+"' id='"+id_str+"_edit2'></div>";
		}else{
			var tmp_str="<div style='width:100%;height:100%;position:absolute;top:0px;z-index:1000;left:0px;text-align:left' onmouseover=\"show_border('"+id_str+"')\" onmouseout=\"hide_border('"+id_str+"')\" id='"+id_str+"_edit'><a href=\"javascript:show_system('"+id_str2+"');\"  style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnAb.jpg?ee'  style='margin:0px;padding:0px;float:none;'></a></div>";
		}
		$(this).append(tmp_str);
	});
	$(".WebLModule").each(function(){
		var id_str=$(this).attr('id');
		var rel=$(this).attr('rel');
		if(rel!='no'){
			$(this).show();
			$(this).css('position','relative');
			var tmp_str="<div style='width:100%;height:100%;position:absolute;top:0px;z-index:1000;left:0px;text-align:left' onmouseover=\"show_border('"+id_str+"')\" onmouseout=\"hide_border('"+id_str+"')\" id='"+id_str+"_edit'><img src='http://img.ev123.com/pic/editBtnAb.jpg?ee' width='60' height='24' style='margin:0px;padding:0px;float:none;cursor:pointer'  onclick=\"show_system('add_module','"+id_str+"')\" alt='�༭'> <img src='http://img3.ev123.com/up.png?ee'  width='32' height='24'  style='cursor:pointer' class='module_move_up' alt='����' onclick=\"up_hand_module(this)\"> <img src='http://img3.ev123.com/down.png?ee' class='module_move_down' alt='����' width='32' height='24'  style='margin:0px;padding:0px;float:none;cursor:pointer' onclick=\"down_hand_module(this)\"> <img src='http://img3.ev123.com/close.png?ee' width='32' height='24'  style='margin:0px;padding:0px;float:none;cursor:pointer' onclick=\"delete_hand_module('"+id_str+"')\" alt='ɾ��'></div>";
			$(this).append(tmp_str);
		}
	});
	$(".move_module_group .ColumnBOx:first .module_move_up").hide();
 	$(".move_module_group .ColumnBOx:last .module_move_down").hide();
	$('.AddModule').show();

	if(channel_id && channel_type!=7 && channel_type){
		if(channel_type==15 || channel_type==10 || channel_type==11 || channel_type==14){
			var tmp_str="<a href=\"javascript:show_system('Container');\" title='��ʾ��������ø���Ŀ��ʽ��'  style='margin:0px;padding:0px;float:none;'><img src='http://img.ev123.com/pic/editBtnn1.jpg?ee'  style='margin:0px;padding:0px;float:none;'></a> ";
			var tmp_url="user_make_content.php?channel_id="+channel_id;
		}else{
			var tmp_str='';
			if(channel_type==19 || channel_type==18 || channel_type==20){
				var tmp_url="user_make_content.php?channel_id="+channel_id;
			}else if(channel_type==4){//����
				var tmp_url="user_make_dom.php?dom_id=4";
			}else if(channel_type==31){//�ٿ�
				var tmp_url="user_make_dom.php?dom_id=32";
			}else if(channel_type==7){//��̳
				var tmp_url="user_make_dom.php?dom_id=14";
			}else if(channel_type==32){//֪��
				var tmp_url="user_make_dom.php?dom_id=31";
			}else if(channel_type==8){//���
				var tmp_url="user_make_dom.php?dom_id=21";
			}else if(channel_type==16){//����
				var tmp_url="user_make_dom.php?dom_id=20";
			}else if(channel_type==30){//����
				var tmp_url="user_make_dom.php?dom_id=1635";
			}else if(channel_type==34){//��ͼ
				var tmp_url="user_make_dom.php?dom_id=19";
			}else if(channel_type==35){//��ѽ�վ
				var tmp_url="user_make_dom.php?dom_id=1835";
			}else if(channel_type==36){//�Ź�
				var tmp_url="user_make_dom.php?dom_id=1845";
			}
		}
		if(tmp_url){
			tmp_url='http://'+parent_host+"/"+tmp_url;
			$(".frameContainer").css('position','relative');
			var tmp_str="<div style='width:195px;height:30px;position:absolute;top:0px;right:0px;z-index:1000;text-align:right;' onmouseover=\"show_border('Container')\" onmouseout=\"hide_border('Container')\" id='Container_edit'>"+tmp_str+"</div>";
			$(".frameContainer").append(tmp_str);
		}
	}
}

//ɾ��ģ��
function delete_hand_module(id){
	if(!id)return false;
	if(confirm("ȷ��Ҫɾ����ɾ���󽫲��ɻָ���")){
		$.post('/self_define/ajax_set_info.php',{type:15,id:id,u:UTCTimeDemo()},
			function(data){
				data=parseInt(data);
				if(data==1){
					alert('�����ɹ���');
					$('#'+id).remove();
				}else{
					alert('����ʧ�ܣ���������æ���Ժ����ԣ�');
				}
			}
		);
	}
}


//��������Ԫ��
function in_array(x,arr){
	for (var i = 0; i < arr.length; i++){
		if (x==arr[i]){
			return true;
		}
	}
	return false;
}

//��������
function hide_hide_qu(qu_id,is_cancel,tag){

	var height=$('#'+qu_id).height();
	var width=$('#'+qu_id).width();
	$('#'+qu_id+'_edit2').width(width);
	$('#'+qu_id+'_edit2').height(height);

	$('#'+qu_id+'_edit2').animate({opacity:'0.75'},500);
	$('#'+qu_id+'_hide').attr('href',"javascript:show_hide_qu('"+qu_id+"')");
	$('#'+qu_id+'_hide img').attr('src','http://img.ev123.com/pic/editBtnAb3.jpg?ee');
	if(is_cancel!=1){
		$.post('/self_define/ajax_set_info.php',{type:13,qu_name:qu_id,show:0,u:UTCTimeDemo()},
			function(data){
				data=parseInt(data);
				if(data==0){
					alert("����ʧ�ܣ������Ƿ��ѱ����ģ�壡");
					show_hide_qu(qu_id,1,tag);
				}
			}
		)
	}
}

//��ʾ����
function show_hide_qu(qu_id,is_cancel,tag){

	$('#'+qu_id+'_edit2').width(0);
	$('#'+qu_id+'_edit2').height(0);

	$('#'+qu_id+'_edit2').animate({opacity:'0'},500);
	$('#'+qu_id+'_hide').attr('href',"javascript:hide_hide_qu('"+qu_id+"')");
	$('#'+qu_id+'_hide img').attr('src','http://img.ev123.com/pic/editBtnAb4.jpg?ee');
	if(is_cancel!=1){
		$.post('/self_define/ajax_set_info.php',{type:13,qu_name:qu_id,show:1,u:UTCTimeDemo()},
			function(data){
				data=parseInt(data);
				if(data==0){
					alert("����ʧ�ܣ������Ƿ��ѱ����ģ�壡");
					hide_hide_qu(qu_id,1,tag);
				}
			}
		)
	}
}

//��ȡ��
function get_qu_height(obj){
	var height=$(obj).height();
	var padding_top=$(obj).css('padding-top');
	var padding_bottom=$(obj).css('padding-bottom');
	var height2=parseInt(height)+parseInt(padding_top)+parseInt(padding_bottom);
	return  height2;
}

//��ȡ��
function get_qu_width(obj){
	var width=$(obj).width();
	var padding_left=$(obj).css('padding-left');
	var padding_right=$(obj).css('padding-right');
	var width2=parseInt(width)+parseInt(padding_left)+parseInt(padding_right);
	return width2;
}

function operationNav (iType) {
	if (iType == 2) 			{ window.parent.Ev.pubVar.winDocum.find("#siteColumnAdmin").trigger("click"); }
	else if (iType == 3) 	{ window.parent.Ev.pubVar.winDocum.find("#toolUpcon").trigger("click"); }
	else 									{ window.parent.Ev.pubVar.winDocum.find("#addSiteColumn").trigger("click"); }
}