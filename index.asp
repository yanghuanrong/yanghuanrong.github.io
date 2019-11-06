<!-- #include file="const.asp"-->
<!-- #include file="md5.asp"-->
<%

%>
<%

'--------定义部份------------------
'自定义需要过滤的字串,用 "防" 分隔
Fy_In = "'防;防and防exec防insert防select防delete防update防count防*防%防chr防mid防master防truncate防char防declare"
'----------------------------------
%>

<%
Fy_Inf = split(Fy_In,"防")
'--------POST部份------------------
If Request.Form<>"" Then
For Each Fy_Post In Request.Form

For Fy_Xh=0 To Ubound(Fy_Inf)
If Instr(LCase(Request.Form(Fy_Post)),Fy_Inf(Fy_Xh))<>0 Then
'--------写入数据库----------头-----
Fy_dbstr="DBQ="+server.mappath("db.mdb")+";DefaultDir=;DRIVER={Microsoft Access Driver (*.mdb)};"
Set Fy_db=Server.CreateObject("ADODB.CONNECTION")
Fy_db.open Fy_dbstr
Fy_db.Execute("insert into SqlIn(Sqlin_IP,SqlIn_Web,SqlIn_FS,SqlIn_CS,SqlIn_SJ) values('"&Request.ServerVariables("REMOTE_ADDR")&"','"&Request.ServerVariables("URL")&"','POST','"&Fy_Post&"','"&replace(Request.Form(Fy_Post),"'","''")&"')")
Fy_db.close
Set Fy_db = Nothing
'--------写入数据库----------尾-----

response.write"<script language='javascript'>alert('操作失败，您提交的信息中含有非法字符！')</script>"
response.write"<script language='javascript'>window.location='index.asp'</script>"
response.end
End If
Next

Next
End If
'----------------------------------

'--------GET部份-------------------
If Request.QueryString<>"" Then
For Each Fy_Get In Request.QueryString

For Fy_Xh=0 To Ubound(Fy_Inf)
If Instr(LCase(Request.QueryString(Fy_Get)),Fy_Inf(Fy_Xh))<>0 Then
'--------写入数据库----------头-----
Fy_dbstr="DBQ="+server.mappath("db.mdb")+";DefaultDir=;DRIVER={Microsoft Access Driver (*.mdb)};"
Set Fy_db=Server.CreateObject("ADODB.CONNECTION")
Fy_db.open Fy_dbstr
Fy_db.Execute("insert into SqlIn(Sqlin_IP,SqlIn_Web,SqlIn_FS,SqlIn_CS,SqlIn_SJ) values('"&Request.ServerVariables("REMOTE_ADDR")&"','"&Request.ServerVariables("URL")&"','GET','"&Fy_Get&"','"&replace(Request.QueryString(Fy_Get),"'","''")&"')")
Fy_db.close
Set Fy_db = Nothing
'--------写入数据库----------尾-----

response.write"<script language='javascript'>alert('操作失败，您提交的信息中含有非法字符！')</script>"
response.write"<script language='javascript'>window.location='index.asp'</script>"
response.end
End If
Next
Next
End If
%> 
<%
sub saveadd()	'记录留言过程 为了方便新人读懂记录过程 这里只做了姓名内容不能为空的判断 如有需要 请自行添加。
	if  request.form("name")="" or request.form("body")="" then
		response.write "<script>alert(' 请将带 * 号的项目填写完整！');history.back();</Script>"
		response.end
	else
		sql="select * from book "
		set rs=server.CreateObject("adodb.recordset")
		rs.open sql,conn,1,3,1
		rs.addnew
		rs("name")= mfkiqpl(request.form("name"))   'request.QueryString 从地址 , request.form 从表单。防止浏览者提交非法参数。mfkiqpl 转换HTML标记的函数
		rs("body")=mfkiqpl(request.form("body"))
		rs("email")=mfkiqpl(request.form("email"))
		rs("add")=mfkiqpl(request.form("add"))
		rs("tel")=mfkiqpl(request.form("tel"))
		rs("time")=now()
		rs.update
		response.write"<script language='javascript'>alert('感谢您的留言')</script>"
		response.write("<script>window.location='index.asp'</script>")
		response.end
		rs.close:set rs=nothing
	end if
end sub

