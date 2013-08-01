Client ?= {}
Client.foo = {}

Client.foo.getfmtpos = (bp, teamnum) ->
        fmt = new Client.Fmt442()
        pos = fmt.p[teamnum]
        pos.x = (-(bp[0]-525) * pos.ratio-525) if pos.x is 0
        return [pos.x, pos.y]

Client.foo.think = (wm) ->
    if wm.gamestate is "before_kickoff"
        return {jump:Client.foo.getfmtpos(wm.ball, wm.myteamnum)}


