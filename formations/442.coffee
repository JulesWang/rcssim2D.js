Client = {}
class Client.Fmt442
        constructor:() ->
                @wing2 = 200
                @wing1 = 100
                @center = 50
                @ratio =
                    gk : 0
                    b  : 0.4
                    m  : 0.75
                    f  : 1.0

                @p = [
                        {} #0
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
                        {x:0, y:-@center, ratio:@ratio.f} #f
                ]

