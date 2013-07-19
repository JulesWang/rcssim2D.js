
class WorldModel
        constructor: () ->
                @objs = []

        register: (obj) ->
                @objs.push obj

        unregister: (obj) ->
                idx = @objs.indexOf obj
                @objs.splice(idx, 1) if idx >= 0 #delete obj

        render: (canvas) ->
                for obj in @objs
                        obj.render(canvas) if obj.render

        update: () ->
                for obj in @objs
                        obj.update() if obj.update

