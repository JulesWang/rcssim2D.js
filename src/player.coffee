
class Player
        constructor:(p, dir, color, wm, teamname) ->
                @fc = color
                @sc = 'black'
                @m = 5.0 #kg
                @r = 10
                @t = 'none'
                @p = p
                @v = [0, 0]
                @d = dir
                @decay = 0.4
                @MAXDASHFORCE = 6
                @MAXKICKFORCE = 2
                @MAXTURNANGLE = 0.1
                @force = 0
                @dd = 0
                @wm = wm
                @teamname = teamname
        
        render:(canvas) ->
                # draw body
                strokeColor = @sc
                fillColor = @fc
                x = @p[0]
                y = @p[1]
                canvas.fillCircle(@fc, x, y, @r)
                canvas.drawCircle(@sc, x, y, @r)

                # draw dir, sc
                canvas.fillArc(@sc, x, y, @r, @d-2*Math.PI/5, @d+2*Math.PI/5)

        update:() ->
               # @ai.think()
                if Vector2d.len(@v) > 1e-5
                        ds = @v
                        @p = Vector2d.add(@p, ds)
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
                return if not @wm

                bp = @wm.ball.p
                return if Vector2d.distance(@p, bp) > 20

                p2b = Vector2d.subtract(bp, @p)
                unitv = Vector2d.vector(@d)
                return if Math.abs(Vector2d.angle(p2b, unitv) ) > Math.PI/6

                force = @MAXKICKFORCE if force > @MAXKICKFORCE

                @wm.ball.acc(unitv, force)
                
