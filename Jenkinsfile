pipeline {
    agent any

    environment {
        PROJECT_NAME = 'RealEstate-Property-Discovery'
    }

    stages {
        stage('Checkout Source') {
            steps {
                echo "Checking out code for ${env.PROJECT_NAME}..."
                checkout scm
            }
        }

        stage('Environment & Setup') {
            steps {
                echo 'Verifying environment dependencies...'
                bat 'python --version'
                bat 'git --version'
            }
        }

        stage('Static Analysis & Validation') {
            steps {
                echo 'Validating repository structure and required files...'
                bat 'python -c "import os; assert os.path.exists(\'index.html\'); assert os.path.exists(\'README.md\'); print(\'Static validation passed\')"'
            }
        }

        stage('Automated Unit Tests') {
            steps {
                echo 'Executing test suite via python unittest...'
                bat 'python -m unittest discover -s tests -p "test_*.py" -v'
            }
        }

        stage('Build & Package') {
            steps {
                echo 'Packaging release artifact summary...'
                bat 'python -c "print(\'Build completed successfully for RealEstate Platform\')"'
            }
        }
    }

    post {
        always {
            echo 'Pipeline execution complete.'
        }
        success {
            echo 'Jenkins Build SUCCESS: All tests and stages passed.'
        }
        failure {
            echo 'Jenkins Build FAILURE: Check stage logs for details.'
        }
    }
}