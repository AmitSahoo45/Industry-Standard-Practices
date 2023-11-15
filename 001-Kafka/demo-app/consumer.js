const { kafkaClient } = require("./client");
const grp = process.argv[2] 


async function init() {
    const consumer = kafkaClient.consumer({ groupId: grp });
    await consumer.connect();

    await consumer.subscribe({ topic: 'rider-updates', fromBeginning: true })

    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
            console.log(partition, topic, message.value.toString(), message.key.toString())
        }
    })
}

init()