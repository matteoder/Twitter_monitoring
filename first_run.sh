#!/bin/sh
#utilizzare per la prima esecuzione
$HADOOP_DIR/sbin/start-dfs.sh
$HADOOP_DIR/sbin/start-yarn.sh
sudo apt-get install xterm
/$SPARK_HOME/bin/spark-submit --master yarn --deploy-mode cluster --driver-memory 1g ./venv/twitter_streaming.py & xterm -hold -e "./venv/bin/python ./venv/tweeter_streamer.py" & xterm -hold -e "node node_server.js"

