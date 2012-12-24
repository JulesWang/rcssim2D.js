/*
 *Copyright:

 Copyright (C) The RoboCup Soccer Server Maintenance Group.
 Hidehisa AKIYAMA

 This code is free software; you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2, or (at your option)
 any later version.

 This code is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this code; see the file COPYING.  If not, write to
 the Free Software Foundation, 675 Mass Ave, Cambridge, MA 02139, USA.

 *EndCopyright:
 */

/////////////////////////////////////////////////////////////////////

var PITCH_LENGTH = 1050;
var PITCH_WIDTH = 680;
var PITCH_HALF_LENGTH = PITCH_LENGTH * 0.5;
var PITCH_HALF_WIDTH = PITCH_WIDTH * 0.5;
var PITCH_MARGIN = 50;
var CENTER_CIRCLE_R = 91.5;
var PENALTY_AREA_LENGTH = 165;
var PENALTY_AREA_WIDTH = 403.2;
var PENALTY_CIRCLE_R = 91.5;
var PENALTY_SPOT_DIST = 110;
var GOAL_WIDTH = 140.2;
var GOAL_HALF_WIDTH = GOAL_WIDTH * 0.5;
var GOAL_AREA_LENGTH = 55;
var GOAL_AREA_WIDTH = 183.2;
var GOAL_DEPTH = 24.4;
var CORNER_ARC_R = 10;
var GOAL_POST_RADIUS = 0.6;

var MIN_FIELD_SCALE = 1.0;
var MAX_FIELD_SCALE = 400.0;
var ZOOM_RATIO = 1.5;
var DEFAULT_TIMER_INTERVAL = 100;

var WAITING_ANIMATION_SIZE = 96;


var FIELD_COLOR = "rgb( 31, 160, 31 )";
var LINE_COLOR = "rgb( 255, 255, 255 )";
var MEASURE_LINE_COLOR = "rgb( 0, 255, 255 )";
var MEASURE_MARK_COLOR = "rgb( 255, 0, 0 )";
var MEASURE_FONT_COLOR = "rgb( 255, 191, 191 )";
var MEASURE_FONT_COLOR2 = "rgb( 224, 224, 192 )";
var SCORE_BOARD_PEN_COLOR = "rgb( 255, 255, 255 )";
var SCORE_BOARD_BRUSH_COLOR = "rgb( 0, 0, 0 )";
var BALL_COLOR = "rgb( 255, 255, 255 )";
var BALL_VEL_COLOR = "rgb( 255, 0, 0 )";
var PLAYER_PEN_COLOR = "rgb( 0, 0, 0 )";
var LEFT_TEAM_COLOR = "rgb( 255, 215, 0 )";
var LEFT_GOALIE_COLOR = "rgb( 39, 231, 31 )";
var RIGHT_TEAM_COLOR = "rgb( 0, 191, 255 )";
var RIGHT_GOALIE_COLOR = "rgb( 255, 153, 255 )";
var PLAYER_NUMBER_COLOR = "rgb( 255, 255, 255 )";
var PLAYER_NUMBER_INNER_COLOR = "rgb( 0, 0, 0 )";
var NECK_COLOR = "rgb( 255, 0, 0 )";
var VIEW_AREA_COLOR = "rgb( 191, 239, 191 )";
var LARGE_VIEW_AREA_COLOR = "rgb( 255, 255, 255 )";
var BALL_COLLIDE_COLOR = "rgb( 255, 0, 0 )";
var PLAYER_COLLIDE_COLOR = "rgb( 105, 155, 235 )";
var EFFORT_DECAYED_COLOR = "rgb( 255, 0, 0 )";
var RECOVERY_DECAYED_COLOR = "rgb( 255, 231, 31 )";
var KICK_COLOR = "rgb( 255, 255, 255 )";
var KICK_FAULT_COLOR = "rgb( 255, 0, 0 )";
var KICK_ACCEL_COLOR = "rgb( 0, 255, 0 )";
var CATCH_COLOR = "rgb( 10, 80, 10 )";
var CATCH_FAULT_COLOR = "rgb( 10, 80, 150 )";
var TACKLE_COLOR = "rgb( 255, 136, 127 )";
var TACKLE_FAULT_COLOR = "rgb( 79, 159, 159 )";
var FOUL_CHARGED_COLOR = "rgb( 0, 127, 0 )";
var POINTTO_COLOR = "rgb( 255, 0, 191 )";