sub del()	'删除留言过程
	if session ("userid")="" then
		response.write "<script>alert('您没有这个权限！');history.back();</Script>"
		response.end
	else
		sql="delete from book where id="&request.QueryString("id")&""
		'response.write(sql)
		conn.execute(sql)
		response.write("<script>alert('删除成功')</script>")
		response.write("<script>window.location='index.asp'</script>")
		response.end
	end if
end sub

sub saveedit()	'修改流言过程
	if  request.form("name")="" or request.form("body")="" then
		response.write "<script>alert(' 请将带 * 号的项目填写完整！');history.back();</Script>"
		response.end
	else
		if request.form("id")="" then 
			response.write("<script>alert('操作错误！')</script>")
			response.write("<script>window.location='index.asp'</script>")
			response.end
		else
			sql="select * from book where id="&request.form("id")&""
			set rs=server.CreateObject("adodb.recordset")
			rs.open sql,conn,1,3,1
			if rs.eof then
				response.write("<script>alert('操作错误！')</script>")
				response.write("<script>window.location='index.asp'</script>")
				response.end
			else
					
					rs("name")= mfkiqpl(request.form("name")) 
					rs("body")=mfkiqpl(request.form("body"))
					rs("email")=mfkiqpl(request.form("email"))
					rs("add")=mfkiqpl(request.form("add"))
					rs("tel")=mfkiqpl(request.form("tel"))
					rs("reply")=mfkiqpl(request.form("reply"))
					rs.update
					response.write"<script language='javascript'>alert('修改留言成功')</script>"
					response.write("<script>window.location='index.asp'</script>")
					response.end
					rs.close:set rs=nothing
			end if
		end if
	end if
end sub

sub chk()	'判断管理登陆过程
	userid=replace(trim(request.form("userid")),"'","")		'replace 将一个字符串中指定个数的字符串替换为另一个字符串，trim 删除字符串首部和尾部的空格。
	pass=replace(trim(request.form("pass")),"'","")
		sql="select * from admin where userid='"&userid&"'"
		set rs=server.createobject("adodb.recordset")
		rs.open sql,conn,1,3
		if rs.bof and rs.eof then
			response.write"<script>alert('用户名或密码输入错误！');history.back();</Script>"
			response.end
		end if
		if md5(pass)<>rs("pass") then 
			response.write"<script>alert('用户名或密码输入错误！');history.back();</Script>"
			response.end
		end if
			session("userid")=trim(rs("userid"))
			Session.TimeOut=60 	'登陆超时时间 单位 分钟 
		rs.close
		set rs=nothing
		conn.close
		set conn=nothing
	response.write"<script language='javascript'>alert('恭喜您 登陆成功')</script>"
	response.write("<script>window.location='index.asp'</script>")
	response.end
end sub

sub out()	'退出登陆过程
	session("userid")=""
	response.write"<script language='javascript'>alert('操作成功')</script>"
	response.write("<script>window.location='index.asp'</script>")
	response.end
end sub
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
	<title>杨焕荣DIV个人网站</title>
	<meta http-equiv="content-type" content="text/html; charset=gb2312" />
	<link rel="stylesheet" href="css/lightbox.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/globle.css" type="text/css" media="screen" />
    <script type="text/javascript" src="js/smooth-src-comments.js"><!--缓动效果--></script>
	<script src="js/prototype.js" type="text/javascript"></script>
	<script src="js/scriptaculous.js?load=effects" type="text/javascript"></script>
	<script src="js/lightbox.js" type="text/javascript"></script>
    <script type="text/javascript" src="jquery-1.1.3.1.min.js"></script>
<script type="text/javascript" src="jquery.easing.min.js"></script>
<script type="text/javascript" src="jquery.lavalamp.min.js"></script>
<script type="text/javascript">
        $(function() {
            $("#3").lavaLamp({
                fx: "backout", 
                speed: 700,
                click: function(event, menuItem) {
                    return false;
                }
            });
        });
    </script>
