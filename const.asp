<%
option explicit
dim rs,sql
dim x,y,ii,page,i,f,beginpage,endpage,showNum,Action,edit,userid,pass,isEdit
dim Fy_Post,Fy_Get,Fy_In,Fy_Inf,Fy_Xh,Fy_db,Fy_dbstr
dim aa,bb,cc,dd,ee,ff,gg,hh,jj
'���ݿ�����
dim conn,connstr
set conn=server.CreateObject("adodb.connection")
set rs=server.CreateObject("adodb.recordset")
connstr="Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("db.mdb")		'���ݿ�·��������
conn.Open connstr



sub textpage()	'���ַ�ҳ
	
		response.Write("<table width=""980"" border=""1"" align=""center"" cellpadding=""0"" cellspacing=""1"" bordercolor=""#262626"" style=""margin-top:5px;"">")
		response.Write("<tr>")
		response.Write("<td style=""padding:7px;""> "&rs.pagesize&" ����Ϣÿҳ���� "&rs.pagecount&" ҳ����ǰ��  "&page&" ҳ <a href=""?page=1"">��ҳ</a>")
	if page <=1 then
		response.Write(" ��ҳ ")
	else
		response.Write(" <a href=""?page="&page-1&""">��ҳ</a> ")
	end if
	if page = rs.pagecount then 
		response.Write(" ��ҳ ")
	else
		response.Write(" <a href=""?page="&page+1&""">��ҳ</a> ")
	end if
		response.Write("  <a href=""?page="&rs.pagecount&""">βҳ</a>")
		response.Write("  <select  name=""page"" id=""page"" onChange=""var jmpURL=this.options[this.selectedIndex].value ; if(jmpURL!='') {window.location=jmpURL;} else {this.selectedIndex=0 ;}"" >")
	
    for i=1 to rs.pagecount
		response.Write("  <option value=""?page="&i&""" ")
	if ""&page&""=""&i&"" then 
		response.Write(" selected > ��"&i&"ҳ</option> ")
	else
		response.Write(" > ��"&i&"ҳ</option> ")
	end if
    next
		response.Write(" </select> ")
		response.Write(" </td> </tr>")
		response.Write("</table>")
end sub

sub Numpage()	'���ַ�ҳ
	
		beginpage=page-5	'��ʾ��ǰҳǰ5ҳ�ͺ�5ҳ ����ҳ������ʱ��ʾ̫�� �ɸ�����Ҫ�����޸�
		endpage=page+5
		if beginpage<1 then beginpage=1
		if endpage>rs.pagecount then endpage=rs.pagecount
	for f=beginpage to endpage
		showNum = showNum & "[ <a href=""?page="&f&""">"&f&"</a> ]"
	next
	
		response.Write("<table width=""980"" border=""1"" align=""center"" cellpadding=""0"" cellspacing=""1"" bordercolor=""#262626"" style=""margin-top:5px;"">")
		response.Write("<tr>")
		response.Write("<td style=""padding:7px;""> " & showNum & " </td>")
		response.Write("</tr>")
		response.Write("</table>")
end sub


Function tlen(txt,strlen)		'���ֽضϺ���
	txt=trim(txt)
	x = len(txt)
	y = 0
	if x >= 1 then
		for ii = 1 to x
			if asc(mid(txt,ii,1)) < 0 or asc(mid(txt,ii,1)) >255 then '����Ǻ���
				y = y + 2
			else
				y = y + 1
			end if
			if y >= strlen then
				txt = left(trim(txt),ii)&"..."
				exit for
			end if
		next
		tlen = txt
	else
		tlen = ""
	end if
End Function




function   mfkiqpl(text)   		'ת��HTML��Ǻ��� �����ռ�  
          aa   =   replace(text,   ">",   "&gt;")   
          bb   =   replace(aa,   "<",   "&lt;")   
          cc   =   Replace(bb,   CHR(32),   "<I></I>&nbsp;")   
          dd   =   Replace(cc,   CHR(9),   "&nbsp;")   
          ee   =   Replace(dd,   CHR(34),   "&quot;")   
          ff   =   Replace(ee,   CHR(39),   "&#39;")   
          gg   =   Replace(ff,   CHR(13),   "")   
          hh   =   Replace(gg,   CHR(10)   &   CHR(10),   "</P><P>   ")   
          jj   =   Replace(hh,   CHR(10),   "<BR>   ")   
          mfkiqpl=   jj   
  end   function

%>