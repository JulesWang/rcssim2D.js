class Fmt442
        constructor:() ->
                @wing2 = 200
                @wing1 = 60
                @center = 20
                @ratio =
                    gk : 0
                    b  : 0.4
                    m  : 0.75
                    f  : 1.0

                @p = [
                        {x:-500, y:0, ratio:@ratio.gk} #GK
                        {x:0, y:@wing2, ratio:@ratio.b} #B
                        {x:0, y:-@wing2, ratio:@ratio.b} #B
                        {x:0, y:@wing1, ratio:@ratio.b} #B
                        {x:0, y:-@wing1, ratio:@ratio.b} #B
                        {x:0, y:@wing2, ratio:@ratio.m} #m
                        {x:0, y:-@wing2, ratio:@ratio.m} #m
                        {x:0, y:@wing1, ratio:@ratio.m} #m
                        {x:0, y:-@wing1, ratio:@ratio.m} #m
                        {x:0, y:@center, ratio:@ratio.f} #f
                        {x:0, y:-@center, ratio:@ratio.f+0.1} #f
                ]

