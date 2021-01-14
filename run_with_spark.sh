#!/bin/sh
#utilizzare nel caso in cui spark è in esecuzione e non si intende interromperlo
xterm -hold -e "./venv/bin/python ./venv/tweeter_streamer.py" & xterm -hold -e "node node_server.js"
