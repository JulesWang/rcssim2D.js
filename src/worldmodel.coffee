
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
                [@rightplayers, @leftplayers] = [@leftplayers, @rightplayers]

                for player in @leftplayers
                        player.side = 'left'
                        player.client.side = 'left'
                for player in @rightplayers
                        player.side = 'right'
                        player.client.side = 'right'

        collide: (x,y) ->
                return if not x.r
                return if not y.r
                dis = Vector2d.distance(x.p, y.p)
                return if dis > x.r+y.r

                # hack
                if x.r > y.r
                        @pitch.last_touch_ball = x.side
                if x.r < y.r
                        @pitch.last_touch_ball = y.side
                m1 = x.m
                m2 = y.m
                v1 = x.v
                v2 = y.v

               
                normal = Vector2d.unit(Vector2d.subtract(x.p,y.p))
                tangent = [-normal[1], normal[0]]

                v1a = Vector2d.dot(v1, normal)
                v1b = Vector2d.dot(v1, tangent)
                v2a = Vector2d.dot(v2, normal)
                v2b = Vector2d.dot(v2, tangent)
                # m1v1a + m2v2a = m1v1c + m2v2c
                # v1c = (m1v1a + m2v2a - m2v2c) / m1

                # e -> elastic coefficient
                # e = (-v1c + v2c)/(v1a - v2a)
                # e(v1a - v2a) = (-(m1v1a+m2v2a - m2v2c) / m1 + v2c)
                # m1*e(v1a - v2a) = -m1v1a-m2v2a + m2v2c + v2c*m1
                # m1*e(v1a - v2a)+m1v1a + m2v2a = m2v2c + v2c*m1
                # m1*e(v1a - v2a)+m1v1a + m2v2a/ (m2 + m1) = v2c
                v2c = (m1*0.2*(v1a - v2a) + m1*v1a + m2*v2a) / (m2 + m1)
                v1c = (m1*v1a + m2*v2a - m2*v2c) / m1
                
                #angle = Math.atan2(normal[y], normal[0])
                x.v[0] = v1c*normal[0] + v1b*tangent[0]
                x.v[1] = v1c*normal[1] + v1b*tangent[1]
                
                y.v[0] = v2c*normal[0] + v2b*tangent[0]
                y.v[1] = v2c*normal[1] + v2b*tangent[1]

                
                overlap = dis - x.r - y.r
                # Move objs so they no longer overlap.
                x.p = Vector2d.add(x.p, Vector2d.multiply(normal, -overlap*x.r/(x.r+y.r)))
                y.p = Vector2d.add(y.p, Vector2d.multiply(normal, overlap*y.r/(x.r+y.r)))
        
