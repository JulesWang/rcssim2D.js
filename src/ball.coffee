
class Ball
        constructor: (x, y) ->
                @r = 4
                @m = 0.2 #kg
                @sc = "#FFA500"
                @fc = "#FFA500"
                @p = [x, y]
                @v = [0, 0]
                @decay = 0.94
                
                
        acc: (dir, force) ->
                unitdir = Vector2d.unit(dir)
                a = Vector2d.multiply(unitdir, force/@m)
                dv = a
                @v = Vector2d.add(@v, dv)
                console.log(@v)
                #if Vector2d.len(@v) >

        render: (canvas) ->
                x = @p[0]
                y = @p[1]
                canvas.drawCircle(@sc, x, y, @r+1)
                canvas.fillCircle(@fc, x, y, @r)

        update: () ->
                #Simulate Friction. Make sure the speed is positive 
                if Vector2d.len(@v) > 1e-3
                        ds = @v
                        @p = Vector2d.add(@p, ds)
                        @v = Vector2d.multiply(@v, @decay)

                
