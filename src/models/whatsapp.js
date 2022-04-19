const wbm = require('wbm')

const whatsapp = wbm.start().then(async() => {
    await wbm.send("+201224066405", "I Love you ya Batta")
    await wbm.end()
}).catch(err => console.log(err))

export default whatsapp