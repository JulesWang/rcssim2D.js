
class Player
        constructor:(x, y, dir) ->
                @fc = 'gray'
                @sc = 'black'
                @m = 60.0 #kg
                @r = 10
                @t = 'none'
                @x = x
                @y = y
                @v = [0, 0]
                @d = dir
                @decay = 0.4
                @MAXDASHFORCE = 36
                @MAXKICKFORCE = 36
                @MAXTURNANGLE = 0.1
                @force = 0
                @dd = 0
        
        render:(canvas) ->
                # draw body
                strokeColor = @sc
                fillColor = @fc
                canvas.fillCircle(@fc, @x, @y, @r)
                canvas.drawCircle(@sc, @x, @y, @r)

                # draw dir, sc
                canvas.fillArc(@sc, @x, @y, @r, @d-2*Math.PI/5, @d+2*Math.PI/5)

        update:() ->
                if Vector2d.len(@v) > 1e-3
                        ds = @v
                        [@x, @y] = Vector2d.add([@x, @y], ds)
                        @v = Vector2d.multiply(@v, @decay)

                a = @force / @m
                @force = 0
                unitv = Vector2d.vector(@d)
                dv = Vector2d.multiply(unitv, a)
                @v = Vector2d.add(@v, dv)

                @d += @dd
                @dd = 0

        dash:(force) ->
                force = @MAXDASHFORCE if force > @MAXDASHFORCE
                force = -@MAXDASHFORCE if force < -@MAXDASHFORCE

                @force = force

        turn:(dir) ->
                @dd = dir
                @dd = @MAXTURNANGLE if @dd > @MAXTURNANGLE
                @dd = -@MAXTURNANGLE if @dd < -@MAXTURNANGLE

        kick:(force) ->
                return if not @ball
                return if Vector2d.distance([@x,@y], [@ball.x, @ball.y]) > 20
                p2b = Vector2d.subtract([@ball.x, @ball.y], [@x, @y])
                unitv = Vector2d.vector(@d)
                return if Math.abs(Vector2d.angle(p2b, unitv) ) > Math.PI/6
                force = @MAXKICKFORCE if force > @MAXKICKFORCE

                @ball.acc(unitv, force)
                
