CONCAT = coffeescript-concat

# Put coffeescript files here from bottom to top
SERVER=
SERVER+= src/main.coffee
SERVER+= src/math.coffee
SERVER+= src/vector2d.coffee
SERVER+= src/worldmodel.coffee
SERVER+= src/canvas.coffee
SERVER+= src/ball.coffee
SERVER+= src/pitch.coffee
SERVER+= src/score_board.coffee
SERVER+= src/player.coffee
SERVER+= src/keyhandle.coffee


CLIENT+= teams/share.coffee
CLIENT+= formations/442.coffee
CLIENT+= src/math.coffee
CLIENT+= src/vector2d.coffee

CLIENT+= teams/foo.coffee

.PHONY: all clean compile minify

all: compile
publish: compile minify

clean:
	rm -rf build/

compile:
	mkdir -p build/
	@echo "> Compiling..."
	$(CONCAT) ${SERVER} | coffee -sc > server.js
	$(CONCAT) src/client1.coffee ${CLIENT} | coffee -sc > client1.js
	$(CONCAT) src/client2.coffee ${CLIENT} | coffee -sc > client2.js

minify:
	@echo "> Minifying..."
	@uglifyjs build/output.js --stats --lint -m \
		-p 1 --source-map build/output.min.js.map --source-map-url output.min.js.map \
		-o build/output.min.js

