// Generated by CoffeeScript 1.6.3
(function() {
  var BALL_R, Ball, Canvas, Fmt442, Foo, KEY_DOWN, KEY_UP, K_0, K_1, K_2, K_3, K_4, K_5, K_6, K_7, K_8, K_9, K_ALT, K_BACKSPACE, K_CTRL, K_DOWN, K_ENTER, K_ESC, K_LEFT, K_RIGHT, K_SHIFT, K_SPACE, K_TAB, K_UP, K_a, K_b, K_c, K_d, K_e, K_f, K_g, K_h, K_i, K_j, K_k, K_l, K_m, K_n, K_o, K_p, K_q, K_r, K_s, K_t, K_u, K_v, K_w, K_x, K_y, K_z, MAX_DASH_FORCE, MAX_KICK_FORCE, MOUSE_DOWN, MOUSE_MOTION, MOUSE_UP, MOUSE_WHEEL, MY_GOAL_POS, OP_GOAL_POS, PITCH_HALF_LENGTH, PITCH_HALF_WIDTH, PITCH_LENGTH, PLAYER_R, Pitch, Player, QUIT, ScoreBoard, Vector2d, WorldModel, clone, gameloop, main, multiply, onkeydown, onmousedown, player_near_ball, root;

  Fmt442 = (function() {
    function Fmt442() {
      this.wing2 = 200;
      this.wing1 = 60;
      this.center = 20;
      this.ratio = {
        gk: 0,
        b: 0.4,
        m: 0.75,
        f: 1.0
      };
      this.p = [
        {
          x: -500,
          y: 0,
          ratio: this.ratio.gk
        }, {
          x: 0,
          y: this.wing2,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: -this.wing2,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: this.wing1,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: -this.wing1,
          ratio: this.ratio.b
        }, {
          x: 0,
          y: this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: -this.wing2,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: this.wing1,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: -this.wing1,
          ratio: this.ratio.m
        }, {
          x: 0,
          y: this.center,
          ratio: this.ratio.f
        }, {
          x: 0,
          y: -this.center,
          ratio: this.ratio.f
        }
      ];
    }

    return Fmt442;

  })();

  PITCH_LENGTH = 1050;

  PITCH_HALF_LENGTH = 525;

  PITCH_HALF_WIDTH = 340;

  BALL_R = 4;

  PLAYER_R = 10;

  MAX_DASH_FORCE = 6;

  MAX_KICK_FORCE = 2;

  MY_GOAL_POS = [-PITCH_HALF_LENGTH, 0];

  OP_GOAL_POS = [PITCH_HALF_LENGTH, 0];

  player_near_ball = function(teammates, ball) {
    var dis, i, min, num, player, _i, _len;
    min = PITCH_LENGTH;
    num = -1;
    i = 0;
    for (_i = 0, _len = teammates.length; _i < _len; _i++) {
      player = teammates[_i];
      dis = Vector2d.distance(player, ball);
      if (dis <= min) {
        min = dis;
        num = i;
      }
      i += 1;
    }
    return num;
  };

  Foo = (function() {
    function Foo(num, side) {
      this.teamname = 'Foo';
      this.fill_color = 'red';
      this.stroke_color = 'black';
      this.teamnum = num;
      this.fmt = new Fmt442();
      this.side = side;
    }

    Foo.prototype.getfmtpos = function(bp) {
      var pos;
      pos = this.fmt.p[this.teamnum];
      if (this.teamnum !== 0) {
        pos.x = (PITCH_HALF_LENGTH + bp[0]) * pos.ratio - PITCH_HALF_LENGTH;
      }
      return [pos.x, pos.y];
    };

    Foo.prototype.think = function(wm) {
      var teammates;
      if (wm.gamestate === "before_kickoff") {
        return {
          jump: this.getfmtpos(wm.ball, this.teamnum)
        };
      } else {
        if (this.side === 'left') {
          teammates = wm.leftplayers;
        } else {
          teammates = wm.rightplayers;
        }
        this.mypos = teammates[this.teamnum];
        this.mydir = wm.mydir;
        if (player_near_ball(teammates, wm.ball) === this.teamnum) {
          return this.go_and_kick(wm.ball);
        } else {
          return this.goto(this.getfmtpos(wm.ball, this.teamnum));
        }
      }
    };

    Foo.prototype.goto = function(pos) {
      var angle, delta, me2pos;
      if (Vector2d.distance(pos, this.mypos) < 2) {
        return;
      }
      me2pos = Vector2d.subtract(pos, this.mypos);
      angle = Math.atan2(me2pos[1], me2pos[0]);
      delta = Math.normaliseRadians(angle - this.mydir);
      if (Math.abs(delta) < Math.PI / 6) {
        return {
          dash: MAX_DASH_FORCE
        };
      } else {
        return {
          turn: delta
        };
      }
    };

    Foo.prototype.go_and_kick = function(ball) {
      var angleb2g, anglem2b, ball2goal, delta1, delta2, dis, goal2ball, gopos, me2ball, unit;
      goal2ball = Vector2d.subtract(ball, OP_GOAL_POS);
      unit = Vector2d.unit(goal2ball);
      gopos = Vector2d.add(Vector2d.multiply(unit, BALL_R + PLAYER_R + 3), ball);
      ball2goal = Vector2d.subtract(OP_GOAL_POS, ball);
      angleb2g = Math.atan2(ball2goal[1], ball2goal[0]);
      me2ball = Vector2d.subtract(ball, this.mypos);
      anglem2b = Math.atan2(me2ball[1], me2ball[0]);
      delta1 = Math.normaliseRadians(angleb2g - anglem2b);
      dis = Vector2d.distance(ball, this.mypos);
      if (Math.abs(delta1) < Math.PI / 12 && dis < 20) {
        delta2 = Math.normaliseRadians(anglem2b - this.mydir);
        if (Math.abs(delta2) < Math.PI / 12) {
          return {
            kick: MAX_KICK_FORCE
          };
        } else {
          return {
            turn: delta2
          };
        }
      } else {
        return this.goto(gopos);
      }
    };

    return Foo;

  })();

  K_UP = 38;

  K_DOWN = 40;

  K_RIGHT = 39;

  K_LEFT = 37;

  K_SPACE = 32;

  K_BACKSPACE = 8;

  K_TAB = 9;

  K_ENTER = 13;

  K_SHIFT = 16;

  K_CTRL = 17;

  K_ALT = 18;

  K_ESC = 27;

  K_0 = 48;

  K_1 = 49;

  K_2 = 50;

  K_3 = 51;

  K_4 = 52;

  K_5 = 53;

  K_6 = 54;

  K_7 = 55;

  K_8 = 56;

  K_9 = 57;

  K_a = 65;

  K_b = 66;

  K_c = 67;

  K_d = 68;

  K_e = 69;

  K_f = 70;

  K_g = 71;

  K_h = 72;

  K_i = 73;

  K_j = 74;

  K_k = 75;

  K_l = 76;

  K_m = 77;

  K_n = 78;

  K_o = 79;

  K_p = 80;

  K_q = 81;

  K_r = 82;

  K_s = 83;

  K_t = 84;

  K_u = 85;

  K_v = 86;

  K_w = 87;

  K_x = 88;

  K_y = 89;

  K_z = 90;

  QUIT = 0;

  KEY_DOWN = 1;

  KEY_UP = 2;

  MOUSE_MOTION = 3;

  MOUSE_UP = 4;

  MOUSE_DOWN = 5;

  MOUSE_WHEEL = 6;

  onkeydown = function(ev, wm) {
    var obj;
    switch (ev.keyCode) {
      case K_k:
        wm.pitch.kickoff();
        break;
      case K_r:
        wm.reset();
    }
    if (!wm.selected) {
      return;
    }
    obj = wm.selected;
    if (!obj.dash) {
      return;
    }
    switch (ev.keyCode) {
      case K_UP:
        return obj.dash(36);
      case K_DOWN:
        return obj.dash(-36);
      case K_LEFT:
        return obj.turn(-1);
      case K_RIGHT:
        return obj.turn(1);
      case K_d:
        return obj.kick(2);
      case K_d:
        return obj.kick(2);
    }
  };

  onmousedown = function(ev, wm, x, y) {
    var obj, _i, _len, _ref;
    _ref = wm.objs;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      obj = _ref[_i];
      if (obj.kick === void 0) {
        continue;
      }
      wm.selected = obj;
      obj.sc = "#87CEFA";
      return 1;
    }
    return 0;
  };

  Player = (function() {
    function Player(p, dir, wm, side) {
      this.fc = 'grey';
      this.sc = 'black';
      this.m = 5.0;
      this.r = 10;
      this.t = 'none';
      this.v = [0, 0];
      this.decay = 0.4;
      this.maxdashforce = 6;
      this.maxkickforce = 2;
      this.maxturnangle = 0.1;
      this.force = 0;
      this.kickforce = 0;
      this.dd = 0;
      this.wm = wm;
      this.side = side;
      this.p = this.transpos(p);
      this.d = this.transdir(dir);
    }

    Player.prototype.reset = function() {};

    Player.prototype.render = function(canvas) {
      var fill_color, stroke_color, x, y, _ref, _ref1;
      stroke_color = (_ref = this.client.stroke_color) != null ? _ref : this.sc;
      fill_color = (_ref1 = this.client.fill_color) != null ? _ref1 : this.fc;
      x = this.p[0];
      y = this.p[1];
      canvas.fillCircle(fill_color, x, y, this.r);
      canvas.drawCircle(stroke_color, x, y, this.r);
      return canvas.fillArc(stroke_color, x, y, this.r, this.d - 2 * Math.PI / 5, this.d + 2 * Math.PI / 5);
    };

    Player.prototype.take_action = function() {
      var action, actions, _results;
      actions = this.client.think(this.getbasicinfo());
      _results = [];
      for (action in actions) {
        switch (action) {
          case 'jump':
            _results.push(this.jump(actions['jump']));
            break;
          case 'dash':
            _results.push(this.dash(actions['dash']));
            break;
          case 'turn':
            _results.push(this.turn(actions['turn']));
            break;
          case 'kick':
            _results.push(this.kick(actions['kick']));
            break;
          default:
            _results.push(void 0);
        }
      }
      return _results;
    };

    Player.prototype.update = function() {
      var a, ds, dv, unitv;
      if (this.wm.selected !== this) {
        this.take_action();
      }
      if (Vector2d.len(this.v) > 1e-5) {
        ds = this.v;
        this.p = Vector2d.add(this.p, ds);
        this.v = Vector2d.multiply(this.v, this.decay);
      }
      a = this.force / this.m;
      this.force = 0;
      unitv = Vector2d.vector(this.d);
      dv = Vector2d.multiply(unitv, a);
      this.v = Vector2d.add(this.v, dv);
      this.d += this.dd;
      this.dd = 0;
      if (this.kickforce !== 0) {
        this.wm.pitch.last_touch_ball = this.side;
      }
      this.wm.ball.acc(unitv, this.kickforce);
      return this.kickforce = 0;
    };

    Player.prototype.dash = function(force) {
      if (force > this.maxdashforce) {
        force = this.maxdashforce;
      }
      if (force < -this.maxdashforce) {
        force = -this.maxdashforce;
      }
      return this.force = force;
    };

    Player.prototype.turn = function(dir) {
      this.dd = dir;
      if (this.dd > this.maxturnangle) {
        this.dd = this.maxturnangle;
      }
      if (this.dd < -this.maxturnangle) {
        return this.dd = -this.maxturnangle;
      }
    };

    Player.prototype.kick = function(force) {
      var bp, p2b, unitv;
      if (!this.wm) {
        return;
      }
      bp = this.wm.ball.p;
      if (Vector2d.distance(this.p, bp) > 20) {
        return;
      }
      p2b = Vector2d.subtract(bp, this.p);
      unitv = Vector2d.vector(this.d);
      if (Math.abs(Vector2d.angle(p2b, unitv)) > Math.PI / 6) {
        return;
      }
      if (force > this.maxkickforce) {
        force = this.maxkickforce;
      }
      return this.kickforce = force;
    };

    Player.prototype.jump = function(pos) {
      this.p = clone(pos);
      return this.p = this.transpos(this.p);
    };

    Player.prototype.getbasicinfo = function() {
      var p, player, wm, _i, _j, _len, _len1, _ref, _ref1;
      wm = {};
      wm.leftplayers = [];
      wm.rightplayers = [];
      _ref = this.wm.leftplayers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        p = clone(player.p);
        p = this.transpos(p);
        wm.leftplayers.push(p);
      }
      _ref1 = this.wm.rightplayers;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        player = _ref1[_j];
        p = clone(player.p);
        p = this.transpos(p);
        wm.rightplayers.push(p);
      }
      wm.gamestate = this.wm.pitch.state;
      wm.ball = clone(this.wm.ball.p);
      wm.ball = this.transpos(wm.ball);
      wm.mydir = this.transdir(this.d);
      return wm;
    };

    Player.prototype.transpos = function(p) {
      if (this.side === 'left') {
        return p;
      }
      p[0] = -p[0];
      p[1] = -p[1];
      return p;
    };

    Player.prototype.transdir = function(dir) {
      if (this.side === 'left') {
        return dir;
      }
      return Math.normaliseRadians(dir + Math.PI);
    };

    return Player;

  })();

  ScoreBoard = (function() {
    function ScoreBoard() {
      this.board_length = 400;
      this.board_height = 50;
      this.left_score = 0;
      this.right_score = 0;
      this.left_team_name = "unnamed";
      this.right_team_name = "unnamed";
      this.text_color = '#FFF';
      this.state;
    }

    ScoreBoard.prototype.render = function(canvas) {
      var board, board_text;
      board = {
        x: -this.board_length / 2,
        y: -canvas.h / 2,
        w: this.board_length,
        h: this.board_height
      };
      canvas.fillRect(this.board_color, board);
      board_text = this.left_team_name + '   ' + this.left_score + ' : ';
      board_text += this.right_score + '   ' + this.right_team_name;
      canvas.drawText(this.text_color, '20px Georgia', board_text, 0, -canvas.h / 2 + 20);
      return canvas.drawText(this.text_color, '20px Georgia', this.state, 0, -canvas.h / 2 + 40);
    };

    ScoreBoard.prototype.update = function() {
      var a;
      return a = 1;
    };

    ScoreBoard.prototype.set_state = function(st) {
      return this.state = st;
    };

    ScoreBoard.prototype.increase_left_score = function() {
      return this.left_score += 1;
    };

    ScoreBoard.prototype.increase_right_score = function() {
      return this.right_score += 1;
    };

    return ScoreBoard;

  })();

  Pitch = (function() {
    function Pitch() {
      this.pitch_length = 1050;
      this.pitch_width = 680;
      this.center_circle_r = 91.5;
      this.penalty_area_length = 165;
      this.penalty_area_width = 403.2;
      this.penalty_circle_r = 91.5;
      this.penalty_spot_dist = 110;
      this.goal_width = 140.2;
      this.goal_area_length = 55;
      this.goal_area_width = 183.2;
      this.goal_depth = 24.4;
      this.goal_post_radius = 0.6;
      this.corner_arc_r = 10;
      this.goal_pillars = {
        left_up: [-(this.pitch_length / 2), this.goal_width / 2],
        left_bottom: [-(this.pitch_length / 2), -(this.goal_width / 2)],
        right_up: [this.pitch_length / 2, this.goal_width / 2],
        right_bottom: [this.pitch_length / 2, -(this.goal_width / 2)]
      };
      this.field_color = 'RGB(31, 160, 31)';
      this.line_color = 'RGB(255, 255, 255)';
      this.goal_color = '#000';
      this.state = "before_kickoff";
      this.last_goal_side = "left";
      this.auto_kickoff = false;
      this.board = new ScoreBoard();
    }

    Pitch.prototype.checkrules = function(wm) {
      switch (this.state) {
        case 'before_kickoff':
          return this.before_kickoff_rules(wm);
        case 'kickoff_left':
          return this.kickoff_left_rules(wm);
        case 'kickoff_right':
          return this.kickoff_right_rules(wm);
        case 'playon':
          return this.playon_rules(wm);
      }
    };

    Pitch.prototype.render = function(canvas) {
      var field, goal_area_bottom_y, goal_area_top_y, goal_area_x, goal_area_y_abs, goal_top_y, half_length, left_goal, left_x, pen_bottom_y, pen_circle_dia, pen_circle_r, pen_circle_y_degree_abs, pen_spot_x, pen_top_y, pen_x, post_bottom_y, post_diameter, post_top_y, right_goal, right_x;
      field = {
        x: -canvas.w / 2,
        y: -canvas.h / 2,
        w: canvas.w,
        h: canvas.h
      };
      canvas.fillRect(this.field_color, field);
      field = {
        x: -this.pitch_length / 2,
        y: -this.pitch_width / 2,
        w: this.pitch_length,
        h: this.pitch_width
      };
      canvas.drawRect(this.line_color, field);
      canvas.drawLine(this.line_color, 0, field.y, 0, field.y + field.h);
      canvas.drawArc(this.line_color, 0, 0, this.center_circle_r, 0, 2 * Math.PI);
      canvas.drawArc(this.line_color, field.x, field.y, this.corner_arc_r, 0, Math.PI / 2);
      canvas.drawArc(this.line_color, field.x + field.w, field.y, this.corner_arc_r, Math.PI / 2, Math.PI);
      canvas.drawArc(this.line_color, field.x + field.w, field.y + field.h, this.corner_arc_r, Math.PI, 3 * Math.PI / 2);
      canvas.drawArc(this.line_color, field.x, field.y + field.h, this.corner_arc_r, 3 * Math.PI / 2, 2 * Math.PI);
      half_length = this.pitch_length / 2;
      left_x = -half_length;
      right_x = half_length;
      pen_top_y = -this.penalty_area_width / 2;
      pen_bottom_y = this.penalty_area_width / 2;
      pen_circle_y_degree_abs = Math.acos((this.penalty_area_length - this.penalty_spot_dist) / this.penalty_circle_r);
      pen_circle_r = this.penalty_circle_r;
      pen_circle_dia = this.penalty_circle_r * 2.0;
      pen_x = -(half_length - this.penalty_area_length);
      pen_spot_x = -(half_length - this.penalty_spot_dist);
      canvas.drawArc(this.line_color, -(half_length + this.penalty_spot_dist - this.penalty_area_length), 0, pen_circle_dia, -pen_circle_y_degree_abs, pen_circle_y_degree_abs);
      canvas.drawLine(this.line_color, left_x, pen_top_y, pen_x, pen_top_y);
      canvas.drawLine(this.line_color, pen_x, pen_top_y, pen_x, pen_bottom_y);
      canvas.drawLine(this.line_color, pen_x, pen_bottom_y, left_x, pen_bottom_y);
      canvas.drawArc(this.line_color, pen_spot_x, 0, 1, 0, 2 * Math.PI);
      pen_x = +(half_length - this.penalty_area_length);
      pen_spot_x = +(half_length - this.penalty_spot_dist);
      canvas.drawArc(this.line_color, +(half_length + this.penalty_spot_dist - this.penalty_area_length), 0, pen_circle_dia, Math.PI - pen_circle_y_degree_abs, Math.PI + pen_circle_y_degree_abs);
      canvas.drawLine(this.line_color, right_x, pen_top_y, pen_x, pen_top_y);
      canvas.drawLine(this.line_color, pen_x, pen_top_y, pen_x, pen_bottom_y);
      canvas.drawLine(this.line_color, pen_x, pen_bottom_y, right_x, pen_bottom_y);
      canvas.drawArc(this.line_color, pen_spot_x, 0, 1, 0, 2 * Math.PI);
      left_x = -this.pitch_length / 2;
      right_x = +this.pitch_length / 2;
      goal_area_y_abs = this.goal_area_width / 2;
      goal_area_top_y = -goal_area_y_abs;
      goal_area_bottom_y = +goal_area_y_abs;
      goal_area_x = left_x + this.goal_area_length;
      canvas.drawLine(this.line_color, left_x, goal_area_top_y, goal_area_x, goal_area_top_y);
      canvas.drawLine(this.line_color, goal_area_x, goal_area_top_y, goal_area_x, goal_area_bottom_y);
      canvas.drawLine(this.line_color, goal_area_x, goal_area_bottom_y, left_x, goal_area_bottom_y);
      goal_area_x = right_x - this.goal_area_length;
      canvas.drawLine(this.line_color, right_x, goal_area_top_y, goal_area_x, goal_area_top_y);
      canvas.drawLine(this.line_color, goal_area_x, goal_area_top_y, goal_area_x, goal_area_bottom_y);
      canvas.drawLine(this.line_color, goal_area_x, goal_area_bottom_y, right_x, goal_area_bottom_y);
      goal_top_y = -this.goal_width * 0.5;
      post_top_y = -this.goal_width * 0.5 - this.goal_post_radius * 2.0;
      post_bottom_y = this.goal_width * 0.5;
      post_diameter = this.goal_post_radius * 2.0;
      left_goal = {
        x: -this.pitch_length / 2 - this.goal_depth - 1,
        y: goal_top_y,
        w: this.goal_depth,
        h: this.goal_width
      };
      canvas.fillRect(this.goal_color, left_goal);
      right_goal = {
        x: this.pitch_length / 2 + 1,
        y: goal_top_y,
        w: this.goal_depth,
        h: this.goal_width
      };
      canvas.fillRect(this.goal_color, right_goal);
      this.board.set_state(this.state);
      return this.board.render(canvas);
    };

    Pitch.prototype.before_kickoff_rules = function(wm) {
      var player, _i, _j, _len, _len1, _ref, _ref1;
      _ref = wm.leftplayers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.p[0] > -player.r) {
          player.p[0] = -player.r;
        }
        if (Vector2d.distance(player.p, [0, 0]) < this.center_circle_r) {
          player.p[0] = -this.center_circle_r;
        }
      }
      _ref1 = wm.rightplayers;
      for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
        player = _ref1[_j];
        if (player.p[0] < player.r) {
          player.p[0] = player.r;
        }
        if (Vector2d.distance(player.p, [0, 0]) < this.center_circle_r) {
          player.p[0] = this.center_circle_r;
        }
      }
      if (this.auto_kickoff) {
        return this.kickoff();
      }
    };

    Pitch.prototype.kickoff = function() {
      switch (this.state) {
        case 'before_kickoff':
          if (this.last_goal_side === 'left') {
            return this.state = 'kickoff_left';
          } else {
            return this.state = 'kickoff_right';
          }
      }
    };

    Pitch.prototype.kickoff_left_rules = function(wm) {
      var player, _i, _len, _ref;
      _ref = wm.rightplayers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.p[0] < player.r) {
          player.p[0] = player.r;
        }
        if (Vector2d.distance(player.p, [0, 0]) < this.center_circle_r) {
          player.p[0] = this.center_circle_r;
        }
      }
      if (this.last_goal_side === 'left') {
        return this.state = 'playon';
      }
    };

    Pitch.prototype.kickoff_right_rules = function(wm) {
      var player, _i, _len, _ref;
      _ref = wm.leftplayers;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.p[0] > -player.r) {
          player.p[0] = -player.r;
        }
        if (Vector2d.distance(player.p, [0, 0]) < this.center_circle_r) {
          player.p[0] = -this.center_circle_r;
        }
      }
      if (this.last_goal_side === 'right') {
        return this.state = 'playon';
      }
    };

    Pitch.prototype.playon_rules = function(wm) {
      var x, y;
      x = wm.ball.p[0];
      y = wm.ball.p[1];
      if (Math.abs(y) < this.goal_width / 2) {
        if (x <= -this.pitch_length / 2) {
          if (this.is_goal(wm.ball, this.goal_pillars.left_bottom, this.goal_pillars.left_up)) {
            this.board.increase_right_score();
            this.last_goal_side = 'right';
            this.state = 'before_kickoff';
            wm.reset();
            return;
          }
        }
        if (x >= this.pitch_length / 2) {
          if (this.is_goal(wm.ball, this.goal_pillars.right_bottom, this.goal_pillars.right_up)) {
            this.board.increase_left_score();
            this.last_goal_side = 'left';
            this.state = 'before_kickoff';
            wm.reset();
          }
        }
      }
    };

    Pitch.prototype.is_goal = function(ball, l1, l2) {
      var denominator, u1, u2, v1, v2, x, x1, x2, y, y1, y2;
      x1 = ball.last_pos[0];
      y1 = ball.last_pos[1];
      x2 = ball.p[0];
      y2 = ball.p[1];
      u1 = l1[0];
      v1 = l1[1];
      u2 = l2[0];
      v2 = l2[1];
      denominator = (y2 - y1) * (u2 - u1) - (x1 - x2) * (v1 - v2);
      if (denominator === 0) {
        return false;
      }
      x = ((x2 - x1) * (u2 - u1) * (v1 - y1) + (y2 - y1) * (u2 - u1) * x1 - (v2 - v1) * (x2 - x1) * u1) / denominator;
      y = ((y2 - y1) * (v2 - v1) * (u1 - x1) + (x2 - x1) * (v2 - v1) * y1 - (u2 - u1) * (y2 - y1) * v1) / denominator;
      if ((x - u1) * (x - u2) <= 0 && (y - v1) * (y - v2) <= 0) {
        if (!this.auto_kickoff) {
          this.auto_kickoff = true;
        }
        return true;
      }
      return false;
    };

    Pitch.prototype.reset = function() {
      return this.state = 'before_kickoff';
    };

    return Pitch;

  })();

  Ball = (function() {
    function Ball(x, y) {
      this.r = 4;
      this.m = 0.2;
      this.sc = "#FFA500";
      this.fc = "#FFA500";
      this.p = [x, y];
      this.v = [0, 0];
      this.decay = 0.94;
      this.last_pos = this.p;
    }

    Ball.prototype.acc = function(dir, force) {
      var a, dv, unitdir;
      unitdir = Vector2d.unit(dir);
      a = Vector2d.multiply(unitdir, force / this.m);
      dv = a;
      return this.v = Vector2d.add(this.v, dv);
    };

    Ball.prototype.render = function(canvas) {
      var x, y;
      x = this.p[0];
      y = this.p[1];
      canvas.drawCircle(this.sc, x, y, this.r + 1);
      return canvas.fillCircle(this.fc, x, y, this.r);
    };

    Ball.prototype.update = function() {
      var ds;
      if (Vector2d.len(this.v) > 1e-3) {
        ds = this.v;
        this.last_pos = this.p;
        this.p = Vector2d.add(this.p, ds);
        return this.v = Vector2d.multiply(this.v, this.decay);
      }
    };

    Ball.prototype.reset = function() {
      return this.p = [0, 0];
    };

    return Ball;

  })();

  Canvas = function(ctx, w, h) {
    this.ctx = ctx;
    this.w = w;
    return this.h = h;
  };

  Canvas.prototype.fillRect = function(color, rect) {
    this.ctx.fillStyle = color;
    return this.ctx.fillRect(this.xscreen(rect.x), this.yscreen(rect.y), rect.w, rect.h);
  };

  Canvas.prototype.drawRect = function(color, rect) {
    this.ctx.strokeStyle = color;
    return this.ctx.strokeRect(this.xscreen(rect.x), this.yscreen(rect.y), rect.w, rect.h);
  };

  Canvas.prototype.drawLine = function(color, sx, sy, ex, ey) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.moveTo(this.xscreen(sx), this.yscreen(sy));
    this.ctx.lineTo(this.xscreen(ex), this.yscreen(ey));
    return this.ctx.stroke();
  };

  Canvas.prototype.drawArc = function(color, x, y, r, sAngle, eAngle) {
    this.ctx.strokeStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(this.xscreen(x), this.yscreen(y), r, sAngle, eAngle);
    return this.ctx.stroke();
  };

  Canvas.prototype.fillArc = function(color, x, y, r, sAngle, eAngle) {
    this.ctx.fillStyle = color;
    this.ctx.beginPath();
    this.ctx.arc(this.xscreen(x), this.yscreen(y), r, sAngle, eAngle);
    return this.ctx.fill();
  };

  Canvas.prototype.drawCircle = function(color, x, y, r) {
    return this.drawArc(color, x, y, r, 0, 2 * Math.PI);
  };

  Canvas.prototype.fillCircle = function(color, x, y, r) {
    return this.fillArc(color, x, y, r, 0, 2 * Math.PI);
  };

  Canvas.prototype.drawText = function(color, font, text, x, y) {
    this.ctx.fillStyle = color;
    this.ctx.font = font;
    x = x - this.ctx.measureText(text).width / 2;
    return this.ctx.fillText(text, this.xscreen(x), this.yscreen(y));
  };

  Canvas.prototype.xscreen = function(x) {
    return x + this.w / 2;
  };

  Canvas.prototype.yscreen = function(y) {
    return y + this.h / 2;
  };

  WorldModel = (function() {
    function WorldModel() {
      this.objs = [];
      this.leftplayers = [];
      this.rightplayers = [];
    }

    WorldModel.prototype.register = function(obj) {
      return this.objs.push(obj);
    };

    WorldModel.prototype.unregister = function(obj) {
      var idx;
      idx = this.objs.indexOf(obj);
      if (idx >= 0) {
        return this.objs.splice(idx, 1);
      }
    };

    WorldModel.prototype.render = function(canvas) {
      var obj, _i, _len, _ref, _results;
      _ref = this.objs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        if (obj.render) {
          _results.push(obj.render(canvas));
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    WorldModel.prototype.update = function() {
      var i, j, obj, wm, _i, _j, _len, _ref, _ref1, _results;
      _ref = this.objs;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        if (obj.update) {
          obj.update();
        }
      }
      wm = {
        leftplayers: this.leftplayers,
        rightplayers: this.rightplayers,
        ball: this.ball
      };
      this.pitch.checkrules(this);
      _results = [];
      for (i = _j = 0, _ref1 = this.objs.length; 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
        _results.push((function() {
          var _k, _ref2, _ref3, _results1;
          _results1 = [];
          for (j = _k = _ref2 = i + 1, _ref3 = this.objs.length; _ref2 <= _ref3 ? _k < _ref3 : _k > _ref3; j = _ref2 <= _ref3 ? ++_k : --_k) {
            _results1.push(this.collide(this.objs[i], this.objs[j]));
          }
          return _results1;
        }).call(this));
      }
      return _results;
    };

    WorldModel.prototype.reset = function() {
      var obj, _i, _len, _ref, _results;
      _ref = this.objs;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        obj = _ref[_i];
        if (obj.reset) {
          _results.push(obj.reset());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    WorldModel.prototype.collide = function(x, y) {
      var dis, m1, m2, normal, overlap, tangent, v1, v1a, v1b, v1c, v2, v2a, v2b, v2c;
      if (!x.r) {
        return;
      }
      if (!y.r) {
        return;
      }
      dis = Vector2d.distance(x.p, y.p);
      if (dis > x.r + y.r) {
        return;
      }
      if (x.r === 10 && y.r === 4) {
        this.pitch.last_touch_ball = x.side;
      }
      if (x.r === 4 && y.r === 10) {
        this.pitch.last_touch_ball = y.side;
      }
      m1 = x.m;
      m2 = y.m;
      v1 = x.v;
      v2 = y.v;
      normal = Vector2d.unit(Vector2d.subtract(x.p, y.p));
      tangent = [-normal[1], normal[0]];
      v1a = Vector2d.dot(v1, normal);
      v1b = Vector2d.dot(v1, tangent);
      v2a = Vector2d.dot(v2, normal);
      v2b = Vector2d.dot(v2, tangent);
      v2c = (m1 * 0.5 * (v1a - v2a) + m1 * v1a + m2 * v2a) / (m2 + m1);
      v1c = (m1 * v1a + m2 * v2a - m2 * v2c) / m1;
      x.v[0] = v1c * normal[0] + v1b * tangent[0];
      x.v[1] = v1c * normal[1] + v1b * tangent[1];
      y.v[0] = v2c * normal[0] + v2b * tangent[0];
      y.v[1] = v2c * normal[1] + v2b * tangent[1];
      overlap = dis - x.r - y.r;
      x.p = Vector2d.add(x.p, Vector2d.multiply(normal, -overlap * x.r / (x.r + y.r)));
      return y.p = Vector2d.add(y.p, Vector2d.multiply(normal, overlap * y.r / (x.r + y.r)));
    };

    return WorldModel;

  })();

  Vector2d = {};

  Vector2d.distance = function(a, b) {
    return Vector2d.len(Vector2d.subtract(a, b));
  };

  Vector2d.subtract = function(a, b) {
    return [a[0] - b[0], a[1] - b[1]];
  };

  Vector2d.add = function(a, b) {
    return [a[0] + b[0], a[1] + b[1]];
  };

  Vector2d.multiply = multiply = function(a, s) {
    if (typeof s === 'number') {
      return [a[0] * s, a[1] * s];
    }
    return [a[0] * s[0], a[1] * s[1]];
  };

  Vector2d.divide = function(a, s) {
    if (typeof s === 'number') {
      return [a[0] / s, a[1] / s];
    }
    throw new Error('only divide by scalar supported');
  };

  Vector2d.len = function(v) {
    return Math.sqrt(v[0] * v[0] + v[1] * v[1]);
  };

  Vector2d.unit = function(v) {
    var len;
    len = Vector2d.len(v);
    if (len) {
      return [v[0] / len, v[1] / len];
    }
    return [0, 0];
  };

  Vector2d.rotate = function(v, angle) {
    angle = math.normaliseRadians(angle);
    return [v[0] * Math.cos(angle) - v[1] * Math.sin(angle), v[0] * Math.sin(angle) + v[1] * Math.cos(angle)];
  };

  Vector2d.dot = function(v1, v2) {
    return (v1[0] * v2[0]) + (v1[1] * v2[1]);
  };

  Vector2d.angle = function(v1, v2) {
    var perpDot;
    perpDot = v1[0] * v2[1] - v1[1] * v2[0];
    return Math.atan2(perpDot, Vector2d.dot(v1, v2));
  };

  Vector2d.truncate = function(v, maxLength) {
    if (Vector2d.len(v) > maxLength) {
      return multiply(Vector2d.unit(v), maxLength);
    }
    return v;
  };

  Vector2d.vector = function(angle) {
    return [Math.cos(angle), Math.sin(angle)];
  };

  Math.normaliseDegrees = function(degrees) {
    degrees = degrees % 360;
    if (degrees < 0) {
      degrees += 360;
    }
    return degrees;
  };

  Math.normaliseRadians = function(radians) {
    radians = radians % (2 * Math.PI);
    if (radians < -Math.PI) {
      radians += 2 * Math.PI;
    }
    if (radians > Math.PI) {
      radians -= 2 * Math.PI;
    }
    return radians;
  };

  Math.degrees = function(radians) {
    return radians * (180 / Math.PI);
  };

  Math.radians = function(degrees) {
    return degrees * (Math.PI / 180);
  };

  main = function() {
    var ball, c, canvas, ctx, height, i, offsetX, offsetY, pitch, player, playernum, ratio, ratioh, ratiow, width, world, _i, _j;
    width = 1280.0;
    height = 800.0;
    playernum = 11;
    c = document.getElementById("myCanvas");
    ctx = c.getContext("2d");
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ratiow = c.width / width;
    ratioh = c.height / height;
    if (ratiow < ratioh) {
      ratio = ratiow;
      c.height = height * ratio;
    } else {
      ratio = ratioh;
      c.width = width * ratio;
    }
    ctx.scale(ratio, ratio);
    offsetX = c.offsetLeft;
    offsetY = c.offsetTop;
    canvas = new Canvas(ctx, width, height);
    world = new WorldModel();
    pitch = new Pitch();
    world.register(pitch);
    world.pitch = pitch;
    ball = new Ball(0, 0);
    world.register(ball);
    world.ball = ball;
    for (i = _i = 0; _i < 11; i = ++_i) {
      player = new Player([-500 + i * 30, 360], 0, world, 'left');
      player.client = new Foo(i, 'left');
      world.register(player);
      world.leftplayers.push(player);
    }
    for (i = _j = 0; _j < 11; i = ++_j) {
      player = new Player([-500 + i * 30, 360], 0, world, 'right');
      player.client = new Foo(i, 'right');
      player.client.fill_color = 'lightblue';
      world.register(player);
      world.rightplayers.push(player);
    }
    document.addEventListener('mousedown', function(ev) {
      var x, y;
      if (ev.offsetX === void 0) {
        x = ev.pageX - offsetX - width / 2;
        y = ev.pageY - offsetY - height / 2;
      } else {
        x = ev.offsetX - width / 2;
        y = ev.offsetY - height / 2;
      }
      return onmousedown(ev, world, x, y);
    }, false);
    document.addEventListener('keydown', function(ev) {
      return onkeydown(ev, world);
    }, false);
    setInterval(function() {
      return gameloop(world, canvas);
    }, 10);
    return window.onresize = function() {
      c.width = window.innerWidth;
      c.height = window.innerHeight;
      ratiow = c.width / width;
      ratioh = c.height / height;
      if (ratiow < ratioh) {
        ratio = ratiow;
        c.height = height * ratio;
      } else {
        ratio = ratioh;
        c.width = width * ratio;
      }
      ctx.scale(ratio, ratio);
      return world.render(canvas);
    };
  };

  gameloop = function(world, canvas) {
    world.update();
    return world.render(canvas);
  };

  clone = function(obj) {
    var flags, key, newInstance;
    if ((obj == null) || typeof obj !== 'object') {
      return obj;
    }
    if (obj instanceof Date) {
      return new Date(obj.getTime());
    }
    if (obj instanceof RegExp) {
      flags = '';
      if (obj.global != null) {
        flags += 'g';
      }
      if (obj.ignoreCase != null) {
        flags += 'i';
      }
      if (obj.multiline != null) {
        flags += 'm';
      }
      if (obj.sticky != null) {
        flags += 'y';
      }
      return new RegExp(obj.source, flags);
    }
    newInstance = new obj.constructor();
    for (key in obj) {
      newInstance[key] = clone(obj[key]);
    }
    return newInstance;
  };

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.main = main;

}).call(this);
