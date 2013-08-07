
class Pitch
        constructor:() ->
                @pitch_length = 1050
                @pitch_width = 680
                @center_circle_r = 91.5
                @freekick_circle_r = 91.5

                @penalty_area_length = 165
                @penalty_area_width = 403.2
                @penalty_circle_r = 91.5
                @penalty_spot_dist = 110

                @goal_width = 140.2
                @goal_area_length = 55
                @goal_area_width = 183.2
                @goal_depth = 24.4
                @goal_post_radius = 0.6
                @corner_arc_r = 10
                @half_time = 100
                @goal_pillars =
                        left :
                                up : [-(@pitch_length/2), (@goal_width/2)]
                                bottom : [-(@pitch_length/2), -(@goal_width/2)]
                        right:
                                up : [(@pitch_length/2), (@goal_width/2)]
                                bottom : [(@pitch_length/2), -(@goal_width/2)]

                @field_color = 'RGB(31, 160, 31)'
                @line_color  = 'RGB(255, 255, 255)'
                @goal_color  = '#000'

                @state = "before_kickoff"
                @last_goal_side = null

                @auto_kickoff = false
                @kickoff_delay = 0

                @second_half = false

                @board = new ScoreBoard()


        checkrules:(wm) ->
                @wm = wm
                switch @state
                        when 'before_kickoff'
                                @before_kickoff_rules()
                        when 'kickoff_left'
                                @kickoff_left_rules()
                        when 'kickoff_right'
                                @kickoff_right_rules()
                        when 'playon'
                                @playon_rules()
                        when 'goalkick_left'
                                @goalkick_left_rules()
                        when 'goalkick_right'
                                @goalkick_right_rules()
                        when 'kickin_left'
                                @kickin_left_rules()
                        when 'kickin_right'
                                @kickin_right_rules()
                        when 'freekick_left'
                                @freekick_left_rules()
                        when 'freekick_right'
                                @freekick_right_rules()
                        
        render:(canvas) ->
                field =
                        x:-canvas.w/2
                        y:-canvas.h/2
                        w:canvas.w
                        h:canvas.h

                canvas.fillRect(@field_color, field)

                field =
                        x:-@pitch_length/2
                        y:-@pitch_width/2
                        w:@pitch_length
                        h:@pitch_width

                # border
                canvas.drawRect(@line_color, field)
                # center line
                canvas.drawLine(@line_color, 0, field.y, 0, field.y + field.h )
                # center circle
                canvas.drawArc(@line_color, 0, 0 , @center_circle_r, 0, 2*Math.PI)
                # corner arc
                canvas.drawArc(@line_color,
                        field.x , field.y, @corner_arc_r, 0, Math.PI/2)
                canvas.drawArc(@line_color,
                        field.x + field.w , field.y, @corner_arc_r, Math.PI/2, Math.PI)
                canvas.drawArc(@line_color,
                        field.x + field.w , field.y + field.h, @corner_arc_r, Math.PI, 3*Math.PI/2)
                canvas.drawArc(@line_color,
                        field.x , field.y + field.h, @corner_arc_r, 3*Math.PI/2, 2*Math.PI)

                half_length = @pitch_length / 2
                left_x = -half_length
                right_x = half_length
                
                #set penalty area params
                pen_top_y = -@penalty_area_width / 2
                pen_bottom_y = @penalty_area_width / 2
                
                pen_circle_y_degree_abs =
                        Math.acos((@penalty_area_length - @penalty_spot_dist ) / @penalty_circle_r )
                
                #var span_angle = qRound( pen_circle_y_degree_abs * 2.0 * 16 );
                pen_circle_r = @penalty_circle_r
                pen_circle_dia = @penalty_circle_r * 2.0

                # left penalty area X
                pen_x = -( half_length - @penalty_area_length )
                # left arc
                pen_spot_x = -( half_length - @penalty_spot_dist )
                canvas.drawArc( @line_color,
                                -( half_length + @penalty_spot_dist - @penalty_area_length),
                                0,
                                pen_circle_dia,
                                -pen_circle_y_degree_abs,
                                pen_circle_y_degree_abs)

                # left rectangle
                canvas.drawLine(@line_color, left_x, pen_top_y, pen_x, pen_top_y )
                canvas.drawLine(@line_color, pen_x, pen_top_y, pen_x, pen_bottom_y )
                canvas.drawLine(@line_color, pen_x, pen_bottom_y, left_x, pen_bottom_y )
                # left spot
                canvas.drawArc(@line_color, pen_spot_x, 0, 1, 0, 2*Math.PI )
                
                # right penalty area X
                pen_x = +(half_length - @penalty_area_length)
                # right arc
                pen_spot_x = +(half_length - @penalty_spot_dist)
                canvas.drawArc(@line_color,
                                 +(half_length + @penalty_spot_dist - @penalty_area_length ),
                                 0,
                                 pen_circle_dia,
                                 Math.PI - pen_circle_y_degree_abs,
                                 Math.PI + pen_circle_y_degree_abs)
                # right rectangle
                canvas.drawLine(@line_color, right_x, pen_top_y, pen_x, pen_top_y )
                canvas.drawLine(@line_color, pen_x, pen_top_y, pen_x, pen_bottom_y )
                canvas.drawLine(@line_color, pen_x, pen_bottom_y, right_x, pen_bottom_y )
                # right spot
                canvas.drawArc(@line_color, pen_spot_x, 0, 1, 0, 2*Math.PI )

                # set screen coordinates of field
                left_x = -@pitch_length / 2
                right_x = +@pitch_length / 2

                # set coordinates opts
                goal_area_y_abs = @goal_area_width / 2
                goal_area_top_y = - goal_area_y_abs
                goal_area_bottom_y = + goal_area_y_abs

                # left goal area
                goal_area_x = left_x + @goal_area_length
                canvas.drawLine( @line_color, left_x, goal_area_top_y, goal_area_x, goal_area_top_y )
                canvas.drawLine( @line_color, goal_area_x, goal_area_top_y, goal_area_x, goal_area_bottom_y )
                canvas.drawLine( @line_color, goal_area_x, goal_area_bottom_y, left_x, goal_area_bottom_y )

                # right goal area
                goal_area_x = right_x - @goal_area_length
                canvas.drawLine( @line_color, right_x, goal_area_top_y, goal_area_x, goal_area_top_y )
                canvas.drawLine( @line_color, goal_area_x, goal_area_top_y, goal_area_x, goal_area_bottom_y )
                canvas.drawLine( @line_color, goal_area_x, goal_area_bottom_y, right_x, goal_area_bottom_y )

                # set coordinates param
                goal_top_y = -@goal_width*0.5

                post_top_y = -@goal_width*0.5 - @goal_post_radius*2.0
                post_bottom_y = @goal_width*0.5
                post_diameter = @goal_post_radius*2.0

                left_goal =
                        x:-@pitch_length/2 - @goal_depth - 1,
                        y:goal_top_y,
                        w:@goal_depth,
                        h:@goal_width,
                   

                # left goal
                canvas.fillRect( @goal_color, left_goal)

                right_goal =
                        x:@pitch_length/2 + 1,
                        y:goal_top_y,
                        w:@goal_depth,
                        h:@goal_width,

                # right goal
                canvas.fillRect( @goal_color, right_goal)


                # board
                @board.set_state(@state)
                @board.render(canvas)

        goalkick_left_rules:() ->
                for player in @wm.rightplayers
                        if @in_left_penalty(player.p)
                                player.p[0] = -@pitch_length/2 + @penalty_area_length + @freekick_circle_r

                @change_state('playon') if not @in_left_penalty(@wm.ball.p)

        goalkick_right_rules:() ->
                for player in @wm.leftplayers
                        if @in_right_penalty(player.p)
                                player.p[0] = @pitch_length/2 - @penalty_area_length - @freekick_circle_r

                @change_state('playon') if not @in_right_penalty(@wm.ball.p)


        kickin_left_rules:() ->
                @freekick_left_rules()
        kickin_right_rules:() ->
                @freekick_right_rules()

        cornerkick_left_rules:() ->
                @freekick_left_rules()

        cornerkick_right_rules:() ->
                @freekick_right_rules()

        freekick_left_rules:() ->
                for player in @wm.rightplayers
                        @freekick_circle(player, @wm.ball.p)
                @change_state('playon') if @last_touch_ball

        freekick_right_rules:() ->
                for player in @wm.leftplayers
                        @freekick_circle(player, @wm.ball.p)
                @change_state('playon') if @last_touch_ball
                
        freekick_circle:(player, ball) ->
                pp = player.p
                d = 2*@freekick_circle_r
                if (Vector2d.distance(pp, ball) < @freekick_circle_r)
                        ball2player = Vector2d.unit(Vector2d.subtract(pp, ball))
                        player.p = Vector2d.add(Vector2d.multiply(ball2player, @freekick_circle_r), ball)
                        if player.p[0] > @pitch_length / 2
                                player.p[0] -= d
                        if player.p[0] < -@pitch_length / 2
                                player.p[0] += d
                        if player.p[1] > @pitch_width / 2
                                player.p[1] -= d
                        if player.p[1] < -@pitch_width / 2
                                player.p[1] += d
                 


        before_kickoff_rules:() ->
                for player in @wm.leftplayers
                        if player.p[0] > -player.r
                                player.p[0] = -player.r
                        if (Vector2d.distance(player.p, [0,0]) < @center_circle_r)
                                player.p[0] = -@center_circle_r
                for player in @wm.rightplayers
                        if player.p[0] < player.r
                                player.p[0] = player.r
                        if Vector2d.distance(player.p, [0,0]) < @center_circle_r
                                player.p[0] = @center_circle_r

                if @auto_kickoff
                        @kickoff_delay -= 1
                        @kickoff() if @kickoff_delay <= 0


        kickoff:() ->
                switch @state
                        when 'before_kickoff'
                                if @last_goal_side == 'left'
                                        @change_state('kickoff_right')
                                else
                                        @change_state('kickoff_left')
                

        kickoff_left_rules:() ->
                 for player in @wm.rightplayers
                        if player.p[0] < player.r
                                player.p[0] = player.r
                        if Vector2d.distance(player.p, [0,0]) < @center_circle_r
                                player.p[0] = @center_circle_r

                 @change_state('playon') if @last_touch_ball
                        

        kickoff_right_rules:() ->
                 for player in @wm.leftplayers
                        if player.p[0] > -player.r
                                player.p[0] = -player.r
                        if Vector2d.distance(player.p, [0,0]) < @center_circle_r
                                player.p[0] = -@center_circle_r

                 if @last_touch_ball
                        @change_state('playon')

        playon_rules: () ->
                x = @wm.ball.p[0]
                y = @wm.ball.p[1]
                if Math.abs(y) < @goal_width / 2
                        if x < -@pitch_length / 2 - @wm.ball.r
                                if @is_goal(@wm.ball, @goal_pillars.left.bottom, @goal_pillars.left.up)
                                        @board.increase_right_score()
                                        @last_goal_side = 'right'
                                        @reset()
                                        @wm.ball.reset()
                                        return
                                if @last_touch_ball is 'right'
                                        @wm.ball.reset()
                                        @wm.ball.p = [-@pitch_length/2 + @penalty_spot_dist, 0]
                                        @change_state('goalkick_left')
                                else
                                        @wm.ball.reset()
                                        @wm.ball.p = [-@pitch_length/2, Math.sign(y) * @pitch_width/2]
                                        @change_state('cornerkick_right')

                        if x > @pitch_length / 2 + @wm.ball.r
                                if @is_goal(@wm.ball, @goal_pillars.right.bottom, @goal_pillars.right.up)
                                        @board.increase_left_score()
                                        @last_goal_side = 'left'
                                        @reset()
                                        @wm.ball.reset()
                                        return
                                if @last_touch_ball is 'left'
                                         @wm.ball.reset()
                                         @wm.ball.p = [@pitch_length/2 - @penalty_spot_dist, 0]
                                         @change_state('goalkick_right')
                                else
                                        @wm.ball.reset()
                                        @wm.ball.p = [@pitch_length/2, Math.sign(y) * @pitch_width/2]
                                        @change_state('cornerkick_left')

                else
                        if Math.abs(y) > @pitch_width / 2 + @wm.ball.r
                                if y > 0
                                        y =  @pitch_width / 2
                                else
                                        y = -@pitch_width / 2

                                x = @wm.ball.last_pos[0]
                                @wm.ball.reset()
                                @wm.ball.p = [x, y]
                                if @last_touch_ball is 'left'
                                        @change_state('kickin_right')
                                else
                                        @change_state('kickin_left')
                if @board.timer > @half_time and !@second_half
                        @second_half = true
                        @reset()
                        @wm.ball.reset()
                        @auto_kickoff = true
                        @kickoff_delay = 50
                        @wm.switch_sides()
                        @board.switch_sides()
                        @last_goal_side = null

                if @board.timer > 2*@half_time
                        @change_state('game_over')
                        
                        

        is_goal: (ball, l1, l2) ->
                x1 = ball.last_pos[0]
                y1 = ball.last_pos[1]
                x2 = ball.p[0]
                y2 = ball.p[1]
                u1 = l1[0]
                v1 = l1[1]
                u2 = l2[0]
                v2 = l2[1]

                denominator = (y2 - y1)*(u2 - u1) - (x1 - x2)*(v1 - v2)
                if denominator == 0
                        return false

                x = ((x2 - x1)*(u2 - u1)*(v1-y1) +
                        (y2 - y1)*(u2 - u1)*x1 -
                        (v2 - v1)*(x2 - x1)*u1)/ denominator

                y = ((y2 - y1)*(v2 - v1)*(u1-x1) +
                        (x2 - x1)*(v2 - v1)*y1 -
                        (u2 - u1)*(y2 - y1)*v1)/ denominator

                if (x - u1)*(x - u2) <=0 and (y - v1)*(y - v2) <= 0
                        @auto_kickoff = true
                        @kickoff_delay = 50
                        return true

                return false


        reset: () ->
                @change_state('before_kickoff')


        change_state: (state) ->
                @state = state
                @last_touch_ball = null

        in_left_penalty: (pos) ->
                return pos[0] <= -@pitch_length / 2 + @penalty_area_length and Math.abs(pos[1]) <= @penalty_area_width/2
        in_right_penalty: (pos) ->
                return pos[0] >= @pitch_length / 2 - @penalty_area_length and Math.abs(pos[1]) <= @penalty_area_width/2
