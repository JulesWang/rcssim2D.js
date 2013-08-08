#    Rcssim2d.js - A robot soccer simulator 2d in js
#    Copyright 2013 Jules Wang
#
#    Rcssim2d.js is free software: you can redistribute it and/or modify
#    it under the terms of the GNU General Public License as published by
#    the Free Software Foundation, either version 3 of the License, or
#    (at your option) any later version.
#
#    Rcssim2d.js is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU General Public License for more details.
#
#    You should have received a copy of the GNU General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.

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

        board = new ScoreBoard()
        world.register(board)
        pitch.board = board

        ball = new Ball(0, 0)
        world.register(ball)
        world.ball = ball

        for i in [0...playernum]
                player = new Player([-500+i*30, 360], 0, world, 'left')
                world.register(player)
                world.leftplayers.push player

                player = new Player([-500+i*30, -360], 0, world, 'right')
                world.register(player)
                world.rightplayers.push player

        start_game = () ->
                host_color = 'black'
                guest_color = 'blue'

                left = left_select.options[left_select.selectedIndex].text
                right = right_select.options[right_select.selectedIndex].text

                pitch.board.left_teamname = left
                pitch.board.right_teamname = right
                i = 0
                for player in world.leftplayers
                        #player.client = new client1.Foo(i, 'left')
                        eval('player.client = new client1.' + left + '(i, \'left\')')
                        player.sc = host_color
                        i += 1
                i = 0
                for player in world.rightplayers
                        #player.client = new client2.Foo(i, 'right')
                        eval('player.client = new client2.' + right + '(i, \'right\')')
                        player.sc = guest_color
                        i += 1

                world.reset()


        setInterval ()->
                gameloop(world, canvas)
        , 20


        left_select = document.getElementById("left-select")
        right_select = document.getElementById("right-select")
        start_button = document.getElementById("start")

        for teamname of client1
                option = document.createElement('option')
                option.text = teamname
                left_select.add(option, null)

        for teamname of client2
                option = document.createElement('option')
                option.text = teamname
                right_select.add(option, null)

        start_button.addEventListener('click', start_game)
        
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
