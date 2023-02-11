pipeline {
    agent {
        docker {
            image 'amazonlinux:2'
            args '-v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    options {
        skipStagesAfterUnstable()
    }

    parameters {
        choice(name: 'ENV', choices: ['dev', 'prod'], description: 'Environment to deploy to')
        choice(name: 'REGION', choices: ['ap-south-1', 'us-west-2'], description: 'Region to deploy to')
        string(name: 'SECRET_ID', defaultValue: 'prod/frontend/URL', description: 'Secret Manager')
    }
    
    stages {
        stage('Clone repository') { 
            steps { 
                script{
                    checkout scm
                }
            }
        }

        stage("Dependency installation") {
            steps {
                sh 'yum update -y'
                sh 'yum install aws-cli -y'
                sh 'yum install groovy -y'
                sh 'curl -sL https://rpm.nodesource.com/setup_14.x | sudo bash -'
                sh 'yum install nodejs -y'
            }
        }

        stage('Retrieve secrets') {
            steps {
                script {
                    withCredentials([aws(credentialsId: 'AWS Creds Ehub')]) { 
                        def secrets = sh(returnStdout: true, script: "aws secretsmanager get-secret-value --secret-id ${params.SECRET_ID} --region ${params.REGION}")
                        def secretsJson = readJSON(text: secrets)
                        def secretsMap = [:]
                        secretsMap = readJSON(text: secretsJson['SecretString'])
                        secretsMap.each { key, value ->
                            env."${key}" = "${value}"
                        }
                    }
                }
            }
        }

        stage('Build') { 
            steps { 
                script{
                    // sh 'printenv'
                    sh 'npm install'
                    sh 'npm run build'

                    def buildArgs = ''
                    env.entrySet().each { entry ->
                        buildArgs += "--build-arg ${entry.key}=${entry.value} "
                    }

                    app = docker.build("ehub-website-frontend", buildArgs)
                }
            }
        }

        stage('Test'){
            steps {
                script {
                    sh 'echo "Testing Stage"'
                    // sh './clair-scanner --ip <clair-server-ip> --clair-timeout <timeout-in-seconds> --clair-threshold <severity-threshold> <image-name>:<image-tag>'
                }
            }
        }

        stage('Push Image to AWS ECR') {
            when {
                expression { params.ENV != 'dev' }
            }
            steps {
                script{
                    withCredentials([aws(credentialsId: 'AWS ECR')]) { 
                        docker.withRegistry('https://775241144628.dkr.ecr.ap-south-1.amazonaws.com', 'ecr:ap-south-1:AWS ECR') {
                            app.tag("775241144628.dkr.ecr.ap-south-1.amazonaws.com/ehub_frontend:${env.BUILD_NUMBER}")
                            app.push("latest")
                        }
                    }
                }
            }
        }
    }
}
