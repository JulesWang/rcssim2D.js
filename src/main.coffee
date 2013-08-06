
main = () ->
        width = 1280.0
        height = 800.0
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
        world.pitch = pitch
        pitch.board.left_teamname = 'foo'
        pitch.board.right_teamname = 'bar'

        ball = new Ball(0, 0)
        world.register(ball)
        world.ball = ball

        for i in [0...11]
                player = new Player([-500+i*30, 360], 0, world, 'left')
                player.client = new Foo(i, 'left')
                world.register(player)
                world.leftplayers.push player
        for i in [0...11]
                player = new Player([-500+i*30, 360], 0, world, 'right')
                player.client = new Foo(i, 'right')
                player.client.fill_color = 'lightblue'
                world.register(player)
                world.rightplayers.push player
        
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
        , 20

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



# steal from http://coffeescriptcookbook.com/chapters/classes_and_objects/cloning
clone = (obj) ->
  if not obj? or typeof obj isnt 'object'
    return obj

  if obj instanceof Date
    return new Date(obj.getTime())

  if obj instanceof RegExp
    flags = ''
    flags += 'g' if obj.global?
    flags += 'i' if obj.ignoreCase?
    flags += 'm' if obj.multiline?
    flags += 'y' if obj.sticky?
    return new RegExp(obj.source, flags)

  newInstance = new obj.constructor()

  for key of obj
    newInstance[key] = clone obj[key]

  return newInstance


root = exports ? this
root.main = main
