<!-- #include file="const.asp"-->
<!-- #include file="md5.asp"-->
<%

%>
<%

'--------���岿��------------------
'�Զ�����Ҫ���˵��ִ�,�� "��" �ָ�
Fy_In = "'��;��and��exec��insert��select��delete��update��count��*��%��chr��mid��master��truncate��char��declare"
'----------------------------------
%>

<%
Fy_Inf = split(Fy_In,"��")
'--------POST����------------------
If Request.Form<>"" Then
For Each Fy_Post In Request.Form

For Fy_Xh=0 To Ubound(Fy_Inf)
If Instr(LCase(Request.Form(Fy_Post)),Fy_Inf(Fy_Xh))<>0 Then
'--------д�����ݿ�----------ͷ-----
Fy_dbstr="DBQ="+server.mappath("db.mdb")+";DefaultDir=;DRIVER={Microsoft Access Driver (*.mdb)};"
Set Fy_db=Server.CreateObject("ADODB.CONNECTION")
Fy_db.open Fy_dbstr
Fy_db.Execute("insert into SqlIn(Sqlin_IP,SqlIn_Web,SqlIn_FS,SqlIn_CS,SqlIn_SJ) values('"&Request.ServerVariables("REMOTE_ADDR")&"','"&Request.ServerVariables("URL")&"','POST','"&Fy_Post&"','"&replace(Request.Form(Fy_Post),"'","''")&"')")
Fy_db.close
Set Fy_db = Nothing
'--------д�����ݿ�----------β-----

response.write"<script language='javascript'>alert('����ʧ�ܣ����ύ����Ϣ�к��зǷ��ַ���')</script>"
response.write"<script language='javascript'>window.location='index.asp'</script>"
response.end
End If
Next

Next
End If
'----------------------------------

'--------GET����-------------------
If Request.QueryString<>"" Then
For Each Fy_Get In Request.QueryString

For Fy_Xh=0 To Ubound(Fy_Inf)
If Instr(LCase(Request.QueryString(Fy_Get)),Fy_Inf(Fy_Xh))<>0 Then
'--------д�����ݿ�----------ͷ-----
Fy_dbstr="DBQ="+server.mappath("db.mdb")+";DefaultDir=;DRIVER={Microsoft Access Driver (*.mdb)};"
Set Fy_db=Server.CreateObject("ADODB.CONNECTION")
Fy_db.open Fy_dbstr
Fy_db.Execute("insert into SqlIn(Sqlin_IP,SqlIn_Web,SqlIn_FS,SqlIn_CS,SqlIn_SJ) values('"&Request.ServerVariables("REMOTE_ADDR")&"','"&Request.ServerVariables("URL")&"','GET','"&Fy_Get&"','"&replace(Request.QueryString(Fy_Get),"'","''")&"')")
Fy_db.close
Set Fy_db = Nothing
'--------д�����ݿ�----------β-----

response.write"<script language='javascript'>alert('����ʧ�ܣ����ύ����Ϣ�к��зǷ��ַ���')</script>"
response.write"<script language='javascript'>window.location='index.asp'</script>"
response.end
End If
Next
Next
End If
%> 
<%
sub saveadd()	'��¼���Թ��� Ϊ�˷������˶�����¼���� ����ֻ�����������ݲ���Ϊ�յ��ж� ������Ҫ ��������ӡ�
	if  request.form("name")="" or request.form("body")="" then
		response.write "<script>alert(' �뽫�� * �ŵ���Ŀ��д������');history.back();</Script>"
		response.end
	else
		sql="select * from book "
		set rs=server.CreateObject("adodb.recordset")
		rs.open sql,conn,1,3,1
		rs.addnew
		rs("name")= mfkiqpl(request.form("name"))   'request.QueryString �ӵ�ַ , request.form �ӱ�����ֹ������ύ�Ƿ�������mfkiqpl ת��HTML��ǵĺ���
		rs("body")=mfkiqpl(request.form("body"))
		rs("email")=mfkiqpl(request.form("email"))
		rs("add")=mfkiqpl(request.form("add"))
		rs("tel")=mfkiqpl(request.form("tel"))
		rs("time")=now()
		rs.update
		response.write"<script language='javascript'>alert('��л��������')</script>"
		response.write("<script>window.location='index.asp'</script>")
		response.end
		rs.close:set rs=nothing
	end if
end sub

sub del()	'ɾ�����Թ���
	if session ("userid")="" then
		response.write "<script>alert('��û�����Ȩ�ޣ�');history.back();</Script>"
		response.end
	else
		sql="delete from book where id="&request.QueryString("id")&""
		'response.write(sql)
		conn.execute(sql)
		response.write("<script>alert('ɾ���ɹ�')</script>")
		response.write("<script>window.location='index.asp'</script>")
		response.end
	end if
