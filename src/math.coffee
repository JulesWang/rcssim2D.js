
##
 #
 # absolute angle to relative angle, in degrees
 # @param  ->Number} absolute angle in degrees
 # @returns  ->Number} relative angle in degrees
 #
Math.normaliseDegrees = (degrees) ->
    degrees = degrees % 360
    degrees += 360 if degrees < 0
    return degrees

##
 #
 # absolute angle to relative angle, in radians
 # @param  ->Number} absolute angle in radians
 # @returns  ->Number} relative angle in radians
 #
Math.normaliseRadians = (radians) ->
    radians = radians % (2*Math.PI)
    radians += (2*Math.PI) if radians < 0
    return radians


##
 #
 # convert radians to degrees
 # @param  ->Number} radians
 # @returns  ->Number} degrees
 #
Math.degrees = (radians)  ->
    return radians * (180 / Math.PI)


##
 #
 # convert degrees to radians
 # @param  ->Number} degrees
 # @returns  ->Number} radians
 #
Math.radians = (degrees)  ->
    return degrees * (Math.PI / 180)

