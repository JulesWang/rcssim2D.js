/*
 *Copyright:

 Copyright (C) The RoboCup Soccer Server Maintenance Group.
 Hidehisa Akiyama

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

/*-------------------------------------------------------------------*/
/*!

*/
function ScoreBoardPainter(painter) {
    this.painter = painter;

}

/*-------------------------------------------------------------------*/
/*!

*/
ScoreBoardPainter.prototype.draw = function()
{
    /*
    static const std::string s_playmode_strings[] = PLAYMODE_STRINGS;

    const Options & opt = Options::instance();

    if ( ! opt.showScoreBoard() )
    {
        return;
    }

    DispConstPtr disp = M_disp_holder.currentDisp();

    if ( ! disp )
    {
        return;
    }

    const int current_time = disp->show_.time_;

    const rcss::rcg::TeamT & team_l = disp->team_[0];
    const rcss::rcg::TeamT & team_r = disp->team_[1];

    const rcss::rcg::PlayMode pmode = disp->pmode_;

    const std::vector< std::pair< int, rcss::rcg::PlayMode > > & pen_scores_l = M_disp_holder.penaltyScoresLeft();
    const std::vector< std::pair< int, rcss::rcg::PlayMode > > & pen_scores_r = M_disp_holder.penaltyScoresRight();

    bool show_pen_score = true;

    if ( pen_scores_l.empty()
         && pen_scores_r.empty() )
    {
        show_pen_score = false;
    }
    else if ( ( ! pen_scores_l.empty()
                && current_time < pen_scores_l.front().first )
              && ( ! pen_scores_r.empty()
                   && current_time < pen_scores_r.front().first )
              && pmode != rcss::rcg::PM_PenaltySetup_Left
              && pmode != rcss::rcg::PM_PenaltySetup_Right
              && pmode != rcss::rcg::PM_PenaltyReady_Left
              && pmode != rcss::rcg::PM_PenaltyReady_Right
              && pmode != rcss::rcg::PM_PenaltyTaken_Left
              && pmode != rcss::rcg::PM_PenaltyTaken_Right )
    {
        show_pen_score = false;
    }


    QString main_buf;

    if ( ! show_pen_score )
    {
        main_buf.sprintf( " %10s %d:%d %-10s %19s %6d    ",
                          ( team_l.name_.empty() || team_l.name_ == "null" )
                          ? ""
                          : team_l.name_.c_str(),
                          team_l.score_,
                          team_r.score_,
                          ( team_r.name_.empty() || team_r.name_ == "null" )
                          ? ""
                          : team_r.name_.c_str(),
                          s_playmode_strings[pmode].c_str(),
                          current_time );
    }
    else
    {
        std::string left_penalty; left_penalty.reserve( 10 );
        std::string right_penalty; right_penalty.reserve( 10 );

        for ( std::vector< std::pair< int, rcss::rcg::PlayMode > >::const_iterator it = pen_scores_l.begin();
              it != pen_scores_l.end();
              ++it )
        {
            if ( it->first > current_time ) break;

            if ( it->second == rcss::rcg::PM_PenaltyScore_Left
                 || it->second == rcss::rcg::PM_PenaltyScore_Right )
            {
                left_penalty += 'o';
            }
            else if ( it->second == rcss::rcg::PM_PenaltyMiss_Left
                      || it->second == rcss::rcg::PM_PenaltyMiss_Right )
            {
                left_penalty += 'x';
            }
        }

        for ( std::vector< std::pair< int, rcss::rcg::PlayMode > >::const_iterator it = pen_scores_r.begin();
              it != pen_scores_r.end();
              ++it )
        {
            if ( it->first > current_time ) break;

            if ( it->second == rcss::rcg::PM_PenaltyScore_Left
                 || it->second == rcss::rcg::PM_PenaltyScore_Right )
            {
                right_penalty += 'o';
            }
            else if ( it->second == rcss::rcg::PM_PenaltyMiss_Left
                      || it->second == rcss::rcg::PM_PenaltyMiss_Right )
            {
                right_penalty += 'x';
            }
        }

        main_buf.sprintf( " %10s %d:%d |%-5s:%-5s| %-10s %19s %6d",
                          ( team_l.name_.empty() || team_l.name_ == "null" )
                          ? ""
                          : team_l.name_.c_str(),
                          team_l.score_, team_r.score_,
                          left_penalty.c_str(),
                          right_penalty.c_str(),
                          ( team_r.name_.empty() || team_r.name_ == "null" )
                          ? ""
                          : team_r.name_.c_str(),
                          s_playmode_strings[pmode].c_str(),
                          current_time );
    }

    //painter.setFont( M_font );
    painter.setFont( opt.scoreBoardFont() );
    QRect bounding_rect = painter.fontMetrics().boundingRect( main_buf );

    QRect rect;
    rect.setLeft( 0 );
    rect.setTop( painter.window().bottom() - bounding_rect.height() + 1 );
    rect.setWidth( bounding_rect.width() );
    rect.setHeight( bounding_rect.height() );
    */

    var sb_width = 500;
    var sb_height = 80;
    var rect =  { x: -sb_width/2, y: -g_height/2, w: sb_width, h: sb_height };

    this.painter.fillRect( SCORE_BOARD_BRUSH_COLOR, rect );

    this.painter.drawText( SCORE_BOARD_PEN_COLOR, "20px Comic Sans MS", " Foo 0:0 Bar ", 0, -g_height/2+30 );
    this.painter.drawText( SCORE_BOARD_PEN_COLOR, "20px Comic Sans MS", " before play off  0", 0, -g_height/2+60 );
}
