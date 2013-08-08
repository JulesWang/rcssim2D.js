
class ScoreBoard
        constructor: () ->
                @board_length = 400
                @board_height = 50
                @left_score = 0
                @right_score = 0
                @left_teamname = "???"
                @right_teamname = "???"
                @board_color  = '#000'
                @text_color  = '#FFF'
                @timer = 0

                
        render: (canvas) ->
                @timer += 1 if @state is 'playon'
                board =
                        x:-@board_length / 2,
                        y:-canvas.h / 2,
                        w:@board_length,
                        h:@board_height,

                canvas.fillRect(@board_color, board)

                board_text = @left_teamname + '   ' + @left_score + ' : '
                board_text += @right_score + '   ' + @right_teamname
                canvas.drawText(@text_color, '20px play', board_text, 0, -canvas.h/2+20)
                canvas.drawText(@text_color, '20px play', @state + '  ' + parseInt(@timer/10), 0, -canvas.h/2+40)

        reset: () ->
                @timer = 0
                @left_score = 0
                @right_score = 0

        set_state: (st) ->
                @state = st

        increase_left_score: () ->
                @left_score += 1

        increase_right_score: () ->
                @right_score += 1

        switch_sides: () ->
                [@left_score, @right_score] = [@right_score, @left_score]
                [@left_teamname, @right_teamname] = [@right_teamname, @left_teamname]
                
