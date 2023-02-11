pipeline {
    agent any
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

        // stage('Retrieve secrets') {
        //     steps {
        //         script {
        //             // def secrets = sh(returnStdout: true, script: 'aws secretsmanager list-secrets')
        //             // def secretIds = secrets.trim().split("\n").slice(4..-1).collect { it.split(" ")[0] }
                    
        //             secretIds.each { secretId ->
        //                 def secret = sh(returnStdout: true, script: "aws secretsmanager get-secret-value --secret-id ${params.SECRET_ID}")
        //                 def secretKey = secret.trim().split("\n")[1].split(":")[1].trim()
        //                 def secretValue = secret.trim().split("\n")[2].split(":")[1].trim()

        //                 env."${secretKey}" = "${secretValue}"
        //             }
        //         }
        //     }
        // }

        // stage('Build') { 
        //     steps { 
        //         script{
        //             sh 'npm install'
        //             sh 'npm run build'

        //             def buildArgs = ""
        //             env.getProperties().each { key, value ->
        //                 buildArgs = "${buildArgs} --build-arg ${key}=${value}"
        //             }

        //             app = docker.build("ehub-website-frontend", "${buildArgs}")
        //         }
        //     }
        // }

        stage('Retrieve secrets') {
            steps {
                script {
                    withCredentials([aws(credentialsId: 'AWS Creds Ehub')]) { //, region: ${params.REGION}
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
                    sh 'printenv'
                    // sh 'npm install'
                    // sh 'npm run build'

                    // def buildArgs = ''
                    // env.entrySet().each { entry ->
                    //     buildArgs += "--build-arg ${entry.key}=${entry.value} "
                    // }

                    // app = docker.build("ehub-website-frontend", buildArgs)
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

        stage('Deploy') {
            when {
                expression { params.ENV != 'dev' }
            }
            steps {
                script{
                    withCredentials([aws(credentialsId: 'AWS ECR')]) { //, region: ${params.REGION}
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