end sub

sub saveedit()	'�޸����Թ���
	if  request.form("name")="" or request.form("body")="" then
		response.write "<script>alert(' �뽫�� * �ŵ���Ŀ��д������');history.back();</Script>"
		response.end
	else
		if request.form("id")="" then 
			response.write("<script>alert('��������')</script>")
			response.write("<script>window.location='index.asp'</script>")
			response.end
		else
			sql="select * from book where id="&request.form("id")&""
			set rs=server.CreateObject("adodb.recordset")
			rs.open sql,conn,1,3,1
			if rs.eof then
				response.write("<script>alert('��������')</script>")
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
					response.write"<script language='javascript'>alert('�޸����Գɹ�')</script>"
					response.write("<script>window.location='index.asp'</script>")
					response.end
					rs.close:set rs=nothing
			end if
		end if
	end if
end sub

sub chk()	'�жϹ����½����
	userid=replace(trim(request.form("userid")),"'","")		'replace ��һ���ַ�����ָ���������ַ����滻Ϊ��һ���ַ�����trim ɾ���ַ����ײ���β���Ŀո�
	pass=replace(trim(request.form("pass")),"'","")
		sql="select * from admin where userid='"&userid&"'"
		set rs=server.createobject("adodb.recordset")
		rs.open sql,conn,1,3
		if rs.bof and rs.eof then
			response.write"<script>alert('�û����������������');history.back();</Script>"
			response.end
		end if
		if md5(pass)<>rs("pass") then 
			response.write"<script>alert('�û����������������');history.back();</Script>"
			response.end
		end if
			session("userid")=trim(rs("userid"))
			Session.TimeOut=60 	'��½��ʱʱ�� ��λ ���� 
		rs.close
		set rs=nothing
		conn.close
		set conn=nothing
	response.write"<script language='javascript'>alert('��ϲ�� ��½�ɹ�')</script>"
	response.write("<script>window.location='index.asp'</script>")
	response.end
end sub

sub out()	'�˳���½����
	session("userid")=""
	response.write"<script language='javascript'>alert('�����ɹ�')</script>"
	response.write("<script>window.location='index.asp'</script>")
	response.end
end sub
%>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN"
        "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
	<title>�����DIV������վ</title>
	<meta http-equiv="content-type" content="text/html; charset=gb2312" />
	<link rel="stylesheet" href="css/lightbox.css" type="text/css" media="screen" />
    <link rel="stylesheet" href="css/globle.css" type="text/css" media="screen" />
    <script type="text/javascript" src="js/smooth-src-comments.js"><!--����Ч��--></script>
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
      <div class="qq"><a href="http://wpa.qq.com/msgrd?V=1&Uin=1176989241&Site=�й�վ�����&Menu=yes" target="_blank"><img src="http://wpa.qq.com/pa?p=1:1176989241:4" alt="���������ҷ�����Ϣ" border="0"></a></div>
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
  <li class="thumbnail"> <a href="images/dpic1.jpg" rel="lightbox[plants]" title="���뻥����ҳ"><img src="images/pic1.jpg" width="317" height="154" alt="���뻥����ҳ" /></a></li>
  <li class="thumbnail"> <a href="images/dpic2.jpg" rel="lightbox[plants]" title="����������ҳ"><img src="images/pic2.jpg" width="317" height="154" alt="����������ҳ" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic3.jpg" rel="lightbox[plants]" title="8�嵺������ҳ"><img src="images/pic3.jpg" width="317" height="154" alt="8�嵺������ҳ" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic4.jpg" rel="lightbox[plants]" title="�ذ���ҵ��վ"><img src="images/pic4.jpg" width="317" height="154" alt="�ذ���ҵ��վ" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic5.jpg" rel="lightbox[plants]" title="ˮī�������ҳ"><img src="images/pic5.jpg" width="317" height="154" alt="ˮī�������ҳ" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic6.jpg" rel="lightbox[plants]" title="������������"><img src="images/pic6.jpg" width="317" height="154" alt="������������" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic7.jpg" rel="lightbox[plants]" title="��װ������ҳ"><img src="images/pic7.jpg" width="317" height="154" alt="��װ������ҳ" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic8.jpg" rel="lightbox[plants]" title="����ר��"><img src="images/pic8.jpg" width="317" height="154" alt="����ר��" /></a> </li>
  <li class="thumbnail"> <a href="images/dpic9.jpg" rel="lightbox[plants]" title="����ר��"><img src="images/pic9.jpg" width="317" height="154" alt="����ר��" /></a> </li>
