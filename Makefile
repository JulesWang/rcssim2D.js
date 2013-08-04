CONCAT = coffeescript-concat

# Put coffeescript files here from bottom to top
INPUT=
INPUT+= src/main.coffee
INPUT+= src/math.coffee
INPUT+= src/vector2d.coffee
INPUT+= src/worldmodel.coffee
INPUT+= src/canvas.coffee
INPUT+= src/ball.coffee
INPUT+= src/pitch.coffee
INPUT+= src/score_board.coffee
INPUT+= src/player.coffee
INPUT+= src/keyhandle.coffee
INPUT+= teams/foo.coffee
INPUT+= teams/share.coffee
INPUT+= formations/442.coffee
# INPUT+= src/achievements.coffee
#INPUT+= src/cache.coffee
#INPUT+= src/settings.coffee
#INPUT+= src/ai.coffee

#INPUT+= lib/generic.coffee

.PHONY: all clean debug compile concat html copy tokens publish minify

all: compile
publish: compile minify html 

clean:
	rm -rf build/

debug:
	mkdir -p build/
	coffee -co build/ src/
	$(CONCAT) ${INPUT} > build/output.coffee

compile:
	mkdir -p build/
	@echo "> Compiling - Use make debug if compilation fails"
	$(CONCAT) ${INPUT} | coffee -sc > all.js

minify:
	@echo "> Minifying..."
	@uglifyjs build/output.js --stats --lint -m \
		-p 1 --source-map build/output.min.js.map --source-map-url output.min.js.map \
		-o build/output.min.js

html:
	@echo "> Writing html file"
	@cat src/output1.html build/output.min.js src/output2.html > build/output.html
	@mv build/output.html index.html

copy:
	@echo "> Copy files"
	@cp -r files/img build/

concat:
	@echo "> Concatenating coffeescript files..."
	@coffee $(CONCAT) -i src/main.coffee -i \
		${INPUT} > build/output.coffee

tokens:
	@echo "> Use make debug if compilation fails"
	@coffee $(CONCAT) -i src/main.coffee -i \
		${INPUT} | coffee -st > build/tokens
