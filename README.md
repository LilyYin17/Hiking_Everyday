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
## 1. Git: Clone the project in a local directory.

```
https://github.com/LilyYin17/Hiking_Everyday.git
```

## 2. Eclipse: Import the project
1. Click `File` menu
2. Choose `Import`
3. Click `Maven` and choose `Existing Maven Project` and click `Next`
4. Set `Root Directory` to cloned project directory from `Browse...` and check `pox.xml` in `Projects`: section and finally Click `Finish` button

## 3. Elcipse: Setup Tomecat Servce
1. In the `Servers` window, click the `Servers` window, click `No servers are available. Click this link to create a new server...`
2. Choose `Apache`, then choose `Tomcat v9.0 Server` and click `Next`
3. Click `Browse` and choose the `apache-tomcat-9.0.xxx` that you have downloaded and unzipped (prerequisites), click `Open`
4. Click `Finish` and then you will find `Tomcat v9.0 Server at localhost ...` in `Servers` window
5. Update Server configuration. Double Click `Tomcat v9.0 Server at localhost` in Server window. In `Server Locations`, click `Use Tomcat installation ...`. Save this file (Click the window to save + Mac:`Command-S`, Windows: `Ctrl-S`)
6. Right click `Tomcat v9.0 Server at localhost`, choose `Properties`. Click `Switch Location` to change the location to /Servers/Tomcat v9.0 Server at localhost.server
7. To start the Tomcat Server, right click on 1Tomcat v9.0 Server at localhost` and click `Start`

## 4. Elcipse: Add the project to Tomcat and run the project under Tomcat
1. Right click on your `Tomcat v9.0 server at localhost` and choose `Add and Remove`
2. Move Hiking_Everyday from left to right and click `finish`

Now you are able to view the app at: http://localhost:8080/HikingEveryday/
