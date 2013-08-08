
PITCH_LENGTH = 1050
PITCH_HALF_LENGTH = 525
PITCH_HALF_WIDTH  = 340
BALL_R = 2.5
PLAYER_R = 8
MAX_DASH_FORCE = 6
MAX_KICK_FORCE = 2.0
GOAL_WIDTH = 140.2
HALF_GOAL_WIDTH = 70.1

PENALTY_AREA_LENGTH = 165
PENALTY_AREA_WIDTH = 403.2

mY_GOAL_POS = [-PITCH_HALF_LENGTH, 0]
OP_GOAL_POS = [ PITCH_HALF_LENGTH, 0]

is_goalie = (teamnum) ->
        teamnum is 0

in_my_penalty = (pos) ->
        return (pos[0] < -PITCH_LENGTH / 2 +  PENALTY_AREA_LENGTH) and (Math.abs(pos[1]) < PENALTY_AREA_WIDTH/2)


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


