// Hàm gửi Telegram dùng chung
def notify(String msg) {
    withEnv(["MSG=${msg}"]) {
        sh '''
            curl -s -X POST "https://api.telegram.org/bot${TG_TOKEN}/sendMessage" \
              -d chat_id="${TG_CHAT}" \
              --data-urlencode "text=${MSG}"
        '''
    }
}

pipeline {
    agent any

    environment {
        PROJECT  = 'devops-test'
        BRANCH   = 'main'
        SITE_URL = 'http://IP-HOAC-DOMAIN:3000'   // <-- SỬA THÀNH URL THẬT
        TG_TOKEN = credentials('telegram-token')
        TG_CHAT  = credentials('telegram-chat-id')
    }

    triggers {
        githubPush()
    }

    stages {
        stage('Notify Start') {
            steps {
                script { notify("🚀 DEPLOY STARTED\nProject: ${PROJECT}\nBranch: ${BRANCH}") }
            }
        }

        stage('Checkout') {
            steps { checkout scm }
        }

        stage('Install dependencies') {
            steps { sh 'npm install' }
        }

        stage('Build') {
            steps { sh 'npm run build' }
        }

        stage('Deploy') {
            steps {
                sh '''
                    DEPLOY_DIR=/var/lib/jenkins/deploy/devops-test
                    mkdir -p $DEPLOY_DIR
                    # dừng bản cũ nếu có
                    [ -f $DEPLOY_DIR/app.pid ] && kill $(cat $DEPLOY_DIR/app.pid) 2>/dev/null || true
                    # copy bản mới
                    rm -rf $DEPLOY_DIR/dist
                    cp -r dist server.js $DEPLOY_DIR/
                    # chạy nền, không bị Jenkins kill khi build xong
                    cd $DEPLOY_DIR
                    JENKINS_NODE_COOKIE=dontKillMe nohup node server.js > app.log 2>&1 &
                    echo $! > app.pid
                    sleep 2
                    curl -f http://localhost:3000 > /dev/null
                '''
            }
        }
    }

    post {
        success {
            script { notify("✅ DEPLOY SUCCESS\nProject: ${PROJECT}\nBranch: ${BRANCH}\nURL: ${SITE_URL}") }
        }
        failure {
            script { notify("❌ DEPLOY FAILED\nProject: ${PROJECT}\nBranch: ${BRANCH}\nPlease check Jenkins.") }
        }
    }
}
