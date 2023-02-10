pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
         stage('Clone repository') { 
            steps { 
                script{
                checkout scm
                }
            }
        }

        stage('Build') { 
            steps { 
                script{
                 app = docker.build("ehub-website-frontend")
                }
            }
        }
        stage('Test'){
            steps {
                 echo 'Empty' 
            }
        }
        stage('Deploy') {
            steps {
                script{
                        docker.withRegistry('https://775241144628.dkr.ecr.ap-south-1.amazonaws.com', 'ecr:ap-south-1:aws-credentials') {
                        app.push("${env.BUILD_NUMBER}")
                        app.push("latest")
                    }
                }
            }
        }
    }
}