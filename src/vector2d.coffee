
Vector2d = {}

# @param {Array} origin point [b0, b1]
# @param {Array} target point [b0, b1]
# @returns {Number} distance between two points
#/
Vector2d.distance = (a, b) ->
   return Vector2d.len(Vector2d.subtract(a, b))



# subtracts vectors [a0, a1] - [a0, a1]
# @param {Array} a
# @param {Array} b
# @returns {Array} vector
#/
Vector2d.subtract  =  (a, b) ->
   return [a[0] - b[0], a[1] - b[1]]



# adds vectors [a0, a1] - [a0, a1]
# @param {Array} a vector
# @param {Array} b vector
# @returns {Array} vector
#/
Vector2d.add  =  (a, b) ->
   return [a[0] + b[0], a[1] + b[1]]



# multiply vector with scalar or other vector
# @param {Array} vector [v0, v1]
# @param {Number|Array} vector or number
# @returns {Number|Array} result
#/
Vector2d.multiply  =  multiply  =  (a, s) ->
   if (typeof s  is 'number')
      return [a[0] * s, a[1] * s]

   return [a[0] * s[0], a[1] * s[1]]



# @param {Array} a vector
# @param {Number} s
#/
Vector2d.divide  =  (a, s) ->
   if (typeof s  is 'number')
      return [a[0] / s, a[1] / s]
   
   throw new Error('only divide by scalar supported')



# @param {Array} vector [v0, v1]
# @returns {Number} length of vector
#/
Vector2d.len  =  (v) ->
   return Math.sqrt(v[0]*v[0] + v[1]*v[1])



#
# normalize vector to unit vector
# @param {Array} vector [v0, v1]
# @returns {Array} unit vector [v0, v1]
#/
Vector2d.unit  =  (v) ->
   len  =  Vector2d.len(v)
   return [v[0] / len, v[1] / len] if len

   return [0, 0]



#
# rotate vector
# @param {Array} vector [v0, v1]
# @param {Number} angle to rotate vector by, radians. can be negative
# @returns {Array} rotated vector [v0, v1]
#/
Vector2d.rotate = (v, angle) ->
   angle = math.normaliseRadians(angle)
   return [v[0]* Math.cos(angle)-v[1]*Math.sin(angle),
           v[0]* Math.sin(angle)+v[1]*Math.cos(angle)]




#
# calculate vector dot product
# @param {Array} vector [v0, v1]
# @param {Array} vector [v0, v1]
# @returns {Number} dot product of v1 and v2
#/
Vector2d.dot = (v1, v2) ->
   return (v1[0] * v2[0]) + (v1[1] * v2[1])



#
# calculate angle between vectors
# @param {Array} vector [v0, v1]
# @param {Array} vector [v0, v1]
# @returns {Number} angle between v1 and v2 in radians
#/
Vector2d.angle = (v1, v2) ->
   perpDot = v1[0] * v2[1] - v1[1] * v2[0]
   return Math.atan2(perpDot, Vector2d.dot(v1,v2))



# @returns {Array} vector with max length as specified.
#/
Vector2d.truncate  =  (v, maxLength) ->
   return multiply(Vector2d.unit(v), maxLength) if Vector2d.len(v) > maxLength

   return v


Vector2d.vector = (angle) ->
   return [Math.cos(angle), Math.sin(angle)]
