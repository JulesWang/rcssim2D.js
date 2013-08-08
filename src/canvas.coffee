#    Rcssim2d.js - A robot soccer simulator 2d in js
#    Copyright 2013 Jules Wang
#
#    Rcssim2d.js is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    Rcssim2d.js is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
Canvas = (ctx, w, h) ->
  
  # Add object properties like this
  @ctx = ctx
  @w = w
  @h = h

# Add methods like this.  All Render objects will be able to invoke this
Canvas::fillRect = (color, rect) ->
  @ctx.fillStyle = color
  @ctx.fillRect @xscreen(rect.x), @yscreen(rect.y), rect.w, rect.h

Canvas::drawRect = (color, rect) ->
  @ctx.strokeStyle = color
  @ctx.strokeRect @xscreen(rect.x), @yscreen(rect.y), rect.w, rect.h

Canvas::drawLine = (color, sx, sy, ex, ey) ->
  @ctx.strokeStyle = color
  @ctx.beginPath()
  @ctx.moveTo @xscreen(sx), @yscreen(sy)
  @ctx.lineTo @xscreen(ex), @yscreen(ey)
  @ctx.stroke()

Canvas::drawArc = (color, x, y, r, sAngle, eAngle) ->
  @ctx.strokeStyle = color
  @ctx.beginPath()
  
  #ctx.arc(100,75,50,0,2*Math.PI);
  @ctx.arc @xscreen(x), @yscreen(y), r, sAngle, eAngle
  @ctx.stroke()

Canvas::fillArc = (color, x, y, r, sAngle, eAngle) ->
  @ctx.fillStyle = color
  @ctx.beginPath()
  @ctx.arc @xscreen(x), @yscreen(y), r, sAngle, eAngle
  @ctx.fill()

Canvas::drawCircle = (color, x, y, r) ->
  @drawArc color, x, y, r, 0, 2 * Math.PI

Canvas::fillCircle = (color, x, y, r) ->
  @fillArc color, x, y, r, 0, 2 * Math.PI

Canvas::drawText = (color, font, text, x, y) ->
  @ctx.fillStyle = color
  @ctx.font = font
  x = x - @ctx.measureText(text).width / 2
  @ctx.fillText text, @xscreen(x), @yscreen(y)

Canvas::xscreen = (x) ->
  x + @w / 2

Canvas::yscreen = (y) ->
  y + @h / 2
