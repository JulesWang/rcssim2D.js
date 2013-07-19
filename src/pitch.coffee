
class Pitch
        constructor:() ->
                @pitch_length = 1050
                @pitch_width = 680
                @center_circle_r = 91.5

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

                @field_color = 'RGB(31, 160, 31)'
                @line_color  = 'RGB(255, 255, 255)'
                @goal_color  = '#000000'

                

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
