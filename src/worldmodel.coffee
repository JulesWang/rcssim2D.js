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

class WorldModel
        constructor: () ->
                @objs = []
                @leftplayers = []
                @rightplayers = []

        register: (obj) ->
                @objs.push obj

        unregister: (obj) ->
                idx = @objs.indexOf obj
                @objs.splice(idx, 1) if idx >= 0 #delete obj

        render: (canvas) ->
                for obj in @objs
                        obj.render(canvas) if obj.render

        update: () ->
                for obj in @objs
                        obj.update() if obj.update
                wm =
                    leftplayers: @leftplayers
                    rightplayers: @rightplayers
                    ball: @ball
                @pitch.checkrules(this)
                for i in [0...@objs.length]
                        for j in [i+1...@objs.length]
                                @collide(@objs[i], @objs[j])

        reset: () ->
                for obj in @objs
                        obj.reset() if obj.reset

        switch_sides: () ->
                i = 0
                for left_player in @leftplayers
                        right_player = @rightplayers[i]
        
                        [left_player.client, right_player.client] = [right_player.client, left_player.client]
                        [left_player.sc, right_player.sc] = [right_player.sc, left_player.sc]
                        left_player.client.side = 'left'
                        right_player.client.side = 'right'
                        i += 1

        collide: (x,y) ->
                return if not x.r
                return if not y.r
                dis = Vector2d.distance(x.p, y.p)
                return if dis >= x.r+y.r

                # hack
                if x.r > y.r and x.side
                        @pitch.last_touch_ball = x.side
                if x.r < y.r and y.side
                        @pitch.last_touch_ball = y.side
                m1 = x.m
                m2 = y.m
                v1 = x.v
                v2 = y.v
                left = 0

                c = 10
                for i in [1..c]
                        dv1 = Vector2d.multiply(x.last_v, i/c)
                        dv2 = Vector2d.multiply(y.last_v, i/c)
                        p1 = Vector2d.subtract(x.p, dv1)
                        p2 = Vector2d.subtract(y.p, dv2)
                        d = Vector2d.distance(p1, p2)
                        if  d - x.r - y.r > 0
                                left = c - i
                                x.p = p1
                                y.p = p2
                                break

                normal = Vector2d.unit(Vector2d.subtract(x.p,y.p))
                tangent = [-normal[1], normal[0]]

                v1a = Vector2d.dot(v1, normal)
                v1b = Vector2d.dot(v1, tangent)
                v2a = Vector2d.dot(v2, normal)
                v2b = Vector2d.dot(v2, tangent)
                if v1a > v2a
                    return
                # m1v1a + m2v2a = m1v1c + m2v2c
                # e -> elastic coefficient
                # e = (-v1c + v2c)/(v1a - v2a)
                e = 0.4
                v1c = v1a - (1+e)*(m2/(m1+m2))*(v1a - v2a)
                v2c = v2a + (1+e)*(m1/(m1+m2))*(v1a - v2a)
                
                #angle = Math.atan2(normal[y], normal[0])
                x.v[0] = v1c*normal[0] + v1b*tangent[0]
                x.v[1] = v1c*normal[1] + v1b*tangent[1]
                
                y.v[0] = v2c*normal[0] + v2b*tangent[0]
                y.v[1] = v2c*normal[1] + v2b*tangent[1]

                
                overlap = dis - x.r - y.r
                # Move objs so they no longer overlap.
                x.p = Vector2d.add(x.p, Vector2d.multiply(normal, -overlap*x.r/(x.r+y.r)))
                y.p = Vector2d.add(y.p, Vector2d.multiply(normal, overlap*y.r/(x.r+y.r)))


                if left
                        x.p = Vector2d.add(x.p, Vector2d.multiply(x.v, left/c))
                        y.p = Vector2d.add(y.p, Vector2d.multiply(y.v, left/c))
                        
