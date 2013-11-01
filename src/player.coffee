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

class Player
        constructor:(p, dir, wm, side) ->
                @fc = 'grey'
                @sc = 'black'
                @m = 5.0 #kg
                @r = 6.5
                @t = 'none'
                @v = [0, 0]
                @decay = 0.4
                @maxdashforce = 6
                @maxkickforce = 2.2
                @maxturnangle = 0.1
                @force = 0
                @kickforce = 0
                @dd = 0
                @wm = wm

                @side = side
                @p = @transpos(p)
                @d = @transdir(dir)
                @initpos = clone(@p)
                @last_v = clone(@v)

        reset:() ->
                @p = clone(@initpos)
        
        render:(canvas) ->
                # draw body
                if !@client or !@client.fill_color
                        fill_color = @fc
                else
                        fill_color = @client.fill_color

                stroke_color = @sc
                x = @p[0]
                y = @p[1]
                canvas.fillCircle(fill_color, x, y, @r)
                canvas.drawCircle(stroke_color, x, y, @r)

                # draw dir, sc
                canvas.fillArc(stroke_color, x, y, @r, @d-2*Math.PI/5, @d+2*Math.PI/5)
        take_action:() ->
                return if not @client
                actions = @client.think(@getbasicinfo())
                for action of actions
                        switch action
                                when 'jump' then @jump(actions['jump'])
                                when 'dash' then @dash(actions['dash'])
                                when 'turn' then @turn(actions['turn'])
                                when 'kick' then @kick(actions['kick'])
                                when 'suck' then @suck()


        update:() ->
                if @wm.selected != this
                        @take_action()
                    
                @last_v = clone(@v)
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
                return if force <= 0

                bp = @wm.ball.p
                return if Vector2d.distance(@p, bp) > @r + @wm.ball.r+3

                p2b = Vector2d.subtract(bp, @p)
                unitv = Vector2d.vector(@d)
                return if Math.abs(Vector2d.angle(p2b, unitv)) > Math.PI/6

                force = @maxkickforce if force > @maxkickforce
            
                @kickforce = force

                
        jump:(pos) ->
                @p = clone(pos)
                @p = @transpos(@p)

        # Goalie only, our robots dont have hands, so they suck like the cleaner
        suck:() ->
                pos = @transpos(@wm.ball.p)
                return if @client.teamnum != 0
                return if pos[0] > -@wm.pitch.pitch_length/2 + @wm.pitch.penalty_area_length
                return if pos[1] > @wm.pitch.penalty_area_width/2

                bp = @wm.ball.p
                return if Vector2d.distance(@p, bp) > @r + @wm.ball.r + 3

                p2b = Vector2d.subtract(bp, @p)
                unitv = Vector2d.vector(@d)
                return if Math.abs(Vector2d.angle(p2b, unitv)) > Math.PI/6
               
                unitdir = Vector2d.vector(@d)
                @wm.ball.p = Vector2d.add(Vector2d.multiply(unitdir, @wm.ball.r + @r + 0.1), @p)
                @wm.ball.v = [0,0]
                
                @wm.pitch.change_state('goalkick_' + @side)
 
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
                return [-p[0], -p[1]]

        transdir:(dir) ->
                return dir if @side is 'left'
                return Math.normaliseRadians(dir+Math.PI)

