class Fmt235
        constructor:() ->
                @wing1 = 60
                @wing2 = 80
                @wing3 = 100
                @ratio =
                    gk : 0
                    b  : 0.4
                    m  : 0.75
                    f  : 1.0

                @p = [
                        {x:-500, y:0, ratio:@ratio.gk} #GK
                        {x:0, y:@wing3, ratio:@ratio.b} #B
                        {x:0, y:-@wing3, ratio:@ratio.b} #B
                        {x:0, y:-@wing2, ratio:@ratio.m} #M
                        {x:0, y:0, ratio:@ratio.m} #M
                        {x:0, y:@wing2, ratio:@ratio.m} #M
                        {x:0, y:-2*@wing1, ratio:@ratio.f} #m
                        {x:0, y:-@wing1, ratio:@ratio.f} #m
                        {x:0, y:0, ratio:@ratio.f} #m
                        {x:0, y:@wing1, ratio:@ratio.f} #m
                        {x:0, y:2*@wing1, ratio:@ratio.f} #f
                ]