</head>
<body>
<div id="top">
  <div class="wrap">
    <h1 class="fl"><img src="images/logo.jpg" width="227" height="70" / class="fl"></h1>
    <div class="nav">
      <div class="submenu fr">
      <div class="qq"><a href="http://wpa.qq.com/msgrd?V=1&Uin=1176989241&Site=中国站长天空&Menu=yes" target="_blank"><img src="http://wpa.qq.com/pa?p=1:1176989241:4" alt="点击这里给我发送消息" border="0"></a></div>
      <img src="images/submenu.jpg" width="316" height="14" /></div>
        <ul class="lavaLampBottomStyle fr" id="3">
          <li><a href="#home"><img src="images/menu1.jpg" width="54" height="18" /></a></li>
          <li><a href="#works"><img src="images/menu2.jpg" width="55" height="18" /></a></li>
          <li><a href="#about"><img src="images/menu3.jpg" width="55" height="18" /></a></li>
          <li><a href="#link"><img src="images/menu4.jpg" width="65" height="18" /></a></li>
          <li><a href="flash.html"><img src="images/menu5.jpg" width="46" height="18" /></a></li>
          <li><a href="#book"><img src="images/menu6.jpg" width="71" height="18" /></a></li>
        </ul>
    </div>
  </div>
</div>
<div class="wrap">
<a name="home"></a>
 <a name="works"></a>
  <div class="banner"><img src="images/banner.jpg" width="980" height="300" /></div>
  <div class="title">
    <div class="fl"><img src="images/workstitle.jpg" width="149" height="73" /></div>
    <div class="fr"><img src="images/list.jpg" width="182" height="73" /></div>
  </div>
  <div class="clear"></div>
<ul class=" works section clearfix">
  <li class="thumbnail"> <a href="images/dpic1.jpg" rel="lightbox[plants]" title="联想互动首页"><img src="images/pic1.jpg" width="317" height="154" alt="联想互动首页" /></a></li>
  <li class="thumbnail"> <a href="images/dpic2.jpg" rel="lightbox[plants]" title="汽车互动首页"><img src="images/pic2.jpg" width="317" height="154" alt="汽车互动首页" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic3.jpg" rel="lightbox[plants]" title="8厘岛互动首页"><img src="images/pic3.jpg" width="317" height="154" alt="8厘岛互动首页" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic4.jpg" rel="lightbox[plants]" title="地板企业网站"><img src="images/pic4.jpg" width="317" height="154" alt="地板企业网站" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic5.jpg" rel="lightbox[plants]" title="水墨风格集团首页"><img src="images/pic5.jpg" width="317" height="154" alt="水墨风格集团首页" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic6.jpg" rel="lightbox[plants]" title="电子商务首屏"><img src="images/pic6.jpg" width="317" height="154" alt="电子商务首屏" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic7.jpg" rel="lightbox[plants]" title="服装互动首页"><img src="images/pic7.jpg" width="317" height="154" alt="服装互动首页" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic8.jpg" rel="lightbox[plants]" title="春夏专题"><img src="images/pic8.jpg" width="317" height="154" alt="春夏专题" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic9.jpg" rel="lightbox[plants]" title="节日专题"><img src="images/pic9.jpg" width="317" height="154" alt="节日专题" /></a> </li>
</ul>
<!-- end #content -->
<a name="about"></a>
 <div class="abouttitle"><img src="images/abouttitle.jpg" width="149" height="73" /></div>
  <div class="about">
    <div class="fl"><img src="images/me.jpg" width="167" height="193" /></div>
    <div class="green fl">姓名：
      性别：
      民族：
      专业：
      求职：
      手机：
      QQ： </div>
    <div class="name fl">杨焕荣<br/>
      男<br/>
      苗<br/>
      网页美工<br/>
      网页设计师<br/>
      15243987274<br/>
      1176989241</div>
  </div>
  <div class="aboutme fl">
    <div><img src="images/titlea_45.jpg" width="78" height="25" /></div>
    <div>1.我能熟练的运用Photosshop软件进行页面布局，能够制作出各类中小型网站<br/>
      2.我能使用Dreamweave软件进行网站的排版，熟悉JS代码的运用，能够兼容各种浏览器，符合W3C标准<br/>
      3.我还能使用Flash软件制作出简单流畅的动画效果</div>
    <div><img src="images/titlea_48.jpg" width="77" height="24" /></div>
    <div>旧的归宿，新的开始。且不论是不是落叶,是不是归根。只是希望能够永远快乐的活下去。“答案”
      就在这里，往事如烟，笑容淡然…一切没有结束...没有开始我终将找回自己的“答案”---用一颗从未磨灭的心……</div>
  </div>
</div>
<div style="height:20px;"></div>
<div>
<table width="980" border="2" align="center" cellpadding="0" cellspacing="2" bordercolor="#262626">
  <tr>
    <td height="30" bgcolor="#1a3600" align="center"><span class="tit">留言本</span></td>
  </tr>
  <tr>
    <td height="25" align="center"><a href="?action=add" >发表留言</a>&nbsp;&nbsp;<a href="index.asp">查看留言</a>&nbsp;&nbsp;</td>
  </tr>
