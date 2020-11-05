# Welcome to Hiking Everyday!

## What Is It?
This is the project for OSU CS361 Fall 2020 SOFTWARE ENGINEERING I.

Hiking Everyday is the website which will give the best choice and necessary information about hiking trails to the user specifically based on the their location and physical fitness level. 

# About

This project is a Java application uses Apache Tomcat framework. You can access the webapp by starting tomcat and visiting http://localhost:8080/HikingEveryday/ in your browser.

# Getting Started
## Prerequisites

You'll need the following:
* [Download and Install Eclipse IDE for Java EE Developers](https://www.eclipse.org/downloads/)
* [Down load and Install Apache Tomcat version 9.0](http://tomcat.apache.org/download-90.cgi) Choose the right version under Binary Distributions.

## How to run 
## 1. Clone the sample app

Now you're ready to start working with the HikingEveryday Tomcat app. Clone the repository.
```
git clone https://github.com/LilyYin17/Hiking_Everyday.git
```

## 2. Run the app locally

You must install the dependencies and build a .war file as defined in the pom.xml file to run the app.

Install the dependencies.

```
mvn clean install  
```

Copy GetStartedTomcat.war from the `target` directory into your `tomcat-install-dir` `webapps` directory.

Run the app.  
```
<tomcat-install-dir>/bin/startup.bat|.sh
```

View your app at: http://localhost:8080/HikingEveryday/
