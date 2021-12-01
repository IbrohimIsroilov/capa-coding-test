#!/usr/bin/env groovy
pipeline {
    agent any 
    stages {
        stage('TEST') {
            steps {
                echo 'Build stage'
                echo 'after cd'
            }
        }
        stage('DEPLOY') {
            steps{
                sshagent(credentials:['main']){
                    sh 'ssh ubuntu@ip'
                    sh 'ls -la'
                    echo 'is it really happening?'
                }
            }
        }
        stage('FAIL') {
            steps{
                sshagent(credentials:['dev-server']){
                    echo 'THIS IS FAIL STEP'
                }
            }
        }
    }
}