</table>
<%
Action = LCase(request("action"))	'得到action值
Select Case Trim(Action)			'调用过程
	Case "saveadd"
		Call saveadd
	Case "saveedit"
		Call saveedit
	Case "del"
		Call del
	Case "login"
		Call login
	Case "chk"
		Call chk
	Case "out"
		Call out
	Case "add"
		Call add
	Case "edit"			
		isEdit = True
		Call add
	Case Else
		Call list
End Select

sub list()	'留言列表
sql="select * from book  order by id desc"
set rs=server.CreateObject("adodb.recordset")
rs.open sql,conn,1,3,1
if rs.eof then
	response.Write("<table width=""980"" border=""1"" align=""center"" cellpadding=""0"" cellspacing=""1"" bordercolor=""#CCCCCC"" style=""margin-top:5px;"">")
	response.Write("<tr>")
	response.Write("<td bgcolor=""#F3F3F3"" style=""padding:7px;"">没有记录</td>")
	response.Write("</tr>")
	response.Write("</table>")
else
	rs.pagesize = 4
	page=cint(request("page"))	'cint 进行四舍五入取最接近它的偶数
	if page="" or page<1  then page=1
	if page>= rs.pagecount then page=rs.pagecount
	rs.AbsolutePage = page
		call Numpage()
	for i=1 to rs.pagesize %>
    <a name="book"></a>
<table width="980" border="1" align="center" cellpadding="0" cellspacing="1" bordercolor="#262626" style="margin-top:5px;">
  <tr>
    <td bgcolor="#0c1800" style="padding:7px;"><span title="电话：<%=rs("tel")%>&#10地址：<%=rs("add")%>&#10emal：<%=rs("email")%>"><%=tlen(rs("name"),12)%></span> 在 <%=rs("time")%> 的留言： 
    <%if session("userid")<>"" then%><a href="?action=edit&amp;id=<%=rs("id")%>">修改</a> <a href="?action=del&id=<%=rs("id")%>">删除</a><%end if%></td>
  </tr>
  <tr>
    <td style="padding:7px;"><%=tlen(rs("body"),300)%></td>	
  </tr>
  <%if rs("reply") <> "" then%>
  <tr>
    <td bgcolor="#0c1800" style="padding:7px;">管理员回复：<%=tlen(rs("reply"),300)%></td>
  </tr>
  <%end if%>
</table>
<%rs.movenext
if rs.eof then exit for
next
end if
	call textpage()
rs.close
set rs=nothing
end sub

sub add() 	'留言过程
if isEdit = True then
	if request.QueryString("id")="" then
		response.write"<script language='javascript'>alert('操作错误，此留言不存在！')</script>"
		response.write("<script>window.location='index.asp'</script>")
		response.end
	else
	set rs=conn.execute("select * from book where id="&request.QueryString("id")&"")
		if rs.eof then 
			response.write"<script language='javascript'>alert('操作错误，此留言不存在！')</script>"
			response.write("<script>window.location='index.asp'</script>")
			response.end
		end if
	end if
end if%>

