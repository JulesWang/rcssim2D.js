class Fmt523
        constructor:() ->
                @wing1 = 80
                @wing2 = 60
                @wing3 = 60
                @ratio =
                    gk : 0
                    b  : 0.3
                    m  : 0.6
                    f  : 1.0

                @p = [
                        {x:-500, y:0, ratio:@ratio.gk} #GK
                        {x:0, y:-@wing1, ratio:@ratio.f} #F
                        {x:0, y:0, ratio:@ratio.f} #F
                        {x:0, y:@wing1, ratio:@ratio.f} #F

                        {x:0, y:@wing2, ratio:@ratio.m} #M
                        {x:0, y:-@wing2, ratio:@ratio.m} #M

                        {x:0, y:-2*@wing3, ratio:@ratio.b} #B
                        {x:0, y:-@wing3, ratio:@ratio.b} #B
                        {x:0, y:0, ratio:@ratio.b} #B
                        {x:0, y:@wing3, ratio:@ratio.b} #B
                        {x:0, y:2*@wing3, ratio:@ratio.b} #B
                ]

