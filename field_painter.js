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

function FieldPainter(painter) {
    this.painter = painter;
}

FieldPainter.prototype.draw = function()
{
    //if ( Options::instance().antiAliasing() )
    //{
    //    painter.setRenderHint( QPainter::Antialiasing, false );
    //}

    this.drawBackGround();
    this.drawLines();
    this.drawPenaltyAreaLines();
    this.drawGoalAreaLines();
    //this.drawGoals( painter );

    /*
    if ( Options.showFlag )
    {
        drawFlags( painter );
    }
    if ( Options.gridStep > 0.0 )
    {
        drawGrid( painter );
    }

    if ( Options::instance().antiAliasing() )
    {
        painter.setRenderHint( QPainter::Antialiasing );
    }
    */
}

/*-------------------------------------------------------------------*/
/*!

 */
FieldPainter.prototype.drawBackGround = function()
{
    var rect = {x:-g_width/2, y:-g_height/2, w:g_width, h:g_height};
    this.painter.fillRect( FIELD_COLOR, rect);
}

/*-------------------------------------------------------------------*/
/*!

 */
FieldPainter.prototype.drawLines = function()
{
    // set screen coordinates of field
    var field = {x:-PITCH_HALF_LENGTH, y:-PITCH_HALF_WIDTH, w:PITCH_LENGTH, h:PITCH_WIDTH};

    this.painter.drawRect(LINE_COLOR, field);

    /*
    if ( SP.keepaway_mode_
         || opt.showKeepawayArea() )
    {
        // keepaway area
        int ka_left = opt.screenX( - SP.keepaway_length_ * 0.5 );
        int ka_top = opt.screenY( - SP.keepaway_width_ * 0.5 );
        int ka_width = opt.scale( SP.keepaway_width_  );
        int ka_length = opt.scale( SP.keepaway_length_ );

        painter.drawRect( ka_left, ka_top, ka_length, ka_width );
    }
    else
    */
    {
        // center line
        this.painter.drawLine(LINE_COLOR, 0, field.y, 0, field.y + field.h );

        // center circle
        this.painter.drawArc(LINE_COLOR, 0, 0 , CENTER_CIRCLE_R, 0, 2*Math.PI);
    }

    // corner arc
    this.painter.drawArc(LINE_COLOR, field.x , field.y, CORNER_ARC_R, 0, Math.PI/2);
    this.painter.drawArc(LINE_COLOR, field.x + field.w , field.y, CORNER_ARC_R, Math.PI/2, Math.PI);
    this.painter.drawArc(LINE_COLOR, field.x + field.w , field.y + field.h, CORNER_ARC_R, Math.PI, 3*Math.PI/2);
    this.painter.drawArc(LINE_COLOR, field.x , field.y + field.h, CORNER_ARC_R, 3*Math.PI/2, 2*Math.PI);
}

/*-------------------------------------------------------------------*/
FieldPainter.prototype.drawPenaltyAreaLines = function() {
    // set screen coordinates of field
    var left_x   = -PITCH_HALF_LENGTH;
    var right_x  = PITCH_HALF_LENGTH;

    // set penalty area params
    var pen_top_y    = -PENALTY_AREA_WIDTH*0.5;
    var pen_bottom_y = PENALTY_AREA_WIDTH*0.5;

    var pen_circle_y_degree_abs = Math.acos( ( PENALTY_AREA_LENGTH - PENALTY_SPOT_DIST )
                     / PENALTY_CIRCLE_R );

    //var span_angle = qRound( pen_circle_y_degree_abs * 2.0 * 16 );
    var pen_circle_r = PENALTY_CIRCLE_R;
    var pen_circle_size = PENALTY_CIRCLE_R * 2.0;

    // left penalty area X
    var pen_x =  -( PITCH_HALF_LENGTH - PENALTY_AREA_LENGTH );
    // left arc
    var pen_spot_x =  -( PITCH_HALF_LENGTH - PENALTY_SPOT_DIST );
    this.painter.drawArc( LINE_COLOR,
                     -( PITCH_HALF_LENGTH + PENALTY_SPOT_DIST - PENALTY_AREA_LENGTH),
                     0,
                     pen_circle_size,
                     -pen_circle_y_degree_abs,
                     pen_circle_y_degree_abs);
    // left rectangle
    this.painter.drawLine( LINE_COLOR, left_x, pen_top_y, pen_x, pen_top_y );
    this.painter.drawLine( LINE_COLOR, pen_x, pen_top_y, pen_x, pen_bottom_y );
    this.painter.drawLine( LINE_COLOR, pen_x, pen_bottom_y, left_x, pen_bottom_y );
    // left spot
    this.painter.drawArc( LINE_COLOR, pen_spot_x, 0, 1, 0, 2*Math.PI );

    // right penalty area X
    pen_x =  +( PITCH_HALF_LENGTH - PENALTY_AREA_LENGTH );
    // right arc
    pen_spot_x =  +( PITCH_HALF_LENGTH - PENALTY_SPOT_DIST);
    this.painter.drawArc( LINE_COLOR,
                     +( PITCH_HALF_LENGTH + PENALTY_SPOT_DIST - PENALTY_AREA_LENGTH ),
                     0,
                     pen_circle_size,
                     Math.PI - pen_circle_y_degree_abs,
                     Math.PI +pen_circle_y_degree_abs);
    // right rectangle
    this.painter.drawLine( LINE_COLOR, right_x, pen_top_y, pen_x, pen_top_y );
    this.painter.drawLine( LINE_COLOR, pen_x, pen_top_y, pen_x, pen_bottom_y );
    this.painter.drawLine( LINE_COLOR, pen_x, pen_bottom_y, right_x, pen_bottom_y );
    // right spot
    this.painter.drawArc( LINE_COLOR, pen_spot_x, 0, 1, 0, 2*Math.PI );
}

