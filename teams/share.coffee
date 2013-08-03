
PITCH_LENGTH = 1050
PITCH_HALF_LENGTH = 525
PITCH_HALF_WIDTH  = 340
BALL_R = 4
PLAYER_R = 10
MAX_DASH_FORCE = 6
MAX_KICK_FORCE = 2
MY_GOAL_POS = [-PITCH_HALF_LENGTH, 0]
OP_GOAL_POS = [ PITCH_HALF_LENGTH, 0]



player_near_ball = (teammates, ball) ->
        min = PITCH_LENGTH
        num = -1
        i = 0
        for player in teammates
                dis = Vector2d.distance(player, ball)
                if dis <= min
                        min = dis
                        num = i
                i+=1
        return num
