
class Foo
        constructor:(num, side) ->
                # DO NOT MODIFY FOLLOWING VARIBLE NAMES
                # choose a nice name for your team
                @teamname = 'Foo'
                # choose a distinctive color for your team
                @fill_color = 'red'
                @teamnum = num
                @side = side
                #--------------------------------------

                @fmt = new Fmt442()
                @eps = Math.PI/6

        getfmtpos:(bp) ->
                pos = @fmt.p[@teamnum]
                pos.x = (PITCH_HALF_LENGTH+bp[0]) * pos.ratio-PITCH_HALF_LENGTH if @teamnum != 0
                return [pos.x, pos.y]

        think:(wm) ->
                @wm = wm

                if @side is 'left'
                        @teammates = @wm.leftplayers
                else #if @side is 'right'
                        @teammates = @wm.rightplayers
                @mypos = @teammates[@teamnum]
                @mydir = @wm.mydir

                switch @wm.gamestate
                        when 'before_kickoff' then return {jump:@getfmtpos(@wm.ball, @teamnum)}
                        when 'game_over' then return {}
                        when 'play_on' then return @playon()
                        when 'goalkick_left'
                                if @side is 'left'
                                        return @goalkick()
                                else
                                        return @playon()
                        when 'goalkick_right'
                                if @side is 'right'
                                        return @goalkick()
                                else
                                        return @playon()
                        else
                                return @playon()

        playon: () ->
                if is_goalie(@teamnum)
                        return @goalie()
                @play()

        goalkick: () ->
                @play()

        goalie: () ->
                if Vector2d.distance(@mypos, @wm.ball) < HALF_GOAL_WIDTH and in_my_penalty(@wm.ball)
                        ret = @goto(@wm.ball)
                        ret.suck = 0
                        return ret
                else
                        return @goto(@getfmtpos(@wm.ball, @teamnum))

        play: () ->
                if player_near_ball(@teammates, @wm.ball) is @teamnum
                        return @go_and_kick(@wm.ball)
                else
                        return @goto(@getfmtpos(@wm.ball, @teamnum))


        goto: (pos) ->
                return {} if Vector2d.distance(pos, @mypos) < 0.1
                me2pos = Vector2d.subtract(pos, @mypos)
                angle = Math.atan2(me2pos[1], me2pos[0])
                delta = Math.normaliseRadians(angle-@mydir)
                if Math.abs(delta) < @eps
                        return {dash:MAX_DASH_FORCE}
                else
                        return {turn:delta}
                

        go_and_kick:(ball) ->
                goal2ball = Vector2d.subtract(ball, OP_GOAL_POS)
                unit = Vector2d.unit(goal2ball)
                gopos = Vector2d.add(Vector2d.multiply(unit, BALL_R + PLAYER_R + 2), ball)
                
                ball2goal = Vector2d.subtract(OP_GOAL_POS, ball)
                angleb2g = Math.atan2(ball2goal[1], ball2goal[0])
                me2ball = Vector2d.subtract(ball, @mypos)
                anglem2b = Math.atan2(me2ball[1], me2ball[0])

                delta1 = Math.normaliseRadians(angleb2g-anglem2b)
                dis = Vector2d.distance(ball, @mypos)

                if Math.abs(delta1) < @eps and dis < BALL_R + PLAYER_R + 3
                        delta2 = Math.normaliseRadians(anglem2b-@mydir)
                        if Math.abs(delta2) < @eps
                                return {kick:MAX_KICK_FORCE}
                        else
                                return {turn:delta2}
                else
                        return @goto(gopos)


