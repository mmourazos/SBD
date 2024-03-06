import { createClient } from 'redis'

const key = 'foo'

const conn_str = `redis://${process.env.REDIS_USER}:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/${process.env.REDIS_DB_NUM}`

console.log(`Cadena de conexión: ${conn_str}.`)
const client = await createClient({
    url: conn_str
})
    .on('error', err => console.error('Erroy de cliente de Redis', err))
    .connect()

//await client.set('foo', 'bar', {
//    EX: 10
//})

// De manera alternativa:
await client.sendCommand(['set', 'foo', 'bar', 'EX', '10'])

const value = await client.get('foo')

console.log(`${key} = ${value}`)

client.disconnect()
