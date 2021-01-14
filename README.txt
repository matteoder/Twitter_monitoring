Per prima cosa configurare nella cartella conf contenuta in Spark il file spark-env.sh
che può essere ottenuto facendo una copia nella cartella del file spark-env.sh.template:

cp spark-env.sh.template spark-env.sh

All'interno di tale file è necessario aggiungere le seguenti linee di codice:

export HADOOP_CONF_DIR=/home/bigdata/hadoop-2.10.0/etc/hadoop
export YARN_CONF_DIR=/home/bigdata/hadoop-2.10.0/etc/hadoop

Infine è necessario impostare nel file ~/.bashrc il percorso

export SPARK_HOME="percorso della cartella Spark"

per l'esecuzione del programma, è necessario eseguire il seguente comando una volta entrati nella cartella del progetto:

./first_run.sh

questo comando installerà xterm (se non è già presente), il quale sarà utilizzato per la visualizzazione dei server.
Il comando inoltre avvierà HDFS e YARN, i quali saranno utilizzati insieme a Spark; connettersi poi al seguente indirizzo tramite browser per la visualizzazione:

localhost:3000/dashboard

per l'inserimento dei nomi nell'interfaccia grafica iniziale, è necessario utilizzare l'id del profilo (il nome che segue la @); di seguito alcuni esempi per testare l'applicazione:

-elonmusk
-JoeBiden
-willsmith
-comuneperugia
-RobertDowneyJr
-Pontifex_it
-Pele
-ChiliPeppers


nel caso in cui si voglia eseguire nuovamente i due server ma senza interrompere spark,è eseguibile il seguente comando:

./run_with_spark.sh

per interrompere spark, chiudere la finestra di terminale in cui è in esecuzione; dopodichè riavviare sia HDFS che YARN.

