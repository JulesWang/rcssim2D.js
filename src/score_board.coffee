
class ScoreBoard
        constructor: () ->
                @board_length = 400
                @board_height = 50
                @left_score = 0
                @right_score = 0
                @left_team_name = "unnamed"
                @right_team_name = "unnamed"
                @text_color  = '#FFF'
                @state

                
        render: (canvas) ->
                board =
                        x:-@board_length / 2,
                        y:-canvas.h / 2,
                        w:@board_length,
                        h:@board_height,

                canvas.fillRect(@board_color, board)

                board_text = @left_team_name + '   ' + @left_score + ' : '
                board_text += @right_score + '   ' + @right_team_name
                canvas.drawText(@text_color, '20px Georgia', board_text, 0, -canvas.h/2+20)
                canvas.drawText(@text_color, '20px Georgia', @state, 0, -canvas.h/2+40)

        update: () ->
                a = 1

        set_state: (st) ->
                @state = st

        increase_left_score: () ->
                @left_score += 1

        increase_right_score: () ->
                @right_score += 1

                
