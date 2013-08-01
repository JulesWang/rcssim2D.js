
main = () ->
        width = 1280.0
        height = 720.0
        playernum = 11

        c = document.getElementById("myCanvas")
        ctx = c.getContext("2d")

 
        c.width  = window.innerWidth
        c.height = window.innerHeight
        ratiow = c.width/width
        ratioh = c.height/height
        if ratiow < ratioh
                ratio = ratiow
                c.height = height * ratio
        else
                ratio = ratioh
                c.width = width * ratio
         
        ctx.scale(ratio, ratio)
        
       
        offsetX = c.offsetLeft
        offsetY = c.offsetTop
        
        canvas = new Canvas(ctx, width, height)
        world = new WorldModel()

        pitch = new Pitch()
        world.register(pitch)

        ball = new Ball(0, 0)
        world.register(ball)
        world.ball = ball

        redteamname  = 'foo'
        blueteamname = 'bar'

        for i in [0...11]
                player = new Player([-500+i*30, 360], 0, 'red', world, redteamname)
                world.register(player)
                world.redplayers.push player
        for i in [0...11]
                player = new Player([500-i*30, 360], Math.PI, 'blue', world, blueteamname)
                world.register(player)
                world.blueplayers.push player
        
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

        window.onresize = () ->
                c.width = window.innerWidth
                c.height = window.innerHeight
                ratiow = c.width/width
                ratioh = c.height/height
                if ratiow < ratioh
                        ratio = ratiow
                        c.height = height * ratio
                else
                        ratio = ratioh
                        c.width = width * ratio
         
                ctx.scale(ratio, ratio)
                world.render(canvas)
gameloop = (world, canvas) ->
        world.update()
        world.render(canvas)


