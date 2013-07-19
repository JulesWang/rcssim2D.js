
main = () ->
        c = document.getElementById("myCanvas")
        ctx = c.getContext("2d")
        
        width = c.width
        height = c.height

        offsetX = c.offsetLeft
        offsetY = c.offsetTop
        
        canvas = new Canvas(ctx, width, height)
        world = new WorldModel()

        pitch = new Pitch()
        world.register(pitch)

        ball = new Ball(0, 0)
        world.register(ball)

        player = new Player(20, 0, 0)
        player.ball = ball
        world.register(player)
        document.addEventListener('mousedown', (ev)->
                        if ev.offsetX is undefined
                                x = ev.pageX - offsetX - width / 2
                                y = ev.pageY - offsetY - height / 2
                        else
                                x = ev.offsetX - width / 2
                                y = ev.offsetY - height / 2
                        onmousedown(ev, world, x, y)
                , false)
        document.addEventListener('keydown', (ev) ->
                        onkeydown(ev, world)
                , false)

        setInterval ()->
                gameloop(world, canvas)
        , 10

gameloop = (world, canvas) ->
        world.update()
        world.render(canvas)


