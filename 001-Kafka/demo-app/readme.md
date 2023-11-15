### Before starting. 
Make sure to install Kafka and Node.js. 

After installing start the zookeeper container
```bash
docker run -p 2181:2181 zookeeper
```

Start Kafka Container, expose port 9092 and setup ENV variable
```bash
docker run -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=<PRIVATE_IP>:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://<PRIVATE_IP>:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka
```

The first thing we need to do is infrastructure setup. 
The partitions and topics is handled by the **admin** - makes the setup.
**Producer** - produces msg
**Consumer** - consumes msg 