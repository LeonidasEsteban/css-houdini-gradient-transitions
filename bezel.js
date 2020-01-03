class Bezel {
  static get inputProperties() {
    return ['--bezel-color', '--bezel-width', '--bezel-radius']
  }
  static get inputArguments() {
    return ['*']
  }
  static get contextOptions() {

  }
  parseValue(val) {
    return val.toString().replace(' ', '').replace(/px|%/g, '').split(' ')
  }
  paint(ctx, geom, properties, args) {
    // console.log(args[0])
    const [fillType] = this.parseValue(args[0])
    // console.log(fillType)
    // console.log(properties.get('--bezel-color'))
    // console.log(geom)
    // console.log('hola paint api')

    ctx.lineWidth = properties.get('--bezel-width')
    ctx.strokeStyle = properties.get('--bezel-color')
    const inset = ctx.lineWidth / 2
    const [
      topLeftRadius,
      topRightRadius,
      bottomRightRadius,
      bottomLeftRadius,
    ] = this.parseValue(properties.get('--bezel-radius'))
    // const radius = [10, 0, 10, 0]
    // const topLeftRadius = radius[0]
    // const topRightRadius = radius[1]
    // const bottomRightRadius = radius[2]
    // const bottomLeftRadius = radius[3]

    const width = geom.width
    const height = geom.height

    ctx.lineTo(topLeftRadius, inset)
    ctx.lineTo(width - topRightRadius, inset)
    ctx.lineTo(width - inset, topRightRadius)
    ctx.lineTo(width - inset, height - bottomRightRadius)
    ctx.lineTo(width - bottomRightRadius, height - inset)
    ctx.lineTo(bottomLeftRadius, height - inset)
    ctx.lineTo(inset, height - bottomLeftRadius)
    ctx.lineTo(inset, topLeftRadius)
    ctx.closePath()
    if (fillType === 'filled') {
      ctx.fillStyle = properties.get('--bezel-color')
      ctx.fill()
    }
    ctx.stroke()
  }
}

registerPaint('bezel', Bezel)