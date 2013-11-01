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

class Ball
        constructor: (x, y) ->
                @r = 2.5
                @m = 0.2 #kg
                @sc = "#FFA500"
                @fc = "#FFA500"
                @p = [x, y]
                @v = [0, 0]
                @decay = 0.94
                @last_p = @p
                @last_v = @v
                
                
        acc: (dir, force) ->
                unitdir = Vector2d.unit(dir)
                a = Vector2d.multiply(unitdir, force/@m)
                dv = a
                @v = Vector2d.add(@v, dv)
                #console.log(@v)
                #if Vector2d.len(@v) >

        render: (canvas) ->
                x = @p[0]
                y = @p[1]
                canvas.drawCircle(@sc, x, y, @r+1)
                canvas.fillCircle(@fc, x, y, @r)

        update: () ->
                #Simulate Friction. Make sure the speed is positive 
                @last_p = clone(@p)
                @last_v = clone(@v)
                if Vector2d.len(@v) > 1e-3
                        ds = @v
                        @p = Vector2d.add(@p, ds)
                        @v = Vector2d.multiply(@v, @decay)

        reset: () ->
                @p = [0,0]
                @v = [0,0]
                @last_p = [0,0]
                @last_v = [0,0]
                
