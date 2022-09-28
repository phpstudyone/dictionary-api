pipeline {
    agent { label 'dictionary-api' }
    stages {
        stage('git pull') {
            steps{
                git branch: 'main', credentialsId: '2f41c30e-9564-4dd4-9c16-7062e40ffc35', url: 'https://github.com/phpstudyone/dictionary-api.git'
                sh 'git pull origin main'
            }
        }

        stage('npm install') {
            steps{
                nodejs(nodeJSInstallationName: 'node 14'){
                    sh 'npm install'
                }
            }
        }


        stage('run dev') {
            steps{
                // nodejs(nodeJSInstallationName: 'node 14'){
                //     sh 'node ./src/service.js'
                // }

                sshPublisher(publishers: [
                    sshPublisherDesc(
                        configName: '131',
                        transfers: [sshTransfer(
                            cleanRemote: false,
                            excludes: '',
                            execCommand: './dictionary-api/deploy.sh',
                            execTimeout: 120000,
                            flatten: false,
                            makeEmptyDirs: false,
                            noDefaultExcludes: false,
                            patternSeparator: '[, ]+',
                            remoteDirectory: '',
                            remoteDirectorySDF: false,
                            removePrefix: '',
                            sourceFiles: '**/*')],
                        usePromotionTimestamp: false,
                        useWorkspaceInPromotion: false,
                        verbose: true
                    )]
                )
            }
        }
    }
}