</ul>
<!-- end #content -->
<a name="about"></a>
 <div class="abouttitle"><img src="images/abouttitle.jpg" width="149" height="73" /></div>
  <div class="about">
    <div class="fl"><img src="images/me.jpg" width="167" height="193" /></div>
    <div class="green fl">������
      �Ա�
      ���壺
      רҵ��
      ��ְ��
      �ֻ���
      QQ�� </div>
    <div class="name fl">�����<br/>
      ��<br/>
      ��<br/>
      ��ҳ����<br/>
      ��ҳ���ʦ<br/>
      15243987274<br/>
      1176989241</div>
  </div>
  <div class="aboutme fl">
    <div><img src="images/titlea_45.jpg" width="78" height="25" /></div>
    <div>1.��������������Photosshop�������ҳ�沼�֣��ܹ�������������С����վ<br/>
      2.����ʹ��Dreamweave���������վ���Ű棬��ϤJS��������ã��ܹ����ݸ��������������W3C��׼<br/>
      3.�һ���ʹ��Flash����������������Ķ���Ч��</div>
    <div><img src="images/titlea_48.jpg" width="77" height="24" /></div>
    <div>�ɵĹ��ޣ��µĿ�ʼ���Ҳ����ǲ�����Ҷ,�ǲ��ǹ����ֻ��ϣ���ܹ���Զ���ֵĻ���ȥ�����𰸡�
      ��������������̣�Ц�ݵ�Ȼ��һ��û�н���...û�п�ʼ���ս��һ��Լ��ġ��𰸡�---��һ�Ŵ�δĥ����ġ���</div>
  </div>
</div>
<div style="height:20px;"></div>
<div>
<table width="980" border="2" align="center" cellpadding="0" cellspacing="2" bordercolor="#262626">
  <tr>
    <td height="30" bgcolor="#1a3600" align="center"><span class="tit">���Ա�</span></td>
  </tr>
  <tr>
    <td height="25" align="center"><a href="?action=add" >��������</a>&nbsp;&nbsp;<a href="index.asp">�鿴����</a>&nbsp;&nbsp;</td>
  </tr>
</table>
<%
Action = LCase(request("action"))	'�õ�actionֵ
Select Case Trim(Action)			'���ù���
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

sub list()	'�����б�
sql="select * from book  order by id desc"
set rs=server.CreateObject("adodb.recordset")
rs.open sql,conn,1,3,1
if rs.eof then
	response.Write("<table width=""980"" border=""1"" align=""center"" cellpadding=""0"" cellspacing=""1"" bordercolor=""#CCCCCC"" style=""margin-top:5px;"">")
	response.Write("<tr>")
	response.Write("<td bgcolor=""#F3F3F3"" style=""padding:7px;"">û�м�¼</td>")
	response.Write("</tr>")
	response.Write("</table>")
else
	rs.pagesize = 4
	page=cint(request("page"))	'cint ������������ȡ��ӽ�����ż��
	if page="" or page<1  then page=1
	if page>= rs.pagecount then page=rs.pagecount
	rs.AbsolutePage = page
		call Numpage()
	for i=1 to rs.pagesize %>
    <a name="book"></a>
<table width="980" border="1" align="center" cellpadding="0" cellspacing="1" bordercolor="#262626" style="margin-top:5px;">
  <tr>
    <td bgcolor="#0c1800" style="padding:7px;"><span title="�绰��<%=rs("tel")%>&#10��ַ��<%=rs("add")%>&#10emal��<%=rs("email")%>"><%=tlen(rs("name"),12)%></span> �� <%=rs("time")%> �����ԣ� 
    <%if session("userid")<>"" then%><a href="?action=edit&amp;id=<%=rs("id")%>">�޸�</a> <a href="?action=del&id=<%=rs("id")%>">ɾ��</a><%end if%></td>
  </tr>
  <tr>
    <td style="padding:7px;"><%=tlen(rs("body"),300)%></td>	
  </tr>
  <%if rs("reply") <> "" then%>
  <tr>
    <td bgcolor="#0c1800" style="padding:7px;">����Ա�ظ���<%=tlen(rs("reply"),300)%></td>
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

