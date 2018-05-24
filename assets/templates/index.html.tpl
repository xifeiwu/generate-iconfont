<html>

<head>
  <link rel="stylesheet" type="text/css" href="./assets/fonts/<%=projectName%>.css">
  <script type="text/javascript" src="./assets/fonts/<%=projectName%>.js"></script>
  <style>
  ul {
    display: block;
    list-style-type: none;
    margin: 1em 0;
    padding-left: 0px;
  }
  ul li {
    display: inline-block;
    width: 20%;
    text-align: center;
    width: 90px;
    margin: 5px 0px;
  }
  </style>
</head>

<body>
  <div>
    <p>all svg files in project: projects/<%=projectName%></p>
  </div>
  <ul>
    <% _.forEach(svgFont, function(icon) { %>
      <li>
        <i class="<%=projectName%>-<%- icon %>"></i>
        <div class=name><%- icon %></div>
      </li>
      <% }); %>
    <% _.forEach(svgSymbols, function(icon) { %>
      <li>
        <svg class="<%=projectName%>-svg <%=projectName%>-<%- icon %>" aria-hidden="true">
            <use xlink:href="#<%=projectName%>-<%- icon %>"></use>
        </svg>
        <div class=name><%- icon %></div>
      </li>
      <% }); %>
  </ul>
</body>

</html>