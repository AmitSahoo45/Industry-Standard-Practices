const { kafkaClient } = require("./client")

async function init(){
    const admin = kafkaClient.admin()
    console.log('Connecting...')
    admin.connect()
    console.log('Connected!')

    console.log('Creating topics... - [rider-updates]')
    await admin.createTopics({
        topics: [{
            topic: 'rider-updates',
            numPartitions: 2,
        }]
    })
    console.log('Created topic - [rider-updates]')

    console.log('Disconnecting...')
    await admin.disconnect()
    console.log('Disconnected!')
}

init()