sub add() 	'���Թ���
if isEdit = True then
	if request.QueryString("id")="" then
		response.write"<script language='javascript'>alert('�������󣬴����Բ����ڣ�')</script>"
		response.write("<script>window.location='index.asp'</script>")
		response.end
	else
	set rs=conn.execute("select * from book where id="&request.QueryString("id")&"")
		if rs.eof then 
			response.write"<script language='javascript'>alert('�������󣬴����Բ����ڣ�')</script>"
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
	  <td width="20%" height="26" align="right">����������</td>
      <td width="80%" align="left"><input name="name" type="text" id="name" value="<%if isEdit = True then response.Write(""&rs("name")&"")%>" / style="background:#666; border:none; margin-left:10px;"> *</td>
	</tr>
	<tr>
	  <td height="26" align="right">��&nbsp;&nbsp;&nbsp;&nbsp;����</td>
	  <td align="left"><input name="tel" type="text" id="tel" value="<%if isEdit = True then response.Write(""&rs("tel")&"")%>" /style="background:#666; border:none; margin-left:10px;"></td>
	</tr>
	<tr>
	  <td height="26" align="right">��&nbsp;&nbsp;&nbsp;&nbsp;ַ��</td>
	  <td align="left"><input name="add" type="text" id="add" value="<%if isEdit = True then response.Write(""&rs("add")&"")%>" /style="background:#666; border:none; margin-left:10px;"></td>
	</tr>
	<tr>
	  <td height="26" align="right">email��</td>
	  <td align="left"><input name="email" type="text" id="email" value="<%if isEdit = True then response.Write(""&rs("email")&"")%>" /style="background:#666; border:none; margin-left:10px;"></td>
	</tr>
	<tr>
	  <td align="right">�������ݣ�</td>
	  <td align="left"><textarea name="body" cols="40" rows="7" id="body"style="background:#666; border:none; margin-left:10px;"><%if isEdit = True then response.Write(""&rs("body")&"")%></textarea>  
	  *</td>
	</tr>
	<%if isEdit = True then%>
	<tr>
	  <td align="right">���Իظ���</td>
	  <td align="left"><textarea name="reply" cols="40" rows="7" id="reply"style="background:#666; border:none; margin-left:10px;"><%=rs("reply")%></textarea>  
	  </td>
	</tr>
	<%end if%>
	<tr>
	  <td height="76" colspan="2" align="center">���������������300������ ������������ʾ<br /><br /><input type="submit" name="Submit2" value=" �� �� " /></td>
	</tr>
</form>
</table>
<%end sub

sub login()		'��½����%>
<table width="980" border="1" align="center" cellpadding="0" cellspacing="1" bordercolor="#262626"  style="margin-top:5px;">
<form id="form3" name="form3" method="post" action="?action=chk">
	<tr>
    	<td style=" padding:7px;">   �ʺţ�
        <input name="userid" type="text" id="userid" size="12" />
         &nbsp;&nbsp;���룺
        <input name="pass" type="password" id="pass" size="12" />
         &nbsp; &nbsp;<input type="submit" name="Submit3" value=" �� ½ " /> 
         Ĭ���ʺ����� admin
		</td>
	</tr>
</form>
</table>
<%end sub%>
<table width="980" border="2" align="center" cellpadding="0" cellspacing="2" bordercolor="#262626" style="margin-top:5px;">
  <tr>
    <td bgcolor="#1a3600"  style="padding:7px;">
    ��ӭ��λ����<br/>
    www.ai1996.com<br />
    �������ڣ�2012-04-21<br />
    ��һ�̣�������������ʵ��������<br />
    ϣ���ܹ����һ����ҳ���ʦ�Ĺ���  ��ϵ�绰:15243987274</td>
  </tr>
</table>
</div>
<div class="link">
  <div class="wrap">
  <a href="http://www.pgl66.com" target="_blank">�����</a><a href="http://duty.hnsn.org" target="_blank">л�潨</a><a href="http://www.say17.com" target="_blank">л����</a><a href="http://www.mmmm5.com" target="_blank">����</a><a href="http://www.xl71.com" target="_blank">��С��</a><a href=" http://www.next45.com" target="_blank">�ػ���</a><a href="http://www.y6363.com" target="_blank">����ԭ</a><a href="http://www.feixly95.com" target="_blank">���ɴ�</a><a href="http://wshenhua.35free.net" target="_blank">�껨</a><a href="http://www.huaerl.com" target="_blank">��ջ�</a><a href="http://www.xinjin2.com" target="_blank">��˳��</a></div>
</div>
</body>
</html>
<script>
function formcheck()
{
 
 if (document.add.name.value == "")
    {
    alert("����д����������");
    document.add.name.focus();
    return (false);
    }


  if (document.add.name.value.length > 5)
  {
    alert("�����������ܳ���5���ַ���");
	document.add.name.focus();
    return false;
  }
  
 if (document.add.body.value == "")
    {
    alert("����д�������ݣ�");
    document.add.body.focus();
    return (false);
    }


  if (document.add.body.value.length > 300)
  {
    alert("�������ݲ��ܳ���300���ַ���");
	 document.add.body.focus();
    return false;
  }


  
 return true;
}


//����ַ���
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