/*-------------------------------------------------------------------*/
FieldPainter.prototype.drawGoalAreaLines = function() {
    // set screen coordinates of field
    var left_x   = -PITCH_HALF_LENGTH;
    var right_x  = +PITCH_HALF_LENGTH;

    // set coordinates opts
    var goal_area_y_abs = GOAL_AREA_WIDTH*0.5;
    var goal_area_top_y =  - goal_area_y_abs;
    var goal_area_bottom_y =  + goal_area_y_abs;

    // left goal area
    var goal_area_x =  - PITCH_HALF_LENGTH + GOAL_AREA_LENGTH;
    this.painter.drawLine( LINE_COLOR, left_x, goal_area_top_y, goal_area_x, goal_area_top_y );
    this.painter.drawLine( LINE_COLOR, goal_area_x, goal_area_top_y, goal_area_x, goal_area_bottom_y );
    this.painter.drawLine( LINE_COLOR, goal_area_x, goal_area_bottom_y, left_x, goal_area_bottom_y );

    // right goal area
    goal_area_x = PITCH_HALF_LENGTH - GOAL_AREA_LENGTH;
    this.painter.drawLine( LINE_COLOR, right_x, goal_area_top_y, goal_area_x, goal_area_top_y );
    this.painter.drawLine( LINE_COLOR, goal_area_x, goal_area_top_y, goal_area_x, goal_area_bottom_y );
    this.painter.drawLine( LINE_COLOR, goal_area_x, goal_area_bottom_y, right_x, goal_area_bottom_y );
}

