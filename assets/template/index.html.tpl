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
    float: left;
    width: 20%;
  }
  </style>
</head>

<body>
  <div>
    <p>This a gulp-iconfont and gulp-iconfont-css example for the testing purpose of converting svg to iconfont.</p>
    <p>Add svg icons to /app/assets/icons folder will automated generate the iconfont and put it on page.</p>
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