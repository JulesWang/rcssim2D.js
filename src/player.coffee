
class Player
        constructor:(p, dir, wm, side) ->
                @fc = 'grey'
                @sc = 'black'
                @m = 5.0 #kg
                @r = 10
                @t = 'none'
                @v = [0, 0]
                @decay = 0.4
                @maxdashforce = 6
                @maxkickforce = 2
                @maxturnangle = 0.1
                @force = 0
                @kickforce = 0
                @dd = 0
                @wm = wm

                @side = side
                @p = @transpos(p)
                @d = @transdir(dir)

        reset:() ->
                #TODO
                return
        
        render:(canvas) ->
                # draw body
                stroke_color = @client.stroke_color ? @sc
                fill_color = @client.fill_color ? @fc
                x = @p[0]
                y = @p[1]
                canvas.fillCircle(fill_color, x, y, @r)
                canvas.drawCircle(stroke_color, x, y, @r)

                # draw dir, sc
                canvas.fillArc(stroke_color, x, y, @r, @d-2*Math.PI/5, @d+2*Math.PI/5)
        take_action:() ->
                actions = @client.think(@getbasicinfo())
                for action of actions
                        switch action
                                when 'jump' then @jump(actions['jump'])
                                when 'dash' then @dash(actions['dash'])
                                when 'turn' then @turn(actions['turn'])
                                when 'kick' then @kick(actions['kick'])


        update:() ->
                if @wm.selected != this
                        @take_action()
                    
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

                @wm.pitch.last_touch_ball = @side if @kickforce != 0
                @wm.ball.acc(unitv, @kickforce)
                @kickforce = 0

        dash:(force) ->
                force = @maxdashforce if force > @maxdashforce
                force = -@maxdashforce if force < -@maxdashforce

                @force = force

        turn:(dir) ->
                @dd = dir
                @dd = @maxturnangle if @dd > @maxturnangle
                @dd = -@maxturnangle if @dd < -@maxturnangle

        kick:(force) ->
                return if not @wm

                bp = @wm.ball.p
                return if Vector2d.distance(@p, bp) > 20

                p2b = Vector2d.subtract(bp, @p)
                unitv = Vector2d.vector(@d)
                return if Math.abs(Vector2d.angle(p2b, unitv) ) > Math.PI/6

                force = @maxkickforce if force > @maxkickforce
            
                @kickforce = force

                
        jump:(pos) ->
                @p = clone(pos)
                @p = @transpos(@p)


        getbasicinfo:() ->
                wm = {}
                wm.leftplayers = []
                wm.rightplayers = []
                for player in @wm.leftplayers
                    p = clone(player.p)
                    p = @transpos(p)
                    wm.leftplayers.push p

                for player in @wm.rightplayers
                    p = clone(player.p)
                    p = @transpos(p)
                    wm.rightplayers.push p

                wm.gamestate = @wm.pitch.state
                wm.ball = clone(@wm.ball.p)
                wm.ball = @transpos(wm.ball)
                wm.mydir = @transdir(@d)
                return wm

        # whatever the team is at left or right
        # the x axis of our half-field is always negative.
        transpos:(p) ->
                return p if @side is 'left'
                p[0] = -p[0]
                p[1] = -p[1]
                return p

        transdir:(dir) ->
                return dir if @side is 'left'
                return Math.normaliseRadians(dir+Math.PI)

