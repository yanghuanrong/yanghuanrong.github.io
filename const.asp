<%
option explicit
dim rs,sql
dim x,y,ii,page,i,f,beginpage,endpage,showNum,Action,edit,userid,pass,isEdit
dim Fy_Post,Fy_Get,Fy_In,Fy_Inf,Fy_Xh,Fy_db,Fy_dbstr
dim aa,bb,cc,dd,ee,ff,gg,hh,jj
'数据库连接
dim conn,connstr
set conn=server.CreateObject("adodb.connection")
set rs=server.CreateObject("adodb.recordset")
connstr="Provider=Microsoft.Jet.OLEDB.4.0;Data Source=" & Server.MapPath("db.mdb")		'数据库路径和名称
conn.Open connstr



sub textpage()	'文字分页
	
		response.Write("<table width=""980"" border=""1"" align=""center"" cellpadding=""0"" cellspacing=""1"" bordercolor=""#262626"" style=""margin-top:5px;"">")
		response.Write("<tr>")
		response.Write("<td style=""padding:7px;""> "&rs.pagesize&" 条信息每页，共 "&rs.pagecount&" 页，当前第  "&page&" 页 <a href=""?page=1"">首页</a>")
	if page <=1 then
		response.Write(" 上页 ")
	else
		response.Write(" <a href=""?page="&page-1&""">上页</a> ")
	end if
	if page = rs.pagecount then 
		response.Write(" 下页 ")
	else
		response.Write(" <a href=""?page="&page+1&""">下页</a> ")
	end if
		response.Write("  <a href=""?page="&rs.pagecount&""">尾页</a>")
		response.Write("  <select  name=""page"" id=""page"" onChange=""var jmpURL=this.options[this.selectedIndex].value ; if(jmpURL!='') {window.location=jmpURL;} else {this.selectedIndex=0 ;}"" >")
	
    for i=1 to rs.pagecount
		response.Write("  <option value=""?page="&i&""" ")
	if ""&page&""=""&i&"" then 
		response.Write(" selected > 第"&i&"页</option> ")
	else
		response.Write(" > 第"&i&"页</option> ")
	end if
    next
		response.Write(" </select> ")
		response.Write(" </td> </tr>")
		response.Write("</table>")
end sub

sub Numpage()	'数字分页
	
		beginpage=page-5	'显示当前页前5页和后5页 避免页数过多时显示太多 可根据需要自行修改
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


Function tlen(txt,strlen)		'文字截断函数
	txt=trim(txt)
	x = len(txt)
	y = 0
	if x >= 1 then
		for ii = 1 to x
			if asc(mid(txt,ii,1)) < 0 or asc(mid(txt,ii,1)) >255 then '如果是汉字
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




function   mfkiqpl(text)   		'转换HTML标记函数 网上收集  
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