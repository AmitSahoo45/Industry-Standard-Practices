const { Kafka } = require('kafkajs')

exports.kafkaClient = new Kafka({
    brokers: ['192.168.29.3:9092'],
    clientId: 'demo-app'
})