<table width="980" border="1" align="center" cellpadding="0" cellspacing="1" bordercolor="#262626"  style="margin-top:5px;">
<form id="add" name="add" method="post" action="index.asp" onsubmit="if (!formcheck()) return false;">
<input name="action" id="action"  type="hidden" value="<%if isEdit = True then response.Write("saveedit") else response.Write("saveadd")%>" />
<input name="id" id="id"  type="hidden" value="<%if isEdit = True then response.Write(""&request.QueryString("id")&"")%>" />
	<tr>
	  <td width="20%" height="26" align="right">您的姓名：</td>
      <td width="80%" align="left"><input name="name" type="text" id="name" value="<%if isEdit = True then response.Write(""&rs("name")&"")%>" / style="background:#666; border:none; margin-left:10px;"> *</td>
	</tr>
	<tr>
	  <td height="26" align="right">电&nbsp;&nbsp;&nbsp;&nbsp;话：</td>
	  <td align="left"><input name="tel" type="text" id="tel" value="<%if isEdit = True then response.Write(""&rs("tel")&"")%>" /style="background:#666; border:none; margin-left:10px;"></td>
	</tr>
	<tr>
	  <td height="26" align="right">地&nbsp;&nbsp;&nbsp;&nbsp;址：</td>
	  <td align="left"><input name="add" type="text" id="add" value="<%if isEdit = True then response.Write(""&rs("add")&"")%>" /style="background:#666; border:none; margin-left:10px;"></td>
	</tr>
	<tr>
	  <td height="26" align="right">email：</td>
	  <td align="left"><input name="email" type="text" id="email" value="<%if isEdit = True then response.Write(""&rs("email")&"")%>" /style="background:#666; border:none; margin-left:10px;"></td>
	</tr>
	<tr>
	  <td align="right">留言内容：</td>
	  <td align="left"><textarea name="body" cols="40" rows="7" id="body"style="background:#666; border:none; margin-left:10px;"><%if isEdit = True then response.Write(""&rs("body")&"")%></textarea>  
	  *</td>
	</tr>
	<%if isEdit = True then%>
	<tr>
	  <td align="right">留言回复：</td>
	  <td align="left"><textarea name="reply" cols="40" rows="7" id="reply"style="background:#666; border:none; margin-left:10px;"><%=rs("reply")%></textarea>  
	  </td>
	</tr>
	<%end if%>
	<tr>
	  <td height="76" colspan="2" align="center">留言内容请控制在300字以内 超出将不被显示<br /><br /><input type="submit" name="Submit2" value=" 提 交 " /></td>
	</tr>
</form>
</table>
<%end sub

sub login()		'登陆过程%>
<table width="980" border="1" align="center" cellpadding="0" cellspacing="1" bordercolor="#262626"  style="margin-top:5px;">
<form id="form3" name="form3" method="post" action="?action=chk">
	<tr>
    	<td style=" padding:7px;">   帐号：
        <input name="userid" type="text" id="userid" size="12" />
         &nbsp;&nbsp;密码：
        <input name="pass" type="password" id="pass" size="12" />
         &nbsp; &nbsp;<input type="submit" name="Submit3" value=" 登 陆 " /> 
         默认帐号密码 admin
		</td>
	</tr>
</form>
</table>
<%end sub%>
<table width="980" border="2" align="center" cellpadding="0" cellspacing="2" bordercolor="#262626" style="margin-top:5px;">
  <tr>
    <td bgcolor="#1a3600"  style="padding:7px;">
    欢迎各位留言<br/>
    www.ai1996.com<br />
    更新日期：2012-04-21<br />
    这一刻，才明白生活其实并不容易<br />
    希望能够求得一份网页设计师的工作  联系电话:15243987274</td>
  </tr>
</table>
</div>
<div class="link">
  <div class="wrap">
  <a href="http://www.pgl66.com" target="_blank">彭甘林</a><a href="http://duty.hnsn.org" target="_blank">谢湘建</a><a href="http://www.say17.com" target="_blank">谢仲满</a><a href="http://www.mmmm5.com" target="_blank">苏美</a><a href="http://www.xl71.com" target="_blank">邓小兰</a><a href=" http://www.next45.com" target="_blank">池惠兰</a><a href="http://www.y6363.com" target="_blank">刘高原</a><a href="http://www.feixly95.com" target="_blank">刘飞达</a><a href="http://wshenhua.35free.net" target="_blank">申花</a><a href="http://www.huaerl.com" target="_blank">李菊花</a><a href="http://www.xinjin2.com" target="_blank">马顺心</a></div>
</div>
</body>
</html>
<script>
function formcheck()
{
 
 if (document.add.name.value == "")
    {
    alert("请填写您的姓名！");
    document.add.name.focus();
    return (false);
    }


  if (document.add.name.value.length > 5)
  {
    alert("您的姓名不能超过5个字符！");
	document.add.name.focus();
    return false;
  }
  
 if (document.add.body.value == "")
    {
    alert("请填写留言内容！");
    document.add.body.focus();
    return (false);
    }


  if (document.add.body.value.length > 300)
  {
    alert("留言内容不能超过300个字符！");
	 document.add.body.focus();
    return false;
  }


  
 return true;
}


//检查字符串
 function fucCheckSTR(NUM)
 {
    var i,j,strTemp;
    strTemp="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_";
    if ( NUM.length== 0)
        return 0
    for (i=0;i<NUM.length;i++)
    {
       j=strTemp.indexOf(NUM.charAt(i));
       if (j==-1)
       {
         return 0;
       }
    }
    return 1;
 }
 function resetForm() {
	document.add.reset();
}
</script>
