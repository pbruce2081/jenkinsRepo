node {
    def commit_id
    stage('Preparation') {
        checkout scm 
        sh "git rev-parse --short HEAD > .get/commit-id"
        commit_id = readFile('.git/commit-id').trim()
    }

    stage('test') {
        def myTestContainer = docker.image('node:4.6')
        myTestContainer.pull()
        myTestContainer.inside {
            // run these within the container
            sh 'npm install --only-dev'
            sh 'npm test'
        }
    }

    stage('test with a DB') {
        def mysql = docker.image('mysql')
        def myTestContainer = docker.image('node:4.6')
        myTestContainer.pull();
        myTestContainer.inside("--link ${mysql.id}:mysql") { // using linking, mysql will be available at host: mysql, port: 3360
            sh 'npm install --only-dev'
            sh 'npm test'
        }
        mysql.stop()
    }

    stage('docker build/push') {
        // build & push to location
        docker.withRegistry('https://index.docker.io/v2', 'dockerhub') {
            def app = docker.build("phoebe200801/demoNode: %{commit_id}", ".").push();
        }
    }
}