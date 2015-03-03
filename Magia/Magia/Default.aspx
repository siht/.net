<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="Magia._Default" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>puzzle</title>
    <script type="text/javascript" src="Scripts/puzzle.js"></script>
</head>
<body>
    <form id="form1" runat="server">
    <div id="play_space">
    <% 
        Response.Write("<table width=100 height=100>");
        for (int i = 0; i < 4; i++)
        {
            Response.Write("<tr>");
            for (int j = 0; j < 4; j++)
                Response.Write("<td id='" + i + "_" + j + "' align='center' onclick='NumberClicked(id)'>a</td>");
            Response.Write("</tr>");
        }
        Response.Write("</table>");
      %>
      <br /><br /><br />
        <input id="Button1" type="button" value="barajear" onclick="__init__()"/></div>
    </form>
    <div id="resultados">
    </div>
</body>
</html>
