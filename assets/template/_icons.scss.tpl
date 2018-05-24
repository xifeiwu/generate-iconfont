@font-face {
  font-family: "<%= fontName %>";
  src: url('<%= fontPath %><%= fontName %>.eot?#iefix') format('eot'),
  url('<%= fontPath %><%= fontName %>.woff') format('woff');
}

@mixin <%= cssClass%>-styles {
  font-family: "<%= fontName %>";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  // speak: none; // only necessary if not using the private unicode range (firstGlyph option)
  text-decoration: none;
  text-transform: none;
}

.<%= fontName %>-svg {
  width: 24px;
  height: 24px;
}

[class^="<%= fontName %>-"] {
  font-size: 24px;
}


%<%= cssClass%> {
  @include <%= cssClass%>-styles;
}

@function <%= cssClass%>-char($filename) {
  $char: "";
<% _.each(glyphs, function(glyph) { %>
  @if $filename == <%= glyph.fileName %> {
  $char: "\<%= glyph.codePoint %>";
}<% }); %>

@return $char;
}

@mixin <%= cssClass%>($filename, $insert: before, $extend: true) {
&:#{$insert} {
  @if $extend {
    @extend %<%= cssClass%>;
  } @else {
    @include <%= cssClass%>-styles;
  }
  content: <%= cssClass%>-char($filename);
}
}

<% _.each(glyphs, function(glyph) { %>.<%= cssClass%>-<%= glyph.fileName %> {
  @include <%= cssClass%>(<%= glyph.fileName %>);
}
<% }); %>