/*-------------------------------------------------------------------*/
/*!

void
FieldPainter::drawGoals( QPainter & painter ) const
{
    const Options & opt = Options::instance();

    // set gdi objects
    painter.setPen( Qt::black );
    painter.setBrush( Qt::black );

    // set coordinates param
    int goal_top_y = opt.screenY( - Options::GOAL_WIDTH*0.5 );
    int goal_size_x = opt.scale( Options::GOAL_DEPTH );
    int goal_size_y = opt.scale( Options::GOAL_WIDTH );

    int post_top_y = opt.screenY( - Options::GOAL_WIDTH*0.5 - Options::GOAL_POST_RADIUS*2.0 );
    int post_bottom_y = opt.screenY( + Options::GOAL_WIDTH*0.5 );
    int post_diameter = opt.scale( Options::GOAL_POST_RADIUS*2.0 );

    // left goal
    painter.drawRect( opt.screenX( - Options::PITCH_HALF_LENGTH - Options::GOAL_DEPTH ) - 1,
                      goal_top_y,
                      goal_size_x,
                      goal_size_y );
    if ( post_diameter >= 1 )
    {
        int post_x = opt.screenX( - Options::PITCH_HALF_LENGTH );
        painter.drawEllipse( post_x,
                             post_top_y,
                             post_diameter,
                             post_diameter );
        painter.drawEllipse( post_x,
                             post_bottom_y,
                             post_diameter,
                             post_diameter );
    }
    // right goal
    painter.drawRect( opt.screenX( Options::PITCH_HALF_LENGTH ) + 1,
                      goal_top_y,
                      goal_size_x,
                      goal_size_y );
    if ( post_diameter >= 1 )
    {
        int post_x = opt.screenX( Options::PITCH_HALF_LENGTH - Options::GOAL_POST_RADIUS*2.0 );
        painter.drawEllipse( post_x,
                             post_top_y,
                             post_diameter,
                             post_diameter );
        painter.drawEllipse( post_x,
                             post_bottom_y,
                             post_diameter,
                             post_diameter );
    }
}

/*-------------------------------------------------------------------*/
/*!

void
FieldPainter::drawFlags( QPainter & painter ) const
{
    const Options & opt = Options::instance();

    // set gdi objects
    painter.setPen( opt.linePen() );
    painter.setBrush( Qt::NoBrush );

    // set size or coordinates params
    int flag_radius = opt.scale( 0.5 );
    if ( flag_radius < 2 ) flag_radius = 2;
    if ( flag_radius > 5 ) flag_radius = 5;
    int flag_diameter = flag_radius * 2;

    int x, y;
    int pitch_half_length = opt.scale( Options::PITCH_HALF_LENGTH );
    int pitch_half_width = opt.scale( Options::PITCH_HALF_WIDTH );
    int pitch_margin_x = opt.scale( Options::PITCH_HALF_LENGTH + Options::PITCH_MARGIN );
    int pitch_margin_y = opt.scale( Options::PITCH_HALF_WIDTH + Options::PITCH_MARGIN );
    int penalty_x = opt.scale( Options::PITCH_HALF_LENGTH - Options::PENALTY_AREA_LENGTH );
    int penalty_y = opt.scale( Options::PENALTY_AREA_WIDTH*0.5 );
    int goal_y = opt.scale( Options::GOAL_WIDTH*0.5 );
    int scale10 = opt.scale( 10.0 );
    int scale20 = opt.scale( 20.0 );
    int scale30 = opt.scale( 30.0 );
    int scale40 = opt.scale( 40.0 );
    int scale50 = opt.scale( 50.0 );

    QPainterPath path;

    // goal left
    x = opt.fieldCenter().x() - pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // goal right
    x = opt.fieldCenter().x() + pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag c
    x  = opt.fieldCenter().x() - flag_radius;
    y = opt.fieldCenter().y() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag c t
    x = opt.fieldCenter().x() - flag_radius;
    y = opt.fieldCenter().y() - pitch_half_width - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );

    // flag c b
    x = opt.fieldCenter().x() - flag_radius;
    y = opt.fieldCenter().y() + pitch_half_width - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l t
    x = opt.fieldCenter().x() - pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() - pitch_half_width - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l b
    x = opt.fieldCenter().x() - pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() + pitch_half_width - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r t
    x = opt.fieldCenter().x() + pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() - pitch_half_width - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r b
    x = opt.fieldCenter().x() + pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() + pitch_half_width - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag p l t
    x = opt.fieldCenter().x() - penalty_x - flag_radius;
    y = opt.fieldCenter().y() - penalty_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag p l c
    x = opt.fieldCenter().x() - penalty_x - flag_radius;
    y = opt.fieldCenter().y() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag p l b
    x = opt.fieldCenter().x() - penalty_x - flag_radius;
    y = opt.fieldCenter().y() + penalty_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag p r t
    x = opt.fieldCenter().x() + penalty_x - flag_radius;
    y = opt.fieldCenter().y() - penalty_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag p r c
    x = opt.fieldCenter().x() + penalty_x - flag_radius;
    y = opt.fieldCenter().y() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag p r b
    x = opt.fieldCenter().x() + penalty_x - flag_radius;
    y = opt.fieldCenter().y() + penalty_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );

    // flag g l t
    x = opt.fieldCenter().x() - pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() - goal_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag g l b
    x = opt.fieldCenter().x() - pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() + goal_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag g r t
    x = opt.fieldCenter().x() + pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() - goal_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag g r b
    x = opt.fieldCenter().x() + pitch_half_length - flag_radius;
    y = opt.fieldCenter().y() + goal_y - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );

    // flag t ...

    y = opt.fieldCenter().y() - pitch_margin_y - flag_radius;
    // flag t l 50
    x = opt.fieldCenter().x() - scale50 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t l 40
    x = opt.fieldCenter().x() - scale40 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t l 30
    x = opt.fieldCenter().x() - scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t l 20
    x = opt.fieldCenter().x() - scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t l 10
    x = opt.fieldCenter().x() - scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t 0
    x = opt.fieldCenter().x() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t r 10
    x = opt.fieldCenter().x() + scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t r 20
    x = opt.fieldCenter().x() + scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t r 30
    x = opt.fieldCenter().x() + scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t r 40
    x = opt.fieldCenter().x() + scale40 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag t r 50
    x = opt.fieldCenter().x() + scale50 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );

    // flag b ...

    y = opt.fieldCenter().y() + pitch_margin_y - flag_radius;
    // flag b l 50
    x = opt.fieldCenter().x() - scale50 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b l 40
    x = opt.fieldCenter().x() - scale40 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b l 30
    x = opt.fieldCenter().x() - scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b l 20
    x = opt.fieldCenter().x() - scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b l 10
    x = opt.fieldCenter().x() - scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b 0
    x = opt.fieldCenter().x() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b r 10
    x = opt.fieldCenter().x() + scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b r 20
    x = opt.fieldCenter().x() + scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b r 30
    x = opt.fieldCenter().x() + scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b r 40
    x = opt.fieldCenter().x() + scale40 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag b r 50
    x = opt.fieldCenter().x() + scale50 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );

    // flag l ...

    x = opt.fieldCenter().x() - pitch_margin_x - flag_radius;
    // flag l t 30
    y = opt.fieldCenter().y() - scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l t 20
    y = opt.fieldCenter().y() - scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l t 10
    y = opt.fieldCenter().y() - scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l 0
    y = opt.fieldCenter().y() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l b 10
    y = opt.fieldCenter().y() + scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l b 20
    y = opt.fieldCenter().y() + scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag l b 30
    y = opt.fieldCenter().y() + scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );

    // flag r ...

    x = opt.fieldCenter().x() + pitch_margin_x - flag_radius;
    // flag r t 30
    y = opt.fieldCenter().y() - scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r t 20
    y = opt.fieldCenter().y() - scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r t 10
    y = opt.fieldCenter().y() - scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r 0
    y = opt.fieldCenter().y() - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r b 10
    y = opt.fieldCenter().y() + scale10 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r b 20
    y = opt.fieldCenter().y() + scale20 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );
    // flag r b 30
    y = opt.fieldCenter().y() + scale30 - flag_radius;
    path.addEllipse( x, y, flag_diameter, flag_diameter );

    painter.drawPath( path );
}

/*-------------------------------------------------------------------*/
/*!

void
FieldPainter::drawGrid( QPainter & painter ) const
{
    const Options & opt = Options::instance();

    const double grid_step = opt.gridStep();
    const int istep = opt.scale( grid_step );
    if ( istep <= 2 )
    {
        return;
    }

    const QFontMetrics metrics = painter.fontMetrics();
    const int text_step_x = ( opt.showGridCoord()
                              ? metrics.width( QObject::tr( "-00.000" ) )
                              : 100000 );
    const int text_step_y = ( opt.showGridCoord()
                              ? metrics.ascent()
                              : 100000 );

    const QRect win = painter.window();

    const int max_ix = win.right();
    const int min_ix = win.left();
    const int max_iy = win.bottom();
    const int min_iy = win.top();
    const double max_x = opt.fieldX( max_ix );
    const double min_x = opt.fieldX( min_ix );
    const double max_y = opt.fieldY( max_iy );
    const double min_y = opt.fieldY( min_iy );

    const int coord_x_print_y = min_iy + metrics.ascent();
    //     std::cerr << "drawGrid  min_x = " << min_x
    //               << "  max_x = " << max_x
    //               << "  min_y = " << min_y
    //               << "  max_y = " << max_y
    //               << std::endl;

    painter.setPen( opt.linePen() );
    painter.setBrush( Qt::NoBrush );

    QString text;

    double x = 0.0;
    while ( x < max_x )
    {
        int ix = opt.screenX( x );
        if ( istep > text_step_x )
        {
            text.sprintf( "%.3f", x );
            painter.drawText( ix, coord_x_print_y , text );
        }
        painter.drawLine( ix, max_iy, ix, min_iy );
        x += grid_step;
    }

    x = -grid_step;
    while ( min_x < x )
    {
        int ix = opt.screenX( x );
        if ( istep > text_step_x )
        {
            text.sprintf( "%.3f", x );
            painter.drawText( ix, coord_x_print_y, text );
        }
        painter.drawLine( ix, max_iy, ix, min_iy );
        x -= grid_step;
    }


    double y = 0.0;
    while ( y < max_y )
    {
        int iy = opt.screenY( y );
        if ( istep > text_step_y )
        {
            text.sprintf( "%.3f", y );
            painter.drawText( min_ix, iy, text );
        }
        painter.drawLine( max_ix, iy, min_ix, iy );
        y += grid_step;
    }

    y = -grid_step;
    while ( min_y < y )
    {
        int iy = opt.screenY( y );
        if ( istep > text_step_y )
        {
            text.sprintf( "%.3f", y );
            painter.drawText( min_ix, iy, text );
        }
        painter.drawLine( max_ix, iy, min_ix, iy );
        y -= grid_step;
    }
}
*/
